# Langflow Quick Setup Guide

## What You Need to Provide

Based on Langflow documentation, you need to provide these details:

### 1. **Langflow Host URL** (Required)
   - **Langflow Cloud**: `https://cloud.langflow.com`
   - **Self-hosted**: Your server URL (e.g., `https://your-domain.com`)
   - **Local**: `http://localhost:7860` (won't work with GitHub Pages)

### 2. **Flow ID** (Required)
   - Found in your Langflow flow's **Share** or **Embed** settings
   - Also visible in your flow's URL
   - Example format: `abc123-def456-ghi789`

### 3. **API Key** (Optional)
   - Only needed if your Langflow instance requires authentication
   - Check your Langflow settings/account

## How to Find Your Flow ID

1. Open your Langflow flow
2. Click on **Share** button
3. Select **Embed into site** or **API**
4. Your Flow ID will be shown in the code snippet or URL

## Quick Configuration Steps

1. Open `langflow-config.js` in your project
2. Fill in the two required fields:
   ```javascript
   LANGFLOW_CONFIG.hostUrl = 'https://cloud.langflow.com';  // Your host URL
   LANGFLOW_CONFIG.flowId = 'your-flow-id-here';            // Your flow ID
   ```
3. (Optional) Add API key if needed:
   ```javascript
   LANGFLOW_CONFIG.apiKey = 'your-api-key-here';
   ```
4. Save the file
5. Test locally by opening `index.html` in your browser
6. Push to GitHub when ready

## Example Configuration

```javascript
// Example for Langflow Cloud
LANGFLOW_CONFIG.hostUrl = 'https://cloud.langflow.com';
LANGFLOW_CONFIG.flowId = 'abc123-def456-ghi789';
LANGFLOW_CONFIG.apiKey = ''; // Leave empty if not needed
```

The API endpoint will be automatically constructed as:
`https://cloud.langflow.com/api/v1/run/abc123-def456-ghi789`

## Testing

1. Open `index.html` in your browser
2. Navigate to the "Ask Me" section
3. Type a question and click Send
4. Check browser console (F12) for any errors

## Troubleshooting

- **"Not configured" error**: Make sure both `hostUrl` and `flowId` are filled in
- **CORS errors**: Your Langflow instance needs to allow requests from your website domain
- **404 errors**: Check that your Flow ID is correct
- **401/403 errors**: You may need to add an API key

## Need Help?

Once you provide your details, I can help configure everything for you!

