import { motion } from "framer-motion";
import { educationData } from "../../data/portfolio.js";
import { GlassCard } from "../ui/GlassCard.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

const counters = [
  { label: "Completed work", value: "25+" },
  { label: "Happy clients", value: "18+" },
  { label: "Stack depth", value: "Full" },
  { label: "Response time", value: "< 24h" },
];

export const AboutSection = () => (
  <section id="about" className="section-shell py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About"
        title="Early-career Full Stack developer — projects & internships"
        description="Practical, deployable projects built during my B.Tech — React frontends, Node.js APIs, and MongoDB-backed systems with introductory AI integrations."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="space-y-5">
          <p className="text-sm leading-7 text-[var(--muted)]">
            I am a Full Stack Developer, AI/ML Enthusiast, and Software Engineer
            focused on practical systems that ship cleanly. My work combines
            modern React interfaces, robust Node.js APIs, MongoDB modeling, and
            a strong sense of product design.
          </p>
          <p className="text-sm leading-7 text-[var(--muted)]">
            Career objective: deliver high-impact web systems for startups,
            recruiters, and companies that need a developer who can think across
            UI, backend, data, and deployment.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {counters.map((counter) => (
              <div
                key={counter.label}
                className="rounded-2xl border border-[var(--border)] bg-white/5 p-3 sm:p-4"
              >
                <p className="text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">
                  {counter.value}
                </p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--muted)] sm:text-xs">
                  {counter.label}
                </p>
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
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--primary)]">
                      Education
                    </p>
                    <span className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--text-soft)]">
                      {entry.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold leading-snug sm:text-2xl">
                      {entry.label}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                      {entry.institution} · {entry.university}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[var(--border)] bg-white/5 p-4">
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
                        Duration
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                        {entry.duration}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[var(--border)] bg-white/5 p-4">
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
                        Grade
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                        {entry.gpa}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[entry.location, entry.mode, entry.specialization].map(
                      (item) => (
                        <span
                          key={item}
                          className="control-surface rounded-full px-3 py-1 text-[0.72rem] font-semibold"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="grid gap-2 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[var(--primary)]">
                      Focus Areas
                    </p>
                    <ul className="space-y-2 text-sm leading-6 text-[var(--muted)]">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
