
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <ul>
      {todos?.map((todo: any) => (
        <li>{todo}</li>
      ))}
    </ul>
  )
}
