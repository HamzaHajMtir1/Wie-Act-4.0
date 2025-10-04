'use client';

import React from 'react';
import { useQueryResults } from './query-results-context';
import { AgriQueryResults } from './agri-query-results';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Sparkles, MessageCircle } from 'lucide-react';

export function AIResultsSection() {
  const { currentResults, clearResults, isResultsVisible } = useQueryResults();

  if (!isResultsVisible || !currentResults) {
    return null;
  }

  return (
    <section id="ai-query-results" className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-pink-200 px-8 py-4 rounded-full shadow-xl">
              <div className="p-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl">
                <Sparkles className="h-6 w-6 text-pink-600" />
              </div>
              <span className="text-pink-700 font-bold text-lg">AI-Powered Recommendations</span>
              <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 bg-clip-text text-transparent mb-6">
            Perfect Products for You
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Our AI assistant has curated the perfect agricultural products 
            tailored specifically to your farming needs and goals.
          </p>
          
          <div className="flex items-center justify-center gap-6">
            <Card className="px-6 py-4 bg-gradient-to-br from-pink-50 to-white border-pink-200 shadow-lg">
              <p className="text-lg text-gray-700">
                <span className="font-bold text-pink-600">Your Query:</span> "{currentResults.query}"
              </p>
            </Card>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={clearResults}
              className="border-pink-300 hover:bg-pink-50 text-pink-700 font-medium"
            >
              <X className="h-5 w-5 mr-2" />
              Clear Results
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative">
            <AgriQueryResults 
              query={currentResults.query}
              showTitle={false}
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-3xl mx-auto p-10 bg-gradient-to-br from-pink-50 via-white to-purple-50 border-pink-200 shadow-2xl rounded-3xl">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl">
                <MessageCircle className="h-8 w-8 text-pink-600" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Want More Personalized Recommendations?
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Continue your conversation with our AI assistant for more tailored agricultural advice 
              and discover products perfectly suited to your farming journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  // Scroll to AI chat or open it
                  const chatButton = document.querySelector('[data-ai-chat-button]') as HTMLElement;
                  if (chatButton) {
                    chatButton.click();
                  }
                }}
              >
                <MessageCircle className="h-5 w-5 mr-3" />
                Continue Chat with AI
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-pink-300 hover:bg-pink-50 text-pink-700 font-semibold py-4 px-8 rounded-xl"
                onClick={() => {
                  // Navigate to market page
                  window.location.href = '/market';
                }}
              >
                Browse All Products
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AIResultsSection;