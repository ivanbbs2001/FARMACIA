import { useState, useRef, useEffect } from "react";
import { searchMeds } from "../search.js";

/* Campo de busca por nome (princípio ativo / nome comercial / classe). Abre a ficha do medicamento. */
export function GlobalSearch({ t, theme, onSelectMed }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const isInd = theme === "industrial";
  const res = searchMeds(q, 8);

  useEffect(() => {
    const h = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    document.addEventListener("touchstart", h);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("touchstart", h); };
  }, []);

  const pick = (m) => { onSelectMed(m); setOpen(false); setQ(""); };

  return (
    <div ref={box} style={{ position: "relative", padding: "6px 14px", background: t["--hdrBg"], borderBottom: `1px solid ${t["--hdrBrd"]}`, flexShrink: 0 }}>
      <input
        type="search" value={q} aria-label="Buscar medicamento por nome"
        placeholder="🔍  Buscar medicamento (ex.: losartana, Naprix)…"
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === "Enter" && res[0]) pick(res[0]); if (e.key === "Escape") setOpen(false); }}
        style={{ width: "100%", boxSizing: "border-box", background: t["--surface2"], border: `1px solid ${t["--border"]}`,
          borderRadius: isInd ? "2px" : "8px", padding: "8px 11px", fontSize: 13, color: t["--text"], outline: "none", fontFamily: t["--sans"] }} />
      {open && q.trim().length >= 2 && (
        <div style={{ position: "absolute", left: 14, right: 14, top: "100%", zIndex: 300, maxHeight: "60vh", overflowY: "auto",
          background: t["--surface"] || t["--surface2"], border: `1px solid ${t["--border"]}`, borderRadius: isInd ? "2px" : "8px",
          boxShadow: "0 10px 30px rgba(0,0,0,.25)" }}>
          {res.length === 0 && <div style={{ padding: "12px 14px", fontSize: 12, color: t["--textMuted"], fontFamily: t["--sans"] }}>Nenhum medicamento encontrado para “{q}”.</div>}
          {res.map((m) => (
            <button key={m.id} onClick={() => pick(m)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 13px", cursor: "pointer", background: "transparent",
                border: "none", borderBottom: `1px solid ${t["--border"]}`, fontFamily: t["--sans"], color: t["--text"] }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{m.pa}</div>
              <div style={{ fontSize: 11, color: t["--textMuted"] }}>
                {(m.comerciais || []).slice(0, 3).join(" · ")}{(m.comerciais || []).length ? " — " : ""}{m.classe}
              </div>
              <div style={{ marginTop: 3, display: "flex", gap: 4, flexWrap: "wrap" }}>
                {m.fito && <Tag>🌿 fitoterápico</Tag>}
                {m.fp && <Tag>🏛️ Farm. Popular</Tag>}
                {m.sus && <Tag>💊 Farm. Básica</Tag>}
                {m.sesa && <Tag>📦 SESA</Tag>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const Tag = ({ children }) => (
  <span style={{ fontSize: 9.5, padding: "1px 6px", borderRadius: 10, background: "rgba(100,116,139,.15)", color: "inherit" }}>{children}</span>
);
