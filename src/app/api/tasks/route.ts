import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, priority, content, status, assigneeid(id)");

  if (error) {
    console.error("GET /api/tasks error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  };

  return NextResponse.json(data);
};

export async function POST(req: Request) {
  const supabase = createClient(cookies());
  const body = await req.json();
  const { title, priority, content, status, assigneeid } = body;

  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title, priority, content, status, assigneeid }])
    .select()
    .single();

  if (error) {
    console.error("POST /api/tasks error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};