import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function TravelArticles() {
  const articles = [
    {
      id: "article1",
      title: "10 Must-Visit Beaches in Thailand: The Perfect Getaway",
      image: "https://cdn.pixabay.com/photo/2016/11/08/05/20/sunset-1807524_1280.jpg",
      date: "June 15, 2023",
    },
    {
      id: "article2",
      title: "Exploring the Santorini: A Hidden Adventure",
      image: "https://cdn.pixabay.com/photo/2018/07/20/14/02/santorini-3550739_1280.jpg",
      date: "May 22, 2023",
    },
    {
      id: "article3",
      title: "Why the Bali: An Unforgettable Safari Journey",
      image: "https://cdn.pixabay.com/photo/2019/12/11/21/51/bali-4689382_1280.jpg",
      date: "April 10, 2023",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link href="#" key={article.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow h-full border-0">
            <div className="relative h-48">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-2">{article.date}</p>
              <h3 className="font-semibold text-lg">{article.title}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
