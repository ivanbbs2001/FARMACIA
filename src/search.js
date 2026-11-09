import { MEDS } from "./data/meds.js";
import { norm } from "./utils.js";

/* Busca medicamentos por princípio ativo, nome comercial ou classe (sem acento, sem maiúsculas). */
const INDEX = MEDS.map((m) => ({
  m,
  pa: norm(m.pa),
  com: (m.comerciais || []).map(norm),
  classe: norm(m.classe),
}));

export function searchMeds(query, limit = 10) {
  const q = norm(query);
  if (q.length < 2) return [];
  const res = [];
  for (const x of INDEX) {
    let s = 0;
    if (x.pa.startsWith(q)) s = 100;
    else if (x.com.some((c) => c.startsWith(q))) s = 90;
    else if (x.pa.split(/[\s(),/+-]+/).some((w) => w.startsWith(q))) s = 80;
    else if (x.pa.includes(q)) s = 60;
    else if (x.com.some((c) => c.includes(q))) s = 55;
    else if (x.classe.includes(q)) s = 20;
    if (s) res.push({ m: x.m, s });
  }
  return res.sort((a, b) => b.s - a.s || a.m.pa.localeCompare(b.m.pa, "pt-BR")).slice(0, limit).map((r) => r.m);
}
