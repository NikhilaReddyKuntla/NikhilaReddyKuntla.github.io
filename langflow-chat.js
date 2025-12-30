// Langflow Chat Integration
// Configuration - Update this with your Langflow details
const LANGFLOW_CONFIG = {
    // Method 1: Using Langflow Embed Widget (Recommended)
    // Set useEmbedWidget to true and provide hostUrl and flowId
    useEmbedWidget: false, // Set to true to use embed widget instead of API
    
    // Langflow Host URL (required for both methods)
    // Examples:
    // - Langflow Cloud: 'https://cloud.langflow.com'
    // - Self-hosted: 'https://your-domain.com'
    hostUrl: '', // Add your Langflow host URL here
    
    // Flow ID (required for both methods)
    // Found in your flow's Share/Embed settings or URL
    flowId: '', // Add your Flow ID here
    
    // Method 2: Using Direct API (if useEmbedWidget is false)
    // API endpoint will be constructed as: {hostUrl}/api/v1/run/{flowId}
    // Or you can provide a custom endpoint:
    apiEndpoint: '', // Leave empty to auto-construct, or provide custom endpoint
    
    // Optional: Add API key if required
    apiKey: '', // Add your API key if Langflow requires authentication
    
    // Request timeout in milliseconds
    timeout: 30000
};

// Chat state
let isProcessing = false;
let chatHistory = [];

