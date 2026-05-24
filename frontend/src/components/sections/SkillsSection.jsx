import { motion } from "framer-motion";
import { skillGroups, skillRadar } from "../../data/portfolio.js";
import { GlassCard } from "../ui/GlassCard.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

const CircularProgress = ({ value, label }) => (
  <div className="flex flex-col items-center gap-3 rounded-3xl border border-[var(--border)] bg-white/5 p-5">
    <div
      className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[conic-gradient(var(--primary)_0%,var(--primary)_0%,rgba(255,255,255,0.08)_0%)]"
      style={{
        background: `conic-gradient(var(--primary) ${value}%, rgba(255,255,255,0.08) 0%)`,
      }}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg)] text-sm font-bold">
        {value}%
      </div>
    </div>
    <p className="text-sm font-semibold">{label}</p>
  </div>
);

export const SkillsSection = () => (
  <section id="skills" className="section-shell py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Skills"
        title="Core skills across frontend, backend, and AI"
        description="Organized skill groups highlight technologies used in projects, with progress indicators for quick recruiter review."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
            >
              <GlassCard className="h-full">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-xl font-bold">
                    {group.title}
                  </h3>
                  <span className="text-sm font-bold text-[var(--primary)]">
                    {group.progress}%
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${group.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="control-surface rounded-full px-3 py-1 text-xs font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard>
          <h3 className="font-display text-xl font-bold">Capability radar</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {skillRadar.map((skill) => (
              <CircularProgress
                key={skill.label}
                value={skill.value}
                label={skill.label}
              />
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  </section>
);
