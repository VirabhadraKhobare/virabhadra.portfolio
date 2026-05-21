import { motion } from 'framer-motion';
import { educationData } from '../../data/portfolio.js';
import { GlassCard } from '../ui/GlassCard.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

const counters = [
  { label: 'Completed work', value: '25+' },
  { label: 'Happy clients', value: '18+' },
  { label: 'Stack depth', value: 'Full' },
  { label: 'Response time', value: '< 24h' }
];

export const AboutSection = () => (
  <section id="about" className="section-shell py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About"
        title="Professional introduction with clarity and depth"
        description="I craft polished digital products from idea to deployment, balancing interface quality, backend reliability, and AI-driven functionality."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="space-y-5">
          <p className="text-sm leading-7 text-[var(--muted)]">
            I am a Full Stack Developer, AI/ML Enthusiast, and Software Engineer focused on practical systems that ship cleanly. My work combines modern React interfaces, robust Node.js APIs, MongoDB modeling, and a strong sense of product design.
          </p>
          <p className="text-sm leading-7 text-[var(--muted)]">
            Career objective: deliver high-impact web systems for startups, recruiters, and companies that need a developer who can think across UI, backend, data, and deployment.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {counters.map((counter) => (
              <div key={counter.label} className="rounded-2xl border border-[var(--border)] bg-white/5 p-4">
                <p className="text-2xl font-black text-white">{counter.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{counter.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="grid gap-4">
          {educationData.map((entry, index) => (
            <motion.div
              key={entry.label}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <GlassCard className="h-full">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Education</p>
                <h3 className="mt-3 font-display text-xl font-bold">{entry.label}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{entry.detail}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
