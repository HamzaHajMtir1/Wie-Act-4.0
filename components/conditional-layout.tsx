"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./navbar"
import { Footer } from "./footer"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if we're in admin routes or farm routes (both should not show navbar/footer)
  const isAdminRoute = pathname?.startsWith('/admin')
  const isFarmRoute = pathname?.startsWith('/farm')
  const shouldHideNavAndFooter = isAdminRoute || isFarmRoute

  if (shouldHideNavAndFooter) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  )
}