# AirBook - Airline Booking System UI

A modern, production-ready airline booking system built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Zustand**.

## 🚀 Features

- ✈️ **Flight Search** - Search for flights by departure, arrival, date, and passenger count
- 🔐 **Authentication** - Secure user registration and login with session management
- 📅 **Booking Management** - Create, view, and cancel flight bookings
- 💳 **Price Calculator** - Real-time pricing based on selected flights and passengers
- 📱 **Responsive Design** - Fully responsive UI that works on all devices
- 🎨 **Modern UI** - Beautiful components built with Tailwind CSS
- ⚡ **Type-Safe** - Full TypeScript strict mode for enhanced reliability
- 🧪 **Test Coverage** - Jest and React Testing Library setup with sample tests

## 📋 Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx          # Login page
│   │   └── register/page.tsx       # Registration page
│   ├── flights/page.tsx             # Flight search & listing page
│   ├── bookings/page.tsx            # Bookings management page
│   ├── page.tsx                     # Home/landing page
│   └── layout.tsx                   # Root layout
├── components/
│   ├── Navbar.tsx                   # Navigation component
│   ├── FlightSearchForm.tsx         # Flight search form
│   ├── FlightCard.tsx               # Flight display card
│   └── ToastContainer.tsx           # Toast notifications
├── lib/
│   ├── api.ts                       # API service layer
│   ├── utils.ts                     # Utility functions
│   └── useToast.ts                  # Toast hook
├── store/
│   └── store.ts                     # Zustand state management
└── __tests__/
    ├── utils.test.ts                # Utility function tests
    ├── store.test.ts                # Store tests
    └── Navbar.test.tsx              # Component tests
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.3 (App Router)
- **Language**: TypeScript 5.x (Strict mode)
- **Styling**: Tailwind CSS 4.0+
- **State Management**: Zustand 5.x
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint

## 🚀 Getting Started

### Installation

1. **Navigate to project directory**:
   ```bash
   cd airline-booking-ui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional):
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your API configuration:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building

Build for production:

```bash
npm run build
npm start
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Files

Tests are located in `src/__tests__/`:

- **utils.test.ts** - Tests for utility functions (formatting, validation, etc.)
- **store.test.ts** - Tests for Zustand stores (auth, flights, bookings)
- **Navbar.test.tsx** - Tests for Navbar component

## 📚 Key Components

### Pages

- **Home** (`src/app/page.tsx`) - Landing page with features overview
- **Login** (`src/app/auth/login/page.tsx`) - User authentication
- **Register** (`src/app/auth/register/page.tsx`) - New user registration
- **Flights** (`src/app/flights/page.tsx`) - Flight search and discovery
- **Bookings** (`src/app/bookings/page.tsx`) - User booking management

### Components

- **Navbar** - Navigation with auth-aware links
- **FlightSearchForm** - Search criteria input form
- **FlightCard** - Flight result display with booking button
- **ToastContainer** - Notification display system

### Stores (Zustand)

- **useAuthStore** - Manages user authentication and sessions
- **useFlightStore** - Manages flight search and listing
- **useBookingStore** - Manages flight bookings and reservations

## 🔌 API Integration

The application includes a mock API service layer (`src/lib/api.ts`) that can be easily connected to a real backend.

### Available API Endpoints (Mock)

```typescript
// Authentication
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout

// Flights
GET    /api/flights/search?departure=NYC&arrival=LAX&date=2024-06-15&passengers=2

// Bookings
POST   /api/bookings
GET    /api/bookings
GET    /api/bookings/:bookingId
PUT    /api/bookings/:bookingId/cancel

// User
GET    /api/users/profile
PUT    /api/users/profile
PUT    /api/users/change-password
```

To connect to a real API, update `NEXT_PUBLIC_API_URL` in your `.env.local` file.

## 🎨 Styling

The application uses **Tailwind CSS** exclusively. No custom CSS files are used to maintain consistency and simplicity.

All components follow responsive design principles:
- Mobile-first approach
- Responsive grid layouts
- Flexible spacing and sizing

## 🔒 TypeScript Configuration

TypeScript is configured in **strict mode** for maximum type safety:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true
  }
}
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier (if configured)

## 🔐 Authentication Flow

1. User registers with name, email, and password
2. System validates credentials and creates session
3. User logs in with email and password
4. Session is stored in Zustand store
5. Protected pages redirect to login if not authenticated
6. User can logout to clear session

## 💳 Booking Flow

1. User searches for flights
2. User selects a flight and passenger count
3. System calculates total price (price per passenger × passengers)
4. User confirms booking
5. Booking reference is generated
6. Booking appears in "My Bookings" page
7. User can cancel bookings (if status is "confirmed")

## 🐛 Debugging

Enable debug logging by setting environment variable:

```bash
DEBUG=airbook:* npm run dev
```

## 📄 License

This project is part of the Airline Booking System demonstration.

## 🤝 Contributing

When adding new features:

1. Follow the existing code style
2. Keep components under 100 lines when possible
3. Use TypeScript strict mode (no `any` types)
4. Use Tailwind CSS for styling
5. Add tests for new functionality
6. Update this README if needed

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Support

For questions or issues, please refer to the project documentation or create an issue in the repository.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
