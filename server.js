import express from 'express';
import { add, subtract, multiply, divide, pow, factorial } from './math.js';

const app = express();
const PORT = 5000 || process.env.PORT;

function getQueryParam(url, param) {
  const queryString = url.split('?')[1];
  if (!queryString) return undefined;
  const params = new URLSearchParams(queryString);
  return params.get(param);
}

function validateNumber(value) {
  if (typeof value === 'string') {
    if (!/^[0-9]*$/.test(value)) {
      throw new Error(`Invalid number: ${value}`);
    }
    if (value.includes('.')) {
      throw new Error(`Invalid number: ${value}`);
    }
    if (value === '') {
      return NaN;
    }
    return parseInt(value, 10);
  }
  return value;
}

if (isNaN(parseInt(PORT))) {
  console.error('Invalid PORT value:', PORT);
  process.exit(1);
}

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello World!');
});

app.get('/add', (req, res) => {
  try {
    const a = getQueryParam(req.url, 'a');
    const b = getQueryParam(req.url, 'b');
    if (a === undefined || b === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const numA = validateNumber(a);
    const numB = validateNumber(b);
    if (numA === null || numA === undefined || numB === null || numB === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const result = add(numA, numB);
    res.set('Content-Type', 'application/json');
    res.send({ result });
  } catch (error) {
    res.set('Content-Type', 'application/json');
    res.status(400).send({ error: error.message });
  }
});

app.get('/subtract', (req, res) => {
  try {
    const a = getQueryParam(req.url, 'a');
    const b = getQueryParam(req.url, 'b');
    if (a === undefined || b === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const numA = validateNumber(a);
    const numB = validateNumber(b);
    if (numA === null || numA === undefined || numB === null || numB === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const result = subtract(numA, numB);
    res.set('Content-Type', 'application/json');
    res.send({ result });
  } catch (error) {
    res.set('Content-Type', 'application/json');
    res.status(400).send({ error: error.message });
  }
});

app.get('/multiply', (req, res) => {
  try {
    const a = getQueryParam(req.url, 'a');
    const b = getQueryParam(req.url, 'b');
    if (a === undefined || b === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const numA = validateNumber(a);
    const numB = validateNumber(b);
    if (numA === null || numA === undefined || numB === null || numB === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const result = multiply(numA, numB);
    res.set('Content-Type', 'application/json');
    res.send({ result });
  } catch (error) {
    res.set('Content-Type', 'application/json');
    res.status(400).send({ error: error.message });
  }
});

app.get('/divide', (req, res) => {
  try {
    const a = getQueryParam(req.url, 'a');
    const b = getQueryParam(req.url, 'b');
    if (a === undefined || b === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const numA = validateNumber(a);
    const numB = validateNumber(b);
    if (numA === null || numA === undefined || numB === null || numB === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const result = divide(numA, numB);
    res.set('Content-Type', 'application/json');
    res.send({ result });
  } catch (error) {
    res.set('Content-Type', 'application/json');
    res.status(400).send({ error: error.message });
  }
});

app.get('/pow', (req, res) => {
  try {
    const a = getQueryParam(req.url, 'a');
    const b = getQueryParam(req.url, 'b');
    if (a === undefined || b === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const numA = validateNumber(a);
    const numB = validateNumber(b);
    if (numA === null || numA === undefined || numB === null || numB === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const result = pow(numA, numB);
    res.set('Content-Type', 'application/json');
    res.send({ result });
  } catch (error) {
    res.set('Content-Type', 'application/json');
    res.status(400).send({ error: error.message });
  }
});

app.get('/factorial', (req, res) => {
  try {
    const n = getQueryParam(req.url, 'n');
    if (n === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const numN = validateNumber(n);
    if (numN === null || numN === undefined) {
      throw new Error('Invalid input: missing query parameter');
    }
    const result = factorial(numN);
    res.set('Content-Type', 'application/json');
    res.send({ result });
  } catch (error) {
    res.set('Content-Type', 'application/json');
    res.status(400).send({ error: error.message });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export { app, PORT };