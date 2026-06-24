import http from 'http';
import { app, PORT } from './server.js';

/** Create the HTTP server using the Express app */
const server = http.createServer(app);

/** Helper to perform a GET request and return parsed response */
function request(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const contentType = res.headers['content-type'];
        let parsed;
        if (contentType && contentType.includes('application/json')) {
          try {
            parsed = JSON.parse(data);
          } catch {
            parsed = data;
          }
        } else {
          parsed = data;
        }
        resolve({ statusCode: res.statusCode, body: parsed });
      });
    });
    req.on('error', (err) => reject(err));
  });
}

/** Define all integration test cases */
const testCases = [
  {
    name: 'Root endpoint returns Hello World',
    url: `http://localhost:${PORT}/`,
    expectedStatus: 200,
    expectedBody: 'Hello World!',
  },
  {
    name: 'Add endpoint works',
    url: `http://localhost:${PORT}/add?a=5&b=3`,
    expectedStatus: 200,
    expectedBody: { result: 8 },
  },
  {
    name: 'Subtract endpoint works',
    url: `http://localhost:${PORT}/subtract?a=10&b=4`,
    expectedStatus: 200,
    expectedBody: { result: 6 },
  },
  {
    name: 'Multiply endpoint works',
    url: `http://localhost:${PORT}/multiply?a=7&b=6`,
    expectedStatus: 200,
    expectedBody: { result: 42 },
  },
  {
    name: 'Divide endpoint works',
    url: `http://localhost:${PORT}/divide?a=20&b=4`,
    expectedStatus: 200,
    expectedBody: { result: 5 },
  },
  {
    name: 'Divide by zero returns error',
    url: `http://localhost:${PORT}/divide?a=5&b=0`,
    expectedStatus: 400,
    expectedBody: { error: 'Division by zero is not allowed' },
  },
  {
    name: 'Power endpoint works',
    url: `http://localhost:${PORT}/pow?a=2&b=8`,
    expectedStatus: 200,
    expectedBody: { result: 256 },
  },
  {
    name: 'Factorial endpoint works',
    url: `http://localhost:${PORT}/factorial?n=7`,
    expectedStatus: 200,
    expectedBody: { result: 5040 },
  },
  {
    name: 'Invalid query parameters return error',
    url: `http://localhost:${PORT}/add?a=abc&b=2`,
    expectedStatus: 400,
    expectedBody: (body) => typeof body.error === 'string' && body.error.includes('Invalid'),
  },
  {
    name: 'Missing query param returns error',
    url: `http://localhost:${PORT}/add?a=2`,
    expectedStatus: 400,
    expectedBody: (body) => typeof body.error === 'string' && body.error.includes('Invalid'),
  },
  {
    name: 'Subtract endpoint with invalid second parameter returns error',
    url: `http://localhost:${PORT}/subtract?a=10&b=abc`,
    expectedStatus: 400,
    expectedBody: (body) => typeof body.error === 'string' && body.error.includes('Invalid'),
  },
  {
    name: 'Multiply endpoint with invalid second parameter returns error',
    url: `http://localhost:${PORT}/multiply?a=7&b=xyz`,
    expectedStatus: 400,
    expectedBody: (body) => typeof body.error === 'string' && body.error.includes('Invalid'),
  },
  {
    name: 'Divide endpoint with invalid second parameter returns error',
    url: `http://localhost:${PORT}/divide?a=20&b=abc`,
    expectedStatus: 400,
    expectedBody: (body) => typeof body.error === 'string' && body.error.includes('Invalid'),
  },
  {
    name: 'Power endpoint with invalid second parameter returns error',
    url: `http://localhost:${PORT}/pow?a=2&b=abc`,
    expectedStatus: 400,
    expectedBody: (body) => typeof body.error === 'string' && body.error.includes('Invalid'),
  },
  {
    name: 'Factorial endpoint with invalid parameter returns error',
    url: `http://localhost:${PORT}/factorial?n=abc`,
    expectedStatus: 400,
    expectedBody: (body) => typeof body.error === 'string' && body.error.includes('Invalid'),
  },
  {
    name: 'Factorial endpoint with negative number returns error',
    url: `http://localhost:${PORT}/factorial?n=-3`,
    expectedStatus: 400,
    expectedBody: (body) => typeof body.error === 'string' && body.error.includes('Factorial is not defined'),
  },
  {
    name: 'Power endpoint with negative exponent works',
    url: `http://localhost:${PORT}/pow?a=2&b=-2`,
    expectedStatus: 200,
    expectedBody: { result: 0.25 },
  },
  {
    name: 'Subtract with negative result works',
    url: `http://localhost:${PORT}/subtract?a=5&b=10`,
    expectedStatus: 200,
    expectedBody: { result: -5 },
  },
  {
    name: 'Multiply with negative numbers works',
    url: `http://localhost:${PORT}/multiply?a=-3&b=4`,
    expectedStatus: 200,
    expectedBody: { result: -12 },
  },
  {
    name: 'Divide with negative numbers works',
    url: `http://localhost:${PORT}/divide?a=-10&b=2`,
    expectedStatus: 200,
    expectedBody: { result: -5 },
  },
  {
    name: 'Divide with negative denominator works',
    url: `http://localhost:${PORT}/divide?a=10&b=-2`,
    expectedStatus: 200,
    expectedBody: { result: -5 },
  },
];

/** Run all integration tests */
(async () => {
  server.listen(PORT, async () => {
    console.log(`Integration test server listening on port ${PORT}`);
    const results = [];
    for (const tc of testCases) {
      let passed = false;
      let errorMsg = null;
      try {
        const { statusCode, body } = await request(tc.url);
        if (typeof tc.expectedBody === 'function') {
          passed = statusCode === tc.expectedStatus && tc.expectedBody(body);
          if (!passed) {
            errorMsg = `Status ${statusCode}, body ${JSON.stringify(body)} did not satisfy predicate`;
          }
        } else {
          const match = statusCode === tc.expectedStatus && JSON.stringify(body) === JSON.stringify(tc.expectedBody);
          passed = match;
          if (!passed) {
            errorMsg = `Expected status ${tc.expectedStatus} with body ${JSON.stringify(tc.expectedBody)}, got status ${statusCode} with body ${JSON.stringify(body)}`;
          }
        }
        results.push({ ...tc, passed, body });
      } catch (err) {
        errorMsg = err.message;
        results.push({ ...tc, passed: false, error: errorMsg });
      }
    }
    server.close(() => {
      console.log('\n=== Integration Test Summary ===');
      for (const r of results) {
        const status = r.passed ? 'PASS' : 'FAIL';
        console.log(`${status}: ${r.name}`);
        if (!r.passed) {
          console.log(`  Reason: ${r.error || `Expected ${JSON.stringify(r.expectedStatus)}/${JSON.stringify(r.expectedBody)}`}`);
          console.log(`  Got: ${JSON.stringify(r.body) || r.error}`);
        }
      }
      const allPassed = results.every(r => r.passed);
      if (allPassed) {
        console.log('\nAll integration tests passed!');
        process.exit(0);
      } else {
        console.log('\nSome integration tests failed!');
        process.exit(1);
      }
    });
  });
})().catch((err) => {
  console.error('Integration test runner error:', err);
  process.exit(1);
});