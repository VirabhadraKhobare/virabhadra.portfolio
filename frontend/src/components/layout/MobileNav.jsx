import { Home, User, Briefcase, Mail, ScrollText } from 'lucide-react';

const items = [
  { icon: Home, href: '#hero' },
  { icon: User, href: '#about' },
  { icon: Briefcase, href: '#projects' },
  { icon: ScrollText, href: '/blog' },
  { icon: Mail, href: '#contact' }
];

export const MobileNav = () => {
  return (
    <nav className="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2 shadow-soft backdrop-blur-xl md:hidden">
      {items.map(({ icon: Icon, href }) => (
        <a key={href} href={href} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--text)] transition hover:bg-white/10 focus-ring">
          <Icon size={18} />
        </a>
      ))}
    </nav>
  );
};
