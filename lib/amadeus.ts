// Amadeus API credentials
const AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID
const AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET
const AMADEUS_API_URL = "https://test.api.amadeus.com"

// Get Amadeus API token
export async function getAmadeusToken() {
  try {
    const response = await fetch(`${AMADEUS_API_URL}/v1/security/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: AMADEUS_CLIENT_ID || "",
        client_secret: AMADEUS_CLIENT_SECRET || "",
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to get Amadeus token: ${response.statusText}`)
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error("Error getting Amadeus token:", error)
    throw error
  }
}

// Search flights
export async function searchFlights(params: {
  originLocationCode: string
  destinationLocationCode: string
  departureDate: string
  adults: number
  currencyCode?: string
}) {
  try {
    const token = await getAmadeusToken()

    const queryParams = new URLSearchParams({
      originLocationCode: params.originLocationCode,
      destinationLocationCode: params.destinationLocationCode,
      departureDate: params.departureDate,
      adults: params.adults.toString(),
      currencyCode: params.currencyCode || "INR",
      max: "10",
    })

    const response = await fetch(`${AMADEUS_API_URL}/v2/shopping/flight-offers?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to search flights: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error searching flights:", error)
    throw error
  }
}

// Airport search
export async function searchAirports(keyword: string) {
  try {
    const token = await getAmadeusToken()

    const queryParams = new URLSearchParams({
      subType: "AIRPORT,CITY",
      keyword,
      "page[limit]": "10",
    })

    const response = await fetch(`${AMADEUS_API_URL}/v1/reference-data/locations?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to search airports: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error searching airports:", error)
    throw error
  }
}
