import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient(cookies());
  const id = (await params).id;
  const body = await req.json();
  const { title, priority, content, status, assigneeid } = body;

  const { data, error } = await supabase
    .from("tasks")
    .update({
      title,
      priority,
      content,
      status,
      assigneeid,
    })
    .eq("id", id)
    .select()
    .single(); // Return the updated row

  if (error) {
    console.error("PATCH /api/tasks/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};