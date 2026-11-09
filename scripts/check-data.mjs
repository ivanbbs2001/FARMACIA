/* Valida a base de dados: ids únicos, referências existentes, sintomas definidos. Roda no CI (npm run check). */
import { MEDS } from "../src/data/meds.js";
import { GROUPS } from "../src/data/groups.js";
import { ALTS } from "../src/data/alts.js";
import { G, COMPONENTES, REGRAS, DUPLICIDADES, verificarInteracoes } from "../src/data/interactions.js";
import { SESA_DEFAULT } from "../src/data/sesa.js";

const erros = [];
const ids = MEDS.map((m) => m.id);
const set = new Set(ids);
ids.forEach((id, i) => ids.indexOf(id) !== i && erros.push("id de medicamento duplicado: " + id));

const sint = new Set(GROUPS.flatMap((g) => g.items.map((i) => i.id)));
MEDS.forEach((m) => (m.syms || []).forEach((s) => !sint.has(s) && erros.push(`${m.id}: sintoma sem grupo "${s}"`)));
MEDS.forEach((m) => { for (const k of ["pa", "classe", "syms"]) if (!m[k] || (Array.isArray(m[k]) && !m[k].length)) erros.push(`${m.id}: campo ausente "${k}"`); });

Object.entries(ALTS).forEach(([k, v]) => {
  if (!set.has(k)) erros.push("ALTS: chave inexistente " + k);
  v.forEach((a) => !set.has(a) && erros.push(`ALTS[${k}]: substituto inexistente ${a}`));
});

const ref = (r, onde) => { if (!G[r] && !set.has(r)) erros.push(`interações (${onde}): referência desconhecida "${r}"`); };
Object.entries(G).forEach(([g, l]) => l.forEach((i) => ref(i, "grupo " + g)));
Object.entries(COMPONENTES).forEach(([k, l]) => { ref(k, "componentes"); l.forEach((i) => ref(i, "componentes de " + k)); });
REGRAS.forEach((r) => { ref(r.a, "regra"); ref(r.b, "regra"); if (!["grave", "moderada", "leve"].includes(r.sev)) erros.push("gravidade inválida: " + r.msg.slice(0, 30)); });
DUPLICIDADES.forEach((d) => ref(d.g, "duplicidade"));

/* testes de sanidade do motor */
const t = (lista, espera, nome) => {
  const r = verificarInteracoes(lista);
  if (espera === 0 ? r.length : !r.length) erros.push("teste do motor falhou: " + nome);
};
t(["ibuprofeno", "varfarina"], 1, "AINE+varfarina");
t(["naprix_d", "indapamida"], 1, "duplicidade tiazídico");
t(["acertanlo", "anlodipino"], 1, "duplicidade anlodipino");
t(["losartana", "espironolactona"], 1, "BRA+espironolactona");
t(["paracetamol", "omeprazol"], 0, "sem interação");

const sesaOk = SESA_DEFAULT.medicamentos.every((m) => m.nome && Number.isFinite(m.quantidade));
if (!sesaOk) erros.push("SESA_DEFAULT com item inválido");

console.log(`${MEDS.length} medicamentos · ${sint.size} sintomas · ${REGRAS.length} regras de interação · ${SESA_DEFAULT.medicamentos.length} itens SESA`);
if (erros.length) { console.error("\n✖ " + erros.length + " problema(s):\n - " + erros.join("\n - ")); process.exit(1); }
console.log("✔ dados consistentes");
