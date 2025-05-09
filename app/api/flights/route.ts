import { NextResponse } from "next/server"
import { flightsData } from "@/data/flights"

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const date = searchParams.get("date")

  // Filter flights based on query parameters
  let filteredFlights = [...flightsData]

  if (from) {
    filteredFlights = filteredFlights.filter(
      (flight) =>
        flight.from.code.toLowerCase() === from.toLowerCase() ||
        flight.from.city.toLowerCase().includes(from.toLowerCase()),
    )
  }

  if (to) {
    filteredFlights = filteredFlights.filter(
      (flight) =>
        flight.to.code.toLowerCase() === to.toLowerCase() || flight.to.city.toLowerCase().includes(to.toLowerCase()),
    )
  }

  if (date) {
    const searchDate = new Date(date)
    filteredFlights = filteredFlights.filter((flight) => {
      const flightDate = new Date(flight.departureTime)
      return (
        flightDate.getFullYear() === searchDate.getFullYear() &&
        flightDate.getMonth() === searchDate.getMonth() &&
        flightDate.getDate() === searchDate.getDate()
      )
    })
  }

  return NextResponse.json(filteredFlights)
}
