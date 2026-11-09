import { createContext } from "react";
export const THEMES = {
  light:{name:"Claro",icon:"○",vars:{
    "--bg":"#f0f4f9","--surface":"#ffffff","--surface2":"#f5f8fc","--surface3":"#eaeff6",
    "--border":"#dde6f0","--border2":"#c4d2e4",
    "--text":"#1a2535","--textMuted":"#627080","--textDim":"#9aaabb",
    "--accent":"#0a7c52","--accentBg":"#edfaf4","--accentBrd":"#9fe8c8","--accentText":"#065f3c",
    "--blue":"#1d4ed8","--blueBg":"#eff6ff","--blueTxt":"#1e40af",
    "--warn":"#b45309","--warnBg":"#fffbeb","--warnBrd":"#fcd34d","--warnTxt":"#92400e",
    "--danger":"#b91c1c","--dangerBg":"#fef2f2","--dangerBrd":"#fca5a5","--dangerTxt":"#991b1b",
    "--fito":"#15803d","--fitoBg":"#f0fdf4","--fitoBrd":"#86efac","--fitoText":"#14532d",
    "--chronic":"#7c3aed","--chronicBg":"#faf5ff","--chronicBrd":"#c4b5fd","--chronicText":"#4c1d95",
    "--mono":"'JetBrains Mono',monospace","--sans":"'Sora',sans-serif",
    "--radius":"13px","--radiusSm":"8px",
    "--hdrBg":"#ffffff","--hdrBrd":"#e2eaf4",
    "--tagBg":"#edfaf4","--tagTxt":"#065f3c","--tagBrd":"#9fe8c8","--doseBg":"#f1f5fb","--fp":"#1d4ed8","--fpBg":"#eff6ff","--fpBrd":"#bfdbfe","--fpTxt":"#1e3a8a","--sus":"#047857","--susBg":"#ecfdf5","--susBrd":"#6ee7b7","--susTxt":"#065f3c",
  }},
  dark:{name:"Escuro",icon:"◐",vars:{
    "--bg":"#07090d","--surface":"#0c1018","--surface2":"#101520","--surface3":"#141b25",
    "--border":"#1a2535","--border2":"#243040",
    "--text":"#d8e2ee","--textMuted":"#4a6070","--textDim":"#2e3e50",
    "--accent":"#059669","--accentBg":"#042912","--accentBrd":"#065f46","--accentText":"#34d399",
    "--blue":"#3b82f6","--blueBg":"#0a1628","--blueTxt":"#60a5fa",
    "--warn":"#d97706","--warnBg":"rgba(245,158,11,.08)","--warnBrd":"rgba(245,158,11,.22)","--warnTxt":"#fbbf24",
    "--danger":"#dc2626","--dangerBg":"rgba(239,68,68,.08)","--dangerBrd":"rgba(239,68,68,.22)","--dangerTxt":"#f87171",
    "--fito":"#16a34a","--fitoBg":"#052e16","--fitoBrd":"#166534","--fitoText":"#4ade80",
    "--chronic":"#a78bfa","--chronicBg":"#1a0a2e","--chronicBrd":"#6d28d9","--chronicText":"#c4b5fd",
    "--mono":"'JetBrains Mono',monospace","--sans":"'Sora',sans-serif",
    "--radius":"13px","--radiusSm":"8px",
    "--hdrBg":"#0a0e16","--hdrBrd":"#141e2e",
    "--tagBg":"#0a1f1a","--tagTxt":"#34d399","--tagBrd":"#064e3b","--doseBg":"#060a0e","--fp":"#60a5fa","--fpBg":"#0a1628","--fpBrd":"#1e40af","--fpTxt":"#93c5fd","--sus":"#34d399","--susBg":"#052e16","--susBrd":"#065f46","--susTxt":"#6ee7b7",
  }},
  industrial:{name:"Industrial",icon:"◧",vars:{
    "--bg":"#e9e4da","--surface":"#f0ebe1","--surface2":"#e4dfd5","--surface3":"#dbd5ca",
    "--border":"#b5a990","--border2":"#8a7d68",
    "--text":"#1a1612","--textMuted":"#5a5045","--textDim":"#8a7d68",
    "--accent":"#9a3a0a","--accentBg":"#fdf0e6","--accentBrd":"#d4824a","--accentText":"#7c2d0a",
    "--blue":"#1e4d8c","--blueBg":"#e8f0fb","--blueTxt":"#153670",
    "--warn":"#92400e","--warnBg":"#fdf0e2","--warnBrd":"#d4a27a","--warnTxt":"#7c2d0a",
    "--danger":"#991b1b","--dangerBg":"#fdf0f0","--dangerBrd":"#d4a0a0","--dangerTxt":"#7c1a1a",
    "--fito":"#3d6b1a","--fitoBg":"#f0f5e8","--fitoBrd":"#9ab870","--fitoText":"#2a4a10",
    "--chronic":"#5b21b6","--chronicBg":"#f3f0fa","--chronicBrd":"#a78bfa","--chronicText":"#3b0764",
    "--mono":"'Courier New',monospace","--sans":"'Georgia',serif",
    "--radius":"4px","--radiusSm":"2px",
    "--hdrBg":"#1a1612","--hdrBrd":"#3a3028",
    "--tagBg":"#fdf0e6","--tagTxt":"#7c2d0a","--tagBrd":"#d4824a","--doseBg":"#dbd5ca","--fp":"#1e3a8a","--fpBg":"#e8f0fb","--fpBrd":"#93c5fd","--fpTxt":"#1e3a8a","--sus":"#14532d","--susBg":"#f0f5e8","--susBrd":"#86efac","--susTxt":"#14532d",
  }},
};

if(!document.getElementById("pg-sty")){
  const s=document.createElement("style");s.id="pg-sty";
  s.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');
    @keyframes pgSlide{from{opacity:0;transform:translateY(7px) scale(.988)}to{opacity:1;transform:none}}
    @keyframes pgFade{from{opacity:0}to{opacity:1}}
    .pg-med{animation:pgSlide .22s ease both}
    .pg-med:nth-child(1){animation-delay:.00s}.pg-med:nth-child(2){animation-delay:.03s}
    .pg-med:nth-child(3){animation-delay:.06s}.pg-med:nth-child(4){animation-delay:.09s}
    .pg-med:nth-child(5){animation-delay:.12s}.pg-med:nth-child(6){animation-delay:.15s}
    .pg-med:nth-child(7){animation-delay:.18s}.pg-med:nth-child(8){animation-delay:.21s}
    .pg-med:nth-child(9){animation-delay:.24s}.pg-med:nth-child(10){animation-delay:.27s}
    .pg-med:nth-child(11){animation-delay:.30s}.pg-med:nth-child(12){animation-delay:.33s}
    .pg-sc::-webkit-scrollbar{width:4px}
    .pg-sc::-webkit-scrollbar-thumb{background:var(--border,#dde6f0);border-radius:2px}
    .pg-grp:hover{background:var(--surface3)!important}
    .pg-sym:hover{background:var(--surface3)!important;border-color:var(--border2)!important}
    .pg-pill:hover{opacity:.65!important}
    .pg-clr:hover{filter:brightness(.88)}
    .pg-theme:hover{background:var(--surface3)!important}
    .pg-nav:hover{filter:brightness(.93)}
    @keyframes sidebarSlide{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:none}}
    @keyframes pgPanelIn{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:none}}
    .pg-nav:focus{outline:none}
    .pg-sidebar{animation:sidebarSlide .22s ease}
    .pg-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:198;animation:pgFade .2s ease}
    .pg-menu-btn{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;border:none;cursor:pointer;transition:background .18s;flex-shrink:0}
    .pg-menu-btn:hover{filter:brightness(.88)}
    .fp-badge{display:inline-flex;align-items:center;gap:3px;font-size:9px!important;padding:2px 6px;border-radius:4px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;flex-shrink:0}
  `;
  document.head.appendChild(s);
}

export const Ctx=createContext("light");

/* ═══════════════════════════════════════════════
   MEDICATION DATABASE
   fito:true = fitoterápico
   chronic:true = indicado para condições crônicas
═══════════════════════════════════════════════ */
