import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { AppRouter } from './AppRouter';
import { port } from './config';
import { ModelRepo } from './repos/ModelRepo';
import { CustomError, ErrorNames } from './errors';
import { sessionConfig } from './config';

import './controllers';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(AppRouter.getInstance());

const repo = new ModelRepo();

repo
  .query(`SELECT 1 + 1;`)
  .then(() => {
    console.log('Connected to database');

    app.listen(port, () => {
      console.log(`Server running on port : ${port}`);
    });
  })
  .catch(err => {
    throw new CustomError(err.message, ErrorNames.databaseError);
  });
