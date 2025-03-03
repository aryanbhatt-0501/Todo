import NavLinks from '@/lib/nav-links';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <div className="flex flex-col h-full justify-between items-stretch px-4 bg-orange-600">
            {/* <div className="flex h-1/5 items-center bg-red-100 radius-2 m-2"> */}
                <Image src="/Todo.png" alt="Logo" width={80} height={100} />
                {/* <Link href='/'><h1 className="text-2xl font-bold">Logo</h1></Link> */}
            {/* </div> */}
            <div className="flex h-4/5 flex-col items-center gap-8 mt-10">
                <NavLinks />
            </div>
        </div>
    );
};