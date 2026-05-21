import { Home, User, Briefcase, Mail } from "lucide-react";

const items = [
  { icon: Home, href: "#hero" },
  { icon: User, href: "#about" },
  { icon: Briefcase, href: "#projects" },
  { icon: Mail, href: "#contact" },
];

export const MobileNav = () => {
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 mx-auto flex max-w-sm items-center justify-between gap-1 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-2.5 py-2 shadow-soft backdrop-blur-xl md:hidden">
      {items.map(({ icon: Icon, href }) => (
        <a
          key={href}
          href={href}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--text)] transition hover:bg-white/10 focus-ring sm:h-11 sm:w-11"
        >
          <Icon size={17} />
        </a>
      ))}
    </nav>
  );
};
