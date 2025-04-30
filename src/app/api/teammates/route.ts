import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("teammates")
    .select("*");

  if (error) {
    console.error("GET /api/teammates error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = createClient(cookies());
  const body = await req.json();
  const { name, email, designation } = body;

  const { data, error } = await supabase
    .from("teammates")
    .insert([{ name, email, designation }])
    .select()
    .single(); // for returning a single inserted row

  if (error) {
    console.error("POST /api/teammates error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
