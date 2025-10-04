import { NextResponse } from 'next/server';
import { fetchAllArticles } from '@/lib/models';
import { searchProductsByQuery, getToolsForCrop, Product } from '@/lib/agricultural-products';
import productsDatabase from '@/lib/products-database.json';

// Test static article for development
const STATIC_TEST_ARTICLE = {
  id: 'test-1',
  title: 'Essential Agricultural Tools for Women Farmers',
  content: `
    Modern agricultural tools designed for women farmers:
    
    1. Lightweight Hand Hoes - Perfect for garden cultivation
    2. Ergonomic Pruning Shears - Reduces hand strain during harvesting
    3. Adjustable Watering Systems - Efficient irrigation solutions
    4. Seed Planting Tools - Precision planting for better yields
    5. Soil Testing Kits - Monitor soil health and nutrients
    6. Harvest Baskets - Durable and comfortable carrying solutions
    
    These tools are specifically designed to reduce physical strain while maximizing productivity in agricultural work.
  `,
  price: 150.00,
  discount: 15,
  popularity: true,
  articleImage: '/api/placeholder/400/300'
};

const AGRICULTURAL_SYSTEM_PROMPT = `
You are Touta, an AI assistant specifically designed to help women in agriculture. You have two main roles:

🌱 ADVICE MODE: When users ask for farming guidance, tips, or general agricultural knowledge
🛒 PRODUCT MODE: When users specifically ask for tools, equipment, or products to buy

Your expertise includes:
1. Crop growing guidance (planting, care, harvesting techniques)
2. Sustainable farming practices and methods
3. Seasonal farming advice and timing
4. Pest and disease management solutions
5. Soil health, fertilization, and nutrition
6. Agricultural tools and equipment recommendations (when specifically requested)

IMPORTANT BEHAVIORAL RULES:

📝 ADVICE QUERIES - When users ask "how to", "tips for", "best way to", "when to", "why", or seek general guidance:
- Provide detailed agricultural advice and step-by-step guidance
- Share farming techniques, best practices, and expert knowledge
- Focus on methods, timing, techniques, and agricultural science
- Do NOT mention products unless specifically asked
- Be educational and informative about the farming process

🛍️ PRODUCT QUERIES - When users explicitly ask for "tools", "equipment", "what to buy", "recommend tool", or "need to purchase":
- Search the marketplace and recommend ONLY relevant products
- Provide specific product recommendations with prices and descriptions
- Focus on tools and equipment that directly solve their need
- Include product details from the marketplace data

⚠️ CRITICAL ACCURACY RULES:
- NEVER mix advice and product recommendations unless both are requested
- For olive cultivation advice: Focus on pruning techniques, planting methods, care practices
- For olive cultivation products: Only recommend pruning shears, soil tests, tree planting tools
- Match products precisely to the crop and need mentioned
- If no relevant products exist, say so instead of recommending irrelevant items

Response based on query type detected by the system.
`;

// Enhanced query classification to distinguish between advice and product requests
function classifyQuery(message: string): { 
  queryType: 'advice' | 'product' | 'general';
  confidence: number;
  searchTerms: string;
  category?: string;
  crop?: string;
} {
  const lowerMessage = message.toLowerCase();
  const decisionMatrix = productsDatabase.ai_decision_matrix;
  
  // Product-seeking keywords (high confidence indicators)
  const explicitProductKeywords = [
    'tool', 'tools', 'equipment', 'buy', 'purchase', 'need to buy',
    'recommend tool', 'what tool', 'which tool', 'best tool',
    'show me tool', 'find tool', 'looking for tool', 'where to get',
    'i need a', 'help me find', 'shopping for', 'market',
    'price', 'cost', 'sell', 'available for sale'
  ];
  
  // Advice-seeking keywords (high confidence indicators)
  const explicitAdviceKeywords = [
    'how to', 'how do i', 'what should i do', 'tips for', 'advice',
    'help me grow', 'growing tips', 'best way to', 'when to',
    'how can i', 'what is the best method', 'guide', 'steps to',
    'can you explain', 'teach me', 'learn about', 'understand',
    'why', 'what causes', 'problem with', 'disease', 'pest'
  ];
  
  let queryType: 'advice' | 'product' | 'general' = 'general';
  let confidence = 0;
  let detectedCategory = '';
  let detectedCrop = '';
  
  // Check for explicit product requests (highest priority)
  const productMatches = explicitProductKeywords.filter(keyword => 
    lowerMessage.includes(keyword)
  );
  
  // Check for explicit advice requests
  const adviceMatches = explicitAdviceKeywords.filter(keyword => 
    lowerMessage.includes(keyword)
  );
  
  if (productMatches.length > 0) {
    queryType = 'product';
    confidence = Math.min(0.9, 0.3 + (productMatches.length * 0.2));
  } else if (adviceMatches.length > 0) {
    queryType = 'advice';
    confidence = Math.min(0.9, 0.3 + (adviceMatches.length * 0.2));
  }
  
  // Detect crop/plant type
  for (const [crop, _] of Object.entries(decisionMatrix.crop_specific)) {
    if (lowerMessage.includes(crop.toLowerCase())) {
      detectedCrop = crop;
      break;
    }
  }
  
  // Additional context clues
  if (lowerMessage.includes('growing') && !lowerMessage.includes('tool')) {
    queryType = 'advice';
    confidence = Math.max(confidence, 0.7);
  }
  
  if (lowerMessage.includes('fertilizer') || lowerMessage.includes('seed')) {
    queryType = 'product';
    confidence = Math.max(confidence, 0.8);
  }
  
  return {
    queryType,
    confidence,
    searchTerms: detectedCrop || message,
    category: detectedCategory,
    crop: detectedCrop
  };
}

