import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("flight-booking")

    const bookings = await db.collection("bookings").find({ userId }).sort({ bookingDate: -1 }).toArray()
    console.log(bookings)
    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const bookingData = await request.json()

    // Validate required fields
    if (!bookingData.flightId || !bookingData.userId || !bookingData.passengerInfo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("flight-booking")

    // Get flight details
    const flight = await db.collection("flights").findOne({ _id: new ObjectId(bookingData.flightId) })

    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 })
    }

    // Create booking
    const booking = {
      userId: bookingData.userId,
      flightId: bookingData.flightId,
      flight: flight,
      passengerInfo: bookingData.passengerInfo,
      bookingDate: new Date().toISOString(),
      status: "confirmed",
      price: bookingData.price || flight.price,
      pnr: `PNR${Math.floor(Math.random() * 1000000)}`,
    }

    const result = await db.collection("bookings").insertOne(booking)

    // Update user wallet
    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(bookingData.userId) }, { $inc: { walletBalance: -booking.price } })

    return NextResponse.json({
      id: result.insertedId,
      ...booking,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
