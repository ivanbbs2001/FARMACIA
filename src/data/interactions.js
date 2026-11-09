/* ─────────────────────────────────────────────────────────────
   INTERAÇÕES MEDICAMENTOSAS — base de apoio (NÃO exaustiva)
   Compilada de conhecimento farmacológico geral (bulas, RENAME, referências
   clássicas de interações). Deve ser REVISADA por farmacêutico responsável
   antes do uso no atendimento. Ausência de alerta NÃO significa segurança.
   Gravidade: "grave" (evitar/encaminhar), "moderada" (monitorar/ajustar), "leve" (orientar).
   ───────────────────────────────────────────────────────────── */

/* Combinações fixas: o medicamento contém estes componentes (para detectar duplicidade) */
export const COMPONENTES = {
  naprix_d: ["perindopril", "indapamida"],
  acertanlo: ["perindopril", "anlodipino"],
  naprix_a: ["perindopril", "anlodipino"],
  bulcero: ["omeprazol"],
};

/* Grupos de medicamentos (ids de MEDS) */
export const G = {
  AINE: ["ibuprofeno", "diclofenaco", "nimesulida", "etodolaco", "celecoxibe", "meloxicam"],
  IECA: ["enalapril", "captopril", "perindopril", "ramipril"],
  BRA: ["losartana", "valsartana", "olmesartana", "irbesartana"],
  BETA: ["nebivolol", "carvedilol", "atenolol", "propranolol", "metoprolol", "timolol_ocular"],
  BETA_NS: ["propranolol", "carvedilol", "timolol_ocular"],
  TIAZ: ["hidroclorotiazida", "indapamida"],
  DIUR: ["hidroclorotiazida", "indapamida", "furosemida", "espironolactona"],
  ANTICOAG: ["varfarina", "apixabana"],
  ANTI_HAS: ["enalapril", "captopril", "perindopril", "ramipril", "losartana", "valsartana", "olmesartana", "irbesartana",
    "anlodipino", "nebivolol", "carvedilol", "atenolol", "propranolol", "metoprolol", "hidroclorotiazida", "indapamida", "furosemida", "espironolactona"],
  ESTATINA: ["sinvastatina", "atorvastatina", "rosuvastatina"],
  SULFONIL: ["glibenclamida", "glicazida", "glipizida"],
  INSULINA: ["insulina_nph", "insulina_regular", "insulina_glargina"],
  HIPOGLIC: ["glibenclamida", "glicazida", "glipizida", "insulina_nph", "insulina_regular", "insulina_glargina", "metformina", "dapagliflozina"],
  HIPOGLIC_RISCO: ["glibenclamida", "glicazida", "glipizida", "insulina_nph", "insulina_regular", "insulina_glargina"],
  CATIONS: ["antiacido", "calcos", "calcio_vitd", "magnesio", "sucralfato", "sulfato_fe", "ainofer", "megafert", "minel"],
  FERRO: ["sulfato_fe", "ainofer", "megafert"],
  CALCIO_ANTAC: ["antiacido", "calcos", "calcio_vitd", "magnesio", "sucralfato"],
  QT: ["ondanset", "domperidona", "quetiapina", "fluconazol"],
  SEDAT_FARM: ["difenidram", "dimenidrin", "meclizina", "quetiapina"],
  SEDAT_FITO: ["valeriana", "passiflora", "melissa", "tilia", "camomila"],
  ANTIHIST: ["loratadina", "cetirizina", "fexofenadin", "difenidram", "dimenidrin", "meclizina"],
  BETA2: ["salbutamol", "formoterol"],
  IBP: ["omeprazol"],
  ANTIDOPA: ["metoclop", "quetiapina"],
  VITD_CA: ["vitd3", "aidetres", "calcio_vitd", "calcos"],
  SANGRAM_FITO: ["otodrat", "alho_fito", "cúrcuma", "bromelin", "gengibre", "garradiabo", "boldo", "omega3", "vite"],
  GLIC_FITO: ["gymnema", "canela_fito", "oliveira", "enax"],
  PA_FITO: ["hibisco", "oliveira", "alho_fito"],
  LAXANTE_K: ["flenus"],
  ANLO: ["anlodipino"],
};

