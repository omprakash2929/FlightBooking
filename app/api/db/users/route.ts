import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("flight-booking")

    const user = await db.collection("users").findOne({ _id: new ObjectId(id) })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const userData = await request.json()

    // Validate required fields
    if (!userData.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("flight-booking")

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: userData.email })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create user with default wallet balance
    const user = {
      ...userData,
      walletBalance: 50000, // Default wallet balance
      createdAt: new Date().toISOString(),
    }

    const result = await db.collection("users").insertOne(user)

    return NextResponse.json({
      id: result.insertedId,
      ...user,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const userData = await request.json()

    if (!userData.id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("flight-booking")

    const { id, ...updateData } = userData

    const result = await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
