import { Pool, PoolConfig } from 'pg';

const databaseConfig: PoolConfig = {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
};

export default new Pool(databaseConfig);
