'use client';

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, Shield, Leaf, Mail } from "lucide-react";
import { validateAdminCredentials, setAdminSession } from "@/lib/admin-auth";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    if (validateAdminCredentials(email, password)) {
      setAdminSession();
      onLoginSuccess();
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200/30 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-rose-200/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-300/20 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 bg-rose-300/30 rounded-full animate-bounce delay-700"></div>
        
        {/* Floating agricultural elements */}
        <div className="absolute top-20 right-40 text-pink-300/40 animate-pulse">
          <Leaf className="h-8 w-8" />
        </div>
        <div className="absolute bottom-40 left-40 text-rose-300/40 animate-pulse delay-200">
          <Leaf className="h-6 w-6" />
        </div>
      </div>

      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-xl shadow-2xl border border-pink-200/50 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Admin Login
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Access the Agri-Hope Administration Panel
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="pl-10 border-gray-200 focus:border-pink-400 focus:ring-pink-300 h-12"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 pr-12 border-gray-200 focus:border-pink-400 focus:ring-pink-300 h-12"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded-lg">
          <p className="text-xs text-pink-700 text-center mb-3">
            <strong>Demo Credentials:</strong><br />
            Email: touta@ieee.org | Password: Touta2025
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setEmail('touta@ieee.org');
              setPassword('Touta2025');
            }}
            className="w-full text-pink-600 border-pink-300 hover:bg-pink-100 text-xs"
          >
            Auto-fill Demo Credentials
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Agri-Hope. Secure admin access.
          </p>
        </div>
      </Card>
    </div>
  );
};