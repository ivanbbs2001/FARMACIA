/* Leitura do texto copiado do PDF "Saldo em Estoque - Medicamentos CEAF" (SESA/PR).
   Formato real de cada linha:  NOME DO MEDICAMENTO   APRESENTAÇÃO   QUANTIDADE
   As colunas podem vir separadas por TAB, vários espaços ou espaço simples (depende do leitor de PDF). */

const FORMAS = [
  "FRASCO AMPOLA", "FRASCO-AMPOLA", "COMPRIMIDO", "CÁPSULA", "CAPSULA", "DRAGEA", "DRÁGEA", "SERINGA", "AMPOLA",
  "FRASCO", "BISNAGA", "ENVELOPE", "SACHÊ", "SACHE", "CARTUCHO", "CANETA", "ADESIVO", "SUSPENSÃO", "SOLUÇÃO",
  "XAROPE", "POMADA", "CREME", "COLÍRIO", "COLIRIO", "INALADOR", "TUBO", "BOLSA", "KIT", "LATA", "POTE", "PÓ",
  "COMP", "CAPS", "AMP", "FR",
];
const formasRe = new RegExp("(?:^|\\s)(" + [...FORMAS].sort((a, b) => b.length - a.length).map(f => f.replace(/[-]/g, "\\-")).join("|") + ")(?:\\s+[A-ZÀ-Ú.]+)?$", "i");

const IGNORAR = /^(sesa\/pr|cemepar|saldo em estoque|farm[áa]cia:|data da emiss|medicamento\s+apresenta|p[áa]gina|\d+\s*\/\s*\d+$)/i;

export function parseSesaText(raw) {
  const lines = raw.split(/\r?\n/).map(l => l.replace(/ /g, " ").trim()).filter(Boolean);
  const meds = [];
  let dataRel = "";
  let pend = []; /* fragmentos de nome quebrado em várias linhas */
  for (const l of lines) {
    const dm = l.match(/Data da Emiss[ãa]o:?\s*(\d{2}\/\d{2}\/\d{4})/i);
    if (dm) { dataRel = dm[1]; continue; }
    if (IGNORAR.test(l)) { pend = []; continue; }
    const q = l.match(/^(.*\S)\s+(\d{1,3}(?:\.\d{3})+|\d+)$/);
    if (!q) { pend.push(l); continue; }
    const qty = parseInt(q[2].replace(/\./g, ""), 10);
    let resto = (pend.length ? pend.join(" ") + " " : "") + q[1].trim(); pend = [];
    let nome = resto, apres = "";
    const cols = resto.split(/\t+|\s{2,}/).map(s => s.trim()).filter(Boolean);
    if (cols.length >= 2) {
      apres = cols[cols.length - 1];
      nome = cols.slice(0, -1).join(" ");
    } else {
      const fm = resto.match(formasRe);
      if (fm) { apres = fm[0].trim(); nome = resto.slice(0, resto.length - fm[0].length).trim(); }
    }
    if (nome.length < 3 || !Number.isFinite(qty)) continue;
    meds.push({ nome, apresentacao: apres.toUpperCase(), quantidade: qty });
  }
  return { data_relatorio: dataRel, medicamentos: meds };
}
