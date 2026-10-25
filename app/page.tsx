import TaskDebug from "@/components/TaskDebug";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-cyan-400">TaskFlow</h1>
      <TaskDebug />
    </main>
  );
}
