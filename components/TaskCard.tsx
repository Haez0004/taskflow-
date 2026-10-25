"use client";

import { useState, type FormEvent } from "react";
import { Task } from "@/types";
import { useTasks } from "@/components/TaskProvider";
import { COLUMNS, STATUS_LABELS } from "@/lib/statuses";

const btn =
  "min-h-11 rounded-lg border border-navy-700 px-3 text-sm font-medium hover:bg-navy-700 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400";
const li = "rounded-lg border border-navy-700 bg-navy-800 p-3";

export default function TaskCard({ task }: { task: Task }) {
  const { dispatch } = useTasks();
  const [mode, setMode] = useState<"view" | "edit" | "confirm">("view");
  const [draft, setDraft] = useState(task.title);
  const [error, setError] = useState("");

  function cancelEdit() {
    setDraft(task.title);
    setError("");
    setMode("view");
  }

  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!draft.trim()) {
      setError("Title can't be empty.");
      return;
    }
    dispatch({ type: "EDIT", id: task.id, title: draft });
    setError("");
    setMode("view");
  }

  if (mode === "edit") {
    return (
      <li className={li}>
        <form onSubmit={save} noValidate>
          <label htmlFor={`edit-${task.id}`} className="sr-only">
            Edit task title
          </label>
          <input
            id={`edit-${task.id}`}
            value={draft}
            maxLength={100}
            autoFocus
            onChange={(e) => {
              setDraft(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Escape" && cancelEdit()}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `edit-error-${task.id}` : undefined}
            className="w-full rounded-lg border border-navy-700 bg-navy-900 px-3 py-2 text-white focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400"
          />
          {error && (
            <p id={`edit-error-${task.id}`} role="alert" className="mt-2 text-red-300">
              {error}
            </p>
          )}
          <div className="mt-2 flex gap-2">
            <button
              type="submit"
              className="min-h-11 rounded-lg bg-cyan-400 px-4 text-sm font-semibold text-navy-950 hover:bg-cyan-300 focus:outline-2 focus:outline-offset-2 focus:outline-white"
            >
              Save
            </button>
            <button type="button" onClick={cancelEdit} className={btn}>
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  if (mode === "confirm") {
    return (
      <li className={li}>
        <p>Delete &ldquo;{task.title}&rdquo;?</p>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "DELETE", id: task.id })}
            className="min-h-11 rounded-lg bg-red-300 px-4 text-sm font-semibold text-navy-950 hover:bg-red-200 focus:outline-2 focus:outline-offset-2 focus:outline-white"
          >
            Yes, delete
          </button>
          <button type="button" onClick={() => setMode("view")} className={btn}>
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={li}>
      <p className="break-words">{task.title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {COLUMNS.filter((c) => c.status !== task.status).map((c) => (
          <button
            key={c.status}
            type="button"
            onClick={() =>
              dispatch({ type: "MOVE", id: task.id, status: c.status })
            }
            aria-label={`Move to ${STATUS_LABELS[c.status]}: ${task.title}`}
            className={btn}
          >
            Move to {STATUS_LABELS[c.status]}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setMode("edit")}
          aria-label={`Edit: ${task.title}`}
          className={btn}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setMode("confirm")}
          aria-label={`Delete: ${task.title}`}
          className={`${btn} text-red-300`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
