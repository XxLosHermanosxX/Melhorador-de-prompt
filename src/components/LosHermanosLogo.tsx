"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LosHermanosLogo = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center mb-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Image
        src="/los-hermanos-logo.png"
        alt="Los Hermanos Prompt Enhancer Logo"
        width={150}
        height={200}
        className="h-auto w-36 md:w-48"
        priority
      />
    </motion.div>
  );
};

export default LosHermanosLogo;