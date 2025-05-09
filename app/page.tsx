import Image from "next/image"
import Link from "next/link"
import { Search } from "@/components/search"
import { PopularDestinations } from "@/components/popular-destinations"
import { WhyChooseUs } from "@/components/why-choose-us"
import { FeaturedFlights } from "@/components/featured-flights"
import { TrendingDestinations } from "@/components/trending-destinations"
import { CustomerReviews } from "@/components/customer-reviews"
import { TravelArticles } from "@/components/travel-articles"
import { PromoSection } from "@/components/promo-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat  py-16 pb-[17rem] overflow-hidden h-auto "  style={{ backgroundImage: "url('/Frame.png')" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-orange-500">Life Is Adventure</span> <span className="text-indigo-600">Make</span>
              <br />
              <span className="text-orange-500">The Best Of It</span>
            </h1>
          </div>

          <div className="relative h-80 md:h-96 mx-auto max-w-5xl">
          <div className="mt-12 max-w-4xl mx-auto"> 
          <Search />
          </div>
          </div>

        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular things to do</h2>
            <Link href="/search" className="text-orange-500 hover:text-orange-600 font-medium">
              See all
            </Link>
          </div>
          <PopularDestinations />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why choose SkyBooker</h2>
          <WhyChooseUs />
        </div>
      </section>

      {/* Featured Flights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Trips</h2>
            <Link href="/search" className="text-orange-500 hover:text-orange-600 font-medium">
              See all
            </Link>
          </div>
          <FeaturedFlights />
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Trending Destinations</h2>
            <Link href="/search" className="text-orange-300 hover:text-orange-200 font-medium">
              See all
            </Link>
          </div>
          <TrendingDestinations />
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Customer Reviews</h2>
          <CustomerReviews />
        </div>
      </section>

      {/* Travel Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Travel Articles</h2>
            <Link href="#" className="text-orange-500 hover:text-orange-600 font-medium">
              See all
            </Link>
          </div>
          <TravelArticles />
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <PromoSection />
        </div>
      </section>
    </main>
  )
}
