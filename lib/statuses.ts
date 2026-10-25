import { Status } from "@/types";

export const COLUMNS: { status: Status; title: string }[] = [
  { status: "todo", title: "To do" },
  { status: "doing", title: "Doing" },
  { status: "done", title: "Done" },
];

export const STATUS_LABELS: Record<Status, string> = {
  todo: "To do",
  doing: "Doing",
  done: "Done",
};
