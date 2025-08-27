import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// PATCH update a task by id (single assignee)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient(await cookies());
  const id = (await params).id;
  const body = await req.json();
  // Only support one assignee, not multiple
  const { title, priority, content, status, assigned_to } = body;

  // Update the task details, including assignee (assigned_to)
  const { data: taskData, error: taskError } = await supabase
    .from("tasks")
    .update({
      title,
      priority,
      content,
      status,
      assigned_to: assigned_to || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(
      `
  *,
  profiles!assigned_to (
    id,
    full_name,
    email
  )
`
    )

    .single();

  if (taskError) {
    console.error("PATCH /api/tasks/[id] error updating task:", taskError);
    return NextResponse.json({ error: taskError.message }, { status: 500 });
  }

  return NextResponse.json(taskData);
}
