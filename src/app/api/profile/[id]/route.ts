import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient(await cookies());
  const id = (await params).id;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", id)
    .single();

  if (error) {
    console.error("GET /api/profiles/[id] error fetching profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
