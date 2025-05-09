import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, CreditCard, Headphones } from "lucide-react"

export function WhyChooseUs() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-orange-500" />,
      title: "Ultimate flexibility",
      description: "You're in control, with free cancellation and payment options to satisfy any plan or budget",
    },
    {
      icon: <Clock className="h-10 w-10 text-orange-500" />,
      title: "Memorable experiences",
      description: "Browse and book tours and activities so incredible, you'll want to tell your friends",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-orange-500" />,
      title: "Quality at our core",
      description: "High quality standards. Millions of reviews. A Tripadvisor company",
    },
    {
      icon: <Headphones className="h-10 w-10 text-orange-500" />,
      title: "Award-winning support",
      description: "New price? New plan? No problem. We're here to help, 24/7",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="flex flex-col items-center text-center p-6">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
