'use strict';
/* ════════════════════════════════════════════════
   DiviDash Pro — app.js
   v4.0 | Desktop + Mobile | P&L Carteira | Oportunidades
════════════════════════════════════════════════ */

/* ══════════════════════════════════════════
   BASE DE DADOS COMPLETA
══════════════════════════════════════════ */
const ATIVOS = {
  /* ── ENERGIA ── */
  TAEE11: { nome:'Taesa',           tipo:'Ação', setor:'Energia',         dy:9.8,  payout:95,  roe:22, divida:2.6, pvp:1.4,  preco:11.20, desc:'Transmissora de energia elétrica com contratos de longo prazo regulados pela ANEEL. Uma das maiores pagadoras de dividendos do Brasil.' },
  EGIE3:  { nome:'Engie Brasil',    tipo:'Ação', setor:'Energia',         dy:7.2,  payout:100, roe:24, divida:1.8, pvp:2.1,  preco:45.80, desc:'Geradora de energia renovável (hidro, eólica, solar). Excelente histórico de dividendos e gestão eficiente.' },
  CPFE3:  { nome:'CPFL Energia',    tipo:'Ação', setor:'Energia',         dy:6.5,  payout:82,  roe:20, divida:3.1, pvp:2.8,  preco:37.40, desc:'Distribuidora e geradora de energia com forte presença no interior de São Paulo.' },
  ENGI11: { nome:'Energisa',        tipo:'Ação', setor:'Energia',         dy:5.8,  payout:65,  roe:16, divida:3.8, pvp:1.9,  preco:42.10, desc:'Maior grupo de distribuição de energia privado do Brasil. Em fase de expansão.' },
  CMIG4:  { nome:'Cemig PN',        tipo:'Ação', setor:'Energia',         dy:10.5, payout:80,  roe:18, divida:2.2, pvp:0.9,  preco:7.80,  desc:'Companhia energética de Minas Gerais. Histórico longo de dividendos, mas com risco político por ser estatal.' },
  TRPL4:  { nome:'Cteep PN',        tipo:'Ação', setor:'Energia',         dy:8.8,  payout:85,  roe:16, divida:1.9, pvp:1.3,  preco:24.50, desc:'Maior transmissora privada de energia do Brasil. Receita regulada pela ANEEL. Perfil muito defensivo.' },
  EQTL3:  { nome:'Equatorial',      tipo:'Ação', setor:'Energia',         dy:4.2,  payout:40,  roe:18, divida:3.8, pvp:2.4,  preco:28.30, desc:'Distribuidora com foco em turnaround de concessões. Alta dívida por expansão, mas execução impecável.' },
  CPLE6:  { nome:'Copel',           tipo:'Ação', setor:'Energia',         dy:7.5,  payout:70,  roe:14, divida:2.0, pvp:1.0,  preco:10.90, desc:'Companhia Paranaense de Energia, recentemente privatizada. Privatização deve elevar eficiência e dividendos.' },
  /* ── BANCOS ── */
  BBAS3:  { nome:'Banco do Brasil', tipo:'Ação', setor:'Bancos',          dy:8.5,  payout:40,  roe:20, divida:0,   pvp:0.8,  preco:28.70, desc:'Banco público com forte rentabilidade e histórico de dividendos generosos. Negocia com desconto em relação aos pares privados.' },
  ITUB4:  { nome:'Itaú Unibanco',   tipo:'Ação', setor:'Bancos',          dy:5.2,  payout:55,  roe:22, divida:0,   pvp:1.9,  preco:36.80, desc:'Maior banco privado da América Latina. Consistência absoluta em lucros e dividendos.' },
  BBDC4:  { nome:'Bradesco',        tipo:'Ação', setor:'Bancos',          dy:4.8,  payout:45,  roe:14, divida:0,   pvp:1.1,  preco:15.40, desc:'Segunda maior instituição financeira privada. ROE em recuperação após reestruturação.' },
  SANB11: { nome:'Santander BR',    tipo:'Ação', setor:'Bancos',          dy:6.8,  payout:60,  roe:16, divida:0,   pvp:1.5,  preco:34.20, desc:'Subsidiária do Santander espanhol. Dividendos trimestrais regulares, boa eficiência operacional.' },
  ABCB4:  { nome:'ABC Brasil',      tipo:'Ação', setor:'Bancos',          dy:7.2,  payout:45,  roe:13, divida:0,   pvp:0.9,  preco:20.10, desc:'Banco médio focado em crédito corporativo. DY atrativo e gestão conservadora.' },
  BMGB4:  { nome:'Banco BMG',       tipo:'Ação', setor:'Bancos',          dy:9.8,  payout:70,  roe:11, divida:0,   pvp:0.6,  preco:4.20,  desc:'Banco especializado em crédito consignado. DY alto mas ROE em recuperação.' },
  /* ── SANEAMENTO ── */
  SAPR11: { nome:'Sanepar',         tipo:'Ação', setor:'Saneamento',      dy:7.4,  payout:50,  roe:14, divida:2.2, pvp:1.2,  preco:25.40, desc:'Companhia de saneamento do Paraná. Concessão de longo prazo, receita previsível e crescente.' },
  CSMG3:  { nome:'Copasa',          tipo:'Ação', setor:'Saneamento',      dy:6.9,  payout:55,  roe:12, divida:2.0, pvp:0.9,  preco:19.80, desc:'Saneamento de Minas Gerais. Gestão conservadora, boa relação entre risco e retorno.' },
  SBSP3:  { nome:'Sabesp',          tipo:'Ação', setor:'Saneamento',      dy:3.8,  payout:35,  roe:10, divida:3.5, pvp:1.1,  preco:78.50, desc:'Maior empresa de saneamento da América Latina. Recentemente privatizada, dividendos em crescimento.' },
  /* ── TELECOM / SEGUROS ── */
  VIVT3:  { nome:'Vivo/Telefônica', tipo:'Ação', setor:'Telecom/Seguros', dy:6.0,  payout:90,  roe:15, divida:0.8, pvp:2.2,  preco:51.30, desc:'Maior operadora de telecom do Brasil. Dividendos semestrais e crescimento em fibra e 5G.' },
  TIMS3:  { nome:'TIM Brasil',      tipo:'Ação', setor:'Telecom/Seguros', dy:4.5,  payout:60,  roe:10, divida:1.2, pvp:1.4,  preco:17.80, desc:'Segunda maior operadora em usuários. Reestruturação após aquisição da Oi Móvel.' },
  BBSE3:  { nome:'BB Seguridade',   tipo:'Ação', setor:'Telecom/Seguros', dy:8.8,  payout:88,  roe:45, divida:0,   pvp:3.2,  preco:33.60, desc:'Holding de seguros do Banco do Brasil. ROE extraordinário, dividendos muito generosos, modelo asset-light.' },
  PSSA3:  { nome:'Porto Seguro',    tipo:'Ação', setor:'Telecom/Seguros', dy:5.5,  payout:60,  roe:16, divida:0.3, pvp:2.0,  preco:42.70, desc:'Uma das maiores seguradoras do Brasil. Diversificação crescente em saúde, financeiro e serviços.' },
  /* ── PETRÓLEO & GÁS ── */
  PETR4:  { nome:'Petrobras PN',    tipo:'Ação', setor:'Petróleo & Gás',  dy:15.0, payout:45,  roe:30, divida:1.5, pvp:1.1,  preco:37.40, desc:'Segunda maior distribuidora de dividendos do Brasil. Atenção ao risco político e à política de dividendos.' },
  PETR3:  { nome:'Petrobras ON',    tipo:'Ação', setor:'Petróleo & Gás',  dy:14.5, payout:45,  roe:30, divida:1.5, pvp:1.1,  preco:38.10, desc:'Ação ordinária da Petrobras. Mesmos fundamentos da PETR4, com direito a voto.' },
  PRIO3:  { nome:'PRIO (PetroRio)', tipo:'Ação', setor:'Petróleo & Gás',  dy:3.2,  payout:20,  roe:35, divida:1.8, pvp:2.2,  preco:48.90, desc:'Maior produtora independente de petróleo do Brasil. Alta eficiência e baixo custo de extração.' },
  /* ── MINERAÇÃO / CELULOSE ── */
  VALE3:  { nome:'Vale',            tipo:'Ação', setor:'Mineração',       dy:9.5,  payout:60,  roe:25, divida:0.9, pvp:0.9,  preco:62.40, desc:'Maior mineradora de minério de ferro e níquel do mundo. Dividendos extraordinários frequentes mas cíclicos.' },
  SUZB3:  { nome:'Suzano',          tipo:'Ação', setor:'Celulose/Papel',  dy:3.2,  payout:30,  roe:20, divida:4.1, pvp:2.1,  preco:54.80, desc:'Maior produtora de celulose de eucalipto do mundo. Beneficiada pelo câmbio e demanda global de papel.' },
  KLBN11: { nome:'Klabin',          tipo:'Ação', setor:'Celulose/Papel',  dy:4.8,  payout:55,  roe:12, divida:3.8, pvp:1.6,  preco:22.30, desc:'Maior produtora e exportadora de papel e embalagens do Brasil. Integração vertical e portfólio diversificado de celulose, papéis e embalagens. Investe em expansão com projetos Puma II.' },
  /* ── AGRONEGÓCIO ── */
  AGRO3:  { nome:'BrasilAgro',      tipo:'Ação', setor:'Agronegócio',     dy:8.0,  payout:80,  roe:18, divida:0.8, pvp:1.1,  preco:23.80, desc:'Empresa de aquisição, desenvolvimento e venda de terras agrícolas. Combina renda de arrendamento com ganho de capital.' },
  SLCE3:  { nome:'SLC Agrícola',    tipo:'Ação', setor:'Agronegócio',     dy:5.5,  payout:55,  roe:22, divida:1.2, pvp:1.4,  preco:38.20, desc:'Uma das maiores produtoras de soja, milho e algodão do Brasil. Gestão profissional e escala operacional.' },
  SMTO3:  { nome:'São Martinho',    tipo:'Ação', setor:'Agronegócio',     dy:4.8,  payout:50,  roe:19, divida:2.1, pvp:1.3,  preco:27.60, desc:'Maior produtora individual de açúcar e etanol do mundo. Beneficiada pelo crescimento do etanol.' },
  JALL3:  { nome:'Jalles Machado',  tipo:'Ação', setor:'Agronegócio',     dy:6.5,  payout:65,  roe:17, divida:1.8, pvp:1.1,  preco:9.40,  desc:'Usina sucroalcooleira com foco em sustentabilidade e bioenergia. Boa distribuição e exposição ao etanol.' },
  CAML3:  { nome:'Camil Alimentos', tipo:'Ação', setor:'Agronegócio',     dy:5.2,  payout:58,  roe:14, divida:2.8, pvp:1.0,  preco:8.70,  desc:'Líder em arroz e feijão no Brasil. Marcas consolidadas e expansão na América do Sul.' },
  TGMA3:  { nome:'Tegma',           tipo:'Ação', setor:'Logística',       dy:7.8,  payout:80,  roe:25, divida:0.4, pvp:3.2,  preco:24.10, desc:'Logística de veículos. Alta eficiência operacional e boa distribuição de dividendos.' },
  /* ── INDÚSTRIA / OUTROS ── */
  WEGE3:  { nome:'WEG',             tipo:'Ação', setor:'Indústria',       dy:1.8,  payout:35,  roe:30, divida:0,   pvp:8.5,  preco:44.30, desc:'Uma das melhores empresas do Brasil. Motores e equipamentos elétricos. Crescimento global consistente. DY baixo mas LPA cresce forte.' },
  MULT3:  { nome:'Multiplan',       tipo:'Ação', setor:'Shopping',        dy:4.2,  payout:60,  roe:12, divida:2.1, pvp:1.8,  preco:27.80, desc:'Desenvolvedora de shoppings premium. Qualidade dos ativos e histórico consistente de dividendos.' },
  /* ── FIIs — PAPEL (CRI) ── */
  MXRF11: { nome:'Maxi Renda',        tipo:'FII', setor:'FII - Papel (CRI)',  dy:12.1, payout:95, roe:null, divida:null, pvp:0.95, isentoIR:true, liquidez:'Alta',  preco:9.85,  desc:'FII de papel (CRI) com carteira diversificada de recebíveis imobiliários. Distribuição mensal com foco em alta renda.' },
  KNCR11: { nome:'Kinea Rendimentos',  tipo:'FII', setor:'FII - Papel (CRI)',  dy:11.4, payout:95, roe:null, divida:null, pvp:0.99, isentoIR:true, liquidez:'Alta',  preco:98.20, desc:'FII de CRIs pós-fixados (CDI+), protegido de altas de juros. Portfólio conservador com devedores de alta qualidade.' },
  IRDM11: { nome:'Iridium Recebíveis', tipo:'FII', setor:'FII - Papel (CRI)',  dy:13.0, payout:95, roe:null, divida:null, pvp:0.92, isentoIR:true, liquidez:'Alta',  preco:102.40, desc:'FII de papel com foco em CRIs de alto rendimento. Gestão ativa da carteira.' },
  /* ── FIIs — LOGÍSTICA ── */
  HGLG11: { nome:'CSHG Logística',    tipo:'FII', setor:'FII - Logística',    dy:8.2,  payout:95, roe:null, divida:null, pvp:1.05, isentoIR:true, liquidez:'Alta',  preco:158.40, desc:'Um dos maiores FIIs de galpões logísticos do Brasil. Amazon, Magazine Luiza entre os inquilinos.' },
  BRCO11: { nome:'Bresco Logística',  tipo:'FII', setor:'FII - Logística',    dy:7.8,  payout:95, roe:null, divida:null, pvp:1.02, isentoIR:true, liquidez:'Média', preco:106.80, desc:'FII com galpões de alto padrão (Classe A) em localizações estratégicas. Contratos longos.' },
  /* ── FIIs — SHOPPING ── */
  XPML11: { nome:'XP Malls',          tipo:'FII', setor:'FII - Shopping',     dy:9.1,  payout:95, roe:null, divida:null, pvp:0.98, isentoIR:true, liquidez:'Alta',  preco:108.50, desc:'FII de shoppings gerido pela XP. Portfólio com shoppings premium em São Paulo.' },
  VISC11: { nome:'Vinci Shoppings',   tipo:'FII', setor:'FII - Shopping',     dy:8.8,  payout:95, roe:null, divida:null, pvp:0.97, isentoIR:true, liquidez:'Alta',  preco:114.20, desc:'FII de shoppings com portfólio de 22 centros comerciais em 12 estados.' },
  /* ── FIIs — LAJES / HÍBRIDO / FoF ── */
  KNRI11: { nome:'Kinea Renda Imob',  tipo:'FII', setor:'FII - Híbrido',      dy:7.5,  payout:95, roe:null, divida:null, pvp:1.10, isentoIR:true, liquidez:'Alta',  preco:172.30, desc:'FII híbrido (lajes + galpões) gerido pela Kinea. Um dos mais tradicionais do mercado.' },
  PVBI11: { nome:'VBI Prime Props',   tipo:'FII', setor:'FII - Lajes',        dy:7.2,  payout:95, roe:null, divida:null, pvp:0.88, isentoIR:true, liquidez:'Média', preco:91.40,  desc:'FII de lajes corporativas com imóveis triple A em São Paulo.' },
  BCFF11: { nome:'BTG FoF',           tipo:'FII', setor:'FII - FoF',          dy:10.5, payout:95, roe:null, divida:null, pvp:0.93, isentoIR:true, liquidez:'Alta',  preco:68.30,  desc:'Fundo de Fundos do BTG com participação em mais de 30 FIIs.' },
  RBRF11: { nome:'RBR Alpha',         tipo:'FII', setor:'FII - FoF',          dy:9.8,  payout:95, roe:null, divida:null, pvp:0.91, isentoIR:true, liquidez:'Média', preco:80.60,  desc:'Fundo de Fundos focado em FIIs com desconto sobre o valor patrimonial.' },
  /* ── FIAGROs ── */
  RURA11: { nome:'Kinea FI-AGRO',     tipo:'FIAGRO', setor:'FIAGRO - CRA',    dy:13.5, payout:95, roe:null, divida:null, pvp:0.97, isentoIR:true, liquidez:'Média', preco:10.20, desc:'FIAGRO de papel com CRAs do agronegócio. Rendimentos mensais isentos de IR.' },
  HCTR11: { nome:'Hectare CE',        tipo:'FIAGRO', setor:'FIAGRO - CRA',    dy:14.2, payout:95, roe:null, divida:null, pvp:0.90, isentoIR:true, liquidez:'Baixa', preco:92.40, desc:'FIAGRO focado em CRAs de médio e alto risco/retorno. Alto rendimento isento.' },
  EGAF11: { nome:'Itaú Asset AGRO',   tipo:'FIAGRO', setor:'FIAGRO - CRA',    dy:12.8, payout:95, roe:null, divida:null, pvp:0.98, isentoIR:true, liquidez:'Média', preco:10.05, desc:'FIAGRO gerido pelo Itaú Asset com carteira conservadora de CRAs.' },
};

