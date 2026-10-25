import { Task } from "@/types";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <li className="rounded-lg border border-navy-700 bg-navy-800 p-3">
      {task.title}
    </li>
  );
}
