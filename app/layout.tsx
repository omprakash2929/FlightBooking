import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WalletProvider } from "@/context/wallet-context"
import { BookingProvider } from "@/context/booking-context"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SkyBooker - Book Your Flights",
  description: "Book flights at the best prices with SkyBooker",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <ClerkProvider >
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <WalletProvider>
            <BookingProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow">{children}</div>
                <Footer />
              </div>
              <Toaster />
            </BookingProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
        </ClerkProvider>
  )
}
