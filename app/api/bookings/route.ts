import { NextResponse } from "next/server"
import { flightsData } from "@/data/flights"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.flightId || !body.passengerInfo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find flight
    const flight = flightsData.find((f) => f.id === body.flightId)

    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 })
    }

    // Create booking
    const booking = {
      id: `BK${Math.floor(Math.random() * 1000000)}`,
      flightId: flight.id,
      flight: flight,
      passengerInfo: body.passengerInfo,
      bookingDate: new Date().toISOString(),
      status: "confirmed",
      price: body.price || flight.price,
      pnr: `PNR${Math.floor(Math.random() * 1000000)}`,
    }

    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
