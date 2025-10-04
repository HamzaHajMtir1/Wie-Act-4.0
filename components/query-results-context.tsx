'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/lib/agricultural-products';

interface QueryResult {
  query: string;
  products: Product[];
  timestamp: Date;
  id: string;
}

interface QueryResultsContextType {
  currentResults: QueryResult | null;
  showResults: (query: string, products: Product[]) => void;
  clearResults: () => void;
  isResultsVisible: boolean;
}

const QueryResultsContext = createContext<QueryResultsContextType | undefined>(undefined);

export function QueryResultsProvider({ children }: { children: ReactNode }) {
  const [currentResults, setCurrentResults] = useState<QueryResult | null>(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const showResults = (query: string, products: Product[]) => {
    const newResult: QueryResult = {
      id: Date.now().toString(),
      query,
      products,
      timestamp: new Date()
    };
    
    setCurrentResults(newResult);
    setIsResultsVisible(true);
    
    // Scroll to results section smoothly
    setTimeout(() => {
      const resultsElement = document.getElementById('ai-query-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const clearResults = () => {
    setCurrentResults(null);
    setIsResultsVisible(false);
  };

  return (
    <QueryResultsContext.Provider value={{
      currentResults,
      showResults,
      clearResults,
      isResultsVisible
    }}>
      {children}
    </QueryResultsContext.Provider>
  );
}

export function useQueryResults() {
  const context = useContext(QueryResultsContext);
  if (context === undefined) {
    throw new Error('useQueryResults must be used within a QueryResultsProvider');
  }
  return context;
}