// Enhanced intelligent search using JSON database
function intelligentProductSearch(query: string, category?: string): Product[] {
  const products = productsDatabase.agricultural_products;
  const decisionMatrix = productsDatabase.ai_decision_matrix;
  const lowerQuery = query.toLowerCase();
  
  let relevantProducts: any[] = [];
  
  console.log(`🔍 Starting product search for: "${query}"`);
  
  // First, try crop-specific matching with higher accuracy - only for direct crop mentions
  for (const [crop, productNames] of Object.entries(decisionMatrix.crop_specific)) {
    if (lowerQuery.includes(crop)) {
      const cropProducts = products.filter(p => 
        productNames.some(name => p.name.toLowerCase().includes(name.toLowerCase()))
      );
      if (cropProducts.length > 0) {
        relevantProducts.push(...cropProducts);
        console.log(`🎯 Found ${cropProducts.length} products for crop: ${crop}`);
        // Return only highly relevant crop-specific products
        return convertToProductType(relevantProducts.slice(0, 3));
      }
    }
  }
  
  // Second, check for specific tool/equipment keywords only if they're explicitly mentioned
  const toolKeywords = ['tool', 'equipment', 'shear', 'hoe', 'spade', 'fertilizer', 'seed', 'kit'];
  const hasToolKeyword = toolKeywords.some(keyword => lowerQuery.includes(keyword));
  
  if (hasToolKeyword) {
    // Look for products that match the tool type and crop context
    if (lowerQuery.includes('olive') || lowerQuery.includes('olives')) {
      relevantProducts = products.filter(product => 
        product.aiKeywords.some(keyword => 
          ['olive', 'tree care', 'pruning', 'orchard', 'Mediterranean', 'tree planting'].includes(keyword.toLowerCase())
        ) ||
        product.crops.some(crop => 
          ['olives', 'fruit trees', 'Mediterranean crops'].includes(crop.toLowerCase())
        )
      );
      console.log(`🫒 Found ${relevantProducts.length} olive-specific products`);
    } else {
      // General tool search but be very selective
      relevantProducts = products.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.aiKeywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
      );
    }
  }
  
  // Third, use case mapping only for very specific scenarios
  if (relevantProducts.length === 0 && hasToolKeyword) {
    for (const [useCase, productNames] of Object.entries(decisionMatrix.use_case_mapping)) {
      if (lowerQuery.includes(useCase.replace('_', ' '))) {
        const useCaseProducts = products.filter(p => 
          productNames.some(name => p.name.toLowerCase().includes(name.toLowerCase()))
        );
        relevantProducts.push(...useCaseProducts);
      }
    }
  }
  
  // Remove duplicates and sort by relevance
  const uniqueProducts = relevantProducts.filter((product, index, self) => 
    index === self.findIndex(p => p.id === product.id)
  );
  
  // Be very conservative with results - only return highly relevant matches
  const finalResults = uniqueProducts.slice(0, 3);
  console.log(`✅ Returning ${finalResults.length} highly relevant products`);
  
  return convertToProductType(finalResults);
}

// Convert enhanced products to the standard Product type
function convertToProductType(products: any[]): Product[] {
  return products.map(p => ({
    id: p.id.toString(),
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    seller: p.seller,
    location: p.location,
    image: p.image,
    organic: p.organic,
    quantity: p.quantity,
    inStock: p.inStock,
    featured: p.featured,
    tags: p.tags,
    description: p.description,
    useCases: p.useCases
  }));
}

