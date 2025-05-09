"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  walletBalance: number
  updateWalletBalance: (newBalance: number) => void
}

const WalletContext = createContext<WalletContextType>({
  walletBalance: 50000,
  updateWalletBalance: () => {},
})

export const useWallet = () => useContext(WalletContext)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletBalance, setWalletBalance] = useState(50000)

  useEffect(() => {
    // Load wallet balance from localStorage if available
    const savedBalance = localStorage.getItem("walletBalance")
    if (savedBalance) {
      setWalletBalance(Number.parseFloat(savedBalance))
    }
  }, [])

  const updateWalletBalance = (newBalance: number) => {
    setWalletBalance(newBalance)
    localStorage.setItem("walletBalance", newBalance.toString())
  }

  return <WalletContext.Provider value={{ walletBalance, updateWalletBalance }}>{children}</WalletContext.Provider>
}
