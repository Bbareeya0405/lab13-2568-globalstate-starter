import { create } from "zustand";
import { type TaskFormState } from "../libs/Task";

export const useTaskFormStore = create<TaskFormState>((set) => ({
  title: "",
  description: "",
  dueDate: null,
  assignees: [],
  
  setTasks: (title) =>
    set(() => ({
      title: title,
    })),
  setdescription: (description) =>
    set(() => ({
      description: description,
    })),
  setdueDate: (dueDate) =>
    set(() => ({
      dueDate: dueDate,
    })),
  setassignees: (assignees) => 
    set({ assignees }),
  
  resetForm: () =>
    set({
      title: "",
      description: "",
      dueDate: "",
      assignees: [],
    }),
}));
