"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, Users, Heart, Code, Zap } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/', icon: Sparkles },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Contact', href: '/contact', icon: Heart },
  ]

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-primary/20' 
        : 'bg-background/70 backdrop-blur-md border-b border-border/50'
    }`}>
      {/* Creative floating gradient decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Creative Logo with animated elements */}
          <div className="flex-shrink-0 group">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sparkles className="h-5 w-5 text-primary-foreground animate-pulse" />
                </div>
                {/* Floating particles effect */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-bounce delay-100"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full animate-bounce delay-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  WIE
                </h1>
                <p className="text-xs text-muted-foreground font-medium tracking-wider">EMPOWERMENT</p>
              </div>
            </div>
          </div>

          {/* Creative Desktop Navigation with floating effect */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1 bg-background/50 backdrop-blur-sm rounded-full px-6 py-3 border border-primary/20 shadow-lg">
              {navItems.map((item, index) => {
                const IconComponent = item.icon
                const isActive = isActiveRoute(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-primary/10 hover:scale-105 ${
                      isActive ? 'bg-primary/10 text-primary' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`h-4 w-4 transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                      }`} />
                      <span className={`font-medium transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                      }`}>
                        {item.name}
                      </span>
                    </div>
                    {/* Animated underline */}
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                    {/* Floating indicator */}
                    <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full transition-all duration-300 ${
                      isActive ? 'opacity-100 -translate-y-1' : 'opacity-0 group-hover:opacity-100 group-hover:-translate-y-1'
                    }`}></div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Creative Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Join Community Button - Desktop only */}
            <div className="hidden md:block">
              <Button 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
              >
                <Heart className="h-4 w-4 mr-2" />
                Join Us
              </Button>
            </div>

            <ThemeToggle />

            {/* Creative Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <div className="relative">
                  {isOpen ? (
                    <X className="h-5 w-5 transition-transform duration-300 rotate-90" />
                  ) : (
                    <Menu className="h-5 w-5 transition-transform duration-300" />
                  )}
                </div>
                {/* Pulse effect when menu is open */}
                {isOpen && (
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Creative Mobile Navigation with slide-in animation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-4 pb-6 space-y-2 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl rounded-2xl mt-4 shadow-2xl border border-primary/20">
            {navItems.map((item, index) => {
              const IconComponent = item.icon
              const isActive = isActiveRoute(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                    isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  } ${isOpen ? 'animate-in slide-in-from-left' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-primary/30 to-accent/30' 
                      : 'bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30'
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <span className="font-medium flex-1">{item.name}</span>
                  <div className={`h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full ${
                    isActive ? 'w-6' : 'w-0 group-hover:w-6'
                  }`}></div>
                </Link>
              )
            })}
            
            {/* Mobile Join Button */}
            <div className="pt-4 border-t border-primary/20">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="h-4 w-4 mr-2" />
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
