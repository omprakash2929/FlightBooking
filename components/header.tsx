"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useWallet } from "@/context/wallet-context"
import { formatCurrency } from "@/lib/utils"
import { Plane, Menu, Wallet, User } from "lucide-react"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"

export function Header() {
  const pathname = usePathname()
  const { walletBalance } = useWallet()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/search", label: "Flights", active: pathname === "/search" },
    { href: "/hotels", label: "Hotels", active: pathname === "/hotels" },
    { href: "/activities", label: "Activities", active: pathname === "/activities" },
    { href: "/bookings", label: "My Trips", active: pathname === "/bookings" },
    { href: "/contact", label: "Contact", active: pathname === "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex mx-auto px-4 h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Plane className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-bold">SkyBooker</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`transition-colors hover:text-foreground/80 ${
                route.active ? "text-foreground font-medium" : "text-foreground/60"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center ml-auto gap-4">
          <Link href="/wallet" className="hidden md:flex items-center gap-2 text-sm">
            <Wallet className="h-4 w-4" />
            <span>{formatCurrency(walletBalance)}</span>
          </Link>

          {/* Desktop Auth Buttons */}
          <SignedOut>
            <div className="hidden md:flex items-center gap-2">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign Up</Button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="hidden md:flex items-center gap-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-lg ${
                      route.active ? "text-foreground font-medium" : "text-foreground/60"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="mt-6 flex flex-col gap-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="ghost" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button onClick={() => setIsOpen(false)}>Sign Up</Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
