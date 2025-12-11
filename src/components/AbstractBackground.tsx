"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AbstractShapeProps {
  delay: number;
  duration: number;
  className: string;
}

const AbstractShape: React.FC<AbstractShapeProps> = ({ delay, duration, className }) => {
  return (
    <motion.div
      className={`absolute rounded-full filter blur-3xl opacity-30 ${className}`}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{
        scale: [0.8, 1.2, 0.8],
        opacity: [0.2, 0.5, 0.2],
        rotate: [0, 360],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

const AbstractBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Shape 1: Orange (Los Hermanos) */}
      <AbstractShape
        delay={0}
        duration={15}
        className="bg-lh-orange w-64 h-64 top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
      />
      
      {/* Shape 2: Purple */}
      <AbstractShape
        delay={5}
        duration={18}
        className="bg-purple-500 w-80 h-80 bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2"
      />
      
      {/* Shape 3: Pink/Accent */}
      <AbstractShape
        delay={10}
        duration={12}
        className="bg-pink-500 w-48 h-48 top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default AbstractBackground;