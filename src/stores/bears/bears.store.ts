import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from '../../storage/session.storage';
interface Bear {
  id: number;
  name: string;
}

interface BearsState {
  polarBears: number;
  pandaBears: number;
  blackBears: number;

  bears: Bear[];

  totalBears: () => number;
  

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandasBears: (by: number) => void;

  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

export const useBearsStore = create<BearsState>()(
  persist(
    (set, get) => ({
      blackBears: 10,
      pandaBears: 5,
      polarBears: 1,
    
      bears: [{
        id: 1,
        name: "Oso #1"
      }],
    
      totalBears() {
        return get().blackBears + get().pandaBears + get().polarBears + get().bears.length;
      },
    
      increaseBlackBears: (by) => set((state: BearsState) => ({ blackBears: state.blackBears + by })),
      increasePolarBears: (by) => set((state: BearsState) => ({ polarBears: state.polarBears + by })),
      increasePandasBears: (by) => set((state: BearsState) => ({ pandaBears: state.pandaBears + by })),
      // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      // removeAllBears: () => set({ bears: 0 }),
    
      doNothing: () => set((state: BearsState) => ({ bears: [...state.bears] })),
      addBear: () => set((state) => ({
        bears: [...state.bears, {
          id: state.bears.length + 1,
          name: `Oso ${state.bears.length + 1}`
        }]
      })),
    
      clearBears: () => set({bears: []})
    }),
    {name: "bears", storage: customSessionStorage}
  )
)