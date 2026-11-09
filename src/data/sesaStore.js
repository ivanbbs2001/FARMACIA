import { useState, useEffect } from "react";
import { SESA_DEFAULT } from "./sesa.js";

const KEY = "sesa_v3";
const EVT = "sesa-updated";

const toTime = (br) => { const m = (br || "").match(/(\d{2})\/(\d{2})\/(\d{4})/); return m ? new Date(+m[3], +m[2] - 1, +m[1]).getTime() : 0; };

/* Lista em uso: a importada pelo usuário (se existir e não for mais antiga que a embutida) ou a embutida. */
export function loadSesa() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (p?.data?.medicamentos?.length && toTime(p.data.data_relatorio) >= toTime(SESA_DEFAULT.data_relatorio)) {
        return { ...p.data, importadoEm: p.ts };
      }
    }
  } catch { /* localStorage indisponível: usa a lista embutida */ }
  return SESA_DEFAULT;
}

export function saveSesa(data) {
  try { localStorage.setItem(KEY, JSON.stringify({ data, ts: Date.now() })); } catch { /* ignora */ }
  window.dispatchEvent(new Event(EVT));
}

export function resetSesa() {
  try { localStorage.removeItem(KEY); } catch { /* ignora */ }
  window.dispatchEvent(new Event(EVT));
}

export function useSesa() {
  const [data, setData] = useState(loadSesa);
  useEffect(() => {
    const h = () => setData(loadSesa());
    window.addEventListener(EVT, h);
    return () => window.removeEventListener(EVT, h);
  }, []);
  return data;
}
