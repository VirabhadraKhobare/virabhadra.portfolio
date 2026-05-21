import { Link, NavLink } from 'react-router-dom';
import { Menu, MoonStar, SunMedium, Globe, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group inline-flex items-center gap-3 focus-ring">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 text-sm font-black text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
            VK
          </span>
          <div>
            <p className="font-display text-lg font-bold tracking-tight">Virbhadra Khobare</p>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Full Stack Developer</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)] focus-ring">
              {t('nav', item.label.toLowerCase()) || item.label}
            </a>
          ))}
          <NavLink to="/blog" className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)] focus-ring">
            {t('nav', 'blog')}
          </NavLink>
          <NavLink to="/admin/login" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-white/10 focus-ring">
            <Sparkles size={16} />
            Admin
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleLanguage} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] transition hover:scale-105 focus-ring" aria-label="Toggle language">
            <Globe size={18} />
          </button>
          <button type="button" onClick={toggleTheme} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] transition hover:scale-105 focus-ring" aria-label="Toggle theme">
            {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] transition hover:scale-105 lg:hidden focus-ring" aria-label="Menu">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
