import express from 'express';
import { createServer } from 'http';

const app = express();

app.get('/', (req, res) =>
{
  res.send('Hello World!');
});

const server = createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
{
  console.log(`Server is running on port ${PORT}`);
});
