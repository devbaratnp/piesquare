import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from 'mysql2/promise';

let pool: Pool | null = null;

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super('The MySQL database is not configured. Add DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, and SESSION_SECRET.');
    this.name = 'DatabaseNotConfiguredError';
  }
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER && process.env.SESSION_SECRET);
}

export function getPool() {
  if (!isDatabaseConfigured()) return null;
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      charset: 'utf8mb4',
      connectionLimit: 5,
      waitForConnections: true,
      enableKeepAlive: true,
    });
  }
  return pool;
}

export async function queryRows<T extends RowDataPacket>(sql: string, params: unknown[] = []) {
  const database = getPool();
  if (!database) throw new DatabaseNotConfiguredError();
  const [rows] = await database.execute<RowDataPacket[]>(sql, params as never[]);
  return rows as T[];
}

export async function execute(sql: string, params: unknown[] = []) {
  const database = getPool();
  if (!database) throw new DatabaseNotConfiguredError();
  const [result] = await database.execute<ResultSetHeader>(sql, params as never[]);
  return result;
}
