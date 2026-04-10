import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AirBook - Airline Booking System',
  description: 'Book flights with confidence and find the best deals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