const SCOLORS = {
  'Ações':'#f59e0b','FIIs':'#18ffff','FIAGROs':'#1de9b6',
  'Bancos':'#448aff','Energia':'#ffd740','Saneamento':'#00e676',
  'Telecom/Seguros':'#e040fb','Agronegócio':'#84cc16',
  'Petróleo & Gás':'#ff7043','Celulose/Papel':'#1de9b6',
  'Renda Fixa':'#ffab40','Logística':'#64748b','Outros':'#64748b',
  'Indústria':'#ff5252','Shopping':'#a78bfa','Mineração':'#00bcd4',
};

/* ══════════════════════════════════════════
   NAVEGAÇÃO
══════════════════════════════════════════ */
function nav(el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.bnav-item').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById(el.dataset.section).classList.add('active');
  const bn = document.querySelector(`.bnav-item[data-section="${el.dataset.section}"]`);
  if (bn) bn.classList.add('active');
  closeSidebar();
  window.scrollTo(0, 0);
}
function navBottom(el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.bnav-item').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById(el.dataset.section).classList.add('active');
  const sn = document.querySelector(`.nav-item[data-section="${el.dataset.section}"]`);
  if (sn) sn.classList.add('active');
  window.scrollTo(0, 0);
}
function navTo(section) {
  const el = document.querySelector(`.nav-item[data-section="${section}"]`);
  if (el) nav(el);
}
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

/* ══════════════════════════════════════════
   PERFIL
══════════════════════════════════════════ */
let perfil = 'conservador';
function setProfile(btn) {
  document.querySelectorAll('.pb-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  perfil = btn.dataset.p;
  document.getElementById('sfp-level').textContent =
    { conservador:'Conservador', moderado:'Moderado', arrojado:'Arrojado' }[perfil];
  renderAllocation();
  if (portfolio.length) renderDiagnostico();
}

/* ══════════════════════════════════════════
   TOOLTIP
══════════════════════════════════════════ */
function toggleTip(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const open = el.classList.contains('show');
  document.querySelectorAll('.tooltip-box').forEach(t => t.classList.remove('show'));
  if (!open) el.classList.add('show');
}
document.addEventListener('click', e => {
  if (!e.target.classList.contains('help-dot'))
    document.querySelectorAll('.tooltip-box').forEach(t => t.classList.remove('show'));
});

/* ══════════════════════════════════════════
   TAXAS MACROECONÔMICAS (API BACEN)
══════════════════════════════════════════ */
let taxaSelic = 13.75;
let taxaIpca  = 4.83;
let taxaCdi   = 13.65;

async function fetchMacros() {
  try {
    const r = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json');
    if (r.ok) { const d = await r.json(); taxaSelic = parseFloat(d[0].valor); taxaCdi = taxaSelic - 0.10; }
  } catch(e) {}
  try {
    const r = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/1?formato=json');
    if (r.ok) { const d = await r.json(); taxaIpca = parseFloat(d[0].valor); }
  } catch(e) {}
  atualizarUITaxas();
}

function atualizarUITaxas() {
  const sf = taxaSelic.toFixed(2) + '%';
  const cf = taxaCdi.toFixed(2) + '%';
  const ipf = taxaIpca.toFixed(2) + '%';
  const els = {
    'm-selic': sf, 'm-cdi': cf, 'm-ipca': ipf,
    'sr-selic': sf, 'sr-cdi': cf, 'sr-ipca': ipf,
    'rf-selic': sf, 'rf-cdi': cf, 'rf-ipca': ipf,
  };
  Object.entries(els).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });
  const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setTxt('cdb-rate',  `100% CDI = ${taxaCdi.toFixed(2)}% a.a.`);
  setTxt('lca-rate',  `90% CDI = ${(taxaCdi * 0.9).toFixed(2)}% (isento IR)`);
  setTxt('lci-rate',  `90% CDI = ${(taxaCdi * 0.9).toFixed(2)}% (isento IR)`);
  setTxt('ipca-rate', `IPCA + 6,5% ≈ ${(taxaIpca + 6.5).toFixed(2)}% a.a.`);
  setTxt('selic-rate',`${taxaSelic.toFixed(2)}% + 0,13%`);
  renderMacroCards();
  calcRF();
}

function renderMacroCards() {
  const el = document.getElementById('macro-cards');
  if (!el) return;
  const cards = [
    { label:'SELIC a.a.',  val:`${taxaSelic.toFixed(2)}%`, color:'var(--green)', desc:'Taxa básica de juros. Benchmark de toda renda fixa.' },
    { label:'CDI a.a.',    val:`${taxaCdi.toFixed(2)}%`,   color:'var(--blue)',  desc:'Taxa interbancária. Referência dos CDBs e LCI/LCA.' },
    { label:'IPCA 12m',    val:`${taxaIpca.toFixed(2)}%`,  color:'var(--gold)',  desc:'Inflação oficial medida pelo IBGE.' },
    { label:'Juro Real',   val:`${(taxaSelic - taxaIpca).toFixed(2)}%`, color:'var(--teal)', desc:'Selic menos IPCA. Ganho real acima da inflação.' },
    { label:'CDB 100% CDI',val:`${taxaCdi.toFixed(2)}%`,   color:'var(--blue)',  desc:'Rendimento bruto de um CDB 100% CDI.' },
    { label:'LCI/LCA 90%', val:`${(taxaCdi * 0.9).toFixed(2)}%`, color:'var(--purple)', desc:'Rendimento LÍQUIDO (isento IR). Supera CDB 100%.' },
  ];
  el.innerHTML = cards.map(c => `
    <div class="macro-big-card">
      <div class="mbc-label">${c.label}</div>
      <div class="mbc-val" style="color:${c.color}">${c.val}</div>
      <div class="mbc-desc">${c.desc}</div>
    </div>`).join('');
}

/* ══════════════════════════════════════════
   ASSESSOR IA
══════════════════════════════════════════ */
function quickAnalyze(ticker) {
  document.getElementById('ai-ticker').value = ticker;
  analisarAtivo();
}
function quickAnalyzeAndGo(ticker) {
  navTo('assessor');
  setTimeout(() => { document.getElementById('ai-ticker').value = ticker; analisarAtivo(); }, 120);
}

async function analisarAtivo() {
  const ticker = document.getElementById('ai-ticker').value.trim().toUpperCase();
  if (!ticker) return;
  document.getElementById('a-empty').style.display   = 'none';
  document.getElementById('a-result').style.display  = 'none';
  document.getElementById('a-loading').style.display = 'block';
  document.getElementById('load-ticker').textContent  = ticker;

  const local = ATIVOS[ticker];

  // Tenta análise via Gemini API (IA real)
  let analise = null;
  try {
    analise = await analisarAtivoComClaude(ticker, local);
  } catch(e) {
    console.warn('Gemini API indisponível, usando análise local:', e);
  }

  // Fallback para análise local se Gemini falhar
  if (!analise) analise = gerarAnaliseTexto(ticker, local);

  document.getElementById('a-loading').style.display = 'none';
  preencherResultado(ticker, local, analise);
}

