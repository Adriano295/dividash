// ══════════════════════════════════════════════════════
//  DiviDash Pro — Netlify Function (Proxy Claude API)
//  Arquivo: netlify/functions/claude.js
//
//  Esta função roda no servidor da Netlify e faz a
//  chamada para a Claude API sem expor sua chave no front.
//
//  SETUP:
//  1. Faça deploy no Netlify normalmente
//  2. Vá em: Site Settings → Environment Variables
//  3. Adicione a variável: ANTHROPIC_API_KEY = sk-ant-...
//  4. Redeploy — pronto!
// ══════════════════════════════════════════════════════

exports.handler = async (event) => {
  // Só aceita POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'ANTHROPIC_API_KEY não configurada. Vá em Netlify → Site Settings → Environment Variables e adicione a chave.'
      })
    };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro interno: ' + err.message }),
    };
  }
};
