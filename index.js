import express from 'express';
import { add, subtract, multiply, divide, modulo, power } from './mathHelpers.js';

export const app = express();

app.use(express.json());

const sendResult = (res, value) => {
  res.json({ result: value });
};

const sendError = (res, error) => {
  console.error(error);
  res.status(400).json({ error: error.message });
};

app.get('/add', (req, res) => {
  try {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Invalid input: a and b must be numbers');
    }
    const result = add(a, b);
    sendResult(res, result);
  } catch (e) {
    sendError(res, e);
  }
});

app.get('/subtract', (req, res) => {
  try {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Invalid input: a and b must be numbers');
    }
    const result = subtract(a, b);
    sendResult(res, result);
  } catch (e) {
    sendError(res, e);
  }
});

app.get('/multiply', (req, res) => {
  try {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Invalid input: a and b must be numbers');
    }
    const result = multiply(a, b);
    sendResult(res, result);
  } catch (e) {
    sendError(res, e);
  }
});

app.get('/divide', (req, res) => {
  try {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Invalid input: a and b must be numbers');
    }
    const result = divide(a, b);
    sendResult(res, result);
  } catch (e) {
    sendError(res, e);
  }
});

app.get('/modulo', (req, res) => {
  try {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Invalid input: a and b must be numbers');
    }
    const result = modulo(a, b);
    sendResult(res, result);
  } catch (e) {
    sendError(res, e);
  }
});

app.get('/power', (req, res) => {
  try {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Invalid input: a and b must be numbers');
    }
    const result = power(a, b);
    sendResult(res, result);
  } catch (e) {
    sendError(res, e);
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});