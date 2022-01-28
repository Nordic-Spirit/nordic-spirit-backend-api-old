import session, { SessionOptions } from 'express-session';
import connect from 'connect-pg-simple';
import pgPool from './pool';
import { sessionSecret } from './';

const pgSession = connect(session);

export const sessionConfig: SessionOptions = {
  store: new pgSession({
    pool: pgPool,
    tableName: 'sessions'
  }),
  saveUninitialized: true,
  secret: sessionSecret,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2 // 2 hours
  }
};
