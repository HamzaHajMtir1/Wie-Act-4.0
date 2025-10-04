"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Forgot password submitted:', email)
    // Handle forgot password submission here
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center p-4">
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md">
          <Card className="border border-border shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Check Your Email
                </CardTitle>
                <p className="text-muted-foreground">
                  Reset instructions sent successfully
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 text-center">
              <div>
                <p className="text-muted-foreground mb-4">
                  We've sent password reset instructions to:
                </p>
                <p className="font-medium text-foreground mb-6 px-4 py-3 bg-muted rounded-lg">
                  {email}
                </p>
                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  Please check your email and follow the instructions to reset your password. 
                  Don't forget to check your spam folder!
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/login">
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground hover:text-white font-medium rounded-lg">
                    Back to Sign In
                  </Button>
                </Link>
                
                <Link href="/" className="block">
                  <Button variant="outline" className="w-full h-12 font-medium rounded-lg">
                    Go to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        {/* Back to Login */}
        <div className="mb-6">
          <Link 
            href="/login"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>
        </div>

        <Card className="border border-border shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-foreground mb-2">
                Reset Password
              </CardTitle>
              <p className="text-muted-foreground">
                Enter your email to receive reset instructions
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-base font-medium text-foreground mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 text-base bg-background border-2 border-border focus:border-primary rounded-lg"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send Reset Link
              </Button>
            </form>

            {/* Navigation Links */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-muted-foreground mb-4">
                Remember your password?
              </p>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-primary/30 text-primary cursor-pointer hover:text-white font-medium rounded-lg"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}