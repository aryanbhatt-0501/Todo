'use client';
import NavLinks from "@/lib/nav-links";
import type { User } from "@supabase/supabase-js";
import { logout } from "@/app/actions/logout";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
     // Initial fetch
     supabase.auth.getUser().then(({ data }) => setUser(data.user));

     // Listen for auth changes
     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
       setUser(session?.user ?? null);
     });
 
     // Cleanup listener on unmount
     return () => {
       listener.subscription.unsubscribe();
     };
  }, [supabase.auth]);
  
  return (
    <div className="flex flex-col h-full w-[12%] justify-between items-stretch p-4 bg-black text-white fontweight-bold">
      <div className="flex items-center justify-center h-2/5">
        <h1>Todo</h1>
      </div>
      {user ? (
        <div className="flex h-3/5 flex-col items-center gap-8">
          <NavLinks />
          <form
            action={() => {
              startTransition(() => logout());
            }}
          >
            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Logging out..." : "Logout"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex h-3/5 flex-col items-center gap-8">
          <p className="text-sm">Please log in.</p>
        </div>
      )}
    </div>
  );
}
