"use client"

import { Heart, Github, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-600' }
  ]

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo and tagline */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                WIE
              </h3>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Empowering women to lead the future of technology through community, mentorship, and innovation.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`p-3 rounded-full bg-primary/5 hover:bg-primary/10 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${link.color}`}
                  aria-label={link.name}
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              )
            })}
          </div>

          {/* Copyright and love message */}
          <div className="text-center space-y-2">
            <p className="text-muted-foreground text-sm">
              &copy; 2025 Women in Engineering. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs flex items-center justify-center space-x-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-primary animate-pulse" />
              <span>for empowering women worldwide</span>
            </p>
          </div>

          {/* Decorative gradient line */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>
      </div>
    </footer>
  )
}
