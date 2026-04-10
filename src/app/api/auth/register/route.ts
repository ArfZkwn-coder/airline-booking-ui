import { NextRequest, NextResponse } from 'next/server';
import { getDb, User } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { isValidEmail, isValidPassword, ValidationErrors } from '@/lib/validation';

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

    // Validate password strength
    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          success: false,
          error: ValidationErrors.INVALID_PASSWORD,
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
          error: ValidationErrors.EMAIL_IN_USE,
        },
        { status: 400 }
      );
    }

    // Hash password with bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
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
