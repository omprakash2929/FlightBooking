import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

export function FeaturedDeals() {
  const deals = [
    {
      id: "deal1",
      title: "Weekend Getaway",
      from: { city: "Delhi", code: "DEL" },
      to: { city: "Goa", code: "GOI" },
      price: 2999,
      image: "/placeholder.svg?height=200&width=300",
      discount: "20% OFF",
      airline: "IndiGo",
    },
    {
      id: "deal2",
      title: "Business Trip Special",
      from: { city: "Mumbai", code: "BOM" },
      to: { city: "Bangalore", code: "BLR" },
      price: 2499,
      image: "/placeholder.svg?height=200&width=300",
      discount: "15% OFF",
      airline: "Air India",
    },
    {
      id: "deal3",
      title: "Vacation Package",
      from: { city: "Kolkata", code: "CCU" },
      to: { city: "Chennai", code: "MAA" },
      price: 2799,
      image: "/placeholder.svg?height=200&width=300",
      discount: "25% OFF",
      airline: "SpiceJet",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {deals.map((deal) => (
        <Link href="/search" key={deal.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
            <div className="relative h-40">
              <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <Badge className="bg-orange-500">{deal.discount}</Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{deal.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {deal.from.city} to {deal.to.city}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{deal.airline}</span>
                <span className="font-bold">{formatCurrency(deal.price)}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
