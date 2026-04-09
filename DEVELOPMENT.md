# Development Guide - AirBook Airline Booking UI

This guide covers development practices and common tasks for the AirBook project.

## 🏗️ Architecture Overview

### State Management (Zustand)

All application state is managed through Zustand stores in `src/store/store.ts`:

```typescript
// Auth store - Manages user authentication
useAuthStore()
  - user: User | null
  - login(email, password): Promise<void>
  - register(name, email, password): Promise<void>
  - logout(): void

// Flight store - Manages flight search and listing
useFlightStore()
  - flights: Flight[]
  - filteredFlights: Flight[]
  - searchParams: SearchParams
  - searchFlights(...): Promise<void>

// Booking store - Manages reservations
useBookingStore()
  - bookings: Booking[]
  - createBooking(flight, passengers): Promise<void>
  - fetchBookings(): Promise<void>
  - cancelBooking(bookingId): Promise<void>
```

### API Layer

All server communication goes through `src/lib/api.ts`. This provides:

1. **Centralized endpoint management** - All API calls in one place
2. **Error handling** - Consistent error responses
3. **Future migration** - Easy to swap mock with real APIs
4. **Type safety** - Full TypeScript interfaces

Example usage:

```typescript
// In a component or store
const response = await API.flights.search('NYC', 'LAX', '2024-06-15', 2);
if (response.success) {
  // Handle data
} else {
  // Handle error
}
```

### Component Structure

Components follow these principles:

1. **Single Responsibility** - Each component does one thing
2. **Under 100 lines** - Keep complexity low
3. **TypeScript** - No `any` types
4. **Tailwind CSS** - Styling only (no CSS files)
5. **Props interface** - Every component has explicit props

Example component:

```typescript
'use client';

import { ComponentType } from 'react';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="p-4 bg-white rounded">
      <h1 className="text-xl font-bold">{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

## 🧪 Testing Strategy

### Unit Tests
- Located in `src/__tests__/` with `.test.ts` or `.test.tsx` extension
- Test utility functions, hooks, and business logic
- Mock Zustand stores and API calls

Example:

```typescript
describe('formatPrice', () => {
  it('should format price as USD currency', () => {
    expect(formatPrice(100)).toBe('$100.00');
  });
});
```

### Component Tests
- Test rendering and user interactions
- Mock external dependencies (stores, router)
- Focus on user behavior, not implementation

Example:

```typescript
describe('MyComponent', () => {
  it('should call onAction when button clicked', () => {
    const onClick = jest.fn();
    render(<MyComponent title="Test" onAction={onClick} />);
    fireEvent.click(screen.getByText('Action'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Integration Tests
- Test complete flows (search → book → view order)
- Use real store interactions
- Mock API layer only

## 🔄 Adding New Features

### 1. Add a New Page

```bash
mkdir -p src/app/new-feature
touch src/app/new-feature/page.tsx
```

Structure:

```typescript
'use client';

import { Navbar } from '@/components/Navbar';

export default function NewFeaturePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Content */}
      </div>
    </div>
  );
}
```

### 2. Add a New Component

```bash
touch src/components/MyComponent.tsx
```

Template:

```typescript
'use client';

interface MyComponentProps {
  // props
}

export function MyComponent({}: MyComponentProps) {
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### 3. Add Store Methods

In `src/store/store.ts`, extend the appropriate store:

```typescript
export const useMyStore = create((set) => ({
  data: [],
  fetchData: async () => {
    // Implementation
    set({ data: newData });
  },
}));
```

### 4. Add API Endpoints

In `src/lib/api.ts`:

```typescript
export const myAPI = {
  getItems: async () => {
    return apiFetch<Item[]>('/items');
  },
};
```

### 5. Add Tests

For new features, add corresponding tests:

```bash
touch src/__tests__/MyComponent.test.tsx
```

## 📝 Code Standards

### TypeScript

- ✅ No `any` types
- ✅ Explicit return types on functions
- ✅ Interface for all props
- ✅ Use `unknown` instead of `any`

### React

- ✅ Use `'use client'` for client components
- ✅ Use hooks (useState, useEffect, custom)
- ✅ Memoize expensive computations with `useMemo`
- ✅ Use `useCallback` for stable function references

### Tailwind CSS

- ✅ Use utility classes only
- ✅ Responsive design (mobile-first)
- ✅ Color palette: gray, blue, green, red, yellow
- ✅ Consistent spacing scale (4px base unit)

### File Naming

- Components: `PascalCase.tsx`
- Pages: `lowercase/page.tsx`
- Utilities: `camelCase.ts`
- Tests: `Name.test.tsx` or `name.test.ts`
- Stores: `store.ts` (single file)

## 🐛 Debugging

### Enable Debug Logs

```bash
DEBUG=airbook:* npm run dev
```

### Common Issues

**Authentication not persisting**
- Check `useAuthStore` is properly initializing
- Verify localStorage persistence (if implemented)

**Flights not showing after search**
- Check `useFlightStore.searchFlights` is called
- Verify API response has correct flight data
- Check filter is not removing results

**Form validation not working**
- Use `onChange` and `onBlur` handlers
- State should track both value and error
- Validate on form submit

## 🚀 Performance Optimization

### Code Splitting
- Pages are automatically code-split by Next.js
- Use dynamic imports for heavy components

```typescript
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <div>Loading...</div>,
});
```

### Image Optimization
- Use Next.js `Image` component
- Lazy load images when not visible

### Memoization
- Memoize components that re-render frequently
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to children

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## 🤝 Pull Request Guidelines

When submitting changes:

1. ✅ All tests pass (`npm test`)
2. ✅ No linting errors (`npm run lint`)
3. ✅ TypeScript strict mode passes (`npm run build`)
4. ✅ Updated tests for new features
5. ✅ Updated README if needed
6. ✅ Clear commit messages

## 🔒 Security Considerations

- Never commit `.env.local` (use `.env.example`)
- Sanitize user input before API calls
- Validate user authentication on protected pages
- Don't store sensitive data in localStorage
- Use HTTPS for production deployments

---

Last updated: 2024
