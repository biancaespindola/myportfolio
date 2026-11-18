import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const ACHIEVEMENTS = [
  "explorer",
  "polyglot",
  "bookworm",
  "nightowl",
  "hohoho",
  "konami",
  "elf",
] as const;
export type AchievementId = (typeof ACHIEVEMENTS)[number];

/** Pages a visitor must see for "explorer" (first path segment after the locale). */
export const EXPLORER_PAGES = ["work", "case-studies", "about", "cv"] as const;

// ---- State -----------------------------------------------------------------

type State = {
  unlocked: AchievementId[];
  visited: string[];
  lastLocale: string | null;
  /** Advent calendar days opened. */
  doors: number[];
  /** Newly unlocked, waiting to be announced. Not persisted. */
  queue: AchievementId[];
  /** Timestamp of the last Konami blizzard. Not persisted. */
  blizzardAt: number | null;
};

type Actions = {
  unlock: (id: AchievementId) => void;
  visit: (page: string) => void;
  seeLocale: (locale: string) => void;
  dismiss: () => void;
  blizzard: () => void;
  openDoor: (day: number) => void;
};

const initialState: State = {
  unlocked: [],
  visited: [],
  lastLocale: null,
  doors: [],
  queue: [],
  blizzardAt: null,
};

// ---- Store -----------------------------------------------------------------

export const useAchievements = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      unlock: (id) => {
        if (get().unlocked.includes(id)) return;
        set((s) => ({
          unlocked: [...s.unlocked, id],
          queue: [...s.queue, id],
        }));
      },
      visit: (page) => {
        const { visited, unlock } = get();
        if (visited.includes(page)) return;
        const next = [...visited, page];
        set({ visited: next });
        if (EXPLORER_PAGES.every((p) => next.includes(p))) unlock("explorer");
      },
      seeLocale: (locale) => {
        const { lastLocale, unlock } = get();
        if (lastLocale && lastLocale !== locale) unlock("polyglot");
        set({ lastLocale: locale });
      },
      dismiss: () => set((s) => ({ queue: s.queue.slice(1) })),
      blizzard: () => set({ blizzardAt: Date.now() }),
      openDoor: (day) => {
        const { doors, unlock } = get();
        if (doors.includes(day)) return;
        set({ doors: [...doors, day] });
        unlock("elf");
      },
    }),
    {
      name: "achievements",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ unlocked, visited, lastLocale, doors }) => ({
        unlocked,
        visited,
        lastLocale,
        doors,
      }),
      // Rehydrated on mount (AchievementTracker) so server and first client render match.
      skipHydration: true,
    },
  ),
);

// ---- Selectors -------------------------------------------------------------

export const useUnlocked = () => useAchievements((s) => s.unlocked);
export const useToastQueue = () => useAchievements((s) => s.queue);
export const useDoors = () => useAchievements((s) => s.doors);
export const useBlizzardAt = () => useAchievements((s) => s.blizzardAt);
