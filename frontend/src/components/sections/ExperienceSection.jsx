import { motion } from "framer-motion";
import { experienceData } from "../../data/portfolio.js";
import { GlassCard } from "../ui/GlassCard.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

export const ExperienceSection = () => (
  <section id="experience" className="section-shell py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Experience"
        title="Timeline-focused internship and project history"
        description="Expandable details keep the layout clean while still surfacing the important delivery context."
      />

      <div className="mt-12 grid gap-6">
        {experienceData.map((experience, index) => (
          <motion.div
            key={`${experience.company}-${experience.role}`}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08 }}
          >
            <GlassCard>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--primary)]">
                    {experience.type}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {experience.company} ·{" "}
                    {experience.location || "On-site Internship (Offline)"}
                  </p>
                </div>
                <p className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                  {experience.startDate} - {experience.endDate}
                </p>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                {experience.summary}
              </p>
              <details className="mt-4 rounded-2xl border border-[var(--border)] bg-white/5 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-[var(--text)]">
                  Expand details
                </summary>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </details>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
