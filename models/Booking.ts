// models/Booking.ts
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Changed to String for Clerk user ID
  flightId: { type: String, required: true }, // Changed to String for flight ID
  passengerInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  price: { type: Number, required: true },
  status: { type: String, default: 'confirmed' },
  bookingDate: { type: Date, default: Date.now },
  pnr: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