/* ══ GEMINI API: Análise de Ativo Individual ══ */
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

  const response = await fetch('/.netlify/functions/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gemini-1.5-flash', // Gemini (gerenciado pelo proxy)
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
  const data = await response.json();
  const text = data.content?.map(b => b.text || '').join('').trim();
  if (!text) throw new Error('Resposta vazia da Gemini API');
  return text;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ── Sugestão ticker na carteira ── */
function sugerirAtivo() {
  const val = document.getElementById('pt').value.toUpperCase();
  const box  = document.getElementById('ticker-suggest');
  if (!val || val.length < 2) { box.style.display = 'none'; return; }
  const matches = Object.entries(ATIVOS).filter(([k]) => k.startsWith(val)).slice(0, 6);
  if (!matches.length) { box.style.display = 'none'; return; }
  box.style.display = 'block';
  box.innerHTML = matches.map(([k, d]) =>
    `<div class="ts-item" onclick="preencherAtivo('${k}')">
      <span class="ts-ticker">${k}</span>
      <span class="ts-nome">${d.nome} · ${d.setor}</span>
    </div>`).join('');
  if (ATIVOS[val]) preencherCamposAtivo(val);
}
function preencherAtivo(ticker) {
  document.getElementById('pt').value = ticker;
  document.getElementById('ticker-suggest').style.display = 'none';
  preencherCamposAtivo(ticker);
}
function preencherCamposAtivo(ticker) {
  const d = ATIVOS[ticker]; if (!d) return;
  document.getElementById('pdyv').value    = d.dy;
  document.getElementById('pp-atual').value= d.preco || '';
  const setCat = { 'FII':'FIIs', 'FIAGRO':'FIAGROs' };
  document.getElementById('pset').value    = setCat[d.tipo] || d.setor;
  document.getElementById('dy-hint').textContent = `✓ ${d.nome} · DY ref: ${d.dy}% · Preço ref: R$${d.preco||'N/D'}`;
}
document.addEventListener('click', e => {
  if (!e.target.closest('#ticker-suggest') && e.target.id !== 'pt')
    document.getElementById('ticker-suggest').style.display = 'none';
});

/* ── Geração de análise texto ── */
function gerarAnaliseTexto(ticker, d) {
  if (!d) return `O QUE É ESSE ATIVO\n${ticker} não está na base de dados local.\n\nCOMO PESQUISAR\nAcesse:\n• Status Invest → statusinvest.com.br\n• Funds Explorer → fiis.com.br\n• Investidor 10 → investidor10.com.br\n\nO QUE ANALISAR\nDY histórico 5 anos, Payout (30-80%), ROE (>15%), Dívida/EBITDA (<3x), P/VP (~1x para FIIs).\n\nDICA\nUse "Score de Ativo" no menu para cheklist manual.`;

  const isFundo = d.tipo === 'FII' || d.tipo === 'FIAGRO';
  let dyMsg, payMsg, saudeMsg, recMsg;

  if (isFundo) {
    dyMsg = d.dy < 7 ? `Rendimento de ${d.dy}% está abaixo da média para ${d.tipo}s.`
          : d.dy < 10 ? `Rendimento de ${d.dy}% é bom. A isenção de IR para PF eleva o retorno líquido real.`
          : d.dy < 15 ? `Rendimento de ${d.dy}% é excelente — isento de IR, muito competitivo com CDB/LCI.`
          : `⚠ Rendimento de ${d.dy}% muito alto. Avalie a sustentabilidade.`;
    payMsg = `Distribuição de ${d.payout}% é obrigatória por lei para fundos regulamentados — isso é normal e saudável.`;
    saudeMsg = `P/VP de ${d.pvp}x: ${d.pvp < 1 ? '✅ Fundo com DESCONTO sobre o patrimônio — ótimo ponto de entrada.' : d.pvp <= 1.1 ? '⚡ Próximo do justo.' : '⚠ Com prêmio — exige convicção.'} Liquidez: ${d.liquidez || 'Média'}.`;
    recMsg = perfil === 'conservador'
      ? (d.dy >= 8 && d.pvp <= 1 ? `✅ Para perfil conservador, ${ticker} é interessante. Yield bom + desconto no P/VP.` : `⚡ Para conservador, verifique histórico de 12 meses antes de entrar.`)
      : `✅ Para perfil ${perfil}, ${ticker} gera renda mensal isenta de IR — excelente complemento de carteira.`;
  } else {
    dyMsg = d.dy < 4 ? `DY de ${d.dy}% está abaixo do ideal. Empresa pode estar reinvestindo muito — verifique crescimento do LPA.`
          : d.dy < 6 ? `DY de ${d.dy}% é razoável. Confirme consistência histórica nos últimos 5 anos.`
          : d.dy < 9 ? `DY de ${d.dy}% está na faixa ideal dos grandes pagadores.`
          : d.dy < 14 ? `DY de ${d.dy}% muito alto. Pode ser ciclo especial (commodities) ou armadilha. Analise o payout.`
          : `⚠ DY de ${d.dy}% é extremo. Alta probabilidade de armadilha. Investigue antes de qualquer ação.`;
    payMsg = d.payout > 90 ? `Payout de ${d.payout}% muito alto — risco de corte se o lucro cair. Monitore trimestralmente.`
           : d.payout > 80 ? `Payout de ${d.payout}% alto mas aceitável para empresas maduras de ${d.setor}.`
           : `Payout de ${d.payout}% é saudável — distribui bem e ainda reinveste no crescimento.`;
    saudeMsg = (d.roe >= 15 ? `ROE de ${d.roe}% — alta eficiência. ` : `ROE de ${d.roe}% — ${d.roe >= 10 ? 'razoável, mas abaixo do ideal.' : 'baixo, rentabilidade pressionada.'} `)
             + (d.divida === 0 ? 'Setor bancário — dívida estrutural não se aplica. '
               : d.divida <= 2 ? `Dívida de ${d.divida}x — saudável. `
               : d.divida <= 3 ? `Dívida de ${d.divida}x — atenção. `
               : `Dívida de ${d.divida}x — alta! Com Selic a ${taxaSelic.toFixed(2)}%, pressiona o caixa. `)
             + `P/VP de ${d.pvp}x: ${d.pvp < 1 ? 'potencialmente barata.' : d.pvp <= 3 ? 'avaliação razoável.' : 'avaliação cara.'}`;
    const score = calcVerdictScore(d);
    recMsg = perfil === 'conservador'
      ? (score >= 3 && d.dy >= 5 && d.dy <= 9 ? `✅ Para perfil conservador, ${ticker} é sólido. Setor ${d.setor} oferece previsibilidade.`
        : score >= 2 ? `⚡ Para conservador, entre com cautela (peso 5-8%).`
        : `⚠ Para conservador, prefira Energia ou Saneamento como base antes deste.`)
      : perfil === 'moderado'
      ? (score >= 3 ? `✅ Para moderado, ${ticker} é boa adição. Bom equilíbrio risco/retorno.` : `⚡ Para moderado, controle o peso. Equilibre com defensivos.`)
      : (score >= 2 ? `✅ Para arrojado, ${ticker} é interessante. Alto retorno potencial.` : `⚡ Para arrojado, defina um stop de tese claro.`);
  }

  const riscos = {
    'Energia':         `Risco regulatório: ANEEL revisa tarifas periodicamente. Mudanças nas concessões impactam diretamente.`,
    'Bancos':          `Risco de inadimplência: com Selic a ${taxaSelic.toFixed(2)}%, carteira de crédito pode ser pressionada.`,
    'Saneamento':      `Risco político: empresas estatais sofrem com mudanças de gestão e interferências nas tarifas.`,
    'Telecom/Seguros': `Telecom: risco de novos players e disrupção. Seguros: monitore o índice de sinistralidade.`,
    'Petróleo & Gás':  `Risco político (Petrobras pode ter dividendos alterados) + risco do preço do petróleo (cíclico).`,
    'Mineração':       `Risco geopolítico: a Vale depende da demanda chinesa. Desaceleração impacta o preço do minério.`,
    'Celulose/Papel':  `Klabin e Suzano têm alta dívida por ciclos de expansão (Puma II). Monitore o câmbio — exportações em dólar protegem a receita. Demanda global de celulose sustenta preços.`,
    'Agronegócio':     `Risco climático (seca, geada) e de câmbio. Preços de commodities oscilam com mercado global.`,
    'FII - Papel (CRI)':'Risco de crédito dos CRIs. Com Selic caindo, o rendimento pós-fixado tende a diminuir.',
    'FII - Logística':  `Risco de vacância se grandes inquilinos saírem. Monitore contratos e taxa de ocupação.`,
    'FII - Shopping':   `Risco de consumo fraco. Com Selic alta, poder de compra e vendas por m² reduzem.`,
    'FII - Lajes':      `Risco de vacância corporativa. Trabalho híbrido pode reduzir demanda por escritórios.`,
    'FII - Híbrido':    `Diversificação reduz o risco setorial. Monitore a distribuição entre tipos de imóvel.`,
    'FII - FoF':        `Depende da qualidade da gestão ativa. Acompanhe os FIIs que compõem o portfólio.`,
    'FIAGRO - CRA':     `Risco climático e de crédito rural. CRAs são menos líquidos e o setor é concentrado.`,
    'Indústria':        `WEG negocia com múltiplo alto (P/VP ~8x). DY baixo, mas crescimento de lucros é consistente. Não é ação de renda — é compounding de qualidade.`,
    'Logística':        `Setor dependente do crescimento econômico. Monitore volumes transportados e margens.`,
  };

  return `O QUE É ESSE ATIVO\n${d.desc}\n\nOS PROVENTOS SÃO ATRATIVOS?\n${dyMsg} ${payMsg}\n\n${isFundo ? 'PRECIFICAÇÃO E INFORMAÇÕES-CHAVE' : 'A EMPRESA É SAUDÁVEL?'}\n${saudeMsg}\n\nPARA O SEU PERFIL (${perfil.toUpperCase()})\n${recMsg}\n\nPONTO DE ATENÇÃO\n${riscos[d.setor] || 'Monitore resultados trimestrais e mudanças na política de dividendos.'}\n\n— Dados educacionais aproximados (ref. 2024/25). Confirme sempre no Status Invest / Funds Explorer antes de investir!`;
}

function preencherResultado(ticker, d, analise) {
  document.getElementById('a-result').style.display = 'block';
  const isFundo = d && (d.tipo === 'FII' || d.tipo === 'FIAGRO');

  document.getElementById('r-badge').textContent   = ticker;
  document.getElementById('r-name').textContent    = d ? d.nome : ticker;
  document.getElementById('r-setor').textContent   = d ? d.setor : 'Desconhecido';
  document.getElementById('ai-profile-label').textContent = `Para perfil ${perfil}`;

  const tipoEl = document.getElementById('r-tipo-tag');
  if (d && d.tipo) {
    tipoEl.textContent = d.tipo; tipoEl.style.display = 'inline-block';
    tipoEl.style.background  = d.tipo === 'FII' ? '#448aff18' : d.tipo === 'FIAGRO' ? '#1de9b618' : '#f59e0b18';
    tipoEl.style.color       = d.tipo === 'FII' ? 'var(--blue)' : d.tipo === 'FIAGRO' ? 'var(--teal)' : 'var(--orange)';
    tipoEl.style.borderColor = d.tipo === 'FII' ? '#448aff30' : d.tipo === 'FIAGRO' ? '#1de9b630' : '#f59e0b30';
  } else tipoEl.style.display = 'none';

  document.getElementById('r-perfil').textContent = { conservador:'🛡 Conservador', moderado:'⚖ Moderado', arrojado:'🚀 Arrojado' }[perfil];

  if (d) {
    const dy = d.dy;
    document.getElementById('r-dy').textContent = dy.toFixed(1) + '%';
    document.getElementById('dy-needle').style.left = (Math.min(dy / 16, 1) * 100) + '%';
    let dyColor = isFundo
      ? (dy < 7 ? '#f43f5e' : dy < 10 ? '#f59e0b' : dy < 15 ? 'var(--green)' : '#fca5a5')
      : (dy < 4 ? '#f43f5e' : dy < 6 ? '#f59e0b' : dy < 9 ? 'var(--green)' : dy < 14 ? '#f59e0b' : '#fca5a5');
    document.getElementById('r-dy').style.color = dyColor;
    document.getElementById('dy-interp').textContent = isFundo
      ? (dy < 7 ? `Abaixo da média para ${d.tipo}s.` : dy < 10 ? `Bom rendimento. Isento de IR eleva o retorno líquido.` : dy < 15 ? `Excelente. Competitivo com qualquer renda fixa, isento de IR.` : `⚠ Muito alto. Verifique sustentabilidade.`)
      : (dy < 4 ? `DY baixo. Verifique crescimento do LPA.` : dy < 6 ? `DY razoável. Confirme consistência histórica.` : dy < 9 ? `DY excelente — faixa ideal dos grandes pagadores.` : dy < 14 ? `DY muito alto. Ciclo especial ou armadilha? Analise o payout.` : `⚠ DY extremo. Alto risco de armadilha de dividendo.`);

    const setLbl = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setLbl('lbl-payout', isFundo ? 'Distribuição' : 'Payout');
    setLbl('lbl-roe',    isFundo ? 'P/VP' : 'ROE');
    setLbl('lbl-divida', isFundo ? 'Liquidez' : 'Dívida/EBITDA');
    setLbl('lbl-pvp',    isFundo ? 'IR' : 'P/VP');

    document.getElementById('r-payout').textContent = d.payout + '%';
    document.getElementById('r-payout').style.color = isFundo ? 'var(--green)' : (d.payout > 90 ? '#f43f5e' : d.payout > 80 ? '#f59e0b' : 'var(--green)');
    document.getElementById('r-payout-sub').textContent = isFundo ? '✓ Obrigatório (lei)' : (d.payout > 90 ? '⚠ Muito alto' : d.payout > 80 ? 'Atenção' : '✓ Saudável');

    if (isFundo) {
      document.getElementById('r-roe').textContent = d.pvp + 'x';
      document.getElementById('r-roe').style.color = d.pvp < 1 ? 'var(--green)' : d.pvp <= 1.1 ? '#f59e0b' : '#f43f5e';
      document.getElementById('r-roe-sub').textContent = d.pvp < 1 ? '✓ Com desconto' : d.pvp <= 1.1 ? 'Próximo do justo' : '⚠ Com prêmio';
      document.getElementById('r-divida').textContent = d.liquidez || 'Média';
      document.getElementById('r-divida').style.color = d.liquidez === 'Alta' ? 'var(--green)' : d.liquidez === 'Média' ? '#f59e0b' : '#f43f5e';
      document.getElementById('r-divida-sub').textContent = d.liquidez === 'Alta' ? '✓ Fácil negoc.' : d.liquidez === 'Média' ? 'Moderada' : '⚠ Baixa';
      document.getElementById('r-pvp').textContent = d.isentoIR ? 'Isento' : 'Tributado';
      document.getElementById('r-pvp').style.color = d.isentoIR ? 'var(--green)' : '#f59e0b';
      document.getElementById('r-pvp-sub').textContent = d.isentoIR ? '✓ IR para PF' : 'Verificar';
    } else {
      document.getElementById('r-roe').textContent = d.roe + '%';
      document.getElementById('r-roe').style.color = d.roe >= 15 ? 'var(--green)' : d.roe >= 10 ? '#f59e0b' : '#f43f5e';
      document.getElementById('r-roe-sub').textContent = d.roe >= 15 ? '✓ Excelente' : d.roe >= 10 ? 'Razoável' : '⚠ Baixo';
      document.getElementById('r-divida').textContent = d.divida === 0 ? 'N/A' : d.divida + 'x';
      document.getElementById('r-divida').style.color = d.divida === 0 ? 'var(--green)' : d.divida <= 2 ? 'var(--green)' : d.divida <= 3 ? '#f59e0b' : '#f43f5e';
      document.getElementById('r-divida-sub').textContent = d.divida === 0 ? 'Setor bancário' : d.divida <= 2 ? '✓ Saudável' : d.divida <= 3 ? 'Atenção' : '⚠ Alto';
      document.getElementById('r-pvp').textContent = d.pvp + 'x';
      document.getElementById('r-pvp').style.color = d.pvp < 1 ? 'var(--green)' : d.pvp <= 3 ? '#f59e0b' : '#f43f5e';
      document.getElementById('r-pvp-sub').textContent = d.pvp < 1 ? '✓ Barata' : d.pvp <= 3 ? 'Razoável' : 'Cara';
    }

    const score = calcVerdictScore(d);
    const { ico, lbl, cor } = getVerdict(score, d.dy, perfil);
    document.getElementById('r-verdict').style.background  = cor + '15';
    document.getElementById('r-verdict').style.borderColor = cor + '40';
    document.getElementById('v-ico').textContent = ico;
    document.getElementById('v-lbl').textContent = lbl;
    document.getElementById('v-lbl').style.color = cor;
  } else {
    ['r-dy','r-payout','r-roe','r-divida','r-pvp'].forEach(id => document.getElementById(id).textContent = 'N/D');
    document.getElementById('dy-interp').textContent = 'Ativo não encontrado. Pesquise em Status Invest ou Funds Explorer.';
    document.getElementById('v-ico').textContent = '❓';
    document.getElementById('v-lbl').textContent = 'Sem dados';
    document.getElementById('dy-needle').style.left = '0%';
  }

  document.getElementById('ai-pulse').classList.add('on');
  typewrite('ai-body', analise, () => document.getElementById('ai-pulse').classList.remove('on'));
  renderAllocation();
}

function calcVerdictScore(d) {
  const f = d.tipo === 'FII' || d.tipo === 'FIAGRO'; let s = 0;
  if (f) { if (d.dy >= 8 && d.dy <= 14) s++; if (d.pvp >= 0.85 && d.pvp <= 1.05) s++; if (d.pvp < 1.0) s++; if (d.liquidez === 'Alta') s++; }
  else   { if (d.dy >= 6 && d.dy <= 12) s++; if (d.payout >= 30 && d.payout <= 85) s++; if (d.roe >= 15) s++; if (d.divida === 0 || d.divida <= 2.5) s++; }
  return s;
}
function getVerdict(score, dy, p) {
  if (p === 'conservador') { if (score >= 3 && dy >= 5 && dy <= 9) return { ico:'✅', lbl:'Recomendado', cor:'var(--green)' }; if (score >= 2) return { ico:'⚡', lbl:'Com cautela', cor:'#f59e0b' }; return { ico:'⚠', lbl:'Não ideal', cor:'#f43f5e' }; }
  if (p === 'moderado')    { if (score >= 3) return { ico:'✅', lbl:'Boa escolha', cor:'var(--green)' }; if (score >= 2) return { ico:'⚡', lbl:'Analisar mais', cor:'#f59e0b' }; return { ico:'⚠', lbl:'Alto risco', cor:'#f43f5e' }; }
  if (score >= 2) return { ico:'🚀', lbl:'Pode comprar', cor:'var(--green)' }; if (score >= 1) return { ico:'⚡', lbl:'Monitorar', cor:'#f59e0b' }; return { ico:'🎲', lbl:'Especulativo', cor:'#f43f5e' };
}

function typewrite(elId, text, cb) {
  const el = document.getElementById(elId);
  // Formata a resposta da IA com headers em destaque
  const formatted = text
    .replace(/^(O QUE É ESSE ATIVO|OS PROVENTOS SÃO ATRATIVOS\?|A EMPRESA É FINANCEIRAMENTE SAUDÁVEL\?|QUALIDADE E PRECIFICAÇÃO DO FUNDO|OPORTUNIDADES REAIS AGORA|RISCOS QUE VOCÊ PRECISA CONHECER|VEREDICTO PARA PERFIL [A-ZÁÉÍÓÚÂÊÔÃÕÇ ]+)$/gm,
      '<span class="ai-section-header">$1</span>')
    .replace(/\n/g, '<br>');
  el.innerHTML = '';
  // Typewrite com HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = formatted;
  const finalHTML = tempDiv.innerHTML;
  let i = 0;
  const chars = finalHTML.split('');
  let inTag = false;
  let buf = '';
  function tick() {
    if (i >= chars.length) { el.innerHTML = finalHTML; if (cb) cb(); return; }
    const ch = chars[i++];
    if (ch === '<') inTag = true;
    if (inTag) { buf += ch; if (ch === '>') { inTag = false; buf = ''; el.innerHTML = finalHTML.substring(0, finalHTML.indexOf(ch, i - buf.length - 1) + 1); } }
    else el.innerHTML = finalHTML.substring(0, i);
    setTimeout(tick, 4);
  }
  // Renderiza imediatamente com fade-in para evitar bugs de HTML parcial
  el.style.opacity = '0';
  el.innerHTML = formatted;
  el.style.transition = 'opacity 0.5s';
  setTimeout(() => { el.style.opacity = '1'; if (cb) cb(); }, 100);
}

/* ══════════════════════════════════════════
   ALOCAÇÃO IDEAL
══════════════════════════════════════════ */
const ALOCACOES = {
  conservador: { 'Bancos':15, 'Energia':25, 'Saneamento':20, 'Telecom/Seguros':10, 'FIIs':25, 'Agro/Commodities':5 },
  moderado:    { 'Bancos':20, 'Energia':18, 'Saneamento':15, 'Telecom/Seguros':12, 'FIIs':25, 'Agro/Commodities':10 },
  arrojado:    { 'Bancos':25, 'Energia':12, 'Saneamento':8,  'Telecom/Seguros':10, 'FIIs':20, 'Agro/Commodities':25 },
};
const ALLOC_COLORS = {
  'Bancos':'#448aff','Energia':'#ffd740','Saneamento':'#00e676',
  'Telecom/Seguros':'#e040fb','FIIs':'#18ffff','Agro/Commodities':'#1de9b6',
};
const ALLOC_DESC = {
  conservador:'Priorizamos ativos regulados e previsíveis: Energia, Saneamento e FIIs de papel formam a base da segurança. Bancos complementam com renda. Agro com peso mínimo pelo risco cíclico.',
  moderado:   'FIIs com renda mensal isenta ocupam posição relevante. Bancos e Energia garantem consistência. Agro e commodities adicionam retorno com risco controlado.',
  arrojado:   'Bancos, Agro e Commodities ganham mais espaço pelo potencial de retorno. FIIs mantêm renda recorrente. Aceita-se mais volatilidade em troca de dividendos maiores.',
};
function renderAllocation() {
  const alloc = ALOCACOES[perfil];
  const el = document.getElementById('alloc-p'); if (el) el.textContent = ALLOC_DESC[perfil];
  const bars = document.getElementById('alloc-bars'); if (!bars) return;
  bars.innerHTML = Object.entries(alloc).map(([s, pct]) => `
    <div class="alloc-bar-row">
      <span class="alloc-lbl">${s}</span>
      <div class="alloc-track"><div class="alloc-fill" style="width:${pct}%;background:${ALLOC_COLORS[s] || 'var(--muted)'}"></div></div>
      <span class="alloc-pct" style="color:${ALLOC_COLORS[s] || 'var(--muted)'}">${pct}%</span>
    </div>`).join('');
}

/* ══════════════════════════════════════════
   OPORTUNIDADES
══════════════════════════════════════════ */
let filtroOport = 'Todos';

function setFiltroOport(btn, categoria) {
  document.querySelectorAll('.filt-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filtroOport = categoria;
  renderOportunidades();
}

function renderOportunidades() {
  const el = document.getElementById('oport-grid');
  if (!el) return;

  const ativos = Object.entries(ATIVOS).filter(([, d]) => {
    if (filtroOport === 'Todos') return true;
    if (filtroOport === 'FIIs/FIAGROs') return d.tipo === 'FII' || d.tipo === 'FIAGRO';
    return d.setor === filtroOport || d.setor.includes(filtroOport);
  });

  // Score de oportunidade
  const scored = ativos.map(([ticker, d]) => {
    const isFundo = d.tipo === 'FII' || d.tipo === 'FIAGRO';
    let score = 0;
    if (isFundo) {
      if (d.dy >= 8 && d.dy <= 14) score += 30;
      if (d.pvp < 1.0)             score += 35;
      else if (d.pvp <= 1.05)      score += 20;
      if (d.liquidez === 'Alta')   score += 20;
      if (d.isentoIR)              score += 15;
    } else {
      if (d.dy >= 6 && d.dy <= 10) score += 25;
      if (d.payout >= 30 && d.payout <= 80) score += 20;
      if (d.roe >= 15)             score += 20;
      if (d.pvp < 1.0)             score += 20;
      if (d.divida <= 2)           score += 15;
    }
    let sinal, sigClass;
    if (score >= 70) { sinal = '🟢 Oportunidade de Compra'; sigClass = 'sig-buy'; }
    else if (score >= 45) { sinal = '🟡 Monitorar — Preço justo'; sigClass = 'sig-watch'; }
    else { sinal = '🔴 Aguardar melhor momento'; sigClass = 'sig-avoid'; }
    return { ticker, d, score, sinal, sigClass };
  }).sort((a, b) => b.score - a.score);

  const categoriaColor = (setor) => {
    const map = {
      'Bancos':'var(--blue)','Energia':'var(--gold)','Saneamento':'var(--green)',
      'Telecom/Seguros':'var(--purple)','Petróleo & Gás':'var(--orange)',
      'Mineração':'var(--cyan)','Celulose/Papel':'var(--teal)',
      'Agronegócio':'#84cc16','Indústria':'var(--red)',
    };
    for (const k of Object.keys(map)) if (setor.includes(k)) return map[k];
    return 'var(--muted)';
  };

  el.innerHTML = scored.map(({ ticker, d, score, sinal, sigClass }) => {
    const isFundo = d.tipo === 'FII' || d.tipo === 'FIAGRO';
    const cor = categoriaColor(d.setor);
    return `
    <div class="oport-card">
      <div class="oport-head">
        <div>
          <div class="oport-ticker">${ticker}</div>
          <div class="oport-nome">${d.nome}</div>
        </div>
        <span class="oport-setor" style="color:${cor};border-color:${cor}44;background:${cor}14">${d.setor}</span>
      </div>
      <div class="oport-body">
        <div class="oport-kpi">
          <div class="oport-kpi-l">${isFundo ? 'Rendimento' : 'DY'}</div>
          <div class="oport-kpi-v" style="color:${d.dy >= 6 ? 'var(--green)' : '#f59e0b'}">${d.dy}%</div>
        </div>
        <div class="oport-kpi">
          <div class="oport-kpi-l">P/VP</div>
          <div class="oport-kpi-v" style="color:${d.pvp < 1 ? 'var(--green)' : '#f59e0b'}">${d.pvp}x</div>
        </div>
        ${isFundo ? `
        <div class="oport-kpi">
          <div class="oport-kpi-l">IR</div>
          <div class="oport-kpi-v" style="color:var(--green)">${d.isentoIR ? 'Isento' : 'Trib.'}</div>
        </div>
        <div class="oport-kpi">
          <div class="oport-kpi-l">Liquidez</div>
          <div class="oport-kpi-v" style="color:${d.liquidez === 'Alta' ? 'var(--green)' : '#f59e0b'}">${d.liquidez}</div>
        </div>` : `
        <div class="oport-kpi">
          <div class="oport-kpi-l">ROE</div>
          <div class="oport-kpi-v" style="color:${d.roe >= 15 ? 'var(--green)' : '#f59e0b'}">${d.roe}%</div>
        </div>
        <div class="oport-kpi">
          <div class="oport-kpi-l">Payout</div>
          <div class="oport-kpi-v" style="color:${d.payout <= 85 ? 'var(--green)' : '#f43f5e'}">${d.payout}%</div>
        </div>`}
      </div>
      <div class="oport-kpi" style="margin-top:8px">
        <div class="oport-kpi-l">Score DiviDash</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
          <div style="flex:1;height:6px;background:var(--bg);border-radius:3px;overflow:hidden">
            <div style="width:${score}%;height:100%;background:${score >= 70 ? 'var(--green)' : score >= 45 ? 'var(--gold)' : 'var(--red)'};border-radius:3px"></div>
          </div>
          <span style="font-family:var(--mono);font-size:11px;font-weight:700;color:${score >= 70 ? 'var(--green)' : score >= 45 ? 'var(--gold)' : 'var(--red)'}">${score}</span>
        </div>
      </div>
      <div class="oport-signal ${sigClass}">${sinal}</div>
      <button class="oport-btn" onclick="quickAnalyzeAndGo('${ticker}')">
        <i class="fa-solid fa-bolt"></i> Analisar ${ticker} no Assessor
      </button>
    </div>`;
  }).join('');
}

/* ══════════════════════════════════════════
   SIMULADOR
══════════════════════════════════════════ */
function simular() {
  const aporte = parseFloat(document.getElementById('s-aporte').value) || 0;
  const dy     = parseFloat(document.getElementById('s-dy').value) || 0;
  const anos   = parseInt(document.getElementById('s-anos').value) || 10;
  const reinv  = document.getElementById('s-reinv').checked;
  if (!aporte || !dy) { ['sr-renda','sr-pat','sr-inv','sr-ganho'].forEach(id => document.getElementById(id).textContent = 'R$ —'); return; }
  const meses = anos * 12, dyM = dy / 100 / 12, inv = aporte * meses;
  const pat   = reinv ? aporte * ((Math.pow(1 + dyM, meses) - 1) / dyM) : inv + inv * (dy / 100) * anos * 0.5;
  const renda = pat * dyM;
  document.getElementById('sr-renda').textContent = fBRL(renda) + '/mês';
  document.getElementById('sr-pat').textContent   = fBRL(pat);
  document.getElementById('sr-inv').textContent   = fBRL(inv);
  document.getElementById('sr-ganho').textContent = fBRL(pat - inv);
  drawSimChart(aporte, dyM, meses, reinv);
  renderMilestones(aporte, dyM, reinv);
}

function drawSimChart(aporte, dyM, meses, reinv) {
  const canvas = document.getElementById('sim-chart'); if (!canvas) return;
  const W = canvas.clientWidth || 600, H = 160;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const steps = Math.min(meses, 60), pts = [], invPts = [];
  for (let i = 0; i <= steps; i++) {
    const m = Math.round((i / steps) * meses), ia = aporte * m;
    pts.push(reinv ? aporte * ((Math.pow(1 + dyM, m) - 1) / dyM) : ia + ia * dyM * m * 0.5);
    invPts.push(ia);
  }
  const maxV = Math.max(...pts);
  const tx = i => (i / (pts.length - 1)) * (W - 20) + 10;
  const ty = v => H - 10 - ((v / maxV) * (H - 20));
  ctx.strokeStyle = '#1a335688'; ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) { const y = ty((maxV / 4) * i); ctx.beginPath(); ctx.moveTo(10, y); ctx.lineTo(W - 10, y); ctx.stroke(); }
  ctx.beginPath(); pts.forEach((v, i) => i ? ctx.lineTo(tx(i), ty(v)) : ctx.moveTo(tx(i), ty(v)));
  ctx.lineTo(tx(pts.length - 1), H - 10); ctx.lineTo(tx(0), H - 10); ctx.closePath();
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, 'rgba(0,230,118,.32)'); g.addColorStop(1, 'rgba(0,230,118,.02)');
  ctx.fillStyle = g; ctx.fill();
  ctx.beginPath(); pts.forEach((v, i) => i ? ctx.lineTo(tx(i), ty(v)) : ctx.moveTo(tx(i), ty(v)));
  ctx.strokeStyle = '#00e676'; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); invPts.forEach((v, i) => i ? ctx.lineTo(tx(i), ty(v)) : ctx.moveTo(tx(i), ty(v)));
  ctx.strokeStyle = '#5a7a9e'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);
}

