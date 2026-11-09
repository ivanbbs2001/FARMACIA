import { useContext } from "react";
import { getWarns, rgb } from "../utils";
import { Ctx, THEMES } from "../theme";
import { getAlts } from "../data/alts";
import { useSesa } from "../data/sesaStore";
import { SesaAgeNotice } from "./SesaAgeNotice";
import { ALL } from "../data/groups";
export function PanelSection({title,icon,warn,t,children}){
  return(
    <div style={{marginBottom:18}}>
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:9,
        paddingBottom:6,borderBottom:`1px solid ${t["--border"]}`}}>
        <span style={{fontSize:14}}>{icon}</span>
        <span style={{fontSize:10,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",
          color:warn?t["--warn"]:t["--textDim"],fontFamily:t["--sans"]}}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export function PanelDoseCard({safeDose,dose,f,t,safeCor}){
  const r=rgb(safeCor);
  return(
    <div style={{borderRadius:t["--radiusSm"],overflow:"hidden",border:`1.5px solid rgba(${r},.25)`}}>
      <div style={{padding:"11px 14px",background:`rgba(${r},.07)`,borderBottom:`1px solid rgba(${r},.15)`}}>
        <div style={{fontSize:9.5,color:t["--textDim"],fontWeight:700,letterSpacing:".07em",
          textTransform:"uppercase",fontFamily:t["--sans"],marginBottom:5}}>
          {f.isC&&safeDose.p?"Dose Pediátrica":"Dose — Adulto"}
        </div>
        <div style={{fontFamily:t["--mono"],fontSize:13.5,color:t["--text"],lineHeight:1.5}}>{dose}</div>
        {safeDose.max&&<div style={{fontSize:11,color:t["--textMuted"],fontFamily:t["--mono"],marginTop:3}}>{safeDose.max}</div>}
      </div>
      {!f.isC&&safeDose.p&&(
        <div style={{padding:"11px 14px"}}>
          <div style={{fontSize:9.5,color:t["--blue"],fontWeight:700,letterSpacing:".07em",
            textTransform:"uppercase",fontFamily:t["--sans"],marginBottom:5}}>Dose Pediátrica</div>
          <div style={{fontFamily:t["--mono"],fontSize:12.5,color:t["--textMuted"],lineHeight:1.5}}>{safeDose.p}</div>
        </div>
      )}
      {f.isC&&safeDose.a&&safeDose.p&&(
        <div style={{padding:"11px 14px"}}>
          <div style={{fontSize:9.5,color:t["--textDim"],fontWeight:700,letterSpacing:".07em",
            textTransform:"uppercase",fontFamily:t["--sans"],marginBottom:5}}>Referência Adulto</div>
          <div style={{fontFamily:t["--mono"],fontSize:12,color:t["--textMuted"],lineHeight:1.5}}>{safeDose.a}</div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════ DRUG DETAIL PANEL ════════════════════════ */
export function DrugDetailPanel({stack,onClose,onBack,onOpen,f}){
  const sesa=useSesa();
  const theme=useContext(Ctx);
  const t=THEMES[theme]?.vars||THEMES.light.vars;
  const isInd=theme==="industrial";
  const med=stack[stack.length-1];
  if(!med) return null;

  const safeCor = med.cor||"#10b981";
  const safeAl  = Array.isArray(med.al)?med.al:[];
  const safeCom = Array.isArray(med.comerciais)?med.comerciais:[];
  const safeSyms= Array.isArray(med.syms)?med.syms:[];
  const safeDose= med.dose||{a:"—",max:"",p:""};
  const safeVia = med.via||"Oral";
  const dose    = (f.isC&&safeDose.p)?safeDose.p:(safeDose.a||"—");
  const ws      = getWarns(med,f);
  const alts    = getAlts(med.id);
  const r       = rgb(safeCor);
  const panelW  = typeof window!=="undefined"?Math.min(500,window.innerWidth):400;

  const breadcrumb = stack.length>1
    ? stack.slice(0,-1).map(m=>m.pa.split(" ").slice(0,3).join(" ")).join(" › ")
    : null;

  return(
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{position:"fixed",inset:0,
        background:"rgba(0,0,0,.5)",zIndex:498,animation:"pgFade .22s ease"}}/>

      {/* Sliding panel */}
      <div style={{
        position:"fixed",top:0,right:0,
        width:panelW,height:"100vh",
        background:t["--surface"],
        zIndex:499,
        display:"flex",flexDirection:"column",
        boxShadow:"-6px 0 32px rgba(0,0,0,.22)",
        animation:"pgPanelIn .26s ease",
      }}>

        {/* Panel header */}
        <div style={{
          height:52,flexShrink:0,padding:"0 14px",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          borderBottom:`${isInd?"2px":"1px"} solid ${t["--border"]}`,
          background:t["--hdrBg"],gap:10,
        }}>
          <div style={{display:"flex",alignItems:"center",gap:8,minWidth:0,flex:1}}>
            {stack.length>1&&(
              <button onClick={e=>{e.stopPropagation();onBack();}}
                style={{background:t["--surface2"],border:`1px solid ${t["--border"]}`,
                  borderRadius:isInd?"2px":"8px",padding:"5px 9px",cursor:"pointer",
                  color:t["--textMuted"],fontFamily:t["--sans"],fontSize:13,flexShrink:0,
                  display:"flex",alignItems:"center",gap:4}}>
                ← <span style={{fontSize:11}}>Voltar</span>
              </button>
            )}
            <div style={{minWidth:0,overflow:"hidden"}}>
              {breadcrumb&&(
                <div style={{fontSize:9.5,color:t["--textDim"],fontFamily:t["--sans"],
                  whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",
                  marginBottom:1}}>{breadcrumb} ›</div>
              )}
              <div style={{fontSize:11,fontWeight:700,letterSpacing:".04em",
                textTransform:"uppercase",color:t["--textMuted"],fontFamily:t["--sans"],
                whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                Detalhe do Medicamento
              </div>
            </div>
          </div>
          <button onClick={onClose}
            style={{background:t["--dangerBg"],border:`1px solid ${t["--dangerBrd"]}`,
              borderRadius:isInd?"2px":"8px",width:32,height:32,cursor:"pointer",
              color:t["--dangerTxt"],fontSize:15,flexShrink:0,display:"flex",
              alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        {/* Scrollable body */}
        <div className="pg-sc" style={{flex:1,overflowY:"auto",padding:"18px 16px"}}>

          {/* Drug hero card */}
          <div style={{padding:"16px",marginBottom:20,borderRadius:t["--radius"],
            background:`rgba(${r},.06)`,border:`2px solid rgba(${r},.28)`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:t["--mono"],fontWeight:700,fontSize:17,
                  color:safeCor,lineHeight:1.25,marginBottom:5}}>{med.pa}</div>
                {med.fito&&med.planta&&(
                  <div style={{fontSize:11,color:t["--fito"],fontStyle:"italic",
                    marginBottom:5,fontFamily:t["--sans"]}}>{med.planta} · {med.parte}</div>
                )}
                <div style={{fontSize:10.5,color:t["--textMuted"],textTransform:"uppercase",
                  letterSpacing:".06em",marginBottom:9,fontFamily:t["--sans"]}}>{med.classe}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                  {safeCom.map(n=>(
                    <span key={n} style={{fontSize:11,padding:"3px 9px",
                      background:`rgba(${r},.13)`,color:safeCor,
                      borderRadius:t["--radiusSm"],fontWeight:500,fontFamily:t["--sans"]}}>{n}</span>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end",flexShrink:0}}>
                {med.fito&&<span style={{fontSize:9.5,padding:"2px 7px",borderRadius:t["--radiusSm"],
                  background:t["--fitoBg"],color:t["--fitoText"],border:`1px solid ${t["--fitoBrd"]}`,
                  fontWeight:700,fontFamily:t["--sans"]}}>🌿 fito</span>}
                {med.chronic&&<span style={{fontSize:9.5,padding:"2px 7px",borderRadius:t["--radiusSm"],
                  background:t["--chronicBg"],color:t["--chronicText"],border:`1px solid ${t["--chronicBrd"]}`,
                  fontWeight:700,fontFamily:t["--sans"]}}>🏥 crônico</span>}
                {med.sesa&&<span style={{fontSize:9.5,padding:"2px 7px",borderRadius:t["--radiusSm"],
                  background:"rgba(3,105,161,.1)",color:"#0369a1",border:"1px solid rgba(3,105,161,.3)",
                  fontWeight:700,fontFamily:t["--sans"]}}>🏥 SESA-PR</span>}
                <span style={{fontSize:10.5,padding:"3px 9px",border:`1px solid ${t["--border"]}`,
                  borderRadius:t["--radiusSm"],color:t["--textMuted"],fontFamily:t["--sans"]}}>{safeVia}</span>
              </div>
            </div>
          </div>

          {/* ── SESA Stock — shown immediately after hero ── */}
          {(()=>{
            const sesaMeds = sesa?.medicamentos||[];
            const paWords = (med.pa||"").toLowerCase()
              .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
              .replace(/[(),.]/g," ").split(/\s+/)
              .filter(w=>w.length>3 && !/^(mg|ml|mcg|ui|cr|sr|xr|er|lp|os|iv|sc|im|vo)$/i.test(w));
            const matches = sesaMeds.filter(s=>{
              const sNome = s.nome.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g,"");
              return paWords.some(w=>sNome.includes(w));
            });
            if(!matches.length) return null;
            const total = matches.reduce((acc,m)=>acc+(m.quantidade||0),0);
            return(
              <div style={{marginBottom:18,padding:"14px",borderRadius:t["--radius"],
                background:"rgba(3,105,161,.07)",
                border:`2px solid rgba(3,105,161,${total>0?".35":".15"})`,
                animation:"pgFade .3s ease"}}>
                {/* Header */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                  marginBottom:10,flexWrap:"wrap",gap:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{fontSize:16}}>📦</span>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:"#0c4a6e",fontFamily:t["--sans"]}}>
                        Estoque SESA — FE 10 RS CASCAVEL
                      </div>
                      <div style={{fontSize:10,color:"#0369a1",fontFamily:t["--sans"]}}>
                        Emissão: {sesa.data_relatorio}
                      </div>
                    </div>
                  </div>
                  <span style={{fontSize:13,fontWeight:700,fontFamily:"monospace",
                    padding:"4px 10px",borderRadius:t["--radiusSm"],
                    background:total>0?"rgba(5,150,105,.12)":"rgba(220,38,38,.08)",
                    color:total>0?"#059669":"#dc2626",whiteSpace:"nowrap"}}>
                    {total>0?`✅ ${total.toLocaleString("pt-BR")} un.`:"❌ Sem estoque"}
                  </span>
                </div>
                <SesaAgeNotice data={sesa.data_relatorio} t={t} compact/>
                {/* Items */}
                <div style={{display:"flex",flexDirection:"column",gap:0,
                  borderRadius:t["--radiusSm"],overflow:"hidden",
                  border:"1px solid rgba(3,105,161,.18)"}}>
                  {matches.map((m,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",
                      alignItems:"center",padding:"8px 10px",gap:8,
                      background:i%2===0?"rgba(3,105,161,.04)":"rgba(3,105,161,.02)",
                      borderBottom:i<matches.length-1?"1px solid rgba(3,105,161,.1)":"none"}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:11.5,color:"#0c4a6e",fontFamily:"'JetBrains Mono',monospace",
                          fontWeight:600,lineHeight:1.3}}>{m.nome}</div>
                        <div style={{fontSize:10,color:"#0369a1",fontFamily:t["--sans"],marginTop:2}}>
                          {m.apresentacao}
                        </div>
                      </div>
                      <span style={{fontSize:13,fontWeight:700,fontFamily:"monospace",
                        color:m.quantidade>0?"#059669":"#dc2626",
                        whiteSpace:"nowrap",flexShrink:0}}>
                        {m.quantidade>0?m.quantidade.toLocaleString("pt-BR")+" un.":"—"}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:10.5,color:"#0369a1",fontFamily:t["--sans"],
                  lineHeight:1.6,marginTop:8}}>
                  ⚠️ Medicamento CEAF — exige laudo médico (LME), cadastro SESA-PR e receita especial.
                </div>
              </div>
            );
          })()}

          {/* Posologia */}
          <PanelSection title="Posologia" icon="💊" t={t}>
            <PanelDoseCard safeDose={safeDose} dose={dose} f={f} t={t} safeCor={safeCor}/>
          </PanelSection>

          {/* Patient warnings */}
          {ws.length>0&&(
            <PanelSection title="Alertas de Perfil" icon="👤" t={t} warn>
              {ws.map((w,i)=>(
                <div key={i} style={{fontSize:12.5,padding:"9px 12px",borderRadius:t["--radiusSm"],
                  marginBottom:5,background:w.d?t["--dangerBg"]:t["--warnBg"],
                  border:`1px solid ${w.d?t["--dangerBrd"]:t["--warnBrd"]}`,
                  color:w.d?t["--dangerTxt"]:t["--warnTxt"],fontFamily:t["--sans"]}}>
                  {w.d?"🚫":"⚠️"} {w.s}
                </div>
              ))}
            </PanelSection>
          )}

          {/* Mechanism */}
          <PanelSection title="Mecanismo de Ação" icon="⚗️" t={t}>
            <p style={{fontSize:13,color:t["--text"],lineHeight:1.75,fontFamily:t["--sans"]}}>{med.mec||"—"}</p>
          </PanelSection>

          {/* Contraindications */}
          <PanelSection title="Contraindicações" icon="🚫" t={t} warn>
            <p style={{fontSize:12.5,color:t["--warnTxt"],lineHeight:1.75,fontFamily:t["--sans"]}}>{med.ci||"—"}</p>
          </PanelSection>

          {/* Alerts */}
          {safeAl.length>0&&(
            <PanelSection title="Alertas Importantes" icon="⚠️" t={t} warn>
              {safeAl.map((a,i)=>(
                <div key={i} style={{fontSize:12.5,padding:"9px 12px",borderRadius:t["--radiusSm"],
                  marginBottom:5,background:t["--warnBg"],border:`1px solid ${t["--warnBrd"]}`,
                  color:t["--warnTxt"],fontFamily:t["--sans"]}}>⚠️ {a}</div>
              ))}
            </PanelSection>
          )}

          {/* Symptoms covered */}
          {safeSyms.length>0&&(
            <PanelSection title="Indicado Para" icon="🩺" t={t}>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {safeSyms.map(s=>{
                  const lbl=ALL.find(i=>i.id===s)?.label||s;
                  return(
                    <span key={s} style={{fontSize:11.5,padding:"4px 11px",borderRadius:20,
                      background:t["--accentBg"],color:t["--accentText"],
                      border:`1px solid ${t["--accentBrd"]}`,fontFamily:t["--sans"]}}>{lbl}</span>
                  );
                })}
              </div>
            </PanelSection>
          )}

          {/* Program availability */}
          {(med.fp||med.sus)&&(
            <PanelSection title="Disponível Gratuitamente" icon="🏛️" t={t}>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {med.fp&&(
                  <div style={{padding:"11px 14px",borderRadius:t["--radiusSm"],
                    background:t["--fpBg"],border:`1.5px solid ${t["--fpBrd"]}`}}>
                    <div style={{fontWeight:700,fontSize:12.5,color:t["--fpTxt"],fontFamily:t["--sans"],marginBottom:4,display:"flex",alignItems:"center",gap:6}}>
                      <span>🏛️</span> Farmácia Popular (Aqui Tem Farmácia Popular)
                    </div>
                    <div style={{fontSize:11.5,color:t["--fp"],lineHeight:1.65,fontFamily:t["--sans"],marginBottom:5}}>
                      <strong>100% gratuito</strong> — apresentar receita médica válida (SUS ou particular) + documento com foto e CPF em qualquer farmácia credenciada com o selo "Aqui Tem Farmácia Popular".
                    </div>
                    <div style={{fontSize:11,color:t["--fpTxt"],fontFamily:t["--sans"],opacity:.8}}>
                      📍 Em Cascavel-PR: consulte farmácias credenciadas em <strong>consultafp.saude.gov.br</strong> ou ligue <strong>136</strong> (Ministério da Saúde).
                    </div>
                  </div>
                )}
                {med.sus&&(
                  <div style={{padding:"11px 14px",borderRadius:t["--radiusSm"],
                    background:t["--susBg"],border:`1.5px solid ${t["--susBrd"]}`}}>
                    <div style={{fontWeight:700,fontSize:12.5,color:t["--susTxt"],fontFamily:t["--sans"],marginBottom:4,display:"flex",alignItems:"center",gap:6}}>
                      <span>💊</span> Farmácia Básica SUS — UBS / CBAF
                    </div>
                    <div style={{fontSize:11.5,color:t["--sus"],lineHeight:1.65,fontFamily:t["--sans"],marginBottom:5}}>
                      <strong>Gratuito na UBS</strong> — retirar na Unidade Básica de Saúde (Posto de Saúde) do bairro. Apresentar receita médica + CPF + Cartão SUS.
                    </div>
                    <div style={{fontSize:11,color:t["--susTxt"],fontFamily:t["--sans"],opacity:.8}}>
                      📍 <strong>Cascavel-PR — Farmácia Básica:</strong> Av. Tancredo Neves, 1453 · WhatsApp: <strong>(45) 3321-5529</strong>
                    </div>
                  </div>
                )}
              </div>
            </PanelSection>
          )}

          {/* Substitutes — clickable */}
          {alts.length>0&&(
            <PanelSection title="Substitutos em Caso de Falta" icon="🔄" t={t}>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {alts.map(alt=>{
                  const ar=rgb(alt.cor||"#10b981");
                  return(
                    <button key={alt.id}
                      onClick={()=>onOpen(alt)}
                      style={{display:"flex",alignItems:"center",gap:10,
                        padding:"12px 14px",borderRadius:t["--radius"],
                        background:`rgba(${ar},.06)`,border:`1.5px solid rgba(${ar},.25)`,
                        cursor:"pointer",textAlign:"left",width:"100%",
                        transition:"all .18s",fontFamily:t["--sans"]}}
                      onMouseEnter={e=>{e.currentTarget.style.background=`rgba(${ar},.14)`;e.currentTarget.style.borderColor=`rgba(${ar},.55)`;}}
                      onMouseLeave={e=>{e.currentTarget.style.background=`rgba(${ar},.06)`;e.currentTarget.style.borderColor=`rgba(${ar},.25)`;}}
                    >
                      <div style={{width:4,height:44,borderRadius:2,
                        background:alt.cor||"#10b981",flexShrink:0}}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontFamily:t["--mono"],fontWeight:700,fontSize:13.5,
                          color:alt.cor||"#10b981",marginBottom:3,lineHeight:1.2}}>{alt.pa}</div>
                        <div style={{fontSize:10,color:t["--textMuted"],textTransform:"uppercase",
                          letterSpacing:".05em",marginBottom:4,fontFamily:t["--sans"]}}>{alt.classe}</div>
                        <div style={{fontSize:11.5,color:t["--textDim"],fontFamily:t["--mono"]}}>
                          {(alt.dose?.a)||"—"}
                          {alt.dose?.max&&<span style={{color:t["--textDim"],marginLeft:7,fontSize:10}}>· {alt.dose.max}</span>}
                        </div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",
                        gap:5,flexShrink:0}}>
                        {(alt.comerciais||[]).slice(0,2).map(n=>(
                          <span key={n} style={{fontSize:10,padding:"2px 7px",
                            background:`rgba(${ar},.13)`,color:alt.cor||"#10b981",
                            borderRadius:t["--radiusSm"],fontWeight:500,fontFamily:t["--sans"]}}>{n}</span>
                        ))}
                        {alt.fito&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:t["--radiusSm"],
                          background:t["--fitoBg"],color:t["--fitoText"],
                          border:`1px solid ${t["--fitoBrd"]}`,fontWeight:700,fontFamily:t["--sans"]}}>🌿</span>}
                        {alt.chronic&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:t["--radiusSm"],
                          background:t["--chronicBg"],color:t["--chronicText"],
                          border:`1px solid ${t["--chronicBrd"]}`,fontWeight:700,fontFamily:t["--sans"]}}>🏥</span>}
                        <span style={{fontSize:18,color:`rgba(${ar},.6)`,lineHeight:1}}>›</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </PanelSection>
          )}

          <div style={{height:24}}/>
        </div>
      </div>
    </>
  );
}



