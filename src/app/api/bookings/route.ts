import { NextRequest, NextResponse } from 'next/server';
import { getDb, Booking } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get('userId');
    let bookings = db.data.bookings || [];

    if (userId) {
      bookings = bookings.filter((b) => b.userId === userId);
    }

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch bookings',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const body = await request.json();

    const { flightId, passengers, selectedSeats = [] } = body;
    const user = await request.headers;

    // Get flight details to calculate price
    const flight = db.data.flights.find((f) => f.id === flightId);
    if (!flight) {
      return NextResponse.json(
        {
          success: false,
          error: 'Flight not found',
        },
        { status: 404 }
      );
    }

    // Use selectedSeats if provided, otherwise use passengers count
    const seats = selectedSeats.length > 0 ? selectedSeats : [];
    const totalPrice = flight.price * (seats.length > 0 ? seats.length : passengers);

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      userId: body.userId || 'guest',
      flightId,
      passengers,
      selectedSeats: seats,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Add seats to flight's booked list
    if (seats.length > 0) {
      flight.bookedSeats.push(...seats);
      await db.write();
    }

    db.data.bookings.push(newBooking);
    await db.write();

    return NextResponse.json(
      {
        success: true,
        data: newBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create booking',
      },
      { status: 500 }
    );
  }
}
