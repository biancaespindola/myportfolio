import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = { on: boolean };
type Actions = { toggle: () => void };

export const useSnow = create<State & Actions>()(
  persist((set) => ({ on: true, toggle: () => set((s) => ({ on: !s.on })) }), {
    name: "snow",
    storage: createJSONStorage(() => localStorage),
    partialize: ({ on }) => ({ on }),
    // Rehydrated on mount (Snow) so server and first client render match.
    skipHydration: true,
  }),
);

export const useSnowOn = () => useSnow((s) => s.on);
