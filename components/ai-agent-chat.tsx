"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
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
  Zap
} from "lucide-react"

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  messageType: 'text' | 'voice' | 'image'
  isPlaying?: boolean
}

export function AIAgentChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Initialize messages after hydration to avoid SSR mismatch
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date(),
        messageType: 'text'
      }
    ])
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      messageType: 'text'
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I understand your message. This is a demo response from the AI assistant.",
        timestamp: new Date(),
        messageType: 'text'
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording)
    // Simulate voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        const voiceMessage: Message = {
          id: Date.now().toString(),
          type: 'user',
          content: "Voice message recorded (demo)",
          timestamp: new Date(),
          messageType: 'voice'
        }
        setMessages(prev => [...prev, voiceMessage])
      }, 3000)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: `Image uploaded: ${file.name}`,
        timestamp: new Date(),
        messageType: 'image'
      }
      setMessages(prev => [...prev, imageMessage])
    }
  }

  const playVoiceMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isPlaying: !msg.isPlaying }
        : msg
    ))
    
    // Simulate voice playing for 3 seconds
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isPlaying: false }
          : msg
      ))
    }, 3000)
  }

  return (
    <>
      {/* Creative Toggle Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-primary shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group relative overflow-hidden floating-pulse cursor-pointer"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 gradient-animate"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-200"></div>
          <div className="absolute top-3 left-1 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce delay-500"></div>
          
          {/* Main icon */}
          <MessageCircle className="h-7 w-7 text-primary-foreground group-hover:rotate-12 transition-transform duration-300 cursor-pointer" />
          
          {/* Multiple pulse rings */}
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border border-white/15 animate-ping delay-300"></div>
          
          {/* Smart notification indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse shadow-lg">
            <Zap className="h-3 w-3" />
          </div>
        </Button>
      </div>

      {/* Chat Interface - 60% Screen Width */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
        
        {/* Chat Container - 60% width, positioned below navbar */}
        <div className={`absolute right-0 top-20 h-[calc(100vh-5rem)] transition-all duration-500 ${isOpen ? 'w-[60%]' : 'w-0'}`}>
          <Card className="h-full bg-background/95 backdrop-blur-xl border border-primary/20 shadow-2xl flex flex-col rounded-tl-2xl">
            
            {/* Creative Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary/10 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-tl-2xl">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="h-5 w-5 text-primary-foreground animate-pulse" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent gradient-animate">
                    Touta
                  </h3>
                  <div className="text-xs text-muted-foreground flex items-center space-x-1">
                    <span>Always here to help you </span>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-red-100 hover:text-red-600 transition-colors duration-300 rounded-full cursor-pointer"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              {isHydrated && messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 message-enter ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-br from-accent to-primary' 
                      : 'bg-gradient-to-br from-primary to-accent'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[75%] rounded-2xl p-3 shadow-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground ml-auto'
                      : 'bg-background border border-primary/10 text-foreground'
                  }`}>
                    
                    {/* Message Type Icons */}
                    <div className="flex items-center space-x-2 mb-2">
                      {message.messageType === 'voice' && (
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => playVoiceMessage(message.id)}
                            className="p-1 h-auto hover:bg-white/10"
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
                                  message.isPlaying ? 'voice-wave' : ''
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
                        <ImageIcon className="h-4 w-4" />
                      )}
                    </div>

                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    <div className={`text-xs mt-2 opacity-70 ${
                      message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {isHydrated ? message.timestamp.toLocaleTimeString() : ''}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isHydrated && isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-background border border-primary/10 rounded-2xl p-3 shadow-lg">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Creative Input Area */}
            <div className="p-4 border-t border-primary/10 bg-gradient-to-r from-primary/5 via-background to-accent/5">
              <div className="flex items-center space-x-2">
                
                {/* Image Upload */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full hover:border-primary/30 transition-all duration-300 hover:scale-110 h-8 w-8 p-0 cursor-pointer"
                >
                  <ImageIcon className="h-3 w-3" />
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
                  className={`rounded-full transition-all duration-300 hover:scale-110 h-8 w-8 p-0 cursor-pointer ${
                    isRecording 
                      ? 'bg-red-500 text-red-50 border-red-500 animate-pulse' 
                      : 'hover:border-primary/30'
                  }`}
                >
                  {isRecording ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                </Button>

                {/* Text Input */}
                <div className="flex-1 relative">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="pr-10 rounded-full border-primary/20 focus:border-primary/40 bg-background/50 backdrop-blur-sm h-8 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-6 h-6 p-0 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300 hover:scale-110 cursor-pointer"
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Recording Indicator */}
              {isRecording && (
                <div className="mt-2 flex items-center justify-center space-x-2 text-red-500">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">Recording... Tap to stop</span>
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

          </Card>
        </div>
      </div>
    </>
  )
}