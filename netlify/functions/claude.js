// ══════════════════════════════════════════════════════
//  DiviDash Pro — Netlify Function (Proxy GOOGLE GEMINI)
//  Arquivo: netlify/functions/claude.js
//
//  ⚠️ NOME DO ARQUIVO OBRIGATÓRIO: claude.js
//     O app.js chama /.netlify/functions/claude
//     O nome do arquivo define o endpoint!
// ══════════════════════════════════════════════════════

// Headers CORS centralizados — usados em TODAS as respostas
const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async (event) => {

  // ── FIX 1: Handler de CORS Preflight (OPTIONS) ──────────────
  // Browsers modernos enviam uma requisição OPTIONS antes do POST.
  // Sem isso, o fetch falha com erro de CORS antes de chegar no Gemini.
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  // Apenas aceitar POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Verificar se a API Key está configurada no Netlify
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('❌ GOOGLE_API_KEY não configurada');
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'GOOGLE_API_KEY não encontrada. Acesse o painel do Netlify → Site Settings → Environment Variables e adicione a variável GOOGLE_API_KEY com sua chave.'
      })
    };
  }

  try {
    // Parse do body enviado pelo app.js
    const body = JSON.parse(event.body);

    // O app.js envia { messages: [{ role: "user", content: "..." }] }
    // Pegamos o conteúdo da última mensagem para enviar ao Gemini
    const userPrompt = body.messages?.[body.messages.length - 1]?.content;

    if (!userPrompt) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Mensagem vazia ou inválida' })
      };
    }

    console.log('📤 Enviando para Gemini API...');

    // ── FIX 2: maxOutputTokens aumentado para 2000 ───────────────
    // O Assessor de Aporte gera JSON grande — 1000 tokens truncava
    // a resposta no meio, causando JSON.parse() a falhar no app.js.
    const geminiResponse = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: userPrompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
          }
        })
      }
    );

    // Verificar se a resposta está OK
    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('❌ Erro Gemini:', geminiResponse.status, errorText);
      return {
        statusCode: geminiResponse.status,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: `Erro da API Gemini (${geminiResponse.status})`,
          details: errorText
        })
      };
    }

    const data = await geminiResponse.json();
    console.log('✅ Resposta recebida do Gemini');

    // Verificar formato da resposta
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      console.error('❌ Formato inesperado:', JSON.stringify(data));
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: 'Resposta do Gemini em formato inesperado',
          raw: data
        })
      };
    }

    const aiText = data.candidates[0].content.parts[0].text;

    // ── Retornar no formato que o app.js espera ─────────────────
    // app.js lê: data.content?.map(b => b.text || '').join('')
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        content: [{ text: aiText }]
      })
    };

  } catch (err) {
    console.error('❌ Erro interno:', err.message, err.stack);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'Erro interno no servidor',
        message: err.message
      })
    };
  }
};
