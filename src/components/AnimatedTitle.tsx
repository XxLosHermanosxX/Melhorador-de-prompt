"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const AnimatedTitle = () => {
  return (
    <div className="text-center mb-8">
      <motion.h1 
        className="text-3xl md:text-5xl font-rajdhani italic font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-lh-orange to-gray-200 drop-shadow-[0_0_5px_rgba(255,165,0,0.5)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <TypeAnimation
          sequence={[
            'Aprimorador de Prompt - Sites',
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={0}
        />
      </motion.h1>
      
      <motion.p 
        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Aprimore seus prompts com IA para obter resultados de alta qualidade
      </motion.p>
    </div>
  );
};

export default AnimatedTitle;