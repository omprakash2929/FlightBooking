import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function TrendingDestinations() {
  const destinations = [
    {
      id: "trend1",
      name: "Phuket",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "trend2",
      name: "Rome",
      image: "https://cdn.pixabay.com/photo/2019/10/06/08/57/architecture-4529605_1280.jpg",
    },
    {
      id: "trend3",
      name: "New York",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "trend4",
      name: "Paris",
      image: "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {destinations.map((destination) => (
        <Link href="/search" key={destination.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow border-0 bg-transparent">
            <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-xl">{destination.name}</h3>
              </CardContent>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
