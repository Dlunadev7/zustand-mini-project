import { createJSONStorage, StateStorage } from "zustand/middleware"


const firebaseURL = "https://zustand-8a99a-default-rtdb.firebaseio.com/zustand";

const StorageAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseURL}/${name}.json`).then(res => res.json());

      return JSON.stringify(data);

    } catch (error) {
      return null;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${firebaseURL}/${name}.json`, {
      body: value,
      method: "PUT"
    }).then(res => res.json());

  },
  removeItem: function (name: string): void | Promise<void> {
    sessionStorage.removeItem(name);
  }
}

export const firebaseStore = createJSONStorage(() => StorageAPI);