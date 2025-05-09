import { NextResponse } from "next/server"
import { flightsData } from "@/data/flights"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find flight by ID
  const flight = flightsData.find((flight) => flight.id === id)

  if (!flight) {
    return NextResponse.json({ error: "Flight not found" }, { status: 404 })
  }

  return NextResponse.json(flight)
}
