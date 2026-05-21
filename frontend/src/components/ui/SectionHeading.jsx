import { motion } from "framer-motion";

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
}) => (
  <motion.div
    className={
      align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
    }
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.55 }}
  >
    {eyebrow ? (
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
        {eyebrow}
      </p>
    ) : null}
    <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-gradient md:text-5xl">
      {title}
    </h2>
    {description ? (
      <p className="mt-4 text-sm leading-7 text-[var(--muted)] md:text-base">
        {description}
      </p>
    ) : null}
  </motion.div>
);
