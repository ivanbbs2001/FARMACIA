# Guia Farmácia ONG

Guia de medicamentos por sintoma para agentes de saúde da ONG (Cascavel-PR). Funciona no celular, pode ser instalado como app e abre **sem internet** depois do primeiro acesso.

> ⚕️ Material de apoio. Não substitui avaliação médica nem orientação do farmacêutico. A base de interações é limitada e deve ser revisada por farmacêutico responsável.

## Funcionalidades

- **Busca por sintoma** com abas: Todos · Medicamentos · Fitoterápicos · Vitaminas · SESA-PR · Farmácia Popular · Farmácia Básica SUS
- **Busca por nome** (princípio ativo, nome comercial ou classe — ignora acentos), na barra sob o cabeçalho
- **Ficha detalhada**: posologia por perfil (criança, idoso, gestante, lactante), alertas, contraindicações, "Indicado para", programas (Farmácia Popular / Básica de Cascavel) e **substitutos** clicáveis
- **Estoque SESA-PR** (CEAF · FE 10 RS Cascavel) com **aviso de validade** (verde ≤ 15 dias, amarelo ≤ 45, vermelho acima) e atualização colando o texto do PDF, com pré-visualização antes de aplicar
- **Verificador de interações** (⚠️): interações entre medicamentos, duplicidade terapêutica (inclui combinações como Naprix D / Acertanlo) e horários de separação
- **PWA**: instalável e offline
- Temas claro, escuro e industrial

## Estrutura

```
src/
  App.jsx                    tela principal
  components/                cartões, painel de detalhes, SESA, interações, busca
  data/meds.js               base de medicamentos
  data/groups.js             sintomas
  data/alts.js               substitutos
  data/interactions.js       regras de interação (grupos + regras + duplicidades)
  data/sesa.js               lista SESA embutida (emissão 01/05/2026)
  data/sesaStore.js          lista SESA em uso (embutida ou importada)
  sesaParser.js              leitor do texto copiado do PDF da SESA
scripts/check-data.mjs       valida ids, substitutos, sintomas e interações
public/                      manifest, ícones e service worker
```

## Desenvolvimento

```bash
npm install
npm run dev      # servidor local
npm run lint     # variáveis não definidas, hooks, duplicatas
npm run check    # consistência da base de dados
npm run build    # gera dist/
```

## Publicação (GitHub Pages)

O deploy é automático por GitHub Actions a cada push na `main` (`.github/workflows/deploy.yml`): roda lint, validação dos dados e build, e só publica se tudo passar.

**Configuração única:** Settings → Pages → *Build and deployment* → Source: **GitHub Actions**.

## Como atualizar o estoque da SESA

1. Aba **📦 SESA** → **📄 Abrir PDF Estoque** e copie as páginas da FE 10 RS CASCAVEL (inclua o cabeçalho "Data da Emissão").
2. **📋 Colar texto do PDF** → cole → **🔎 Ler texto** → confira → **Usar esta lista**.

A lista importada fica salva no aparelho. Para atualizar para todos os usuários, substitua `src/data/sesa.js`.
