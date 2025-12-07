"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedBrain from './AnimatedBrain';
import ProcessViewer from './ProcessViewer';
import LosHermanosLogo from './LosHermanosLogo';
import AnimatedTitle from './AnimatedTitle';

const PromptEnhancer = () => {
  const [initialPrompt, setInitialPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('x-ai/grok-4.1-fast:free');
  const [isProcessing, setIsProcessing] = useState(false);

  const models = [
    { value: 'x-ai/grok-4.1-fast:free', label: 'Grok 4.1 Fast (Free)' },
    { value: 'tngtech/deepseek-r1t2-chimera:free', label: 'DeepSeek R1T2 Chimera (Free)' },
    { value: 'kwaipilot/kat-coder-pro:free', label: 'KAT Coder Pro (Free)' },
    { value: 'z-ai/glm-4.5-air:free', label: 'GLM 4.5 Air (Free)' }
  ];

  const enhancePrompt = async () => {
    if (!initialPrompt.trim()) {
      toast.error('Por favor, insira um prompt inicial para aprimorar.');
      return;
    }

    setIsProcessing(true);
    setEnhancedPrompt('');
    toast.info('Processando seu prompt...');

    try {
      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: initialPrompt,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao aprimorar o prompt');
      }

      const data = await response.json();
      setEnhancedPrompt(data.enhancedPrompt);
      toast.success('Prompt aprimorado com sucesso!');
    } catch (error: unknown) {
      console.error('Error enhancing prompt:', error);
      if (error instanceof Error) {
        toast.error(`Erro: ${error.message}`);
      } else {
        toast.error('Ocorreu um erro desconhecido');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (!enhancedPrompt) return;
    
    navigator.clipboard.writeText(enhancedPrompt);
    toast.success('Prompt copiado para a área de transferência!');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-6">
        <LosHermanosLogo />
        <AnimatedTitle />

        <div className="flex justify-center my-8">
          <AnimatedBrain isThinking={isProcessing} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="initial-prompt" className="text-sm font-medium text-gray-300">
                Prompt Inicial
              </label>
              <Textarea
                id="initial-prompt"
                placeholder="Digite seu prompt aqui..."
                value={initialPrompt}
                onChange={(e) => setInitialPrompt(e.target.value)}
                className="min-h-[200px] resize-none bg-gray-800/50 border-gray-700 text-gray-100 focus:ring-2 focus:ring-lh-orange focus:border-transparent rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="model-select" className="text-sm font-medium text-gray-300">
                Modelo de Aprimoramento
              </label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-gray-100 focus:ring-2 focus:ring-lh-orange rounded-xl">
                  <SelectValue placeholder="Selecione um modelo" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {models.map((model) => (
                    <SelectItem 
                      key={model.value} 
                      value={model.value}
                      className="text-gray-100 hover:bg-gray-700"
                    >
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={enhancePrompt} 
              disabled={isProcessing}
              className="w-full bg-lh-orange hover:bg-lh-orange/90 text-gray-900 font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Aprimorar Prompt
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="enhanced-prompt" className="text-sm font-medium text-gray-300">
                  Prompt Aprimorado
                </label>
                {enhancedPrompt && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={copyToClipboard}
                    className="border-lh-orange text-lh-orange hover:bg-lh-orange/10 rounded-lg"
                  >
                    Copiar
                  </Button>
                )}
              </div>
              <Textarea
                id="enhanced-prompt"
                value={enhancedPrompt}
                readOnly
                placeholder="O prompt aprimorado aparecerá aqui..."
                className="min-h-[200px] resize-none bg-gray-800/50 border-gray-700 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <ProcessViewer isProcessing={isProcessing} enhancedPrompt={enhancedPrompt} />
    </div>
  );
};

export default PromptEnhancer;