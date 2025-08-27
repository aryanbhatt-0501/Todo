import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient(await cookies());

  // Fetch all tasks including the assigned user's info
  const { data, error } = await supabase.from("tasks").select(`
    id,
    title,
    assigned_to,
    profiles!assigned_to (
      id,
      full_name,
      email
    )
  `);

  if (error) {
    console.error("GET /api/tasks error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = createClient(await cookies());
  const body = await req.json();
  const { title, priority, description, status, assigned_to } = body;

  // Insert new task with assignee
  const { data: taskData, error: taskError } = await supabase
    .from("tasks")
    .insert([{ title, priority, description, status, assigned_to }])
    .select()
    .single();

  if (taskError) {
    console.error("POST /api/tasks error inserting task:", taskError);
    return NextResponse.json({ error: taskError.message }, { status: 500 });
  }
  return NextResponse.json(taskData);
}
