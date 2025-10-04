import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { ConditionalLayout } from "@/components/conditional-layout";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "WIE - Women in Engineering",
  description:
    "Empowering the next generation of female engineers to break barriers, innovate fearlessly, and shape the future of technology.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider defaultTheme="system" storageKey="wie-ui-theme">
          <ConditionalLayout>
            <Suspense fallback={null}>{children}</Suspense>
          </ConditionalLayout>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
