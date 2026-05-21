import { createContext, useContext, useMemo, useState } from 'react';
import { dictionaries } from '../lib/i18n.js';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio.language') || 'en');

  const value = useMemo(() => {
    const currentDictionary = dictionaries[language] || dictionaries.en;

    return {
      language,
      dictionary: currentDictionary,
      toggleLanguage: () => {
        setLanguage((currentLanguage) => {
          const nextLanguage = currentLanguage === 'en' ? 'hi' : 'en';
          localStorage.setItem('portfolio.language', nextLanguage);
          return nextLanguage;
        });
      },
      t: (scope, key) => currentDictionary?.[scope]?.[key] || dictionaries.en?.[scope]?.[key] || key
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
