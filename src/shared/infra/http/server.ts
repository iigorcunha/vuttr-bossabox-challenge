import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import AppError from '@shared/infra/errors/AppError';

import routes from './routes';
import '@shared/container';

import '../typeorm';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(3000, () => {
  console.log('listen on port 3000');
});
