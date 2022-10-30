import 'dotenv/config';
import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.DB_USER,
  host:
    process.env.NODE_ENV === 'development'
      ? process.env.DB_HOST_DEV
      : process.env.DB_HOST_PROD,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
});
