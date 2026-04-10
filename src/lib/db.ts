import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Flight {
  id: string;
  departure: string;
  arrival: string;
  departDate: string;
  returnDate?: string;
  departTime: string;
  arrivalTime: string;
  airline: string;
  price: number;
  duration: string;
  stops: number;
}

export interface Booking {
  id: string;
  userId: string;
  flightId: string;
  passengers: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface Database {
  users: User[];
  flights: Flight[];
  bookings: Booking[];
}

// Use environment to determine if we're in Node.js
const isServer = typeof window === 'undefined';

let db: Low<Database> | null = null;

export async function getDb(): Promise<Low<Database>> {
  if (db) return db;

  if (!isServer) {
    throw new Error('Database should only be used on the server');
  }

  const dbPath = path.join(process.cwd(), 'data', 'db.json');
  const adapter = new JSONFile<Database>(dbPath);
  db = new Low<Database>(adapter, {
    users: [],
    flights: [],
    bookings: [],
  });

  await db.read();
  return db;
}

export async function writeDb(database: Low<Database>): Promise<void> {
  await database.write();
}
