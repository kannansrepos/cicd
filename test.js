import express from 'express';
import { createServer, get } from 'http';

app.get('/', (req, res) =>
{
  res.send('Hello World!');
});

const server = createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
{
  console.log(`Server is running on port ${PORT}`);

  get(`http://localhost:${PORT}`, (res) =>
  {
    console.log(`GET request to / returned status code: ${res.statusCode}`);
    if (res.statusCode === 200)
    {
      console.log('Test passed: Server responded with 200 OK');
      server.close(() =>
      {
        console.log('Server closed after test');
      });
      process.exit(0); // Exit with success
    } else
    {
      console.error('Test failed: Server did not respond with 200 OK');
      server.close(() =>
      {
        console.log('Server closed after test');
      });
      process.exit(1); // Exit with failure
    }
  }).on('error', (err) =>
  {
    console.error('Test failed: Error making GET request to /', err);
    server.close(() =>
    {
      console.log('Server closed after test');
    });
    process.exit(1); // Exit with failure
  });
});