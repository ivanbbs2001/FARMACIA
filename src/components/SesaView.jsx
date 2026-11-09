import { useState } from "react";
import { parseSesaText } from "../sesaParser";
import { useSesa, saveSesa, resetSesa } from "../data/sesaStore";
import { SesaAgeNotice } from "./SesaAgeNotice";
import { MEDS } from "../data/meds";
export const PDF_SESA_URL = "https://www.documentador.pr.gov.br/documentador/pub.do?action=d&uuid=@gtf-escriba-sesa@/Documentador/Acervo/ASSIST%C3%8ANCIA%20FARMAC%C3%8AUTICA/DOCUMENTOS%20P%C3%9ABLICOS/ESTOQUE%20MEDICAMENTOS%20CEAF%20-%20LEI%2014654-23/RelEmitirEstoqueMedicamentoCeaf-atual.pdf";

export function SesaView({f, t, theme, onSelectMed}) {
  const isInd = theme === "industrial";
  const sesaData = useSesa();
  const [showPaste, setShowPaste] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [preview,   setPreview]   = useState(null);   /* lista lida, aguardando confirmação */
  const [erro,      setErro]      = useState("");
  const [search,    setSearch]    = useState("");

  /* ── Ler texto colado do PDF ── */
  const handlePaste = () => {
    setErro("");
    if (!pasteText.trim()) return;
    const r = parseSesaText(pasteText);
    if (r.medicamentos.length === 0) { setErro("Nenhum medicamento encontrado. Cole o texto das páginas da FE 10 RS CASCAVEL, com as colunas Medicamento · Apresentação · Quantidade."); return; }
    setPreview({ data_relatorio: r.data_relatorio || "", fonte: "texto_manual", farmacia: "FE 10 RS CASCAVEL", medicamentos: r.medicamentos });
  };
  const confirmar = () => {
    if (!preview) return;
    saveSesa(preview);
    setPreview(null); setShowPaste(false); setPasteText("");
  };

  const filtered = (sesaData?.medicamentos||[]).filter(m =>
    !search || m.nome.toLowerCase().includes(search.toLowerCase()) ||
    (m.apresentacao||"").toLowerCase().includes(search.toLowerCase())
  );

  /* Try to match a SESA med to our DB */
  const matchDB = (nome) => {
    const n = nome.toLowerCase().replace(/\s+/g," ").trim();
    const words = n.split(" ").slice(0,2);
    return MEDS.find(m => {
      const pa = m.pa.toLowerCase();
      return words.every(w => w.length>3 && pa.includes(w)) ||
             (m.comerciais||[]).some(c => n.includes(c.toLowerCase()));
    });
  };

  const inp = {background:t["--surface2"],border:`1px solid ${t["--border"]}`,borderRadius:t["--radiusSm"],padding:"7px 10px",fontSize:12,color:t["--text"],outline:"none",fontFamily:t["--sans"],width:"100%"};

  return (
    <div style={{animation:"pgFade .3s ease"}}>

      {/* ── Header ── */}
      <div style={{padding:"16px",marginBottom:16,borderRadius:t["--radius"],
        background:"linear-gradient(135deg,#0c4a6e,#0369a1)",color:"white"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
          <span style={{fontSize:24}}>📦</span>
          <div>
            <div style={{fontWeight:700,fontSize:15,fontFamily:t["--sans"]}}>Estoque SESA-PR</div>
            <div style={{fontSize:11,opacity:.85,fontFamily:t["--sans"]}}>CEAF — Lei 14.654/23 · Atualizado quinzenalmente</div>
          </div>
        </div>
        <div style={{fontSize:12,opacity:.95,fontFamily:t["--sans"],
          padding:"8px 11px",background:"rgba(255,255,255,.15)",borderRadius:t["--radiusSm"],marginBottom:12,
          display:"flex",alignItems:"center",gap:7}}>
          <span>📍</span>
          <span><strong>Farmácia: FE 10 RS CASCAVEL</strong> · páginas 424–427 do relatório</span>
        </div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          <button onClick={()=>setShowPaste(p=>!p)}
            style={{padding:"7px 14px",borderRadius:t["--radiusSm"],fontFamily:t["--sans"],fontSize:11.5,
              fontWeight:600,cursor:"pointer",background:"rgba(255,255,255,.18)",
              color:"white",border:"1px solid rgba(255,255,255,.4)"}}>
            📋 Colar texto do PDF
          </button>
          <a href={PDF_SESA_URL} target="_blank" rel="noopener"
            style={{padding:"7px 14px",borderRadius:t["--radiusSm"],fontFamily:t["--sans"],fontSize:11.5,
              fontWeight:600,textDecoration:"none",cursor:"pointer",
              background:"rgba(255,255,255,.1)",color:"white",border:"1px solid rgba(255,255,255,.3)"}}>
            📄 Abrir PDF Estoque
          </a>
          <a href="https://farmaciacidada.es.gov.br/Media/farmaciacidada/Cidada%20Estadual/LME%20-%20Atualizado%20-%206%20meses.pdf" target="_blank" rel="noopener"
            style={{padding:"7px 14px",borderRadius:t["--radiusSm"],fontFamily:t["--sans"],fontSize:11.5,
              fontWeight:600,textDecoration:"none",cursor:"pointer",
              background:"rgba(255,255,255,.08)",color:"white",border:"1px solid rgba(255,255,255,.25)"}}>
            📝 Modelo LME (PDF)
          </a>
        </div>
        <div style={{fontSize:10,opacity:.7,fontFamily:t["--sans"],marginTop:8}}>
          {sesaData.importadoEm?"✏️ Importado manualmente em "+new Date(sesaData.importadoEm).toLocaleString("pt-BR")+" · ":"📋 Lista embutida · "}Relatório: {sesaData.data_relatorio||"?"}
        </div>
      </div>

      {/* ── Paste area ── */}
      {showPaste && (
        <div style={{marginBottom:14,padding:"14px",borderRadius:t["--radius"],
          background:t["--surface2"],border:`1.5px solid ${t["--border"]}`}}>
          <div style={{fontSize:12.5,fontWeight:700,color:t["--text"],fontFamily:t["--sans"],marginBottom:6}}>
            📋 Cole o texto copiado das páginas 424–427 do PDF
          </div>
          <div style={{fontSize:11,color:t["--textMuted"],fontFamily:t["--sans"],marginBottom:8,lineHeight:1.6}}>
            Abra o PDF, navegue até as páginas 424–427 (FE 10 RS CASCAVEL), selecione e copie o texto, depois cole abaixo:
          </div>
          <textarea value={pasteText} onChange={e=>{setPasteText(e.target.value);setPreview(null);setErro("");}}
            rows={10} placeholder={"Data da Emissão:01/05/2026\nMedicamento      Apresentação      Quantidade\nATORVASTATINA 20 MG   COMPRIMIDO   11280\n..."}
            style={{...inp,resize:"vertical",lineHeight:1.5,fontFamily:"monospace",fontSize:11}}/>
          {erro&&<div style={{marginTop:8,padding:"8px 11px",borderRadius:t["--radiusSm"],background:t["--dangerBg"],border:`1px solid ${t["--dangerBrd"]}`,fontSize:11.5,color:t["--dangerTxt"],fontFamily:t["--sans"]}}>⚠️ {erro}</div>}
          {preview&&(
            <div style={{marginTop:8,padding:"10px 12px",borderRadius:t["--radiusSm"],background:t["--accentBg"],border:`1px solid ${t["--accentBrd"]}`,fontSize:11.5,color:t["--accentText"],fontFamily:t["--sans"],lineHeight:1.6}}>
              ✅ Lidos <strong>{preview.medicamentos.length}</strong> itens · emissão <strong>{preview.data_relatorio||"não identificada"}</strong> (lista atual: {sesaData.medicamentos.length} itens, {sesaData.data_relatorio}).<br/>
              Exemplo: {preview.medicamentos.slice(0,2).map(m=>`${m.nome} — ${m.apresentacao||"?"} — ${m.quantidade}`).join(" · ")}
              {!preview.data_relatorio&&<><br/>⚠️ A data de emissão não foi encontrada no texto; inclua o cabeçalho "Data da Emissão" para o aviso de validade funcionar.</>}
              <div style={{marginTop:7}}><button onClick={confirmar} style={{padding:"7px 14px",background:"#059669",border:"none",borderRadius:t["--radiusSm"],color:"#fff",cursor:"pointer",fontFamily:t["--sans"],fontSize:12,fontWeight:700}}>Usar esta lista</button></div>
            </div>
          )}
          <div style={{display:"flex",gap:7,marginTop:8}}>
            <button onClick={handlePaste}
              style={{padding:"8px 16px",background:t["--accentBg"],border:`1px solid ${t["--accentBrd"]}`,
                borderRadius:t["--radiusSm"],color:t["--accentText"],cursor:"pointer",
                fontFamily:t["--sans"],fontSize:12,fontWeight:700}}>🔎 Ler texto</button>
            <button onClick={()=>{setShowPaste(false);setPasteText("");}}
              style={{padding:"8px 14px",background:t["--dangerBg"],border:`1px solid ${t["--dangerBrd"]}`,
                borderRadius:t["--radiusSm"],color:t["--dangerTxt"],cursor:"pointer",
                fontFamily:t["--sans"],fontSize:12}}>Cancelar</button>
          </div>
        </div>
      )}

      <SesaAgeNotice data={sesaData.data_relatorio} t={t}>
        {" "}Para atualizar: abra <strong>📄 Abrir PDF Estoque</strong>, copie as páginas da FE 10 RS CASCAVEL e use <strong>📋 Colar texto do PDF</strong>.
        {sesaData.importadoEm && <button onClick={resetSesa} style={{marginLeft:8,fontSize:10.5,cursor:"pointer",background:"transparent",border:`1px solid ${t["--border"]}`,borderRadius:t["--radiusSm"],padding:"1px 7px",color:t["--textMuted"]}}>restaurar lista embutida</button>}
      </SesaAgeNotice>
      {/* ── No data yet ── */}
      {!sesaData?.medicamentos?.length && (
        <div style={{textAlign:"center",padding:"40px 20px",animation:"pgFade .3s ease"}}>
          <div style={{fontSize:32,marginBottom:14}}>📋</div>
          <div style={{fontSize:14,fontWeight:700,color:t["--textMuted"],fontFamily:t["--sans"],marginBottom:8}}>
            Nenhum dado carregado ainda
          </div>
          <div style={{fontSize:12,color:t["--textDim"],fontFamily:t["--sans"],lineHeight:1.7,maxWidth:320,margin:"0 auto",marginBottom:20}}>
            Para ver o estoque real de Cascavel (FE 10 RS CASCAVEL), use uma das opções abaixo:
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:300,margin:"0 auto",textAlign:"left"}}>
            {[
              ["🤖 Carregar via IA","Requer chave API Anthropic. O sistema busca e interpreta o PDF automaticamente."],
              ["📋 Colar texto do PDF","Copie o texto das páginas 424–427 e cole diretamente. Sem necessidade de API."],
              ["📄 Abrir PDF","Acesse o relatório completo no site da SESA/PR para consulta manual."],
            ].map(([title, desc]) => (
              <div key={title} style={{padding:"10px 13px",borderRadius:t["--radiusSm"],
                background:t["--surface2"],border:`1px solid ${t["--border"]}`}}>
                <div style={{fontSize:12,fontWeight:700,color:t["--text"],fontFamily:t["--sans"],marginBottom:3}}>{title}</div>
                <div style={{fontSize:11,color:t["--textMuted"],fontFamily:t["--sans"],lineHeight:1.5}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Loaded data ── */}
      {sesaData && sesaData.medicamentos && (
        <>
          {/* summary */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
            marginBottom:12,flexWrap:"wrap",gap:8}}>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:t["--text"],fontFamily:t["--sans"]}}>
                FE 10 RS CASCAVEL — Estoque Atual
              </div>
              <div style={{fontSize:11,color:t["--textMuted"],fontFamily:t["--sans"]}}>
                {sesaData.medicamentos.length} itens · {sesaData.medicamentos.filter(m=>m.quantidade>0).length} em estoque · {sesaData.medicamentos.filter(m=>!m.quantidade||m.quantidade<=0).length} zerados
              </div>
            </div>
            <div style={{display:"flex",gap:14}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:20,fontWeight:700,color:"#059669",fontFamily:"monospace"}}>
                  {sesaData.medicamentos.filter(m=>m.quantidade>0).length}
                </div>
                <div style={{fontSize:9.5,color:t["--textMuted"],fontFamily:t["--sans"],textTransform:"uppercase"}}>Em estoque</div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:20,fontWeight:700,color:"#dc2626",fontFamily:"monospace"}}>
                  {sesaData.medicamentos.filter(m=>!m.quantidade||m.quantidade<=0).length}
                </div>
                <div style={{fontSize:9.5,color:t["--textMuted"],fontFamily:t["--sans"],textTransform:"uppercase"}}>Zerados</div>
              </div>
            </div>
          </div>

          {/* search */}
          <input type="text" placeholder="🔍  Buscar medicamento..." value={search}
            onChange={e=>setSearch(e.target.value)} style={{...inp,marginBottom:12}}/>

          {/* list */}
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {filtered.map((med,i) => {
              const inStock = med.quantidade > 0;
              const dbMed   = matchDB(med.nome);
              const r       = dbMed ? [1,3,5].map(x=>parseInt((dbMed.cor||"#10b981").slice(x,x+2),16)).join(",") : "5,150,105";
              return (
                <div key={i}
                  onClick={dbMed&&onSelectMed ? ()=>onSelectMed(dbMed) : undefined}
                  style={{padding:"11px 14px",borderRadius:t["--radiusSm"],
                    background:inStock?`rgba(${r},.05)`:t["--surface2"],
                    border:inStock?`1.5px solid rgba(${r},.25)`:`1px solid ${t["--border"]}`,
                    cursor:dbMed&&onSelectMed?"pointer":"default",
                    transition:"all .16s",opacity:inStock?1:.7}}
                  onMouseEnter={e=>{if(dbMed)e.currentTarget.style.filter="brightness(.96)";}}
                  onMouseLeave={e=>{e.currentTarget.style.filter="none";}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:13,
                        color:inStock?(dbMed?dbMed.cor:"#059669"):t["--textMuted"],
                        marginBottom:med.apresentacao?3:0,lineHeight:1.3}}>
                        {med.nome}
                      </div>
                      {med.apresentacao && (
                        <div style={{fontSize:11,color:t["--textMuted"],fontFamily:t["--sans"]}}>{med.apresentacao}</div>
                      )}
                      {dbMed && onSelectMed && (
                        <div style={{fontSize:10,color:dbMed.cor,fontFamily:t["--sans"],marginTop:3}}>
                          → {dbMed.pa} · clique para detalhes
                        </div>
                      )}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                      <span style={{fontSize:12,fontWeight:700,padding:"3px 9px",
                        borderRadius:t["--radiusSm"],fontFamily:"monospace",
                        background:inStock?"rgba(5,150,105,.12)":"rgba(220,38,38,.08)",
                        color:inStock?"#059669":"#dc2626",whiteSpace:"nowrap"}}>
                        {inStock ? `✅ ${med.quantidade.toLocaleString("pt-BR")} un.` : "❌ Sem estoque"}
                      </span>
                      {med.validade && (
                        <span style={{fontSize:10,color:t["--textDim"],fontFamily:t["--sans"]}}>
                          Val: {med.validade}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && search && (
            <div style={{textAlign:"center",padding:"30px",color:t["--textMuted"],fontFamily:t["--sans"],fontSize:12}}>
              Nenhum medicamento encontrado para "{search}"
            </div>
          )}
        </>
      )}

      <div style={{marginTop:18,padding:"10px 13px",borderRadius:t["--radiusSm"],
        background:t["--warnBg"],border:`1px solid ${t["--warnBrd"]}`,
        fontSize:11,color:t["--warnTxt"],lineHeight:1.7,fontFamily:t["--sans"]}}>
        ⚠️ Medicamentos CEAF exigem cadastro no sistema SESA-PR e documentação clínica (laudo, receita especial, exames). Atualização quinzenal às segundas e quintas-feiras.
      </div>
      <div style={{height:20}}/>
    </div>
  );
}

