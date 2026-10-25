import Board from "@/components/Board";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-cyan-400">TaskFlow</h1>
      <Board />
    </main>
  );
}
