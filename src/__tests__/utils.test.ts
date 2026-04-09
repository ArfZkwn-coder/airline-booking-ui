import { formatPrice, formatDate, isValidEmail, generateBookingReference } from '@/lib/utils';

describe('Utils', () => {
  describe('formatPrice', () => {
    it('should format price as USD currency', () => {
      expect(formatPrice(100)).toBe('$100.00');
      expect(formatPrice(1500.5)).toBe('$1,500.50');
    });

    it('should handle zero price', () => {
      expect(formatPrice(0)).toBe('$0.00');
    });
  });

  describe('formatDate', () => {
    it('should format date string correctly', () => {
      const dateString = '2024-06-15';
      const result = formatDate(dateString);
      expect(result).toContain('Jun');
      expect(result).toContain('15');
    });

    it('should format Date object correctly', () => {
      const date = new Date('2024-06-15');
      const result = formatDate(date);
      expect(result).toContain('Jun');
      expect(result).toContain('15');
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.email+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('generateBookingReference', () => {
    it('should generate valid booking reference', () => {
      const ref = generateBookingReference();
      expect(ref).toMatch(/^BK[A-Z0-9]{6}$/);
    });

    it('should generate unique references', () => {
      const refs = Array.from({ length: 10 }, () => generateBookingReference());
      const uniqueRefs = new Set(refs);
      expect(uniqueRefs.size).toBe(10);
    });
  });
});
