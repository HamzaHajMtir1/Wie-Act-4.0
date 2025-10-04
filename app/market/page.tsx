"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from 'next/navigation'
import { Search, Star, Heart, ShoppingCart, Leaf, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { agriculturalProducts } from "@/lib/agricultural-products";

const products = agriculturalProducts;

function MarketContent() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [organicOnly, setOrganicOnly] = useState(false)
  const [cart, setCart] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])

  const categories = ["All", "Tools", "Equipment", "Fruits", "Vegetables", "Seeds", "Plants", "Fertilizers", "Soil", "Pest Control"]

  // Handle URL search parameters
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search')
    if (urlSearchTerm) {
      setSearchTerm(decodeURIComponent(urlSearchTerm))
      // Also try to set the category if it matches
      const matchingCategory = categories.find(cat => 
        cat.toLowerCase() === urlSearchTerm.toLowerCase()
      )
      if (matchingCategory) {
        setSelectedCategory(matchingCategory)
      }
      // Scroll to products section after setting search
      setTimeout(() => {
        const productsSection = document.getElementById('products-section')
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // If there's a search term, check if it matches name, tags, category, or description
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.useCases.some(useCase => useCase.toLowerCase().includes(searchTerm.toLowerCase()))
      
      // Category filter - if "All" is selected, show all categories
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      
      // Organic filter
      const matchesOrganic = !organicOnly || product.organic
      
      return matchesSearch && matchesCategory && matchesOrganic
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "featured":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, sortBy, organicOnly])

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId])
  }

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-background dark:via-primary/10 dark:to-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden mt-10">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 px-6 py-3 rounded-full">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="text-primary dark:text-primary font-medium">Fresh • Local • Sustainable</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Farm Fresh
              </span>
              <br />
              <span className="text-foreground">Marketplace</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Supporting women farmers and connecting communities with the freshest, 
              most sustainable agricultural products. Shop directly from female-led farms.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for fresh produce, herbs, dairy..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 border-primary/20 dark:border-primary/30 focus:border-primary dark:focus:border-primary bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="sticky top-20 z-40 bg-white/90 dark:bg-card/90 backdrop-blur-xl border-b border-border/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
                      : 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary hover:bg-primary/20 dark:hover:bg-primary/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Filters & Sort */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-3 py-2 rounded-full">
                <ShoppingCart className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary dark:text-primary">
                  {cart.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products-section" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                >
                  {/* Product Image & Badge */}
                  <div className="relative p-6 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10">
                    <div className="text-8xl text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.featured && (
                        <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </div>
                      )}
                      {product.organic && (
                        <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-bold flex items-center">
                          <Leaf className="h-3 w-3 mr-1" />
                          Organic
                        </div>
                      )}
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-sm hover:bg-white dark:hover:bg-card transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl group"
                    >
                      <Heart 
                        className={`h-5 w-5 transition-all duration-200 ${
                          wishlist.includes(product.id) 
                            ? 'text-red-500 fill-red-500 animate-pulse' 
                            : 'text-rose-400 hover:text-red-500 group-hover:fill-red-100'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>                      
                      

                      {/* Seller & Location */}
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {product.seller}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {product.location}
                        </div>
                      </div>

                      {/* Freshness Info */}
                      <div className="flex items-center justify-between text-xs bg-green-50 dark:bg-green-900/20 rounded-lg p-2 mb-4">
                        <div className="text-green-600 font-medium">
                          {product.quantity}
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <Button
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                        className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                      >
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <ShoppingCart className="h-4 w-4 mr-2 text-white group-hover:text-green-100 transition-all duration-200 relative z-10 group-hover:rotate-12" />
                        <span className="relative z-10">{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Support women farmers, get the freshest produce, and be part of a sustainable future.
          </p>
          
        </div>
      </section>
    </div>
  )
}

export default function Market() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading marketplace...</p>
        </div>
      </div>
    }>
      <MarketContent />
    </Suspense>
  )
}