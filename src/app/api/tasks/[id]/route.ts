import { NextResponse, NextRequest } from "next/server";
import pool from '@/lib/db';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const body = await req.json();
    const { title, priority, content, status, assigneeid } = body;
    const result = await pool.query(
        'UPDATE tasks SET title = $1, priority = $2, content = $3, status = $4, assigneeid = $5 WHERE id = $6 RETURNING *',
        [title, priority, content, status, assigneeid, id]
    );
    return NextResponse.json(result.rows[0]);
};