import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton.jsx';
import { GlassCard } from '../ui/GlassCard.jsx';
import { heroStats, socialLinks } from '../../data/portfolio.js';
import gsap from 'gsap';

const typedStrings = ['Full Stack Developer', 'AI/ML Enthusiast', 'Software Engineer'];

export const HeroSection = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const orbit = gsap.timeline({ repeat: -1, yoyo: true });
    orbit.to('.tech-orbit-item', { y: -12, duration: 1.8, stagger: 0.15, ease: 'power2.inOut' });

    return () => orbit.kill();
  }, []);

  useEffect(() => {
    const current = typedStrings[phraseIndex];
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayText(current.slice(0, index));

      if (index >= current.length) {
        window.clearInterval(interval);
        window.setTimeout(() => setPhraseIndex((value) => (value + 1) % typedStrings.length), 1100);
      }
    }, 90);

    return () => window.clearInterval(interval);
  }, [phraseIndex]);

  const orbitItems = useMemo(() => ['React', 'Node', 'MongoDB', 'AI', 'UI', 'APIs', 'Cloud', 'Security'], []);

  return (
    <section id="hero" className="section-shell overflow-hidden pt-12 md:pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28">
        <div className="relative z-10 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">
              <Sparkles size={14} />
              Premium Portfolio 2026
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-black tracking-tight md:text-7xl">
              <span className="block text-[var(--text)]">Virbhadra Khobare</span>
              <span className="mt-2 block text-gradient">{displayText}<span className="animate-pulse text-cyan-300">|</span></span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
              I build recruiter-ready digital products with premium UI, scalable backend systems, and AI-powered features that feel fast, modern, and production-ready.
            </p>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:shadow-soft">
              <Download size={16} />
              Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-6 py-3 text-sm font-bold text-[var(--text)] transition hover:bg-white/10">
              Hire Me
              <ArrowDown size={16} />
            </MagneticButton>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--text)] transition hover:-translate-y-0.5 hover:bg-white/10 focus-ring">
                {link.label === 'GitHub' ? <Github size={16} /> : link.label === 'LinkedIn' ? <Linkedin size={16} /> : <Mail size={16} />}
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {heroStats.map((stat) => (
              <GlassCard key={stat.label} className="p-5">
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute inset-0 -z-10 rounded-full bg-cyan-400/20 blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <GlassCard className="relative flex w-full max-w-xl flex-col items-center justify-center overflow-hidden p-8 text-center">
            <div className="flex h-44 w-44 items-center justify-center rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-400/25 via-blue-500/15 to-fuchsia-500/20 shadow-glow">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-[var(--bg)] text-5xl font-black text-gradient">
                VK
              </div>
            </div>

            <div className="tech-orbit relative mt-10 h-72 w-72">
              {orbitItems.map((item, index) => {
                const angle = (index / orbitItems.length) * Math.PI * 2;
                const x = Math.cos(angle) * 120;
                const y = Math.sin(angle) * 120;

                return (
                  <span
                    key={item}
                    className="tech-orbit-item absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-4 py-2 text-xs font-semibold text-[var(--text)] shadow-soft"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    {item}
                  </span>
                );
              })}
            </div>

            <div className="absolute right-6 top-6 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300">
              Available for select freelance work
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
