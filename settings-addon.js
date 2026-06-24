/* ============================================================================
   ACMR Command centre — Account menu + Settings add-on (self-contained)
   ----------------------------------------------------------------------------
   Drop-in: add ONE line just before </body> in command-centre.html, AFTER the
   main <script> that defines ICONS / icon() / brand / showToast / setTheme:

       <script src="settings-addon.js"></script>

   What it adds, without touching any of your existing code:
     - Click the profile pill  -> account menu (Account, Billing, Help, Sign out) + a gear.
     - Click the gear          -> blurs the page and opens a condensed settings modal.
     - Pick a category         -> the list swaps for that category's options (smart-TV
                                  style), header turns into a back arrow + title.
   Categories: General, Permissions, Employees, Notifications, Integrations, Billing.
   Reuses your globals (ICONS, icon, GOOGLE, brand, initials, showToast, setTheme)
   and your CSS tokens, so it matches the theme and flips with light/dark for free.
   ============================================================================ */
(function(){
  if (window.__acctSettings) return; window.__acctSettings = true;
  if (typeof ICONS === "undefined" || typeof icon !== "function") {
    console.warn("[settings-addon] load this AFTER the main command-centre script."); return;
  }

  /* extra glyphs merged into the shared ICONS map */
  Object.assign(ICONS, {
    gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    plug:'<path d="M12 22v-5"/><path d="M9 7V2"/><path d="M15 7V2"/><path d="M6 13V8h12v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z"/>',
    logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    chevleft:'<path d="m15 18-6-6 6-6"/>',
    user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    userplus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/>',
    card:'<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
    help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    xmark:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
  });
  const xIcon = ICONS.x ? "x" : "xmark";
  const safeBrand = (typeof brand !== "undefined") ? brand : { owner:"Account", company:"Company" };
  const ini = (typeof initials === "function") ? initials : (n => (n||"?").slice(0,2).toUpperCase());
  const toast = (typeof showToast === "function") ? showToast : (m => console.log(m));
  const setT = (typeof setTheme === "function") ? setTheme : (()=>{});

  /* styles */
  const st = document.createElement("style");
  st.textContent = `
  :root{--gx-ease:cubic-bezier(.22,1,.36,1);--gx-spring:cubic-bezier(.34,1.45,.6,1);--gx-smooth:cubic-bezier(.4,0,.2,1);--gx-panel:rgba(255,253,250,.72);--gx-ctrl:rgba(255,255,255,.5);--gx-hover:rgba(255,255,255,.46)}
  [data-theme="dark"]{--gx-panel:rgba(28,28,25,.74);--gx-ctrl:rgba(255,255,255,.07);--gx-hover:rgba(255,255,255,.06)}
  /* account card = liquid glass, springy morph from the corner, staggered items */
  #acctMenu{position:fixed;left:14px;bottom:78px;z-index:100;width:256px;padding:6px;display:flex;flex-direction:column;gap:2px;background:transparent;isolation:isolate;border-radius:18px;opacity:0;visibility:hidden;transform:translateY(10px) scale(.96);transform-origin:left bottom;transition:opacity .26s var(--gx-ease),transform .38s var(--gx-spring),visibility 0s linear .42s;will-change:opacity,transform}
  #acctMenu.open{opacity:1;visibility:visible;transform:none;transition:opacity .26s var(--gx-ease),transform .42s var(--gx-spring),visibility 0s}
  #acctMenu::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background-color:var(--gx-panel);-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) url(#liquid-glass) saturate(180%);box-shadow:var(--glass-stack,0 10px 30px rgba(0,0,0,.15))}
  #acctMenu>*{opacity:0;transform:translateY(7px);transition:opacity .32s var(--gx-ease),transform .4s var(--gx-ease)}
  #acctMenu.open>*{opacity:1;transform:none}
  #acctMenu.open>*:nth-child(1){transition-delay:.03s}#acctMenu.open>*:nth-child(2){transition-delay:.05s}#acctMenu.open>*:nth-child(3){transition-delay:.07s}#acctMenu.open>*:nth-child(4){transition-delay:.09s}#acctMenu.open>*:nth-child(5){transition-delay:.11s}#acctMenu.open>*:nth-child(6){transition-delay:.13s}#acctMenu.open>*:nth-child(7){transition-delay:.15s}
  .acct-head{display:flex;align-items:center;gap:10px;padding:8px}
  .acct-head .avatar{width:36px;height:36px}
  .acct-who{flex:1;min-width:0}
  .acct-who b{display:block;font-size:13px;font-weight:600;color:var(--ink)}
  .acct-who span{display:block;font-size:11.5px;color:var(--ink-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .acct-gear{position:relative;isolation:isolate;width:32px;height:32px;flex:none;border-radius:99px;display:grid;place-items:center;color:var(--ink-3);background:none;border:0;cursor:pointer;transition:color .25s var(--gx-smooth),transform .55s var(--gx-spring)}
  .acct-gear::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;opacity:0;background-color:var(--gx-hover);box-shadow:var(--glass-stack,none);-webkit-backdrop-filter:blur(6px) saturate(150%);backdrop-filter:blur(6px) saturate(150%);transition:opacity .28s var(--gx-smooth)}
  .acct-gear:hover{color:var(--ink);transform:rotate(60deg)}
  .acct-gear:hover::before{opacity:1}
  .acct-sep{height:1px;background:var(--hairline);margin:4px 8px}
  .acct-item{position:relative;isolation:isolate;display:flex;align-items:center;gap:11px;width:100%;text-align:left;padding:10px;border-radius:11px;font-size:13px;color:var(--ink);background:none;border:0;cursor:pointer}
  .acct-item .ic{color:var(--ink-3);transition:color .2s var(--gx-smooth)}
  .acct-item::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;opacity:0;background-color:var(--gx-hover);box-shadow:var(--glass-stack,none);-webkit-backdrop-filter:blur(7px) saturate(160%);backdrop-filter:blur(7px) url(#liquid-glass) saturate(160%);transition:opacity .28s var(--gx-smooth)}
  .acct-item:hover::before{opacity:1}
  .acct-item:hover .ic{color:var(--ink-2)}
  .acct-item.danger{color:#b1573f}.acct-item.danger .ic{color:#b1573f}

  #stxBack{position:fixed;inset:0;z-index:115;opacity:0;visibility:hidden;pointer-events:none;background:rgba(20,19,15,0.16);-webkit-backdrop-filter:blur(10px) saturate(120%);backdrop-filter:blur(10px) saturate(120%);transition:opacity .34s var(--gx-ease),visibility 0s linear .34s}
  [data-theme="dark"] #stxBack{background:rgba(0,0,0,0.42)}
  #stxBack.open{opacity:1;visibility:visible;pointer-events:auto;transition:opacity .34s var(--gx-ease),visibility 0s}
  /* anchored bottom-left, same corner as the account card: liquid glass that grows OUT of that card */
  #stxPanel{position:fixed;left:14px;bottom:14px;width:372px;max-width:calc(100vw - 28px);max-height:min(80vh,680px);display:flex;flex-direction:column;overflow:hidden;background:transparent;isolation:isolate;border-radius:22px;box-shadow:0 30px 80px -28px rgba(20,19,15,0.5);transform-origin:left bottom;opacity:0;transform:translateY(18px) scale(.9);transition:opacity .44s var(--gx-ease),transform .54s var(--gx-spring);will-change:opacity,transform}
  #stxBack.open #stxPanel{opacity:1;transform:none}
  #stxPanel::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background-color:var(--gx-panel);-webkit-backdrop-filter:blur(24px) saturate(185%);backdrop-filter:blur(24px) url(#liquid-glass) saturate(185%);box-shadow:var(--glass-stack,none)}
  .stx-head{display:flex;align-items:center;gap:8px;padding:12px}
  .stx-head h3{flex:1;margin:0;font-size:15px;font-weight:600;letter-spacing:-.01em;text-align:left}
  .stx-iconbtn{position:relative;isolation:isolate;width:32px;height:32px;flex:none;border-radius:99px;display:grid;place-items:center;color:var(--ink-2);background:none;border:0;cursor:pointer;transition:color .25s var(--gx-smooth),transform .4s var(--gx-spring)}
  .stx-iconbtn::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;opacity:0;background-color:var(--gx-hover);box-shadow:var(--glass-stack,none);-webkit-backdrop-filter:blur(6px) saturate(150%);backdrop-filter:blur(6px) saturate(150%);transition:opacity .26s var(--gx-smooth)}
  .stx-iconbtn:hover{color:var(--ink)}
  .stx-iconbtn:hover::before{opacity:1}
  .stx-iconbtn:active{transform:scale(.9)}
  #stxBackBtn{display:none}
  #stxPanel.detail #stxBackBtn{display:grid}
  .stx-body{overflow-y:auto;padding:10px}
  .stx-cat{position:relative;isolation:isolate;display:flex;align-items:center;gap:13px;width:100%;text-align:left;padding:13px 12px;border-radius:14px;color:var(--ink);background:none;border:0;cursor:pointer;transition:transform .3s var(--gx-smooth)}
  .stx-cat::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;opacity:0;background-color:var(--gx-hover);box-shadow:var(--glass-stack,none);-webkit-backdrop-filter:blur(8px) saturate(160%);backdrop-filter:blur(8px) url(#liquid-glass) saturate(160%);transition:opacity .3s var(--gx-smooth)}
  .stx-cat:hover::before{opacity:1}
  .stx-cat:hover{transform:translateX(2px)}
  .stx-cat .chev{transition:transform .4s var(--gx-spring)}
  .stx-cat:hover .chev{transform:translateX(3px)}
  .stx-cat-ic{width:36px;height:36px;flex:none;border-radius:10px;display:grid;place-items:center;color:var(--accent);background:var(--accent-soft)}
  .stx-cat-main{flex:1;min-width:0}.stx-cat-main b{display:block;font-size:13.5px;font-weight:600}.stx-cat-main span{font-size:12px;color:var(--ink-3)}
  .stx-cat .chev{color:var(--ink-3)}
  .stx-section{padding:8px 6px 6px;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
  .stx-group{position:relative;isolation:isolate;border-radius:14px;overflow:hidden;margin-bottom:10px}
  .stx-group::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background-color:var(--gx-ctrl);box-shadow:var(--glass-stack,none);-webkit-backdrop-filter:blur(12px) saturate(150%);backdrop-filter:blur(12px) saturate(150%)}
  .stx-row{display:flex;align-items:center;gap:12px;padding:13px 14px}
  .stx-group .stx-row + .stx-row{border-top:1px solid var(--hairline)}
  .stx-row-main{flex:1;min-width:0}.stx-row-main b{display:block;font-size:13.5px;font-weight:550}.stx-row-main span{display:block;font-size:12px;color:var(--ink-3)}
  .stx-switch{position:relative;isolation:isolate;width:46px;height:27px;flex:none;border-radius:99px;background:transparent;cursor:pointer}
  .stx-switch::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background-color:var(--gx-ctrl);-webkit-backdrop-filter:blur(6px) saturate(150%);backdrop-filter:blur(6px) saturate(150%);box-shadow:inset 0 1px 1px rgba(255,255,255,.55),inset 0 -1px 2px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.07);transition:background-color .4s var(--gx-ease),box-shadow .4s var(--gx-ease)}
  .stx-switch.on::before{background-color:color-mix(in srgb,var(--accent) 85%,transparent);box-shadow:inset 0 1px 1px rgba(255,255,255,.35),0 1px 7px color-mix(in srgb,var(--accent) 45%,transparent)}
  .stx-switch::after{content:"";position:absolute;top:3px;left:3px;width:21px;height:21px;border-radius:99px;background:linear-gradient(180deg,#fff,#efeee9);box-shadow:0 1px 2px rgba(0,0,0,.3),0 2px 6px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .44s var(--gx-spring)}
  .stx-switch.on::after{transform:translateX(19px)}
  [data-theme="dark"] .stx-switch::after{background:linear-gradient(180deg,#f4f2ec,#d7d5cd)}
  .stx-seg{position:relative;isolation:isolate;display:inline-flex;border-radius:11px;padding:3px;gap:2px;background:transparent}
  .stx-seg::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background-color:var(--gx-ctrl);-webkit-backdrop-filter:blur(8px) saturate(150%);backdrop-filter:blur(8px) url(#liquid-glass) saturate(150%);box-shadow:var(--glass-stack,none)}
  .stx-seg button{position:relative;isolation:isolate;padding:6px 12px;border-radius:8px;font-size:12.5px;color:var(--ink-2);background:transparent;border:0;cursor:pointer;transition:color .3s var(--gx-ease)}
  .stx-seg button::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;opacity:0;background-color:var(--surface);box-shadow:var(--shadow-sm);transition:opacity .3s var(--gx-ease)}
  .stx-seg button.on{color:var(--ink)}
  .stx-seg button.on::before{opacity:1}
  .stx-people{display:flex;flex-direction:column}
  .stx-person{display:flex;align-items:center;gap:12px;padding:11px 14px}
  .stx-group .stx-person + .stx-person{border-top:1px solid var(--hairline)}
  .stx-person .avatar{width:34px;height:34px}
  .stx-person .who{flex:1;min-width:0}.stx-person .who b{display:block;font-size:13.5px;font-weight:600}.stx-person .who span{font-size:12px;color:var(--ink-3)}
  .stx-role{font-size:12px;color:var(--ink-2);padding:4px 9px;border-radius:8px;background:var(--surface-2);border:1px solid var(--hairline)}
  .stx-tile{width:36px;height:36px;flex:none;border-radius:10px;display:grid;place-items:center;overflow:hidden;border:1px solid var(--hairline-2);color:#5f6368;background:#fff}
  #stxBody .ghost{margin:2px;cursor:pointer}
  @media (prefers-reduced-motion:no-preference){
    .stx-enter>*,.stx-enter-back>*{opacity:0;animation:stxRise .46s var(--gx-ease) forwards}
    @keyframes stxRise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
    .stx-enter>*:nth-child(1),.stx-enter-back>*:nth-child(1){animation-delay:.03s}
    .stx-enter>*:nth-child(2),.stx-enter-back>*:nth-child(2){animation-delay:.06s}
    .stx-enter>*:nth-child(3),.stx-enter-back>*:nth-child(3){animation-delay:.09s}
    .stx-enter>*:nth-child(4),.stx-enter-back>*:nth-child(4){animation-delay:.12s}
    .stx-enter>*:nth-child(5),.stx-enter-back>*:nth-child(5){animation-delay:.15s}
    .stx-enter>*:nth-child(6),.stx-enter-back>*:nth-child(6){animation-delay:.18s}
    .stx-enter>*:nth-child(7),.stx-enter-back>*:nth-child(7){animation-delay:.21s}
    .stx-enter>*:nth-child(8),.stx-enter-back>*:nth-child(8){animation-delay:.24s}
  }
  @media (prefers-reduced-motion:reduce){
    #acctMenu,#acctMenu>*,#stxBack,#stxPanel,.stx-cat,.stx-switch::after{transition:none!important}
    #acctMenu>*{opacity:1;transform:none}
    .stx-enter>*,.stx-enter-back>*{opacity:1;animation:none}
  }
  `;
  document.head.appendChild(st);

  const email = (safeBrand.owner||"user").toLowerCase().replace(/\s+/g,".") + "@" + (safeBrand.company||"company").toLowerCase() + ".com";

  /* ---- account menu ---- */
  const menu = document.createElement("div");
  menu.id = "acctMenu"; menu.setAttribute("role","menu");
  menu.innerHTML = `
    <div class="acct-head">
      <span class="avatar">${ini(safeBrand.owner)}</span>
      <span class="acct-who"><b>${safeBrand.owner}</b><span>${email}</span></span>
      <button class="acct-gear" id="acctGear" aria-label="Open settings">${icon("gear",18)}</button>
    </div>
    <div class="acct-sep"></div>
    <button class="acct-item" data-act="account">${icon("user",17)}Account</button>
    <button class="acct-item" data-act="billing">${icon("card",17)}Billing and plan</button>
    <button class="acct-item" data-act="help">${icon("help",17)}Help and support</button>
    <div class="acct-sep"></div>
    <button class="acct-item danger" data-act="signout">${icon("logout",17)}Sign out</button>`;
  document.body.appendChild(menu);
  const menuOpen = () => menu.classList.contains("open");
  const openMenu = () => menu.classList.add("open");
  const closeMenu = () => menu.classList.remove("open");
  menu.querySelector("#acctGear").addEventListener("click", () => { closeMenu(); openSettings(); });
  menu.querySelectorAll(".acct-item").forEach(b => b.addEventListener("click", () => {
    const a = b.dataset.act; closeMenu();
    if (a==="account") openSettings("general");
    else if (a==="billing") openSettings("billing");
    else if (a==="help") toast("Help and support is ready to wire");
    else if (a==="signout") toast("Signed out. Wire this to your auth.");
  }));

  /* intercept the profile pill click in the capture phase (before its own handler) */
  document.addEventListener("click", e => {
    if (e.target.closest("#profileBtn")) { e.preventDefault(); e.stopPropagation(); menuOpen()?closeMenu():openMenu(); return; }
    if (menuOpen() && !e.target.closest("#acctMenu")) closeMenu();
  }, true);

  /* ---- settings modal ---- */
  const SET = [
    { id:"general",       label:"General",       icon:"gear",   sub:"Appearance, language, region", render:rGeneral },
    { id:"permissions",   label:"Permissions",   icon:"shield", sub:"Who can see and do what",      render:rPermissions },
    { id:"employees",     label:"Employees",     icon:"users",  sub:"Team members and roles",       render:rEmployees },
    { id:"notifications", label:"Notifications", icon:"bell",   sub:"Alerts and digests",           render:rNotifications },
    { id:"integrations",  label:"Integrations",  icon:"plug",   sub:"Connected apps",               render:rIntegrations },
    { id:"billing",       label:"Billing",       icon:"card",   sub:"Plan and payment",             render:rBilling },
  ];
  const back = document.createElement("div");
  back.id = "stxBack"; back.setAttribute("role","dialog"); back.setAttribute("aria-modal","true"); back.setAttribute("aria-label","Settings");
  back.innerHTML = `<div id="stxPanel">
    <div class="stx-head">
      <button class="stx-iconbtn" id="stxBackBtn" aria-label="Back">${icon("chevleft",18)}</button>
      <h3 id="stxTitle">Settings</h3>
      <button class="stx-iconbtn" id="stxClose" aria-label="Close">${icon(xIcon,18)}</button>
    </div>
    <div class="stx-body" id="stxBody"></div>
  </div>`;
  document.body.appendChild(back);
  const panel = back.querySelector("#stxPanel"), title = back.querySelector("#stxTitle"), body = back.querySelector("#stxBody");
  const settingsOpen = () => back.classList.contains("open");
  function openSettings(id){ master(); back.classList.add("open"); if (id) detail(id); }
  function closeSettings(){ back.classList.remove("open"); }
  function master(){
    panel.classList.remove("detail"); title.textContent = "Settings";
    body.innerHTML = `<div class="stx-enter-back">` + SET.map(s =>
      `<button class="stx-cat" data-set="${s.id}"><span class="stx-cat-ic">${icon(s.icon,18)}</span><span class="stx-cat-main"><b>${s.label}</b><span>${s.sub}</span></span><span class="chev">${icon("chevron",16)}</span></button>`
    ).join("") + `</div>`;
  }
  function detail(id){
    const c = SET.find(s => s.id===id); if (!c) return;
    panel.classList.add("detail"); title.textContent = c.label;
    body.innerHTML = `<div class="stx-enter">${c.render()}</div>`; body.scrollTop = 0;
  }
  back.addEventListener("mousedown", e => { if (e.target===back) closeSettings(); });
  back.querySelector("#stxClose").addEventListener("click", closeSettings);
  back.querySelector("#stxBackBtn").addEventListener("click", master);
  body.addEventListener("click", e => {
    const cat = e.target.closest("[data-set]"); if (cat) { detail(cat.dataset.set); return; }
    const swEl = e.target.closest(".stx-switch"); if (swEl) { const on = swEl.classList.toggle("on"); swEl.setAttribute("aria-checked", on); return; }
    const sg = e.target.closest("[data-theme-set]"); if (sg) { sg.parentElement.querySelectorAll("button").forEach(z => z.classList.toggle("on", z===sg)); const v = sg.dataset.themeSet; if (v==="system") { const d = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches; setT(d?"dark":"light"); } else setT(v); return; }
    const t = e.target.closest("[data-toast]"); if (t) { toast(t.dataset.toast); return; }
  });
  document.addEventListener("keydown", e => { if (e.key==="Escape") { if (settingsOpen()) { e.preventDefault(); closeSettings(); } else if (menuOpen()) { closeMenu(); } } });

  /* ---- detail builders (sample data, ready to wire) ---- */
  const sw  = on => `<span class="stx-switch ${on?"on":""}" role="switch" aria-checked="${!!on}" tabindex="0"></span>`;
  const row = (b,sub,ctrl) => `<div class="stx-row"><div class="stx-row-main"><b>${b}</b>${sub?`<span>${sub}</span>`:""}</div>${ctrl||""}</div>`;
  const grp = x => `<div class="stx-group">${x}</div>`;
  const sec = t => `<div class="stx-section">${t}</div>`;

  function rGeneral(){
    const dark = document.documentElement.getAttribute("data-theme")==="dark";
    const seg = `<div class="stx-seg"><button data-theme-set="light" class="${dark?"":"on"}">Light</button><button data-theme-set="dark" class="${dark?"on":""}">Dark</button><button data-theme-set="system">System</button></div>`;
    return sec("Appearance") + grp(row("Theme","Match the rest of your tools",seg) + row("Compact density","Tighten spacing across the app",sw(false)))
      + sec("Regional") + grp(row("Language","English (Ireland)",`<button class="ghost" data-toast="Language picker is ready to wire">Change</button>`) + row("Time zone","Dublin, GMT+1",`<button class="ghost" data-toast="Time zone picker is ready to wire">Change</button>`));
  }
  function rPermissions(){
    return sec("Access") + grp(row("Team can view Finance","Revenue, invoices and payments",sw(false)) + row("Managers can edit orders","Create, amend and cancel",sw(true)) + row("Drivers see routes only","Hide pricing and customer notes",sw(true)) + row("Allow data export","CSV and PDF downloads",sw(true)))
      + sec("Approvals") + grp(row("Approve orders over &euro;5,000","Owner signs off large orders",sw(true)) + row("Two step sign in","Extra code at login",sw(false)));
  }
  function rEmployees(){
    const people = [["Eoin Brennan","Owner"],["Aoife McGrath","Manager"],["Cormac Doyle","Driver"],["Niamh Ryan","Office"]];
    const list = people.map(p => `<div class="stx-person"><span class="avatar">${ini(p[0])}</span><span class="who"><b>${p[0]}</b><span>${p[1]}</span></span><span class="stx-role">${p[1]}</span></div>`).join("");
    return sec(people.length + " members") + `<div class="stx-group stx-people">${list}</div>` + `<button class="ghost" data-toast="Invite flow is ready to wire">${icon("userplus",15)}Invite member</button>`;
  }
  function rNotifications(){
    return sec("Email") + grp(row("Daily digest","A morning summary",sw(true)) + row("Weekly summary","Sent on Mondays",sw(false)))
      + sec("Push") + grp(row("Low stock warnings","",sw(true)) + row("Payment received","",sw(true)) + row("Delivery updates","",sw(false)));
  }
  function rIntegrations(){
    const G = (typeof GOOGLE !== "undefined") ? GOOGLE : {};
    const r = (app,name,sub,on) => `<div class="stx-row"><span class="stx-tile">${G[app]||icon("plug",18)}</span><div class="stx-row-main"><b>${name}</b><span>${sub}</span></div><button class="ghost" data-toast="${name} is ready to wire">${on?"Manage":"Connect"}</button></div>`;
    return sec("Connected") + grp(r("gmail","Gmail","Connected",true) + r("calendar","Calendar","Connected",true) + r("drive","Drive","Connected",true))
      + sec("Available") + grp(r(null,"Xero","Accounting",false));
  }
  function rBilling(){
    return sec("Plan") + grp(row("Team plan","Up to 10 seats, all modules",`<button class="ghost" data-toast="Plan management is ready to wire">Change plan</button>`))
      + sec("Payment method") + grp(row("Visa ending 4242","Renews 1 July",`<button class="ghost" data-toast="Billing portal is ready to wire">Manage</button>`));
  }

  window.openSettings = openSettings;   /* exposed, in case you want to trigger it elsewhere */
})();
