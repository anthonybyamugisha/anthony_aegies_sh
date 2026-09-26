import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const Reveal = ({ children, delay = 0, y = 18, className, once = true }: RevealProps) => {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : y },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.55, delay, ease: EASE }
      }
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
