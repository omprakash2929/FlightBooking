"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatTime, formatDuration } from "@/lib/utils"
import type { Flight } from "@/types"
import { Plane, Clock, ArrowRight } from "lucide-react"

interface FlightListProps {
  flights: Flight[]
  loading: boolean
}

export function FlightList({ flights, loading }: FlightListProps) {
  const router = useRouter()
  const [sortBy, setSortBy] = useState<"price" | "duration" | "departure">("price")

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price
    } else if (sortBy === "duration") {
      return a.durationMinutes - b.durationMinutes
    } else {
      return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
    }
  })

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-24 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (flights.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Plane className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No flights found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search criteria to find available flights.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div>
          <span className="text-sm text-muted-foreground">{flights.length} flights found</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <div className="flex gap-2">
            <Button variant={sortBy === "price" ? "default" : "outline"} size="sm" onClick={() => setSortBy("price")}>
              Price
            </Button>
            <Button
              variant={sortBy === "duration" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("duration")}
            >
              Duration
            </Button>
            <Button
              variant={sortBy === "departure" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("departure")}
            >
              Departure
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sortedFlights.map((flight) => (
          <Card key={flight.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
                      <Plane className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-semibold">{flight.airline}</div>
                      <div className="text-sm text-muted-foreground">{flight.flightNumber}</div>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-3 gap-2 md:gap-4">
                    <div className="text-center">
                      <div className="font-semibold">{formatTime(flight.departureTime)}</div>
                      <div className="text-sm text-muted-foreground">{flight.from.code}</div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <div className="text-xs text-muted-foreground mb-1">{formatDuration(flight.durationMinutes)}</div>
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-dashed border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <ArrowRight className="h-4 w-4 text-muted-foreground bg-white" />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Direct</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold">{formatTime(flight.arrivalTime)}</div>
                      <div className="text-sm text-muted-foreground">{flight.to.code}</div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2">
                    <div className="text-xl font-bold">{formatCurrency(flight.price)}</div>
                    <Button onClick={() => router.push(`/flight/${flight.id}`)}>Select</Button>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <Badge variant="outline" className="bg-gray-50">
                    <Clock className="h-3 w-3 mr-1" /> {formatTime(flight.departureTime)} -{" "}
                    {formatTime(flight.arrivalTime)}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50">
                    {flight.aircraft}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50">
                    {flight.cabinClass}
                  </Badge>
                  {flight.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
