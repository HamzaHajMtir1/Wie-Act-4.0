# AI Assistant Setup Guide

## Overview
The Agri-Hope project now includes an AI-powered assistant specifically designed to help women farmers with agricultural guidance and support. The assistant uses the OpenRouter API with LLaMA 3.1 8B model for intelligent responses.

## Features Implemented
- ✅ **API Route**: `/app/api/ai-assistant/route.ts` - Complete OpenRouter integration
- ✅ **AI Chat Component**: Floating agricultural-themed chat interface
- ✅ **Layout Integration**: AI assistant available across all routes
- ✅ **Environment Setup**: Configured for OpenRouter API key
- ✅ **Build Optimization**: Fixed SSR issues and localStorage compatibility
- ✅ **Database Migration**: Applied Prisma schema for User and Article models

## Getting Started

### 1. OpenRouter API Setup
1. Go to [OpenRouter.ai](https://openrouter.ai/) and create an account
2. Navigate to the API Keys section
3. Generate a new API key
4. Copy the key for the next step

### 2. Environment Configuration
Add your OpenRouter API key to the `.env` file:

\`\`\`env
# OpenRouter API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here
\`\`\`

### 3. Testing the AI Assistant
1. Start the development server: \`pnpm run dev\`
2. Open http://localhost:3000 in your browser
3. Look for the green floating button with a leaf icon in the bottom-right corner
4. Click to open the AI assistant chat interface

## Technical Details

### AI Assistant Component
- **Location**: \`components/ai-agent-chat.tsx\`
- **Styling**: Agricultural theme with green colors and leaf icon
- **State**: Floating button that expands to chat interface
- **Features**: Voice input simulation, image upload placeholder, text messaging

### API Integration
- **Endpoint**: \`/api/ai-assistant\`
- **Model**: LLaMA 3.1 8B via OpenRouter
- **Content Filtering**: Agricultural keywords detection
- **Fallback**: Static test data when API key not configured
- **Context**: Integrates with existing articles from the database

### Database Integration
- Uses existing Prisma schema with User and Article models
- Fetches agricultural articles to provide context to the AI
- Compatible with PostgreSQL database configuration

## Development Notes

### Build Fixes Applied
- Fixed localStorage SSR issues in theme components
- Applied Prisma database migrations
- Resolved import/export errors
- Optimized for Next.js static generation

### File Structure
\`\`\`
app/
  api/
    ai-assistant/
      route.ts          # Main AI API endpoint
components/
  ai-agent-chat.tsx     # AI chat interface
  conditional-layout.tsx # Layout wrapper with AI integration
  theme-provider.tsx    # Fixed SSR-compatible theme provider
  theme-toggle.tsx      # Fixed SSR-compatible theme toggle
\`\`\`

## Next Steps
1. **Add OpenRouter API Key**: Follow setup instructions above
2. **Enhance Chat Features**: Add real voice-to-text integration
3. **Expand Knowledge Base**: Add more agricultural content and context
4. **Test Real Interactions**: Verify AI responses with actual API calls
5. **UI Improvements**: Enhance chat interface with typing indicators and message history

## Troubleshooting

### Common Issues
- **Build Errors**: Ensure all imports are correct and localStorage is properly wrapped
- **API Errors**: Check that OPENROUTER_API_KEY is properly set in .env
- **Database Errors**: Run \`npx prisma migrate dev\` to apply schema changes

### Testing Without API Key
The AI assistant includes fallback test data that simulates agricultural responses when no API key is configured, allowing for development and testing without immediate API setup.