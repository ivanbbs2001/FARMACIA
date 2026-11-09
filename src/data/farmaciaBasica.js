/* Pontos da Farmácia Básica — Cascavel/PR.
   ATENÇÃO: não há página oficial pública com todos os dados. Cada campo traz `fonte` e `ok` (confirmado?).
   Atualize este arquivo quando a Secretaria de Saúde (SESAU) confirmar os dados. */
export const VERIFICADO_EM = "09/11/2026";

export const PONTOS = [
  {
    id: "b1",
    nome: "Farmácia Básica I",
    endereco: "Av. Tancredo Neves, 777 — Centro, Cascavel/PR",
    telefone: "(45) 3392-6580",
    whatsapp: "(45) 3321-5529",
    horario: "Seg a sex: 9h–18h (diretório, não oficial). Sábado/feriado em escala: 13h–19h (imprensa local).",
    obs: "Endereço confirmado pela equipe da ONG. WhatsApp informado pela ONG. O telefone fixo e o horário de semana vêm de diretórios na internet — confirme por ligação.",
    ok: true,
  },
  {
    id: "b2",
    nome: "Farmácia Básica II",
    endereco: "Rua Europa, 2409 — Cascavel/PR",
    horario: "Sábado/feriado em escala: 7h–13h (imprensa local). Horário de semana: não localizado.",
    obs: "Endereço e horário de sábado citados pela imprensa local (CATVE, 22/09/2026). Telefone não localizado.",
    ok: false,
  },
  {
    id: "b3",
    nome: "Farmácia Básica III",
    endereco: "Região do Cascavel Velho (endereço exato não localizado)",
    horario: "Sábado/feriado em escala: 13h–19h (imprensa local). Horário de semana: não localizado.",
    obs: "Em 26/09/2026 não houve atendimento no sábado por manutenção de energia. Confirme antes de ir.",
    ok: false,
  },
];

/* Orientação GERAL de retirada no SUS — confirmar exigências locais com a SESAU. */
export const PASSOS = [
  { t: "Tenha a receita", d: "Receita médica do SUS ou de consulta particular, legível, com nome do medicamento (de preferência pelo nome genérico/princípio ativo), dose e posologia, e dentro da validade." },
  { t: "Confira se o remédio é da Farmácia Básica", d: "Use a aba \"Farmácia Básica SUS\" deste guia. Medicamentos de alto custo ou especiais (CEAF) não são retirados aqui: veja a aba SESA." },
  { t: "Leve os documentos", d: "Documento oficial com foto, CPF e Cartão Nacional de Saúde (Cartão SUS). Costuma ser pedido comprovante de residência em Cascavel — confirme." },
  { t: "Vá a um ponto de atendimento", d: "Escolha um dos pontos abaixo. Ligue antes para confirmar horário e se o medicamento está em estoque." },
  { t: "Se faltar o medicamento", d: "Pergunte ao farmacêutico sobre substituto equivalente e prazo de reposição. Neste guia, a ficha de cada medicamento mostra os substitutos." },
];

export const FONTES = [
  { nome: "CATVE — Farmácia Básica III não terá atendimento neste sábado (26)", url: "https://catve.com/noticia/6/483179/farmacia-basica-iii-nao-tera-atendimento-neste-sabado-26-em-cascavel" },
  { nome: "CGN — Serviços públicos em Cascavel têm alterações no feriado de Sexta-Feira Santa (31/03/2026)", url: "https://cgn.inf.br/noticia/2074508/servicos-publicos-em-cascavel-tem-alteracoes-no-feriado-de-sexta-feira-santa" },
  { nome: "Diretório: Farmácia Básica I (telefone e horário de semana, não oficial)", url: "https://cascavel.net.br/sobre/farmacia-basica-i-cascavel-pr" },
];
