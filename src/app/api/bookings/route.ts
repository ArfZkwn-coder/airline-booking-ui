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

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      userId: body.userId,
      flightId: body.flightId,
      passengers: body.passengers,
      totalPrice: body.totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

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
