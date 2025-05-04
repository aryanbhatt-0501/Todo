'use server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const supabase = createClient(await cookies());
  await supabase.auth.signOut();
  redirect('/login');
}
