import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';

export const LanguageToggle = ({ compact = false }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:scale-105 focus-ring ${compact ? 'w-11 px-0' : ''}`}
      aria-label="Toggle language"
    >
      <Globe size={16} />
      {!compact ? <span>{language.toUpperCase()}</span> : null}
    </button>
  );
};