/* Duplicidade terapêutica: 2+ itens do mesmo grupo */
export const DUPLICIDADES = [
  { g: "AINE", sev: "grave", nome: "AINEs", msg: "Dois anti-inflamatórios juntos não aumentam o efeito e elevam muito o risco de úlcera, sangramento e lesão renal." },
  { g: "IECA", sev: "grave", nome: "IECAs", msg: "Dois inibidores da ECA (ou combinações que contêm perindopril) — duplicidade; risco de hipotensão, hipercalemia e lesão renal." },
  { g: "BRA", sev: "grave", nome: "BRAs", msg: "Dois bloqueadores do receptor de angiotensina — duplicidade; risco de hipotensão, hipercalemia e lesão renal." },
  { g: "ESTATINA", sev: "grave", nome: "estatinas", msg: "Duas estatinas juntas — duplicidade; maior risco de dano muscular e hepático." },
  { g: "SULFONIL", sev: "grave", nome: "sulfonilureias", msg: "Duas sulfonilureias — duplicidade; alto risco de hipoglicemia." },
  { g: "ANTICOAG", sev: "grave", nome: "anticoagulantes", msg: "Dois anticoagulantes orais — risco grave de sangramento." },
  { g: "BETA", sev: "moderada", nome: "betabloqueadores", msg: "Dois betabloqueadores (inclui colírio de timolol) — risco de bradicardia e hipotensão." },
  { g: "TIAZ", sev: "moderada", nome: "diuréticos tiazídicos", msg: "Dois diuréticos tiazídicos (inclui indapamida do Naprix D) — duplicidade; risco de hipocalemia e desidratação." },
  { g: "IBP", sev: "moderada", nome: "omeprazol", msg: "Omeprazol duplicado (ex.: Bulcero + omeprazol)." },
  { g: "BETA2", sev: "moderada", nome: "β2-agonistas", msg: "Dois β2-agonistas (salbutamol + formoterol) — taquicardia, tremor, hipocalemia. Formoterol é de manutenção; salbutamol, de resgate: confirmar com o prescritor." },
  { g: "ANTIHIST", sev: "leve", nome: "anti-histamínicos", msg: "Dois anti-histamínicos H1 — duplicidade; mais sonolência e efeitos anticolinérgicos." },
  { g: "ANLO", sev: "moderada", nome: "anlodipino", msg: "Anlodipino em duplicidade (Acertanlo / Naprix A já contêm anlodipino)." },
];

