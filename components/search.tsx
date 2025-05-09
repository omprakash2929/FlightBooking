"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plane, Users } from "lucide-react";
import { format } from "date-fns";

export function Search() {
  const router = useRouter();
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromAirport, setFromAirport] = useState<string | null>(null);
  const [toAirport, setToAirport] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState("one-way");
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [fromAirports, setFromAirports] = useState<any[]>([]);
  const [toAirports, setToAirports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  // Fetch airports based on query
  useEffect(() => {
    const fetchAirportsData = async (query: string, setAirports: (airports: any[]) => void) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/airports?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch airports");
        }
        const data = await response.json();
        setAirports(data);
      } catch (err) {
        setError("Unable to load airports. Please try again.");
        setAirports([]);
      } finally {
        setLoading(false);
      }
    };

    // Fetch for "From" field
    if (fromQuery.length >= 2 || fromQuery === "") {
      fetchAirportsData(fromQuery, setFromAirports);
    } else {
      setFromAirports([]);
    }

    // Fetch for "To" field
    if (toQuery.length >= 2 || toQuery === "") {
      fetchAirportsData(toQuery, setToAirports);
    } else {
      setToAirports([]);
    }
  }, [fromQuery, toQuery]);

  const handleSearch = () => {
    if (!fromAirport || !toAirport || !date) {
      return;
    }

    // In a real app, we would pass these as query params
    router.push("/search");
  };

  return (
    <Card className="border shadow-md bg-white">
      <CardContent className="p-6">
        <Tabs defaultValue="one-way" onValueChange={setTripType} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="one-way">One Way</TabsTrigger>
            <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
            <TabsTrigger value="multi-city">Multi-City</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Popover open={fromOpen} onOpenChange={setFromOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Plane className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="from"
                    ref={fromInputRef}
                    placeholder="City or Airport"
                    value={fromQuery}
                    onChange={(e) => setFromQuery(e.target.value)}
                    className="pl-10"
                    onClick={() => setFromOpen(true)}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search city or airport..." />
                  <CommandList>
                    {loading && <CommandEmpty>Loading airports...</CommandEmpty>}
                    {error && <CommandEmpty>{error}</CommandEmpty>}
                    {!loading && !error && fromAirports.length === 0 && (
                      <CommandEmpty>No airports found.</CommandEmpty>
                    )}
                    <CommandGroup>
                      {fromAirports.map((airport) => (
                        <CommandItem
                          key={airport.code}
                          onSelect={() => {
                            setFromAirport(airport.code);
                            setFromQuery(`${airport.city} (${airport.code})`);
                            setFromOpen(false);
                            setTimeout(() => toInputRef.current?.focus(), 0);
                          }}
                        >
                          <div className="flex flex-col">
                            <span>
                              {airport.city} ({airport.code})
                            </span>
                            <span className="text-xs text-muted-foreground">{airport.name}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Popover open={toOpen} onOpenChange={setToOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Plane className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="to"
                    ref={toInputRef}
                    placeholder="City or Airport"
                    value={toQuery}
                    onChange={(e) => setToQuery(e.target.value)}
                    className="pl-10"
                    onClick={() => setToOpen(true)}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search city or airport..." />
                  <CommandList>
                    {loading && <CommandEmpty>Loading airports...</CommandEmpty>}
                    {error && <CommandEmpty>{error}</CommandEmpty>}
                    {!loading && !error && toAirports.length === 0 && (
                      <CommandEmpty>No airports found.</CommandEmpty>
                    )}
                    <CommandGroup>
                      {toAirports.map((airport) => (
                        <CommandItem
                          key={airport.code}
                          onSelect={() => {
                            setToAirport(airport.code);
                            setToQuery(`${airport.city} (${airport.code})`);
                            setToOpen(false);
                          }}
                        >
                          <div className="flex flex-col">
                            <span>
                              {airport.city} ({airport.code})
                            </span>
                            <span className="text-xs text-muted-foreground">{airport.name}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Departure Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passengers">Passengers</Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="passengers"
                type="number"
                min="1"
                max="9"
                value={passengers}
                onChange={(e) => setPassengers(Number.parseInt(e.target.value) || 1)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {tripType === "round-trip" && (
          <div className="mt-4">
            <div className="space-y-2">
              <Label htmlFor="return-date">Return Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Pick a return date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" initialFocus disabled={(date) => date < new Date()} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        <Button onClick={handleSearch} className="mt-6 w-full bg-orange-500 hover:bg-orange-600" size="lg">
          Search Flights
        </Button>
      </CardContent>
    </Card>
  );
}