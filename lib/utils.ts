import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) {
    return `${mins}m`
  } else if (mins === 0) {
    return `${hours}h`
  } else {
    return `${hours}h ${mins}m`
  }
}

// Function to calculate dynamic price based on view history
export function calculateDynamicPrice(basePrice: number, flightId: string): number {
  const viewHistory = JSON.parse(localStorage.getItem(`flight_view_${flightId}`) || "[]")
  const now = new Date().getTime()

  // Filter views in the last 5 minutes
  const recentViews = viewHistory.filter((time: number) => now - time < 5 * 60 * 1000)

  // If viewed 3 or more times, increase price by 10%
  if (recentViews.length >= 3) {
    return basePrice * 1.1
  }

  return basePrice
}
