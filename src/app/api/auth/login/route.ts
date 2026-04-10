import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { isValidEmail, ValidationErrors } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password required',
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: ValidationErrors.INVALID_EMAIL,
        },
        { status: 400 }
      );
    }

    const user = db.data.users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: ValidationErrors.INVALID_CREDENTIALS,
        },
        { status: 401 }
      );
    }

    // Compare password with hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          error: ValidationErrors.INVALID_CREDENTIALS,
        },
        { status: 401 }
      );
    }

    // Return user data (in production, use JWT tokens)
    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      },
      { status: 500 }
    );
  }
}
