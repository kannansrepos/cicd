import { test, expect } from '@playwright/test';

test('root endpoint', async ({ request }) => {
  const response = await request.get('http://localhost:5000/');
  expect(response.status()).toBe(200);
  expect(await response.text()).toBe('Hello World!');
});

test('add endpoint', async ({ request }) => {
  const response = await request.get('http://localhost:5000/add?a=5&b=3');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ result: 8 });
});

test('subtract endpoint', async ({ request }) => {
  const response = await request.get('http://localhost:5000/subtract?a=10&b=4');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ result: 6 });
});

test('multiply endpoint', async ({ request }) => {
  const response = await request.get('http://localhost:5000/multiply?a=7&b=6');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ result: 42 });
});

test('power endpoint', async ({ request }) => {
  const response = await request.get('http://localhost:5000/pow?a=2&b=8');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ result: 256 });
});

test('factorial endpoint', async ({ request }) => {
  const response = await request.get('http://localhost:5000/factorial?n=7');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ result: 5040 });
});

test('divide by zero error', async ({ request }) => {
  const response = await request.get('http://localhost:5000/divide?a=5&b=0');
  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body).toHaveProperty('error');
  expect(body.error).toContain('Division by zero');
});

test('invalid query param returns error', async ({ request }) => {
  const response = await request.get('http://localhost:5000/add?a=abc&b=2');
  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body).toHaveProperty('error');
});

test('invalid second query param returns error', async ({ request }) => {
  const response = await request.get('http://localhost:5000/add?a=5&b=abc');
  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body).toHaveProperty('error');
});

test('invalid factorial param returns error', async ({ request }) => {
  const response = await request.get('http://localhost:5000/factorial?n=abc');
  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body).toHaveProperty('error');
});

test('negative factorial returns error', async ({ request }) => {
  const response = await request.get('http://localhost:5000/factorial?n=-5');
  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.error).toContain('Factorial is not defined');
});

test('power negative exponent works', async ({ request }) => {
  const response = await request.get('http://localhost:5000/pow?a=2&b=-2');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ result: 0.25 });
});

test('multiply negative numbers works', async ({ request }) => {
  const response = await request.get('http://localhost:5000/multiply?a=-3&b=4');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ result: -12 });
});

test('subtract negative numbers works', async ({ request }) => {
  const response = await request.get('http://localhost:5000/subtract?a=5&b=10');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ result: -5 });
});

test('divide negative numbers works', async ({ request }) => {
  const response = await request.get('http://localhost:5000/divide?a=-10&b=2');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ result: -5 });
});

test('divide by negative denominator works', async ({ request }) => {
  const response = await request.get('http://localhost:5000/divide?a=10&b=-2');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ result: -5 });
});