// models/Booking.ts
import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  flightId: { type: mongoose.Types.ObjectId, required: true },
  passengerInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  price: Number,
  status: { type: String, default: "confirmed" },
  bookingDate: Date,
  pnr: String,
})

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema)
