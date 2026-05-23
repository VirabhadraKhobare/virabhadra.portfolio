import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton.jsx";
import { GlassCard } from "../ui/GlassCard.jsx";
import { heroStats, socialLinks } from "../../data/portfolio.js";
import gsap from "gsap";

const typedStrings = [
  "Full Stack Developer",
  "AI/ML Enthusiast",
  "Software Engineer",
];

export const HeroSection = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const orbit = gsap.timeline({ repeat: -1, yoyo: true });
    orbit.to(".tech-orbit-item", {
      y: -12,
      duration: 1.8,
      stagger: 0.15,
      ease: "power2.inOut",
    });

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
        window.setTimeout(
          () => setPhraseIndex((value) => (value + 1) % typedStrings.length),
          1100,
        );
      }
    }, 90);

    return () => window.clearInterval(interval);
  }, [phraseIndex]);

  const orbitItems = useMemo(
    () => ["React", "Node", "MongoDB", "AI", "UI", "APIs", "Cloud", "Security"],
    [],
  );

  return (
    <section
      id="hero"
      className="section-shell overflow-hidden pt-10 sm:pt-12 md:pt-16"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.98fr)] lg:items-center lg:gap-10 lg:px-8 lg:pb-24 xl:gap-14">
        <div className="relative z-10 flex flex-col justify-center lg:pr-2 xl:pr-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="control-surface inline-flex items-center gap-2 rounded-full border-cyan-400/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100">
              <Sparkles size={14} />
              Premium Portfolio 2026
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-black tracking-tight sm:text-5xl md:text-4xl lg:text-6xl xl:text-[3rem]">
              <span className="block text-[var(--text-strong)]">
                Virbhadra Khobare
              </span>
              <span className="mt-2 block text-gradient">
                {displayText}
                <span className="animate-pulse text-cyan-300">|</span>
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-soft)] sm:text-base md:text-lg md:leading-8">
              I build recruiter-ready digital products with premium UI, scalable
              backend systems, and AI-powered features that feel fast, modern,
              and production-ready.
            </p>
          </motion.div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <MagneticButton className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:shadow-soft sm:w-auto">
              <Download size={16} />
              Download Resume
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="control-surface inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition sm:w-auto"
            >
              Hire Me
              <ArrowDown size={16} />
            </MagneticButton>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="control-surface inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition hover:-translate-y-0.5 focus-ring"
              >
                {link.label === "GitHub" ? (
                  <Github size={16} />
                ) : link.label === "LinkedIn" ? (
                  <Linkedin size={16} />
                ) : (
                  <Mail size={16} />
                )}
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {heroStats.map((stat) => (
              <GlassCard
                key={stat.label}
                className="relative overflow-hidden px-5 py-4 sm:px-6 sm:py-4"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 opacity-90" />
                <div className="flex min-h-[96px] flex-col justify-between gap-2.5">
                  <div>
                    <p className="text-[0.64rem] font-bold uppercase tracking-[0.36em] text-[var(--text-soft)]">
                      {stat.label}
                    </p>
                    <p className="mt-2.5 text-[1.05rem] font-black leading-[1.08] tracking-tight text-[var(--text-strong)] sm:text-[1.1rem] lg:text-[1.15rem]">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:items-stretch lg:pl-2 xl:pl-6">
          <motion.div
            className="absolute inset-0 -z-10 rounded-full bg-cyan-400/20 blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <GlassCard className="relative flex h-full w-full max-w-[28rem] flex-col items-center justify-start overflow-hidden p-4 text-center sm:p-5 md:p-6 lg:min-h-[620px] xl:max-w-[28rem]">
            <div className="relative w-full max-w-[20rem] overflow-hidden rounded-[1.75rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/25 via-blue-500/15 to-fuchsia-500/20 p-2 shadow-glow sm:max-w-[22rem] md:max-w-[26rem]">
              <div className="absolute left-4 top-4 z-20 rounded-full border border-emerald-300/40 bg-[rgba(12,28,26,0.82)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-100 backdrop-blur sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-xs">
                Open To Work
              </div>
              <div className="overflow-hidden rounded-[1.6rem] border border-white/10">
                <img
                  src="/viru-image.jpg"
                  alt="Virbhadra Khobare"
                  className="h-[18rem] w-full object-cover object-center sm:h-[22rem] md:h-[24rem]"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-b-[1.6rem] bg-gradient-to-t from-[rgba(8,12,24,0.88)] via-[rgba(8,12,24,0.45)] to-transparent px-4 pb-4 pt-10 text-left sm:px-5 sm:pb-5 sm:pt-12">
                <p className="text-base font-bold text-white">
                  Virbhadra Khobare
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-cyan-200">
                  Full Stack Developer
                </p>
              </div>
            </div>

            <div className="tech-orbit relative mt-5 h-48 w-48 sm:mt-6 sm:h-56 sm:w-56 md:h-64 md:w-64 xl:mt-7">
              {orbitItems.map((item, index) => {
                const angle = (index / orbitItems.length) * Math.PI * 2;
                const orbitRadius = 76;
                const x = Math.cos(angle) * orbitRadius;
                const y = Math.sin(angle) * orbitRadius;

                return (
                  <span
                    key={item}
                    className="tech-orbit-item absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1.5 text-[10px] font-semibold text-[var(--text)] shadow-soft sm:px-4 sm:py-2 sm:text-xs"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
