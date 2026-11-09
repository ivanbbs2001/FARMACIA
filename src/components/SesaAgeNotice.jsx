import { nivelSesa, textoIdadeSesa } from "../utils";

/* Aviso de defasagem da lista de estoque da SESA.
   A SESA atualiza o relatório a cada ~15 dias; quantidades antigas podem não refletir a realidade. */
export function SesaAgeNotice({ data, t, compact = false, children }) {
  const { nivel } = nivelSesa(data);
  const cor = nivel === "ok"
    ? { bg: "rgba(5,150,105,.08)", brd: "rgba(5,150,105,.3)", txt: "#047857", ic: "🟢" }
    : nivel === "atencao"
      ? { bg: "rgba(217,119,6,.1)", brd: "rgba(217,119,6,.4)", txt: "#92400e", ic: "🟡" }
      : { bg: "rgba(220,38,38,.08)", brd: "rgba(220,38,38,.35)", txt: "#b91c1c", ic: "🔴" };
  const msg = nivel === "ok"
    ? "Dados recentes."
    : nivel === "atencao"
      ? "Dados com algumas semanas — confirme a disponibilidade antes de orientar o paciente."
      : "Dados DESATUALIZADOS — as quantidades podem não refletir o estoque real. Consulte o PDF atual da SESA antes de orientar o paciente.";
  return (
    <div style={{ marginBottom: compact ? 8 : 12, padding: compact ? "6px 9px" : "9px 12px", borderRadius: t["--radiusSm"],
      background: cor.bg, border: `1px solid ${cor.brd}`, fontSize: compact ? 10.5 : 11.5, color: cor.txt, fontFamily: t["--sans"], lineHeight: 1.55 }}>
      {cor.ic} <strong>Estoque SESA {textoIdadeSesa(data)}.</strong> {msg}
      {children}
    </div>
  );
}
