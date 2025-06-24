"use client";
import { Moon, Sun } from "lucide-react";
import useThemeStore from "@/store/useThemeStore";
import { useEffect } from "react";

const ModeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      localStorage.setItem("theme", theme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#202123] border-r border-[#343541] text-[#ECECEC]"
          : "bg-white text-black"
      } flex items-center justify-between px-4 py-2 rounded-full w-full border dark:text-gray-100 transition-all`}
    >
      {/* Left Side: Icon + Label */}
      <div className="flex items-center gap-2">
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        <span className="text-sm">
          {theme === "dark" ? "Light" : "Dark"} Mode
        </span>
      </div>

      {/* Right Side: Switch */}
      <label className="relative inline-block w-10 h-5">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="opacity-0 w-0 h-0"
        />
        <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 dark:bg-gray-600 rounded-full transition duration-300"></span>
        <span
          className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 ${
            theme === "dark" ? "translate-x-5" : "translate-x-0"
          }`}
        ></span>
      </label>
    </div>
  );
};

export default ModeToggle;
