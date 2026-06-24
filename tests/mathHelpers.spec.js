const { add, subtract, multiply, divide } = require('./mathHelpers');

describe('Math helpers', () => {
  // add tests
  test('add returns sum of two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  test('add returns sum of two negative numbers', () => {
    expect(add(-5, -7)).toBe(-12);
  });
  test('add returns sum of positive and negative numbers', () => {
    expect(add(10, -4)).toBe(6);
  });
  test('add returns sum when one operand is zero', () => {
    expect(add(0, 9)).toBe(9);
    expect(add(-3, 0)).toBe(-3);
  });
  test('add returns NaN when any operand is NaN', () => {
    expect(add(NaN, 5)).toBeNaN();
    expect(add(5, NaN)).toBeNaN();
  });
  test('add throws error on non-numeric input', () => {
    expect(() => add('a', 2)).toThrow();
    expect(() => add(null, 2)).toThrow();
    expect(() => add([1], 2)).toThrow();
  });

  // subtract tests
  test('subtract returns difference of two numbers', () => {
    expect(subtract(10, 4)).toBe(6);
  });
  test('subtract returns negative difference', () => {
    expect(subtract(3, 10)).toBe(-7);
  });
  test('subtract with zero', () => {
    expect(subtract(5, 0)).toBe(5);
    expect(subtract(0, 5)).toBe(-5);
  });
  test('subtract throws on non-numeric input', () => {
    expect(() => subtract('x', 5)).toThrow();
  });

  // multiply tests
  test('multiply returns product of two numbers', () => {
    expect(multiply(3, 4)).toBe(12);
  });
  test('multiply with zero', () => {
    expect(multiply(5, 0)).toBe(0);
    expect(multiply(0, -5)).toBe(0);
  });
  test('multiply with negative numbers', () => {
    expect(multiply(-3, 4)).toBe(-12);
    expect(multiply(-3, -4)).toBe(12);
  });
  test('multiply throws on non-numeric input', () => {
    expect(() => multiply([], 5)).toThrow();
  });

  // divide tests
  test('divide returns quotient', () => {
    expect(divide(20, 5)).toBe(4);
  });
  test('divide with negative numbers', () => {
    expect(divide(-20, 5)).toBe(-4);
    expect(divide(20, -5)).toBe(-4);
  });
  test('divide with zero numerator', () => {
    expect(divide(0, 5)).toBe(0);
  });
  test('divide throws on division by zero', () => {
    expect(() => divide(5, 0)).toThrow();
  });
  test('divide throws on non-numeric input', () => {
    expect(() => divide('a', 2)).toThrow();
  });
});