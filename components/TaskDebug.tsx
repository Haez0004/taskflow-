"use client";

import { useTasks } from "@/components/TaskProvider";

export default function TaskDebug() {
  const { tasks, dispatch } = useTasks();
  return (
    <div className="mt-4 rounded-lg border border-navy-700 bg-navy-800 p-4">
      <p>{tasks.length} tasks</p>
      <ul className="mt-2 list-disc pl-5">
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} ({t.status})
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() =>
          dispatch({ type: "ADD", id: crypto.randomUUID(), title: "New task" })
        }
        className="mt-4 rounded bg-cyan-400 px-4 py-2 font-semibold text-navy-950 hover:bg-cyan-300"
      >
        Add test task
      </button>
    </div>
  );
}
