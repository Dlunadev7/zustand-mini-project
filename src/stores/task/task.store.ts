import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { immer } from "zustand/middleware/immer";

import type { Task, TaskStatus } from "../../interfaces";
import { immer } from "zustand/middleware/immer";
import { customSessionStorage } from "../../storage/session.storage";

interface TaskState {
  task: Record<string, Task>;
  draggingTaskId?: string;

  
  getTaskByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (taskId: string) => void;
  clearDraggingTaskId: () => void;
  
  onProgressChange: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  totalTask: () => number;
}

const StoreAPI: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/immer", never], ["zustand/persist", unknown]]> = (set, get) => ({
  task: {
    'ABC-1': { id: 'ABC-1', title: 'Algo raro', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Algo raro', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', title: 'Algo raro', status: 'open' },
    'ABC-4': { id: 'ABC-4', title: 'Algo raro', status: 'in-progress' }
  },

  draggingTaskId: undefined,

  totalTask: () => {
    return Object.values(get().task).length;
  },

  getTaskByStatus: (status) => {
    return Object.values(get().task).filter((task) => task.status === status);
  },

  setDraggingTaskId: (taskId) => {
    set({ draggingTaskId: taskId });
  },

  clearDraggingTaskId: () => set({ draggingTaskId: undefined }),
  onProgressChange: (taskId, status) => {
    //  if(!draggingTaskId) return;

    // const task = get().task[taskId];
    // task.status = status;

    // Whit immer

    set(state => {
      state.task[taskId] = {
        ...state.task[taskId],
        status
      }
    })
    // set((state) => {
    //   state.todos[todoId].done = !state.todos[todoId].done
    // }),

    // set((state) => ({
    //   task: {
    //     ...state.task,
    //     [task.id]: task
    //   }
    // }))
  },

  onTaskDrop: (status) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().setDraggingTaskId(taskId);
    get().onProgressChange(taskId, status);
  }

  
})

export const useTaskStore = create<TaskState>()(
  devtools(
    immer(
      persist(
        StoreAPI,
        {
          name: "task-store", storage: customSessionStorage
        }
      )
    )
  )
);
