import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Obter as variáveis de ambiente do servidor
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;

    if (!endpoint || !apiKey) {
      return NextResponse.json(
        { error: 'Configuração da API incompleta' },
        { status: 500 }
      );
    }

    // Fazer a solicitação para a API Azure
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages: messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
        max_tokens: 1000,
        temperature: 0.7,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 0.95,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro na API Azure:', response.status, errorData);
      return NextResponse.json(
        { error: `Erro na API: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao processar solicitação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 