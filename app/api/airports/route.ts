import { NextResponse } from "next/server";
import { airports } from "@/data/airports";

export async function GET(request: Request) {
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim(); // Trim whitespace

  try {
    console.log("Query:", query); // Debug: Log the query
    console.log("Airports:", airports); // Debug: Log the airports array

    // If no query, return all airports
    if (!query) {
      console.log("Returning all airports due to empty query");
      return NextResponse.json(airports);
    }

    // Clean and split the query (e.g., "Bhubaneswar (BBI)" -> "Bhubaneswar" and "BBI")
    const cleanQuery = query.replace(/\(.*?\)/g, "").trim(); // Remove parentheses content
    const codeMatch = query.match(/\((\w+)\)/); // Extract code inside parentheses
    const queryParts = [cleanQuery, codeMatch ? codeMatch[1] : ""].filter(Boolean); // Include city and code

    // Filter airports based on query
    const filteredAirports = airports
      .filter((airport) => {
        const city = airport.city?.toLowerCase() || "";
        const code = airport.code?.toLowerCase() || "";
        const name = airport.name?.toLowerCase() || "";
        const country = airport.country?.toLowerCase() || "";

        // Check if any query part matches city, code, name, or country
        return queryParts.some((part) => {
          const partLower = part.toLowerCase();
          const matches =
            city.includes(partLower) ||
            code.includes(partLower) ||
            name.includes(partLower) ||
            country.includes(partLower);

          return matches;
        });
      })
      .slice(0, 10);

    // console.log("Filtered Airports:", filteredAirports); // Debug: Log filtered results

    return NextResponse.json(filteredAirports);
  } catch (error) {
    console.error("Error in GET /api/airports:", error);
    return NextResponse.json(
      { error: "Failed to fetch airports" },
      { status: 500 }
    );
  }
}