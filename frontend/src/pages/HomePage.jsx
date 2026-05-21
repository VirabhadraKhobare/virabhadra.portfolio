import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/sections/HeroSection.jsx';
import { AboutSection } from '../components/sections/AboutSection.jsx';
import { SkillsSection } from '../components/sections/SkillsSection.jsx';
import { ProjectsSection } from '../components/sections/ProjectsSection.jsx';
import { ExperienceSection } from '../components/sections/ExperienceSection.jsx';
import { CertificatesSection } from '../components/sections/CertificatesSection.jsx';
import { AchievementsSection } from '../components/sections/AchievementsSection.jsx';
import { ServicesSection } from '../components/sections/ServicesSection.jsx';
import { BlogSection } from '../components/sections/BlogSection.jsx';
import { ContactSection } from '../components/sections/ContactSection.jsx';
import { api } from '../lib/api.js';

export default function HomePage() {
  useEffect(() => {
    api.post('/analytics/track', { path: '/', source: 'landing' }).catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Virbhadra Khobare | Full Stack Developer</title>
        <meta name="description" content="Modern full stack developer portfolio with premium UI, backend blog, admin dashboard, and recruiter-focused sections." />
      </Helmet>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificatesSection />
      <AchievementsSection />
      <ServicesSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
