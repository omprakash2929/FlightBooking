import { NextResponse } from "next/server";
import { airports } from "@/data/airports";

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  try {
    // Fetch airports from RapidAPI
   

    // If no query or query is too short, return top 5 airports
    if (!query || query.length < 2) {
      return NextResponse.json(airports.slice(0, 5));
    }

    // Filter airports based on query
    const filteredAirports = airports
      .filter(
        (airport) =>
          airport.city.toLowerCase().includes(query.toLowerCase()) ||
          airport.code.toLowerCase().includes(query.toLowerCase()) ||
          airport.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);

    return NextResponse.json(filteredAirports);
  } catch (error) {
    console.error("Error in GET /api/airports:", error);
    return NextResponse.json(
      { error: "Failed to fetch airports" },
      { status: 500 }
    );
  }
}