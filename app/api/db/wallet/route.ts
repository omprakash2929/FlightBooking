import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: Request) {
  try {
    const { userId, amount, type } = await request.json()

    if (!userId || !amount || !type) {
      return NextResponse.json({ error: "User ID, amount, and type are required" }, { status: 400 })
    }

    if (type !== "credit" && type !== "debit") {
      return NextResponse.json({ error: "Type must be either credit or debit" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("flight-booking")

    // Get current user
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Calculate new balance
    const amountNum = Number.parseFloat(amount)
    let newBalance = user.walletBalance

    if (type === "credit") {
      newBalance += amountNum
    } else {
      // Check if user has enough balance
      if (user.walletBalance < amountNum) {
        return NextResponse.json({ error: "Insufficient wallet balance" }, { status: 400 })
      }
      newBalance -= amountNum
    }

    // Update user wallet
    await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: { walletBalance: newBalance } })

    // Record transaction
    const transaction = {
      userId,
      type,
      amount: amountNum,
      date: new Date().toISOString(),
      description: type === "credit" ? "Added money to wallet" : "Deducted from wallet",
    }

    await db.collection("transactions").insertOne(transaction)

    return NextResponse.json({
      success: true,
      newBalance,
      transaction,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to process wallet transaction" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("flight-booking")

    const transactions = await db.collection("transactions").find({ userId }).sort({ date: -1 }).toArray()

    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}
