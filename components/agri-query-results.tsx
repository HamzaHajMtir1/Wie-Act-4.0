'use client';

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Leaf, MapPin, Users, Sparkles, Package, Wrench } from "lucide-react";
import { Product, searchProductsByQuery, getToolsForCrop } from "@/lib/agricultural-products";

interface AgriQueryResultsProps {
  query: string;
  onClose?: () => void;
  showTitle?: boolean;
}

export function AgriQueryResults({ query, onClose, showTitle = true }: AgriQueryResultsProps) {
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      // Simulate API delay for more realistic feel
      setTimeout(() => {
        const searchResults = searchProductsByQuery(query);
        setResults(searchResults);
        setIsLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [query]);

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'tools':
        return <Wrench className="h-4 w-4" />;
      case 'equipment':
        return <Package className="h-4 w-4" />;
      case 'seeds':
      case 'plants':
        return <Leaf className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  if (!query.trim()) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {showTitle && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Sparkles className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">AI Recommendations</h2>
                <p className="text-gray-600">Based on your query: "{query}"</p>
              </div>
            </div>
            {onClose && (
              <Button variant="outline" onClick={onClose} size="sm">
                Close
              </Button>
            )}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <span className="ml-3 text-gray-600">Finding the best products for you...</span>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600">Try searching for specific crops, tools, or farming needs</p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Found {results.length} product{results.length !== 1 ? 's' : ''} matching your query
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <ShoppingCart className="h-3 w-3" />
                Cart ({cart.length})
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                Wishlist ({wishlist.length})
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                {/* Product Image & Badge */}
                <div className="relative p-6 bg-gradient-to-br from-emerald-50 to-blue-50">
                  <div className="text-6xl text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="flex items-center gap-1 text-xs">
                      {getCategoryIcon(product.category)}
                      {product.category}
                    </Badge>
                    {product.featured && (
                      <Badge variant="secondary" className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                    {product.organic && (
                      <Badge className="flex items-center gap-1 text-xs bg-green-100 text-green-800">
                        <Leaf className="h-3 w-3" />
                        Organic
                      </Badge>
                    )}
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 transform hover:scale-110"
                  >
                    <Heart 
                      className={`h-4 w-4 transition-colors ${
                        wishlist.includes(product.id) 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Seller & Location */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {product.seller}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {product.location}
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">Perfect for:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.useCases.slice(0, 3).map((useCase, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200"
                          >
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Info */}
                    <div className="bg-gray-50 rounded-lg p-2 mb-4">
                      <div className="text-sm font-medium text-gray-700">
                        {product.quantity}
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-emerald-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add' : 'Out of Stock'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="border-emerald-200 hover:bg-emerald-50">
                View All Tools
              </Button>
              <Button variant="outline" size="sm" className="border-emerald-200 hover:bg-emerald-50">
                Browse Seeds
              </Button>
              <Button variant="outline" size="sm" className="border-emerald-200 hover:bg-emerald-50">
                Fertilizers
              </Button>
              <Button variant="outline" size="sm" className="border-emerald-200 hover:bg-emerald-50">
                Organic Products
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AgriQueryResults;