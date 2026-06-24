import { add, subtract, multiply, divide, modulo, power } from '../mathHelpers.js';

describe('Math Helpers', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    test('adds two negative numbers', () => {
      expect(add(-5, -3)).toBe(-8);
    });
    test('adds a positive and a negative number', () => {
      expect(add(10, -4)).toBe(6);
    });
    test('adds zero to a number', () => {
      expect(add(0, 7)).toBe(7);
    });
    test('adds zero to zero', () => {
      expect(add(0, 0)).toBe(0);
    });
    test('throws error when a is not a number', () => {
      expect(() => add('two', 3)).toThrow('Invalid input: both arguments must be numbers');
    });
    test('throws error when b is not a number', () => {
      expect(() => add(2, null)).toThrow('Invalid input: both arguments must be numbers');
    });
  });

  describe('subtract', () => {
    test('subtracts two numbers (positive result)', () => {
      expect(subtract(10, 4)).toBe(6);
    });
    test('subtracts resulting in negative', () => {
      expect(subtract(3, 7)).toBe(-4);
    });
    test('subtracts zero', () => {
      expect(subtract(5, 0)).toBe(5);
    });
    test('throws error on invalid input', () => {
      expect(() => subtract([], {})).toThrow('Invalid input: both arguments must be numbers');
    });
  });

  describe('multiply', () => {
    test('multiplies two positive numbers', () => {
      expect(multiply(4, 5)).toBe(20);
    });
    test('multiplies negative numbers', () => {
      expect(multiply(-3, 7)).toBe(-21);
    });
    test('multiplies by zero', () => {
      expect(multiply(9, 0)).toBe(0);
    });
    test('throws error on non-number input', () => {
      expect(() => multiply('a', 2)).toThrow('Invalid input: both arguments must be numbers');
    });
  });

  describe('divide', () => {
    test('divides positive numbers', () => {
      expect(divide(20, 4)).toBe(5);
    });
    test('divides resulting in fractional', () => {
      expect(divide(7, 2)).toBe(3.5);
    });
    test('divides negative numbers', () => {
      expect(divide(-10, 2)).toBe(-5);
    });
    test('divides by 1', () => {
      expect(divide(9, 1)).toBe(9);
    });
    test('throws error when dividing by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero is not allowed');
    });
    test('throws error on non-number input', () => {
      expect(() => divide('a', 2)).toThrow('Invalid input: both arguments must be numbers');
    });
  });

  describe('modulo', () => {
    test('calculates remainder', () => {
      expect(modulo(10, 3)).toBe(1);
    });
    test('remainder with negative dividend', () => {
      expect(modulo(-10, 3)).toBe(-1);
    });
    test('remainder when divisible', () => {
      expect(modulo(12, 4)).toBe(0);
    });
    test('throws error when divisor is zero', () => {
      expect(() => modulo(5, 0)).toThrow('Division by zero is not allowed');
    });
    test('throws error on non-number input', () => {
      expect(() => modulo('a', 2)).toThrow('Invalid input: both arguments must be numbers');
    });
  });

  describe('power', () => {
    test('raises to positive integer exponent', () => {
      expect(power(2, 3)).toBe(8);
    });
    test('raises to zero exponent', () => {
      expect(power(7, 0)).toBe(1);
    });
    test('raises to negative exponent', () => {
      expect(power(2, -3)).toBe(0.125);
    });
    test('raises to fractional exponent', () => {
      expect(power(4, 0.5)).toBe(2);
    });
    test('handles base zero with positive exponent', () => {
      expect(power(0, 5)).toBe(0);
    });
    test('throws error on non-number input', () => {
      expect(() => power('a', 2)).toThrow('Invalid input: both arguments must be numbers');
    });
  });
});