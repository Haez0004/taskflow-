import { Task, Status } from "@/types";

export type Action =
  | { type: "ADD"; id: string; title: string }
  | { type: "EDIT"; id: string; title: string }
  | { type: "DELETE"; id: string }
  | { type: "MOVE"; id: string; status: Status };

export function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD": {
      const title = action.title.trim();
      if (!title) return state;
      return [...state, { id: action.id, title, status: "todo" }];
    }
    case "EDIT": {
      const title = action.title.trim();
      if (!title) return state;
      return state.map((t) => (t.id === action.id ? { ...t, title } : t));
    }
    case "DELETE":
      return state.filter((t) => t.id !== action.id);
    case "MOVE":
      return state.map((t) =>
        t.id === action.id ? { ...t, status: action.status } : t
      );
  }
}
