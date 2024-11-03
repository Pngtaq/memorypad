import Button from "@/components/button";

export default function Navigation() {
  return (
    <nav className="flex justify-between font-roboto-mono bg-yellow-300 px-6 py-4 text-center">
      <Button type="nav" url="/">
        MemoryPad
      </Button>
    </nav>
  );
}
