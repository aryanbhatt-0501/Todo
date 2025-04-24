import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    const result = await pool.query('SELECT tasks.id, tasks.title, tasks.priority, tasks.content, tasks.status, teammates.name, teammates.email FROM tasks INNER JOIN teammates ON tasks.assigneeid = teammates.id');
    return NextResponse.json(result.rows);
};

export async function POST(req: Request) {
    const body = await req.json();
    const { title, priority, content, status } = body;
    const assigneeid = Number(body.assigneeid);
    const result = await pool.query(
        'INSERT INTO tasks (title, priority, content, status, assigneeid) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, priority, content, status, assigneeid]
    );
    return NextResponse.json(result.rows[0]);
};