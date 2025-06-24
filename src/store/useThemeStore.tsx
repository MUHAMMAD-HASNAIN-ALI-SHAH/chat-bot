import { create } from "zustand";

interface ThemeStore {
  theme: string;
  setTheme: (theme: string) => void;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "light",
  setTheme: (theme) => {
    set({ theme });
  },
}));

export default useThemeStore;
