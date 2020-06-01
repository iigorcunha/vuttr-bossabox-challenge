import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';

import routes from './routes';
import '@shared/container';

import '../typeorm';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log('listen on port 3000');
});
