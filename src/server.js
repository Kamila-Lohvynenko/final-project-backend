import 'dotenv/config';

import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { notFoundMiddleware } from './middlewares/notFoundHandler.js';
import { errorMiddleware } from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cookieParser());

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello!');
  });

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  const PORT = parseInt(process.env.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}!`);
  });
};
