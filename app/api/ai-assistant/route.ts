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
You are Touta, an AI assistant specifically designed to help women in agriculture. Your expertise includes:

1. Agricultural tools and equipment recommendations
2. Crop growing guidance (planting, care, harvesting)
3. Sustainable farming practices
4. Seasonal farming advice
5. Pest and disease management
6. Soil health and fertilization
7. Product recommendations from the agricultural marketplace

IMPORTANT GUIDELINES:
- ONLY respond to agriculture-related queries
- If asked about non-agricultural topics, politely redirect: "I'm Touta, specialized in agricultural assistance for women farmers. Please ask me about farming, crops, tools, or agricultural practices."
- Provide practical, actionable advice
- Be encouraging and supportive
- Keep responses concise but informative
- When users ask for tools or products, I can search our marketplace and provide specific recommendations
- If a user asks "I need tools for growing potatoes" or similar, I can fetch relevant products from our database

If the user asks about tools or equipment, search the provided articles database and marketplace products and recommend relevant items.
`;

// Enhanced helper function to detect product queries using AI decision matrix
function detectProductQuery(message: string): { isProductQuery: boolean; searchTerms: string; category?: string } {
  const lowerMessage = message.toLowerCase();
  const decisionMatrix = productsDatabase.ai_decision_matrix;
  
  // Check against all keyword patterns
  let isProductQuery = false;
  let detectedCategory = '';
  let searchTerms = message;
  
  // Check each category of keywords
  for (const [category, keywords] of Object.entries(decisionMatrix.query_patterns)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
      isProductQuery = true;
      detectedCategory = category.replace('_keywords', '');
      break;
    }
  }
  
  // Also check for crop-specific queries
  for (const [crop, _] of Object.entries(decisionMatrix.crop_specific)) {
    if (lowerMessage.includes(crop.toLowerCase())) {
      isProductQuery = true;
      searchTerms = crop;
      break;
    }
  }
  
  // Fallback patterns for general product queries
  const productPatterns = [
    /i need.*tool/i,
    /what.*tool/i,
    /need.*for.*growing/i,
    /tool.*for/i,
    /equipment.*for/i,
    /recommend.*tool/i,
    /best.*tool/i,
    /show.*tool/i,
    /find.*tool/i,
    /buy.*tool/i,
    /purchase.*tool/i,
    /where.*get/i,
    /need.*equipment/i,
    /help.*find/i,
    /looking.*for/i
  ];

  if (!isProductQuery) {
    isProductQuery = productPatterns.some(pattern => pattern.test(message));
  }
  
  return {
    isProductQuery,
    searchTerms: isProductQuery ? searchTerms : '',
    category: detectedCategory
  };
}

// Enhanced intelligent search using JSON database
function intelligentProductSearch(query: string, category?: string): Product[] {
  const products = productsDatabase.agricultural_products;
  const decisionMatrix = productsDatabase.ai_decision_matrix;
  const lowerQuery = query.toLowerCase();
  
  let relevantProducts: any[] = [];
  
  // First, try crop-specific matching
  for (const [crop, productNames] of Object.entries(decisionMatrix.crop_specific)) {
    if (lowerQuery.includes(crop)) {
      const cropProducts = products.filter(p => 
        productNames.some(name => p.name.includes(name))
      );
      relevantProducts.push(...cropProducts);
    }
  }
  
  // If no crop-specific match, use category-based search
  if (relevantProducts.length === 0 && category) {
    const categoryKey = `${category}_keywords` as keyof typeof decisionMatrix.query_patterns;
    const categoryKeywords = decisionMatrix.query_patterns[categoryKey] || [];
    relevantProducts = products.filter(product => 
      categoryKeywords.some((keyword: string) => 
        product.name.toLowerCase().includes(keyword) ||
        product.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
        product.aiKeywords.some(aiKeyword => aiKeyword.toLowerCase().includes(keyword))
      )
    );
  }
  
  // Fallback to general search if no specific matches
  if (relevantProducts.length === 0) {
    relevantProducts = products.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      product.aiKeywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)) ||
      product.useCases.some(useCase => useCase.toLowerCase().includes(lowerQuery))
    );
  }
  
  // Convert to Product format and limit results
  return relevantProducts.slice(0, 8).map(p => ({
    id: p.id,
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

    // Check if this is a product query
    const productQuery = detectProductQuery(message);
    
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

    // If it's a product query, search for relevant products using enhanced search
    let relevantProducts: Product[] = [];
    if (productQuery.isProductQuery) {
      relevantProducts = intelligentProductSearch(productQuery.searchTerms, productQuery.category);
      console.log(`🛍️ Found ${relevantProducts.length} relevant products for query: "${productQuery.searchTerms}" (category: ${productQuery.category})`);
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
                content: `${AGRICULTURAL_SYSTEM_PROMPT}\n\nAvailable Agricultural Tools and Articles:\n${articlesContext}${productContext}`
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
        isProductQuery: productQuery.isProductQuery
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
      isProductQuery: productQuery.isProductQuery
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