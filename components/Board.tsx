"use client";

import { useTasks } from "@/components/TaskProvider";
import Column from "@/components/Column";
import { COLUMNS } from "@/lib/statuses";

export default function Board() {
  const { tasks } = useTasks();
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {COLUMNS.map((col) => (
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
