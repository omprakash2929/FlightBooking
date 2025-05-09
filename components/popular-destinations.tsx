import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function PopularDestinations() {
  const destinations = [
    {
      id: "dest1",
      name: "Paris",
      image: "https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg",
    },
    {
      id: "dest2",
      name: "Thailand",
      image: "https://cdn.pixabay.com/photo/2016/11/14/03/35/thailand-1822828_1280.jpg",
    },
    {
      id: "dest3",
      name: "Rome",
      image: "https://cdn.pixabay.com/photo/2019/10/06/08/57/architecture-4529605_1280.jpg",
    },
    {
      id: "dest4",
      name: "Santorini",
      image: "https://cdn.pixabay.com/photo/2018/07/20/14/02/santorini-3550739_1280.jpg",
    },
    {
      id: "dest5",
      name: "Sydney",
      image: "https://cdn.pixabay.com/photo/2014/06/06/09/36/sydney-opera-house-363244_1280.jpg",
    },
    {
      id: "dest6",
      name: "Bali",
      image: "https://cdn.pixabay.com/photo/2016/01/08/18/00/antelope-canyon-1128815_1280.jpg",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.slice(0, 6).map((destination) => (
        <Link href="/search" key={destination.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow border-0">
            <div className="relative h-48 sm:h-56">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover"
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
