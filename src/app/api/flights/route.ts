import { NextRequest, NextResponse } from 'next/server';
import { getDb, Flight } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);

    const from = searchParams.get('from')?.toUpperCase();
    const to = searchParams.get('to')?.toUpperCase();
    const departDate = searchParams.get('departDate');

    let flights = db.data.flights || [];

    // Filter flights based on search criteria
    if (from) {
      flights = flights.filter((f) => f.departure === from);
    }
    if (to) {
      flights = flights.filter((f) => f.arrival === to);
    }
    if (departDate) {
      flights = flights.filter((f) => f.departDate === departDate);
    }

    return NextResponse.json({
      success: true,
      data: flights,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch flights',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const body = await request.json();

    const newFlight: Flight = {
      id: `flight-${Date.now()}`,
      departure: body.departure.toUpperCase(),
      arrival: body.arrival.toUpperCase(),
      departDate: body.departDate,
      returnDate: body.returnDate,
      departTime: body.departTime || '10:00 AM',
      arrivalTime: body.arrivalTime || '01:00 PM',
      airline: body.airline || 'Airline',
      price: body.price || 0,
      duration: body.duration || '2h',
      stops: body.stops || 0,
    };

    db.data.flights.push(newFlight);
    await db.write();

    return NextResponse.json(
      {
        success: true,
        data: newFlight,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create flight',
      },
      { status: 500 }
    );
  }
}
