import clientPromise from "../lib/mongodb"
import { flightsData } from "../data/flights"

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...")
    const client = await clientPromise
    const db = client.db("flight-booking")

    // Clear existing collections
    console.log("Clearing existing collections...")
    await db.collection("flights").deleteMany({})
    await db.collection("users").deleteMany({})
    await db.collection("bookings").deleteMany({})
    await db.collection("transactions").deleteMany({})

    // Seed flights
    console.log("Seeding flights...")
    await db.collection("flights").insertMany(flightsData)

    // Create default user
    console.log("Creating default user...")
    await db.collection("users").insertOne({
      email: "user@example.com",
      name: "Demo User",
      walletBalance: 50000,
      createdAt: new Date().toISOString(),
    })

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