function renderMilestones(aporte, dyM, reinv) {
  const el = document.getElementById('sim-ms'); el.innerHTML = '';
  [1000, 2000, 5000, 10000].forEach(renda => {
    for (let m = 1; m <= 480; m++) {
      const pa = reinv ? aporte * ((Math.pow(1 + dyM, m) - 1) / dyM) : aporte * m + aporte * m * dyM * m * 0.5;
      if (pa * dyM >= renda) { const a = Math.ceil(m / 12); el.innerHTML += `<div class="ms-badge">R$ ${renda.toLocaleString('pt-BR')}/mês em <span>${a} ano${a > 1 ? 's' : ''}</span></div>`; break; }
    }
  });
}

function calcYOC() {
  const price = parseFloat(document.getElementById('yp').value);
  const divs  = parseFloat(document.getElementById('yd').value);
  const p = document.getElementById('yoc-pct'), m = document.getElementById('yoc-msg');
  if (!price || !divs || price <= 0) { p.textContent = '—'; return; }
  const yoc = (divs / price) * 100;
  p.textContent = fPct(yoc);
  p.style.color = yoc >= 8 ? 'var(--green)' : yoc >= 5 ? '#f59e0b' : '#f43f5e';
  m.textContent = yoc >= 10 ? `🔥 Excelente! ${fPct(yoc)} de retorno real sobre o preço pago.`
    : yoc >= 6 ? `✅ Muito bom! ${fPct(yoc)} de YoC acima da média.`
    : yoc >= 4 ? `🟡 Razoável. Verifique se os dividendos tendem a crescer.`
    : `⚠ Baixo. Reavalie se este ativo ainda faz sentido.`;
}

/* ══════════════════════════════════════════
   SIMULADOR RENDA FIXA
══════════════════════════════════════════ */
function calcRF() {
  const tipo  = document.getElementById('rf-tipo').value;
  const valor = parseFloat(document.getElementById('rf-valor').value) || 0;
  const prazo = parseInt(document.getElementById('rf-prazo').value) || 12;
  const irPct = parseFloat(document.getElementById('rf-ir').value) || 0;
  if (!valor) return;
  const taxas = { cdb: taxaCdi, cdb120: taxaCdi * 1.2, lci: taxaCdi * 0.9, lci95: taxaCdi * 0.95, ipca: taxaIpca + 6.5, selic: taxaSelic + 0.13 };
  const taxaAnual = (taxas[tipo] || taxaCdi) / 100;
  const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
  const saldoBruto = valor * Math.pow(1 + taxaMensal, prazo);
  const rendBruto  = saldoBruto - valor;
  const rendLiq    = rendBruto * (1 - irPct / 100);
  const saldoFinal = valor + rendLiq;
  const taxaEfetiva= (Math.pow(saldoFinal / valor, 12 / prazo) - 1) * 100;
  const setV = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setV('rf-bruto', fBRL(rendBruto));
  setV('rf-liq',   fBRL(rendLiq));
  setV('rf-saldo', fBRL(saldoFinal));
  setV('rf-taxa',  taxaEfetiva.toFixed(2) + '% a.a.');
}

/* ══════════════════════════════════════════
   CARTEIRA COM P&L + LOCALSTORAGE (CORRIGIDO)
══════════════════════════════════════════ */
let portfolio = [];

// Carregar carteira do localStorage ao iniciar
function loadPortfolio() {
  try {
    const saved = localStorage.getItem('dividash_portfolio');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validar se é um array e tem a estrutura esperada
      if (Array.isArray(parsed)) {
        // Garantir que todos os campos obrigatórios existam
        portfolio = parsed.map(item => ({
          ticker: item.ticker || 'N/A',
          qtd: item.qtd || 0,
          precoPago: item.precoPago || 0,
          precoAtual: item.precoAtual || item.precoPago || 0, // Fallback para preço pago
          dy: item.dy || 0,
          setor: item.setor || 'Outros',
          totalInvest: (item.qtd || 0) * (item.precoPago || 0)
        }));
        
        // Atualizar a interface com os dados carregados
        renderPortfolio();
        console.log('Carteira carregada com sucesso:', portfolio.length, 'ativos');
      }
    }
  } catch (e) {
    console.error('Erro ao carregar carteira:', e);
    // Se houver erro, resetar a carteira
    portfolio = [];
    localStorage.removeItem('dividash_portfolio');
  }
}

// Salvar carteira no localStorage
function savePortfolio() {
  try {
    // Criar uma cópia limpa dos dados para salvar
    const portfolioToSave = portfolio.map(item => ({
      ticker: item.ticker,
      qtd: item.qtd,
      precoPago: item.precoPago,
      precoAtual: item.precoAtual || item.precoPago,
      dy: item.dy,
      setor: item.setor,
      totalInvest: item.qtd * item.precoPago
    }));
    
    localStorage.setItem('dividash_portfolio', JSON.stringify(portfolioToSave));
    console.log('Carteira salva com sucesso:', portfolioToSave.length, 'ativos');
  } catch (e) {
    console.error('Erro ao salvar carteira:', e);
    alert('Erro ao salvar carteira. Verifique o console para mais detalhes.');
  }
}

