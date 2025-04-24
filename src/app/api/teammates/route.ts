import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const result = await pool.query('SELECT * FROM teammates');
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, designation } = body;

  const result = await pool.query(
    'INSERT INTO teammates (name, email, designation) VALUES ($1, $2, $3) RETURNING *',
    [name, email, designation]
  );

  return NextResponse.json(result.rows[0]);
};