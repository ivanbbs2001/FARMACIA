import { useContext, useMemo, useState } from "react";
import { Ctx, THEMES } from "../theme";
import { getWarns, rgb, norm } from "../utils";
import { ALL, CHRONIC_IDS } from "../data/groups";
import { getAlts } from "../data/alts";
import { MEDS } from "../data/meds";
export function MedCard({m,score,max,f,sel,catalog=false,onSelectMed=null}){
  const[open,setOpen]=useState(false);
  const theme=useContext(Ctx);
  const t=THEMES[theme]?.vars||THEMES.light.vars;

  // ── DEFENSIVE GUARDS ──
  if(!m||!m.pa) return null;
  const safeF    = f    || {isG:false,isL:false,isC:false,isI:false};
  const safeSel  = sel  || new Set();
  const safeSyms = Array.isArray(m.syms)      ? m.syms      : [];
  const safeAl   = Array.isArray(m.al)        ? m.al        : [];
  const safeCom  = Array.isArray(m.comerciais)? m.comerciais: [];
  const safeDose = m.dose || {a:"—",max:"",p:""};
  const safeCor  = m.cor  || "#10b981";
  const safeVia  = m.via  || "Oral";
  const safeMec  = m.mec  || "—";
  const safeCi   = m.ci   || "—";

  const ws     = getWarns(m, safeF);
  const danger = ws.some(w=>w.d);
  const r      = rgb(safeCor);
  const dose   = (safeF.isC && safeDose.p) ? safeDose.p : (safeDose.a||"—");
  const matched= safeSyms.filter(s=>safeSel.has(s)).map(s=>ALL.find(i=>i.id===s)?.label||s);
  const alts   = getAlts(m.id);
  const isInd  = theme==="industrial";

  const cardBg    = `rgba(${r},.05)`;
  const cardBd    = `${isInd?"2px":"1.5px"} solid rgba(${r},.2)`;
  const cardBdHov = `rgba(${r},.5)`;
  const cardBgHov = `rgba(${r},.1)`;

  return(
    <div className="pg-med"
      onClick={e=>{e.stopPropagation();setOpen(o=>!o);}}
      onMouseEnter={e=>{e.currentTarget.style.background=cardBgHov;e.currentTarget.style.borderColor=cardBdHov;}}
      onMouseLeave={e=>{e.currentTarget.style.background=cardBg;e.currentTarget.style.borderColor=`rgba(${r},.2)`;}}
      style={{background:cardBg,border:cardBd,borderRadius:t["--radius"],
        padding:"14px 16px",cursor:"pointer",transition:"all .18s",opacity:danger?.55:1}}>

      {/* ── TOP ROW ── */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2,flexWrap:"wrap"}}>
            <span style={{fontFamily:t["--mono"],fontWeight:700,fontSize:16,color:safeCor,letterSpacing:".01em",lineHeight:1.3}}>{m.pa}</span>
            {m.fito&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:t["--radiusSm"],background:t["--fitoBg"],color:t["--fitoText"],border:`1px solid ${t["--fitoBrd"]}`,fontWeight:700,letterSpacing:".05em",textTransform:"uppercase",fontFamily:t["--sans"],flexShrink:0}}>🌿 fito</span>}
            {m.chronic&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:t["--radiusSm"],background:t["--chronicBg"],color:t["--chronicText"],border:`1px solid ${t["--chronicBrd"]}`,fontWeight:700,letterSpacing:".05em",textTransform:"uppercase",fontFamily:t["--sans"],flexShrink:0}}>🏥 crônico</span>}
            {m.fp&&<span className="fp-badge" style={{background:t["--fpBg"],color:t["--fpTxt"],border:`1px solid ${t["--fpBrd"]}`}}>🏛️ Farm. Popular</span>}
            {m.sus&&<span className="fp-badge" style={{background:t["--susBg"],color:t["--susTxt"],border:`1px solid ${t["--susBrd"]}`}}>💊 Farmácia Básica</span>}
            {m.sesa&&<span className="fp-badge" style={{background:"rgba(3,105,161,.1)",color:"#0369a1",border:"1px solid rgba(3,105,161,.3)"}}>🏥 SESA</span>}
          </div>
          {m.fito&&m.planta&&<div style={{fontSize:9.5,color:t["--fito"],fontStyle:"italic",marginBottom:3,fontFamily:t["--sans"],opacity:.85}}>{m.planta} · {m.parte}</div>}
          <div style={{fontSize:10,color:t["--textMuted"],textTransform:"uppercase",letterSpacing:".06em",marginBottom:5,fontFamily:t["--sans"]}}>{m.classe}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
            {safeCom.slice(0,3).map(n=><span key={n} style={{fontSize:9.5,padding:"1px 6px",background:`rgba(${r},.12)`,color:safeCor,borderRadius:t["--radiusSm"],fontWeight:500,fontFamily:t["--sans"]}}>{n}</span>)}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
          {score!==undefined&&!catalog&&max>0&&(
            <div style={{display:"flex",alignItems:"center",gap:4}}>
              <div style={{width:40,height:3,background:t["--border"],borderRadius:2,overflow:"hidden"}}>
                <div style={{width:`${Math.min((score/max)*100,100)}%`,height:"100%",background:safeCor,borderRadius:2}}/>
              </div>
              <span style={{fontSize:9.5,color:t["--textMuted"],fontFamily:t["--mono"]}}>{score}/{max}</span>
            </div>
          )}
          <span style={{fontSize:9.5,color:t["--textMuted"],padding:"2px 6px",border:`1px solid ${t["--border"]}`,borderRadius:t["--radiusSm"],fontFamily:t["--sans"]}}>{safeVia}</span>
          <span style={{fontSize:12,color:t["--textMuted"],display:"block",transform:open?"rotate(180deg)":"none",transition:"transform .2s"}}>▾</span>
        </div>
      </div>

      {/* ── SINTOMAS ── */}
      {safeSyms.length>0&&(
        <div style={{marginTop:9}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:3,alignItems:"center"}}>
            <span style={{fontSize:9,color:t["--textDim"],flexShrink:0,fontWeight:700,
              letterSpacing:".06em",textTransform:"uppercase",fontFamily:t["--sans"],
              marginRight:2}}>Indicado para</span>
            {safeSyms.map(s=>{
              const lbl=ALL.find(i=>i.id===s)?.label||s;
              const active=safeSel.has(s);
              return(
                <span key={s} style={{
                  fontSize:9.5,padding:"1px 7px",borderRadius:20,
                  fontFamily:t["--sans"],lineHeight:1.6,
                  background:active?`rgba(${r},.18)`:t["--surface3"],
                  color:active?safeCor:t["--textMuted"],
                  fontWeight:active?700:400,
                  border:active?`1px solid rgba(${r},.35)`:`1px solid ${t["--border"]}`,
                  transition:"all .15s",
                }}>
                  {lbl}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* ── DOSE BAR ── */}
      <div style={{marginTop:7,padding:"7px 10px",background:t["--doseBg"],borderRadius:t["--radiusSm"],
        display:"flex",gap:7,alignItems:"flex-start",border:isInd?`1px solid ${t["--border"]}`:"none"}}>
        <span style={{fontSize:9.5,color:t["--textDim"],flexShrink:0,paddingTop:2,fontWeight:700,letterSpacing:".06em",fontFamily:t["--sans"]}}>DOSE</span>
        <span style={{fontFamily:t["--mono"],fontSize:11,color:t["--textMuted"],lineHeight:1.5}}>
          {dose}{safeDose.max&&<span style={{color:t["--textDim"],marginLeft:6}}>· {safeDose.max}</span>}
        </span>
      </div>

      {/* ── PATIENT WARNINGS ── */}
      {ws.length>0&&(
        <div style={{marginTop:6,display:"flex",flexDirection:"column",gap:3}}>
          {ws.map((w,i)=>(
            <div key={i} style={{fontSize:10,padding:"3px 8px",borderRadius:t["--radiusSm"],
              background:w.d?t["--dangerBg"]:t["--warnBg"],
              border:`1px solid ${w.d?t["--dangerBrd"]:t["--warnBrd"]}`,
              color:w.d?t["--dangerTxt"]:t["--warnTxt"],fontFamily:t["--sans"]}}>
              {w.d?"🚫":"⚠️"} {w.s}
            </div>
          ))}
        </div>
      )}

      {/* ── EXPANDED DETAILS ── */}
      {open&&(
        <div style={{marginTop:11,borderTop:`1px solid ${t["--border"]}`,paddingTop:11,
          display:"flex",flexDirection:"column",gap:7}}>

          {matched.length>0&&<DR l="Indicado para" v={matched.join(", ")} c={safeCor} t={t}/>}
          <DR l="Mecanismo" v={safeMec} t={t}/>
          <DR l="Contraindicações" v={safeCi} warn t={t}/>
          {safeAl.length>0&&<DR l="Alertas" v={safeAl.join(" · ")} warn t={t}/>}
          {safeF.isC&&safeDose.p&&<DR l="Dose Pediátrica" v={safeDose.p} c={t["--blue"]} t={t}/>}

          {/* sintomas cobertos (somente no catálogo) */}
          {catalog&&safeSyms.length>0&&(
            <div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",
                color:t["--textDim"],marginBottom:5,fontFamily:t["--sans"]}}>Sintomas cobertos</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {safeSyms.map(s=>{
                  const lbl=ALL.find(i=>i.id===s)?.label||s;
                  return(
                    <span key={s} style={{fontSize:9.5,padding:"1px 7px",borderRadius:20,
                      background:t["--accentBg"],color:t["--accentText"],
                      border:`1px solid ${t["--accentBrd"]}`,fontFamily:t["--sans"]}}>{lbl}</span>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── ALTERNATIVAS ── */}
          {alts.length>0&&(
            <div style={{marginTop:2}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",
                color:t["--warn"],marginBottom:6,fontFamily:t["--sans"],
                display:"flex",alignItems:"center",gap:5}}>
                <span>🔄</span> Substitutos em falta
                {onSelectMed&&<span style={{fontSize:8.5,color:t["--textDim"],fontWeight:400,textTransform:"none",letterSpacing:0}}>— clique para ver detalhes</span>}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {alts.map(alt=>{
                  const ar=rgb(alt.cor||"#10b981");
                  const clickable=!!onSelectMed;
                  return(
                    <div key={alt.id}
                      onClick={clickable?(e=>{e.stopPropagation();onSelectMed(alt);}):undefined}
                      style={{display:"flex",alignItems:"center",gap:8,
                        padding:"9px 11px",borderRadius:t["--radiusSm"],
                        background:`rgba(${ar},.06)`,
                        border:`1.5px solid rgba(${ar},.22)`,
                        cursor:clickable?"pointer":"default",
                        transition:clickable?"all .16s":"none",
                        position:"relative"}}>
                      <div style={{width:3,height:38,borderRadius:2,background:alt.cor||"#10b981",flexShrink:0}}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontFamily:t["--mono"],fontSize:12,fontWeight:700,
                          color:alt.cor||"#10b981",lineHeight:1.2,marginBottom:2}}>{alt.pa}</div>
                        <div style={{fontSize:9.5,color:t["--textMuted"],fontFamily:t["--sans"],
                          textTransform:"uppercase",letterSpacing:".05em",marginBottom:3}}>{alt.classe}</div>
                        <div style={{fontSize:10.5,color:t["--textDim"],fontFamily:t["--mono"]}}>
                          {(alt.dose?.a)||"—"}
                        </div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                        {(alt.comerciais||[]).slice(0,1).map(n=>(
                          <span key={n} style={{fontSize:9,padding:"2px 6px",
                            background:`rgba(${ar},.13)`,color:alt.cor||"#10b981",
                            borderRadius:t["--radiusSm"],fontFamily:t["--sans"],fontWeight:500}}>{n}</span>
                        ))}
                        {alt.fito&&<span style={{fontSize:8,padding:"1px 5px",borderRadius:t["--radiusSm"],
                          background:t["--fitoBg"],color:t["--fitoText"],
                          border:`1px solid ${t["--fitoBrd"]}`,fontWeight:700,fontFamily:t["--sans"]}}>🌿</span>}
                        {clickable&&<span style={{fontSize:13,color:`rgba(${ar},.7)`,marginTop:2}}>›</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function DR({l,v,c,warn,t}){
  if(!t) return null;
  return(
    <div style={{display:"flex",gap:9,alignItems:"flex-start"}}>
      <span style={{fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",
        color:warn?t["--warn"]:(c||t["--textDim"]),flexShrink:0,width:88,
        paddingTop:2,lineHeight:1.4,fontFamily:t["--sans"]}}>{l}</span>
      <span style={{fontSize:11,color:warn?t["--warnTxt"]:t["--textMuted"],
        lineHeight:1.6,fontFamily:t["--sans"]}}>{v||"—"}</span>
    </div>
  );
}

/* ════════════════════════ CHRONIC WARNING BANNER ════════════════════════ */
export function ChronicBanner({sel,t}){
  const hasChronic=[...sel].some(s=>CHRONIC_IDS.has(s));
  if(!hasChronic) return null;
  return(
    <div style={{marginBottom:14,padding:"12px 15px",borderRadius:t["--radius"],
      background:t["--chronicBg"],border:`2px solid ${t["--chronicBrd"]}`,
      display:"flex",gap:11,alignItems:"flex-start"}}>
      <span style={{fontSize:20,flexShrink:0}}>🏥</span>
      <div>
        <div style={{fontWeight:700,fontSize:12.5,color:t["--chronicText"],fontFamily:t["--sans"],marginBottom:3}}>
          Condição Crônica Detectada
        </div>
        <div style={{fontSize:11.5,color:t["--chronic"],lineHeight:1.65,fontFamily:t["--sans"]}}>
          Pressão alta, diabetes e colesterol/triglicerídios elevados <strong>requerem acompanhamento médico e tratamento farmacológico prescrito</strong>.
          Os fitoterápicos listados são <strong>recursos complementares</strong>, não substitutos de medicamentos prescritos.
          Sempre oriente o paciente a manter consultas regulares e nunca suspender medicamentos sem orientação médica.
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════ CATALOG VIEW ════════════════════════ */
export function CatalogView({f,t,theme,onSelectMed}){
  const[cSearch,setCSearch]=useState("");
  const[cFilter,setCFilter]=useState("all");
  const isInd=theme==="industrial";
  const filtered=useMemo(()=>{
    const q=norm(cSearch);
    return MEDS.filter(m=>{
      if(cFilter==="conv"&&m.fito) return false;
      if(cFilter==="fito"&&!m.fito) return false;
      if(cFilter==="chronic"&&!m.chronic) return false;
      if(cFilter==="fp"&&!m.fp) return false;
      if(cFilter==="sus"&&!m.sus) return false;
      if(cFilter==="sesa"&&!m.sesa) return false;
      if(cFilter==="vit"){const V=new Set(["vitd3","acido_folico","vitb12","complexo_b","calcio_vitd","magnesio","vite","biotina","vita","vitk","vitc","sulfato_fe","zinc","aidetres","calcos","ainofer","puravit","puravit_adz","vitacolin","megafert"]);if(!V.has(m.id)) return false;}
      if(!q) return true;
      return norm(m.pa).includes(q)||norm(m.classe).includes(q)||m.comerciais.some(c=>norm(c).includes(q));
    }).sort((a,b)=>a.pa.localeCompare(b.pa,"pt-BR"));
  },[cSearch,cFilter]);
  const btnS=(active,color)=>({padding:"5px 12px",cursor:"pointer",fontFamily:t["--sans"],fontSize:11,fontWeight:active?700:400,borderRadius:isInd?"2px":"20px",transition:"all .16s",background:active?(color||t["--accentBg"]):"transparent",color:active?(color?t["--chronicText"]:t["--accentText"]):t["--textMuted"],border:`1px solid ${active?(color||t["--accentBrd"]):t["--border"]}`,});
  return(
    <>
      <div style={{marginBottom:14}}>
        <h2 style={{fontSize:15.5,fontWeight:700,marginBottom:2,fontFamily:t["--sans"],color:t["--text"],letterSpacing:isInd?".04em":"normal",textTransform:isInd?"uppercase":"none"}}>Catálogo Completo</h2>
        <p style={{fontSize:11,color:t["--textMuted"],fontFamily:t["--sans"]}}>{MEDS.length} medicamentos · {MEDS.filter(m=>m.fito).length} fitoterápicos · {MEDS.filter(m=>m.chronic).length} para condições crônicas · Clique para detalhes</p>
      </div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:12,alignItems:"center"}}>
        {[["all","Todos"],["conv","Convencionais"],["fito","🌿 Fitoterápicos"],["sesa","🏥 SESA-PR"],["vit","💛 Vitaminas"],["fp","🏛️ Farmácia Popular"],["sus","💊 Farmácia Básica SUS"],["chronic","🏥 Crônicos"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setCFilter(id)} style={btnS(cFilter===id, id==="chronic"?t["--chronicBg"]:null)}>{lbl}</button>
        ))}
        <div style={{flex:1,minWidth:150}}>
          <input type="text" placeholder="🔍  Buscar..." value={cSearch} onChange={e=>setCSearch(e.target.value)}
            style={{width:"100%",background:t["--surface2"],border:`1px solid ${t["--border"]}`,borderRadius:t["--radiusSm"],padding:"6px 10px",fontSize:12,color:t["--text"],outline:"none",fontFamily:t["--sans"]}}/>
        </div>
      </div>
      <div style={{marginBottom:12,display:"flex",justifyContent:"flex-end"}}>
        <span style={{fontSize:10.5,padding:"3px 10px",borderRadius:20,background:t["--tagBg"],color:t["--tagTxt"],border:`1px solid ${t["--tagBrd"]}`,fontFamily:t["--mono"]}}>{filtered.length} resultado{filtered.length!==1?"s":""}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:9}}>
        {filtered.map(m=><MedCard key={m.id} m={m} f={f} sel={new Set()} catalog={true} onSelectMed={onSelectMed}/>)}
      </div>
      <div style={{marginTop:20,padding:"10px 13px",borderRadius:t["--radiusSm"],background:t["--dangerBg"],border:`1px solid ${t["--dangerBrd"]}`,fontSize:11.5,color:t["--dangerTxt"],lineHeight:1.7,fontFamily:t["--sans"]}}>
        <strong>⚕️ Aviso:</strong> Catálogo de referência auxiliar. Sempre confirme alergias, interações e condições especiais do paciente. Condições crônicas requerem acompanhamento médico.
      </div>
      <div style={{height:20}}/>
    </>
  );
}

/* ════════════════════════ TAB BAR ════════════════════════ */
export function TabBar({tab,setTab,todosCount,convCount,fitoCount,vitCount,sesaTabCount,fpCount,susCount,t,theme}){
  const isInd=theme==="industrial";
  const tabs=[
    {id:"todos",lbl:"Todos",              ico:"◉",  cnt:todosCount,bg:t["--surface3"],  clr:t["--text"],       brd:t["--border2"]},
    {id:"conv", lbl:"Medicamentos",       ico:"💊", cnt:convCount, bg:t["--accentBg"],  clr:t["--accentText"], brd:t["--accentBrd"]},
    {id:"fito", lbl:"Fitoterápicos",       ico:"🌿", cnt:fitoCount, bg:t["--fitoBg"],   clr:t["--fitoText"],  brd:t["--fitoBrd"]},
    {id:"vit",      lbl:"Vitaminas",       ico:"💛", cnt:vitCount,      bg:"#fef3c7",       clr:"#92400e",        brd:"#fcd34d"},
    {id:"sesa_tab", lbl:"SESA-PR",         ico:"📦", cnt:sesaTabCount,  bg:"rgba(3,105,161,.1)",clr:"#0c4a6e",   brd:"rgba(3,105,161,.4)"},
    {id:"fp",   lbl:"Farmácia Popular",    ico:"🏛️", cnt:fpCount,   bg:t["--fpBg"]||t["--blueBg"], clr:t["--fpTxt"]||t["--blueTxt"], brd:t["--fpBrd"]||t["--blue"]},
    {id:"sus",  lbl:"Farmácia Básica SUS", ico:"🏥", cnt:susCount,  bg:t["--susBg"]||t["--accentBg"], clr:t["--susTxt"]||t["--accentText"], brd:t["--susBrd"]||t["--accentBrd"]},
  ];
  return(
    <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
      {tabs.map(tb=>{
        const active=tab===tb.id;
        return(
          <button key={tb.id} onClick={()=>setTab(tb.id)}
            style={{display:"flex",alignItems:"center",gap:5,padding:"7px 12px",cursor:"pointer",
              transition:"all .17s",fontFamily:t["--sans"],fontSize:11.5,fontWeight:active?700:400,
              borderRadius:isInd?"2px":"9px",
              background:active?tb.bg:t["--surface2"],
              color:active?tb.clr:t["--textMuted"],
              border:`${active?"2px":"1px"} solid ${active?tb.brd:t["--border"]}`,
              boxShadow:active?"0 2px 8px rgba(0,0,0,.1)":"none"}}>
            <span style={{fontSize:14}}>{tb.ico}</span>
            {tb.lbl}
            <span style={{fontSize:9.5,padding:"1px 6px",borderRadius:20,fontWeight:700,
              background:active?tb.brd:t["--border"],
              color:active?tb.bg:t["--textMuted"],
              minWidth:18,textAlign:"center"}}>{tb.cnt}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Empty({t}){return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"56px 20px",gap:14,animation:"pgFade .4s ease"}}><div style={{width:60,height:60,borderRadius:"50%",background:t["--surface2"],border:`1.5px solid ${t["--border"]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>💊</div><p style={{fontSize:13,fontWeight:600,color:t["--textMuted"],fontFamily:t["--sans"]}}>Nenhum sintoma selecionado</p><p style={{fontSize:11.5,color:t["--textDim"],lineHeight:1.7,maxWidth:230,textAlign:"center",fontFamily:t["--sans"]}}>Selecione sintomas ao lado para ver sugestões em tempo real, ou use <strong>MEDICAMENTOS</strong> no menu para o catálogo completo.</p></div>);}
export function FitoEmpty({t}){return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"44px 20px",gap:12,animation:"pgFade .3s ease"}}><div style={{width:52,height:52,borderRadius:"50%",background:t["--fitoBg"],border:`1.5px solid ${t["--fitoBrd"]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🌿</div><p style={{fontSize:13,fontWeight:600,color:t["--fito"],fontFamily:t["--sans"]}}>Nenhum fitoterápico para estes sintomas</p></div>);}

export function VitEmpty({t}){
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"44px 20px",gap:12,animation:"pgFade .3s ease"}}>
      <div style={{width:52,height:52,borderRadius:"50%",background:"#fef3c7",border:"1.5px solid #fcd34d",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>💛</div>
      <p style={{fontSize:13,fontWeight:600,color:"#92400e",fontFamily:t["--sans"]}}>Nenhuma vitamina para estes sintomas</p>
      <p style={{fontSize:11.5,color:t["--textMuted"],lineHeight:1.65,maxWidth:240,textAlign:"center",fontFamily:t["--sans"]}}>
        Use o grupo <strong>💊 Vitaminas & Suplementos</strong> no menu lateral para selecionar a condição adequada.
      </p>
    </div>
  );
}
export function SesaTabEmpty({t}){
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      padding:"44px 20px",gap:12,animation:"pgFade .3s ease"}}>
      <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(3,105,161,.1)",
        border:"1.5px solid rgba(3,105,161,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>📦</div>
      <p style={{fontSize:13,fontWeight:600,color:"#0c4a6e",fontFamily:t["--sans"]}}>Nenhum medicamento CEAF para estes sintomas</p>
      <p style={{fontSize:11.5,color:t["--textMuted"],lineHeight:1.65,maxWidth:260,textAlign:"center",fontFamily:t["--sans"]}}>
        Estes sintomas não possuem correspondência na lista SESA. Veja as abas Medicamentos ou Farmácia Popular.
      </p>
    </div>
  );
}
export function ConvEmpty({t}){return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"44px 20px",gap:12,animation:"pgFade .3s ease"}}><div style={{width:52,height:52,borderRadius:"50%",background:t["--accentBg"],border:`1.5px solid ${t["--accentBrd"]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>💊</div><p style={{fontSize:13,fontWeight:600,color:t["--accentText"],fontFamily:t["--sans"]}}>Nenhum medicamento para estes sintomas</p><p style={{fontSize:11.5,color:t["--textMuted"],lineHeight:1.65,maxWidth:230,textAlign:"center",fontFamily:t["--sans"]}}>Os sintomas selecionados não possuem medicamentos convencionais cadastrados. Experimente a aba Fitoterápicos.</p></div>);}
export function ProgramEmpty({tipo,t}){
  const isFP=tipo==="fp";
  const bg =isFP?(t["--fpBg"]||t["--blueBg"]):(t["--susBg"]||t["--accentBg"]);
  const brd=isFP?(t["--fpBrd"]||t["--blue"]) :(t["--susBrd"]||t["--accentBrd"]);
  const clr=isFP?(t["--fpTxt"]||t["--blueTxt"]):(t["--susTxt"]||t["--accentText"]);
  const lbl=isFP?"Farmácia Popular":"Farmácia Básica SUS";
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"44px 20px",gap:12,animation:"pgFade .3s ease"}}>
      <div style={{width:52,height:52,borderRadius:"50%",background:bg,border:`1.5px solid ${brd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
        {isFP?"🏛️":"🏥"}
      </div>
      <p style={{fontSize:13,fontWeight:600,color:clr,fontFamily:t["--sans"]}}>Nenhum medicamento do {lbl} para estes sintomas</p>
      <p style={{fontSize:11.5,color:t["--textMuted"],lineHeight:1.65,maxWidth:260,textAlign:"center",fontFamily:t["--sans"]}}>
        Experimente selecionar outros sintomas ou veja as abas Medicamentos e Fitoterápicos.
      </p>
    </div>
  );
}

export function ThemeBtn({id,current,onChange,compact=false}){
  const th=THEMES[id];const active=current===id;const t=THEMES[current].vars;
  return(<button className="pg-theme" onClick={()=>onChange(id)} title={th.name} aria-label={th.name} style={{padding:compact?"6px 7px":"5px 10px",cursor:"pointer",fontFamily:t["--sans"],fontSize:11,fontWeight:active?700:400,background:active?t["--accentBg"]:"transparent",color:active?t["--accentText"]:t["--textMuted"],border:`1px solid ${active?t["--accentBrd"]:t["--border"]}`,borderRadius:t["--radiusSm"],transition:"all .17s",display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:11}}>{th.icon}</span>{!compact&&th.name}</button>);
}

/* ════════════════════════════════════════
   MAIN APP
════════════════════════════════════════ */




/* Dados reais — FE 10 RS CASCAVEL — Emissão 01/05/2026 (páginas 424-427) */
