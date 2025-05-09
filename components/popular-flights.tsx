import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function PopularFlights() {
  const popularFlights = [
    {
      id: "pop1",
      from: { city: "Delhi", code: "DEL" },
      to: { city: "Mumbai", code: "BOM" },
      price: 2499,
      airline: "IndiGo",
      discount: true,
    },
    {
      id: "pop2",
      from: { city: "Bangalore", code: "BLR" },
      to: { city: "Delhi", code: "DEL" },
      price: 2799,
      airline: "SpiceJet",
      discount: false,
    },
    {
      id: "pop3",
      from: { city: "Mumbai", code: "BOM" },
      to: { city: "Kolkata", code: "CCU" },
      price: 2599,
      airline: "Air India",
      discount: true,
    },
    {
      id: "pop4",
      from: { city: "Chennai", code: "MAA" },
      to: { city: "Hyderabad", code: "HYD" },
      price: 2199,
      airline: "IndiGo",
      discount: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {popularFlights.map((flight) => (
        <Link href="/search" key={flight.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {flight.from.city} <ArrowRight className="inline h-4 w-4" /> {flight.to.city}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {flight.from.code} - {flight.to.code}
                    </p>
                  </div>
                  {flight.discount && <Badge className="bg-green-500">Sale</Badge>}
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-sm text-muted-foreground">{flight.airline}</div>
                  <div className="text-lg font-bold">{formatCurrency(flight.price)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
