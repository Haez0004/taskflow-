"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";

import { Task } from "@/types";
import { taskReducer, type Action } from "@/lib/taskReducer";
import { loadTasks, saveTasks } from "@/lib/storage";

interface TaskContextValue {
  tasks: Task[];
  dispatch: Dispatch<Action>;
  loaded: boolean;
}

const TaskContext = createContext<TaskContextValue | null>(null);

const initialTasks: Task[] = [
  { id: "seed-1", title: "Plan the board", status: "todo" },
  { id: "seed-2", title: "Build the reducer", status: "done" },
];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
const [loaded, setLoaded] = useState(false);

useEffect(() => {
  const id = window.setTimeout(() => {
    const saved = loadTasks();
    if (saved) dispatch({ type: "LOAD", tasks: saved });
    setLoaded(true);
  }, 0);
  return () => window.clearTimeout(id);
}, []);

useEffect(() => {
  if (loaded) saveTasks(tasks);
}, [tasks, loaded]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch, loaded }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside <TaskProvider>");
  return ctx;
}
