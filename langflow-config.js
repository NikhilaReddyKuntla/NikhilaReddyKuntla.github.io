// Langflow Configuration
// Update this file with your Langflow API endpoint and credentials
// This file is optional - you can also update the config directly in langflow-chat.js

// IMPORTANT: If you're using GitHub Pages, be careful about exposing API keys
// Consider using environment variables or a backend proxy for production

if (typeof LANGFLOW_CONFIG !== 'undefined') {
    // Update the configuration
    LANGFLOW_CONFIG.apiEndpoint = 'YOUR_LANGFLOW_API_ENDPOINT_HERE';
    // Example: 'https://your-langflow-instance.com/api/v1/run/your-flow-id'
    
    LANGFLOW_CONFIG.apiKey = 'YOUR_API_KEY_HERE'; // Optional, only if required
}

