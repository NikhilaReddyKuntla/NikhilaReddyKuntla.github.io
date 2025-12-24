// Langflow Chat Integration
// Configuration - Update this with your Langflow API endpoint
const LANGFLOW_CONFIG = {
    // Replace with your Langflow API endpoint
    // Example: 'https://your-langflow-instance.com/api/v1/run/{flow_id}'
    // Or if using Langflow Cloud: 'https://api.langflow.com/v1/run/{flow_id}'
    apiEndpoint: '', // Add your Langflow API endpoint here
    
    // Optional: Add API key if required
    apiKey: '', // Add your API key if Langflow requires authentication
    
    // Request timeout in milliseconds
    timeout: 30000
};

// Chat state
let isProcessing = false;
let chatHistory = [];

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Load configuration from config file if available
    loadConfig();

    // Send message on button click
    sendButton.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Suggestion chip clicks
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            chatInput.value = question;
            sendMessage();
        });
    });

    // Auto-resize chat messages container
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Initial scroll
    scrollToBottom();

    // Function to send message
    async function sendMessage() {
        const message = chatInput.value.trim();
        
        if (!message || isProcessing) {
            return;
        }

        // Check if API endpoint is configured
        if (!LANGFLOW_CONFIG.apiEndpoint) {
            showErrorMessage('Langflow API endpoint not configured. Please check the setup instructions.');
            return;
        }

        // Clear input
        chatInput.value = '';
        chatInput.disabled = true;
        sendButton.disabled = true;
        isProcessing = true;

        // Add user message to chat
        addMessage(message, 'user');
        scrollToBottom();

        // Show typing indicator
        const typingId = showTypingIndicator();

        try {
            // Call Langflow API
            const response = await callLangflowAPI(message);
            
            // Remove typing indicator
            removeTypingIndicator(typingId);
            
            // Add bot response
            addMessage(response, 'bot');
            scrollToBottom();

        } catch (error) {
            console.error('Error calling Langflow API:', error);
            removeTypingIndicator(typingId);
            showErrorMessage('Sorry, I encountered an error. Please try again later.');
        } finally {
            chatInput.disabled = false;
            sendButton.disabled = false;
            isProcessing = false;
            chatInput.focus();
        }
    }

    // Function to call Langflow API
    async function callLangflowAPI(message) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), LANGFLOW_CONFIG.timeout);

        try {
            // Prepare request body based on Langflow API format
            const requestBody = {
                input_value: message,
                output_type: "chat",
                input_type: "chat",
                tweaks: {}
            };

            // Add chat history if needed
            if (chatHistory.length > 0) {
                requestBody.chat_history = chatHistory;
            }

            const headers = {
                'Content-Type': 'application/json'
            };

            // Add API key if configured
            if (LANGFLOW_CONFIG.apiKey) {
                headers['Authorization'] = `Bearer ${LANGFLOW_CONFIG.apiKey}`;
            }

            const response = await fetch(LANGFLOW_CONFIG.apiEndpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            // Update chat history
            chatHistory.push({ role: 'user', content: message });
            chatHistory.push({ role: 'assistant', content: extractResponse(data) });

            // Extract response text from Langflow response
            return extractResponse(data);

        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Request timeout. Please try again.');
            }
            throw error;
        }
    }

    // Function to extract response from Langflow API response
    function extractResponse(data) {
        // Langflow API response format may vary
        // Adjust this based on your specific Langflow flow response structure
        
        if (data.outputs && data.outputs.length > 0) {
            // If response has outputs array
            const output = data.outputs[0];
            if (output.outputs && output.outputs.length > 0) {
                const result = output.outputs[0];
                if (result.results && result.results.message) {
                    return result.results.message.content || result.results.message;
                }
                return result.results || result;
            }
            return output.results || output;
        }
        
        if (data.results) {
            return data.results;
        }
        
        if (data.message) {
            return data.message;
        }
        
        if (data.text) {
            return data.text;
        }
        
        // Fallback: return stringified data
        return JSON.stringify(data);
    }

    // Function to add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        if (type === 'user') {
            avatar.innerHTML = '<i class="fas fa-user"></i>';
        } else {
            avatar.innerHTML = '<i class="fas fa-robot"></i>';
        }
        
        const content = document.createElement('div');
        content.className = 'message-content';
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        content.appendChild(paragraph);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        
        // Animate message
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.id = typingId;
        typingDiv.className = 'chat-message bot-message typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);
        chatMessages.appendChild(typingDiv);
        
        return typingId;
    }

    // Function to remove typing indicator
    function removeTypingIndicator(typingId) {
        const typingElement = document.getElementById(typingId);
        if (typingElement) {
            typingElement.remove();
        }
    }

    // Function to show error message
    function showErrorMessage(message) {
        addMessage(message, 'bot');
        scrollToBottom();
    }
});

// Function to load configuration from external file
function loadConfig() {
    // Try to load from langflow-config.js if it exists
    // This allows users to keep their API key separate
    const script = document.createElement('script');
    script.src = 'langflow-config.js';
    script.onerror = function() {
        console.log('langflow-config.js not found. Using default configuration.');
    };
    document.head.appendChild(script);
}