// Function to construct API endpoint (accessible globally)
function getApiEndpoint() {
    // If custom endpoint provided, use it
    if (LANGFLOW_CONFIG.apiEndpoint) {
        return LANGFLOW_CONFIG.apiEndpoint;
    }
    
    // Otherwise, construct from hostUrl and flowId
    if (LANGFLOW_CONFIG.hostUrl && LANGFLOW_CONFIG.flowId) {
        // Remove trailing slash from hostUrl if present
        const hostUrl = LANGFLOW_CONFIG.hostUrl.replace(/\/$/, '');
        return `${hostUrl}/api/v1/run/${LANGFLOW_CONFIG.flowId}`;
    }
    
    return null;
}

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Check if elements exist
    if (!chatInput || !sendButton || !chatMessages) {
        console.error('Chat elements not found. Check HTML structure.');
        return;
    }

    // Ensure input is enabled on initialization
    chatInput.disabled = false;
    chatInput.removeAttribute('readonly');
    chatInput.removeAttribute('disabled');
    sendButton.disabled = false;
    
    // Set input as editable
    chatInput.style.pointerEvents = 'auto';
    chatInput.style.userSelect = 'text';
    
    // Focus the input after a short delay
    setTimeout(() => {
        try {
            chatInput.focus();
        } catch (e) {
            console.log('Could not focus input:', e);
        }
    }, 100);

    // Configuration is loaded via script tag in HTML (langflow-config.js loads before this script)
    // No need to load it again here

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
        // Ensure input is enabled before checking
        if (chatInput.disabled) {
            chatInput.disabled = false;
        }
        
        const message = chatInput.value.trim();
        
        if (!message) {
            chatInput.focus();
            return;
        }
        
        if (isProcessing) {
            return;
        }

        // Check if configuration is valid
        // Wait a moment for config to load if needed
        let endpoint = getApiEndpoint();
        if (!endpoint) {
            // Try once more after a short delay in case config is still loading
            await new Promise(resolve => setTimeout(resolve, 100));
            endpoint = getApiEndpoint();
            if (!endpoint) {
                showErrorMessage('Langflow not configured. Please provide hostUrl and flowId in langflow-config.js');
                console.error('Langflow Config:', LANGFLOW_CONFIG);
                chatInput.focus();
                return;
            }
        }

        // Store message before clearing
        const messageToSend = message;
        
        // Clear input
        chatInput.value = '';
        chatInput.disabled = true;
        sendButton.disabled = true;
        isProcessing = true;

        // Add user message to chat
        addMessage(messageToSend, 'user');
        scrollToBottom();

        // Show typing indicator
        const typingId = showTypingIndicator();

        try {
            // Call Langflow API
            const response = await callLangflowAPI(messageToSend);
            
            // Remove typing indicator
            removeTypingIndicator(typingId);
            
            // Add bot response
            addMessage(response, 'bot');
            scrollToBottom();

        } catch (error) {
            console.error('Error calling Langflow API:', error);
            removeTypingIndicator(typingId);
            const errorMsg = error.message || 'Sorry, I encountered an error. Please try again later.';
            showErrorMessage(errorMsg);
            console.error('Full error details:', error);
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
            // Get API endpoint
            const endpoint = getApiEndpoint();
            if (!endpoint) {
                throw new Error('Langflow API endpoint not configured. Please provide hostUrl and flowId, or a custom apiEndpoint.');
            }

            console.log('Calling Langflow API:', endpoint);
            console.log('Configuration:', LANGFLOW_CONFIG);

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

            console.log('Request body:', requestBody);

            const headers = {
                'Content-Type': 'application/json'
            };

            // Add API key if configured
            if (LANGFLOW_CONFIG.apiKey) {
                headers['Authorization'] = `Bearer ${LANGFLOW_CONFIG.apiKey}`;
            }

            console.log('Sending request to:', endpoint);

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            console.log('Response status:', response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorText}`);
            }

            const data = await response.json();
            console.log('API Response data:', data);
            
            // Extract response text from Langflow response
            const extractedResponse = extractResponse(data);
            console.log('Extracted response:', extractedResponse);

            if (!extractedResponse || extractedResponse.trim() === '') {
                console.warn('Empty response extracted. Full data:', data);
                throw new Error('Received empty response from Langflow. Please check your flow configuration.');
            }
            
            // Update chat history
            chatHistory.push({ role: 'user', content: message });
            chatHistory.push({ role: 'assistant', content: extractedResponse });

            return extractedResponse;

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
        
        console.log('Extracting response from:', data);
        
        // Try different response formats
        // Format 1: Nested outputs structure
        if (data.outputs && data.outputs.length > 0) {
            const output = data.outputs[0];
            if (output.outputs && output.outputs.length > 0) {
                const result = output.outputs[0];
                // Check for message object
                if (result.results) {
                    if (typeof result.results === 'string') {
                        return result.results;
                    }
                    if (result.results.message) {
                        if (typeof result.results.message === 'string') {
                            return result.results.message;
                        }
                        if (result.results.message.content) {
                            return result.results.message.content;
                        }
                    }
                    if (result.results.text) {
                        return result.results.text;
                    }
                    // Try to stringify if it's an object
                    if (typeof result.results === 'object') {
                        return JSON.stringify(result.results);
                    }
                }
                // Direct result
                if (result.results) {
                    return typeof result.results === 'string' ? result.results : JSON.stringify(result.results);
                }
            }
            // Direct output results
            if (output.results) {
                return typeof output.results === 'string' ? output.results : JSON.stringify(output.results);
            }
        }
        
        // Format 2: Direct results
        if (data.results) {
            if (typeof data.results === 'string') {
                return data.results;
            }
            if (data.results.message) {
                return typeof data.results.message === 'string' ? data.results.message : data.results.message.content || JSON.stringify(data.results.message);
            }
            if (data.results.text) {
                return data.results.text;
            }
            return typeof data.results === 'object' ? JSON.stringify(data.results) : data.results;
        }
        
        // Format 3: Direct message
        if (data.message) {
            if (typeof data.message === 'string') {
                return data.message;
            }
            if (data.message.content) {
                return data.message.content;
            }
            return JSON.stringify(data.message);
        }
        
        // Format 4: Direct text
        if (data.text) {
            return data.text;
        }
        
        // Format 5: Check for answer field
        if (data.answer) {
            return typeof data.answer === 'string' ? data.answer : JSON.stringify(data.answer);
        }
        
        // Format 6: Check for output field
        if (data.output) {
            return typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
        }
        
        // Fallback: return stringified data with a note
        console.warn('Could not extract response in expected format. Returning stringified data.');
        return 'Response received: ' + JSON.stringify(data, null, 2);
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

// Function to construct API endpoint (accessible globally)
function getApiEndpoint() {
    // If custom endpoint provided, use it
    if (LANGFLOW_CONFIG.apiEndpoint) {
        return LANGFLOW_CONFIG.apiEndpoint;
    }
    
    // Otherwise, construct from hostUrl and flowId
    if (LANGFLOW_CONFIG.hostUrl && LANGFLOW_CONFIG.flowId) {
        // Remove trailing slash from hostUrl if present
        const hostUrl = LANGFLOW_CONFIG.hostUrl.replace(/\/$/, '');
        return `${hostUrl}/api/v1/run/${LANGFLOW_CONFIG.flowId}`;
    }
    
    return null;
}

