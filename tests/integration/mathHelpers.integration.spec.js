import request from 'supertest';
import { app } from '../index.js';

describe('Math API Integration', () => {
  describe('GET /add', () => {
    test('returns sum of two numbers', async () => {
      const res = await request(app).get('/add?a=5&b=3');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 8 });
    });
    test('returns sum with negative numbers', async () => {
      const res = await request(app).get('/add?a=-4&b=6');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 2 });
    });
    test('returns error for non-numeric a', async () => {
      const res = await request(app).get('/add?a=abc&b=3');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
    test('returns error for non-numeric b', async () => {
      const res = await request(app).get('/add?a=5&b=xyz');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /subtract', () => {
    test('returns difference', async () => {
      const res = await request(app).get('/subtract?a=10&b=4');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 6 });
    });
    test('throws error for non-number a', async () => {
      const res = await request(app).get('/subtract?a=foo&b=4');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /multiply', () => {
    test('returns product', async () => {
      const res = await request(app).get('/multiply?a=7&b=6');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 42 });
    });
    test('returns zero when one operand zero', async () => {
      const res = await request(app).get('/multiply?a=5&b=0');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 0 });
    });
    test('throws error for non-number b', async () => {
      const res = await request(app).get('/multiply?a=3&b=bar');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /divide', () => {
    test('returns quotient', async () => {
      const res = await request(app).get('/divide?a=15&b=3');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 5 });
    });
    test('returns fractional quotient', async () => {
      const res = await request(app).get('/divide?a=10&b=4');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 2.5 });
    });
    test('throws error for division by zero', async () => {
      const res = await request(app).get('/divide?a=5&b=0');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
    test('throws error for non-number a', async () => {
      const res = await request(app).get('/divide?a=abc&b=2');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /modulo', () => {
    test('returns remainder', async () => {
      const res = await request(app).get('/modulo?a=10&b=3');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 1 });
    });
    test('returns remainder zero', async () => {
      const res = await request(app).get('/modulo?a=12&b=4');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 0 });
    });
    test('throws error for divisor zero', async () => {
      const res = await request(app).get('/modulo?a=5&b=0');
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
    test('throws error for non-number b', async () => {
      const res = await request(app).get('/modulo?a=5&b=xyz');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /power', () => {
    test('returns power result', async () => {
      const res = await request(app).get('/power?a=3&b=4');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 81 });
    });
    test('returns power with zero exponent', async () => {
      const res = await request(app).get('/power?a=9&b=0');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 1 });
    });
    test('returns power with negative exponent', async () => {
      const res = await request(app).get('/power?a=2&b=-2');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ result: 0.25 });
    });
    test('throws error for non-number a', async () => {
      const res = await request(app).get('/power?a=abc&b=2');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /health', () => {
    test('returns health status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('OK');
    });
  });
});