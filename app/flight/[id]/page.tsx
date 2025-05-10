"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { FlightInfo } from "@/components/flight-info"
import { PriceBreakdown } from "@/components/price-breakdown"
import { PassengerForm } from "@/components/passenger-form"
import { useWallet } from "@/context/wallet-context"
import { useBooking } from "@/context/booking-context"
import { flightsData } from "@/data/flights"
import type { Flight } from "@/types"
import { formatCurrency } from "@/lib/utils"

export default function FlightDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { walletBalance, updateWalletBalance } = useWallet()
  const { addBooking } = useBooking()

  const [flight, setFlight] = useState<Flight | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundFlight = flightsData.find((f) => f.id === params.id)
      if (foundFlight) {
        setFlight(foundFlight)
        setCurrentPrice(foundFlight.price)
      }
      setLoading(false)
    }, 500)
  }, [params.id])

  useEffect(() => {
    // Check if the flight has been viewed multiple times in the last 5 minutes
    if (flight) {
      const viewHistory = JSON.parse(localStorage.getItem(`flight_view_${flight.id}`) || "[]")
      const now = new Date().getTime()

      // Filter views in the last 5 minutes
      const recentViews = viewHistory.filter((time: number) => now - time < 5 * 60 * 1000)

      // Add current view
      recentViews.push(now)
      localStorage.setItem(`flight_view_${flight.id}`, JSON.stringify(recentViews))

      // If viewed 3 or more times, increase price by 10%
      if (recentViews.length >= 3) {
        setCurrentPrice(flight.price * 1.1)
      } else {
        setCurrentPrice(flight.price)
      }

      // Set a timeout to reset price after 10 minutes
      const timeoutId = setTimeout(
        () => {
          setCurrentPrice(flight.price)
        },
        10 * 60 * 1000,
      )

      return () => clearTimeout(timeoutId)
    }
  }, [flight])

  const handlePassengerInfoChange = (info: typeof passengerInfo, valid: boolean) => {
    setPassengerInfo(info)
    setFormValid(valid)
  }

 const handleBooking = async () => {
  if (!flight) return;

  if (currentPrice > walletBalance) {
    toast({
      title: 'Insufficient balance',
      description: "You don't have enough balance in your wallet to book this flight.",
      variant: 'destructive',
    });
    return;
  }

  try {
    // Prepare the booking data to send to the API
    const bookingData = {
      flightId: flight.id,
      passengerInfo: {
        firstName: passengerInfo.firstName,
        lastName: passengerInfo.lastName,
        email: passengerInfo.email,
        phone: passengerInfo.phone,
      },
      price: currentPrice,
    };

    // Send POST request to /api/booking
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || 'Failed to create booking');
    }

    const booking = await response.json();

    // Update wallet balance and booking context
    updateWalletBalance(walletBalance - currentPrice);
    addBooking({
      id: booking.id,
      flightId: flight.id,
      flight,
      passengerInfo: booking.passengerInfo,
      bookingDate: booking.bookingDate,
      status: booking.status,
      price: booking.price,
      pnr: booking.pnr,
    });

    toast({
      title: 'Booking successful!',
      description: `Your booking has been confirmed with PNR: ${booking.pnr}`,
    });

    router.push(`/booking/${booking.id}`);
  } catch (error: any) {
    console.error('Booking error:', error);
    toast({
      title: 'Booking failed',
      description: error.message || 'An error occurred while booking the flight.',
      variant: 'destructive',
    });
  }
};

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  if (!flight) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Flight Not Found</h2>
              <p className="text-gray-500 mb-4">The flight you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => router.push("/search")}>Back to Search</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Flight Details</CardTitle>
              <CardDescription>
                {flight.from.city} to {flight.to.city} on {new Date(flight.departureTime).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FlightInfo flight={flight} />

              <Separator className="my-6" />

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Passenger Information</h3>
                <PassengerForm onChange={handlePassengerInfoChange} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Price Summary</CardTitle>
              {currentPrice > flight.price && (
                <Badge variant="destructive" className="ml-auto">
                  Price increased by 10%
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <PriceBreakdown
                basePrice={flight.price}
                currentPrice={currentPrice}
                taxes={Math.round(currentPrice * 0.18)}
                fees={Math.round(currentPrice * 0.05)}
              />
            </CardContent>
            <CardFooter className="flex-col items-stretch space-y-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Wallet Balance:</span>
                <span>{formatCurrency(walletBalance)}</span>
              </div>
              <Button
                onClick={handleBooking}
                disabled={!formValid || currentPrice > walletBalance}
                className="w-full"
                size="lg"
              >
                Book Flight
              </Button>
              {currentPrice > walletBalance && (
                <p className="text-red-500 text-sm text-center">
                  Insufficient wallet balance. Please add funds to continue.
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
