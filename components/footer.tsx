"use client"

import { Heart, Mail, Facebook, Instagram, Linkedin, Phone } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
    { name: 'Gmail', icon: Mail, href: '#', color: 'hover:text-red-500' }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-white to-primary/5 dark:from-background dark:via-background dark:to-primary/5">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 from-primary to-accent rounded-2xl flex items-center justify-center shadow-xl">
                  <Image 
                    src="/wie-logo.png" 
                    alt="WIE Logo" 
                    width={320} 
                    height={320}
                    className="object-contain"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent dark:bg-white opacity-20 blur-lg"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  WIE
                </h2>
                <p className="text-sm text-muted-foreground font-semibold tracking-[0.2em] uppercase">
                  Empowerment
                </p>
              </div>
            </div>
            
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Empowering women to lead the future of technology through community, 
              mentorship, and innovation. Building tomorrow's leaders today.
            </p>
            
            {/* Mission statement */}
            <div className="flex items-center space-x-2 text-sm text-primary font-medium">
              <Heart className="h-4 w-4 text-primary" />
              <span>Inspiring • Empowering • Leading</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Market', 'Contact', 'Login', 'Register'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Connect With Us</h3>
            
            {/* Social Media Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`group relative p-3 rounded-xl bg-white dark:bg-card border border-border/50 hover:border-primary/30 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${link.color}`}
                    aria-label={link.name}
                  >
                    <IconComponent className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {link.name}
                    </span>
                  </a>
                )
              })}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@wie-isimm.org</span>
              </div>
                <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+216 22 222 222</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/20 pt-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            
            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground text-center">
                Powered by <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">IEEE WIE ISIMM SAG</span> &copy; 2025 All rights reserved.
              </p>
            </div>

        
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
    </footer>
  )
}
