import 'dotenv/config';
import postgres from '@prisma-next/postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

const databaseUrl = process.env['DATABASE_URL'];

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not configured. Copy .env.example to .env and adjust it for your local database.');
}

export const db = postgres<Contract>({
  contractJson,
  url: databaseUrl
});

let connection: Promise<unknown> | undefined;

export async function connectDb(): Promise<void> {
  connection ??= db.connect().catch((error) => {
    connection = undefined;
    throw error;
  });

  await connection;
}
