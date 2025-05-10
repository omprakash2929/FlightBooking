import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server'; // Clerk's server-side helper to get the current user
import { connectDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { flightsData } from '@/data/flights';

// Utility to generate a PNR
const generatePNR = () => `PNR${Math.floor(Math.random() * 1000000)}`;

export async function POST(req: NextRequest) {
  try {
    // Get the authenticated user from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: User not logged in' }, { status: 401 });
    }

    // Parse the request body
    const body = await req.json();
    const { flightId, passengerInfo, price } = body;

    // Validate required fields
    if (!flightId || !passengerInfo) {
      return NextResponse.json({ error: 'Missing required fields: flightId and passengerInfo are required' }, { status: 400 });
    }

    // Validate passengerInfo fields
    const { firstName, lastName, email, phone } = passengerInfo;
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required passenger info: firstName, lastName, email, and phone are required' },
        { status: 400 }
      );
    }

    // Find the flight (using static data for now)
    const flight = flightsData.find((f) => f.id === flightId);
    if (!flight) {
      return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }

    // Connect to MongoDB
    await connectDB();

    // Create the booking
    const booking = new Booking({
      userId: user.id, // Clerk user ID (string, will be converted to ObjectId by Mongoose if needed)
      flightId: flight.id, // Store as string (you may need to adjust based on your flight data)
      passengerInfo: {
        firstName,
        lastName,
        email,
        phone,
      },
      price: price || flight.price,
      status: 'confirmed',
      bookingDate: new Date(),
      pnr: generatePNR(),
    });

    // Save the booking to MongoDB
    const savedBooking = await booking.save();

    // Return the saved booking (excluding sensitive data)
    return NextResponse.json(
      {
        id: savedBooking._id,
        userId: savedBooking.userId,
        flightId: savedBooking.flightId,
        passengerInfo: savedBooking.passengerInfo,
        price: savedBooking.price,
        status: savedBooking.status,
        bookingDate: savedBooking.bookingDate,
        pnr: savedBooking.pnr,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}