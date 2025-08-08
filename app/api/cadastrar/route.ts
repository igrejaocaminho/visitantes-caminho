import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const response = await fetch('https://backend.botconversa.com.br/api/v1/webhook/subscriber/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-KEY': '01f72b1f-f453-4aa7-969e-c66866a7db6a',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json({ error: err.detail || 'Erro desconhecido' }, { status: response.status });
    }

    const json = await response.json();
    return NextResponse.json(json);

  } catch (error) {
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
