import { MEDS } from "./meds.js";
export const ALTS={
  // IECAs entre si
  enalapril:   ["captopril","perindopril","ramipril"],
  captopril:   ["enalapril","perindopril","ramipril"],
  perindopril: ["enalapril","captopril","ramipril"],
  ramipril:    ["enalapril","captopril","perindopril"],
  // Combinações perindopril
  naprix_d:    ["acertanlo","naprix_a","hidroclorotiazida","indapamida"],
  acertanlo:   ["naprix_a","naprix_d"],
  naprix_a:    ["acertanlo","naprix_d"],
  // BRAs entre si
  losartana:   ["valsartana","olmesartana","irbesartana"],
  valsartana:  ["losartana","olmesartana","irbesartana"],
  olmesartana: ["losartana","valsartana","irbesartana"],
  irbesartana: ["losartana","valsartana","olmesartana"],
  // BCC
  anlodipino:  ["naprix_a","acertanlo"],
  // Diuréticos
  hidroclorotiazida: ["indapamida","furosemida","espironolactona"],
  indapamida:  ["hidroclorotiazida","furosemida"],
  furosemida:  ["hidroclorotiazida","indapamida","espironolactona"],
  espironolactona: ["furosemida","hidroclorotiazida"],
  // Betabloqueadores
  nebivolol:   ["carvedilol"],
  carvedilol:  ["nebivolol"],
  // Antidiabéticos
  metformina:  ["glibenclamida","glicazida","glipizida"],
  glibenclamida:["glicazida","glipizida","metformina"],
  glicazida:   ["glibenclamida","glipizida","metformina"],
  glipizida:   ["glibenclamida","glicazida","metformina"],
  // Estatinas
  sinvastatina:["atorvastatina","rosuvastatina","ezetimiba"],
  atorvastatina:["rosuvastatina","sinvastatina","ezetimiba"],
  rosuvastatina:["atorvastatina","sinvastatina","ezetimiba"],
  ezetimiba:   ["sinvastatina","atorvastatina","rosuvastatina"],
  // Fibratos
  fenofibrato: ["omega3","sinvastatina"],
  omega3:      ["fenofibrato"],
  // AINEs
  ibuprofeno:  ["paracetamol","dipirona","diclofenaco","nimesulida","meloxicam"],
  paracetamol: ["ibuprofeno","dipirona","diclofenaco"],
  dipirona:    ["paracetamol","ibuprofeno"],
  diclofenaco: ["ibuprofeno","meloxicam","nimesulida","etodolaco"],
  nimesulida:  ["meloxicam","celecoxibe","etodolaco","diclofenaco"],
  etodolaco:   ["nimesulida","meloxicam","celecoxibe"],
  celecoxibe:  ["meloxicam","nimesulida","etodolaco"],
  meloxicam:   ["celecoxibe","nimesulida","etodolaco","diclofenaco"],
  aas:         ["paracetamol","ibuprofeno","dipirona"],
  capsaicina:  ["arnica","garradiabo","cúrcuma"],
  // Respiratory
  dextro:      ["acetilcist"],
  acetilcist:  ["ambroxol"],
  ambroxol:    ["acetilcist"],
  guaco:       ["dextro","acetilcist","ambroxol"],
  tomilho:     ["guaco","acetilcist","propolis"],
  eucalipto:   ["guaco","tomilho","acetilcist"],
  // Anti-histamínicos
  loratadina:  ["cetirizina","fexofenadin"],
  cetirizina:  ["loratadina","fexofenadin"],
  fexofenadin: ["loratadina","cetirizina"],
  cromoglicato:["cetirizina","loratadina"],
  // Antieméticos
  metoclop:    ["domperidona","ondanset","dimenidrin"],
  domperidona: ["metoclop","ondanset"],
  ondanset:    ["metoclop","domperidona"],
  dimenidrin:  ["metoclop","ondanset"],
  // GI / Refluxo
  omeprazol:   ["antiacido","espinheira","alcachofra"],
  antiacido:   ["omeprazol"],
  espinheira:  ["omeprazol","antiacido"],
  alcachofra:  ["espinheira","boldo","carqueja"],
  boldo:       ["alcachofra","carqueja","espinheira"],
  carqueja:    ["alcachofra","boldo"],
  // Laxantes
  bisacodil:   ["lactulose","macrogol","flenus","softol"],
  lactulose:   ["macrogol","bisacodil","softol"],
  macrogol:    ["lactulose","bisacodil","softol"],
  flenus:      ["bisacodil","lactulose","macrogol"],
  softol:      ["lactulose","macrogol","bisacodil"],
  // Pele
  hidrocort:   ["calend","aloe"],
  clotrimazol: ["nistatina","fluconazol","aroeira"],
  nistatina:   ["clotrimazol","fluconazol"],
  fluconazol:  ["nistatina","clotrimazol"],
  calend:      ["aloe","hidrocort","dexpantenol"],
  aloe:        ["calend","dexpantenol","oxido_zinco"],
  dexpantenol: ["oxido_zinco","calend"],
  oxido_zinco: ["dexpantenol","calend"],
  // Sedativos / Ansiolíticos
  valeriana:   ["passiflora","melissa","hiperico"],
  passiflora:  ["valeriana","melissa"],
  melissa:     ["valeriana","passiflora"],
  hiperico:    ["valeriana","passiflora"],
  tilia:       ["valeriana","melissa"],
  difenidram:  ["valeriana","passiflora"],
  // Antiparasitários
  albendazol:  ["mebendazol","ivermectina"],
  mebendazol:  ["albendazol"],
  ivermectina: ["albendazol","mebendazol"],
  metronidazol:["albendazol"],
  // Urinário
  ellura:      ["cistop"],
  cistop:      ["ellura"],
  // Fitoterápicos cardiovasculares
  precol:      ["kronel","bergamota","oliveira"],
  kronel:      ["precol","bergamota","sinvastatina","atorvastatina"],
  bergamota:   ["kronel","precol","fenofibrato"],
  hibisco:     ["oliveira","alho_fito"],
  oliveira:    ["hibisco","alho_fito"],
  alho_fito:   ["hibisco","oliveira","propolis"],
  // Anti-inflamatórios fitoterápicos
  arnica:      ["garradiabo","cúrcuma","gamaline_v"],
  garradiabo:  ["arnica","cúrcuma","gamaline_v"],
  cúrcuma:     ["arnica","garradiabo","gamaline_v"],
  bromelin:    ["garradiabo","cúrcuma","diclofenaco"],
  gamaline_v:  ["omega3","cúrcuma","arnica"],
  // Cognitivos
  becan:       ["otodrat"],
  otodrat:     ["becan"],
  petamig:     ["otodrat"],
  nevrix:      ["becan"],
  enax:        ["becan","imunoglucan"],
  // Imunidade
  equinacea:   ["propolis","imunoglucan","alho_fito","vitc"],
  propolis:    ["equinacea","imunoglucan"],
  imunoglucan: ["equinacea","propolis","vitc"],
  vitc:        ["imunoglucan","equinacea","zinc"],
  zinc:        ["vitc","imunoglucan"],
  sulfato_fe:  ["zinc"],
  // Hepatoproteção
  hebron:      ["alcachofra","boldo"],
  // Diabetes fitoterápicos
  gymnema:     ["canela_fito","minel"],
  canela_fito: ["gymnema","minel"],
  minel:       ["gymnema","canela_fito"],
  // Outros
  gamax:       ["simeticona","escopolam","funcho"],
  funcho:      ["gamax","simeticona","camomila"],
  camomila:    ["melissa","funcho","gamax"],
  hortela:     ["simeticona","gamax","escopolam"],
  simeticona:  ["gamax","escopolam","funcho"],
  escopolam:   ["simeticona","gamax"],
  gengibre:    ["metoclop","camomila","dimenidrin"],
  salva:       ["clorex_bucal","benzidamina","aroeira"],
  aroeira:     ["salva","clorex_bucal","clotrimazol"],
  sro:         ["vitc","zinc"],
  // Fertilidade & Feminino
  megafert:    ["acido_folico","ainofer","vitb12","puravit_adz"],
  ainofer:     ["sulfato_fe","megafert"],
  biofemina:   ["clotrimazol","nistatina","probio_gg"],
  urocran:     ["ellura","cistop"],
  // GI / Probióticos
  probio_gg:   ["floratil","biofemina"],
  floratil:    ["probio_gg"],
  sucralfato:  ["omeprazol","bulcero","espinheira"],
  bulcero:     ["omeprazol","sucralfato"],
  glicel:      ["bisacodil","lactulose","flenus"],
  fontelax:    ["softol","lactulose","macrogol"],
  // Vitaminas
  aidetres:    ["vitd3","puravit_adz"],
  calcos:      ["calcio_vitd","vitd3"],
  vitacolin:   ["dexpantenol","biotina"],
  puravit:     ["puravit_adz","complexo_b"],
  puravit_adz: ["puravit","vitd3","vita"],

};

/* helper — get alternative med objects for a given id */
export const getAlts=(id)=>(ALTS[id]||[]).map(aid=>MEDS.find(m=>m.id===aid)).filter(Boolean);

/* ════════════════════════ MED CARD ════════════════════════ */