function addAsset() {
  const ticker   = document.getElementById('pt').value.trim().toUpperCase();
  const qtd      = parseInt(document.getElementById('pq').value);
  const precoPago= parseFloat(document.getElementById('pp').value);
  const precoAtu = parseFloat(document.getElementById('pp-atual').value) || precoPago;
  const dy       = parseFloat(document.getElementById('pdyv').value) || 0;
  const setor    = document.getElementById('pset').value;
  
  if (!ticker || !qtd || !precoPago) { 
    alert('Preencha Ticker, Quantidade e Preço Médio!'); 
    return; 
  }
  
  if (qtd <= 0 || precoPago <= 0) {
    alert('Quantidade e Preço devem ser maiores que zero!');
    return;
  }
  
  const novoAtivo = { 
    ticker, 
    qtd, 
    precoPago, 
    precoAtual: precoAtu, 
    dy, 
    setor, 
    totalInvest: qtd * precoPago 
  };
  
  portfolio.push(novoAtivo);
  savePortfolio(); // Salva após adicionar
  renderPortfolio();
  
  // Limpar campos
  ['pt','pq','pp','pp-atual','pdyv'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('dy-hint').textContent = '';
  
  // Focar no campo ticker para nova entrada
  document.getElementById('pt').focus();
}

function removeAsset(index) { 
  if (index >= 0 && index < portfolio.length) {
    portfolio.splice(index, 1); 
    savePortfolio(); // Salva após remover
    renderPortfolio(); 
  }
}

function atualizarPreco(index, novoPreco) {
  if (index >= 0 && index < portfolio.length) {
    const preco = parseFloat(novoPreco);
    if (!isNaN(preco) && preco > 0) {
      portfolio[index].precoAtual = preco;
      savePortfolio(); // Salva após atualizar preço
      renderPortfolio();
    }
  }
}

function renderPortfolio() {
  const empty   = document.getElementById('p-empty');
  const content = document.getElementById('p-content');
  if (!portfolio.length) { empty.style.display = 'block'; content.style.display = 'none'; return; }
  empty.style.display = 'none'; content.style.display = 'block';

  const totalInvest  = portfolio.reduce((s, a) => s + a.totalInvest, 0);
  const totalAtual   = portfolio.reduce((s, a) => s + a.qtd * a.precoAtual, 0);
  const renda        = portfolio.reduce((s, a) => s + (a.qtd * a.precoAtual) * (a.dy / 100) / 12, 0);
  const dyMedio      = totalAtual > 0 ? portfolio.reduce((s, a) => s + a.dy * (a.qtd * a.precoAtual / totalAtual), 0) : 0;
  const pnlTotal     = totalAtual - totalInvest;
  const pnlPct       = totalInvest > 0 ? (pnlTotal / totalInvest) * 100 : 0;
  const pnlColor     = pnlTotal >= 0 ? 'var(--green)' : 'var(--red)';
  const pnlSinal     = pnlTotal >= 0 ? '+' : '';

  document.getElementById('p-summary').innerHTML = `
    <div class="ps-kpi"><div class="ps-kpi-l">Valor Atual</div><div class="ps-kpi-v">${fBRL(totalAtual)}</div></div>
    <div class="ps-kpi"><div class="ps-kpi-l">Total Investido</div><div class="ps-kpi-v" style="color:var(--muted)">${fBRL(totalInvest)}</div></div>
    <div class="ps-kpi"><div class="ps-kpi-l">P&L Total</div><div class="ps-kpi-v" style="color:${pnlColor}">${pnlSinal}${fBRL(pnlTotal)} (${pnlSinal}${pnlPct.toFixed(1)}%)</div></div>
    <div class="ps-kpi"><div class="ps-kpi-l">Renda Mensal Est.</div><div class="ps-kpi-v" style="color:var(--green)">${fBRL(renda)}/mês</div></div>
    <div class="ps-kpi"><div class="ps-kpi-l">DY Médio</div><div class="ps-kpi-v">${fPct(dyMedio)}</div></div>
    <div class="ps-kpi"><div class="ps-kpi-l">Ativos</div><div class="ps-kpi-v">${portfolio.length}</div></div>`;

  document.getElementById('p-tbody').innerHTML = portfolio.map((a, i) => {
    const valorAtual = a.qtd * a.precoAtual;
    const pnl        = valorAtual - a.totalInvest;
    const pnlP       = a.totalInvest > 0 ? (pnl / a.totalInvest) * 100 : 0;
    const peso       = totalAtual > 0 ? (valorAtual / totalAtual) * 100 : 0;
    const rendaM     = valorAtual * (a.dy / 100) / 12;
    const pnlC       = pnl >= 0 ? 'pnl-pos' : 'pnl-neg';
    const pnlS       = pnl >= 0 ? '+' : '';
    const c          = SCOLORS[a.setor] || '#64748b';
    return `<tr>
      <td class="ticker">${a.ticker}</td>
      <td class="mono">${a.qtd}</td>
      <td class="mono">${fBRL(a.precoPago)}</td>
      <td class="mono">
        <input type="number" value="${a.precoAtual.toFixed(2)}" step="0.01"
          style="width:80px;background:var(--bg3);border:1px solid var(--border);color:var(--text);font-family:var(--mono);font-size:11px;padding:3px 6px;border-radius:6px;outline:none"
          onchange="atualizarPreco(${i},this.value)" title="Preço atual (editável)"/>
      </td>
      <td class="mono">${fBRL(a.totalInvest)}</td>
      <td class="mono">${fBRL(valorAtual)}</td>
      <td class="mono ${pnlC}">${pnlS}${fBRL(pnl)}<br><small>${pnlS}${pnlP.toFixed(1)}%</small></td>
      <td class="mono" style="color:var(--green)">${a.dy}%</td>
      <td class="mono" style="color:var(--green)">${fBRL(rendaM)}</td>
      <td><span style="font-size:10px;padding:2px 7px;border-radius:5px;background:${c}22;color:${c};border:1px solid ${c}44;font-weight:700;font-family:var(--mono);white-space:nowrap">${a.setor}</span></td>
      <td class="mono">${fPct(peso)}</td>
      <td><button class="btn-rm" onclick="removeAsset(${i})"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`;
  }).join('');

  // Barras de setor
  const setMap = {};
  portfolio.forEach(a => setMap[a.setor] = (setMap[a.setor] || 0) + a.qtd * a.precoAtual);
  document.getElementById('p-sector-bars').innerHTML = Object.entries(setMap).sort((a, b) => b[1] - a[1]).map(([s, v]) => {
    const pct = totalAtual > 0 ? (v / totalAtual) * 100 : 0;
    const c   = SCOLORS[s] || '#64748b';
    const warn = pct > 50 ? ' ⚠ Muito concentrado!' : pct > 40 ? ' ⚠ Alta conc.' : '';
    return `<div class="sbar-row"><span class="sbar-lbl" style="color:${c}">${s}</span><div class="sbar-track"><div class="sbar-fill" style="width:${pct}%;background:${c}"></div></div><span class="sbar-pct" style="color:${c}">${fPct(pct)}${warn}</span></div>`;
  }).join('');

  const rec = document.getElementById('p-rec');
  const nCats = Object.keys(setMap).length;
  if (nCats >= 4) { rec.className = 'p-rec ok'; rec.innerHTML = '✅ Boa diversificação! Exposição em múltiplas categorias — risco de concentração reduzido.'; }
  else            { rec.className = 'p-rec warn'; rec.innerHTML = '⚠ Carteira concentrada. Considere adicionar ativos de mais categorias para reduzir o risco.'; }

  renderDiagnostico();
}

function renderDiagnostico() {
  const diag = document.getElementById('p-diag');
  if (!diag || !portfolio.length) { if (diag) diag.innerHTML = ''; return; }

  const totalAtual  = portfolio.reduce((s, a) => s + a.qtd * a.precoAtual, 0);
  const totalInvest = portfolio.reduce((s, a) => s + a.totalInvest, 0);
  const renda       = portfolio.reduce((s, a) => s + a.qtd * a.precoAtual * (a.dy / 100) / 12, 0);
  const dyMedio     = totalAtual > 0 ? portfolio.reduce((s, a) => s + a.dy * (a.qtd * a.precoAtual / totalAtual), 0) : 0;
  const pnl         = totalAtual - totalInvest;
  const pnlPct      = totalInvest > 0 ? (pnl / totalInvest) * 100 : 0;
  const alertas = [], boas = [], acoes = [];

  const setMap = {};
  portfolio.forEach(a => setMap[a.setor] = (setMap[a.setor] || 0) + a.qtd * a.precoAtual);

  if (dyMedio < 4) alertas.push({ tipo:'warn', ico:'⚠️', titulo:`DY médio baixo (${fPct(dyMedio)})`, desc:'DY abaixo de 4% para carteira de renda. Considere rebalancear para ativos com yield maior.' });
  else if (dyMedio >= 6) boas.push({ ico:'⭐', titulo:`DY médio saudável (${fPct(dyMedio)})`, desc:'Rendimento médio acima de 6% — dentro da faixa ideal dos bons pagadores.' });

  if (pnl > 0) boas.push({ ico:'📈', titulo:`Carteira com lucro de ${fBRL(pnl)} (+${pnlPct.toFixed(1)}%)`, desc:`Seus ativos estão valorizados. Patrimônio atual: ${fBRL(totalAtual)} vs investido: ${fBRL(totalInvest)}.` });
  else if (pnl < 0) alertas.push({ tipo:'warn', ico:'📉', titulo:`Carteira com prejuízo de ${fBRL(Math.abs(pnl))} (${pnlPct.toFixed(1)}%)`, desc:`Patrimônio atual ${fBRL(totalAtual)} vs investido ${fBRL(totalInvest)}. Avalie se a tese de investimento ainda se mantém para cada ativo.` });

  Object.entries(setMap).forEach(([s, v]) => {
    const pct = (v / totalAtual) * 100;
    if (pct > 50) alertas.push({ tipo:'danger', ico:'🚨', titulo:`Concentração crítica em ${s} (${fPct(pct)})`, desc:`Mais de 50% em uma única categoria. Diversifique urgentemente.` });
    else if (pct > 40) alertas.push({ tipo:'warn', ico:'⚠️', titulo:`Concentração alta em ${s} (${fPct(pct)})`, desc:`Acima de 40% em ${s}. Reduza gradualmente.` });
  });

  portfolio.forEach(a => {
    const d = ATIVOS[a.ticker]; if (!d) return;
    if (d.payout > 90 && d.tipo !== 'FII' && d.tipo !== 'FIAGRO')
      alertas.push({ tipo:'warn', ico:'⚠️', titulo:`${a.ticker}: Payout muito alto (${d.payout}%)`, desc:'Corte no lucro resultará em redução/eliminação do dividendo.' });
    if (d.divida > 3)
      alertas.push({ tipo:'warn', ico:'⚠️', titulo:`${a.ticker}: Endividamento alto (${d.divida}x)`, desc:`Com Selic a ${taxaSelic.toFixed(2)}%, juros altos pressionam o caixa.` });
    if (calcVerdictScore(d) >= 3)
      boas.push({ ico:'⭐', titulo:`${a.ticker}: Alta qualidade fundamentalista`, desc:'Lucro consistente, ROE elevado, dívida controlada.' });
  });

  const temFII = portfolio.some(a => ['FIIs','FIAGROs'].includes(a.setor) || ATIVOS[a.ticker]?.tipo === 'FII' || ATIVOS[a.ticker]?.tipo === 'FIAGRO');
  if (!temFII) acoes.push('Adicione FIIs ou FIAGROs — renda mensal isenta de IR diversifica e eleva o rendimento líquido.');
  if (!Object.keys(setMap).includes('Saneamento'))
    acoes.push('Saneamento é o setor mais defensivo da bolsa — considere SAPR11 ou CSMG3 como âncora.');

  let notaGeral, notaCor, notaEmoji;
  const nProb = alertas.filter(a => a.tipo === 'danger').length;
  const nWarn = alertas.filter(a => a.tipo === 'warn').length;
  if (nProb >= 2)               { notaGeral = 'Precisa de atenção urgente'; notaCor = '#f43f5e'; notaEmoji = '🔴'; }
  else if (nProb === 1 || nWarn >= 3) { notaGeral = 'Bom, mas há pontos a melhorar'; notaCor = '#f59e0b'; notaEmoji = '🟡'; }
  else if (boas.length >= 2)    { notaGeral = 'Carteira bem estruturada!'; notaCor = 'var(--green)'; notaEmoji = '✅'; }
  else                          { notaGeral = 'Carteira razoável — evolua gradualmente'; notaCor = '#f59e0b'; notaEmoji = '🟡'; }

  let html = `<div class="diag-nota">
    <div class="diag-nota-title" style="color:${notaCor}">${notaEmoji} ${notaGeral}</div>
    <div class="diag-nota-body">
      Valor atual: <strong>${fBRL(totalAtual)}</strong> · 
      P&L: <strong style="color:${pnl >= 0 ? 'var(--green)' : 'var(--red)'}">${pnl >= 0 ? '+' : ''}${fBRL(pnl)} (${pnl >= 0 ? '+' : ''}${pnlPct.toFixed(1)}%)</strong> · 
      Renda passiva: <strong style="color:var(--green)">${fBRL(renda)}/mês</strong> · 
      DY médio: <strong>${fPct(dyMedio)}</strong> · 
      SELIC: <strong>${taxaSelic.toFixed(2)}%</strong>
    </div>
  </div>`;

  if (boas.length)   html += `<div class="diag-section"><div class="diag-section-title" style="color:var(--green)"><i class="fa-solid fa-thumbs-up"></i> Pontos Positivos</div><div class="diag-items">${boas.map(b => `<div class="diag-item ok"><span class="diag-ico-sm">${b.ico}</span><div class="diag-item-body"><div class="diag-item-title">${b.titulo}</div><div class="diag-item-desc">${b.desc}</div></div></div>`).join('')}</div></div>`;
  if (alertas.length) html += `<div class="diag-section"><div class="diag-section-title" style="color:#f59e0b"><i class="fa-solid fa-triangle-exclamation"></i> Pontos de Atenção</div><div class="diag-items">${alertas.map(a => `<div class="diag-item ${a.tipo}"><span class="diag-ico-sm">${a.ico}</span><div class="diag-item-body"><div class="diag-item-title">${a.titulo}</div><div class="diag-item-desc">${a.desc}</div></div></div>`).join('')}</div></div>`;
  if (acoes.length)   html += `<div class="diag-section"><div class="diag-section-title" style="color:var(--blue)"><i class="fa-solid fa-list-check"></i> O que fazer agora</div><div class="diag-items">${acoes.map((a, i) => `<div class="diag-item warn"><span class="diag-ico-sm" style="font-family:var(--mono);font-size:13px;color:var(--green);font-weight:700">${i + 1}.</span><div class="diag-item-body"><div class="diag-item-desc">${a}</div></div></div>`).join('')}</div></div>`;

  html += `<div class="alloc-warn"><i class="fa-solid fa-circle-info"></i> Diagnóstico educacional — dados aproximados. Confirme no Status Invest antes de decidir.</div>`;
  diag.innerHTML = html;
}

/* ══════════════════════════════════════════
   CHECKLIST
══════════════════════════════════════════ */
function scoreCalc() {
  const score = ['ck1','ck2','ck3','ck4'].filter(id => document.getElementById(id).checked).length * 25;
  document.getElementById('ring-arc').setAttribute('stroke-dasharray', `${Math.round((score / 100) * 264)} 264`);
  document.getElementById('ck-num').textContent = score;
  const cfgs = {
    100: { c:'var(--green)', ico:'⭐', l:'Ativo Excepcional',    d:'Todos os critérios. Alta qualidade para dividendos.' },
     75: { c:'var(--green)', ico:'✅', l:'Bom Ativo',            d:'Quase lá. Verifique qual critério falta.' },
     50: { c:'#f59e0b',      ico:'🟡', l:'Neutro — Atenção',    d:'Risco moderado. Monitore de perto.' },
     25: { c:'#f97316',      ico:'⚠',  l:'Ativo Fraco',         d:'Poucos critérios. Alto risco.' },
      0: { c:'#f43f5e',      ico:'❌', l:'Evite por Enquanto',  d:'Nenhum critério atendido.' },
  };
  const cfg = cfgs[score];
  document.getElementById('ck-num').style.color   = cfg.c;
  document.getElementById('ckv-lbl').textContent  = cfg.ico + ' ' + cfg.l;
  document.getElementById('ckv-lbl').style.color  = cfg.c;
  document.getElementById('ckv-desc').textContent = cfg.d;
  document.getElementById('ring-arc').style.stroke= cfg.c;
}
function resetScore() {
  ['ck1','ck2','ck3','ck4'].forEach(id => document.getElementById(id).checked = false);
  document.getElementById('ck-t').value = '';
  document.getElementById('ring-arc').setAttribute('stroke-dasharray', '0 264');
  document.getElementById('ring-arc').style.stroke = 'var(--green)';
  document.getElementById('ck-num').textContent    = '0';
  document.getElementById('ck-num').style.color    = '';
  document.getElementById('ckv-lbl').textContent   = 'Aguardando análise…';
  document.getElementById('ckv-lbl').style.color   = '';
  document.getElementById('ckv-desc').textContent  = 'Marque os critérios acima';
}

/* ══════════════════════════════════════════
   EDUCAÇÃO
══════════════════════════════════════════ */
const EDU_CARDS = [
  { ico:'<i class="fa-solid fa-percent"></i>', color:'var(--green)', titulo:'O que é Dividend Yield (DY)?', tag:'Conceito Básico',
    texto:`O Dividend Yield mostra quanto o ativo paga de proventos em relação ao preço atual.\n\nFórmula: DY = (Proventos pagos no ano ÷ Preço) × 100\n\nCOMO INTERPRETAR:\n• Abaixo de 4% → Baixo para estratégia de renda\n• 4% a 6% → Razoável — verifique histórico\n• 6% a 9% → Ótimo para ações — faixa ideal\n• 10% a 14% → Excelente para FIIs de papel\n• Acima de 14% → Atenção! Pode ser armadilha\n\nSempre compare com o histórico dos últimos 5 anos!` },
  { ico:'<i class="fa-solid fa-building"></i>', color:'var(--cyan)', titulo:'FIIs vs Ações — qual escolher?', tag:'Estratégia',
    texto:`FIIs e ações têm características bem diferentes:\n\nFIIs:\n✅ Renda MENSAL (a maioria paga todo mês)\n✅ Rendimentos ISENTOS de IR para PF\n✅ Diversificação imobiliária com pouco capital\n⚠ Oscilam com a taxa de juros\n\nAÇÕES:\n✅ Potencial de valorização maior no longo prazo\n✅ Dividendos isentos de IR\n⚠ Pagamento geralmente trimestral/semestral\n\nIDEAL: combine os dois! FIIs geram caixa mensal, ações crescem o patrimônio.` },
  { ico:'<i class="fa-solid fa-shield-halved"></i>', color:'#ff7043', titulo:'LCI, LCA e CDB — a diferença', tag:'Renda Fixa',
    texto:`CDB: paga IR regressivo (22,5% → 15%). Rende 90-120% CDI.\nLCI: ISENTO de IR para PF! 85-95% CDI. Prazo mín: 90 dias.\nLCA: ISENTO de IR para PF! 85-95% CDI. Prazo mín: 90 dias.\n\nCOMPARAÇÃO:\nCDB 100% CDI = ~13,65% bruto → ~11,6% líquido (IR 15%)\nLCI/LCA 90% CDI = ~12,3% — LÍQUIDO, sem IR!\nLCI/LCA 95% CDI = ~13% líquido — supera o CDB!\n\nTodos garantidos pelo FGC até R$250k por CPF por banco.` },
  { ico:'<i class="fa-solid fa-snowflake"></i>', color:'var(--blue)', titulo:'O poder dos juros compostos', tag:'Estratégia',
    texto:`Ao reinvestir dividendos, eles geram mais dividendos — uma bola de neve.\n\nEXEMPLO (R$1.000/mês, DY 8% a.a., reinvestindo tudo):\n• 10 anos → ~R$1.800/mês renda passiva\n• 20 anos → ~R$7.000/mês\n• 30 anos → ~R$24.000/mês\n\nO segredo é TEMPO e CONSTÂNCIA. Comece cedo, mesmo com pouco.` },
  { ico:'<i class="fa-solid fa-triangle-exclamation"></i>', color:'var(--gold)', titulo:'Armadilha de Dividendo', tag:'Risco',
    texto:`Uma ação cai de R$40 para R$20. O DY que era 5% aparece como 10% — mas a empresa não melhorou!\n\nSINAIS:\n• DY muito acima da média histórica\n• Payout acima de 90%\n• Lucro caindo consecutivamente\n• Dívida crescente\n\nREGRA: DY alto + payout alto + lucro em queda = fuja!` },
  { ico:'<i class="fa-solid fa-hand-holding-dollar"></i>', color:'#f43f5e', titulo:'JCP — Juros sobre Capital Próprio', tag:'Tributação',
    texto:`JCP é exclusivo do Brasil. Diferença:\n• Dividendos: ISENTOS de IR para PF\n• JCP: 15% de IR retido na fonte\n\nA empresa paga JCP porque é dedutível do IRPJ. Bancos como Itaú e BB pagam parte como JCP.\n\nDICA: o IR já vem retido. Declare no IRPF anual, mas não precisa pagar mais.` },
  { ico:'<i class="fa-solid fa-chart-pie"></i>', color:'var(--purple)', titulo:'Estratégia B.E.S.T + FIIs', tag:'Estratégia',
    texto:`B.E.S.T (para ações):\n• Bancos: ROE alto, JCP frequente\n• Energia: concessões reguladas, previsível\n• Saneamento: monopólio natural, risco mínimo\n• Telecom/Seguros: complemento com boa rentabilidade\n\nFIIs e FIAGROs:\n• Renda MENSAL isenta de IR\n• P/VP próximo de 1 = bem precificado\n\nRENDA FIXA:\n• LCI/LCA compensam volatilidade da bolsa\n• Tesouro IPCA+ protege contra inflação\n\nREGRA: nenhuma categoria acima de 40%.` },
];

function renderEducacao() {
  const grid = document.getElementById('edu-grid'); if (!grid) return;
  grid.innerHTML = EDU_CARDS.map((c, i) => `
    <div class="edu-card" id="edu-${i}" onclick="toggleEdu(${i})">
      <div class="edu-head">
        <div class="edu-ico" style="background:${c.color}22;color:${c.color};border:1px solid ${c.color}44">${c.ico}</div>
        <div><div class="edu-title">${c.titulo}</div><div class="edu-tag">${c.tag}</div></div>
        <i class="fa-solid fa-chevron-down edu-toggle"></i>
      </div>
      <div class="edu-body" id="edu-body-${i}">
        <div class="edu-text">${c.texto.replace(/\n/g, '<br>')}</div>
      </div>
    </div>`).join('');
}
function toggleEdu(i) {
  document.getElementById(`edu-body-${i}`).classList.toggle('open');
  document.getElementById(`edu-${i}`).classList.toggle('open');
}

/* ══════════════════════════════════════════
   UTILS
══════════════════════════════════════════ */
function fBRL(v) {
  return v.toLocaleString('pt-BR', { style:'currency', currency:'BRL', minimumFractionDigits:0, maximumFractionDigits:0 });
}
function fPct(v) { return v.toFixed(1).replace('.', ',') + '%'; }

/* ══════════════════════════════════════════
   COTAÇÕES EM TEMPO REAL — BRAPI (B3)
══════════════════════════════════════════ */
async function atualizarCotacoes() {
  if (!portfolio.length) {
    document.getElementById('brapi-status').textContent = 'Adicione ativos à carteira primeiro!';
    return;
  }
  const btn = document.getElementById('btn-atualizar');
  btn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Buscando...';
  btn.disabled = true;

  const tickers = [...new Set(portfolio.map(a => a.ticker))].join(',');
  const statusEl = document.getElementById('brapi-status');
  statusEl.textContent = `Buscando cotações de ${tickers}…`;

  try {
    const url = `https://brapi.dev/api/quote/${tickers}?token=wwaBqabgD6Wtzsnsb7HoHy`;
    const r = await fetch(url);
    if (!r.ok) throw new Error('Erro na API');
    const data = await r.json();

    if (!data.results || !data.results.length) throw new Error('Sem resultados');

    const precos = {};
    data.results.forEach(item => {
      if (item.symbol && item.regularMarketPrice) {
        precos[item.symbol] = item.regularMarketPrice;
      }
    });

    let atualizados = 0;
    portfolio.forEach(a => {
      if (precos[a.ticker]) {
        a.precoAtual = precos[a.ticker];
        // Também atualiza DY se disponível na API
        atualizados++;
      }
    });

    const agora = new Date().toLocaleTimeString('pt-BR');
    statusEl.innerHTML = `<span style="color:var(--green)">✓ ${atualizados} ativo(s) atualizado(s) com dados reais da B3</span>`;
    const ultEl = document.getElementById('ultima-atualizacao');
    if (ultEl) ultEl.textContent = `Última atualização: ${agora}`;

    // Atualiza DY do ATIVOS local também
    data.results.forEach(item => {
      if (item.symbol && ATIVOS[item.symbol] && item.regularMarketPrice) {
        ATIVOS[item.symbol].preco = item.regularMarketPrice;
      }
    });

    savePortfolio(); // Salva após atualizar cotações
    renderPortfolio();
  } catch (e) {
    statusEl.innerHTML = `<span style="color:var(--gold)">⚠ Não foi possível buscar cotações automáticas (limite de requisições ou ativo não encontrado). Use o campo "Preço Atual" manualmente ou <a href="https://brapi.dev" target="_blank" style="color:var(--blue)">brapi.dev</a> para obter uma chave gratuita.</span>`;
    console.error('Brapi error:', e);
  }

  btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Atualizar Preços';
  btn.disabled = false;
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderEducacao();
  simular();
  renderAllocation();
  renderOportunidades();
  fetchMacros();
  calcRF();
  setInterval(fetchMacros, 30 * 60 * 1000);
  
  loadPortfolio(); // Carrega a carteira salva
});
/* ══════════════════════════════════════════
   ASSESSOR DE APORTE INTELIGENTE v1.0
══════════════════════════════════════════ */

