import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  MoonStar,
  SunMedium,
  Sparkles,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--bg)]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 focus-ring sm:gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 text-xs font-black text-white shadow-glow transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 sm:text-sm">
            VK
          </span>
          <div>
            <p className="font-display text-base font-bold tracking-tight text-[var(--text-strong)] sm:text-lg">
              Virbhadra Khobare
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-soft)] sm:text-xs sm:tracking-[0.28em]">
              Full Stack Developer
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[var(--text-soft)] transition hover:text-[var(--text-strong)] focus-ring"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/12Rm2otdjCkzTYd4hjQgb41ImEalK66AO/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="control-surface inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-ring"
            aria-label="Open resume in Google Drive"
          >
            Resume
          </a>
          {/* Admin link removed for public site */}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="control-surface inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:scale-105 focus-ring"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunMedium size={18} />
            ) : (
              <MoonStar size={18} />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="control-surface inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:scale-105 lg:hidden focus-ring"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          className="border-t border-[var(--border)] bg-[color:var(--bg)]/95 px-4 py-4 shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:hidden"
          id="mobile-navigation-menu"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            <div className="grid gap-2 rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-white/10 focus-ring"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={16} className="text-[var(--text-soft)]" />
                </a>
              ))}
            </div>

            <div className="mt-3 flex gap-3">
              <a
                href="https://drive.google.com/file/d/12Rm2otdjCkzTYd4hjQgb41ImEalK66AO/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="control-surface flex-1 items-center justify-center rounded-full px-4 py-3 text-center text-sm font-semibold transition focus-ring"
                aria-label="Open resume in Google Drive"
              >
                Download Resume
              </a>
            </div>

            <div className="flex items-center gap-3 rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-3">
              {/* Admin Login removed for public site */}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};
