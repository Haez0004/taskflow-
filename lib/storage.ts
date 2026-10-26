import type { Task } from "@/types";

export const STORAGE_KEY = "taskflow-tasks";

const STATUSES = ["todo", "doing", "done"];

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) return false;
  const t = value as Record<string, unknown>;
  return (
    typeof t.id === "string" &&
    typeof t.title === "string" &&
    typeof t.status === "string" &&
    STATUSES.includes(t.status)
  );
}

export function saveTasks(tasks: Task[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage can be full or blocked (private mode). Ignore it.
  }
}

export function loadTasks(): Task[] | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.every(isTask) ? parsed : null;
  } catch {
    return null;
  }
}
