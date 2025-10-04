// Agricultural Products Database
export interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  seller: string
  location: string
  image: string
  organic: boolean
  quantity: string
  inStock: boolean
  featured: boolean
  tags: string[]
  description: string
  useCases: string[]
}

export const agriculturalProducts: Product[] = [
  // FARMING TOOLS & EQUIPMENT
  {
    id: 1,
    name: "Professional Garden Hoe",
    category: "Tools",
    price: 29.99,
    originalPrice: 39.99,
    seller: "AgriTools Pro",
    location: "Iowa, USA",
    image: "🔨",
    organic: false,
    quantity: "Heavy-duty steel",
    inStock: true,
    featured: true,
    tags: ["hoe", "garden", "soil", "weeding", "cultivation", "potato", "vegetable"],
    description: "Professional-grade garden hoe for soil cultivation and weeding",
    useCases: ["potato planting", "vegetable gardens", "soil preparation", "weed removal"]
  },
  {
    id: 2,
    name: "Potato Planting Shovel",
    category: "Tools",
    price: 24.99,
    seller: "Farm Essentials",
    location: "Idaho, USA",
    image: "🥄",
    organic: false,
    quantity: "Ergonomic handle",
    inStock: true,
    featured: true,
    tags: ["shovel", "planting", "potato", "digging", "root", "vegetables"],
    description: "Specialized shovel designed for potato planting and root vegetable cultivation",
    useCases: ["potato planting", "root vegetables", "soil digging", "transplanting"]
  },
  {
    id: 3,
    name: "Irrigation Sprinkler System",
    category: "Equipment",
    price: 89.99,
    originalPrice: 119.99,
    seller: "WaterWise Systems",
    location: "California, USA",
    image: "💧",
    organic: false,
    quantity: "Complete kit",
    inStock: true,
    featured: true,
    tags: ["irrigation", "water", "sprinkler", "potato", "vegetables", "automated"],
    description: "Automated irrigation system perfect for vegetable gardens",
    useCases: ["potato irrigation", "vegetable watering", "garden automation", "water conservation"]
  },
  {
    id: 4,
    name: "Organic Compost Spreader",
    category: "Tools",
    price: 45.99,
    seller: "EcoFarm Tools",
    location: "Oregon, USA",
    image: "🚜",
    organic: true,
    quantity: "Manual spreader",
    inStock: true,
    featured: false,
    tags: ["compost", "fertilizer", "organic", "spreader", "soil", "nutrients"],
    description: "Manual compost spreader for organic soil enrichment",
    useCases: ["soil fertilization", "organic farming", "compost distribution", "nutrient application"]
  },
  {
    id: 5,
    name: "Seed Planting Kit",
    category: "Tools",
    price: 19.99,
    seller: "GreenThumb Supplies",
    location: "Vermont, USA",
    image: "🌱",
    organic: false,
    quantity: "Complete set",
    inStock: true,
    featured: true,
    tags: ["seeds", "planting", "kit", "vegetables", "garden", "startup"],
    description: "Complete seed planting kit with tools and guides",
    useCases: ["seed planting", "garden starting", "vegetable cultivation", "plant propagation"]
  },
  {
    id: 6,
    name: "Garden Rake Heavy Duty",
    category: "Tools",
    price: 32.99,
    seller: "ToolCraft Agricultural",
    location: "Kansas, USA",
    image: "🧹",
    organic: false,
    quantity: "Steel tines",
    inStock: true,
    featured: false,
    tags: ["rake", "soil", "preparation", "leveling", "debris", "garden"],
    description: "Heavy-duty rake for soil preparation and garden maintenance",
    useCases: ["soil leveling", "debris removal", "garden cleanup", "soil preparation"]
  },
  {
    id: 7,
    name: "Plant Support Stakes",
    category: "Tools",
    price: 16.99,
    seller: "Garden Support Co",
    location: "Michigan, USA",
    image: "🎋",
    organic: false,
    quantity: "Pack of 20",
    inStock: true,
    featured: false,
    tags: ["stakes", "support", "tomato", "plants", "garden", "growth"],
    description: "Bamboo stakes for supporting growing plants and vegetables",
    useCases: ["tomato support", "plant staking", "garden support", "vertical growing"]
  },

  // FRUITS
  {
    id: 8,
    name: "Organic Fresh Tomatoes",
    category: "Fruits",
    price: 4.99,
    originalPrice: 6.99,
    seller: "Sarah's Green Farm",
    location: "California, USA",
    image: "🍅",
    organic: true,
    quantity: "2 lbs",
    inStock: true,
    featured: true,
    tags: ["organic", "fresh", "local", "pesticide-free", "tomato", "red"],
    description: "Fresh organic tomatoes grown with sustainable farming practices",
    useCases: ["cooking", "salads", "sauces", "fresh eating"]
  },
  {
    id: 9,
    name: "Sweet Strawberry Basket",
    category: "Fruits",
    price: 8.99,
    originalPrice: 11.99,
    seller: "Maria's Berry Farm",
    location: "Oregon, USA",
    image: "🍓",
    organic: true,
    quantity: "3 lbs basket",
    inStock: true,
    featured: true,
    tags: ["strawberry", "sweet", "organic", "berries", "fresh", "seasonal"],
    description: "Sweet, juicy strawberries picked at peak ripeness",
    useCases: ["fresh eating", "desserts", "smoothies", "jams"]
  },
  {
    id: 10,
    name: "Golden Apple Harvest",
    category: "Fruits",
    price: 6.99,
    seller: "Orchard Valley Farm",
    location: "Washington, USA",
    image: "🍎",
    organic: true,
    quantity: "5 lbs bag",
    inStock: true,
    featured: false,
    tags: ["apple", "golden", "crisp", "organic", "sweet", "orchard"],
    description: "Crisp golden apples from sustainable orchards",
    useCases: ["fresh eating", "baking", "juicing", "snacks"]
  },
  {
    id: 11,
    name: "Fresh Orange Grove",
    category: "Fruits",
    price: 7.99,
    seller: "Sunshine Citrus Co",
    location: "Florida, USA",
    image: "🍊",
    organic: true,
    quantity: "4 lbs",
    inStock: true,
    featured: true,
    tags: ["orange", "citrus", "vitamin-c", "fresh", "juice", "sweet"],
    description: "Fresh oranges bursting with natural vitamin C",
    useCases: ["juicing", "fresh eating", "cooking", "vitamin supplement"]
  },
  {
    id: 12,
    name: "Banana Bunch Premium",
    category: "Fruits",
    price: 3.99,
    seller: "Tropical Farms",
    location: "Hawaii, USA",
    image: "🍌",
    organic: true,
    quantity: "3 lbs bunch",
    inStock: true,
    featured: false,
    tags: ["banana", "tropical", "potassium", "energy", "sweet", "organic"],
    description: "Premium organic bananas packed with potassium",
    useCases: ["fresh eating", "smoothies", "baking", "energy snacks"]
  },

  // VEGETABLES
  {
    id: 13,
    name: "Organic Potato Harvest",
    category: "Vegetables",
    price: 3.99,
    seller: "Mountain View Farm",
    location: "Idaho, USA",
    image: "🥔",
    organic: true,
    quantity: "5 lbs bag",
    inStock: true,
    featured: true,
    tags: ["potato", "organic", "starchy", "versatile", "russet", "fresh"],
    description: "Fresh organic potatoes perfect for any cooking method",
    useCases: ["cooking", "baking", "frying", "mashing"]
  },
  {
    id: 14,
    name: "Fresh Carrot Bundle",
    category: "Vegetables",
    price: 2.99,
    seller: "Root & Stem Farm",
    location: "Michigan, USA",
    image: "🥕",
    organic: true,
    quantity: "2 lbs bundle",
    inStock: true,
    featured: false,
    tags: ["carrot", "orange", "root", "vegetable", "vitamin-a", "crunchy"],
    description: "Crisp, sweet carrots rich in beta-carotene",
    useCases: ["cooking", "snacking", "juicing", "salads"]
  },
  {
    id: 15,
    name: "Leafy Spinach Greens",
    category: "Vegetables",
    price: 3.49,
    seller: "Leafy Greens Co",
    location: "California, USA",
    image: "🥬",
    organic: true,
    quantity: "1 lb bag",
    inStock: true,
    featured: true,
    tags: ["spinach", "leafy", "greens", "iron", "nutrients", "salad"],
    description: "Fresh spinach leaves packed with nutrients",
    useCases: ["salads", "smoothies", "cooking", "nutrition"]
  },
  {
    id: 16,
    name: "Bell Pepper Mix",
    category: "Vegetables",
    price: 5.99,
    seller: "Rainbow Gardens",
    location: "Arizona, USA",
    image: "🫑",
    organic: true,
    quantity: "3 lbs mix",
    inStock: true,
    featured: false,
    tags: ["pepper", "bell", "colorful", "sweet", "vitamin-c", "crunchy"],
    description: "Colorful mix of sweet bell peppers",
    useCases: ["cooking", "stuffing", "salads", "stir-fry"]
  },
  {
    id: 17,
    name: "Fresh Broccoli Crowns",
    category: "Vegetables",
    price: 4.49,
    seller: "Green Valley Farms",
    location: "California, USA",
    image: "🥦",
    organic: true,
    quantity: "2 lbs",
    inStock: true,
    featured: true,
    tags: ["broccoli", "green", "nutritious", "vitamin-k", "healthy", "fresh"],
    description: "Fresh broccoli crowns packed with vitamins",
    useCases: ["steaming", "roasting", "stir-fry", "salads"]
  },

  // SEEDS & PLANTS
  {
    id: 18,
    name: "Potato Seed Collection",
    category: "Seeds",
    price: 12.99,
    seller: "Heritage Seeds",
    location: "Montana, USA",
    image: "🌰",
    organic: true,
    quantity: "Variety pack",
    inStock: true,
    featured: true,
    tags: ["potato", "seeds", "planting", "variety", "heirloom", "growing"],
    description: "Heirloom potato seed collection for home growing",
    useCases: ["potato growing", "gardening", "sustainable farming", "home cultivation"]
  },
  {
    id: 19,
    name: "Tomato Seedlings",
    category: "Plants",
    price: 8.99,
    seller: "Young Plants Nursery",
    location: "Georgia, USA",
    image: "🌿",
    organic: true,
    quantity: "6 plants",
    inStock: true,
    featured: true,
    tags: ["tomato", "seedlings", "plants", "young", "transplant", "garden"],
    description: "Healthy tomato seedlings ready for transplanting",
    useCases: ["tomato growing", "garden planting", "home cultivation", "transplanting"]
  },
  {
    id: 20,
    name: "Vegetable Seed Starter Kit",
    category: "Seeds",
    price: 24.99,
    seller: "Garden Genesis",
    location: "Colorado, USA",
    image: "📦",
    organic: true,
    quantity: "20 varieties",
    inStock: true,
    featured: true,
    tags: ["seeds", "vegetables", "starter", "kit", "variety", "garden"],
    description: "Complete vegetable seed starter kit with 20 varieties",
    useCases: ["garden starting", "vegetable growing", "seed starting", "home gardening"]
  },

  // FERTILIZERS & SOIL
  {
    id: 21,
    name: "Organic Potato Fertilizer",
    category: "Fertilizers",
    price: 15.99,
    seller: "Natural Growth Co",
    location: "Wisconsin, USA",
    image: "🌱",
    organic: true,
    quantity: "10 lb bag",
    inStock: true,
    featured: true,
    tags: ["fertilizer", "potato", "organic", "nutrients", "soil", "growth"],
    description: "Specialized organic fertilizer for potato cultivation",
    useCases: ["potato growing", "soil enrichment", "plant nutrition", "organic farming"]
  },
  {
    id: 22,
    name: "Premium Potting Soil",
    category: "Soil",
    price: 9.99,
    seller: "Soil Masters",
    location: "Colorado, USA",
    image: "🪴",
    organic: true,
    quantity: "20 lb bag",
    inStock: true,
    featured: false,
    tags: ["soil", "potting", "premium", "organic", "nutrients", "garden"],
    description: "Premium organic potting soil for all vegetables",
    useCases: ["container gardening", "transplanting", "seed starting", "plant growing"]
  },
  {
    id: 23,
    name: "Vegetable Garden Compost",
    category: "Soil",
    price: 12.99,
    seller: "Compost Central",
    location: "Vermont, USA",
    image: "🌿",
    organic: true,
    quantity: "30 lb bag",
    inStock: true,
    featured: true,
    tags: ["compost", "organic", "soil", "nutrients", "vegetables", "enrichment"],
    description: "Rich organic compost perfect for vegetable gardens",
    useCases: ["soil improvement", "vegetable growing", "organic gardening", "nutrient boost"]
  },

  // PEST CONTROL
  {
    id: 24,
    name: "Organic Pest Control Spray",
    category: "Pest Control",
    price: 18.99,
    seller: "EcoGuard Solutions",
    location: "North Carolina, USA",
    image: "🌿",
    organic: true,
    quantity: "32 oz bottle",
    inStock: true,
    featured: true,
    tags: ["pest", "control", "organic", "spray", "safe", "vegetables"],
    description: "Organic pest control safe for food crops",
    useCases: ["pest management", "crop protection", "organic farming", "plant health"]
  },
  {
    id: 25,
    name: "Beneficial Insect Attractant",
    category: "Pest Control",
    price: 14.99,
    seller: "Nature's Balance",
    location: "California, USA",
    image: "🐛",
    organic: true,
    quantity: "8 oz bottle",
    inStock: true,
    featured: false,
    tags: ["beneficial", "insects", "natural", "pest", "control", "organic"],
    description: "Attracts beneficial insects for natural pest control",
    useCases: ["natural pest control", "beneficial insects", "organic farming", "ecosystem balance"]
  },

  // HARVESTING TOOLS
  {
    id: 26,
    name: "Harvest Basket Set",
    category: "Tools",
    price: 34.99,
    seller: "Harvest Helper Tools",
    location: "Ohio, USA",
    image: "🧺",
    organic: false,
    quantity: "3 basket set",
    inStock: true,
    featured: false,
    tags: ["harvest", "basket", "collection", "vegetables", "fruits", "storage"],
    description: "Durable basket set for harvesting fruits and vegetables",
    useCases: ["harvesting", "fruit collection", "vegetable gathering", "storage"]
  },
  {
    id: 27,
    name: "Pruning Shears Pro",
    category: "Tools",
    price: 22.99,
    seller: "Cut & Grow Tools",
    location: "Pennsylvania, USA",
    image: "✂️",
    organic: false,
    quantity: "Professional grade",
    inStock: true,
    featured: true,
    tags: ["pruning", "shears", "cutting", "plants", "maintenance", "sharp"],
    description: "Professional pruning shears for plant maintenance",
    useCases: ["plant pruning", "harvesting", "plant care", "garden maintenance"]
  },
  {
    id: 28,
    name: "Garden Gloves Premium",
    category: "Tools",
    price: 12.99,
    seller: "Protective Gear Co",
    location: "Texas, USA",
    image: "🧤",
    organic: false,
    quantity: "Pair",
    inStock: true,
    featured: false,
    tags: ["gloves", "protection", "garden", "hands", "safety", "durable"],
    description: "Premium garden gloves for hand protection during farming",
    useCases: ["hand protection", "gardening", "farming", "plant handling"]
  },

  // WATERING SYSTEMS
  {
    id: 29,
    name: "Drip Irrigation Kit",
    category: "Equipment",
    price: 49.99,
    seller: "Water Smart Systems",
    location: "Arizona, USA",
    image: "💧",
    organic: false,
    quantity: "Complete system",
    inStock: true,
    featured: true,
    tags: ["drip", "irrigation", "water", "efficient", "vegetables", "system"],
    description: "Water-efficient drip irrigation system for vegetable gardens",
    useCases: ["water conservation", "vegetable irrigation", "efficient watering", "garden automation"]
  },
  {
    id: 30,
    name: "Garden Watering Can",
    category: "Tools",
    price: 18.99,
    seller: "Garden Basics",
    location: "Oregon, USA",
    image: "🪣",
    organic: false,
    quantity: "2 gallon capacity",
    inStock: true,
    featured: false,
    tags: ["watering", "can", "garden", "plants", "manual", "traditional"],
    description: "Traditional garden watering can for precise plant watering",
    useCases: ["plant watering", "seedling care", "precision watering", "garden maintenance"]
  },

  // FRESH ORGANIC VEGETABLES
  {
    id: 31,
    name: "Fresh Organic Carrots",
    category: "Vegetables",
    price: 3.49,
    seller: "Sunny Valley Farm",
    location: "Washington, USA",
    image: "🥕",
    organic: true,
    quantity: "2lb bunch",
    inStock: true,
    featured: true,
    tags: ["carrots", "fresh", "organic", "root vegetables", "healthy"],
    description: "Fresh organic carrots harvested this week",
    useCases: ["fresh eating", "cooking", "juicing", "healthy snacks"]
  },
  {
    id: 32,
    name: "Fresh Organic Spinach",
    category: "Vegetables",
    price: 4.99,
    seller: "Green Leaf Farms",
    location: "California, USA",
    image: "🥬",
    organic: true,
    quantity: "1lb bag",
    inStock: true,
    featured: true,
    tags: ["spinach", "fresh", "organic", "leafy greens", "healthy"],
    description: "Fresh organic spinach leaves perfect for salads and cooking",
    useCases: ["fresh salads", "cooking", "smoothies", "healthy eating"]
  },
  {
    id: 33,
    name: "Organic Bell Pepper Mix",
    category: "Vegetables",
    price: 5.99,
    seller: "Rainbow Gardens",
    location: "Texas, USA",
    image: "🫑",
    organic: true,
    quantity: "2lb mixed colors",
    inStock: true,
    featured: false,
    tags: ["bell peppers", "fresh", "organic", "colorful", "sweet"],
    description: "Organic bell peppers in red, yellow, and green varieties",
    useCases: ["cooking", "fresh eating", "stuffed peppers", "salads"]
  },
  {
    id: 34,
    name: "Fresh Organic Broccoli",
    category: "Vegetables",
    price: 3.99,
    seller: "Valley Fresh",
    location: "Oregon, USA",
    image: "🥦",
    organic: true,
    quantity: "1.5lb head",
    inStock: true,
    featured: true,
    tags: ["broccoli", "fresh", "organic", "cruciferous", "nutritious"],
    description: "Fresh organic broccoli heads harvested daily",
    useCases: ["steaming", "roasting", "stir-fry", "raw salads"]
  }
];

// Function to search products by query and use cases
export function searchProductsByQuery(query: string): Product[] {
  const searchTerms = query.toLowerCase().split(' ');
  
  return agriculturalProducts.filter(product => {
    const searchableText = [
      product.name,
      product.description,
      product.category,
      ...product.tags,
      ...product.useCases
    ].join(' ').toLowerCase();
    
    return searchTerms.some(term => searchableText.includes(term));
  });
}

// Function to get tools for specific crops
export function getToolsForCrop(crop: string): Product[] {
  const cropLower = crop.toLowerCase();
  
  return agriculturalProducts.filter(product => {
    const relevantText = [
      product.name,
      product.description,
      ...product.tags,
      ...product.useCases
    ].join(' ').toLowerCase();
    
    return relevantText.includes(cropLower) || 
           (cropLower === 'potato' && relevantText.includes('root')) ||
           (cropLower === 'tomato' && relevantText.includes('vegetable'));
  });
}