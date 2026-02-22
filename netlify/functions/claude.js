/* ══ CLAUDE API: Análise de Ativo Individual ══ */
async function analisarAtivoComClaude(ticker, d) {
  const isFundo = d && (d.tipo === 'FII' || d.tipo === 'FIAGRO');
  const perfilLabel = { conservador:'Conservador', moderado:'Moderado', arrojado:'Arrojado' }[perfil];

  let contextoAtivo = '';
  if (d) {
    contextoAtivo = isFundo
      ? `TIPO: ${d.tipo} | SETOR: ${d.setor}
Rendimento Mensal (DY): ${d.dy}% a.a.
P/VP: ${d.pvp}x (${d.pvp < 1 ? 'abaixo do patrimonial = desconto' : 'acima do patrimonial = prêmio'})
Isenção IR (PF): ${d.isentoIR ? 'SIM — rendimentos isentos para pessoa física' : 'NÃO'}
Liquidez na B3: ${d.liquidez}
Distribuição: ${d.payout}% (obrigatório por lei)
Preço atual de referência: R$ ${d.preco}
Descrição: ${d.desc}`
      : `TIPO: Ação | SETOR: ${d.setor}
Dividend Yield (DY): ${d.dy}% a.a.
Payout: ${d.payout}% do lucro distribuído
ROE (Retorno sobre Patrimônio): ${d.roe}%
Dívida/EBITDA: ${d.divida === 0 ? 'N/A (setor bancário — dívida estrutural)' : d.divida + 'x'}
P/VP: ${d.pvp}x
Preço atual de referência: R$ ${d.preco}
Descrição: ${d.desc}`;
  } else {
    contextoAtivo = `Ativo ${ticker} não encontrado na base local. Analise com base no seu conhecimento sobre este ativo na bolsa brasileira B3.`;
  }

  const prompt = `Você é um assessor especialista em investimentos de dividendos na bolsa brasileira (B3), focado em renda passiva e análise fundamentalista. Analise o ativo abaixo de forma profissional, direta e em português brasileiro.

ATIVO: ${ticker} ${d ? '— ' + d.nome : ''}
${contextoAtivo}

CONTEXTO MACROECONÔMICO ATUAL:
- SELIC: ${taxaSelic.toFixed(2)}% a.a.
- CDI: ${taxaCdi.toFixed(2)}% a.a.
- IPCA (12m): ${taxaIpca.toFixed(2)}%
- Juro Real: ${(taxaSelic - taxaIpca).toFixed(2)}%

PERFIL DO INVESTIDOR: ${perfilLabel}

Responda em EXATAMENTE este formato (use os títulos em maiúsculas):

O QUE É ESSE ATIVO
[2-3 frases sobre o que a empresa/fundo faz, seu modelo de negócio e posição no mercado]

OS PROVENTOS SÃO ATRATIVOS?
[Avalie o DY/rendimento considerando a Selic atual. O ativo compensa vs renda fixa? Histórico de consistência é importante?]

${isFundo ? 'QUALIDADE E PRECIFICAÇÃO DO FUNDO' : 'A EMPRESA É FINANCEIRAMENTE SAUDÁVEL?'}
[Para ações: comente ROE, payout, dívida e P/VP. Para FIIs: comente P/VP, liquidez, qualidade dos ativos/contratos]

OPORTUNIDADES REAIS AGORA
[3 motivos concretos para considerar comprar agora, com base nos dados e contexto macro]

RISCOS QUE VOCÊ PRECISA CONHECER
[3 riscos reais e específicos deste ativo — não genéricos. Seja honesto.]

VEREDICTO PARA PERFIL ${perfilLabel.toUpperCase()}
[Recomendação clara: Comprar / Monitorar / Evitar — com justificativa de 2-3 frases. Sugira peso máximo na carteira se for o caso.]

⚠ Lembre: dados de referência podem ter defasagem. Confirme sempre no Status Invest e Funds Explorer antes de operar.`;

  try {
    console.log('📤 Enviando requisição para função Netlify...');
    
    const response = await fetch('/.netlify/functions/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }]
        // Não enviamos model e max_tokens - a função decide
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Erro na resposta:', response.status, errorData);
      throw new Error(`Claude API error: ${response.status} - ${errorData.error || ''}`);
    }
    
    const data = await response.json();
    console.log('✅ Resposta recebida com sucesso');
    
    const text = data.content?.map(b => b.text || '').join('').trim();
    if (!text) throw new Error('Resposta vazia da Claude API');
    
    return text;
    
  } catch (error) {
    console.error('❌ Erro na função analisarAtivoComClaude:', error);
    throw error; // Propaga o erro para o fallback
  }
}
