import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { socialLinks } from '../../data/portfolio.js';

export const Footer = () => {
  return (
    <footer className="relative mt-16 border-t border-[var(--border)] bg-[var(--panel)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h3 className="font-display text-2xl font-bold">Virbhadra Khobare</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Premium full stack developer portfolio built for recruiters, startups, and clients that value performance, clarity, and scale.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--muted)]">Quick Links</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-white/10 focus-ring">
                  {link.label}
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Virbhadra Khobare. Built with React, Node.js, MongoDB, and design intent.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/VirbhadraKhobare" className="transition hover:text-[var(--text)] focus-ring" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/virabhadrakhobare" className="transition hover:text-[var(--text)] focus-ring" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:virbhadrakhobare111@gmail.com" className="transition hover:text-[var(--text)] focus-ring" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
