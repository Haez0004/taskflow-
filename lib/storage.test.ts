// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { loadTasks, saveTasks, STORAGE_KEY } from "./storage";
import type { Task } from "@/types";

const sample: Task[] = [
  { id: "a", title: "One", status: "todo" },
  { id: "b", title: "Two", status: "done" },
];

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns null when nothing is saved", () => {
    expect(loadTasks()).toBeNull();
  });

  it("round-trips saved tasks", () => {
    saveTasks(sample);
    expect(loadTasks()).toEqual(sample);
  });

  it("keeps an empty list as a real state", () => {
    saveTasks([]);
    expect(loadTasks()).toEqual([]);
  });

  it("returns null for invalid JSON", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not json");
    expect(loadTasks()).toBeNull();
  });

  it("returns null when the data is not an array", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ a: 1 }));
    expect(loadTasks()).toBeNull();
  });

  it("returns null when a task has the wrong shape", () => {
    const bad = [{ id: "a", title: "One", status: "banana" }];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bad));
    expect(loadTasks()).toBeNull();
  });
});
