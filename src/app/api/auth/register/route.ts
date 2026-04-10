import { NextRequest, NextResponse } from 'next/server';
import { getDb, User } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name, email and password required',
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = db.data.users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'User already exists',
        },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // In production, hash the password
    };

    db.data.users.push(newUser);
    await db.write();

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      },
      { status: 500 }
    );
  }
}
