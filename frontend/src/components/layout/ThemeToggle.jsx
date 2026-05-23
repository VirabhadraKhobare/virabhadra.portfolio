import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

export const ThemeToggle = ({ compact = false }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:scale-105 focus-ring ${compact ? "w-11 px-0" : ""}`}
      aria-label="Toggle theme"
    >
      <span
        className={`theme-toggle-icon ${theme === "dark" ? "theme-toggle-rotate" : ""}`}
      >
        {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
      </span>
      {!compact ? (
        <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
      ) : null}
    </button>
  );
};
