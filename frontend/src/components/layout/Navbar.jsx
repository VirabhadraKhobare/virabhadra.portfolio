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
            <p className="font-display text-base font-bold tracking-tight sm:text-lg">
              Virbhadra Khobare
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-xs sm:tracking-[0.28em]">
              Full Stack Developer
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)] focus-ring"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/Virabhadra_Khobare_FullStack_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-white/10 focus-ring"
          >
            Resume
          </a>
          <NavLink
            to="/admin/login"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-white/10 focus-ring"
          >
            <Sparkles size={16} />
            Admin
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] transition hover:scale-105 hover:bg-white/10 focus-ring"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] transition hover:scale-105 lg:hidden focus-ring"
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
                  <ArrowUpRight size={16} className="text-[var(--muted)]" />
                </a>
              ))}
            </div>

            <div className="mt-3 flex gap-3">
              <a
                href="/Virabhadra_Khobare_FullStack_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-center text-sm font-semibold text-[var(--text)] transition hover:bg-white/10 focus-ring"
              >
                Download Resume
              </a>
            </div>

            <div className="flex items-center gap-3 rounded-3xl border border-[var(--border)] bg-[var(--panel-strong)] p-3">
              <NavLink
                to="/admin/login"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 focus-ring"
              >
                <Sparkles size={16} />
                Admin Login
              </NavLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};
