"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProcessViewer = ({ isProcessing, enhancedPrompt }: { 
  isProcessing: boolean; 
  enhancedPrompt: string;
}) => {
  const [processSteps, setProcessSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isProcessing) {
      setProcessSteps([
        "🧠 Analisando prompt original...",
        "🔍 Identificando contexto e objetivo...",
        "⚙️ Aplicando melhores práticas de engenharia de prompt...",
        "✨ Aprimorando estrutura e clareza...",
        "🧪 Testando eficácia do novo prompt...",
        "✅ Finalizando processo..."
      ]);
      setCurrentStep(0);
    }
  }, [isProcessing]);

  useEffect(() => {
    if (isProcessing && currentStep < processSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isProcessing, processSteps.length]);

  if (!isProcessing && !enhancedPrompt) return null;

  return (
    <motion.div 
      className="mt-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-lh-orange flex items-center">
        <span className="mr-2">⚡</span> Processo da IA
      </h3>
      
      <div className="space-y-3">
        {processSteps.slice(0, currentStep + 1).map((step, index) => (
          <motion.div
            key={index}
            className={`flex items-center p-3 rounded-lg ${
              index === currentStep && isProcessing
                ? "bg-lh-orange/30 border-l-4 border-lh-orange"
                : "bg-gray-700/30"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="mr-3">
              {index < currentStep || !isProcessing ? "✅" : "⏳"}
            </span>
            <span className={index === currentStep && isProcessing ? "text-lh-orange" : "text-gray-300"}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
      
      {enhancedPrompt && (
        <motion.div
          className="mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="font-medium text-purple-300 mb-2">Resultado Final:</h4>
          <p className="text-gray-200 whitespace-pre-wrap">{enhancedPrompt}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProcessViewer;