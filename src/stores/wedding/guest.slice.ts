import { StateCreator } from "zustand";

export interface GuestSlice {
  guestCounter: string;

  setGuestCounter: (guestCounter: string) => void;
}

export const guestCounterSlice: StateCreator<GuestSlice> = (set) => ({
  guestCounter: "0",
  
  setGuestCounter: (guestCounter: string) => {
    if(!guestCounter || Number(guestCounter) < 0) return;

    set({guestCounter})
  },
})