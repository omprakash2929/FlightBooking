export interface Airport {
  code: string
  name: string
  city: string
  country: string
}

export interface Airline {
  code: string
  name: string
  logo?: string
}

export interface Flight {
  id: string
  airline: string
  flightNumber: string
  from: {
    code: string
    name: string
    city: string
  }
  to: {
    code: string
    name: string
    city: string
  }
  departureTime: string
  arrivalTime: string
  durationMinutes: number
  price: number
  cabinClass: string
  aircraft: string
  amenities: string[]
}

export interface Booking {
  id: string
  flightId: string
  flight: Flight
  passengerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  bookingDate: string
  status: "confirmed" | "cancelled" | "pending"
  price: number
  pnr: string
}
