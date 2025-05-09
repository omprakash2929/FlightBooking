"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useBooking } from "@/context/booking-context"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Plane, Calendar } from "lucide-react"

export default function BookingsPage() {
  const router = useRouter()
  const { bookings } = useBooking()
  const [activeTab, setActiveTab] = useState("all")

  const upcomingBookings = bookings.filter((booking) => new Date(booking.flight.departureTime) > new Date())

  const pastBookings = bookings.filter((booking) => new Date(booking.flight.departureTime) <= new Date())

  const displayBookings = activeTab === "upcoming" ? upcomingBookings : activeTab === "past" ? pastBookings : bookings

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
          <CardDescription>View and manage your flight bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Bookings ({bookings.length})</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {displayBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Plane className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                  <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
                  <Button onClick={() => router.push("/search")}>Search Flights</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                            <Plane className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {booking.flight.from.city} to {booking.flight.to.city}
                              </h3>
                              <Badge className="bg-green-500">{booking.status}</Badge>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              <span className="inline-flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(booking.flight.departureTime)}
                              </span>
                              <span className="mx-2">•</span>
                              <span>
                                {booking.flight.airline} {booking.flight.flightNumber}
                              </span>
                              <span className="mx-2">•</span>
                              <span>PNR: {booking.pnr}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-auto">
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(booking.price)}</div>
                            <div className="text-sm text-gray-500">Booked on {formatDate(booking.bookingDate)}</div>
                          </div>
                          <Button variant="outline" onClick={() => router.push(`/booking/${booking.id}`)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Plane className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No upcoming bookings</h3>
                  <p className="text-gray-500 mb-6">You don't have any upcoming flights.</p>
                  <Button onClick={() => router.push("/search")}>Search Flights</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                            <Plane className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {booking.flight.from.city} to {booking.flight.to.city}
                              </h3>
                              <Badge className="bg-green-500">{booking.status}</Badge>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              <span className="inline-flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(booking.flight.departureTime)}
                              </span>
                              <span className="mx-2">•</span>
                              <span>
                                {booking.flight.airline} {booking.flight.flightNumber}
                              </span>
                              <span className="mx-2">•</span>
                              <span>PNR: {booking.pnr}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-auto">
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(booking.price)}</div>
                            <div className="text-sm text-gray-500">Booked on {formatDate(booking.bookingDate)}</div>
                          </div>
                          <Button variant="outline" onClick={() => router.push(`/booking/${booking.id}`)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-0">
              {pastBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Plane className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No past bookings</h3>
                  <p className="text-gray-500 mb-6">You don't have any past flights.</p>
                  <Button onClick={() => router.push("/search")}>Search Flights</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                            <Plane className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {booking.flight.from.city} to {booking.flight.to.city}
                              </h3>
                              <Badge>Completed</Badge>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              <span className="inline-flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(booking.flight.departureTime)}
                              </span>
                              <span className="mx-2">•</span>
                              <span>
                                {booking.flight.airline} {booking.flight.flightNumber}
                              </span>
                              <span className="mx-2">•</span>
                              <span>PNR: {booking.pnr}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-auto">
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(booking.price)}</div>
                            <div className="text-sm text-gray-500">Booked on {formatDate(booking.bookingDate)}</div>
                          </div>
                          <Button variant="outline" onClick={() => router.push(`/booking/${booking.id}`)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