/* Regras entre grupos / ids. a e b: nome de grupo (em G) ou id. */
export const REGRAS = [
  // ── sangramento ──
  { a: "AINE", b: "ANTICOAG", sev: "grave", msg: "Aumenta muito o risco de sangramento (gástrico e outros). Evitar; encaminhar ao prescritor." },
  { a: "aas", b: "ANTICOAG", sev: "grave", msg: "Aumenta o risco de sangramento. Só juntos se prescrito e monitorado." },
  { a: "aas", b: "AINE", sev: "grave", msg: "Risco de sangramento/úlcera; o ibuprofeno e outros AINEs podem reduzir o efeito cardioprotetor do AAS." },
  { a: "SANGRAM_FITO", b: "ANTICOAG", sev: "moderada", msg: "Fitoterápico/suplemento com efeito sobre a coagulação: pode aumentar o risco de sangramento. Evitar sem orientação." },
  { a: "SANGRAM_FITO", b: "aas", sev: "moderada", msg: "Pode somar efeito antiplaquetário e aumentar o risco de sangramento." },
  { a: "hiperico", b: "ANTICOAG", sev: "grave", msg: "Hipérico reduz o efeito dos anticoagulantes (indutor enzimático) — risco de trombose/AVC." },
  { a: "vitk", b: "varfarina", sev: "grave", msg: "Vitamina K antagoniza a varfarina e reduz seu efeito." },
  { a: "paracetamol", b: "varfarina", sev: "moderada", msg: "Uso regular de paracetamol (>2 g/dia) pode elevar o INR." },
  { a: "levotiroxina", b: "varfarina", sev: "moderada", msg: "Levotiroxina pode aumentar o efeito da varfarina; ajustar com INR." },
  { a: "camomila", b: "varfarina", sev: "leve", msg: "Relatos de aumento do efeito da varfarina com camomila em uso frequente." },
  { a: "enax", b: "varfarina", sev: "moderada", msg: "Ginseng pode reduzir o efeito da varfarina." },
  { a: "metronidazol", b: "varfarina", sev: "grave", msg: "Metronidazol aumenta bastante o efeito da varfarina — risco de sangramento." },
  { a: "fluconazol", b: "varfarina", sev: "grave", msg: "Fluconazol aumenta bastante o efeito da varfarina — risco de sangramento." },
  { a: "carbamazepina", b: "varfarina", sev: "moderada", msg: "Carbamazepina reduz o efeito da varfarina." },
  { a: "carbamazepina", b: "apixabana", sev: "grave", msg: "Carbamazepina reduz os níveis de apixabana — evitar." },
  { a: "hiperico", b: "ESTATINA", sev: "moderada", msg: "Hipérico reduz o efeito de sinvastatina/atorvastatina." },
  // ── rim / pressão / potássio ──
  { a: "AINE", b: "IECA", sev: "moderada", msg: "AINE reduz o efeito anti-hipertensivo e aumenta o risco de lesão renal (principalmente em idosos/desidratados)." },
  { a: "AINE", b: "BRA", sev: "moderada", msg: "AINE reduz o efeito anti-hipertensivo e aumenta o risco de lesão renal." },
  { a: "AINE", b: "DIUR", sev: "moderada", msg: "AINE reduz o efeito dos diuréticos e, com IECA/BRA, aumenta o risco de lesão renal." },
  { a: "AINE", b: "BETA", sev: "leve", msg: "AINE pode reduzir o efeito anti-hipertensivo dos betabloqueadores." },
  { a: "IECA", b: "BRA", sev: "grave", msg: "Não associar IECA + BRA sem indicação especializada: hipercalemia, hipotensão e lesão renal." },
  { a: "IECA", b: "espironolactona", sev: "grave", msg: "Risco de hipercalemia (potássio alto). Exige monitorar potássio e função renal." },
  { a: "BRA", b: "espironolactona", sev: "grave", msg: "Risco de hipercalemia (potássio alto). Exige monitorar potássio e função renal." },
  { a: "aas", b: "IECA", sev: "leve", msg: "AAS em doses analgésicas pode reduzir o efeito do IECA." },
  { a: "furosemida", b: "TIAZ", sev: "moderada", msg: "Associação aumenta a perda de potássio e de líquidos (hipocalemia, desidratação)." },
  { a: "PA_FITO", b: "ANTI_HAS", sev: "leve", msg: "Pode somar efeito sobre a pressão — risco de pressão muito baixa; monitorar." },
  { a: "flenus", b: "DIUR", sev: "moderada", msg: "Laxante estimulante + diurético: aumenta a perda de potássio." },
  { a: "salbutamol", b: "furosemida", sev: "leve", msg: "Ambos podem reduzir o potássio." },
  { a: "VITD_CA", b: "TIAZ", sev: "moderada", msg: "Tiazídicos reduzem a eliminação de cálcio: risco de hipercalcemia com cálcio/vitamina D." },
  { a: "dapagliflozina", b: "DIUR", sev: "moderada", msg: "Soma efeito diurético: risco de desidratação e hipotensão." },
  // ── glicemia ──
  { a: "SULFONIL", b: "fluconazol", sev: "grave", msg: "Fluconazol aumenta o efeito das sulfonilureias — risco de hipoglicemia grave." },
  { a: "HIPOGLIC_RISCO", b: "BETA", sev: "moderada", msg: "Betabloqueador pode mascarar sinais de hipoglicemia (tremor, taquicardia)." },
  { a: "insulina_nph", b: "SULFONIL", sev: "moderada", msg: "Insulina + sulfonilureia: maior risco de hipoglicemia." },
  { a: "dapagliflozina", b: "INSULINA", sev: "moderada", msg: "Risco de hipoglicemia (reduzir dose de insulina conforme prescritor) e cetoacidose." },
  { a: "GLIC_FITO", b: "HIPOGLIC", sev: "moderada", msg: "Fitoterápico com efeito hipoglicemiante: pode somar efeito e causar hipoglicemia. Monitorar glicemia." },
  // ── estatinas ──
  { a: "fluconazol", b: "ESTATINA", sev: "moderada", msg: "Fluconazol eleva níveis de sinvastatina/atorvastatina — risco de dor/lesão muscular." },
  { a: "sinvastatina", b: "anlodipino", sev: "moderada", msg: "Anlodipino eleva a sinvastatina: dose máxima de sinvastatina 20 mg/dia." },
  { a: "fenofibrato", b: "ESTATINA", sev: "moderada", msg: "Fibrato + estatina aumenta o risco de dano muscular." },
  { a: "kronel", b: "ESTATINA", sev: "grave", msg: "Levedura de arroz vermelho contém monacolina (equivale a estatina): duplicidade, risco de dano muscular/hepático." },
  { a: "antiacido", b: "rosuvastatina", sev: "leve", msg: "Antiácido reduz a absorção da rosuvastatina — separar por 2 h." },
  // ── absorção (separar horários) ──
  { a: "CATIONS", b: "levotiroxina", sev: "moderada", msg: "Cálcio, ferro, magnésio, antiácidos e sucralfato reduzem a absorção da levotiroxina — separar por pelo menos 4 h." },
  { a: "omeprazol", b: "levotiroxina", sev: "leve", msg: "Omeprazol pode reduzir a absorção da levotiroxina; acompanhar TSH." },
  { a: "CATIONS", b: "alendronato", sev: "moderada", msg: "Cálcio, ferro, magnésio e antiácidos impedem a absorção do alendronato. Tomar o alendronato em jejum e esperar ao menos 30 min (de preferência 2 h) para os demais." },
  { a: "AINE", b: "alendronato", sev: "moderada", msg: "Ambos podem irritar o estômago/esôfago." },
  { a: "FERRO", b: "CALCIO_ANTAC", sev: "leve", msg: "Cálcio/antiácidos reduzem a absorção do ferro — separar por 2 h." },
  { a: "FERRO", b: "omeprazol", sev: "leve", msg: "Redução da acidez do estômago diminui a absorção do ferro." },
  { a: "omeprazol", b: "vitb12", sev: "leve", msg: "Uso prolongado de omeprazol reduz a absorção de B12." },
  { a: "carbamazepina", b: "levotiroxina", sev: "moderada", msg: "Carbamazepina acelera o metabolismo da levotiroxina; pode exigir aumento de dose." },
  // ── neurológicos / psiquiátricos ──
  { a: "carbamazepina", b: "fluconazol", sev: "grave", msg: "Fluconazol aumenta os níveis de carbamazepina — risco de toxicidade." },
  { a: "carbamazepina", b: "valproato", sev: "moderada", msg: "Interação mútua nos níveis; monitorar com o prescritor." },
  { a: "carbamazepina", b: "quetiapina", sev: "grave", msg: "Carbamazepina reduz muito os níveis de quetiapina." },
  { a: "valproato", b: "aas", sev: "moderada", msg: "AAS eleva o valproato livre e aumenta o risco de sangramento." },
  { a: "QT", b: "QT", sev: "moderada", msg: "Somam efeito sobre o intervalo QT (risco de arritmia). Cautela em cardiopatas, idosos e com outros fatores de risco." },
  { a: "domperidona", b: "fluconazol", sev: "grave", msg: "Associação contraindicada: risco de arritmia grave (QT prolongado)." },
  { a: "ANTIDOPA", b: "pramipexol", sev: "moderada", msg: "Antagonistas da dopamina reduzem o efeito do pramipexol e pioram sintomas." },
  { a: "metoclop", b: "quetiapina", sev: "moderada", msg: "Risco de sintomas extrapiramidais." },
  { a: "SEDAT_FARM", b: "SEDAT_FARM", sev: "moderada", msg: "Somam sedação (sonolência, queda, confusão). Cautela em idosos e ao dirigir." },
  { a: "SEDAT_FARM", b: "SEDAT_FITO", sev: "leve", msg: "Fitoterápico calmante pode somar a sonolência." },
  { a: "hiperico", b: "dextro", sev: "grave", msg: "Risco de síndrome serotoninérgica." },
  { a: "hiperico", b: "ondanset", sev: "moderada", msg: "Somam efeito serotoninérgico; risco de síndrome serotoninérgica." },
  // ── outros ──
  { a: "metotrexato_ceaf", b: "AINE", sev: "grave", msg: "AINEs reduzem a eliminação do metotrexato: risco de toxicidade grave." },
  { a: "metotrexato_ceaf", b: "dipirona", sev: "grave", msg: "Associação aumenta o risco de queda de células do sangue (agranulocitose)." },
  { a: "metotrexato_ceaf", b: "omeprazol", sev: "moderada", msg: "Omeprazol pode elevar o metotrexato em tratamentos de dose alta." },
  { a: "BETA_NS", b: "BETA2", sev: "grave", msg: "Betabloqueador não seletivo pode antagonizar broncodilatadores e provocar broncoespasmo (asma/DPOC)." },
  { a: "BETA", b: "BETA2", sev: "leve", msg: "Betabloqueador pode reduzir o efeito do broncodilatador." },
];

