import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', ...props }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    className={`glass-card neo-border rounded-3xl p-6 ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);
