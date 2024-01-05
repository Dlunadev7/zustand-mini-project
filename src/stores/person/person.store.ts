import { type StateCreator, create } from "zustand";
import { persist, devtools } from "zustand/middleware";
// import { customSessionStorage } from "../../storage/session.storage";
import { firebaseStore } from "../../storage/firebase-storage.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (name: string) => void;
  setLastName: (last_name: string) => void;
}

const StoreAPi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (name) => set(({ firstName: name }), false, "setFirstName"),
  setLastName: (last_name) => set(({ lastName: last_name }), false, "lastName"),

});


export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(
      StoreAPi
      , { name: "person_storage", storage: firebaseStore }
    )
  )
)