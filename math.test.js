import assert from 'node:assert';
import {
  add,
  subtract,
  multiply,
  divide,
  pow,
  factorial,
} from './math.js';

function describe(label, tests) {
  console.log(`\n--- ${label} ---`);
  tests.forEach(test => test());
}
function it(desc, fn) {
  try {
    fn();
    console.log(`✓ ${desc}`);
  } catch (e) {
    console.error(`✗ ${desc}: ${e.message}`);
    throw e;
  }
}

describe('add', () => {
  it('adds two positive numbers', () => {
    assert.strictEqual(add(2, 3), 5);
  });
  it('adds two negative numbers', () => {
    assert.strictEqual(add(-2, -3), -5);
  });
  it('adds positive and negative', () => {
    assert.strictEqual(add(5, -2), 3);
  });
  it('adds zero', () => {
    assert.strictEqual(add(0, 5), 5);
    assert.strictEqual(add(-3, 0), -3);
  });
  it('adds NaN results in NaN', () => {
    assert.strictEqual(Number.isNaN(add(NaN, 5)), true);
  });
  it('adds Infinity yields Infinity', () => {
    assert.strictEqual(add(Infinity, 10), Infinity);
  });
  it('throws TypeError on non-number arguments', () => {
    assert.throws(() => add('a', 2), { name: 'TypeError' });
  });
  it('throws TypeError on non-number second argument', () => {
    assert.throws(() => add(2, 'string'), { name: 'TypeError' });
  });
  it('handles floats correctly', () => {
    assert.strictEqual(add(1.5, 2.5), 4);
  });
});

describe('subtract', () => {
  it('subtracts numbers correctly', () => {
    assert.strictEqual(subtract(10, 4), 6);
    assert.strictEqual(subtract(3, 7), -4);
    assert.strictEqual(subtract(0, 5), -5);
  });
  it('throws TypeError on non-number arguments', () => {
    assert.throws(() => subtract(5, 'x'), { name: 'TypeError' });
  });
});

describe('multiply', () => {
  it('multiplies positive numbers', () => {
    assert.strictEqual(multiply(3, 7), 21);
  });
  it('handles zero correctly', () => {
    assert.strictEqual(multiply(0, 100), 0);
    assert.strictEqual(multiply(5, 0), 0);
  });
  it('multiplies negative numbers', () => {
    assert.strictEqual(multiply(-2, 5), -10);
    assert.strictEqual(multiply(-3, -4), 12);
  });
  it('multiplies with Infinity', () => {
    assert.strictEqual(multiply(Infinity, 0), NaN);
    assert.strictEqual(multiply(Infinity, 5), Infinity);
  });
  it('throws TypeError on non-number arguments', () => {
    assert.throws(() => multiply('a', 2), { name: 'TypeError' });
  });
  it('throws TypeError on non-number second argument', () => {
    assert.throws(() => multiply(2, 'string'), { name: 'TypeError' });
  });
});

describe('divide', () => {
  it('divides normally', () => {
    assert.strictEqual(divide(10, 2), 5);
    assert.strictEqual(divide(5, 2), 2.5);
  });
  it('handles negative numbers', () => {
    assert.strictEqual(divide(-10, 2), -5);
    assert.strictEqual(divide(10, -2), -5);
  });
  it('throws error on division by zero', () => {
    assert.throws(() => divide(5, 0), { message: 'Division by zero is not allowed' });
  });
  it('divides by Infinity yields 0', () => {
    assert.strictEqual(divide(5, Infinity), 0);
    assert.strictEqual(divide(Infinity, 5), Infinity);
  });
  it('throws TypeError on non-number arguments', () => {
    assert.throws(() => divide('a', 2), { name: 'TypeError' });
    assert.throws(() => divide(2, null), { name: 'TypeError' });
  });
});

describe('pow', () => {
  it('computes positive exponent', () => {
    assert.strictEqual(pow(2, 3), 8);
    assert.strictEqual(pow(5, 0), 1);
  });
  it('handles negative exponent', () => {
    assert.strictEqual(pow(2, -1), 0.5);
    assert.strictEqual(pow(4, -2), 0.0625);
  });
  it('throws TypeError on non-number arguments', () => {
    assert.throws(() => pow('a', 2), { name: 'TypeError' });
  });
  it('throws TypeError on non-number second argument', () => {
    assert.throws(() => pow(2, 'string'), { name: 'TypeError' });
  });
});

describe('factorial', () => {
  it('computes factorial of 0', () => {
    assert.strictEqual(factorial(0), 1);
  });
  it('computes factorial of 1', () => {
    assert.strictEqual(factorial(1), 1);
  });
  it('computes factorial of 5', () => {
    assert.strictEqual(factorial(5), 120);
  });
  it('computes factorial of 10', () => {
    assert.strictEqual(factorial(10), 3628800);
  });
  it('throws error for negative number', () => {
    assert.throws(() => factorial(-3), { message: 'Factorial is not defined for negative numbers' });
  });
  it('throws error for non-integer number', () => {
    assert.throws(() => factorial(3.5), { message: 'Factorial input must be an integer' });
  });
  it('throws TypeError for non-number', () => {
    assert.throws(() => factorial('a'), { name: 'TypeError' });
  });
});

console.log('\n=== All unit tests passed ===');