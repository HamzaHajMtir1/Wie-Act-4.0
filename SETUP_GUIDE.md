# 🚀 Quick Setup Guide for AgriAssist AI

## Step 1: Get OpenRouter API Key (Free)

1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Click "Sign Up" and create account
3. Go to "Keys" section in dashboard  
4. Click "Create Key" and copy it

## Step 2: Add API Key to Environment

Open your `.env` file and add:
```env
OPENROUTER_API_KEY=your_actual_key_here
```

## Step 3: Test the AI Assistant

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and go to your app
3. Look for the green "AgriAI" button in bottom-right corner
4. Click it to open the chat
5. Click the alert icon (⚠️) to test connection
6. Try asking: "What tools do I need for organic gardening?"

## 🎯 Quick Test Commands

Test the API directly:
```bash
# Test with static data
curl -X POST http://localhost:3000/api/ai-assistant \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the best farming tools?", "useStaticData": true}'

# Test connection
curl http://localhost:3000/api/ai-assistant
```

## 🔧 Troubleshooting

**Problem**: API key error
**Solution**: Make sure your `.env` file has the correct key without quotes

**Problem**: No response from AI
**Solution**: Check if OpenRouter service is working, toggle test mode

**Problem**: Component not showing
**Solution**: Restart development server after adding environment variables

## ✅ Success Indicators

- Green "AgriAI" button appears in bottom-right
- Test connection shows "✅ System Test Successful"
- AI responds to agricultural questions
- Response times shown (usually < 2000ms)

That's it! Your agricultural AI assistant is ready to help farmers! 🌱