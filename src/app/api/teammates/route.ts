import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient(await cookies());

  // Get current user id from Supabase session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.id;

  // Fetch all team memberships for the current user
  const { data, error } = await supabase
    .from("memberships")
    .select("team_id, role, user_id")
    .eq("user_id", userId);

  if (error) {
    console.error("GET /api/memberships error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = createClient(await cookies());
  const body = await req.json();
  const { team_id, user_id, role } = body;

  // TODO: Check if user has permission to add members to this team

  const { data, error } = await supabase
    .from("memberships")
    .insert([{ team_id, user_id, role }])
    .select()
    .single();

  if (error) {
    console.error("POST /api/memberships error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
