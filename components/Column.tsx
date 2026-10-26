"use client";

import { useDroppable } from "@dnd-kit/core";
import { Task, Status } from "@/types";
import TaskCard from "@/components/TaskCard";

interface ColumnProps {
  status: Status;
  title: string;
  tasks: Task[];
  searching?: boolean;
}

export default function Column({ status, title, tasks, searching }: ColumnProps) {
  const headingId = `column-${status}`;
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <section
      ref={setNodeRef}
      aria-labelledby={headingId}
      className={`min-h-32 rounded-xl border bg-navy-900 p-4 transition-colors ${
        isOver ? "border-cyan-400" : "border-navy-700"
      }`}
    >
      <h2
  id={headingId}
  tabIndex={-1}
  className="text-lg font-semibold text-cyan-400 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400"
>
  {title}
  <span className="ml-2 rounded-full bg-navy-800 px-2 py-0.5 text-sm font-normal text-slate-300">
    {tasks.length}
  </span>
</h2>
      {tasks.length === 0 ? (
  <p className="mt-3 text-sm text-slate-400">
  {searching ? "No matching tasks." : "No tasks here yet."}
</p>
) : (
  <ul className="mt-3 space-y-2">
    {tasks.map((task) => (
      <TaskCard key={task.id} task={task} />
    ))}
  </ul>
)}
    </section>
  );
}
