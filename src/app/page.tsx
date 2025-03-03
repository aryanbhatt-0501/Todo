import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full m-2">
      <main className="flex h-1 mx-2 flex-col gap-8 items-center justify-center w-100%">
        <Link href="/dashboard">
          <Button>Get started</Button>
        </Link>
      </main>
    </div>
  );
}
