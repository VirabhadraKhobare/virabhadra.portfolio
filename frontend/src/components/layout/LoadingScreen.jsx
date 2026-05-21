import { motion } from 'framer-motion';

export const LoadingScreen = () => (
  <div className="fixed inset-0 z-[100] grid place-items-center bg-[var(--bg)]">
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400" />
      <p className="text-sm uppercase tracking-[0.4em] text-[var(--muted)]">Loading portfolio</p>
    </motion.div>
  </div>
);
