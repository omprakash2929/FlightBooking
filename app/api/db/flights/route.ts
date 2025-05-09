import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const date = searchParams.get("date")

    const client = await clientPromise
    const db = client.db("flight-booking")

    // Build query
    const query: any = {}

    if (from) {
      query["from.code"] = from.toUpperCase()
    }

    if (to) {
      query["to.code"] = to.toUpperCase()
    }

    if (date) {
      // Convert date string to Date object range for that day
      const searchDate = new Date(date)
      const nextDay = new Date(searchDate)
      nextDay.setDate(nextDay.getDate() + 1)

      query.departureTime = {
        $gte: searchDate.toISOString(),
        $lt: nextDay.toISOString(),
      }
    }

    const flights = await db.collection("flights").find(query).limit(10).toArray()

    return NextResponse.json(flights)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch flights" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const flightData = await request.json()

    // Validate required fields
    if (!flightData.airline || !flightData.from || !flightData.to || !flightData.departureTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("flight-booking")

    const result = await db.collection("flights").insertOne({
      ...flightData,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      id: result.insertedId,
      ...flightData,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create flight" }, { status: 500 })
  }
}
