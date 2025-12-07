"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const AnimatedBrain = ({ isThinking }: { isThinking: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* Círculo de carregamento animado */}
        {isThinking && (
          <motion.div
            className="absolute inset-0 border-4 border-lh-orange rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        {/* Cérebro principal */}
        <motion.div
          animate={{
            scale: isThinking ? [1, 1.1, 1] : 1,
            boxShadow: isThinking 
              ? [
                  "0 0 0px rgba(255, 165, 0, 0)", 
                  "0 0 20px rgba(255, 165, 0, 0.5)", 
                  "0 0 0px rgba(255, 165, 0, 0)"
                ]
              : "0 0 0px rgba(255, 165, 0, 0)"
          }}
          transition={{
            duration: isThinking ? 2 : 0,
            repeat: isThinking ? Infinity : 0,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <Brain 
            size={80} 
            className={`${
              isThinking 
                ? "text-lh-orange" 
                : "text-gray-400"
            } transition-colors duration-300`}
          />
        </motion.div>
      </div>
      
      {/* Indicador de pensamento */}
      {isThinking && (
        <motion.div
          className="mt-4 text-lh-orange font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Processando...
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedBrain;