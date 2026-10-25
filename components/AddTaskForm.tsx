"use client";

import { useState, type FormEvent } from "react";
import { useTasks } from "@/components/TaskProvider";

export default function AddTaskForm() {
  const { dispatch } = useTasks();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }
    dispatch({ type: "ADD", id: crypto.randomUUID(), title });
    setTitle("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6" noValidate>
      <label htmlFor="task-title" className="block font-medium">
        New task
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id="task-title"
          type="text"
          value={title}
          maxLength={100}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "task-title-error" : undefined}
          className="flex-1 rounded-lg border border-navy-700 bg-navy-800 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400"
          placeholder="e.g. Write the README"
        />
        <button
          type="submit"
          className="rounded-lg bg-cyan-400 px-5 py-2 font-semibold text-navy-950 hover:bg-cyan-300 focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          Add task
        </button>
      </div>
      {error && (
        <p id="task-title-error" role="alert" className="mt-2 text-red-300">
          {error}
        </p>
      )}
    </form>
  );
}
