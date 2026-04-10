import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const bookingId = params.id;

    // Find booking index
    const bookingIndex = db.data.bookings.findIndex((b) => b.id === bookingId);

    if (bookingIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Booking not found',
        },
        { status: 404 }
      );
    }

    // Remove booking
    const cancelledBooking = db.data.bookings.splice(bookingIndex, 1)[0];
    await db.write();

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: cancelledBooking,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to cancel booking',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const bookingId = params.id;
    const body = await request.json();
    const { passengers } = body;

    // Find booking
    const booking = db.data.bookings.find((b) => b.id === bookingId);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: 'Booking not found',
        },
        { status: 404 }
      );
    }

    if (passengers) {
      // Get flight details for price calculation
      const flight = db.data.flights.find((f) => f.id === booking.flightId);
      if (!flight) {
        return NextResponse.json(
          {
            success: false,
            error: 'Flight not found',
          },
          { status: 404 }
        );
      }

      booking.passengers = passengers;
      booking.totalPrice = flight.price * passengers;
      booking.updatedDate = new Date().toISOString();

      await db.write();
    }

    return NextResponse.json({
      success: true,
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update booking',
      },
      { status: 500 }
    );
  }
}
