import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// GET single teammate
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient(cookies());
  const id = (await params).id;

  const { data, error } = await supabase
    .from("teammates")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("GET /api/teammates/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};

// UPDATE teammate
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient(cookies());
  const id = (await params).id;
  const { email, designation } = await req.json();

  const { error } = await supabase
    .from("teammates")
    .update({ email, designation })
    .eq("id", id);

  if (error) {
    console.error("PATCH /api/teammates/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Teammate updated" });
};

// DELETE teammate
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient(cookies());
  const id = (await params).id;

  const { error } = await supabase
    .from("teammates")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE /api/teammates/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Teammate deleted" });
};