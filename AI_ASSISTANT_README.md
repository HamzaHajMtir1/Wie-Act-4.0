# 🌱 AgriAssist - AI Agricultural Guidance System

AgriAssist is an intelligent AI companion specifically designed to help women farmers with agricultural guidance, tools recommendations, and sustainable farming practices.

## 🚀 Implementation Status

### ✅ **COMPLETED FEATURES**
- **API Route**: Complete OpenRouter integration with LLaMA 3.1 8B model
- **AI Chat Component**: Floating agricultural-themed interface with green styling
- **Layout Integration**: AI assistant available across all routes (main, admin, etc.)
- **Database Integration**: Connected to existing Prisma User/Article models
- **Build Optimization**: Fixed SSR issues, localStorage compatibility, TypeScript errors
- **Environment Setup**: Configured for OpenRouter API key integration
- **Fallback System**: Test data for development without API key

### 🔄 **IN PROGRESS / READY FOR ENHANCEMENT**
- **Real AI Interaction**: Needs OpenRouter API key to enable live responses
- **Voice Input**: Currently simulated, ready for real voice-to-text integration
- **Image Upload**: UI placeholder ready for image processing implementation
- **Chat History**: Basic UI ready, needs persistent storage implementation

## ✨ Features

### 🤖 AI-Powered Agricultural Assistance
- **Smart Agriculture Focus**: Only responds to farming, agricultural, and crop-related queries
- **Tool Recommendations**: Suggests agricultural tools from your product database
- **Crop Guidance**: Provides advice on growing, planting, and harvesting
- **Sustainable Practices**: Promotes eco-friendly farming methods
- **Pest & Disease Management**: Offers solutions for common agricultural problems

### 🎯 Specialized for Women Farmers
- **Ergonomic Tool Suggestions**: Recommends tools designed to reduce physical strain
- **Empowering Content**: Supportive and encouraging communication style
- **Practical Advice**: Actionable guidance for real-world farming challenges

### 💬 Multi-Modal Interaction
- **Text Chat**: Traditional text-based conversations ✅ READY
- **Voice Input**: Simulated voice recording (expandable to real voice-to-text) 🔄 PLACEHOLDER
- **Image Upload**: Upload images for plant disease identification 🔄 PLACEHOLDER
- **Quick Prompts**: Pre-defined common questions for easy access 🔄 READY FOR IMPLEMENTATION

### ⚡ Performance Features
- **Fast Responses**: Optimized API calls with response time tracking ✅ IMPLEMENTED
- **Static Test Mode**: Switch between live and test data for development ✅ WORKING
- **Error Handling**: Graceful fallbacks when AI service is unavailable ✅ IMPLEMENTED
- **Real-time Feedback**: Shows typing indicators and response metrics 🔄 READY FOR ENHANCEMENT

## 🛠️ Technical Setup

### API Integration
The AI assistant uses OpenRouter with Groq4 (LLaMA 3.1 8B) for intelligent responses:

```typescript
// API Endpoint: /api/ai-assistant
// Method: POST
// Body: { message: string, useStaticData?: boolean }
```

### Environment Variables Required
```env
# OpenRouter API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Database and other existing configs...
DATABASE_URL=your_database_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# ... other variables
```

### Getting OpenRouter API Key
1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

## 🎮 How to Use

### For Users
1. **Open Chat**: Click the green "AgriAI" floating button in the bottom-right corner
2. **Ask Questions**: Type agricultural questions or use quick prompts
3. **Voice Input**: Click the microphone for voice recording (currently simulated)
4. **Image Upload**: Upload photos of plants for disease identification
5. **Test System**: Click the alert icon to test the AI connection

### For Developers
1. **Test Mode**: Toggle the file icon to use static test data
2. **Performance Monitoring**: Response times and article usage are tracked
3. **Error Handling**: Built-in fallbacks for API failures

## 📊 Smart Content Filtering

AgriAssist uses intelligent content filtering to ensure responses are agriculture-focused:

```typescript
// Agriculture keywords detection
const agricultureKeywords = [
  'farm', 'crop', 'plant', 'grow', 'harvest', 'soil', 'seed',
  'agriculture', 'farming', 'garden', 'pest', 'fertilizer',
  'irrigation', 'tomato', 'potato', 'vegetable', 'fruit',
  'tool', 'equipment', 'cultivation', 'planting', 'watering',
  'organic', 'sustainable', 'yield', 'livestock', 'greenhouse'
];
```

Non-agricultural queries receive a polite redirect:
> "I'm specialized in agricultural assistance for women farmers. Please ask me about farming, crops, tools, or agricultural practices."

## 🗄️ Database Integration

The AI assistant automatically queries your article database to provide relevant tool recommendations:

- **Article Context**: Includes product titles, descriptions, prices, and discounts
- **Smart Recommendations**: Matches user queries with available products
- **Fallback Data**: Uses static test data when database is unavailable

## 🎨 UI/UX Features

### Design Elements
- **Green Theme**: Agricultural-inspired color scheme
- **Floating Interface**: Non-intrusive bottom-right positioning
- **Responsive Design**: Works on mobile and desktop
- **Clear Typography**: Easy-to-read message formatting
- **Status Indicators**: Visual feedback for loading, typing, and errors

### Interactive Elements
- **Quick Start Prompts**: Common questions for new users
- **Performance Metrics**: Shows response time and data sources
- **Test Controls**: Developer-friendly testing interface
- **File Upload**: Drag-and-drop image support

## 🔧 Architecture

### Frontend Component
```
AgricultureAIAssistant (React Component)
├── Message Management (useState)
├── API Communication (fetch)
├── File Upload Handling
├── Voice Recording Simulation
└── UI Rendering (Tailwind CSS)
```

### Backend API
```
/api/ai-assistant (Next.js API Route)
├── OpenRouter Integration
├── Database Article Fetching  
├── Content Filtering
├── Error Handling
└── Performance Tracking
```

### Data Flow
1. **User Input** → Component State
2. **API Call** → OpenRouter with Context
3. **AI Response** → Formatted Message
4. **UI Update** → Real-time Display

## 🚀 Deployment Notes

### Production Checklist
- [ ] OpenRouter API key configured
- [ ] Database connection stable
- [ ] Cloudinary setup complete
- [ ] Test mode disabled for production
- [ ] Error monitoring enabled

### Performance Optimization
- Uses free LLaMA 3.1 8B model for cost efficiency
- Implements request debouncing
- Caches static agricultural data
- Optimizes message rendering

## 🔮 Future Enhancements

### Planned Features
- **Real Voice Integration**: Actual speech-to-text and text-to-speech
- **Image Recognition**: AI-powered plant disease identification
- **Weather Integration**: Location-based farming advice
- **Crop Calendar**: Seasonal planting and harvesting reminders
- **Community Features**: Connect with other women farmers
- **Offline Mode**: Basic guidance without internet connection

### Technical Improvements
- **Vector Database**: Semantic search for better article matching
- **Model Fine-tuning**: Agricultural-specific AI training
- **Multi-language Support**: Local language assistance
- **Analytics Dashboard**: Usage metrics and popular queries

## 📝 License & Credits

Built with ❤️ for women farmers everywhere. Part of the AgriHope platform empowering sustainable agriculture through technology.

**Technologies Used:**
- Next.js 14 with TypeScript
- OpenRouter AI API (LLaMA 3.1 8B)
- Tailwind CSS for styling
- Lucide React for icons
- Prisma for database management

---

*"Empowering women in agriculture through intelligent AI assistance"* 🌾👩‍🌾