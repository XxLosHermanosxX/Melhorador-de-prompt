import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, model } = await request.json();

    if (!prompt || !model) {
      return NextResponse.json(
        { error: 'Prompt e modelo são obrigatórios' },
        { status: 400 }
      );
    }

    // System prompt para aprimorar o prompt do usuário
    const systemPrompt = `Você é um especialista em engenharia de prompt de nível mundial. Sua tarefa é aprimorar o prompt fornecido pelo usuário, tornando-o mais detalhado, específico e eficaz. O aprimoramento deve seguir rigorosamente as melhores práticas de prompting, como a inclusão de um Papel (Role), uma Tarefa (Task) clara, Restrições/Regras e um Formato de Saída definido. O prompt a ser aprimorado é: ${prompt}`;

    // Usando a chave de API diretamente para testes
    const OPENROUTER_API_KEY = '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';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://dyad.sh',
        'X-Title': 'Prompt Enhancer',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: 'Aprimore este prompt seguindo as melhores práticas de engenharia de prompts.',
          },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json(
        { error: `Erro ao chamar a API do OpenRouter: ${errorData}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    const enhancedPrompt = data.choices[0]?.message?.content || 'Não foi possível gerar o prompt aprimorado.';

    return NextResponse.json({
      enhancedPrompt: enhancedPrompt.trim(),
    });

  } catch (error: unknown) {
    console.error('Error in enhance-prompt API:', error);
    // Verificar se é um erro do JavaScript com mensagem
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Erro interno do servidor: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Erro interno do servidor desconhecido' },
      { status: 500 }
    );
  }
}