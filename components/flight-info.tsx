import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { formatTime, formatDuration, formatDate } from "@/lib/utils"
import type { Flight } from "@/types"
import { Plane, Clock, Calendar, ArrowRight } from "lucide-react"

interface FlightInfoProps {
  flight: Flight
}

export function FlightInfo({ flight }: FlightInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
          <Plane className="h-6 w-6 text-orange-500" />
        </div>
        <div>
          <div className="font-semibold">{flight.airline}</div>
          <div className="text-sm text-muted-foreground">
            {flight.flightNumber} • {flight.aircraft}
          </div>
        </div>
        <Badge className="ml-auto">{flight.cabinClass}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground flex items-center">
            <Calendar className="h-4 w-4 mr-1" /> Departure
          </div>
          <div className="text-2xl font-bold">{formatTime(flight.departureTime)}</div>
          <div className="text-sm">{formatDate(flight.departureTime)}</div>
          <div className="font-medium">
            {flight.from.city} ({flight.from.code})
          </div>
          <div className="text-sm text-muted-foreground">{flight.from.name}</div>
        </div>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="text-sm text-muted-foreground mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-1" /> {formatDuration(flight.durationMinutes)}
          </div>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-white px-2">
                <ArrowRight className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground mt-2">Direct Flight</div>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-muted-foreground flex items-center">
            <Calendar className="h-4 w-4 mr-1" /> Arrival
          </div>
          <div className="text-2xl font-bold">{formatTime(flight.arrivalTime)}</div>
          <div className="text-sm">{formatDate(flight.arrivalTime)}</div>
          <div className="font-medium">
            {flight.to.city} ({flight.to.code})
          </div>
          <div className="text-sm text-muted-foreground">{flight.to.name}</div>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="font-medium">Flight Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Aircraft</div>
            <div>{flight.aircraft}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Flight Number</div>
            <div>{flight.flightNumber}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Cabin Class</div>
            <div>{flight.cabinClass}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Duration</div>
            <div>{formatDuration(flight.durationMinutes)}</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {flight.amenities.map((amenity, index) => (
            <Badge key={index} variant="outline">
              {amenity}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
