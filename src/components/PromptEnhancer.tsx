"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

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
      // Verificar se é um erro do JavaScript com mensagem
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Prompt Enhancer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Aprimore seus prompts com IA para obter resultados de alta qualidade
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="initial-prompt" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Prompt Inicial
            </label>
            <Textarea
              id="initial-prompt"
              placeholder="Digite seu prompt aqui..."
              value={initialPrompt}
              onChange={(e) => setInitialPrompt(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="model-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Modelo de Aprimoramento
            </label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um modelo" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={enhancePrompt} 
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Aprimorando...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Aprimorar Prompt
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="enhanced-prompt" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Prompt Aprimorado
              </label>
              {enhancedPrompt && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={copyToClipboard}
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
              className="min-h-[200px] resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptEnhancer;