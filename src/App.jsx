import { DrugDetailPanel } from "./components/DrugDetailPanel";
import { SesaView } from "./components/SesaView";
import { CatalogView, ChronicBanner, ConvEmpty, Empty, FitoEmpty, MedCard, ProgramEmpty, SesaTabEmpty, TabBar, ThemeBtn, VitEmpty } from "./components/cards";
import { Ctx } from "./theme";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ALL, CHRONIC_IDS, GROUPS } from "./data/groups";
import { THEMES } from "./theme";
import { getFlags } from "./utils";
import { MEDS } from "./data/meds";
import { useSesa } from "./data/sesaStore";
import { SesaAgeNotice } from "./components/SesaAgeNotice";
import { GlobalSearch } from "./components/GlobalSearch";
import { InteractionsView } from "./components/InteractionsView";
export default function FarmaciaONG(){
  const sesa=useSesa();
  const[theme,setTheme]=useState("light");
  const[mode,setMode]=useState("symptoms"); // symptoms | catalog | sesa | interacoes
  const[tab,setTab]=useState("conv");
  const[medStack,setMedStack]=useState([]);
  const openMedDetail =useCallback(med=>setMedStack(p=>[...p,med]),[]);
  const closeMedDetail=useCallback(()=>setMedStack([]),[]);
  const goBackDetail  =useCallback(()=>setMedStack(p=>p.slice(0,-1)),[]);
  const[sidebarOpen,setSidebarOpen]=useState(()=>typeof window!=="undefined"&&window.innerWidth>700);
  const[isMobile,setIsMobile]=useState(()=>typeof window!=="undefined"&&window.innerWidth<=700);
  useEffect(()=>{
    const onResize=()=>{
      const mob=window.innerWidth<=700;
      setIsMobile(mob);
      if(!mob) setSidebarOpen(true);
    };
    window.addEventListener("resize",onResize);
    return()=>window.removeEventListener("resize",onResize);
  },[]);
  const[sel,setSel]=useState(new Set());
  const[idade,setIdade]=useState("");
  const[grupo,setGrupo]=useState("");
  const[search,setSearch]=useState("");
  const[openG,setOpenG]=useState(new Set(GROUPS.map(g=>g.label)));
  const t=THEMES[theme].vars;
  const f=getFlags(grupo,idade);
  const isInd=theme==="industrial";

  const allRanked=useMemo(()=>{
    if(!sel.size) return[];
    return MEDS.map(m=>({m,score:m.syms.filter(s=>sel.has(s)).length})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
  },[sel]);
  const VIT_IDS=new Set(["vitd3","acido_folico","vitb12","complexo_b","calcio_vitd","magnesio","vite","biotina","vita","vitk","vitc","sulfato_fe","zinc"]);
  const convRanked=useMemo(()=>allRanked.filter(x=>!x.m.fito&&!VIT_IDS.has(x.m.id)),[allRanked]);
  const fitoRanked=useMemo(()=>allRanked.filter(x=>x.m.fito),[allRanked]);
  const vitRanked    =useMemo(()=>allRanked.filter(x=>VIT_IDS.has(x.m.id)),[allRanked]);
  const sesaTabRanked=useMemo(()=>{
    const meds=sesa?.medicamentos||[];
    return allRanked.filter(x=>{
      const words=x.m.pa.toLowerCase().replace(/[()]/g,"").split(" ").filter(w=>w.length>4);
      return words.some(w=>meds.some(s=>s.nome.toLowerCase().includes(w)));
    });
  },[allRanked,sesa]);
  const fpRanked  =useMemo(()=>allRanked.filter(x=>x.m.fp),  [allRanked]);
  const susRanked =useMemo(()=>allRanked.filter(x=>x.m.sus), [allRanked]);
  const ranked=tab==="todos"?allRanked:tab==="fito"?fitoRanked:tab==="vit"?vitRanked:tab==="sesa_tab"?sesaTabRanked:tab==="fp"?fpRanked:tab==="sus"?susRanked:convRanked;
  const maxScore=ranked.length?ranked[0].score:1;

  const toggle=useCallback(id=>{setSel(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});},[]);
  const filtered=useMemo(()=>{if(!search) return GROUPS;const q=search.toLowerCase();return GROUPS.map(g=>({...g,items:g.items.filter(i=>i.label.toLowerCase().includes(q))})).filter(g=>g.items.length);},[search]);
  const profile=f.isG?"Gestante":f.isL?"Lactante":f.isC?"Criança":f.isI?"Idoso":null;
  const inp={background:t["--surface2"],border:`1px solid ${t["--border"]}`,borderRadius:t["--radiusSm"],padding:"7px 10px",fontSize:12,color:t["--text"],outline:"none",width:"100%",fontFamily:t["--sans"]};

  return(
    <Ctx.Provider value={theme}>
      <div style={{display:"flex",flexDirection:"column",height:"100vh",background:t["--bg"],color:t["--text"],fontFamily:t["--sans"],overflow:"hidden"}}>

        {/* HEADER */}
        <div style={{background:t["--hdrBg"],borderBottom:`${isInd?"2px":"1px"} solid ${t["--hdrBrd"]}`,padding:"0 18px",height:52,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button
              className="pg-menu-btn"
              onClick={()=>setSidebarOpen(o=>!o)}
              title={sidebarOpen?"Fechar menu":"Abrir menu"}
              style={{background:sidebarOpen?t["--accentBg"]:t["--surface3"],
                color:sidebarOpen?t["--accentText"]:t["--textMuted"],
                border:`1px solid ${sidebarOpen?t["--accentBrd"]:t["--border"]}`,
                fontSize:16,borderRadius:isInd?"2px":"8px"}}>
              {sidebarOpen?"✕":"☰"}
            </button>
            <div style={{width:28,height:28,borderRadius:isInd?"2px":"7px",background:isInd?t["--accent"]:"linear-gradient(135deg,#059669,#0a7c52)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:14,color:"white",border:isInd?`2px solid ${t["--accentText"]}`:"none"}}>✚</div>
            {!isMobile&&<span style={{whiteSpace:"nowrap",fontWeight:700,fontSize:14.5,color:isInd?t["--bg"]:t["--text"],fontFamily:isInd?"'Georgia',serif":t["--sans"],letterSpacing:isInd?".05em":".01em",textTransform:isInd?"uppercase":"none"}}>Guia Farmácia</span>}
            {!isMobile&&<span style={{fontSize:9,padding:"3px 7px",borderRadius:isInd?"2px":"4px",background:t["--tagBg"],color:t["--tagTxt"],border:`1px solid ${t["--tagBrd"]}`,letterSpacing:".08em",fontWeight:700,textTransform:"uppercase",fontFamily:t["--sans"],display:isMobile?"none":"inline-block"}}>ONG · Dispensação</span>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:5}}>

            {/* ── status counter (desktop only) ── */}
            {!isMobile&&mode==="symptoms"&&sel.size>0&&(
              <span style={{fontSize:10,color:t["--textMuted"],marginRight:4,fontFamily:t["--sans"],
                display:"flex",alignItems:"center",gap:4}}>
                <span style={{color:t["--accentText"]}}>{sel.size} sint.</span>
                <span style={{color:t["--border2"]}}>·</span>
                <span style={{color:t["--blue"]}}>💊{convRanked.length}</span>
                <span style={{color:t["--border2"]}}>·</span>
                <span style={{color:t["--fito"]}}>🌿{fitoRanked.length}</span>
              </span>
            )}

            {/* ── MEDICAMENTOS + SESA quick-nav buttons ── */}
            <div style={{display:"flex",alignItems:"center",gap:4}}>
              {/* MEDICAMENTOS */}
              <button onClick={()=>setMode(m=>m==="catalog"?"symptoms":"catalog")}
                style={{display:"flex",alignItems:"center",gap:isMobile?0:5,
                  padding:isMobile?"7px":"6px 11px",
                  borderRadius:isInd?"2px":"8px",cursor:"pointer",
                  background:mode==="catalog"?t["--accentBg"]:t["--surface2"],
                  border:`1.5px solid ${mode==="catalog"?t["--accentBrd"]:t["--border"]}`,
                  color:mode==="catalog"?t["--accentText"]:t["--textMuted"],
                  fontFamily:t["--sans"],fontSize:11,fontWeight:mode==="catalog"?700:500,
                  transition:"all .17s",minWidth:isMobile?34:0}}>
                <span style={{fontSize:15}}>📋</span>
                {!isMobile&&<span>Medicamentos</span>}
              </button>

              {/* SESA */}
              <button onClick={()=>setMode(m=>m==="sesa"?"symptoms":"sesa")}
                style={{display:"flex",alignItems:"center",gap:isMobile?0:5,
                  padding:isMobile?"7px":"6px 11px",
                  borderRadius:isInd?"2px":"8px",cursor:"pointer",
                  background:mode==="sesa"?"rgba(3,105,161,.12)":t["--surface2"],
                  border:`1.5px solid ${mode==="sesa"?"rgba(3,105,161,.45)":t["--border"]}`,
                  color:mode==="sesa"?"#0369a1":t["--textMuted"],
                  fontFamily:t["--sans"],fontSize:11,fontWeight:mode==="sesa"?700:500,
                  transition:"all .17s",minWidth:isMobile?34:0}}>
                <span style={{fontSize:15}}>📦</span>
                {!isMobile&&<span>SESA</span>}
              </button>

              {/* INTERAÇÕES */}
              <button onClick={()=>setMode(m=>m==="interacoes"?"symptoms":"interacoes")}
                title="Verificador de interações"
                style={{display:"flex",alignItems:"center",gap:isMobile?0:5,
                  padding:isMobile?"7px":"6px 11px",
                  borderRadius:isInd?"2px":"8px",cursor:"pointer",
                  background:mode==="interacoes"?"rgba(217,119,6,.14)":t["--surface2"],
                  border:`1.5px solid ${mode==="interacoes"?"rgba(217,119,6,.5)":t["--border"]}`,
                  color:mode==="interacoes"?"#b45309":t["--textMuted"],
                  fontFamily:t["--sans"],fontSize:11,fontWeight:mode==="interacoes"?700:500,
                  transition:"all .17s",minWidth:isMobile?34:0}}>
                <span style={{fontSize:15}}>⚠️</span>
                {!isMobile&&<span>Interações</span>}
              </button>
            </div>

            {/* ── Separator ── */}
            <div style={{width:1,height:22,background:t["--border2"],margin:"0 3px",flexShrink:0}}/>

            {/* ── Theme buttons ── */}
            {Object.keys(THEMES).map(id=><ThemeBtn key={id} id={id} current={theme} onChange={setTheme} compact={isMobile}/>)}
          </div>
        </div>

        <GlobalSearch t={t} theme={theme} onSelectMed={openMedDetail}/>

        {/* BODY */}
        <div style={{display:"flex",flex:1,overflow:"hidden",position:"relative"}}>

          {/* BACKDROP mobile */}
          {isMobile&&sidebarOpen&&(
            <div className="pg-backdrop" onClick={()=>setSidebarOpen(false)}/>
          )}

          {/* LEFT PANEL */}
          <div
            className={sidebarOpen?"pg-sidebar":""}
            style={{
              width: sidebarOpen ? 284 : 0,
              flexShrink: 0,
              background: t["--surface"],
              borderRight: sidebarOpen ? `${isInd?"2px":"1px"} solid ${t["--border"]}` : "none",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              transition: "width .25s ease",
              // Mobile: drawer overlay
              ...(isMobile && sidebarOpen ? {
                position:"fixed",
                top:52,
                left:0,
                width:284,
                height:"calc(100vh - 52px)",
                zIndex:199,
                boxShadow:"4px 0 24px rgba(0,0,0,.18)",
              } : {}),
            }}>
            {/* patient */}
            <div style={{padding:"11px 13px",borderBottom:`1px solid ${t["--border"]}`,flexShrink:0}}>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:t["--textDim"],marginBottom:7,fontFamily:t["--sans"]}}>Perfil do Paciente</div>
              <div style={{display:"flex",gap:6}}>
                <input type="number" placeholder="Idade" value={idade} onChange={e=>setIdade(e.target.value)} style={{...inp,flex:1}}/>
                <select value={grupo} onChange={e=>setGrupo(e.target.value)} style={{...inp,flex:"1.8",color:grupo?t["--text"]:t["--textMuted"]}}>
                  <option value="">Grupo especial</option>
                  <option value="gestante">Gestante</option>
                  <option value="lactante">Lactante</option>
                  <option value="crianca">Criança (&lt;12 anos)</option>
                  <option value="idoso">Idoso (&gt;65 anos)</option>
                </select>
              </div>
              {profile&&<div style={{marginTop:6,fontSize:10,padding:"3px 8px",borderRadius:t["--radiusSm"],background:t["--warnBg"],border:`1px solid ${t["--warnBrd"]}`,color:t["--warnTxt"],fontFamily:t["--sans"]}}>⚠️ Perfil: <strong>{profile}</strong></div>}
            </div>
            {/* search */}
            {mode==="symptoms"&&<div style={{padding:"8px 13px",borderBottom:`1px solid ${t["--border"]}`,flexShrink:0}}><input type="text" placeholder="🔍  Buscar sintoma..." value={search} onChange={e=>setSearch(e.target.value)} style={inp}/></div>}
            {/* symptom groups */}
            {mode==="symptoms"&&(
              <div className="pg-sc" style={{flex:1,overflowY:"auto",padding:"5px 0"}}>
                {filtered.map(grp=>(
                  <div key={grp.label}>
                    <button className="pg-grp"
                      onClick={()=>setOpenG(p=>{const n=new Set(p);n.has(grp.label)?n.delete(grp.label):n.add(grp.label);return n;})}
                      style={{width:"100%",display:"flex",alignItems:"center",gap:6,padding:"6px 13px",background:grp.chronic?`${t["--chronicBg"]}40`:"transparent",border:"none",cursor:"pointer",textAlign:"left",fontFamily:t["--sans"],borderLeft:grp.chronic?`3px solid ${t["--chronicBrd"]}`:"3px solid transparent"}}>
                      <span style={{fontSize:11}}>{grp.icon}</span>
                      <span style={{fontSize:9.5,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",color:grp.chronic?t["--chronicText"]:t["--textDim"],flex:1}}>{grp.label}</span>
                      {grp.chronic&&<span style={{fontSize:8,padding:"1px 5px",borderRadius:t["--radiusSm"],background:t["--chronicBg"],color:t["--chronicText"],border:`1px solid ${t["--chronicBrd"]}`,fontWeight:700,letterSpacing:".05em"}}>CRÔNICO</span>}
                      <span style={{fontSize:10,color:t["--textDim"],display:"block",transform:openG.has(grp.label)?"rotate(180deg)":"none",transition:"transform .2s"}}>▾</span>
                    </button>
                    {openG.has(grp.label)&&(
                      <div style={{padding:"1px 9px 6px"}}>
                        {grp.items.map(item=>{
                          const on=sel.has(item.id);
                          const isChr=CHRONIC_IDS.has(item.id);
                          const isVit=grp.vitaminas||false;
                          return(
                            <button key={item.id} className="pg-sym" onClick={()=>toggle(item.id)}
                              style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",textAlign:"left",padding:"6px 10px",marginBottom:2,borderRadius:t["--radiusSm"],
                                border:on?(isChr?`1px solid ${t["--chronicBrd"]}`:`1px solid ${t["--accentBrd"]}`):`1px solid ${t["--border"]}`,
                                background:on?(isChr?t["--chronicBg"]:t["--accentBg"]):t["--surface2"],
                                color:on?(isChr?t["--chronicText"]:t["--accentText"]):t["--textMuted"],
                                fontSize:12,fontWeight:on?600:400,cursor:"pointer",transition:"all .14s",fontFamily:t["--sans"]}}>
                              {item.label}
                              {on&&<span style={{fontSize:10,color:isChr?t["--chronic"]:isVit?"#d97706":t["--accent"],flexShrink:0}}>✓</span>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {mode==="catalog"&&<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",flexDirection:"column",gap:10}}><span style={{fontSize:28}}>📋</span><p style={{fontSize:11.5,color:t["--textMuted"],textAlign:"center",lineHeight:1.7,fontFamily:t["--sans"]}}>Catálogo completo ativo.<br/><span style={{fontSize:10.5,color:t["--textDim"]}}>Volte ao modo de sintomas para filtrar por condição.</span></p></div>}
            {/* clear */}
            {mode==="symptoms"&&sel.size>0&&<div style={{padding:"9px 13px",borderTop:`1px solid ${t["--border"]}`,flexShrink:0}}><button className="pg-clr" onClick={()=>{setSel(new Set());setTab("conv");}} style={{width:"100%",padding:"7px",borderRadius:t["--radiusSm"],background:t["--dangerBg"],border:`1px solid ${t["--dangerBrd"]}`,color:t["--dangerTxt"],fontSize:11.5,fontWeight:600,cursor:"pointer",fontFamily:t["--sans"]}}>✕ Limpar seleção ({sel.size})</button></div>}
            {/* ── Hint: nav buttons moved to header ── */}
            <div style={{padding:"8px 13px",borderTop:`1px solid ${t["--border"]}`,flexShrink:0,
              display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontSize:9.5,color:t["--textDim"],fontFamily:t["--sans"],flex:1,lineHeight:1.5}}>
                📋 Medicamentos e 📦 SESA disponíveis no topo ↑
              </span>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="pg-sc" onClick={()=>{if(isMobile&&sidebarOpen)setSidebarOpen(false);}} style={{flex:1,overflowY:"auto",padding:"18px 20px"}}>
            {/* ── Back button for catalog / SESA ── */}
            {(mode==="catalog"||mode==="sesa"||mode==="interacoes")&&(
              <button onClick={()=>setMode("symptoms")}
                style={{display:"inline-flex",alignItems:"center",gap:7,
                  padding:"7px 14px",marginBottom:16,cursor:"pointer",
                  background:t["--surface2"],border:`1px solid ${t["--border"]}`,
                  borderRadius:t["--radiusSm"],fontFamily:t["--sans"],fontSize:12,
                  color:t["--textMuted"],fontWeight:600,transition:"all .17s"}}
                onMouseEnter={e=>e.currentTarget.style.background=t["--surface3"]}
                onMouseLeave={e=>e.currentTarget.style.background=t["--surface2"]}>
                ← Voltar para Sintomas
              </button>
            )}
            {mode==="interacoes"?<InteractionsView t={t} theme={theme} onSelectMed={openMedDetail}/>:mode==="sesa"?<SesaView f={f} t={t} theme={theme} onSelectMed={openMedDetail}/>:mode==="catalog"?<CatalogView f={f} t={t} theme={theme} onSelectMed={openMedDetail}/>
            :!sel.size?<Empty t={t}/>
            :(
              <>
                <TabBar tab={tab} setTab={setTab} todosCount={allRanked.length} convCount={convRanked.length} fitoCount={fitoRanked.length} vitCount={vitRanked.length} sesaTabCount={sesaTabRanked.length} fpCount={fpRanked.length} susCount={susRanked.length} t={t} theme={theme}/>
                <ChronicBanner sel={sel} t={t}/>
                {tab==="todos"&&(
                  <div style={{marginBottom:14,padding:"12px 15px",borderRadius:t["--radius"],background:t["--surface3"],border:`1.5px solid ${t["--border2"]}`,display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:20}}>◉</span>
                    <div>
                      <div style={{fontWeight:700,fontSize:12.5,color:t["--text"],fontFamily:t["--sans"],marginBottom:2}}>Todos os Resultados</div>
                      <div style={{fontSize:11,color:t["--textMuted"],lineHeight:1.65,fontFamily:t["--sans"]}}>
                        Exibindo medicamentos convencionais, fitoterápicos, vitaminas e suplementos correspondentes aos sintomas selecionados. Use as abas específicas para filtrar por categoria.
                      </div>
                    </div>
                  </div>
                )}
                {tab==="vit"&&(
                  <div style={{marginBottom:14,padding:"12px 15px",borderRadius:t["--radius"],background:"#fef3c7",border:"1.5px solid #fcd34d",display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:20}}>💛</span>
                    <div>
                      <div style={{fontWeight:700,fontSize:12.5,color:"#92400e",fontFamily:t["--sans"],marginBottom:2}}>Vitaminas & Suplementos</div>
                      <div style={{fontSize:11,color:"#b45309",lineHeight:1.65,fontFamily:t["--sans"]}}>
                        Vitaminas e suplementos indicados para os sintomas selecionados. Consulte um profissional de saúde para indicação de dosagem e necessidade de exames prévios.
                      </div>
                    </div>
                  </div>
                )}
                {tab==="fito"&&(
                  <div style={{marginBottom:14,padding:"12px 15px",borderRadius:t["--radius"],background:t["--fitoBg"],border:`1.5px solid ${t["--fitoBrd"]}`,display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:20}}>🌿</span>
                    <div><div style={{fontWeight:700,fontSize:12.5,color:t["--fitoText"],fontFamily:t["--sans"],marginBottom:2}}>Fitoterápicos</div>
                    <div style={{fontSize:11,color:t["--fito"],lineHeight:1.65,fontFamily:t["--sans"]}}>Medicamentos de origem vegetal. Cada card mostra nome científico e mecanismo de ação. <strong>Confirme contraindicações antes da dispensação.</strong></div></div>
                  </div>
                )}
                {tab==="conv"&&(
                  <div style={{marginBottom:14,padding:"12px 15px",borderRadius:t["--radius"],background:t["--accentBg"],border:`1.5px solid ${t["--accentBrd"]}`,display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:20}}>💊</span>
                    <div><div style={{fontWeight:700,fontSize:12.5,color:t["--accentText"],fontFamily:t["--sans"],marginBottom:2}}>Medicamentos Convencionais</div>
                    <div style={{fontSize:11,color:t["--accent"],lineHeight:1.65,fontFamily:t["--sans"]}}>Medicamentos alopáticos correspondentes aos sintomas. <strong>Verifique alergias, interações e perfil do paciente.</strong></div></div>
                  </div>
                )}
                {tab==="sesa_tab"&&(
                  <div style={{marginBottom:14,padding:"12px 15px",borderRadius:t["--radius"],
                    background:"rgba(3,105,161,.07)",border:"1.5px solid rgba(3,105,161,.3)",
                    display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:20}}>📦</span>
                    <div>
                      <div style={{fontWeight:700,fontSize:12.5,color:"#0c4a6e",fontFamily:t["--sans"],marginBottom:2}}>
                        Medicamentos CEAF / SESA-PR
                      </div>
                      <div style={{fontSize:11,color:"#0369a1",lineHeight:1.65,fontFamily:t["--sans"],marginBottom:4}}>
                        Medicamentos do banco de dados que possuem correspondência na lista da <strong>FE 10 RS CASCAVEL</strong>.
                        Clique em qualquer card para ver o estoque disponível.
                      </div>
                      <SesaAgeNotice data={sesa.data_relatorio} t={t} compact/>
                    </div>
                  </div>
                )}
                {tab==="fp"&&(
                  <div style={{marginBottom:14,padding:"12px 15px",borderRadius:t["--radius"],background:t["--fpBg"]||t["--blueBg"],border:`1.5px solid ${t["--fpBrd"]||t["--blue"]}`,display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:20}}>🏛️</span>
                    <div>
                      <div style={{fontWeight:700,fontSize:12.5,color:t["--fpTxt"]||t["--blueTxt"],fontFamily:t["--sans"],marginBottom:2}}>Farmácia Popular — 100% Gratuito</div>
                      <div style={{fontSize:11,color:t["--fp"]||t["--blue"],lineHeight:1.65,fontFamily:t["--sans"],marginBottom:4}}>
                        Medicamentos disponíveis <strong>gratuitamente</strong> nas farmácias credenciadas "Aqui Tem Farmácia Popular". Apresente receita válida (SUS ou particular) + documento com foto e CPF.
                      </div>
                      <div style={{fontSize:10.5,color:t["--fpTxt"]||t["--blueTxt"],fontFamily:t["--sans"],padding:"6px 10px",background:"rgba(0,0,0,.04)",borderRadius:t["--radiusSm"]}}>
                        📍 <strong>Cascavel-PR:</strong> consulte farmácias credenciadas em <strong>consultafp.saude.gov.br</strong> ou ligue <strong>136</strong>
                      </div>
                    </div>
                  </div>
                )}
                {tab==="sus"&&(
                  <div style={{marginBottom:14,padding:"12px 15px",borderRadius:t["--radius"],background:t["--susBg"]||t["--accentBg"],border:`1.5px solid ${t["--susBrd"]||t["--accentBrd"]}`,display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:20}}>🏥</span>
                    <div>
                      <div style={{fontWeight:700,fontSize:12.5,color:t["--susTxt"]||t["--accentText"],fontFamily:t["--sans"],marginBottom:2}}>Farmácia Básica SUS — CBAF/RENAME</div>
                      <div style={{fontSize:11,color:t["--sus"]||t["--accent"],lineHeight:1.65,fontFamily:t["--sans"],marginBottom:4}}>
                        Medicamentos do Componente Básico da Assistência Farmacêutica, <strong>gratuitos nas UBS</strong> (Unidades Básicas de Saúde). Apresente receita médica + CPF + Cartão SUS.
                      </div>
                      <div style={{fontSize:10.5,color:t["--susTxt"]||t["--accentText"],fontFamily:t["--sans"],padding:"6px 10px",background:"rgba(0,0,0,.04)",borderRadius:t["--radiusSm"]}}>
                        📍 <strong>Cascavel-PR — Farmácia Básica:</strong> Av. Tancredo Neves, 1453 · WhatsApp: <strong>(45) 3321-5529</strong>
                      </div>
                    </div>
                  </div>
                )}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:11,flexWrap:"wrap",gap:8}}>
                  <div><h2 style={{fontSize:15,fontWeight:700,marginBottom:2,fontFamily:t["--sans"],color:t["--text"],letterSpacing:isInd?".04em":"normal",textTransform:isInd?"uppercase":"none"}}>{tab==="todos"?"◉ Todos os Resultados":tab==="fito"?"🌿 Fitoterápicos":tab==="vit"?"💛 Vitaminas e Suplementos":tab==="sesa_tab"?"📦 SESA-PR / CEAF":tab==="fp"?"🏛️ Farmácia Popular":tab==="sus"?"🏥 Farmácia Básica SUS":"💊 Medicamentos Sugeridos"}</h2><p style={{fontSize:10.5,color:t["--textMuted"],fontFamily:t["--sans"]}}>Ordenados por relevância · Clique no card para expandir</p></div>
                  <span style={{fontSize:10,padding:"3px 10px",borderRadius:20,background:tab==="fito"?t["--fitoBg"]:t["--tagBg"],color:tab==="fito"?t["--fitoText"]:t["--tagTxt"],border:`1px solid ${tab==="fito"?t["--fitoBrd"]:t["--tagBrd"]}`,fontFamily:t["--mono"],flexShrink:0}}>{ranked.length} resultado{ranked.length!==1?"s":""}</span>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
                  {[...sel].map(s=>{const label=ALL.find(i=>i.id===s)?.label||s;const isChr=CHRONIC_IDS.has(s);return(<span key={s} className="pg-pill" onClick={()=>toggle(s)} style={{fontSize:10.5,padding:"3px 10px",borderRadius:isInd?"2px":"20px",background:isChr?t["--chronicBg"]:t["--accentBg"],color:isChr?t["--chronicText"]:t["--accentText"],border:`1px solid ${isChr?t["--chronicBrd"]:t["--accentBrd"]}`,cursor:"pointer",transition:"opacity .15s",fontFamily:t["--sans"]}} title="Clique para remover">{label} ×</span>);})}
                </div>
                {ranked.length===0?(tab==="fito"?<FitoEmpty t={t}/>:tab==="vit"?<VitEmpty t={t}/>:tab==="sesa_tab"?<SesaTabEmpty t={t}/>:tab==="fp"?<ProgramEmpty tipo="fp" t={t}/>:tab==="sus"?<ProgramEmpty tipo="sus" t={t}/>:<ConvEmpty t={t}/>):(
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:9}}>
                    {ranked.map(({m,score})=><MedCard key={m.id} m={m} score={score} max={maxScore} f={f} sel={sel} onSelectMed={openMedDetail}/>)}
                  </div>
                )}
                <div style={{marginTop:18,padding:"10px 13px",borderRadius:t["--radiusSm"],background:t["--dangerBg"],border:`1px solid ${t["--dangerBrd"]}`,fontSize:11,color:t["--dangerTxt"],lineHeight:1.7,fontFamily:t["--sans"]}}>
                  <strong>⚕️ Aviso:</strong> Guia auxiliar para agentes de saúde da ONG. Não substitui avaliação médica. Fitoterápicos possuem contraindicações e interações. Condições crônicas requerem tratamento médico adequado.
                </div>
                <div style={{height:20}}/>
              </>
            )}
          </div>
        </div>
      </div>
        {/* DRUG DETAIL PANEL */}
        {medStack.length>0&&(
          <DrugDetailPanel
            stack={medStack}
            onClose={closeMedDetail}
            onBack={goBackDetail}
            onOpen={openMedDetail}
            f={f}
          />
        )}
    </Ctx.Provider>
  );
}
