'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  Image as ImageIcon, 
  Bot, 
  User, 
  Volume2,
  MicOff,
  Loader2,
  Sparkles,
  Leaf,
  Sprout,
  TreePine
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  messageType: 'text' | 'voice' | 'image';
  isPlaying?: boolean;
}

const AgricultureAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize messages after hydration to avoid SSR mismatch
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "Hello! I'm AgriAssist, your smart agricultural companion. I'm here to help you with farming advice, crop guidance, and agricultural tools. How can I assist you today?",
        timestamp: new Date(),
        messageType: 'text'
      }
    ]);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      messageType: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.response || 'I apologize, but I encountered an issue processing your request. Please try again.',
        timestamp: new Date(),
        messageType: 'text'
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I apologize, but I\'m having trouble connecting right now. Please check your internet connection and try again.',
        timestamp: new Date(),
        messageType: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording);
    // Simulate voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage: Message = {
          id: Date.now().toString(),
          type: 'user',
          content: "Voice message: How to grow organic vegetables?",
          timestamp: new Date(),
          messageType: 'voice'
        };
        setMessages(prev => [...prev, voiceMessage]);
      }, 3000);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: `Plant image uploaded: ${file.name} - Let me analyze this for you!`,
        timestamp: new Date(),
        messageType: 'image'
      };
      setMessages(prev => [...prev, imageMessage]);
    }
  };

  const playVoiceMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isPlaying: !msg.isPlaying }
        : msg
    ));
    
    // Simulate voice playing for 3 seconds
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isPlaying: false }
          : msg
      ));
    }, 3000);
  };

  return (
    <>
      {/* Creative Agricultural Toggle Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group relative overflow-hidden"
          style={{
            animation: 'float 3s ease-in-out infinite'
          }}
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 animate-pulse"></div>
          
          {/* Floating agricultural particles */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-green-200 rounded-full animate-bounce delay-200"></div>
          <div className="absolute top-3 left-1 w-1.5 h-1.5 bg-emerald-200 rounded-full animate-bounce delay-500"></div>
          
          {/* Main agricultural icon */}
          <Leaf className="h-7 w-7 text-white group-hover:rotate-12 transition-transform duration-300" />
          
          {/* Multiple pulse rings */}
          <div className="absolute inset-0 rounded-full border-2 border-green-300/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border border-emerald-300/20 animate-ping delay-300"></div>
          
          {/* Smart agricultural notification indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse shadow-lg">
            <Sprout className="h-3 w-3" />
          </div>
        </Button>
      </div>

      {/* Agricultural Chat Interface - 60% Screen Width */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
        
        {/* Chat Container - 60% width, positioned below navbar */}
        <div className={`absolute right-0 top-20 h-[calc(100vh-5rem)] transition-all duration-500 ${isOpen ? 'w-[60%]' : 'w-0'}`}>
          <Card className="h-full bg-white/95 backdrop-blur-xl border border-green-200/50 shadow-2xl flex flex-col rounded-tl-2xl">
            
            {/* Creative Agricultural Header */}
            <div className="flex items-center justify-between p-4 border-b border-green-100 bg-gradient-to-r from-green-50 via-emerald-25 to-green-50 rounded-tl-2xl">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <Leaf className="h-6 w-6 text-white animate-pulse" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                    <Sparkles className="h-2 w-2 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
                    AgriAssist
                  </h3>
                  <div className="text-sm text-green-600 flex items-center space-x-1">
                    <span>Your Smart Agricultural Companion</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-red-100 hover:text-red-600 transition-colors duration-300 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-green-25/30 to-white">
              {isHydrated && messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                  style={{
                    animation: 'slideIn 0.3s ease-out'
                  }}
                >
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-green-500 to-emerald-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Leaf className="h-5 w-5 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[75%] rounded-2xl p-4 shadow-lg backdrop-blur-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-auto'
                      : 'bg-white/90 border border-green-100 text-gray-800'
                  }`}>
                    
                    {/* Message Type Icons */}
                    <div className="flex items-center space-x-2 mb-2">
                      {message.messageType === 'voice' && (
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => playVoiceMessage(message.id)}
                            className="p-1 h-auto hover:bg-white/10 rounded-full"
                          >
                            {message.isPlaying ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>
                          <div className="flex space-x-1 items-end">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-1 bg-current rounded-full transition-all duration-300 ${
                                  message.isPlaying ? 'animate-pulse' : ''
                                }`}
                                style={{ 
                                  height: `${Math.random() * 16 + 6}px`,
                                  animationDelay: `${i * 0.1}s`
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      )}
                      {message.messageType === 'image' && (
                        <div className="flex items-center space-x-2">
                          <ImageIcon className="h-4 w-4" />
                          <span className="text-xs opacity-70">Image Analysis</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                    
                    <div className={`text-xs mt-2 opacity-70 ${
                      message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {isHydrated ? message.timestamp.toLocaleTimeString() : ''}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isHydrated && isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white/90 border border-green-100 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
                      <span className="text-xs text-green-600 ml-2">AgriAssist is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Creative Agricultural Input Area */}
            <div className="p-4 border-t border-green-100 bg-gradient-to-r from-green-50/80 via-white to-emerald-50/80 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                
                {/* Image Upload */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200 hover:border-emerald-400 hover:from-emerald-100 hover:to-green-200 transition-all duration-300 hover:scale-110 hover:shadow-lg h-10 w-10 p-0"
                  title="Upload plant image for analysis"
                >
                  <ImageIcon className="h-4 w-4 text-emerald-600 hover:text-emerald-700" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Voice Recording */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleVoiceMessage}
                  className={`rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg h-10 w-10 p-0 ${
                    isRecording 
                      ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white border-red-400 animate-pulse shadow-lg' 
                      : 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:border-blue-400 hover:from-blue-100 hover:to-indigo-200'
                  }`}
                  title={isRecording ? "Stop recording" : "Record voice message"}
                >
                  {isRecording ? <MicOff className="h-4 w-4 text-white" /> : <Mic className="h-4 w-4 text-blue-600 hover:text-blue-700" />}
                </Button>

                {/* Text Input */}
                <div className="flex-1 relative">
                  <div className="relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask about farming, crops, tools, or agricultural advice..."
                      className="pr-12 pl-4 rounded-2xl border-0 bg-gradient-to-r from-gray-50 via-white to-gray-50 focus:from-emerald-50 focus:via-white focus:to-emerald-50 shadow-inner focus:shadow-lg h-14 text-base text-gray-800 font-medium placeholder:text-gray-400 transition-all duration-500 ring-2 ring-gray-200/50 focus:ring-emerald-300/60 hover:ring-emerald-200/40"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 via-transparent to-blue-400/20 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    disabled={!inputMessage.trim()}
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 p-0 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-600 transition-all duration-300 hover:scale-110 disabled:opacity-50"
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Recording Indicator */}
              {isRecording && (
                <div className="mt-3 flex items-center justify-center space-x-2 text-red-500 bg-red-50 rounded-full py-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">🎤 Recording agricultural question... Tap to stop</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}

              {/* Quick Tips */}
              <div className="mt-2 text-center">
                <p className="text-xs text-green-600/70">
                  💡 Try asking: "How to grow tomatoes?" or "Best farming tools for women?"
                </p>
              </div>
            </div>

          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default AgricultureAIAssistant;