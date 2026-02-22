// ══════════════════════════════════════════════════════
//  DiviDash Pro — Netlify Function (Proxy GOOGLE GEMINI)
//  Arquivo: netlify/functions/claude.js
// ══════════════════════════════════════════════════════

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GOOGLE_API_KEY não configurada no Netlify.' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const userPrompt = body.messages[body.messages.length - 1].content;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }]
      }),
    });

    const data = await response.json();
    
    // Traduzindo a resposta do Gemini para o formato que seu app já entende
    const aiText = data.candidates[0].content.parts[0].text;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        content: [{ text: aiText }]
      }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro no Gemini: ' + err.message }),
    };
  }
};
