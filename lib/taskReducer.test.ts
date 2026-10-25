import { describe, it, expect } from "vitest";
import { taskReducer } from "./taskReducer";
import { Task } from "@/types";

const base: Task[] = [
  { id: "1", title: "Write code", status: "todo" },
  { id: "2", title: "Test code", status: "doing" },
];

describe("ADD", () => {
  it("adds a task in the todo column", () => {
    const result = taskReducer(base, { type: "ADD", id: "3", title: "Deploy" });
    expect(result).toHaveLength(3);
    expect(result[2]).toEqual({ id: "3", title: "Deploy", status: "todo" });
  });

  it("trims the title", () => {
    const result = taskReducer([], { type: "ADD", id: "1", title: "  Hi  " });
    expect(result[0].title).toBe("Hi");
  });

  it("ignores an empty or blank title", () => {
    expect(taskReducer(base, { type: "ADD", id: "9", title: "   " })).toEqual(base);
  });
});

describe("EDIT", () => {
  it("changes only the matching task's title", () => {
    const result = taskReducer(base, { type: "EDIT", id: "1", title: "New" });
    expect(result[0].title).toBe("New");
    expect(result[1]).toEqual(base[1]);
  });

  it("ignores an empty title", () => {
    expect(taskReducer(base, { type: "EDIT", id: "1", title: "" })).toEqual(base);
  });

  it("does nothing for an unknown id", () => {
    expect(taskReducer(base, { type: "EDIT", id: "x", title: "New" })).toEqual(base);
  });
});

describe("DELETE", () => {
  it("removes the matching task", () => {
    const result = taskReducer(base, { type: "DELETE", id: "1" });
    expect(result).toEqual([base[1]]);
  });

  it("does nothing for an unknown id", () => {
    expect(taskReducer(base, { type: "DELETE", id: "x" })).toEqual(base);
  });
});

describe("MOVE", () => {
  it("changes the status of the matching task", () => {
    const result = taskReducer(base, { type: "MOVE", id: "1", status: "done" });
    expect(result[0].status).toBe("done");
  });

  it("keeps the task unchanged when moved to the same column", () => {
    const result = taskReducer(base, { type: "MOVE", id: "1", status: "todo" });
    expect(result).toEqual(base);
  });

  it("does nothing for an unknown id", () => {
    expect(taskReducer(base, { type: "MOVE", id: "x", status: "done" })).toEqual(base);
  });
});

describe("purity", () => {
  it("never mutates the original state", () => {
    const frozen = Object.freeze(base.map((t) => Object.freeze({ ...t })));
    const state = frozen as Task[];
    expect(() => {
      taskReducer(state, { type: "ADD", id: "3", title: "A" });
      taskReducer(state, { type: "EDIT", id: "1", title: "B" });
      taskReducer(state, { type: "MOVE", id: "1", status: "done" });
      taskReducer(state, { type: "DELETE", id: "1" });
    }).not.toThrow();
  });
});