/* ── Matriz de Riscos e Oportunidades por Setor ── */
const RISK_MATRIX = {
  'Bancos': {
    oportunidades: [
      'Selic alta aumenta NIM (margem financeira líquida) e rentabilidade',
      'ROE médio de 18–22% superior à média global de bancos',
      'Crédito consignado e payroll expanding — base de clientes crescente',
      'Proventos via JCP reduzem carga tributária da empresa'
    ],
    riscos: [
      'Inadimplência pode subir com juros altos — monitorar NPL trimestral',
      'Risco regulatório do BACEN: mudanças em capital mínimo exigido',
      'Concorrência crescente de fintechs comprime spread bancário'
    ],
    nivel: 'Moderado', nivelCor: '#f59e0b'
  },
  'Energia': {
    oportunidades: [
      'Contratos de concessão regulada pela ANEEL — receita previsível por décadas',
      'Reajustes tarifários indexados à inflação protegem margem real',
      'Transição energética amplia demanda estrutural por transmissão/distribuição',
      'Menor correlação com ciclo econômico — defensivo em recessões'
    ],
    riscos: [
      'Revisão tarifária periódica pela ANEEL pode reduzir RAP',
      'Risco hidrológico em anos de seca severa afeta geradoras',
      'Endividamento em obras de expansão pressionado pela Selic alta'
    ],
    nivel: 'Baixo', nivelCor: '#00e676'
  },
  'Saneamento': {
    oportunidades: [
      'Monopólio natural e serviço essencial — demanda 100% inelástica',
      'Marco Legal do Saneamento (2020) amplia concessões e privatizações',
      'Contratos de 30–50 anos garantem visibilidade de longo prazo',
      'Crescimento de cobertura em cidades menores — expansão orgânica'
    ],
    riscos: [
      'Risco político em empresas estatais (Copasa, Sanepar) — interferência governamental',
      'Dívida/EBITDA moderada pressionada por Selic elevada',
      'Inadimplência de pequenos consumidores em crises econômicas'
    ],
    nivel: 'Baixo', nivelCor: '#00e676'
  },
  'Telecom/Seguros': {
    oportunidades: [
      'BBSE3 com ROE de 45% — modelo asset-light e distribuição generosa',
      'Expansão de fibra ótica e 5G gera nova receita para telecom',
      'Seguros crescem com bancarização e conscientização financeira',
      'Oligopólio em telecom limita concorrência destrutiva de preços'
    ],
    riscos: [
      'Payout alto em telecom (90%+) deixa pouco para reinvestimento',
      'Regulação da ANATEL pode limitar reajustes de tarifas',
      'Renovação de concessões de rádio e TV envolve risco político'
    ],
    nivel: 'Moderado', nivelCor: '#f59e0b'
  },
  'Petróleo & Gás': {
    oportunidades: [
      'DY extraordinário em ciclos de petróleo acima de US$80/barril',
      'PETR4 com custo de extração abaixo de US$30 — margem elevada',
      'Pré-Sal garantindo reservas por mais de 30 anos',
      'PRIO com eficiência operacional referência global no setor'
    ],
    riscos: [
      'Risco político elevado na Petrobras — mudanças na política de dividendos',
      'Preço do petróleo volátil — DY pode cair 50%+ em ciclos baixos',
      'Transição energética global aumenta risco de ativos stranded',
      'Cíclico: desempenho fortemente correlacionado com commodity'
    ],
    nivel: 'Alto', nivelCor: '#f43f5e'
  },
  'Mineração': {
    oportunidades: [
      'VALE3 líder global em minério de ferro e níquel de alta pureza',
      'Dividendos extraordinários frequentes em ciclos de alta do minério',
      'Desconto histórico vs mineradoras globais (BHP, Rio Tinto)',
      'Nickel premium para baterias de veículos elétricos — tendência secular'
    ],
    riscos: [
      'Altamente cíclico: minério de ferro correlacionado com crescimento chinês',
      'Risco ambiental e de licenciamento pós-Mariana e Brumadinho',
      'Câmbio: queda do dólar reduz receita exportada em BRL',
      'Decisão de dividendos variável — não garante distribuição mínima'
    ],
    nivel: 'Alto', nivelCor: '#f43f5e'
  },
  'Agronegócio': {
    oportunidades: [
      'Brasil como maior exportador global de soja, milho, carne e café',
      'Câmbio favorável aumenta competitividade e margens exportadas',
      'Demanda alimentar global crescente com população acima de 8 bilhões',
      'Etanol de cana como combustível renovável em expansão estrutural'
    ],
    riscos: [
      'Volatilidade de commodities agrícolas afeta margens e DY',
      'Risco climático: El Niño/La Niña pode impactar safras',
      'Sazonalidade no fluxo de caixa — proventos concentrados em certas épocas',
      'Dívida indexada ao dólar em empresas com alavancagem'
    ],
    nivel: 'Moderado', nivelCor: '#f59e0b'
  },
  'Celulose/Papel': {
    oportunidades: [
      'Suzano: custo de produção 30% abaixo das concorrentes europeias',
      'Demanda por celulose cresce com e-commerce (embalagens) e higiene',
      'Exportação em dólar — hedge natural contra desvalorização do BRL',
      'Projetos de expansão (Puma II/Arauco) aumentam receita futura'
    ],
    riscos: [
      'Dívida/EBITDA elevada em ciclos de expansão — sensível à Selic',
      'Preço da celulose no mercado internacional altamente volátil',
      'Projetos de capex pesado drenam fluxo de caixa no curto prazo'
    ],
    nivel: 'Moderado', nivelCor: '#f59e0b'
  },
  'FII - Papel (CRI)': {
    oportunidades: [
      'Rendimentos mensais ISENTOS de IR para pessoa física',
      'CRIs pós-fixados protegidos automaticamente da alta da Selic',
      'Spread sobre CDI garante retorno acima da renda fixa tradicional',
      'P/VP abaixo de 1 = comprar R$1 de ativo por menos de R$1'
    ],
    riscos: [
      'Risco de crédito dos devedores dos CRIs — checar rating',
      'Queda da Selic reduz rendimento dos CRIs pós-fixados',
      'Concentração em poucos emissores em alguns FIIs aumenta risco'
    ],
    nivel: 'Baixo-Moderado', nivelCor: '#f59e0b'
  },
  'FII - Logística': {
    oportunidades: [
      'E-commerce em expansão gera demanda crescente por galpões classe A',
      'Contratos de longo prazo (3–10 anos) com vacância historicamente baixa',
      'Localização estratégica próximo a rodovias e centros logísticos',
      'Diversificação real do portfólio com ativos imobiliários tangíveis'
    ],
    riscos: [
      'Alta da Selic pressiona P/VP para baixo — cotação cai com juros altos',
      'Vacância pode aumentar em desaceleração econômica',
      'Concentração regional em SP/RJ expõe a riscos localizados'
    ],
    nivel: 'Moderado', nivelCor: '#f59e0b'
  },
  'FII - Shopping': {
    oportunidades: [
      'Shoppings premium resistem à concorrência do e-commerce',
      'Receita atrelada ao faturamento dos lojistas — cresce com inflação',
      'P/VP próximo de 1 = comprar portfólio imobiliário a preço justo',
      'Expansão de lojas âncora de saúde e entretenimento anti-digital'
    ],
    riscos: [
      'Alta de juros reduz consumo e impacta receita dos lojistas',
      'Vacância estrutural em shoppings menos premium',
      'Disrupção do e-commerce no varejo de moda e eletrônicos'
    ],
    nivel: 'Moderado', nivelCor: '#f59e0b'
  },
  'FII - Híbrido': {
    oportunidades: [
      'Diversificação interna: combina lajes corporativas e galpões logísticos',
      'Gestão ativa aloca capital no segmento com melhor risco/retorno',
      'FIIs Kinea com histórico sólido e baixo turnover de ativos'
    ],
    riscos: [
      'Lajes corporativas em SP com vacância estrutural pós-pandemia',
      'Sensível à taxa de juros — P/VP comprimido em ciclos de Selic alta'
    ],
    nivel: 'Moderado', nivelCor: '#f59e0b'
  },
  'FII - Lajes': {
    oportunidades: [
      'Escritórios triple A em localizações prime retornam à ocupação plena',
      'Contratos atípicos com grandes empresas garantem receita estável',
      'P/VP com desconto histórico — oportunidade de entrada'
    ],
    riscos: [
      'Trabalho híbrido reduz demanda estrutural por lajes',
      'Alta vacância em localizações secundárias pressionando renda',
      'Concentração em São Paulo expõe a mercado único'
    ],
    nivel: 'Moderado-Alto', nivelCor: '#f43f5e'
  },
  'FII - FoF': {
    oportunidades: [
      'Diversificação automática em 30+ FIIs com um único ativo',
      'Gestores compram FIIs com desconto — P/VP do portfólio < 1',
      'BTG e RBR com acesso privilegiado a ofertas primárias e secundárias'
    ],
    riscos: [
      'Taxa de administração dupla (FoF + FIIs subjacentes) reduz rendimento líquido',
      'Performance vinculada às decisões de alocação dos gestores',
      'Menos transparência sobre ativos subjacentes vs FII direto'
    ],
    nivel: 'Baixo', nivelCor: '#00e676'
  },
  'FIAGRO - CRA': {
    oportunidades: [
      'Rendimentos mensais ISENTOS de IR — vantagem vs renda fixa tributada',
      'CRAs com spread alto — DY de 12–15% líquidos são excepcionais',
      'Agronegócio é o motor da economia brasileira — base de devedores sólida',
      'P/VP abaixo de 1 = oportunidade de compra com margem de segurança'
    ],
    riscos: [
      'Risco de crédito: devedores agrícolas impactados por safra ruim',
      'Liquidez menor que FIIs — bid-offer spread mais largo',
      'Segmento mais novo com histórico de dados mais curto',
      'Concentração setorial no agro amplifica risco sistêmico do setor'
    ],
    nivel: 'Moderado', nivelCor: '#f59e0b'
  },
  'Indústria': {
    oportunidades: [
      'WEG com crescimento global consistente em mais de 135 países',
      'Motores elétricos como infraestrutura essencial da transição energética',
      'Expansão em automação industrial e geração distribuída'
    ],
    riscos: [
      'DY baixo (1–3%) — foco em crescimento, não distribuição imediata',
      'Múltiplos elevados (P/VP 8x+) criam risco de revisão em queda'
    ],
    nivel: 'Moderado', nivelCor: '#f59e0b'
  },
  'Shopping': {
    oportunidades: [
      'Shoppings premium resilientes à inflação e ao e-commerce',
      'Receita de estacionamento e diversificação de serviços crescente'
    ],
    riscos: [
      'Alta de juros reduz consumo e margem dos lojistas',
      'Custo de expansão com crédito caro comprime retorno sobre capital'
    ],
    nivel: 'Moderado', nivelCor: '#f59e0b'
  },
  'Logística': {
    oportunidades: [
      'Setor de logística de veículos crescendo com retomada do crédito automotivo',
      'DY atrativo com ROE alto e baixa dívida — combinação rara'
    ],
    riscos: [
      'Concentrado em poucos clientes — riscos de perda de contrato',
      'Setor nichado com liquidez menor na bolsa'
    ],
    nivel: 'Moderado', nivelCor: '#f59e0b'
  },
};

