function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Invalid input: both arguments must be numbers');
  }
  return a + b;
}

function subtract(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Invalid input: both arguments must be numbers');
  }
  return a - b;
}

function multiply(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Invalid input: both arguments must be numbers');
  }
  const result = a * b;
  if (!Number.isFinite(result)) {
    if (Number.isFinite(a) && Number.isFinite(b)) {
      return NaN;
    }
    if (a === 0 && Math.abs(b) === Infinity) {
      return NaN;
    }
    if (b === 0 && Math.abs(a) === Infinity) {
      return NaN;
    }
  }
  return result;
}

function divide(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Invalid input: both arguments must be numbers');
  }
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  const result = a / b;
  return result;
}

function pow(base, exponent) {
  if (typeof base !== 'number' || typeof exponent !== 'number') {
    throw new TypeError('Invalid input: both arguments must be numbers');
  }
  if (!Number.isFinite(base) && exponent !== 0 && !Number.isFinite(exponent)) {
    return NaN;
  }
  const result = Math.pow(base, exponent);
  if (!Number.isFinite(result) && !Number.isNaN(result)) {
    return result;
  }
  return result;
}

function factorial(n) {
  if (typeof n !== 'number') {
    throw new TypeError('Invalid input: argument must be a number');
  }
  if (!Number.isInteger(n) || n < 0) {
    if (n < 0) {
      throw new Error('Factorial is not defined for negative numbers');
    } else {
      throw new Error('Factorial input must be an integer');
    }
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export { add, subtract, multiply, divide, pow, factorial };