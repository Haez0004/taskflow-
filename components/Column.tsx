import { Task, Status } from "@/types";
import TaskCard from "@/components/TaskCard";

interface ColumnProps {
  status: Status;
  title: string;
  tasks: Task[];
}

export default function Column({ status, title, tasks }: ColumnProps) {
  const headingId = `column-${status}`;
  return (
    <section
      aria-labelledby={headingId}
      className="rounded-xl border border-navy-700 bg-navy-900 p-4"
    >
      <h2 id={headingId} className="text-lg font-semibold text-cyan-400">
        {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
}