/* ── Mapeamento de setor de ativo para categoria macro de alocação ── */
function getCategoriaMacro(ativo) {
  const d = ATIVOS[ativo];
  if (!d) return 'Outros';
  if (d.tipo === 'FII' || d.tipo === 'FIAGRO') return 'FIIs/FIAGROs';
  const s = d.setor;
  if (s.includes('Banco')) return 'Bancos';
  if (s.includes('Energia')) return 'Energia';
  if (s.includes('Saneamento')) return 'Saneamento';
  if (s.includes('Telecom') || s.includes('Seguros')) return 'Telecom/Seguros';
  if (s.includes('Agro') || s.includes('Celulose') || s.includes('Mineração') || s.includes('Petróleo') || s.includes('Logística')) return 'Agro/Commodities';
  return 'Outros';
}

/* ── Mapa de alocação ideal por perfil ── */
const ALOCACOES_APORTE = {
  conservador: { 'Bancos':15, 'Energia':25, 'Saneamento':20, 'Telecom/Seguros':10, 'FIIs/FIAGROs':25, 'Agro/Commodities':5 },
  moderado:    { 'Bancos':20, 'Energia':18, 'Saneamento':15, 'Telecom/Seguros':12, 'FIIs/FIAGROs':25, 'Agro/Commodities':10 },
  arrojado:    { 'Bancos':25, 'Energia':12, 'Saneamento':8,  'Telecom/Seguros':10, 'FIIs/FIAGROs':20, 'Agro/Commodities':25 },
};

