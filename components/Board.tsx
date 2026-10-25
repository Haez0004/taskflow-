"use client";

import { useTasks } from "@/components/TaskProvider";
import Column from "@/components/Column";
import { Status } from "@/types";

const columns: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];

export default function Board() {
  const { tasks } = useTasks();
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {columns.map((col) => (
        <Column
          key={col.status}
          status={col.status}
          title={col.title}
          tasks={tasks.filter((t) => t.status === col.status)}
        />
      ))}
    </div>
  );
}
