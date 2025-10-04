"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved theme preference or default to light mode
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem("theme") : null
    const prefersDark = typeof window !== 'undefined' 
      ? window.matchMedia("(prefers-color-scheme: dark)").matches 
      : false

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      if (typeof window !== 'undefined') {
        document.documentElement.classList.add("dark")
      }
    } else {
      setIsDark(false)
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (typeof window !== 'undefined') {
      if (newTheme) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="text-foreground transition-colors duration-300 cursor-pointer"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
