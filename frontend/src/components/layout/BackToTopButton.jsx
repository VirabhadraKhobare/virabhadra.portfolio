import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel-strong)] text-[var(--text)] shadow-soft transition hover:-translate-y-1 focus-ring md:bottom-8 md:right-8"
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  );
};
