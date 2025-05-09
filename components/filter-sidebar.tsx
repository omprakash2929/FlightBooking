"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { airlines } from "@/data/airlines"

interface FilterSidebarProps {
  filters: {
    airline: string[]
    priceRange: [number, number]
    departureTime: string[]
    duration: number
  }
  applyFilters: (filters: FilterSidebarProps["filters"]) => void
}

export function FilterSidebar({ filters, applyFilters }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleAirlineChange = (airline: string, checked: boolean) => {
    setLocalFilters((prev) => {
      if (checked) {
        return { ...prev, airline: [...prev.airline, airline] }
      } else {
        return { ...prev, airline: prev.airline.filter((a) => a !== airline) }
      }
    })
  }

  const handlePriceChange = (value: number[]) => {
    setLocalFilters((prev) => ({ ...prev, priceRange: [value[0], value[1]] }))
  }

  const handleDepartureTimeChange = (time: string, checked: boolean) => {
    setLocalFilters((prev) => {
      if (checked) {
        return { ...prev, departureTime: [...prev.departureTime, time] }
      } else {
        return { ...prev, departureTime: prev.departureTime.filter((t) => t !== time) }
      }
    })
  }

  const handleDurationChange = (value: number[]) => {
    setLocalFilters((prev) => ({ ...prev, duration: value[0] }))
  }

  const handleApplyFilters = () => {
    applyFilters(localFilters)
  }

  const handleResetFilters = () => {
    const resetFilters = {
      airline: [],
      priceRange: [2000, 3000] as [number, number],
      departureTime: [],
      duration: 0,
    }
    setLocalFilters(resetFilters)
    applyFilters(resetFilters)
  }

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Airlines</h3>
          <div className="space-y-2">
            {airlines.map((airline) => (
              <div key={airline.code} className="flex items-center space-x-2">
                <Checkbox
                  id={`airline-${airline.code}`}
                  checked={localFilters.airline.includes(airline.name)}
                  onCheckedChange={(checked) => handleAirlineChange(airline.name, checked as boolean)}
                />
                <Label htmlFor={`airline-${airline.code}`}>{airline.name}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="font-medium">Price Range</h3>
            <span className="text-sm text-muted-foreground">
              {formatCurrency(localFilters.priceRange[0])} - {formatCurrency(localFilters.priceRange[1])}
            </span>
          </div>
          <Slider
            defaultValue={[localFilters.priceRange[0], localFilters.priceRange[1]]}
            min={2000}
            max={3000}
            step={100}
            value={[localFilters.priceRange[0], localFilters.priceRange[1]]}
            onValueChange={handlePriceChange}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Departure Time</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="morning"
                checked={localFilters.departureTime.includes("morning")}
                onCheckedChange={(checked) => handleDepartureTimeChange("morning", checked as boolean)}
              />
              <Label htmlFor="morning">Morning (5:00 - 11:59)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="afternoon"
                checked={localFilters.departureTime.includes("afternoon")}
                onCheckedChange={(checked) => handleDepartureTimeChange("afternoon", checked as boolean)}
              />
              <Label htmlFor="afternoon">Afternoon (12:00 - 17:59)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="evening"
                checked={localFilters.departureTime.includes("evening")}
                onCheckedChange={(checked) => handleDepartureTimeChange("evening", checked as boolean)}
              />
              <Label htmlFor="evening">Evening (18:00 - 21:59)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="night"
                checked={localFilters.departureTime.includes("night")}
                onCheckedChange={(checked) => handleDepartureTimeChange("night", checked as boolean)}
              />
              <Label htmlFor="night">Night (22:00 - 4:59)</Label>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="font-medium">Flight Duration</h3>
            <span className="text-sm text-muted-foreground">
              {localFilters.duration > 0
                ? `${Math.floor(localFilters.duration / 60)}h ${localFilters.duration % 60}m`
                : "Any"}
            </span>
          </div>
          <Slider
            defaultValue={[localFilters.duration]}
            min={0}
            max={600}
            step={30}
            value={[localFilters.duration]}
            onValueChange={handleDurationChange}
          />
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
          <Button variant="outline" onClick={handleResetFilters}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
