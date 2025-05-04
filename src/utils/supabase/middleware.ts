import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Create Supabase client using the request and response
  const supabase = createMiddlewareClient({ req, res });

  // Ensure the session is loaded and cookies are set
  await supabase.auth.getSession();

  return res;
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
