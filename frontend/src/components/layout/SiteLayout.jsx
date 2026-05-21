import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";
import { ScrollProgress } from "./ScrollProgress.jsx";
import { BackToTopButton } from "./BackToTopButton.jsx";
import { MobileNav } from "./MobileNav.jsx";
import { LoadingScreen } from "./LoadingScreen.jsx";
import { useEffect, useState } from "react";

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
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <BackToTopButton />
    </div>
  );
};
