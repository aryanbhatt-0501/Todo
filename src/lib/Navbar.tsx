import NavLinks from '@/lib/nav-links';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <div className="flex flex-col h-full justify-between items-stretch p-4 bg-orange-600">
                <Image src="/Todo.png" alt="Logo" width={80} height={100} />
            <div className="flex h-4/5 flex-col items-center gap-8 mt-10">
                <NavLinks />
            </div>
        </div>
    );
};