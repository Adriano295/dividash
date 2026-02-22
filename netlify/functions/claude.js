// ══════════════════════════════════════════════════════
//  DiviDash Pro — Netlify Function (Proxy GOOGLE GEMINI)
//  Arquivo: netlify/functions/claude.js
// ══════════════════════════════════════════════════════

exports.handler = async (event) => {
  // Apenas aceitar POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  // Verificar se a API Key está configurada
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('❌ GOOGLE_API_KEY não configurada no Netlify');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: 'GOOGLE_API_KEY não configurada no Netlify. Configure em Site settings > Environment variables.' 
      })
    };
  }

  try {
    // Parse do body
    const body = JSON.parse(event.body);
    const userPrompt = body.messages?.[body.messages.length - 1]?.content;

    if (!userPrompt) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Mensagem vazia ou inválida' })
      };
    }

    console.log('📤 Enviando requisição para Gemini API...');

    // Chamar API do Gemini (endpoint correto v1)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: userPrompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        })
      }
    );

    // Verificar se a resposta está OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro da API Gemini:', response.status, errorText);
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: `Erro da API Gemini (${response.status})`,
          details: errorText 
        })
      };
    }

    const data = await response.json();
    console.log('✅ Resposta recebida do Gemini');

    // Verificar se a resposta tem o formato esperado
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      console.error('❌ Formato de resposta inválido:', JSON.stringify(data));
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: 'Resposta da API Gemini em formato inesperado',
          raw: data 
        })
      };
    }

    // Extrair texto da resposta
    const aiText = data.candidates[0].content.parts[0].text;

    // Retornar no formato que o app espera (compatível com Claude)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        content: [{ text: aiText }]
      })
    };

  } catch (err) {
    console.error('❌ Erro na função:', err.message, err.stack);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: 'Erro interno no servidor', 
        message: err.message 
      })
    };
  }
};
