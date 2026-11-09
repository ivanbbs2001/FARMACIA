export const rgb=h=>{try{return[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)).join(",");}catch{return"100,180,100";}};
export const getFlags=(g,i)=>{const n=Number(i);return{isG:g==="gestante",isL:g==="lactante",isC:g==="crianca"||(i&&n<12),isI:g==="idoso"||(i&&n>=65)};};
export const getWarns=(m,f)=>{if(!m||!f)return[];const w=[];if(f.isG&&!m.gS)w.push({d:false,s:"Pode ser contraindicado na gestação"});if(f.isL&&!m.lS)w.push({d:false,s:"Pode contraindicar amamentação"});if(f.isC&&!m.cS)w.push({d:true,s:"Não recomendado para crianças <12 anos"});return w;};

/* ═══════════════════════════════════════ ALTERNATIVES MAP ═══════════════════════════════════════ */

/* normaliza texto: minúsculas, sem acentos (busca "acido folico" acha "Ácido Fólico") */
export const norm = (s) => (s || "").toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();

/* idade (em dias) de uma data "DD/MM/AAAA"; null se inválida */
export const diasDesde = (dataBR) => {
  const m = (dataBR || "").match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!m) return null;
  const d = new Date(+m[3], +m[2] - 1, +m[1]);
  return Math.floor((Date.now() - d.getTime()) / 86400000);
};

/* nível de defasagem dos dados da SESA: ok (<=15d, atualizam quinzenalmente), atencao (<=45d), antigo */
export const nivelSesa = (dataBR) => {
  const d = diasDesde(dataBR);
  if (d === null) return { nivel: "desconhecido", dias: null };
  return { nivel: d <= 15 ? "ok" : d <= 45 ? "atencao" : "antigo", dias: d };
};

/* texto curto: "emitido há 192 dias (01/05/2026)" */
export const textoIdadeSesa = (dataBR) => {
  const { dias } = nivelSesa(dataBR);
  if (dias === null) return "data do relatório desconhecida";
  return `emitido há ${dias} dia${dias === 1 ? "" : "s"} (${dataBR})`;
};
