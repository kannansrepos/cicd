import { test, expect } from '@playwright/test';
import { app } from '../index.js';
import type { Server } from 'node:http';

let server: Server;
let serverPort: number;

test.beforeAll(async () => {
  server = app.listen(0, () => {
    const addr = server.address();
    if (typeof addr === 'object' && addr?.port) {
      serverPort = addr.port;
    }
  });
  await new Promise<void>(resolve => server.once('listening', resolve));
});

test.afterAll(async () => {
  server.close();
});

test('GET /add returns correct sum', async ({ request }) => {
  const response = await request.get(`http://localhost:${serverPort}/add?a=5&b=3`);
  expect(response.status()).toBe(200);
  expect(JSON.parse(await response.text())).toEqual({ result: 8 });
});

test('GET /subtract returns correct difference', async ({ request }) => {
  const response = await request.get(`http://localhost:${serverPort}/subtract?a=10&b=4`);
  expect(response.status()).toBe(200);
  expect(JSON.parse(await response.text())).toEqual({ result: 6 });
});

test('GET /multiply returns product', async ({ request }) => {
  const response = await request.get(`http://localhost:${serverPort}/multiply?a=7&b=6`);
  expect(response.status()).toBe(200);
  expect(JSON.parse(await response.text())).toEqual({ result: 42 });
});

test('GET /divide returns quotient', async ({ request }) => {
  const response = await request.get(`http://localhost:${serverPort}/divide?a=20&b=4`);
  expect(response.status()).toBe(200);
  expect(JSON.parse(await response.text())).toEqual({ result: 5 });
});

test('GET /divide by zero returns error', async ({ request }) => {
  const response = await request.get(`http://localhost:${serverPort}/divide?a=5&b=0`);
  expect(response.status()).toBe(400);
  const body = JSON.parse(await response.text());
  expect(body).toHaveProperty('error');
});

test('GET /modulo returns remainder', async ({ request }) => {
  const response = await request.get(`http://localhost:${serverPort}/modulo?a=10&b=3`);
  expect(response.status()).toBe(200);
  expect(JSON.parse(await response.text())).toEqual({ result: 1 });
});

test('GET /power returns result', async ({ request }) => {
  const response = await request.get(`http://localhost:${serverPort}/power?a=2&b=8`);
  expect(response.status()).toBe(200);
  expect(JSON.parse(await response.text())).toEqual({ result: 256 });
});

test('GET /health returns OK', async ({ request }) => {
  const response = await request.get(`http://localhost:${serverPort}/health`);
  expect(response.status()).toBe(200);
  expect(await response.text()).toBe('OK');
});