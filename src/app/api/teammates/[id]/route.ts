import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// GET single teammate (optional, if needed)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const teammate = await db.query("SELECT * FROM teammates WHERE id = $1", [id]);
  return NextResponse.json(teammate.rows[0]);
}

// UPDATE teammate
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { email, designation } = await req.json();
  
  await db.query(
    "UPDATE teammates SET email = $1, designation = $2 WHERE id = $3",
    [ email, designation, id]
  );

  return NextResponse.json({ message: "Teammate updated" });
}

// DELETE teammate
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await db.query("DELETE FROM teammates WHERE id = $1", [id]);
  return NextResponse.json({ message: "Teammate deleted" });
}
