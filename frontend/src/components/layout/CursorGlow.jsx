import { useEffect, useState } from 'react';

export const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden opacity-60 lg:block"
      style={{
        background: `radial-gradient(280px circle at ${position.x}px ${position.y}px, rgba(34, 211, 238, 0.14), transparent 45%)`
      }}
    />
  );
};