/* ── Melhor ativo por categoria para recomendação ── */
function getBestAtivosCategoria(categoria, perfilObj, objetivo, jaNaCarteira) {
  // Mapa de categorias macro para setores do ATIVOS
  const setorFiltro = {
    'Bancos':          a => a.setor.includes('Banco'),
    'Energia':         a => a.setor === 'Energia',
    'Saneamento':      a => a.setor === 'Saneamento',
    'Telecom/Seguros': a => a.setor.includes('Telecom') || a.setor.includes('Seguro'),
    'FIIs/FIAGROs':    a => a.tipo === 'FII' || a.tipo === 'FIAGRO',
    'Agro/Commodities':a => ['Agronegócio','Celulose/Papel','Mineração','Petróleo & Gás','Logística'].some(s => a.setor.includes(s)),
  };
  const filtro = setorFiltro[categoria];
  if (!filtro) return [];

  const candidatos = Object.entries(ATIVOS).filter(([, d]) => filtro(d));

  // Score baseado no objetivo
  const scored = candidatos.map(([ticker, d]) => {
    let score = 0;
    const isFundo = d.tipo === 'FII' || d.tipo === 'FIAGRO';

    if (objetivo === 'renda') {
      // Prioriza DY alto com qualidade
      if (d.dy >= 8 && d.dy <= 15) score += 40;
      else if (d.dy >= 6) score += 25;
      if (d.pvp < 1.0)  score += 25;
      else if (d.pvp <= 1.1) score += 15;
      if (!isFundo && d.payout >= 30 && d.payout <= 85) score += 20;
      if (!isFundo && d.roe >= 15) score += 15;
      if (d.isentoIR) score += 10;
    } else if (objetivo === 'crescimento') {
      // Prioriza ROE alto e dívida baixa
      if (!isFundo && d.roe >= 20) score += 35;
      else if (!isFundo && d.roe >= 15) score += 20;
      if (!isFundo && d.divida <= 1.5) score += 25;
      if (d.pvp < 1.5) score += 20;
      if (d.dy >= 5) score += 10;
    } else if (objetivo === 'seguranca') {
      // Prioriza setores defensivos e dívida baixa
      const setoresDefensivos = ['Energia','Saneamento','FII - Papel','FIAGRO'];
      if (setoresDefensivos.some(s => d.setor.includes(s))) score += 30;
      if (!isFundo && d.divida <= 2) score += 25;
      if (d.pvp < 1.2) score += 20;
      if (d.dy >= 6) score += 15;
      if (d.isentoIR) score += 10;
    } else { // equilibrio
      if (d.dy >= 6 && d.dy <= 12) score += 25;
      if (!isFundo && d.payout >= 30 && d.payout <= 80) score += 20;
      if (!isFundo && d.roe >= 15) score += 20;
      if (d.pvp < 1.1) score += 20;
      if (!isFundo && d.divida <= 2.5) score += 15;
    }

    // Bonus se já está na carteira (adicionar mais da mesma boa posição)
    // Penalidade se excessivamente representado
    const qtdNaCarteira = jaNaCarteira.filter(a => a.ticker === ticker).length;
    if (qtdNaCarteira > 0) score += 5; // small bonus for continuity
    return { ticker, d, score };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 2);
}

/* ── Função principal: Gerar Assessor de Aporte com Gemini IA ── */
async function gerarAssessorAporte() {
  const valorStr = document.getElementById('ap-valor').value;
  const aporte = parseFloat(valorStr);
  if (!aporte || aporte < 1) { alert('Informe um valor de aporte válido (mínimo R$1).'); return; }
  const perfil = document.getElementById('ap-perfil').value;
  const objetivo = document.getElementById('ap-objetivo').value;
  const objetivoLabel = {
    'renda':'Máxima Renda Passiva (DY alto)',
    'equilibrio':'Equilíbrio Renda + Crescimento',
    'crescimento':'Crescimento Patrimonial',
    'seguranca':'Segurança e Preservação'
  }[objetivo];

  document.getElementById('ap-empty').style.display   = 'none';
  document.getElementById('ap-result').style.display  = 'none';
  document.getElementById('ap-loading').style.display = 'block';

  // Montar contexto da carteira atual
  const totalAtual  = portfolio.reduce((s, a) => s + a.qtd * a.precoAtual, 0);
  const totalInvest = portfolio.reduce((s, a) => s + a.totalInvest, 0);
  const rendaMensal = portfolio.reduce((s, a) => s + (a.qtd * a.precoAtual) * (a.dy / 100) / 12, 0);
  const dyMedio     = totalAtual > 0 ? portfolio.reduce((s, a) => s + a.dy * (a.qtd * a.precoAtual / totalAtual), 0) : 0;
  const pnl         = totalAtual - totalInvest;

  const perfilLabel = { conservador:'Conservador', moderado:'Moderado', arrojado:'Arrojado' }[perfil];

  // Montar lista de ativos da carteira
  let carteiraTexto = '';
  if (portfolio.length === 0) {
    carteiraTexto = 'CARTEIRA ATUAL: Vazia — investidor está começando do zero.';
  } else {
    carteiraTexto = `CARTEIRA ATUAL (${portfolio.length} ativos):\n`;
    portfolio.forEach(a => {
      const valorPos = a.qtd * a.precoAtual;
      const peso = totalAtual > 0 ? (valorPos / totalAtual * 100).toFixed(1) : 0;
      const pnlPos = valorPos - a.totalInvest;
      carteiraTexto += `• ${a.ticker}: ${a.qtd} cotas · P.médio R$${a.precoPago.toFixed(2)} · Atual R$${a.precoAtual.toFixed(2)} · P&L ${pnlPos >= 0 ? '+' : ''}R$${pnlPos.toFixed(0)} · DY ${a.dy}% · Setor: ${a.setor} · Peso: ${peso}%\n`;
    });
    carteiraTexto += `\nRESUMO: Valor total R$${totalAtual.toFixed(0)} | P&L ${pnl >= 0 ? '+' : ''}R$${pnl.toFixed(0)} | Renda mensal R$${rendaMensal.toFixed(0)}/mês | DY médio ${dyMedio.toFixed(1)}%`;
  }

  // Base de ativos disponíveis resumida para Gemini
  const ativosDisponiveis = Object.entries(ATIVOS).map(([ticker, d]) => {
    const isFundo = d.tipo === 'FII' || d.tipo === 'FIAGRO';
    return `${ticker} (${d.nome}, ${d.setor}, DY:${d.dy}%, P/VP:${d.pvp}x${isFundo ? `, IR:${d.isentoIR ? 'Isento' : 'Trib'}` : `, ROE:${d.roe}%, Div:${d.divida}x`}, Preço:R$${d.preco})`;
  }).join('\n');

  const prompt = `Você é um assessor especialista em investimentos de dividendos e renda passiva na bolsa brasileira (B3). Analise a carteira do investidor e gere um plano de aporte detalhado, personalizado e fundamentado. Responda em português brasileiro.

${carteiraTexto}

APORTE DISPONÍVEL: R$ ${aporte.toFixed(2)}
PERFIL: ${perfilLabel}
OBJETIVO: ${objetivoLabel}

CONTEXTO MACROECONÔMICO ATUAL:
- SELIC: ${taxaSelic.toFixed(2)}% a.a.
- CDI: ${taxaCdi.toFixed(2)}% a.a.
- IPCA (12m): ${taxaIpca.toFixed(2)}%
- Juro Real: ${(taxaSelic - taxaIpca).toFixed(2)}%

ATIVOS DISPONÍVEIS NA BASE (escolha apenas entre estes para suas recomendações de compra):
${ativosDisponiveis}

INSTRUÇÕES CRÍTICAS:
1. Recomende APENAS ativos da lista acima
2. Calcule a quantidade EXATA de cotas baseado no preço listado e no valor de aporte
3. A soma dos aportes recomendados NÃO pode ultrapassar R$ ${aporte.toFixed(2)}
4. Para cada ativo recomendado, calcule: qtd × preço = valor aportado, e (valor total na posição × DY%) ÷ 12 = renda mensal adicional
5. Analise a carteira atual e identifique gaps de diversificação reais
6. Seja específico sobre riscos — não use frases genéricas

Responda em EXATAMENTE este formato JSON (sem markdown, apenas JSON puro):
{
  "diagnostico": {
    "saude": "BOM|REGULAR|ATENÇÃO|INICIANDO",
    "resumo": "2-3 frases avaliando a carteira atual considerando o contexto macro",
    "dyVsSelic": "frase comparando DY médio com a Selic atual",
    "pontoForte": "principal ponto forte da carteira atual (ou 'Oportunidade de construir uma carteira sólida do zero')",
    "pontoFraco": "principal vulnerabilidade ou gap identificado"
  },
  "compras": [
    {
      "ticker": "XXXX11",
      "nome": "Nome do ativo",
      "qtd": 10,
      "precoRef": 98.20,
      "valorTotal": 982.00,
      "rendaAdicionalMes": 9.34,
      "motivoPrincipal": "1 frase clara do por que comprar agora",
      "oportunidades": ["oportunidade específica 1", "oportunidade específica 2", "oportunidade específica 3"],
      "riscos": ["risco específico 1", "risco específico 2"],
      "urgencia": "ALTA|MEDIA|BAIXA",
      "urgenciaMotivo": "Por que tem essa urgência (ou não)"
    }
  ],
  "alertasConcentracao": [
    {
      "ticker": "XXXX3",
      "alerta": "descrição do problema de concentração ou risco identificado",
      "acao": "o que fazer — não aportar mais / reduzir gradualmente / trocar por X"
    }
  ],
  "saldoNaoAlocado": 0,
  "rendaTotalAdicional": 0,
  "mensagemFinal": "1-2 frases motivadoras e realistas sobre o impacto deste aporte na jornada de renda passiva"
}`;

  let resultado = null;
  try {
    const response = await fetch('/.netlify/functions/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // API key gerenciada pela Netlify Function gemini proxy
      body: JSON.stringify({
        model: 'gemini-1.5-flash', // Gemini (gerenciado pelo proxy)
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const raw = data.content?.map(b => b.text || '').join('').trim();
    const clean = raw.replace(/```json|```/g, '').trim();
    resultado = JSON.parse(clean);
  } catch(e) {
    console.error('Gemini API erro:', e);
    document.getElementById('ap-loading').style.display = 'none';
    document.getElementById('ap-empty').style.display = 'block';
    document.getElementById('ap-empty').innerHTML = `
      <div class="a-empty-icon">⚠️</div>
      <h3>Erro ao conectar com a IA</h3>
      <p>Não foi possível obter análise da Gemini API neste momento.<br>Verifique sua conexão ou tente novamente.</p>
      <p style="font-size:11px;color:var(--muted);margin-top:8px">Erro: ${e.message}</p>`;
    return;
  }

  document.getElementById('ap-loading').style.display = 'none';
  renderResultadoAporteIA(resultado, aporte, totalAtual, rendaMensal, dyMedio, pnl, portfolio.length);
  document.getElementById('ap-result').style.display = 'block';
  window.scrollTo({ top: document.getElementById('ap-result').offsetTop - 20, behavior: 'smooth' });
}


function limparResultadoAporte() {
  document.getElementById('ap-result').style.display  = 'none';
  document.getElementById('ap-empty').style.display   = 'block';
  document.getElementById('ap-empty').innerHTML = `
    <div class="a-empty-icon">🧠</div>
    <h3>Assessor de Aporte Pronto</h3>
    <p>Informe o valor que você tem disponível e receba um plano completo de onde investir, com riscos e oportunidades detalhados por ativo.</p>`;
}

/* ══ RENDER PRINCIPAL: resultado do Gemini IA ══ */
function renderResultadoAporteIA(r, aporte, totalAtual, rendaMensal, dyMedio, pnl, nAtivos) {
  const totalInvest = portfolio.reduce((s,a) => s + a.totalInvest, 0);
  const pnlPct = totalInvest > 0 ? (pnl / totalInvest * 100) : 0;

  // ── Diagnóstico ──
  const saudeColor = { 'BOM':'var(--green)', 'REGULAR':'#f59e0b', 'ATENÇÃO':'#f43f5e', 'INICIANDO':'var(--blue)' }[r.diagnostico?.saude] || 'var(--muted)';
  const saudeIco   = { 'BOM':'✅', 'REGULAR':'🟡', 'ATENÇÃO':'🔴', 'INICIANDO':'🚀' }[r.diagnostico?.saude] || '📊';
  let diagHTML = '';
  if (totalAtual > 0) {
    diagHTML = `<div class="ap-diag-kpis">
      <div class="ap-diag-kpi"><div class="ap-diag-kpi-l">Valor Atual</div><div class="ap-diag-kpi-v" style="color:var(--green)">${fBRL(totalAtual)}</div></div>
      <div class="ap-diag-kpi"><div class="ap-diag-kpi-l">P&L</div><div class="ap-diag-kpi-v" style="color:${pnl>=0?'var(--green)':'#f43f5e'}">${pnl>=0?'+':''}${fBRL(pnl)} (${pnlPct>=0?'+':''}${pnlPct.toFixed(1)}%)</div></div>
      <div class="ap-diag-kpi"><div class="ap-diag-kpi-l">Renda Mensal</div><div class="ap-diag-kpi-v" style="color:var(--teal)">${fBRL(rendaMensal)}/mês</div></div>
      <div class="ap-diag-kpi"><div class="ap-diag-kpi-l">DY Médio</div><div class="ap-diag-kpi-v">${fPct(dyMedio)}</div></div>
      <div class="ap-diag-kpi"><div class="ap-diag-kpi-l">Ativos</div><div class="ap-diag-kpi-v">${nAtivos}</div></div>
    </div>`;
  }
  diagHTML += `<div style="display:flex;align-items:center;gap:10px;margin:12px 0;padding:12px 16px;background:${saudeColor}12;border:1px solid ${saudeColor}30;border-radius:10px">
    <span style="font-size:20px">${saudeIco}</span>
    <div>
      <div style="font-size:13px;font-weight:800;color:${saudeColor}">${r.diagnostico?.saude || 'ANÁLISE CONCLUÍDA'}</div>
      <div style="font-size:12px;color:var(--muted);margin-top:2px;line-height:1.6">${r.diagnostico?.resumo || ''}</div>
    </div>
  </div>`;
  if (r.diagnostico?.dyVsSelic) diagHTML += `<div style="font-size:12px;color:var(--muted);line-height:1.7;padding:8px 12px;background:var(--bg3);border-radius:8px;margin-bottom:8px">📊 ${r.diagnostico.dyVsSelic}</div>`;
  if (r.diagnostico?.pontoForte) diagHTML += `<div style="display:flex;gap:8px;padding:8px 12px;background:#00e67610;border:1px solid #00e67630;border-radius:8px;font-size:12px;margin-bottom:6px"><span>💪</span><span style="color:var(--text)"><strong style="color:var(--green)">Ponto forte:</strong> ${r.diagnostico.pontoForte}</span></div>`;
  if (r.diagnostico?.pontoFraco)  diagHTML += `<div style="display:flex;gap:8px;padding:8px 12px;background:#f59e0b10;border:1px solid #f59e0b30;border-radius:8px;font-size:12px"><span>🔍</span><span style="color:var(--text)"><strong style="color:var(--gold)">Gap identificado:</strong> ${r.diagnostico.pontoFraco}</span></div>`;
  document.getElementById('ap-diag-content').innerHTML = diagHTML;

  // ── Alocação atual vs ideal (mantém render de gaps local) ──
  const perfilSel = document.getElementById('ap-perfil').value;
  const idealMap = ALOCACOES_APORTE[perfilSel];
  const alocAtual = { 'Bancos':0,'Energia':0,'Saneamento':0,'Telecom/Seguros':0,'FIIs/FIAGROs':0,'Agro/Commodities':0,'Outros':0 };
  portfolio.forEach(a => { const c = getCategoriaMacro(a.ticker); alocAtual[c] = (alocAtual[c]||0) + a.qtd*a.precoAtual; });
  const totalAloc = Object.values(alocAtual).reduce((s,v) => s+v, 0);
  const alocPct = {}; Object.keys(alocAtual).forEach(k => { alocPct[k] = totalAloc > 0 ? (alocAtual[k]/totalAloc)*100 : 0; });
  const gaps = {}; Object.keys(idealMap).forEach(c => { gaps[c] = idealMap[c] - (alocPct[c]||0); });
  renderGapsAporte(alocPct, idealMap, gaps);

  // ── Compras recomendadas pela IA ──
  const compras = r.compras || [];
  const totalRendaAdicional = compras.reduce((s, c) => s + (c.rendaAdicionalMes || 0), 0);
  const saldo = r.saldoNaoAlocado || 0;
  const valorUsado = aporte - saldo;
  document.getElementById('ap-compras-desc').innerHTML =
    compras.length ? `Plano gerado pela <strong style="color:var(--purple)">Gemini IA</strong> para <strong>${fBRL(valorUsado)}</strong> em <strong>${compras.length} ativo${compras.length>1?'s':''}</strong>. Renda adicional estimada: <strong style="color:var(--green)">+${fBRL(totalRendaAdicional)}/mês</strong>.${saldo > 0 ? ` Saldo não alocado: ${fBRL(saldo)}.` : ''}`
    : 'A IA não encontrou alocações adequadas para o valor e perfil informados.';

  let comprasHTML = '<div class="ap-compras-grid">';
  compras.forEach(c => {
    const d = ATIVOS[c.ticker];
    const isFundo = d && (d.tipo === 'FII' || d.tipo === 'FIAGRO');
    const tipo = d ? d.tipo : 'AÇÃO';
    const badgeCor = tipo === 'FII' ? '#18ffff' : tipo === 'FIAGRO' ? '#1de9b6' : '#f59e0b';
    const urgCor = { 'ALTA':'#f43f5e','MEDIA':'#f59e0b','BAIXA':'var(--green)' }[c.urgencia] || '#f59e0b';
    const rendaMes = c.rendaAdicionalMes || 0;
    comprasHTML += `<div class="ap-rec-card">
      <div class="ap-rec-head">
        <div>
          <div class="ap-rec-ticker">${c.ticker}</div>
          <div class="ap-rec-nome">${c.nome}${d ? ' · ' + d.setor : ''}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <span class="ap-rec-badge" style="background:${badgeCor}22;color:${badgeCor};border:1px solid ${badgeCor}44">${tipo}</span>
          <span class="ap-rec-badge" style="background:${urgCor}22;color:${urgCor};border:1px solid ${urgCor}44">Urgência ${c.urgencia||'MEDIA'}</span>
        </div>
      </div>
      <div class="ap-rec-body">
        <div class="ap-rec-order">
          <div class="ap-rec-order-title">📋 Ordem da IA</div>
          <div class="ap-rec-order-main">COMPRAR ${c.qtd} cota${c.qtd>1?'s':''} de ${c.ticker}</div>
          <div class="ap-rec-order-detail">≈ ${fBRL(c.valorTotal)} · Preço ref.: R$ ${(c.precoRef||0).toFixed(2)}/cota</div>
        </div>
        ${d ? `<div class="ap-rec-kpis">
          <div class="ap-rec-kpi"><div class="ap-rec-kpi-l">${isFundo?'Rendim.':'DY'}</div><div class="ap-rec-kpi-v" style="color:${d.dy>=7?'var(--green)':'#f59e0b'}">${d.dy}%</div></div>
          <div class="ap-rec-kpi"><div class="ap-rec-kpi-l">P/VP</div><div class="ap-rec-kpi-v" style="color:${d.pvp<1.05?'var(--green)':'#f59e0b'}">${d.pvp}x</div></div>
          ${isFundo
            ? `<div class="ap-rec-kpi"><div class="ap-rec-kpi-l">IR</div><div class="ap-rec-kpi-v" style="color:var(--green)">${d.isentoIR?'Isento':'Trib.'}</div></div>
               <div class="ap-rec-kpi"><div class="ap-rec-kpi-l">Liq.</div><div class="ap-rec-kpi-v" style="color:${d.liquidez==='Alta'?'var(--green)':'#f59e0b'}">${d.liquidez||'—'}</div></div>`
            : `<div class="ap-rec-kpi"><div class="ap-rec-kpi-l">ROE</div><div class="ap-rec-kpi-v" style="color:${d.roe>=15?'var(--green)':'#f59e0b'}">${d.roe}%</div></div>
               <div class="ap-rec-kpi"><div class="ap-rec-kpi-l">Dívida</div><div class="ap-rec-kpi-v" style="color:${(d.divida||0)<=2.5?'var(--green)':'#f43f5e'}">${d.divida!=null?d.divida+'x':'N/A'}</div></div>`}
        </div>` : ''}
        <div style="padding:10px 12px;background:var(--bg3);border-radius:8px;margin-bottom:10px;font-size:12px;color:var(--text);line-height:1.6;border-left:3px solid var(--purple)">
          <strong style="color:var(--purple)">Por que comprar agora?</strong><br>${c.motivoPrincipal || ''}
        </div>
        <div class="ap-rec-blocks">
          ${(c.oportunidades||[]).length ? `<div class="ap-rec-block oport">
            <div class="ap-rec-block-title"><i class="fa-solid fa-arrow-trend-up"></i> Oportunidades (via IA)</div>
            <div class="ap-rec-block-list">${c.oportunidades.map(o=>`<div class="ap-rec-block-item">${o}</div>`).join('')}</div>
          </div>` : ''}
          ${(c.riscos||[]).length ? `<div class="ap-rec-block risk">
            <div class="ap-rec-block-title"><i class="fa-solid fa-triangle-exclamation"></i> Riscos a monitorar (via IA)</div>
            <div class="ap-rec-block-list">${c.riscos.map(r=>`<div class="ap-rec-block-item">${r}</div>`).join('')}</div>
          </div>` : ''}
        </div>
        ${c.urgenciaMotivo ? `<div style="font-size:11px;color:${urgCor};padding:6px 10px;background:${urgCor}10;border-radius:6px;margin-bottom:8px">⏱ ${c.urgenciaMotivo}</div>` : ''}
        <div class="ap-rec-income">
          <div class="ap-rec-income-l">💰 Renda adicional estimada pela IA</div>
          <div class="ap-rec-income-v">+${fBRL(rendaMes)}/mês</div>
        </div>
      </div>
    </div>`;
  });
  comprasHTML += '</div>';
  document.getElementById('ap-compras-grid').innerHTML = comprasHTML;

  // ── Alertas de concentração ──
  const alertas = r.alertasConcentracao || [];
  const vendaCard = document.getElementById('ap-vendas-card');
  if (alertas.length) {
    vendaCard.style.display = 'block';
    document.getElementById('ap-vendas-content').innerHTML = alertas.map(a => `
      <div class="ap-venda-item">
        <div class="ap-venda-ticker">⚠ ${a.ticker}</div>
        <div class="ap-venda-desc">
          <strong>Alerta:</strong> ${a.alerta}<br>
          <strong>O que fazer:</strong> ${a.acao}
        </div>
      </div>`).join('');
  } else { vendaCard.style.display = 'none'; }

  // ── Impacto projetado ──
  const novaRenda = rendaMensal + totalRendaAdicional;
  const novoPatrimonio = totalAtual + valorUsado;
  const dyProjetado = novoPatrimonio > 0 ? (novaRenda * 12 / novoPatrimonio) * 100 : 0;
  const metas = [
    { v:1000, ico:'🎯', label:'R$1.000/mês' }, { v:3000, ico:'🏡', label:'R$3.000/mês' },
    { v:5000, ico:'✈️', label:'R$5.000/mês' }, { v:10000, ico:'🌟', label:'R$10.000/mês' }
  ];
  let impHTML = `<div class="ap-impacto-grid">
    <div class="ap-impacto-kpi"><div class="ap-impacto-kpi-l">Renda Mensal Atual</div><div class="ap-impacto-kpi-v" style="color:var(--muted)">${fBRL(rendaMensal)}</div></div>
    <div class="ap-impacto-kpi" style="border-color:var(--green)"><div class="ap-impacto-kpi-l">Renda após aporte</div><div class="ap-impacto-kpi-v" style="color:var(--green)">${fBRL(novaRenda)}</div></div>
    <div class="ap-impacto-kpi"><div class="ap-impacto-kpi-l">Ganho mensal</div><div class="ap-impacto-kpi-v" style="color:var(--teal)">+${fBRL(totalRendaAdicional)}</div></div>
    <div class="ap-impacto-kpi"><div class="ap-impacto-kpi-l">DY projetado</div><div class="ap-impacto-kpi-v">${fPct(dyProjetado)}</div></div>
  </div><div class="ap-impacto-metas">`;
  metas.forEach(m => {
    if (novaRenda >= m.v) {
      impHTML += `<div class="ap-impacto-meta"><div class="ap-impacto-meta-ico">${m.ico}</div><div class="ap-impacto-meta-txt">Meta <strong>${m.label}</strong> já atingida!</div><div class="ap-impacto-meta-badge">✅ Atingida</div></div>`;
    } else {
      const falta = m.v - novaRenda;
      const pat = falta * 12 / (dyProjetado > 0 ? dyProjetado / 100 : 0.08);
      const meses = Math.ceil(pat / aporte);
      impHTML += `<div class="ap-impacto-meta"><div class="ap-impacto-meta-ico">${m.ico}</div><div class="ap-impacto-meta-txt">Para <strong>${m.label}</strong>: faltam <strong>+${fBRL(falta)}/mês</strong> (~${fBRL(pat)} de patrimônio adicional)</div><div class="ap-impacto-meta-badge">~${meses < 12 ? meses + ' meses' : Math.ceil(meses/12) + ' anos'}</div></div>`;
    }
  });
  impHTML += '</div>';
  if (r.mensagemFinal) impHTML += `<div style="margin-top:16px;padding:14px 16px;background:var(--bg3);border-radius:10px;border-left:4px solid var(--purple);font-size:13px;color:var(--text);line-height:1.7"><span style="color:var(--purple);font-weight:800">🤖 IA Gemini diz:</span> ${r.mensagemFinal}</div>`;
  document.getElementById('ap-impacto-content').innerHTML = impHTML;
}

function renderGapsAporte(alocAtualPct, idealMap, gaps) {
  const catColors = {
    'Bancos':'#448aff','Energia':'#ffd740','Saneamento':'#00e676',
    'Telecom/Seguros':'#e040fb','FIIs/FIAGROs':'#18ffff','Agro/Commodities':'#1de9b6'
  };
  const cats = Object.keys(idealMap);
  let html = '<div class="ap-gap-table">';
  html += `<div class="ap-gap-row" style="opacity:.6;font-size:10px;font-family:var(--mono);color:var(--muted);padding-bottom:4px;border-bottom:1px solid var(--border)">
    <div>CATEGORIA</div><div>ATUAL</div><div>IDEAL</div><div>GAP</div><div>STATUS</div>
  </div>`;
  cats.forEach(cat => {
    const atual = alocAtualPct[cat] || 0;
    const ideal = idealMap[cat];
    const gap = gaps[cat];
    const cor = catColors[cat] || 'var(--muted)';
    let status, statusClass;
    if (gap > 10)      { status = `–${gap.toFixed(0)}% abaixo`; statusClass = 'neg'; }
    else if (gap < -10){ status = `+${Math.abs(gap).toFixed(0)}% acima`; statusClass = 'neg'; }
    else               { status = '✓ ok'; statusClass = 'ok'; }
    html += `<div class="ap-gap-row">
      <div class="ap-gap-label" style="color:${cor}">${cat}</div>
      <div class="ap-gap-bar-wrap">
        <div class="ap-gap-bar-label">Atual: ${atual.toFixed(0)}%</div>
        <div class="ap-gap-track"><div class="ap-gap-fill" style="width:${Math.min(atual,100)}%;background:${cor}88"></div></div>
      </div>
      <div class="ap-gap-bar-wrap">
        <div class="ap-gap-bar-label">Ideal: ${ideal}%</div>
        <div class="ap-gap-track"><div class="ap-gap-fill" style="width:${ideal}%;background:${cor}"></div></div>
      </div>
      <div class="ap-gap-pct" style="color:${cor}">${atual.toFixed(0)}% → ${ideal}%</div>
      <div class="ap-gap-diff ${statusClass}">${status}</div>
    </div>`;
  });
  html += '</div>';
  document.getElementById('ap-gaps-content').innerHTML = html;
}
