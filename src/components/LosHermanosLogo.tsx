"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LosHermanosLogo = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center animate-float"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Image
        src="/los-hermanos-logo.png"
        alt="Los Hermanos Prompt Enhancer Logo"
        width={100}
        height={100}
        className="h-auto w-24 md:w-32"
        priority
      />
    </motion.div>
  );
};

export default LosHermanosLogo;