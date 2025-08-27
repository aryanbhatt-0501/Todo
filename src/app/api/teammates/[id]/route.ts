import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// GET single membership by id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient(await cookies());
  const id = (await params).id;

  const { data, error } = await supabase
    .from("memberships")
    .select(
      `
      id,
      team_id,
      user_id,
      role,
      profiles!user_id (
        id,
        full_name,
        email
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("GET /api/memberships/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// UPDATE membership role
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient(await cookies());
  const id = (await params).id;
  const { role } = await req.json();

  if (!["master", "subuser", "member"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const { error } = await supabase
    .from("memberships")
    .update({ role })
    .eq("id", id);

  if (error) {
    console.error("PATCH /api/memberships/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Membership updated" });
}

// DELETE membership record
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient(await cookies());
  const id = (await params).id;

  const { error } = await supabase.from("memberships").delete().eq("id", id);

  if (error) {
    console.error("DELETE /api/memberships/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Membership deleted" });
}
