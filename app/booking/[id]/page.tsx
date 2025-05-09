"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { FlightInfo } from "@/components/flight-info"
import { PassengerDetails } from "@/components/passenger-details"
import { useBooking } from "@/context/booking-context"
import { formatCurrency } from "@/lib/utils"
import type { Booking } from "@/types"
import { jsPDF } from "jspdf"
import QRCode from "qrcode"
import { Printer, Download, ArrowLeft } from "lucide-react"

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { bookings } = useBooking()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  useEffect(() => {
    // Find booking from context
    const foundBooking = bookings.find((b) => b.id === params.id)
    if (foundBooking) {
      setBooking(foundBooking)

      // Generate QR code
      QRCode.toDataURL(`BOOKING:${foundBooking.id}|PNR:${foundBooking.pnr}`)
        .then((url:any) => {
          setQrCodeUrl(url)
        })
        .catch((err:any) => {
          console.error(err)
        })
    }
    setLoading(false)
  }, [params.id, bookings])

  const generatePDF = () => {
    if (!booking) return

    const doc = new jsPDF()

    // Add title
    doc.setFontSize(20)
    doc.text("Flight Ticket", 105, 20, { align: "center" })

    // Add booking details
    doc.setFontSize(12)
    doc.text(`Booking ID: ${booking.id}`, 20, 40)
    doc.text(`PNR: ${booking.pnr}`, 20, 50)
    doc.text(`Booking Date: ${new Date(booking.bookingDate).toLocaleDateString()}`, 20, 60)

    // Add flight details
    doc.text(`Flight: ${booking.flight.airline} ${booking.flight.flightNumber}`, 20, 80)
    doc.text(`From: ${booking.flight.from.city} (${booking.flight.from.code})`, 20, 90)
    doc.text(`To: ${booking.flight.to.city} (${booking.flight.to.code})`, 20, 100)
    doc.text(`Departure: ${new Date(booking.flight.departureTime).toLocaleString()}`, 20, 110)
    doc.text(`Arrival: ${new Date(booking.flight.arrivalTime).toLocaleString()}`, 20, 120)

    // Add passenger details
    doc.text(`Passenger: ${booking.passengerInfo.firstName} ${booking.passengerInfo.lastName}`, 20, 140)
    doc.text(`Email: ${booking.passengerInfo.email}`, 20, 150)
    doc.text(`Phone: ${booking.passengerInfo.phone}`, 20, 160)

    // Add price
    doc.text(`Price: ${formatCurrency(booking.price)}`, 20, 180)

    // Add QR code if available
    if (qrCodeUrl) {
      doc.addImage(qrCodeUrl, "PNG", 130, 130, 50, 50)
    }

    // Add footer
    doc.setFontSize(10)
    doc.text("Thank you for booking with SkyBooker!", 105, 270, { align: "center" })

    // Save the PDF
    doc.save(`ticket-${booking.id}.pdf`)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Booking Not Found</h2>
              <p className="text-gray-500 mb-4">The booking you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => router.push("/bookings")}>View All Bookings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="outline" onClick={() => router.push("/bookings")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bookings
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Booking Confirmed</CardTitle>
                <CardDescription>
                  Booking ID: {booking.id} | PNR: {booking.pnr}
                </CardDescription>
              </div>
              <Badge className="bg-green-500">{booking.status}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Flight Details</h3>
                  <FlightInfo flight={booking.flight} />
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Passenger Details</h3>
                  <PassengerDetails passenger={booking.passengerInfo} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Print Ticket
              </Button>
              <Button onClick={generatePDF}>
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>E-Ticket</CardTitle>
              <CardDescription>Scan this QR code at the airport</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {qrCodeUrl && (
                <img src={qrCodeUrl || "/placeholder.svg"} alt="Booking QR Code" className="w-48 h-48 mb-4" />
              )}
              <div className="text-center mt-4">
                <p className="font-semibold text-lg">
                  {booking.flight.airline} {booking.flight.flightNumber}
                </p>
                <p className="text-gray-500">{new Date(booking.flight.departureTime).toLocaleDateString()}</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-bold">PNR: {booking.pnr}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
