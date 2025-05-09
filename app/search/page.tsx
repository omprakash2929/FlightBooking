"use client"

import { useState, useEffect } from "react"
import { Search } from "@/components/search"
import { FlightList } from "@/components/flight-list"
import { FilterSidebar } from "@/components/filter-sidebar"
import { flightsData } from "@/data/flights"
import type { Flight } from "@/types"

export default function SearchPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    airline: [] as string[],
    priceRange: [2000, 3000] as [number, number],
    departureTime: [] as string[],
    duration: 0,
  })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFlights(flightsData)
      setFilteredFlights(flightsData)
      setLoading(false)
    }, 1000)
  }, [])

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters)

    let filtered = [...flights]

    // Filter by airline
    if (newFilters.airline.length > 0) {
      filtered = filtered.filter((flight) => newFilters.airline.includes(flight.airline))
    }

    // Filter by price range
    filtered = filtered.filter(
      (flight) => flight.price >= newFilters.priceRange[0] && flight.price <= newFilters.priceRange[1],
    )

    // Filter by departure time
    if (newFilters.departureTime.length > 0) {
      filtered = filtered.filter((flight) => {
        const hour = new Date(flight.departureTime).getHours()

        if (newFilters.departureTime.includes("morning") && hour >= 5 && hour < 12) {
          return true
        }
        if (newFilters.departureTime.includes("afternoon") && hour >= 12 && hour < 18) {
          return true
        }
        if (newFilters.departureTime.includes("evening") && hour >= 18 && hour < 22) {
          return true
        }
        if (newFilters.departureTime.includes("night") && (hour >= 22 || hour < 5)) {
          return true
        }

        return false
      })
    }

    // Filter by duration
    if (newFilters.duration > 0) {
      filtered = filtered.filter((flight) => flight.durationMinutes <= newFilters.duration)
    }

    setFilteredFlights(filtered)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <Search />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterSidebar filters={filters} applyFilters={applyFilters} />
          </div>
          <div className="lg:col-span-3">
            <FlightList flights={filteredFlights} loading={loading} />
          </div>
        </div>
      </div>
    </main>
  )
}
