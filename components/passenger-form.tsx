"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PassengerFormProps {
  onChange: (
    info: {
      firstName: string
      lastName: string
      email: string
      phone: string
    },
    valid: boolean,
  ) => void
}

export function PassengerForm({ onChange }: PassengerFormProps) {
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const validate = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    }

    let isValid = true

    if (!passengerInfo.firstName.trim()) {
      newErrors.firstName = "First name is required"
      isValid = false
    }

    if (!passengerInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required"
      isValid = false
    }

    if (!passengerInfo.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(passengerInfo.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!passengerInfo.phone.trim()) {
      newErrors.phone = "Phone number is required"
      isValid = false
    } else if (!/^\d{10}$/.test(passengerInfo.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number should be 10 digits"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (field: keyof typeof passengerInfo, value: string) => {
    setPassengerInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  useEffect(() => {
    const isValid = validate()
    onChange(passengerInfo, isValid)
  }, [passengerInfo, onChange])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={passengerInfo.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          placeholder="Enter first name"
        />
        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={passengerInfo.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          placeholder="Enter last name"
        />
        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={passengerInfo.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter email address"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={passengerInfo.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="Enter phone number"
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>
    </div>
  )
}
