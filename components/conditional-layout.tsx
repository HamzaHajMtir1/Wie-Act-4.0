"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./navbar"
import { Footer } from "./footer"
import AgricultureAIAssistant from "./ai-agent-chat"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if we're in routes that should not show navbar/footer
  const isAdminRoute = pathname?.startsWith('/admin')
  const isFarmRoute = pathname?.startsWith('/farm')
  const isAuthRoute = pathname?.startsWith('/login') || pathname?.startsWith('/register') || pathname?.startsWith('/forgot-password')
  const shouldHideNavAndFooter = isAdminRoute || isFarmRoute || isAuthRoute

  if (shouldHideNavAndFooter) {
    return (
      <>
        {children}
        <AgricultureAIAssistant />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <AgricultureAIAssistant />
    </>
  )
}