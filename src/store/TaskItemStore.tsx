import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { type TaskItemProps } from "../libs/Task";

export const useTaskStore = create<TaskItemProps>((set, get) => ({
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),

  setTasks: (tasks) => {
    set({ tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },

  addTask: (title, description, dueDate, assignees) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      assignees,
      isDone: false,
      doneAt: null,
    };
    const updatedTasks = [newTask, ...get().tasks];
    set({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  },

  toggleTask: (id) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isDone: !task.isDone,
            doneAt: task.isDone ? null : new Date().toLocaleDateString(),
          }
        : task
    );
    set({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  },

  removeTask: (id) => {
    const updatedTasks = get().tasks.filter((task) => task.id !== id);
    set({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  },
}));