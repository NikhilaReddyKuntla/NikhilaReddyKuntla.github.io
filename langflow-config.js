// Langflow Configuration
// Update this file with your Langflow details
// This file is loaded after langflow-chat.js

// IMPORTANT: If you're using GitHub Pages, be careful about exposing API keys
// Consider using environment variables or a backend proxy for production

if (typeof LANGFLOW_CONFIG !== 'undefined') {
    // ============================================
    // REQUIRED: Fill in these details
    // ============================================
    
    // Your Langflow Host URL
    // Examples:
    // - Langflow Cloud: 'https://cloud.langflow.com'
    // - Self-hosted: 'https://your-domain.com'
    // - Local development: 'http://localhost:7860' (won't work with GitHub Pages)
    LANGFLOW_CONFIG.hostUrl = 'http://65.108.221.49:7860';
    
    // Your Flow ID
    // Found in your Langflow flow's Share/Embed settings or in the flow URL
    // Example: 'abc123-def456-ghi789'
    LANGFLOW_CONFIG.flowId = '8d15a826-d716-4073-bdb1-4860c4ce50f4';
    
    // ============================================
    // OPTIONAL: Only fill if needed
    // ============================================
    
    // API Key (only if your Langflow instance requires authentication)
    LANGFLOW_CONFIG.apiKey = ''; // Leave empty if not needed
    
    // Custom API Endpoint (optional - leave empty to auto-construct from hostUrl and flowId)
    // If you have a custom endpoint, uncomment and fill:
    // LANGFLOW_CONFIG.apiEndpoint = 'https://custom-endpoint.com/api/v1/run/flow-id';
    
    // ============================================
    // Configuration Notes:
    // ============================================
    // The API endpoint will be automatically constructed as:
    // {hostUrl}/api/v1/run/{flowId}
    //
    // Example:
    // If hostUrl = 'https://cloud.langflow.com'
    // And flowId = 'abc123'
    // Then endpoint = 'https://cloud.langflow.com/api/v1/run/abc123'
}

