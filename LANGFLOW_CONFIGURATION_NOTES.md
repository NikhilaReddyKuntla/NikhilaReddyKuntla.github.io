# Langflow Configuration - Current Setup

## ✅ Configuration Complete

Your Langflow integration has been configured with:

- **Host URL**: `http://65.108.221.49:7860`
- **Flow ID**: `8d15a826-d716-4073-bdb1-4860c4ce50f4`
- **API Endpoint**: `http://65.108.221.49:7860/api/v1/run/8d15a826-d716-4073-bdb1-4860c4ce50f4`

## ⚠️ Important Notes

### CORS (Cross-Origin Resource Sharing) Considerations

Since your Langflow instance is using **HTTP** (not HTTPS) and your website will be on **GitHub Pages** (which uses HTTPS), you may encounter CORS issues.

**Solutions:**

1. **Enable CORS on your Langflow server** (Recommended)
   - Configure your Langflow instance to allow requests from:
     - `https://nikhilareddykuntla.github.io`
     - Or allow all origins for development: `*`

2. **Use HTTPS for Langflow** (Best practice)
   - Set up SSL/TLS certificate for your Langflow server
   - Update the hostUrl to use `https://` instead of `http://`

3. **Use a Backend Proxy** (Alternative)
   - Create a simple backend service that proxies requests
   - This avoids CORS issues entirely

### Testing Locally

You can test the integration locally:
1. Open `index.html` in your browser
2. Navigate to the "Ask Me" section
3. Try asking a question
4. Check browser console (F12) for any errors

### API Request Format

The code sends requests in this format:
```json
{
  "input_value": "Your question here",
  "output_type": "chat",
  "input_type": "chat",
  "tweaks": {},
  "chat_history": [] // Added if conversation continues
}
```

### Response Format

The code expects responses in one of these formats:
- `{ "outputs": [{ "outputs": [{ "results": { "message": { "content": "..." } } }] }] }`
- `{ "results": "..." }`
- `{ "message": "..." }`

If your Langflow flow returns a different format, we may need to adjust the `extractResponse()` function in `langflow-chat.js`.

## Next Steps

1. ✅ Configuration is complete
2. Test locally to verify it works
3. If CORS issues occur, configure your Langflow server to allow your website domain
4. Push to GitHub when ready

## Need Help?

If you encounter any issues:
- Check browser console for error messages
- Verify your Langflow server is accessible
- Test the API endpoint directly using tools like Postman or curl
- Make sure your Langflow flow has Chat Input and Chat Output components

