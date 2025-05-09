import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"

interface PriceBreakdownProps {
  basePrice: number
  currentPrice: number
  taxes: number
  fees: number
}

export function PriceBreakdown({ basePrice, currentPrice, taxes, fees }: PriceBreakdownProps) {
  const total = currentPrice + taxes + fees
  const discount = basePrice - currentPrice

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Base Fare</span>
        <span>{formatCurrency(basePrice)}</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>- {formatCurrency(discount)}</span>
        </div>
      )}

      {currentPrice > basePrice && (
        <div className="flex justify-between text-red-600">
          <span>Dynamic Price Increase (10%)</span>
          <span>+ {formatCurrency(currentPrice - basePrice)}</span>
        </div>
      )}

      <div className="flex justify-between">
        <span>Taxes</span>
        <span>{formatCurrency(taxes)}</span>
      </div>

      <div className="flex justify-between">
        <span>Fees & Surcharges</span>
        <span>{formatCurrency(fees)}</span>
      </div>

      <Separator />

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  )
}
