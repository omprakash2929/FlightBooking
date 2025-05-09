import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function FeaturedFlights() {
  const trips = [
    {
      id: "trip1",
      title: "Santorini Tour - Greece Escape",
      image: "https://cdn.pixabay.com/photo/2018/07/20/14/02/santorini-3550739_1280.jpg",
      price: 12999,
      duration: "5 days",
      rating: 4.8,
    },
    {
      id: "trip2",
      title: "Maldives Blue Paradise Tour",
      image: "https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_1280.jpg",
      price: 15999,
      duration: "7 days",
      rating: 4.9,
    },
    {
      id: "trip3",
      title: "Antelope Canyon Hiking Tour & Exploration",
      image: "https://cdn.pixabay.com/photo/2016/01/08/18/00/antelope-canyon-1128815_1280.jpg",
      price: 8999,
      duration: "3 days",
      rating: 4.7,
    },
    {
      id: "trip4",
      title: "Ko Phi Phi Islands Cruise Adventure",
      image: "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg",
      price: 11999,
      duration: "6 days",
      rating: 4.8,
    },
    {
      id: "trip5",
      title: "Grand Canyon Helicopter Adventure",
      image: "https://cdn.pixabay.com/photo/2016/12/05/16/21/grand-canyon-1884645_1280.jpg",
      price: 9999,
      duration: "2 days",
      rating: 4.9,
    },
    {
      id: "trip6",
      title: "Bali Beaches & Temples Tour",
      image: "https://cdn.pixabay.com/photo/2016/07/05/18/35/bali-1499059_1280.jpg",
      price: 13999,
      duration: "8 days",
      rating: 4.7,
    },
    {
      id: "trip7",
      title: "Venice Gondola Experience",
      image: "https://cdn.pixabay.com/photo/2016/02/19/11/36/canal-1209808_1280.jpg",
      price: 7999,
      duration: "4 days",
      rating: 4.6,
    },
    {
      id: "trip8",
      title: "Northern Lights Iceland Tour",
      image: "https://cdn.pixabay.com/photo/2016/01/27/04/32/books-1163695_1280.jpg",
      price: 16999,
      duration: "5 days",
      rating: 4.9,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {trips.slice(0, 8).map((trip) => (
        <Link href="/search" key={trip.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
            <div className="relative h-40">
              <Image src={trip.image || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-1 line-clamp-2 h-10">{trip.title}</h3>
              <div className="flex items-center text-sm text-yellow-500 mb-2">
                <span>★★★★★</span>
                <span className="text-gray-600 ml-1">{trip.rating}</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-500">{trip.duration}</span>
                  <div className="font-bold text-sm">{formatCurrency(trip.price)}</div>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  View Deal
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