/* ── motor ── */
const membros = (ref) => (G[ref] ? G[ref] : [ref]);
const SEV_ORDEM = { grave: 0, moderada: 1, leve: 2 };

/* ids selecionados -> lista de {comp, origem} (expande combinações fixas) */
const expandir = (ids) => ids.flatMap((id) => (COMPONENTES[id] || [id]).map((comp) => ({ comp, origem: id })));

/* Retorna [{sev, titulo, msg, ids:[origem...]}] ordenado por gravidade */
export function verificarInteracoes(ids) {
  const itens = expandir([...new Set(ids)]);
  const out = [];
  const chave = new Set();
  const add = (sev, titulo, msg, origens) => {
    const o = [...new Set(origens)].sort();
    const k = sev + "|" + titulo + "|" + o.join(",");
    if (chave.has(k)) return;
    chave.add(k);
    out.push({ sev, titulo, msg, ids: o });
  };

  for (const d of DUPLICIDADES) {
    const doGrupo = itens.filter((x) => membros(d.g).includes(x.comp));
    const origens = new Set(doGrupo.map((x) => x.origem));
    if (origens.size >= 2) add(d.sev, "Duplicidade: " + d.nome, d.msg, [...origens]);
  }
  for (const r of REGRAS) {
    const A = itens.filter((x) => membros(r.a).includes(x.comp));
    const B = itens.filter((x) => membros(r.b).includes(x.comp));
    for (const x of A) for (const y of B) {
      if (x.origem === y.origem) continue;
      add(r.sev, "", r.msg, [x.origem, y.origem]);
    }
  }
  return out.sort((a, b) => SEV_ORDEM[a.sev] - SEV_ORDEM[b.sev]);
}
