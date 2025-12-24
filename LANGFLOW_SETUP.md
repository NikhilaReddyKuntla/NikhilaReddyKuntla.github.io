# Langflow Integration Setup Guide

This guide will help you integrate your Langflow AI flow into your personal website.

## Prerequisites

- A Langflow flow that answers questions about you
- Your Langflow API endpoint URL
- (Optional) API key if your Langflow instance requires authentication

## Step 1: Get Your Langflow API Endpoint

### Option A: Using Langflow Cloud

1. Go to your Langflow dashboard
2. Open your flow
3. Click on "Deploy" or "API" tab
4. Copy the API endpoint URL
5. It should look like: `https://api.langflow.com/v1/run/{flow_id}`

### Option B: Using Self-Hosted Langflow

1. Access your Langflow instance
2. Navigate to your flow
3. Get the API endpoint from the API documentation
4. It should look like: `https://your-domain.com/api/v1/run/{flow_id}`

### Option C: Using Langflow Local Development

1. If running locally, your endpoint might be: `http://localhost:7860/api/v1/run/{flow_id}`
2. **Note**: Local endpoints won't work with GitHub Pages. You'll need to deploy your Langflow instance.

## Step 2: Configure the API Endpoint

You have two options to configure your API endpoint:

### Option 1: Edit `langflow-config.js` (Recommended)

1. Open `langflow-config.js` in your project
2. Replace `YOUR_LANGFLOW_API_ENDPOINT_HERE` with your actual endpoint:
   ```javascript
   LANGFLOW_CONFIG.apiEndpoint = 'https://api.langflow.com/v1/run/your-flow-id';
   ```
3. If you need an API key, add it:
   ```javascript
   LANGFLOW_CONFIG.apiKey = 'your-api-key-here';
   ```

### Option 2: Edit `langflow-chat.js` Directly

1. Open `langflow-chat.js`
2. Find the `LANGFLOW_CONFIG` object at the top
3. Update the `apiEndpoint` value:
   ```javascript
   const LANGFLOW_CONFIG = {
       apiEndpoint: 'https://your-endpoint-here',
       apiKey: 'your-key-here', // Optional
       timeout: 30000
   };
   ```

## Step 3: Test Your Integration

1. Open `index.html` in your browser
2. Navigate to the "Ask Me" section
3. Try asking a question like "What is Nikhila's educational background?"
4. Check the browser console (F12) for any errors

## Step 4: Handle CORS Issues (If Needed)

If you encounter CORS (Cross-Origin Resource Sharing) errors:

### Solution 1: Configure Langflow to Allow Your Domain

Add your website domain to Langflow's CORS settings:
- GitHub Pages: `https://nikhilareddykuntla.github.io`
- Custom domain: Your custom domain

### Solution 2: Use a Backend Proxy (Recommended for Production)

Create a simple backend proxy to avoid CORS issues:

**Example using Node.js/Express:**
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/langflow', async (req, res) => {
    const response = await fetch('YOUR_LANGFLOW_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LANGFLOW_API_KEY}`
        },
        body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.json(data);
});

app.listen(3000);
```

Then update your `langflow-chat.js` to use the proxy endpoint.

## Step 5: Deploy to GitHub Pages

1. Make sure your `langflow-config.js` is committed (if using it)
2. **Important**: If using API keys, consider:
   - Using environment variables (requires backend)
   - Using a backend proxy to hide the key
   - Making the flow public (if appropriate)
3. Push your changes:
   ```bash
   git add .
   git commit -m "Add Langflow chat integration"
   git push
   ```

## Troubleshooting

### "API endpoint not configured" Error

- Make sure you've updated the `apiEndpoint` in either `langflow-config.js` or `langflow-chat.js`
- Check that the endpoint URL is correct and includes the full path

### CORS Errors

- Your Langflow instance needs to allow requests from your website domain
- Consider using a backend proxy as mentioned above

### "Request timeout" Error

- Increase the timeout value in `LANGFLOW_CONFIG`
- Check if your Langflow instance is running and accessible

### API Response Format Issues

- Langflow API response format may vary
- Check the `extractResponse()` function in `langflow-chat.js`
- Adjust it based on your specific Langflow flow's response structure
- Check your browser console for the actual response format

### Testing Locally

1. If your Langflow is running locally, you can test with:
   ```javascript
   apiEndpoint: 'http://localhost:7860/api/v1/run/your-flow-id'
   ```
2. Make sure both your website and Langflow are running
3. For GitHub Pages, you'll need a publicly accessible Langflow instance

## API Response Format

The current implementation expects one of these response formats:

```json
{
  "outputs": [{
    "outputs": [{
      "results": {
        "message": {
          "content": "Response text here"
        }
      }
    }]
  }]
}
```

Or simpler formats:
```json
{
  "results": "Response text here"
}
```

If your Langflow flow returns a different format, update the `extractResponse()` function in `langflow-chat.js`.

## Security Considerations

1. **API Keys**: Never commit API keys directly to public repositories
   - Use `langflow-config.js` and add it to `.gitignore` if needed
   - Or use environment variables with a backend proxy

2. **Rate Limiting**: Consider implementing rate limiting to prevent abuse

3. **Input Validation**: The current implementation sends user input directly to Langflow. Consider adding input validation/sanitization for production.

## Need Help?

- Check Langflow documentation: https://docs.langflow.org
- Review your Langflow flow's API documentation
- Check browser console for detailed error messages
- Test your Langflow API endpoint directly using tools like Postman or curl

## Example API Test

Test your endpoint directly:

```bash
curl -X POST "https://your-langflow-endpoint" \
  -H "Content-Type: application/json" \
  -d '{
    "input_value": "What is Nikhila\'s background?",
    "output_type": "chat",
    "input_type": "chat"
  }'
```

This will help you understand the exact response format your Langflow flow returns.

