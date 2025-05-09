"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Booking } from "@/types"

interface BookingContextType {
  bookings: Booking[]
  addBooking: (booking: Booking) => void
  removeBooking: (id: string) => void
}

const BookingContext = createContext<BookingContextType>({
  bookings: [],
  addBooking: () => {},
  removeBooking: () => {},
})

export const useBooking = () => useContext(BookingContext)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    // Load bookings from localStorage if available
    const savedBookings = localStorage.getItem("bookings")
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings))
      } catch (error) {
        console.error("Failed to parse bookings from localStorage", error)
      }
    }
  }, [])

  const addBooking = (booking: Booking) => {
    const newBookings = [...bookings, booking]
    setBookings(newBookings)
    localStorage.setItem("bookings", JSON.stringify(newBookings))
  }

  const removeBooking = (id: string) => {
    const newBookings = bookings.filter((booking) => booking.id !== id)
    setBookings(newBookings)
    localStorage.setItem("bookings", JSON.stringify(newBookings))
  }

  return <BookingContext.Provider value={{ bookings, addBooking, removeBooking }}>{children}</BookingContext.Provider>
}
