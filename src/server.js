import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

const PORT = Number(env('PORT', '3000'));

const startServer = () => {
  const logger = pino({ transport: { target: 'pino-pretty' } });

  const app = express();
  app.use(express.json());
  app.use(logger);
  app.use(cors());
  app.use(router);
  app.use('*', notFoundHandler);
  app.use(errorHandler);
  app.use(cookieParser());
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default startServer;
