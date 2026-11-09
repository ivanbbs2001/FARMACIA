import { useState } from "react";
import { MEDS } from "../data/meds.js";
import { searchMeds } from "../search.js";
import { verificarInteracoes } from "../data/interactions.js";

const SEV = {
  grave: { rot: "GRAVE", ic: "🔴", bg: "rgba(220,38,38,.09)", brd: "rgba(220,38,38,.4)", txt: "#b91c1c" },
  moderada: { rot: "MODERADA", ic: "🟡", bg: "rgba(217,119,6,.10)", brd: "rgba(217,119,6,.4)", txt: "#92400e" },
  leve: { rot: "LEVE", ic: "🔵", bg: "rgba(3,105,161,.08)", brd: "rgba(3,105,161,.3)", txt: "#075985" },
};
const nome = (id) => MEDS.find((m) => m.id === id)?.pa || id;

export function InteractionsView({ t, theme, onSelectMed }) {
  const [ids, setIds] = useState([]);
  const [q, setQ] = useState("");
  const isInd = theme === "industrial";
  const cand = searchMeds(q, 6).filter((m) => !ids.includes(m.id));
  const res = ids.length >= 2 ? verificarInteracoes(ids) : [];

  const add = (m) => { setIds((p) => [...p, m.id]); setQ(""); };
  const rm = (id) => setIds((p) => p.filter((x) => x !== id));
  const box = { borderRadius: isInd ? "2px" : "8px", fontFamily: t["--sans"] };

  return (
    <div style={{ animation: "pgFade .3s ease" }}>
      <h2 style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 2, fontFamily: t["--sans"], color: t["--text"] }}>⚠️ Verificador de interações</h2>
      <p style={{ fontSize: 11.5, color: t["--textMuted"], fontFamily: t["--sans"], marginBottom: 12, lineHeight: 1.6 }}>
        Adicione os medicamentos que o paciente já usa e o que pretende levar. Funciona com 2 ou mais itens.
      </p>

      <div style={{ position: "relative", marginBottom: 10 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍  Adicionar medicamento (nome ou princípio ativo)…"
          style={{ ...box, width: "100%", boxSizing: "border-box", background: t["--surface2"], border: `1px solid ${t["--border"]}`, padding: "9px 11px", fontSize: 13, color: t["--text"], outline: "none" }} />
        {q.trim().length >= 2 && (
          <div style={{ ...box, position: "absolute", left: 0, right: 0, top: "100%", zIndex: 20, background: t["--surface"] || t["--surface2"], border: `1px solid ${t["--border"]}`, boxShadow: "0 8px 24px rgba(0,0,0,.2)" }}>
            {cand.length === 0 && <div style={{ padding: 11, fontSize: 12, color: t["--textMuted"] }}>Nada encontrado.</div>}
            {cand.map((m) => (
              <button key={m.id} onClick={() => add(m)} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", background: "transparent", border: "none", borderBottom: `1px solid ${t["--border"]}`, cursor: "pointer", color: t["--text"], fontFamily: t["--sans"], fontSize: 12.5 }}>
                <strong>{m.pa}</strong> <span style={{ color: t["--textMuted"], fontSize: 11 }}>{(m.comerciais || []).slice(0, 2).join(" · ")}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {ids.map((id) => (
          <span key={id} style={{ ...box, display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 6px 5px 10px", fontSize: 12, background: t["--accentBg"], border: `1px solid ${t["--accentBrd"]}`, color: t["--accentText"] }}>
            <span onClick={() => onSelectMed(MEDS.find((m) => m.id === id))} style={{ cursor: "pointer" }}>{nome(id)}</span>
            <button onClick={() => rm(id)} aria-label={"remover " + nome(id)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "inherit", fontSize: 14, lineHeight: 1 }}>✕</button>
          </span>
        ))}
        {ids.length > 0 && <button onClick={() => setIds([])} style={{ ...box, padding: "5px 10px", fontSize: 11, cursor: "pointer", background: "transparent", border: `1px solid ${t["--border"]}`, color: t["--textMuted"] }}>limpar</button>}
      </div>

      {ids.length < 2 && (
        <div style={{ ...box, padding: "18px 14px", textAlign: "center", fontSize: 12, color: t["--textMuted"], background: t["--surface2"], border: `1px dashed ${t["--border"]}` }}>
          {ids.length === 0 ? "Nenhum medicamento adicionado." : "Adicione pelo menos mais um medicamento para verificar."}
        </div>
      )}

      {ids.length >= 2 && res.length === 0 && (
        <div style={{ ...box, padding: "12px 14px", fontSize: 12.5, background: "rgba(5,150,105,.08)", border: "1px solid rgba(5,150,105,.3)", color: "#047857", lineHeight: 1.6 }}>
          ✅ Nenhuma interação encontrada <strong>na base deste guia</strong>. Isso <strong>não garante</strong> que a combinação seja segura — a base é limitada. Em caso de dúvida, consulte o farmacêutico.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {res.map((r, i) => {
          const c = SEV[r.sev];
          return (
            <div key={i} style={{ ...box, padding: "10px 13px", background: c.bg, border: `1.5px solid ${c.brd}` }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".08em", color: c.txt, marginBottom: 3 }}>{c.ic} {c.rot}{r.titulo ? " · " + r.titulo : ""}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: t["--text"], marginBottom: 3 }}>{r.ids.map(nome).join(" + ")}</div>
              <div style={{ fontSize: 12, color: t["--text"], lineHeight: 1.6 }}>{r.msg}</div>
            </div>
          );
        })}
      </div>

      <div style={{ ...box, marginTop: 16, padding: "10px 13px", background: t["--dangerBg"], border: `1px solid ${t["--dangerBrd"]}`, fontSize: 11, color: t["--dangerTxt"], lineHeight: 1.7 }}>
        <strong>⚕️ Importante:</strong> base de apoio, <strong>não exaustiva</strong>, compilada de conhecimento farmacológico geral e que deve ser revisada por farmacêutico responsável. Não considera dose, idade, doenças do paciente nem outros medicamentos fora da lista. Nunca suspenda ou troque um remédio prescrito por conta própria — encaminhe ao prescritor.
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
