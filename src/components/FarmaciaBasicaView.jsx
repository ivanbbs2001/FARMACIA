import { PONTOS, PASSOS, FONTES, VERIFICADO_EM } from "../data/farmaciaBasica.js";

const digits = (s) => (s || "").replace(/\D/g, "");

export function FarmaciaBasicaView({ t, theme }) {
  const isInd = theme === "industrial";
  const box = { borderRadius: isInd ? "2px" : "10px", fontFamily: t["--sans"] };
  const btn = { ...box, display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 12px", fontSize: 12, fontWeight: 600, textDecoration: "none",
    background: t["--surface2"], border: `1px solid ${t["--border"]}`, color: t["--text"] };

  return (
    <div style={{ animation: "pgFade .3s ease" }}>
      <div style={{ ...box, padding: "16px", marginBottom: 14, color: "#fff", background: "linear-gradient(135deg,#047857,#059669)" }}>
        <div style={{ fontSize: 24, marginBottom: 4 }}>💊</div>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Farmácia Básica — Cascavel/PR</div>
        <div style={{ fontSize: 11.5, opacity: 0.9, marginTop: 2 }}>Medicamentos do Componente Básico (RENAME) · gratuitos pelo SUS</div>
      </div>

      <div style={{ ...box, padding: "10px 13px", marginBottom: 14, fontSize: 11.5, lineHeight: 1.6, background: "rgba(217,119,6,.1)", border: "1px solid rgba(217,119,6,.4)", color: "#92400e" }}>
        ⚠️ <strong>Confirme por telefone antes de ir.</strong> Não há página oficial pública com todos os dados; as informações abaixo foram reunidas em {VERIFICADO_EM} e parte delas vem de imprensa local e diretórios (marcadas como não confirmadas).
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 700, color: t["--text"], margin: "0 0 8px", fontFamily: t["--sans"] }}>Como retirar o medicamento</h3>
      <ol style={{ margin: "0 0 18px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
        {PASSOS.map((p, i) => (
          <li key={i} style={{ ...box, display: "flex", gap: 10, padding: "10px 12px", background: t["--surface2"], border: `1px solid ${t["--border"]}` }}>
            <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: t["--accentBg"], border: `1px solid ${t["--accentBrd"]}`, color: t["--accentText"], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
            <span style={{ fontSize: 12.5, lineHeight: 1.6, color: t["--text"] }}><strong>{p.t}.</strong> {p.d}</span>
          </li>
        ))}
      </ol>

      <h3 style={{ fontSize: 14, fontWeight: 700, color: t["--text"], margin: "0 0 8px", fontFamily: t["--sans"] }}>Pontos de atendimento</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PONTOS.map((p) => (
          <div key={p.id} style={{ ...box, padding: "12px 14px", background: t["--surface2"], border: `1.5px solid ${t["--border"]}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: t["--text"] }}>{p.nome}</div>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: p.ok ? "rgba(5,150,105,.12)" : "rgba(217,119,6,.14)", color: p.ok ? "#047857" : "#92400e" }}>{p.ok ? "confirmado" : "não confirmado"}</span>
            </div>
            <div style={{ fontSize: 12.5, color: t["--text"], marginTop: 6, lineHeight: 1.6 }}>📍 {p.endereco}</div>
            {p.telefone && <div style={{ fontSize: 12.5, color: t["--text"], lineHeight: 1.6 }}>📞 {p.telefone}</div>}
            {p.whatsapp && <div style={{ fontSize: 12.5, color: t["--text"], lineHeight: 1.6 }}>💬 WhatsApp {p.whatsapp}</div>}
            <div style={{ fontSize: 12.5, color: t["--text"], lineHeight: 1.6 }}>🕐 {p.horario || "Horário não localizado — ligue para confirmar."}</div>
            <div style={{ fontSize: 11, color: t["--textMuted"], marginTop: 5, lineHeight: 1.55 }}>{p.obs}</div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 9 }}>
              <a style={btn} target="_blank" rel="noopener noreferrer" href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.endereco)}>🗺️ Mapa</a>
              {p.telefone && <a style={btn} href={"tel:+55" + digits(p.telefone)}>📞 Ligar</a>}
              {p.whatsapp && <a style={btn} target="_blank" rel="noopener noreferrer" href={"https://wa.me/55" + digits(p.whatsapp)}>💬 WhatsApp</a>}
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...box, marginTop: 16, padding: "10px 13px", background: t["--surface2"], border: `1px solid ${t["--border"]}`, fontSize: 11, color: t["--textMuted"], lineHeight: 1.7 }}>
        <strong>Fontes consultadas:</strong>
        <ul style={{ margin: "4px 0 0", paddingLeft: 18 }}>
          {FONTES.map((f) => <li key={f.url}><a href={f.url} target="_blank" rel="noopener noreferrer" style={{ color: t["--accentText"] }}>{f.nome}</a></li>)}
        </ul>
        Também há a central de consulta do programa federal: ligue <strong>136</strong> (Farmácia Popular).
      </div>
      <div style={{ ...box, marginTop: 12, padding: "10px 13px", background: t["--dangerBg"], border: `1px solid ${t["--dangerBrd"]}`, fontSize: 11, color: t["--dangerTxt"], lineHeight: 1.7 }}>
        <strong>⚕️ Aviso:</strong> informações de apoio, sujeitas a mudança. A disponibilidade do medicamento é definida pela Secretaria Municipal de Saúde.
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