// Helper function to generate intelligent fallback responses
function generateIntelligentFallback(message: string, articles: any[]): string {
  const lowerMessage = message.toLowerCase();
  
  // Pattern matching for common agricultural topics
  if (lowerMessage.includes('tomato')) {
    return "Tomatoes thrive in well-drained soil with plenty of sunlight! Plant them after the last frost, water regularly but avoid overwatering, and consider using tomato cages for support. They typically need 6-8 hours of direct sunlight daily.";
  }
  
  if (lowerMessage.includes('tool') || lowerMessage.includes('equipment')) {
    return "Essential tools for women farmers include lightweight hand hoes, ergonomic pruning shears, adjustable watering systems, and comfortable harvest baskets. These tools are designed to reduce strain while maximizing productivity.";
  }
  
  if (lowerMessage.includes('disease') || lowerMessage.includes('pest')) {
    return "Common plant diseases can be prevented with proper spacing for air circulation, avoiding overhead watering, and regular inspection. For pest control, consider companion planting, beneficial insects, and organic pesticides as needed.";
  }
  
  if (lowerMessage.includes('soil')) {
    return "Healthy soil is the foundation of successful farming! Test your soil pH (most crops prefer 6.0-7.0), add organic compost regularly, ensure good drainage, and rotate crops to maintain soil health.";
  }
  
  if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
    return "Efficient watering involves deep, less frequent watering rather than shallow daily watering. Consider drip irrigation systems to conserve water and deliver it directly to plant roots.";
  }
  
  // Generic helpful response
  return "I'm here to help with your agricultural questions! Whether you need advice on crop growing, tool recommendations, pest management, or sustainable farming practices, I'm ready to assist. What specific aspect of farming would you like to know more about?";
}

interface AIRequest {
  message: string;
  useStaticData?: boolean;
}

