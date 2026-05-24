import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout.jsx";
import { LoadingScreen } from "./components/layout/LoadingScreen.jsx";
import { CursorGlow } from "./components/layout/CursorGlow.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
// Admin pages removed for public site
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

// ProtectedRoute removed with admin pages

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
};

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <CursorGlow />
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          {/* Admin routes removed for public site */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
