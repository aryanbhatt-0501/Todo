// This file sets up a connection to a PostgreSQL database using the pg library.
// It defines two API routes: one for retrieving all teammates and another for adding a new teammate.
// The GET route fetches all records from the 'teammates' table and returns them as JSON.
// The POST route inserts a new teammate into the 'teammates' table with the provided name, email, and designation.
// It returns the newly created teammate record as JSON.
// Import necessary modules
import { NextResponse, NextRequest } from 'next/server';
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