import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PersonSlice, createPersonSlice } from "./wedding.slice";
import { GuestSlice, guestCounterSlice } from "./guest.slice";

type SharedState = PersonSlice & GuestSlice;

export const useWeddingStore = create<SharedState>()(
  devtools(
    (...params) => ({
      ...createPersonSlice(...params),
      ...guestCounterSlice(...params)
    }))
)
