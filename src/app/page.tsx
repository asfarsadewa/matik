import Image from "next/image";
import FractalTree from '@/components/fractal-tree';

export default function Home() {
  return (
    <main className="relative h-screen w-full">
      <FractalTree />
    </main>
  );
}
