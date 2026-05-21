import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { ScrollProgress } from './ScrollProgress.jsx';
import { BackToTopButton } from './BackToTopButton.jsx';
import { MobileNav } from './MobileNav.jsx';
import { LoadingScreen } from './LoadingScreen.jsx';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle.jsx';
import { LanguageToggle } from './LanguageToggle.jsx';
import { PortfolioChatbot } from './PortfolioChatbot.jsx';

export const SiteLayout = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <Navbar />
      <div className="hidden md:flex fixed right-5 top-24 z-40 flex-col gap-3">
        <ThemeToggle compact />
        <LanguageToggle compact />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <BackToTopButton />
      <PortfolioChatbot />
    </div>
  );
};
