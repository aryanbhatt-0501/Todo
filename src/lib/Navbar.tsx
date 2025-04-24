import NavLinks from "@/lib/nav-links";

export default function Navbar() {
  return (
    <div className="flex flex-col h-full justify-between items-stretch p-4 bg-black text-white fontweight-bold">
      <div className="flex items-center justify-center h-2/5">
        <h1>Todo</h1>
      </div>
      <div className="flex h-3/5 flex-col items-center gap-8">
        <NavLinks />
      </div>
    </div>
  );
}