export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
    const { message, useStaticData = false }: AIRequest = await request.json();
    
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Classify the query type (advice vs product request)
    const queryClassification = classifyQuery(message);
    console.log(`🎯 Query classified as: ${queryClassification.queryType} (confidence: ${queryClassification.confidence})`);
    
    // Get articles data (static for testing, live for production)
    let articles;
    if (useStaticData) {
      articles = [STATIC_TEST_ARTICLE];
      console.log('🧪 Using static test data');
    } else {
      try {
        articles = await fetchAllArticles();
        console.log(`📊 Retrieved ${articles.length} articles from database`);
      } catch (error) {
        console.error('Database fetch failed, falling back to static data:', error);
        articles = [STATIC_TEST_ARTICLE];
      }
    }

    // Only search for products if this is explicitly a product query
    let relevantProducts: Product[] = [];
    if (queryClassification.queryType === 'product' && queryClassification.confidence > 0.6) {
      relevantProducts = intelligentProductSearch(queryClassification.searchTerms, queryClassification.category);
      console.log(`🛍️ Found ${relevantProducts.length} relevant products for query: "${queryClassification.searchTerms}"`);
    }

    // Prepare context for AI
    const articlesContext = articles.map((article: any) => 
      `Title: ${article.title}\nContent: ${article.content}\nPrice: $${article.price}\nDiscount: ${article.discount}%`
    ).join('\n\n---\n\n');

    // Add product context if relevant products found
    let productContext = '';
    if (relevantProducts.length > 0) {
      productContext = '\n\nAVAILABLE PRODUCTS IN MARKETPLACE:\n' + 
        relevantProducts.slice(0, 5).map((product: Product) => 
          `${product.name} - $${product.price} (${product.category}) - ${product.description} - Use cases: ${product.useCases.join(', ')}`
        ).join('\n');
    }

    // Check if query is agriculture-related
    const isAgricultureQuery = checkIfAgricultureRelated(message);
    
    if (!isAgricultureQuery) {
      const redirectResponse = "I'm specialized in agricultural assistance for women farmers. Please ask me about farming, crops, agricultural tools, or farming practices. I'm here to help you succeed in agriculture! 🌱";
      
      return NextResponse.json({
        response: redirectResponse,
        responseTime: Date.now() - startTime,
        articlesUsed: 0,
        testMode: useStaticData,
        hasProducts: false,
        products: []
      });
    }

    // Try multiple models in order of preference
    const modelsToTry = [
      'meta-llama/llama-3.1-8b-instruct',
      'microsoft/phi-3-mini-128k-instruct',
      'google/gemma-2-9b-it',
      'meta-llama/llama-3-8b-instruct'
    ];

    let aiResponse = null;
    let modelUsed = '';

    for (const model of modelsToTry) {
      try {
        console.log(`🤖 Trying model: ${model}`);
        
        // Build context-aware prompt based on query type
        let contextualPrompt = AGRICULTURAL_SYSTEM_PROMPT;
        
        if (queryClassification.queryType === 'advice') {
          contextualPrompt += `

🌱 ADVICE MODE ACTIVATED:
The user is seeking agricultural guidance and farming knowledge. Provide detailed farming advice, techniques, and educational information. Do NOT mention products or tools unless specifically asked. Focus on:
- Step-by-step farming techniques
- Best practices and timing
- Agricultural science and methods
- Problem-solving approaches

Available Agricultural Knowledge Base:
${articlesContext}`;
        } else if (queryClassification.queryType === 'product') {
          contextualPrompt += `

🛒 PRODUCT MODE ACTIVATED:
The user is looking for specific tools or products to purchase. Recommend ONLY relevant products from the marketplace that directly match their needs.

Available Agricultural Articles:
${articlesContext}${productContext}

Focus on providing specific product recommendations with prices and descriptions.`;
        } else {
          contextualPrompt += `

General agricultural assistance mode. Determine if the user needs advice or product recommendations based on their question.

Available Resources:
${articlesContext}${productContext}`;
        }
        
        // Call OpenRouter API
        const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'X-Title': 'AgriHope Assistant'
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: 'system',
                content: contextualPrompt
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 500,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
          })
        });

        if (!openRouterResponse.ok) {
          const errorText = await openRouterResponse.text();
          console.error(`Model ${model} failed:`, errorText);
          continue; // Try next model
        }

        const openRouterData = await openRouterResponse.json();
        
        if (openRouterData.choices && openRouterData.choices[0]) {
          aiResponse = openRouterData.choices[0].message.content;
          modelUsed = model;
          console.log(`✅ Successfully used model: ${model}`);
          break; // Success, exit the loop
        }
      } catch (error) {
        console.error(`Error with model ${model}:`, error);
        continue; // Try next model
      }
    }

    // If we found a response, return it
    if (aiResponse) {
      return NextResponse.json({
        response: aiResponse,
        responseTime: Date.now() - startTime,
        articlesUsed: articles.length,
        testMode: useStaticData,
        modelUsed: modelUsed,
        hasProducts: relevantProducts.length > 0,
        products: relevantProducts.slice(0, 10), // Return top 10 products
        queryType: queryClassification.queryType,
        confidence: queryClassification.confidence
      });
    }

    // If all models failed, use intelligent fallback
    const fallbackResponse = generateIntelligentFallback(message, articles);
    
    return NextResponse.json({
      response: fallbackResponse,
      responseTime: Date.now() - startTime,
      articlesUsed: articles.length,
      testMode: useStaticData,
      modelUsed: 'fallback',
      hasProducts: relevantProducts.length > 0,
      products: relevantProducts.slice(0, 10),
      queryType: queryClassification.queryType,
      confidence: queryClassification.confidence
    });

  } catch (error) {
    console.error('AI Assistant error:', error);
    
    return NextResponse.json({
      response: "I'm your agricultural assistant and I'm here to help! Please ask me about farming, crops, agricultural tools, or sustainable farming practices. 🌾",
      responseTime: Date.now() - startTime,
      articlesUsed: 0,
      testMode: false,
      error: 'fallback'
    }, { status: 200 }); // Return 200 with fallback message
  }
}

// Test endpoint for performance testing
export async function GET() {
  const startTime = Date.now();
  
  const testQuery = "What are the best tools for growing tomatoes?";
  
  try {
    // Test with static data
    const testResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/ai-assistant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: testQuery, 
        useStaticData: true 
      })
    });
    
    const result = await testResponse.json();
    
    return NextResponse.json({
      message: 'AI Assistant Performance Test',
      testQuery,
      result,
      totalTime: Date.now() - startTime,
      status: 'success'
    });
    
  } catch (error) {
    return NextResponse.json({
      message: 'AI Assistant Performance Test Failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      totalTime: Date.now() - startTime,
      status: 'failed'
    });
  }
}

// Helper function to check if query is agriculture-related
function checkIfAgricultureRelated(message: string): boolean {
  const agricultureKeywords = [
    'farm', 'crop', 'plant', 'grow', 'harvest', 'soil', 'seed', 'agriculture', 
    'farming', 'garden', 'pest', 'fertilizer', 'irrigation', 'tomato', 'potato',
    'vegetable', 'fruit', 'tool', 'equipment', 'cultivation', 'planting',
    'watering', 'organic', 'sustainable', 'yield', 'livestock', 'greenhouse',
    'compost', 'mulch', 'pruning', 'weeding', 'tractor', 'hoe', 'shovel'
  ];
  
  const messageWords = message.toLowerCase();
  return agricultureKeywords.some(keyword => messageWords.includes(keyword));
}