interface PassengerDetailsProps {
  passenger: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

export function PassengerDetails({ passenger }: PassengerDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="text-sm text-muted-foreground">First Name</div>
        <div className="font-medium">{passenger.firstName}</div>
      </div>

      <div>
        <div className="text-sm text-muted-foreground">Last Name</div>
        <div className="font-medium">{passenger.lastName}</div>
      </div>

      <div>
        <div className="text-sm text-muted-foreground">Email</div>
        <div className="font-medium">{passenger.email}</div>
      </div>

      <div>
        <div className="text-sm text-muted-foreground">Phone Number</div>
        <div className="font-medium">{passenger.phone}</div>
      </div>
    </div>
  )
}
