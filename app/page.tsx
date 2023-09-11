"use client";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-black h-screen p-10">
      <p className="text-lightBlue mb-6 text-2xl dark:text-white">
        I'm working on
        <span className="text-3xl text-mango">YearlyGoals page</span>
      </p>

      <button
        className="bg-white text-blueViolet rounded-lg p-4"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}
