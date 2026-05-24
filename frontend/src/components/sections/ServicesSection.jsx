import { motion } from "framer-motion";
import { servicesData } from "../../data/portfolio.js";
import { GlassCard } from "../ui/GlassCard.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

export const ServicesSection = () => (
  <section id="services" className="section-shell py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title="Available engagement options for startups and teams"
        description="Offerings tailored for small teams and early-stage products: full-stack development, APIs, and deployment."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {servicesData.map((service, index) => (
          <motion.div
            key={service}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.04 }}
          >
            <GlassCard className="h-full">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--primary)]">
                Service
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold">
                {service}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Production-quality delivery with performance-first
                implementation, responsive layouts, and clean APIs.
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
