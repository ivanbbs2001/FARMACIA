export const GROUPS=[
  {label:"Dor & Febre",icon:"🌡️",items:[
    {id:"febre",label:"Febre"},{id:"dor_cabeca",label:"Dor de Cabeça"},
    {id:"enxaqueca",label:"Enxaqueca"},{id:"dor_muscular",label:"Dor Muscular"},
    {id:"dor_costas",label:"Dor nas Costas"},{id:"dor_ouvido",label:"Dor de Ouvido"},
    {id:"dor_cronica",label:"Dor Crônica"},
  ]},
  {label:"Respiratório & Garganta",icon:"🫁",items:[
    {id:"dor_garganta",label:"Dor de Garganta"},{id:"tosse_seca",label:"Tosse Seca"},
    {id:"tosse_catarro",label:"Tosse com Catarro"},{id:"coriza",label:"Coriza / Nariz Entupido"},
    {id:"rinite",label:"Rinite Alérgica"},
    {id:"asma",label:"Asma / Broncoespasmo"},
  ]},
  {label:"Digestivo",icon:"🫃",items:[
    {id:"nausea",label:"Náusea"},{id:"vomito",label:"Vômito"},
    {id:"diarreia",label:"Diarreia"},{id:"dor_abdominal",label:"Dor Abdominal"},
    {id:"colica",label:"Cólica"},{id:"azia_refluxo",label:"Azia / Refluxo"},
    {id:"constipacao",label:"Constipação"},{id:"parasitose",label:"Parasitose Intestinal"},
    {id:"saude_intestinal",label:"Saúde Intestinal / Microbiota"},
  ]},
  {label:"Pele, Olhos & Boca",icon:"👁️",items:[
    {id:"coceira_alergia",label:"Coceira / Alergia"},
    {id:"erupcao",label:"Erupção Cutânea"},
    {id:"olhos_vermelhos",label:"Olhos Vermelhos"},
    {id:"assadura",label:"Assadura / Irritação"},
    {id:"candidíase_oral",label:"Candidíase Oral"},
  ]},
  {label:"Condições Crônicas",icon:"🏥",chronic:true,items:[
    {id:"pressao_alta",label:"Pressão Alta (HAS)"},
    {id:"diabetes",label:"Diabetes / Hiperglicemia"},
    {id:"dor_cronica",label:"Dor Crônica"},
    {id:"colesterol",label:"Colesterol Alto"},
    {id:"trigliceridios",label:"Triglicerídios Altos"},
    {id:"osteoporose",label:"Osteoporose"},
    {id:"hipotireoidismo",label:"Hipotireoidismo"},
    {id:"artrite",label:"Artrite / Reumatismo"},
    {id:"epilepsia",label:"Epilepsia"},
  ]},
  {label:"Urinário & Imunidade",icon:"🛡️",items:[
    {id:"infeccao_urinaria",label:"Infecção Urinária"},
    {id:"baixa_imunidade",label:"Baixa Imunidade"},
    {id:"fraqueza",label:"Fraqueza / Cansaço"},
  ]},
  {label:"Neurológico & Humor",icon:"🧠",items:[
    {id:"tontura",label:"Tontura"},{id:"insonia",label:"Insônia"},
    {id:"ansiedade_leve",label:"Ansiedade Leve"},
  ]},
  {label:"Fertilidade & Saúde Feminina",icon:"🌸",items:[
    {id:"fertilidade",label:"Fertilidade / Planejamento Familiar"},
    {id:"gestacao_vit",label:"Gestação (suplementação)"},
    {id:"candidíase_vaginal",label:"Candidíase Vaginal / Flora Íntima"},
    {id:"menopausa",label:"Menopausa / Climatério"},
    {id:"dor_mama",label:"Dor nas Mamas (mastalgia)"},
  ]},
  {label:"Vitaminas & Suplementos",icon:"💊",vitaminas:true,items:[
    {id:"vit_d_def",   label:"Deficiência de Vitamina D"},
    {id:"anemia",      label:"Anemia / Deficiência de Ferro"},
    {id:"vit_b12_def", label:"Deficiência de Vitamina B12"},
    {id:"caimbra",     label:"Cãibras Musculares"},
    {id:"ossos",       label:"Saúde Óssea / Osteoporose"},
    {id:"gestacao_vit",label:"Gestação (suplementação)"},
    {id:"pele_cabelo", label:"Pele, Cabelo e Unhas"},
    {id:"neuropatia_vit",label:"Neuropatia / Formigamento"},
  ]},
];
export const ALL=GROUPS.flatMap(g=>g.items);

/* ─── CHRONIC CONDITION IDS ─── */
export const CHRONIC_IDS=new Set(["pressao_alta","diabetes","colesterol","trigliceridios","osteoporose","hipotireoidismo","artrite","epilepsia","menopausa"]);

/* ═══════════════════════════════════════ UTILS ═══════════════════════════════════════ */
