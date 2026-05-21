import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { forwardRef } from 'react';

export const MagneticButton = forwardRef(function MagneticButton({ children, className = '', ...props }, ref) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14 });
  const springY = useSpring(y, { stiffness: 150, damping: 14 });
  const rotateX = useTransform(springY, [-18, 18], [6, -6]);
  const rotateY = useTransform(springX, [-18, 18], [-6, 6]);

  const handleMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left - width / 2) / 6);
    y.set((clientY - top - height / 2) / 6);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Component = props.href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      style={{ x: springX, y: springY, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`focus-ring ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});
