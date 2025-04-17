import NavLinks from "@/lib/nav-links";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex flex-col h-full justify-between items-stretch p-4 bg-orange-600">
      <div className="flex items-center justify-between h-1/5">
        <h1>Todo</h1>
      </div>
      <div className="flex h-4/5 flex-col items-center gap-8 mt-10">
        <NavLinks />
      </div>
    </div>
  );
}
