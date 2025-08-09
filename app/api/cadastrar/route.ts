import { NextResponse } from 'next/server';

const API_BASE = 'https://backend.botconversa.com.br/api/v1/webhook';
const API_KEY = '01f72b1f-f453-4aa7-969e-c66866a7db6a';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Criar subscriber
    const createResponse = await fetch(`${API_BASE}/subscriber/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-KEY': API_KEY,
      },
      body: JSON.stringify(data),
    });

    if (!createResponse.ok) {
      const err = await createResponse.json();
      return NextResponse.json({ error: err.detail || 'Erro ao criar subscriber' }, { status: createResponse.status });
    }

    // 2. Buscar subscriber pelo telefone
    const phone = encodeURIComponent(data.phone);
    const getResponse = await fetch(`${API_BASE}/subscriber/get_by_phone/${phone}/`, {
      headers: {
        'API-KEY': API_KEY,
      },
    });

    if (!getResponse.ok) {
      const err = await getResponse.json();
      return NextResponse.json({ error: err.detail || 'Erro ao buscar subscriber pelo telefone' }, { status: getResponse.status });
    }

    const subscriberData = await getResponse.json();
    const subscriberId = subscriberData.id;

    if (!subscriberId) {
      return NextResponse.json({ error: 'ID do subscriber não encontrado' }, { status: 500 });
    }

    // 3. Enviar etiquetas (tags)

    const tags = [];

    if (data.sexo) tags.push(data.sexo);
    if (data.idade) tags.push(data.idade);
    if (data.culto_visita) tags.push(data.culto_visita);

    for (const tagId of tags) {
      const tagResponse = await fetch(`${API_BASE}/subscriber/${subscriberId}/tags/${tagId}/`, {
        method: 'POST',
        headers: {
          'API-KEY': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (!tagResponse.ok) {
        const err = await tagResponse.json();
        // Loga erro mas não interrompe o loop para tentar enviar as outras tags
        console.error(`Erro ao enviar tag ${tagId} para subscriber ${subscriberId}:`, err);
      }
    }

    return NextResponse.json({
      message: 'Subscriber criado, ID obtido e etiquetas enviadas com sucesso',
      subscriberId,
    });

  } catch (error) {
    console.error('Erro no backend:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
