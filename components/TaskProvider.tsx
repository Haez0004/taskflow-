"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { Task } from "@/types";
import { taskReducer, type Action } from "@/lib/taskReducer";

interface TaskContextValue {
  tasks: Task[];
  dispatch: Dispatch<Action>;
}

const TaskContext = createContext<TaskContextValue | null>(null);

const initialTasks: Task[] = [
  { id: "seed-1", title: "Plan the board", status: "todo" },
  { id: "seed-2", title: "Build the reducer", status: "done" },
];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside <TaskProvider>");
  return ctx;
}
