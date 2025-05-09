import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function PromoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Get 5% off your 1st app booking</h2>
        <p className="mb-6">
          Download our mobile app and receive exclusive offers, travel tips, and a special discount on your first flight
          booking.
        </p>
        <div className="flex gap-2 mb-6">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white/10 text-white placeholder:text-white/70 border-white/20"
          />
          <Button variant="secondary">Send Link</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Image src="/placeholder.svg?height=20&width=20" alt="App Store" width={20} height={20} className="mr-2" />
            App Store
          </Button>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Image
              src="/placeholder.svg?height=20&width=20"
              alt="Google Play"
              width={20}
              height={20}
              className="mr-2"
            />
            Google Play
          </Button>
        </div>
      </div>
      <div className="relative h-64 md:h-auto">
        <Image
          src="/placeholder.svg?height=400&width=300"
          alt="Mobile app"
          width={400}
          height={300}
          className="object-contain"
        />
      </div>
    </div>
  )
}
