"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft, UserPlus } from "lucide-react"

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check credentials - same as admin
    if (formData.email === 'touta@ieee.org' && formData.password === 'Touta2025') {
      // Store user session
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('isUserAuthenticated', 'true')
        sessionStorage.setItem('userEmail', formData.email)
        sessionStorage.setItem('userLoginTime', Date.now().toString())
      }
      
      // Redirect to admin dashboard
      router.push('/admin')
    } else {
      setError('Email ou mot de passe incorrect')
    }
    
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md mt-20">
        {/* Back to Home */}
        <div className="mb-6 flex items-center justify-between">
          <Link 
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Card className="border border-border shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
              <LogIn className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-foreground mb-2">
                Welcome
              </CardTitle>
              <p className="text-muted-foreground">
                Login with your account to get started
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-base font-medium text-foreground mb-3">
                  Email Adress
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-12 h-14 text-base bg-white border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-300 rounded-lg"
                    placeholder="Enter your password email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-base font-medium text-foreground mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-12 pr-12 h-14 text-base bg-white border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-300 rounded-lg"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Login
                  </>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <p className="text-xs text-pink-700 text-center mb-3">
                <strong>Demo credentials :</strong><br />
                Email : touta@ieee.org<br />
                Password : Touta2025
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData({
                    email: 'touta@ieee.org',
                    password: 'Touta2025'
                  })
                }}
                className="w-full text-pink-600 hover:text-pink-500 border-pink-300 hover:bg-pink-100 text-xs cursor-pointer"
              >
                Auto fill
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4 text-center">
              <div>
                <Link 
                  href="/forgot-password"
                  className="text-pink-600 hover:text-pink-700 font-medium underline underline-offset-2"
                >
                  Forget Password ?
                </Link>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground mb-2">
                  Don't have an account?
                </p>
                <Link href="/register">
                  <Button 
                    variant="outline"
                    className="w-full h-12 border-pink-300 text-pink-600 hover:text-pink-500 hover:bg-pink-50 hover:border-pink-400 font-medium rounded-lg cursor-pointer"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}