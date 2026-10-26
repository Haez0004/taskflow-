"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
  type Announcements,
  type CollisionDetection,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { useTasks } from "@/components/TaskProvider";
import Column from "@/components/Column";
import { COLUMNS, STATUS_LABELS } from "@/lib/statuses";
import type { Status } from "@/types";

const collision: CollisionDetection = (args) => {
  const hits = pointerWithin(args);
  return hits.length > 0 ? hits : rectIntersection(args);
};

function isStatus(id: unknown): id is Status {
  return COLUMNS.some((c) => c.status === id);
}

export default function Board() {
  const { tasks, dispatch, loaded } = useTasks();

const [prevCount, setPrevCount] = useState(tasks.length);
const [message, setMessage] = useState("");
const [prevLoaded, setPrevLoaded] = useState(loaded);
if (loaded !== prevLoaded) {
  setPrevLoaded(loaded);
  setPrevCount(tasks.length);
} else if (tasks.length !== prevCount) {
  setMessage(
    `${tasks.length > prevCount ? "Task added" : "Task deleted"}. ${tasks.length} tasks total.`
  );
  setPrevCount(tasks.length);
}

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const titleOf = (id: string | number) =>
    tasks.find((t) => t.id === String(id))?.title ?? "task";
  const columnOf = (id: string | number) =>
    isStatus(id) ? STATUS_LABELS[id] : "no column";

  const announcements: Announcements = {
    onDragStart: ({ active }) => `Picked up ${titleOf(active.id)}.`,
    onDragOver: ({ active, over }) =>
      over
        ? `${titleOf(active.id)} is over ${columnOf(over.id)}.`
        : `${titleOf(active.id)} is not over a column.`,
    onDragEnd: ({ active, over }) =>
      over
        ? `${titleOf(active.id)} dropped in ${columnOf(over.id)}.`
        : `${titleOf(active.id)} dropped. No change.`,
    onDragCancel: ({ active }) =>
      `Dragging cancelled. ${titleOf(active.id)} was not moved.`,
  };

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || !isStatus(over.id)) return;
    const task = tasks.find((t) => t.id === String(active.id));
    if (!task || task.status === over.id) return;
    dispatch({ type: "MOVE", id: task.id, status: over.id });
  }

  return (
    <DndContext
      id="board-dnd"
      sensors={sensors}
      collisionDetection={collision}
      onDragEnd={handleDragEnd}
      accessibility={{
        announcements,
        screenReaderInstructions: {
          draggable:
            "To pick up a task, press space or enter. Use the arrow keys to move it, then press space or enter to drop. Press escape to cancel.",
        },
      }}
    >
    <p role="status" className="sr-only">
      {message}
    </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {COLUMNS.map((col) => (
          <Column
            key={col.status}
            status={col.status}
            title={col.title}
            tasks={tasks.filter((t) => t.status === col.status)}
          />
        ))}
      </div>
    </DndContext>
  );
}
