/* ============================================================================
   WILD ROVER TOURS  ·  demo data + section pages + shared spine
   ----------------------------------------------------------------------------
   Loads AFTER command-centre.html's main <script>, so it shares its globals
   (ICONS, icon, brand, NAV, SUBTITLES, PAGES, NOTIFICATIONS, homeBody,
   renderMain, setPage, showToast, ...). Nothing here touches the design tokens:
   it reuses the card / chip / table / glass kit and adds three semantic status
   colours (ok = the house green, warn, danger) used only on chips and alerts.

   Four shared layers make it feel like ONE product, not seven tools:
     1. Sydney GPT command bar  — the home composer answers across every module.
     2. Unified activity feed    — every section posts into the one home feed.
     3. One alert centre         — a single bell collects every red-line.
     4. Entity cross-linking     — a departure, coach, driver, customer and
                                   booking are clickable everywhere and open a
                                   slide-in panel that links to every other view.
   ============================================================================ */
(function(){
  if (window.__wrDemo) return; window.__wrDemo = true;
  if (typeof ICONS === "undefined" || typeof icon !== "function") {
    console.warn("[wr-demo] load this AFTER the main command-centre script."); return;
  }

  /* ---------------------------------------------------------------- icons -- */
  Object.assign(ICONS, {
    bus:'<path d="M8 6v6"/><path d="M16 6v6"/><path d="M2 12h20"/><path d="M18 18h2a1 1 0 0 0 1-1V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v10a1 1 0 0 0 1 1h2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    ticket:'<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v14"/>',
    megaphone:'<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    euro:'<path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7 7 0 0 0 7 12a7 7 0 0 0 6.8 8 7.7 7.7 0 0 0 5.2-2"/>',
    gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    wrench:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6z"/>',
    map:'<path d="M14.5 4 9 6 3.5 4A1 1 0 0 0 2 5v13a1 1 0 0 0 .7 1L9 21l6-2 5.3 1.8A1 1 0 0 0 22 20V7a1 1 0 0 0-.7-1L15 4"/><path d="M9 6v15"/><path d="M15 4v15"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    star:'<path d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.6 6.8 19l1-5.8L3.6 9.1l5.8-.8z"/>',
    route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h6a4 4 0 0 0 0-8H8a4 4 0 0 1 0-8h2"/>',
    gauge:'<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    fuel:'<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
    doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    check:'<path d="M20 6 9 17l-5-5"/>',
    alert:'<path d="m21.7 18-9-15a1 1 0 0 0-1.7 0l-9 15A1 1 0 0 0 3 19.5h18a1 1 0 0 0 .8-1.5z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    print:'<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
    play:'<polygon points="6 3 20 12 6 21 6 3"/>',
    pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>'
  });

  /* ===================== MOCK DATA  (front-end only, never persisted) ====== */
  const VEHICLES = [
    { id:"V01", name:"Bus 1",  reg:"191-D-22841", make:"Volvo 9700",        kind:"coach",   seats:53, status:"out",       odo:412_300, svc:18_400, mpk:3.1 },
    { id:"V02", name:"Bus 2",  reg:"201-D-10932", make:"Scania Touring",    kind:"coach",   seats:53, status:"out",       odo:288_100, svc:22_900, mpk:3.0 },
    { id:"V03", name:"Bus 3",  reg:"182-D-44120", make:"MAN Lion's Coach",  kind:"coach",   seats:49, status:"depot",     odo:501_780, svc:6_200,  mpk:2.8 },
    { id:"V04", name:"Bus 4",  reg:"212-D-88017", make:"VDL Futura",        kind:"coach",   seats:53, status:"depot",     odo:147_640, svc:9_200,  mpk:3.2, flag:"warn" },
    { id:"V05", name:"Bus 5",  reg:"191-D-30551", make:"Setra S 515 HD",    kind:"coach",   seats:51, status:"out",       odo:362_910, svc:14_100, mpk:3.0 },
    { id:"V06", name:"Bus 6",  reg:"171-D-50284", make:"Volvo 9700",        kind:"coach",   seats:53, status:"out",       odo:540_220, svc:3_900,  mpk:2.9 },
    { id:"V07", name:"Bus 7",  reg:"201-D-77310", make:"Mercedes Tourismo", kind:"coach",   seats:53, status:"out",       odo:233_540, svc:20_600, mpk:3.3 },
    { id:"V08", name:"Bus 8",  reg:"221-D-11984", make:"Scania Interlink",  kind:"coach",   seats:55, status:"service",   odo:96_410,  svc:480,    mpk:3.1 },
    { id:"V09", name:"Bus 9",  reg:"06-D-19874",  make:"Volvo B12B",        kind:"coach",   seats:49, status:"out",       odo:803_660, svc:11_300, mpk:2.6, flag:"bad" },
    { id:"V10", name:"Bus 10", reg:"212-D-60337", make:"MAN Lion's Coach",  kind:"coach",   seats:53, status:"depot",     odo:118_220, svc:24_800, mpk:3.2 },
    { id:"V11", name:"Bus 11", reg:"222-D-40915", make:"VDL Futura FHD2",   kind:"coach",   seats:53, status:"breakdown", odo:71_540,  svc:28_100, mpk:3.2, flag:"bad" },
    { id:"V12", name:"Exec 1", reg:"201-D-90418", make:"Mercedes V-Class",  kind:"private", seats:7,  status:"out",       odo:64_900,  svc:5_400,  mpk:8.9, flag:"warn" },
    { id:"V13", name:"Exec 2", reg:"212-D-22507", make:"Mercedes V-Class",  kind:"private", seats:7,  status:"depot",     odo:48_120,  svc:9_900,  mpk:9.1 },
    { id:"V14", name:"Exec 3", reg:"191-D-77658", make:"Ford Tourneo",      kind:"private", seats:8,  status:"depot",     odo:102_780, svc:7_300,  mpk:9.4 },
    { id:"V15", name:"Exec 4", reg:"222-D-15003", make:"Mercedes Sprinter", kind:"private", seats:16, status:"out",       odo:39_640,  svc:12_600, mpk:7.8 },
    { id:"V16", name:"Exec 5", reg:"201-D-33271", make:"Mercedes Sprinter", kind:"private", seats:19, status:"depot",     odo:88_300,  svc:4_100,  mpk:7.5 },
  ];
  // doc health per vehicle: type, expiry (absolute, demo date is 24 Jun 2026), status
  const DOCS = {
    V09:[["Road passenger licence (PSV)","13 Jul 2026","bad"],["Motor insurance","02 Mar 2027","ok"],["CVRT (DOE)","19 Nov 2026","ok"],["Tachograph calibration","08 Aug 2027","ok"]],
    V04:[["Road passenger licence (PSV)","21 Jan 2027","ok"],["Motor insurance","30 Jul 2026","warn"],["CVRT (DOE)","04 Apr 2027","ok"],["Tachograph calibration","16 Sep 2026","ok"]],
    V12:[["Road passenger licence (PSV)","02 Aug 2026","warn"],["Motor insurance","11 Dec 2026","ok"],["CVRT (DOE)","27 Feb 2027","ok"]],
    _default:[["Road passenger licence (PSV)","15 Mar 2027","ok"],["Motor insurance","09 Jan 2027","ok"],["CVRT (DOE)","22 May 2027","ok"],["Tachograph calibration","30 Oct 2026","ok"]],
  };
  const vDocs = id => DOCS[id] || DOCS._default;

  const PEOPLE = [
    { id:"D01", name:"Pádraig Nolan",    role:"Driver", certs:["coach","private"], hrs:53.7, days:11, status:"on-tour" },
    { id:"D02", name:"Tomasz Wójcik",    role:"Driver", certs:["coach"],            hrs:41.2, days:9,  status:"on-tour" },
    { id:"D03", name:"Liam Gallagher",   role:"Driver", certs:["coach","private"], hrs:38.0, days:8,  status:"available" },
    { id:"D04", name:"Seán Ó Conaill",   role:"Driver", certs:["coach"],            hrs:46.5, days:10, status:"on-tour" },
    { id:"D05", name:"Marek Kowalczyk",  role:"Driver", certs:["coach","private"], hrs:0.0,  days:0,  status:"sick" },
    { id:"D06", name:"Dan Whelan",       role:"Driver", certs:["private"],          hrs:22.8, days:6,  status:"available" },
    { id:"D07", name:"Mícheál Burke",    role:"Guide",  certs:["guide"],            hrs:44.0, days:10, status:"on-tour" },
    { id:"D08", name:"Aoife Brennan",    role:"Guide",  certs:["guide"],            hrs:31.5, days:7,  status:"available" },
    { id:"D09", name:"Saoirse Lynch",    role:"Guide",  certs:["guide"],            hrs:39.0, days:9,  status:"on-tour" },
    { id:"D10", name:"Colm Devlin",      role:"Guide",  certs:["guide"],            hrs:18.0, days:4,  status:"available" },
  ];
  const HR_LIMIT = 56; // fortnight driving limit (hours)

  const ROUTES = {
    R1:{ name:"Cliffs of Moher & Galway",                 price:79, hrs:"12h", pickups:["7:00 Gardiner St","7:15 O'Connell St","7:25 Heuston","7:40 Red Cow"] },
    R2:{ name:"Cliffs of Moher via Ennis, Limerick & Bunratty", price:75, hrs:"12h", pickups:["6:50 Gardiner St","7:05 O'Connell St","7:20 Heuston"] },
    R3:{ name:"Belfast & Giant's Causeway",               price:85, hrs:"13h", pickups:["6:45 Gardiner St","7:00 O'Connell St","7:15 Westmoreland St"] },
    R4:{ name:"Kilkenny, Wicklow & Glendalough",          price:69, hrs:"11h", pickups:["7:10 Gardiner St","7:25 O'Connell St","7:35 Heuston"], extra:"with sheepdog trial" },
  };

  // channels & commission
  const CHANNELS = [
    { id:"direct", name:"Direct (Rezgo)", comm:0,  share:34 },
    { id:"viator", name:"Viator",         comm:25, share:27 },
    { id:"bresno", name:"Bresno",         comm:28, share:14 },
    { id:"bigbus", name:"Big Bus",        comm:20, share:13 },
    { id:"dodub",  name:"DoDublin",       comm:22, share:12 },
  ];

  // today's departures (the spine: each links coach + crew + bookings + margin)
  const DEPARTURES = [
    { id:"DEP-CMG", route:"R1", coach:"V01", driver:"D01", guide:"D07", sold:49, cap:53, status:"boarding",  mix:{direct:21,viator:14,bresno:6,bigbus:5,dodub:3} },
    { id:"DEP-CMB", route:"R2", coach:"V05", driver:"D04", guide:"D09", sold:44, cap:51, status:"en-route",  mix:{direct:18,viator:12,bresno:7,bigbus:4,dodub:3} },
    { id:"DEP-BGC", route:"R3", coach:"V02", driver:"D02", guide:"D07", sold:51, cap:53, status:"en-route",  mix:{direct:20,viator:16,bresno:8,bigbus:4,dodub:3} },
    { id:"DEP-KWG", route:"R4", coach:"V06", driver:"D04", guide:"D09", sold:19, cap:50, status:"low-load",  mix:{direct:9,viator:5,bresno:2,bigbus:2,dodub:1}, when:"Friday" },
    { id:"DEP-EXC", route:"R1", coach:"V12", driver:"D06", guide:"D10", sold:6,  cap:7,  status:"private",   mix:{direct:6,viator:0,bresno:0,bigbus:0,dodub:0} },
  ];
  const depRevenue = d => { const p = ROUTES[d.route].price; const rev = d.sold*p; let ota=0; for(const c of CHANNELS){ const n = d.mix[c.id]||0; ota += n*p*c.comm/100; } return { rev, ota:Math.round(ota), net:Math.round(rev-ota) }; };

  const CUSTOMERS = [
    { id:"C1", name:"Hannah Whitaker",  region:"US",  type:"Solo",   trips:3, ltv:237, src:"Direct" },
    { id:"C2", name:"The Petersen party",region:"US", type:"Group",  trips:1, ltv:948, src:"Viator" },
    { id:"C3", name:"Émile Laurent",    region:"FR",  type:"Solo",   trips:2, ltv:154, src:"Bresno" },
    { id:"C4", name:"Greta Hoffmann",   region:"DE",  type:"Solo",   trips:1, ltv:79,  src:"DoDublin" },
    { id:"C5", name:"Aisling Doherty",  region:"IE",  type:"Repeat", trips:6, ltv:402, src:"Direct" },
    { id:"C6", name:"Brad & Cindy Olsen",region:"US", type:"Repeat", trips:4, ltv:611, src:"Direct" },
  ];
  const SEGMENTS = [["American",70],["Group bookings",24],["Repeat guests",18],["European",21]];

  const REVIEWS = [
    { who:"Hannah W.", chan:"TripAdvisor", stars:5, when:"2h ago",  text:"Mícheál made the whole day. Cliffs were unreal and the timing was perfect.", sent:"pos", replied:false },
    { who:"Greta H.",  chan:"Google",      stars:5, when:"Today",   text:"Smooth pickup, brilliant guide, comfortable coach. Worth every euro.",        sent:"pos", replied:false },
    { who:"Tom R.",    chan:"TripAdvisor", stars:3, when:"Yesterday",text:"Great scenery but the lunch stop felt rushed at Bunratty.",                  sent:"neu", replied:false },
    { who:"Brad O.",   chan:"Google",      stars:5, when:"Yesterday",text:"Fourth tour with Wild Rover. Never disappoints. Belfast day is the best.",   sent:"pos", replied:true  },
    { who:"Émile L.",  chan:"TripAdvisor", stars:4, when:"2 days",  text:"Very good. Would have liked a little longer in Galway city.",                  sent:"pos", replied:true  },
  ];

  const PIPELINE = [
    { stage:"Enquiry",  items:[["Corporate away-day, 42 pax","Galway, Sept"],["US wedding group, 30 pax","Wicklow, Aug"]] },
    { stage:"Quoted",   items:[["Camera club charter, 16 pax","Causeway, Jul"],["School trip, 50 pax","Glendalough, Oct"]] },
    { stage:"Confirmed",items:[["Pharma incentive, 7 pax","Exec, this Fri"]] },
  ];

  const TRENDS = [
    { tag:"Wild Atlantic Way reels",  plat:"TikTok",    mom:38, why:"Sunset cliff clips trending into UGC feeds", angle:"Sunset Cliffs walk-and-talk, vertical, 22s",        spark:[12,14,15,19,24,30,38] },
    { tag:"Cliffs at golden hour",    plat:"Reels",     mom:33, why:"Evening light shots outperforming midday",     angle:"Last-departure golden-hour add-on framing",         spark:[10,12,16,18,23,28,33] },
    { tag:"Derry Girls filming spots",plat:"Instagram", mom:24, why:"Reboot chatter pushing Belfast searches",       angle:"Belfast day add-on, carousel of 6 stops",           spark:[9,11,13,15,18,21,24] },
    { tag:"Game of Thrones locations",plat:"TikTok",    mom:22, why:"Causeway coast tie-in to the GoT bundle",       angle:"Tease the €28.50 add-on on the Belfast run",        spark:[8,10,12,14,16,19,22] },
    { tag:"Dublin without a car",     plat:"Reels",     mom:21, why:"Car-free travel queries rising fast",           angle:"Position day tours as the no-car way to see Ireland",spark:[7,9,11,13,15,18,21] },
    { tag:"Solo female travel Ireland",plat:"Instagram",mom:19, why:"Safe solo trips a steady evergreen riser",       angle:"Why the Galway day suits solo travellers",          spark:[8,9,11,12,14,16,19] },
    { tag:"Aran Islands ferry day",   plat:"TikTok",    mom:17, why:"Island day-trip content gaining pace",          angle:"Galway + Aran combo teaser",                        spark:[6,7,9,10,12,14,17] },
    { tag:"Sheepdog trials",          plat:"TikTok",    mom:15, why:"Animal clips convert to Wicklow bookings",       angle:"30s sheepdog demo from the Wicklow stop",           spark:[5,6,8,9,11,13,15] },
    { tag:"Belfast black-cab tours",  plat:"Instagram", mom:13, why:"Mural-tour interest feeding the Belfast day",    angle:"Frame as part of the full Belfast day",             spark:[6,7,7,9,10,11,13] },
    { tag:"Slow travel Ireland",      plat:"Reels",     mom:11, why:"Slower itineraries gaining with older guests",   angle:"One-region-a-day, unhurried positioning",           spark:[5,5,6,7,8,10,11] },
  ];
  const CONTENT = [
    ["Mon","Reel: Cliffs golden hour","Scheduled"],
    ["Tue","Blog: 1 day from Dublin to Galway","Draft"],
    ["Wed","Carousel: Belfast film locations","Scheduled"],
    ["Thu","Short: sheepdog trial at Wicklow","Idea"],
    ["Fri","Email: weekend availability","Draft"],
  ];
  const COMPETITORS = [
    { name:"Wild Rover Tours", cliffs:79, causeway:85, kwg:69, rating:4.9, reviews:64210, viator:2,  ads:true,  social:12.4, freq:"Daily",      usp:"Highest rated, premium", move:0,  us:true },
    { name:"Paddy Wagon",      cliffs:69, causeway:75, kwg:59, rating:4.5, reviews:18940, viator:1,  ads:true,  social:31.0, freq:"Daily",      usp:"Backpacker volume, Viator-led", move:-3 },
    { name:"Extreme Ireland",  cliffs:72, causeway:79, kwg:62, rating:4.6, reviews:12380, viator:4,  ads:true,  social:8.7,  freq:"Daily",      usp:"Strong SEO on day tours",       move:4 },
    { name:"Irish Day Tours",  cliffs:74, causeway:82, kwg:65, rating:4.7, reviews:9120,  viator:3,  ads:true,  social:6.2,  freq:"Daily",      usp:"Premium-adjacent, comfort focus", move:0 },
    { name:"Finn McCools Tours",cliffs:67,causeway:73, kwg:57, rating:4.4, reviews:5430,  viator:6,  ads:false, social:4.1,  freq:"4 / week",   usp:"Small group, north-west niche",  move:2 },
    { name:"City Sightseeing", cliffs:71, causeway:0,  kwg:60, rating:4.2, reviews:22650, viator:5,  ads:true,  social:48.0, freq:"Daily",      usp:"Brand reach, hop-on day arm",    move:0 },
    { name:"Collins Day Tours",cliffs:70, causeway:78, kwg:0,  rating:4.6, reviews:3870,  viator:8,  ads:false, social:2.3,  freq:"3 / week",   usp:"Owner-led, west of Ireland",     move:-2 },
  ];
  const MKT_SPEND = [
    { chan:"Google Ads", spend:8200, bookings:386, },
    { chan:"Meta / IG",  spend:5400, bookings:212, },
    { chan:"TikTok",     spend:2100, bookings:74,  },
    { chan:"SEO / content",spend:2600, bookings:298,},
    { chan:"Viator fees",spend:1500, bookings:240, },
  ];

  // finance: monthly P&L (a single busy summer month)
  const PL = [
    ["Revenue",            272_400, "in"],
    ["OTA commission",     -41_200, "out"],
    ["Driver & guide wages",-58_900,"out"],
    ["Fuel",               -29_300, "out"],
    ["Maintenance & parts",-12_400, "out"],
    ["Marketing",          -19_800, "out"],
    ["Insurance & licences",-8_600, "out"],
    ["Other overheads",    -16_700, "out"],
  ];
  const COS_TARGET = 20;          // cost-of-sales % target
  const COS_ACTUAL = 22.4;

  // alert centre: every red-line from every section, grouped by urgency
  const ALERTS = [
    { urg:"red",   sec:"Driver hours", title:"Tachograph red-line",  detail:"Pádraig Nolan at 53h40 of the 56h fortnight limit.", ent:"driver:D01" },
    { urg:"red",   sec:"Compliance",   title:"PSV disc expiring",     detail:"Bus 9 (06-D-19874) road passenger licence lapses in 19 days.", ent:"vehicle:V09" },
    { urg:"red",   sec:"Finance",      title:"Low-load departure",    detail:"Kilkenny & Glendalough Friday at 19 of 50, below break-even.", ent:"departure:DEP-KWG" },
    { urg:"red",   sec:"Fleet",        title:"Coach off the road",    detail:"Bus 11 broke down on the M7, recovery booked, 2 swaps needed.", ent:"vehicle:V11" },
    { urg:"amber", sec:"Maintenance",  title:"Service due soon",      detail:"Bus 4 is 9,200 km from its next service.", ent:"vehicle:V04" },
    { urg:"amber", sec:"Compliance",   title:"Insurance renewal",     detail:"Bus 4 motor insurance renews 30 Jul, one month out.", ent:"vehicle:V04" },
    { urg:"amber", sec:"Reviews",      title:"3-star needs a reply",  detail:"Tom R. on TripAdvisor about the Bunratty lunch stop.", go:"customers" },
  ];

  /* ===================== SHARED KIT (extends the existing components) ====== */
  const cap = s => s ? s[0].toUpperCase()+s.slice(1) : s;
  const eur = n => "€" + Math.round(n).toLocaleString("en-IE");
  const veh = id => VEHICLES.find(v=>v.id===id);
  const per = id => PEOPLE.find(p=>p.id===id);
  const dep = id => DEPARTURES.find(d=>d.id===id);
  const cust= id => CUSTOMERS.find(c=>c.id===id);

  function chip(kind,label){ return `<span class="wr-chip ${kind}"><span class="dot"></span>${label}</span>`; }
  const STAT = { out:["ok","Out today"], depot:["neutral","At depot"], service:["warn","In service"], breakdown:["bad","Off road"], "boarding":["ok","Boarding"], "en-route":["ok","En route"], "low-load":["bad","Low load"], private:["neutral","Private hire"], available:["ok","Available"], "on-tour":["neutral","On tour"], sick:["bad","Out sick"], rest:["warn","Resting"] };
  function statusChip(s){ const m = STAT[s]||["neutral",cap(s)]; return chip(m[0],m[1]); }
  function docChip(s){ return chip(s==="bad"?"bad":s==="warn"?"warn":"ok", s==="bad"?"Expiring":s==="warn"?"1 month":"Valid"); }

  // clickable entity (opens the slide-in panel)
  function ent(type,id,label){ return `<button class="wr-link" data-ent="${type}:${id}">${label}</button>`; }
  function bar(pct,kind){ pct=Math.max(0,Math.min(100,pct)); return `<span class="wr-bar"><span class="wr-bar-fill ${kind||''}" style="width:${pct}%"></span></span>`; }

  // standardised stat tile: label, big number (count-up if raw given), delta chip,
  // inline sparkline, one-line context. Optional jump/entity target.
  function tile({label,value,sub,go,ent:e,raw,pre="",suf="",dec=0,delta,spark,tone="accent"}){
    const attr = e?`data-ent="${e}"`:go?`data-go="${go}"`:"";
    const num = raw!=null
      ? `<div class="stat-val"><span class="wr-num" data-count="${raw}" data-pre="${pre}" data-suf="${suf}" data-dec="${dec}">${pre}${value}${suf}</span></div>`
      : `<div class="stat-val">${value}</div>`;
    const dl = delta ? `<span class="wr-delta ${delta.dir}">${delta.dir==="up"?"▲":"▼"} ${delta.v}</span>` : "";
    const sp = spark ? `<div class="stat-spark">${sparkline(spark,{w:130,h:30,kind:"area",tone})}</div>` : "";
    return `<button class="card stat lift rise wr-tile" ${attr}>
      <div class="stat-top"><div class="eyebrow">${label}</div>${dl}</div>
      ${num}${sp}
      <div class="stat-sub">${sub||""}</div>
    </button>`;
  }
  function card(title, inner, {eyebrow,foot}={}){
    return `<section class="card lift rise">
      <div class="card-h"><div>${eyebrow?`<div class="eyebrow">${eyebrow}</div>`:""}<h3>${title}</h3></div>${foot||""}</div>
      ${inner}</section>`;
  }
  // cols can be strings, or {label, sort:true, num:true} for a sortable / numeric column
  function tableHTML(cols, rows){
    const head = cols.map((c,i)=>{ const o = typeof c==="object"?c:{label:c};
      return `<th class="${o.num?'num':''} ${o.sort?'wr-sortable':''}" ${o.sort?`data-sort="${i}" data-num="${o.num?1:0}"`:""}>${o.label}${o.sort?`<span class="wr-sortcaret">${icon("chevdown",13)}</span>`:""}</th>`; }).join("");
    return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${head}</tr></thead>
      <tbody>${rows.map(r=>`<tr ${r._ent?`class="wr-row" data-ent="${r._ent}"`:""}>${r.cells.map((c,i)=>{ const o=cols[i]; const num=(typeof o==="object"&&o.num)?"num":""; return `<td class="${num}">${c}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  /* ===================== CHART KIT (hand-rolled, themed SVG) ==============
     All charts read the palette via CSS classes (accent / warn / danger / ink),
     thin strokes, rounded caps, no chart-library chrome, and animate on mount.
     ====================================================================== */
  function _pts(data,w,h,p){ const mn=Math.min(...data),mx=Math.max(...data),r=(mx-mn)||1;
    return data.map((v,i)=>[p+ (data.length<2?0:i/(data.length-1))*(w-2*p), h-p-((v-mn)/r)*(h-2*p)]); }

  function sparkline(data,{w=120,h=30,kind="line",tone="accent"}={}){
    if(!data||data.length<2) return "";
    const pts=_pts(data,w,h,3), d="M"+pts.map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" L");
    const last=pts[pts.length-1];
    const area=`${d} L${(w-3).toFixed(1)},${(h-3).toFixed(1)} L3,${(h-3).toFixed(1)} Z`;
    return `<svg class="wr-spark tone-${tone}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      ${kind==="area"?`<path class="sp-fill" d="${area}"/>`:""}
      <path class="sp-line wr-draw" pathLength="1" d="${d}"/>
      <circle class="sp-dot" cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="2.4"/></svg>`;
  }

  function areaTrend(data,{w=560,h=190,labels=[],target=null,targetLabel="",tone="accent"}={}){
    const pX=14,pT=16,pB=26, vals=target!=null?data.concat([target]):data;
    const mn=Math.min(...vals), mx=Math.max(...vals), r=(mx-mn)||1;
    const X=i=>pX+(data.length<2?0:i/(data.length-1))*(w-2*pX);
    const Y=v=>pT+(1-(v-mn)/r)*(h-pT-pB);
    const pts=data.map((v,i)=>[X(i),Y(v)]);
    const line="M"+pts.map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" L");
    const area=`${line} L${X(data.length-1).toFixed(1)},${(h-pB).toFixed(1)} L${pX.toFixed(1)},${(h-pB).toFixed(1)} Z`;
    const t=target!=null?`<line class="at-target" x1="${pX}" y1="${Y(target).toFixed(1)}" x2="${w-pX}" y2="${Y(target).toFixed(1)}"/><text class="at-tlabel" x="${w-pX}" y="${(Y(target)-6).toFixed(1)}" text-anchor="end">${targetLabel}</text>`:"";
    const xl=labels.map((l,i)=>`<text class="at-x" x="${X(i).toFixed(1)}" y="${h-7}" text-anchor="middle">${l}</text>`).join("");
    const last=pts[pts.length-1];
    return `<svg class="wr-chart at tone-${tone}" viewBox="0 0 ${w} ${h}" role="img">
      <path class="at-fill" d="${area}"/><path class="at-line wr-draw" pathLength="1" d="${line}"/>
      <circle class="at-dot" cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3.2"/>${t}${xl}</svg>`;
  }

  function barCompare(items,{w=560,h=220,s1="a",s2="b",lab1="A",lab2="B",fmt1=v=>v,fmt2=v=>v,single=false}={}){
    let m1=Math.max(...items.map(i=>i[s1]))||1, m2=Math.max(...items.map(i=>i[s2]))||1;
    if(single){ m1=m2=Math.max(m1,m2); }
    const pT=14,pB=52,plot=h-pT-pB, gw=w/items.length, bw=Math.min(24,gw*0.28);
    const bars=items.map((it,i)=>{ const cx=gw*i+gw/2, h1=it[s1]/m1*plot, h2=it[s2]/m2*plot;
      return `<g class="bc-g" style="--d:${i}">
        <rect class="bc-b1 wr-grow" x="${(cx-bw-2).toFixed(1)}" y="${(pT+plot-h1).toFixed(1)}" width="${bw}" height="${h1.toFixed(1)}" rx="4"/>
        <rect class="bc-b2 wr-grow" x="${(cx+2).toFixed(1)}" y="${(pT+plot-h2).toFixed(1)}" width="${bw}" height="${h2.toFixed(1)}" rx="4"/>
        <text class="bc-x" x="${cx.toFixed(1)}" y="${(h-30).toFixed(1)}" text-anchor="middle">${it.label}</text>
        <text class="bc-v" x="${cx.toFixed(1)}" y="${(h-14).toFixed(1)}" text-anchor="middle">${fmt1(it[s1])} · ${fmt2(it[s2])}</text></g>`; }).join("");
    return `<svg class="wr-chart bc" viewBox="0 0 ${w} ${h}"><line class="bc-base" x1="0" y1="${(pT+plot).toFixed(1)}" x2="${w}" y2="${(pT+plot).toFixed(1)}"/>${bars}</svg>
      <div class="wr-legend"><span><i class="lg-sw s1"></i>${lab1}</span><span><i class="lg-sw s2"></i>${lab2}</span></div>`;
  }

  function donut(segs,{size=164,thick=22,center=""}={}){
    const total=segs.reduce((a,s)=>a+s.value,0)||1, r=(size-thick)/2, c=size/2, C=2*Math.PI*r;
    let off=0; const arcs=segs.map((s,i)=>{ const dash=s.value/total*C;
      const el=`<circle class="dn-seg wr-arc tone-${s.tone||'accent'}" cx="${c}" cy="${c}" r="${r}" stroke-width="${thick}" stroke-dasharray="${dash.toFixed(2)} ${(C-dash).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 ${c} ${c})" style="--d:${i}"/>`;
      off+=dash; return el; }).join("");
    return `<div class="wr-donut"><svg viewBox="0 0 ${size} ${size}"><circle class="dn-track" cx="${c}" cy="${c}" r="${r}" stroke-width="${thick}"/>${arcs}</svg>${center?`<div class="dn-center">${center}</div>`:""}</div>`;
  }
  function donutLegend(segs){ const total=segs.reduce((a,s)=>a+s.value,0)||1;
    return `<div class="wr-dlegend">${segs.map(s=>`<div class="dl"><i class="dl-sw tone-${s.tone||'accent'}"></i><span class="dl-l">${s.label}</span><span class="dl-v">${Math.round(s.value/total*100)}%</span></div>`).join("")}</div>`; }

  function gauge(value,{max=30,target=20,unit="%"}={}){
    const w=224,h=132,c=w/2,cy=h-12,r=92;
    const ang=v=>Math.PI*(1-Math.min(1,Math.max(0,v/max)));
    const pol=(a,rr=r)=>[c+rr*Math.cos(a),cy-rr*Math.sin(a)];
    const arc=(from,to,cls)=>{const p0=pol(ang(from)),p1=pol(ang(to));return `<path class="${cls}" d="M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 0 1 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}"/>`;};
    const np=pol(ang(value),r-12);
    return `<svg class="wr-gauge" viewBox="0 0 ${w} ${h}">
      ${arc(0,max,"gg-track")}${arc(0,target,"gg-ok")}${arc(target,max,"gg-warn")}
      <line class="gg-needle wr-needle" x1="${c}" y1="${cy}" x2="${np[0].toFixed(1)}" y2="${np[1].toFixed(1)}"/>
      <circle class="gg-hub" cx="${c}" cy="${cy}" r="5"/>
      <text class="gg-val" x="${c}" y="${(cy-26).toFixed(1)}" text-anchor="middle">${value}${unit}</text>
      <text class="gg-sub" x="${c}" y="${(cy-8).toFixed(1)}" text-anchor="middle">target ${target}${unit}</text></svg>`;
  }

  function timeline(rows,{w=560,rowH=32,labelW=132,domain=[0,1],ticks=[]}={}){
    const h=rows.length*rowH+28, plotW=w-labelW-16;
    const X=v=>labelW+((v-domain[0])/((domain[1]-domain[0])||1))*plotW;
    const tickEls=ticks.map(t=>`<line class="tl-tick" x1="${X(t.at).toFixed(1)}" y1="12" x2="${X(t.at).toFixed(1)}" y2="${h-8}"/><text class="tl-tx" x="${X(t.at).toFixed(1)}" y="${h-1}" text-anchor="middle">${t.label}</text>`).join("");
    const body=rows.map((r,i)=>{const y=18+i*rowH, x1=X(r.start), x2=X(r.end);
      return `<text class="tl-lbl" x="0" y="${(y+rowH/2).toFixed(1)}">${r.label}</text>
        <rect class="tl-bar wr-grow-x tone-${r.tone||'accent'}" x="${x1.toFixed(1)}" y="${(y+5).toFixed(1)}" width="${Math.max(5,x2-x1).toFixed(1)}" height="${rowH-12}" rx="5" style="--d:${i}"/>
        ${r.tag?`<text class="tl-tag" x="${(x2+8).toFixed(1)}" y="${(y+rowH/2).toFixed(1)}">${r.tag}</text>`:""}`; }).join("");
    return `<svg class="wr-chart tl" viewBox="0 0 ${w} ${h}">${tickEls}${body}</svg>`;
  }

  function funnel(steps,{w=520,h=210}={}){
    const max=steps[0].value||1, sh=h/steps.length;
    const body=steps.map((s,i)=>{const ww=(s.value/max)*(w-180), y=i*sh;
      const drop=i>0?` <tspan class="fn-drop">${Math.round(s.value/steps[i-1].value*100)}%</tspan>`:"";
      return `<g style="--d:${i}"><rect class="fn-bar wr-grow-x" x="0" y="${(y+6).toFixed(1)}" width="${Math.max(8,ww).toFixed(1)}" height="${(sh-12).toFixed(1)}" rx="7"/>
        <text class="fn-lbl" x="14" y="${(y+sh/2+5).toFixed(1)}">${s.label}</text>
        <text class="fn-val" x="${(Math.max(8,ww)+14).toFixed(1)}" y="${(y+sh/2+5).toFixed(1)}">${s.value.toLocaleString("en-IE")}${drop}</text></g>`; }).join("");
    return `<svg class="wr-chart fn" viewBox="0 0 ${w} ${h}">${body}</svg>`;
  }

  function ringStat(value,max,{label="",size=120,thick=12,tone="accent",center=null}={}){
    const r=(size-thick)/2,c=size/2,C=2*Math.PI*r,dash=Math.min(1,value/max)*C;
    return `<div class="wr-ring" style="width:${size}px;height:${size}px"><svg viewBox="0 0 ${size} ${size}"><circle class="rg-track" cx="${c}" cy="${c}" r="${r}" stroke-width="${thick}"/>
      <circle class="rg-fill wr-arc tone-${tone}" cx="${c}" cy="${c}" r="${r}" stroke-width="${thick}" stroke-linecap="round" stroke-dasharray="${dash.toFixed(1)} ${(C-dash).toFixed(1)}" transform="rotate(-90 ${c} ${c})"/></svg>
      <div class="rg-center">${center||`<b>${value}</b><span>${label}</span>`}</div></div>`;
  }

  function hbars(items,{fmt=v=>v}={}){
    const max=Math.max(...items.map(i=>i.value))||1;
    return `<div class="wr-hbars">${items.map((it,i)=>`<div class="hb" style="--d:${i}">
      <span class="hb-lbl">${it.label}</span>
      <span class="hb-track"><span class="hb-fill wr-grow-x ${it.tone?'tone-'+it.tone:''}" style="width:${(it.value/max*100).toFixed(1)}%"></span></span>
      <span class="hb-val">${fmt(it.value)}</span></div>`).join("")}</div>`;
  }

  /* ===================== TABBED SECTIONS ================================== */
  let wrTab = {};
  function activeTab(sec){ const s=SECTIONS[sec]; return wrTab[sec] || s.tabs[0].id; }
  function renderSection(sec){
    const s = SECTIONS[sec], cur = activeTab(sec);
    const tab = s.tabs.find(t=>t.id===cur) || s.tabs[0];
    const bar = `<div class="wr-tabs">${s.tabs.map(t=>`<button class="wr-tab ${t.id===cur?'on':''}" data-tab="${sec}:${t.id}">${t.label}</button>`).join("")}</div>`;
    return `${bar}<div class="wr-pane stack">${tab.render()}</div>`;
  }

  const SECTIONS = {
    /* ---------------------------------------------------------- FLEET ----- */
    fleet:{ tabs:[
      { id:"vehicles", label:"Vehicles", render:fleetVehicles },
      { id:"compliance", label:"Compliance", render:fleetCompliance },
      { id:"maintenance", label:"Maintenance", render:fleetMaintenance },
      { id:"map", label:"Live Map", render:fleetMap },
      { id:"inspections", label:"Inspections", render:fleetInspections },
    ]},
    /* ----------------------------------------------------- OPERATIONS ----- */
    operations:{ tabs:[
      { id:"roster", label:"Roster", render:opsRoster },
      { id:"today", label:"Today's Run", render:opsToday },
      { id:"manifest", label:"Manifest", render:opsManifest },
      { id:"hours", label:"Driver Hours", render:opsHours },
    ]},
    /* ------------------------------------------------------- BOOKINGS ----- */
    bookings:{ tabs:[
      { id:"seats", label:"Live Seats", render:bkSeats },
      { id:"channels", label:"Channels", render:bkChannels },
      { id:"pickups", label:"Pickups", render:bkPickups },
      { id:"confirm", label:"Confirmations", render:bkConfirm },
      { id:"attribution", label:"Booking Window", render:bkAttribution },
    ]},
    /* ------------------------------------------------------ CUSTOMERS ----- */
    customers:{ tabs:[
      { id:"directory", label:"Directory", render:crmDirectory },
      { id:"reviews", label:"Reviews", render:crmReviews },
      { id:"pipeline", label:"Pipeline", render:crmPipeline },
      { id:"campaigns", label:"Campaigns", render:crmCampaigns },
    ]},
    /* ------------------------------------------------------ MARKETING ----- */
    marketing:{ tabs:[
      { id:"roi", label:"Spend & ROI", render:mkRoi },
      { id:"trends", label:"Trend Spotter", render:mkTrends },
      { id:"channels", label:"Channels", render:mkChannels },
      { id:"website", label:"Website", render:mkWebsite },
      { id:"competitors", label:"Competitors", render:mkCompetitors },
    ]},
    /* -------------------------------------------------------- FINANCE ----- */
    finance:{ tabs:[
      { id:"pl", label:"P&L", render:finPL },
      { id:"perdep", label:"Per Departure", render:finPerDep },
      { id:"margin", label:"Channel Margin", render:finMargin },
      { id:"partner", label:"Partner & Bundles", render:finPartner },
    ]},
  };

  /* --------------------------------------------------------- FLEET pages -- */
  let wrFleetFilter="all";
  function fleetVehicles(){
    const isOff=v=>v.status==="breakdown"||v.status==="service";
    const docBad=v=>vDocs(v.id).some(x=>x[2]!=="ok");
    const fc={ all:VEHICLES.length, out:0, depot:0, off:0, docdue:0 };
    VEHICLES.forEach(v=>{ if(v.status==="out")fc.out++; if(v.status==="depot")fc.depot++; if(isOff(v))fc.off++; if(docBad(v))fc.docdue++; });
    const filt=v=>({all:1,out:v.status==="out",depot:v.status==="depot",off:isOff(v),docdue:docBad(v)})[wrFleetFilter];
    const list=VEHICLES.filter(filt);
    let valid=0,off=0; VEHICLES.forEach(v=>{ if(isOff(v)){off++;return;} if(!docBad(v))valid++; });
    const tot=VEHICLES.length, attn=tot-valid-off;
    const strip=`<div class="wr-health card rise">
      <div class="wr-health-bar"><span class="hh ok" style="width:${valid/tot*100}%"></span><span class="hh warn" style="width:${attn/tot*100}%"></span><span class="hh bad" style="width:${off/tot*100}%"></span></div>
      <div class="wr-health-key"><span><i class="hk ok"></i>${valid} road-ready</span><span><i class="hk warn"></i>${attn} doc attention</span><span><i class="hk bad"></i>${off} off road</span></div></div>`;
    const chips=[["all","All",fc.all],["out","Out today",fc.out],["depot","At depot",fc.depot],["off","Off road",fc.off],["docdue","Doc due",fc.docdue]];
    const filterbar=`<div class="wr-filters">${chips.map(c=>`<button class="wr-fchip ${wrFleetFilter===c[0]?'on':''}" data-fleetfilter="${c[0]}">${c[1]}<span class="fc-n">${c[2]}</span></button>`).join("")}</div>`;
    const grid=list.map(v=>{ const d=vDocs(v.id);
      const worst=d.some(x=>x[2]==="bad")?"bad":d.some(x=>x[2]==="warn")?"warn":"ok";
      const accent=isOff(v)?"bad":worst==="bad"?"bad":worst==="warn"?"warn":"ok";
      const head=Math.max(2,100-Math.min(100,v.svc/300));
      const pips=d.map(x=>`<span class="wr-pip ${x[2]}" title="${x[0]}"></span>`).join("");
      return `<button class="card lift rise wr-veh" data-ent="vehicle:${v.id}">
        <span class="wr-veh-accent ${accent}"></span>
        <div class="wr-veh-top"><div><b>${v.name}</b> <span class="muted">${v.reg}</span></div>${statusChip(v.status)}</div>
        <div class="wr-veh-make">${v.make} · ${v.seats} seats</div>
        <div class="wr-veh-pips">${pips}<span class="wr-veh-pl">documents</span></div>
        <div class="wr-veh-svc"><span class="wr-mini">${icon("wrench",13)} ${v.svc.toLocaleString()} km</span><span class="wr-bar"><span class="wr-bar-fill ${v.svc<2000?'bad':v.svc<10000?'warn':''}" style="width:${head}%"></span></span></div>
      </button>`; }).join("");
    return `${strip}${filterbar}<div class="wr-cardgrid">${grid||`<div class="empty-rows">${icon("bus",22)}<b>No coaches match this filter</b><span>Try another filter above.</span></div>`}</div>`;
  }
  const TODAY = new Date(2026,5,24);
  function daysTo(s){ const d=new Date(s); return Math.round((d-TODAY)/86400000); }
  let wrCompFilter="all";
  function fleetCompliance(){
    const all=[]; VEHICLES.forEach(v=> vDocs(v.id).forEach(([t,exp,s])=> all.push({v,t,exp,s,days:daysTo(exp)})) );
    all.sort((a,b)=>a.days-b.days);
    const expiring=all.filter(x=>x.days<30).length, soon=all.filter(x=>x.days>=30&&x.days<60).length, valid=all.length-expiring-soon;
    // timeline: the 9 most urgent docs, today -> expiry over a 12-month window
    const tlRows=all.slice(0,9).map(x=>({ label:`${x.v.name} ${x.t.split(" ")[0]}`, start:0, end:Math.min(365,Math.max(8,x.days)), tone:x.days<30?"danger":x.days<60?"warn":"accent", tag:x.days<60?x.days+"d":"" }));
    const filt=x=>({all:1,expiring:x.days<30,soon:x.days>=30&&x.days<60,valid:x.days>=60})[wrCompFilter];
    const rows=all.filter(filt).slice(0,16).map(r=>({ _ent:`vehicle:${r.v.id}`, cells:[`<b>${r.v.name}</b> <span class="muted">${r.v.reg}</span>`, r.t, r.exp, (r.days<60?`<span class="${r.days<30?'wr-neg':''}">${r.days}d</span>`:`<span class="muted">${Math.round(r.days/30)}mo</span>`), docChip(r.s)] }));
    const segs=[["all","All",all.length],["expiring","Expiring",expiring],["soon","Within 60d",soon],["valid","Valid",valid]];
    const fbar=`<div class="wr-seg2 wr-compfilter">${segs.map(s=>`<button data-compfilter="${s[0]}" class="${wrCompFilter===s[0]?'on':''}">${s[1]} <span class="fc-n">${s[2]}</span></button>`).join("")}</div>`;
    return `
    ${card("Expiry timeline", `${timeline(tlRows,{domain:[0,365],ticks:[{at:30,label:"1 mo"},{at:90,label:"3 mo"},{at:180,label:"6 mo"},{at:365,label:"1 yr"}]})}`, {eyebrow:"Today to expiry · the cliff at a glance"})}
    <div class="grid grid-2">
      ${card("Fleet document health", `<div class="wr-split"><div>${ringStat(valid,all.length,{tone:"accent",center:`<b>${Math.round(valid/all.length*100)}%</b><span>valid</span>`})}</div><div class="rows" style="width:100%">
        <div class="row"><span class="row-ava">${icon("alert",15)}</span><div class="row-main"><b>${expiring} expiring</b><span>inside 30 days</span></div>${chip("bad","Act")}</div>
        <div class="row"><span class="row-ava">${icon("clock",15)}</span><div class="row-main"><b>${soon} within 60 days</b><span>renewals to book</span></div>${chip("warn","Soon")}</div>
        <div class="row"><span class="row-ava">${icon("check",15)}</span><div class="row-main"><b>${valid} valid</b><span>no action</span></div>${chip("ok","OK")}</div>
      </div></div>`, {eyebrow:"Across every coach"})}
      ${card("Audit trail", `<div class="rows">${[["24 Jun 09:12","Sydney","Booked CVRT retest for Bus 8"],["23 Jun 17:40","System","Flagged Bus 9 PSV, 19 days out"],["22 Jun 11:05","Sydney","Uploaded insurance for Bus 2 (photo to PDF)"]].map(a=>`<div class="row"><span class="row-ava">${initials(a[1])}</span><div class="row-main"><b>${a[2]}</b><span>${a[0]} · ${a[1]}</span></div></div>`).join("")}</div>`, {eyebrow:"Who changed what"})}
    </div>
    ${card("Document expiry wall", fbar+tableHTML([{label:"Vehicle",sort:true},{label:"Document",sort:true},{label:"Expires",sort:true},{label:"Countdown",num:true,sort:true},"Status"], rows), {eyebrow:"Every document, every coach", foot:`<button class="ghost" data-toast="RSA paper copy queued to print">${icon("print",15)} Print RSA copy</button>`})}`;
  }
  function fleetMaintenance(){
    const due=VEHICLES.slice().sort((a,b)=>a.svc-b.svc).slice(0,5).map(v=>({ _ent:`vehicle:${v.id}`,
      cells:[`<b>${v.name}</b>`, v.odo.toLocaleString()+" km", `${v.svc.toLocaleString()} km`, bar(100-Math.min(100,v.svc/300), v.svc<2000?"bad":v.svc<10000?"warn":"")] }));
    const bus7=[1.2,1.1,3.04,1.0,1.86,1.2], mos=["Jan","Feb","Mar","Apr","May","Jun"];
    const ledger=[["Bus 7","Gearbox repair",3040,true,[1.2,1.1,3.04,1.0,1.86,1.2]],["Bus 9","Brake overhaul",1860,false,[0.4,0.8,0.6,1.1,1.86,0.9]],["Bus 3","Clutch & DMF",2210,false,[0.5,0.7,1.0,2.21,0.8,0.6]],["Bus 1","Tyres x6",2640,false,[0.6,2.64,0.5,0.7,0.9,1.1]]];
    return `
    ${card("Service due by mileage", tableHTML([{label:"Coach",sort:true},{label:"Odometer",num:true,sort:true},{label:"To next service",num:true,sort:true},"Headroom"], due), {eyebrow:"Flagged at 10,000 km out"})}
    <div class="grid grid-2">
      ${card("Spend anomaly · Bus 7", `${areaTrend(bus7,{labels:mos,target:1.5,targetLabel:"expected ceiling",tone:"danger",h:172})}<p class="brief-p" style="margin-top:12px">The €3,040 gearbox in March sat €1,900 above the expected band for its mileage. Caught after the fact then. The same signal now fires at the first temperature drift, before it becomes a roadside recovery.</p>`, {eyebrow:"The €3k that data could have caught"})}
      ${card("Cost ledger", tableHTML([{label:"Coach",sort:true},"Job",{label:"Cost",num:true,sort:true},"6-mo trend"], ledger.map(l=>({cells:[`<b>${l[0]}</b>`, l[1]+(l[3]?" "+chip("warn","anomaly"):""), eur(l[2]), `<span style="display:inline-block;width:90px">${sparkline(l[4],{w:90,h:24,tone:l[3]?'danger':'accent'})}</span>`]}))), {eyebrow:"Lifetime spend per bus"})}
    </div>
    ${card("Fuel consumption", tableHTML([{label:"Coach",sort:true},{label:"km / litre",num:true,sort:true},"Trend"], VEHICLES.filter(v=>v.kind==="coach").slice(0,6).map(v=>({_ent:`vehicle:${v.id}`,cells:[`<b>${v.name}</b>`, v.mpk.toFixed(1), bar(v.mpk/3.5*100)]}))), {eyebrow:"Litres tracked per coach"})}`;
  }
  /* --- real Ireland, drawn from coordinates -------------------------------
     Coastline is ~60 [lng,lat] points (clockwise from Malin Head), longitude
     corrected by cos(lat) so the island keeps its true proportions, then
     Catmull-Rom smoothed into a flowing coast. Coaches all leave Dublin and
     run to their tour region: each draws the completed leg (solid), the
     remaining leg (faint dashed) and a live marker at its progress. */
  const COAST = [
    [-7.37,55.38],[-7.18,55.29],[-6.97,55.19],[-6.72,55.18],[-6.51,55.24],[-6.36,55.23],[-6.24,55.21],[-6.16,55.21],
    [-6.04,55.13],[-5.97,54.99],[-5.90,54.92],[-5.80,54.85],[-5.71,54.78],[-5.82,54.71],[-5.93,54.63],
    [-5.70,54.67],[-5.55,54.64],[-5.47,54.49],[-5.53,54.38],[-5.58,54.27],[-5.66,54.24],[-5.89,54.22],[-6.05,54.05],
    [-6.20,54.05],[-6.36,53.97],[-6.24,53.86],[-6.22,53.72],[-6.11,53.58],[-6.07,53.42],[-6.05,53.30],
    [-6.06,53.15],[-6.04,52.96],[-6.14,52.79],[-6.22,52.55],[-6.34,52.30],[-6.36,52.18],
    [-6.58,52.17],[-6.93,52.12],[-7.20,52.13],[-7.55,52.06],[-7.85,51.95],[-8.02,51.84],[-8.27,51.79],
    [-8.45,51.70],[-8.70,51.58],[-8.99,51.52],[-9.28,51.50],[-9.55,51.47],[-9.82,51.45],
    [-9.66,51.61],[-9.45,51.68],[-9.70,51.74],[-9.98,51.66],[-10.18,51.62],[-9.88,51.83],[-9.70,51.88],
    [-10.02,51.93],[-10.30,51.93],[-10.12,52.06],[-9.95,52.13],[-10.27,52.14],[-10.46,52.11],[-10.16,52.30],
    [-9.92,52.27],[-9.78,52.42],[-9.66,52.52],[-9.93,52.57],[-9.64,52.68],[-9.36,52.92],[-9.43,52.97],
    [-9.28,53.14],[-9.06,53.15],[-9.06,53.27],
    [-9.40,53.24],[-9.80,53.30],[-10.23,53.40],[-9.98,53.50],[-9.85,53.62],[-9.55,53.78],[-9.88,53.86],
    [-10.20,53.97],[-10.06,54.10],[-9.96,54.30],
    [-9.33,54.33],[-9.10,54.22],[-8.65,54.30],[-8.42,54.47],[-8.20,54.49],[-8.48,54.63],[-8.73,54.70],
    [-8.50,54.84],[-8.33,54.97],[-8.30,55.15],[-7.95,55.22],[-7.72,55.25],[-7.50,55.28],
  ];
  const PLACES = {
    dublin:[-6.20,53.34], galway:[-9.05,53.27], cliffs:[-9.43,52.97], limerick:[-8.62,52.66],
    bunratty:[-8.81,52.70], belfast:[-5.93,54.60], causeway:[-6.51,55.21], glendalough:[-6.33,53.01],
    kilkenny:[-7.25,52.65], wicklow:[-6.05,52.98], cork:[-8.47,51.90], sligo:[-8.47,54.27],
    athlone:[-7.94,53.42], portlaoise:[-7.30,53.03],
  };
  const CITY_LABELS = [["galway","Galway",-44],["cork","Cork",8],["belfast","Belfast",10],
    ["limerick","Limerick",-58],["sligo","Sligo",-38],["kilkenny","Kilkenny",10]];
  const LOUGHS = [ {at:[-6.46,54.62],rx:13,ry:17}, {at:[-9.30,53.46],rx:5,ry:18}, {at:[-8.35,52.95],rx:4,ry:13} ]; // Neagh, Corrib, Derg
  const SHANNON = [[-8.62,52.66],[-8.45,52.83],[-8.10,53.00],[-8.00,53.25],[-8.02,53.42],[-8.00,53.70],[-8.05,54.00]];
  // every coach leaves Dublin; via + dest set the trail, prog is how far along (0..1)
  // lab:[dx,dy] offsets the label off the marker (with a leader line) to de-clutter
  const MAP_ROUTES = [
    { v:"V02", via:["belfast"],                          dest:"causeway", prog:.68, lab:[-150,-6] },
    { v:"V01", via:["athlone","galway"],                 dest:"cliffs",   prog:.12, lab:[70,-46] },
    { v:"V09", via:["athlone","galway"],                 dest:"cliffs",   prog:.55, lab:[-150,2] },
    { v:"V12", via:["athlone"],                          dest:"galway",   prog:.34, lab:[84,-12] },
    { v:"V05", via:["portlaoise","limerick","bunratty"], dest:"cliffs",   prog:.60, lab:[-150,10] },
    { v:"V07", via:["portlaoise"],                       dest:"cork",     prog:.50, lab:[64,54] },
    { v:"V06", via:["wicklow","glendalough"],            dest:"kilkenny", prog:.42, lab:[120,40] },
    { v:"V15", via:[],                                   dest:"sligo",    prog:.22, lab:[70,-80] },
  ];

  function fleetMap(){
    const K = Math.cos(53.5*Math.PI/180), S = 190;
    const rawx = ([lng])=>lng*K*S, rawy = ([,lat])=>-lat*S;
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    COAST.forEach(p=>{ minX=Math.min(minX,rawx(p)); maxX=Math.max(maxX,rawx(p)); minY=Math.min(minY,rawy(p)); maxY=Math.max(maxY,rawy(p)); });
    const PAD=70;
    const P = p => [ +(rawx(p)-minX+PAD).toFixed(1), +(rawy(p)-minY+PAD).toFixed(1) ];
    const VW = +((maxX-minX)+2*PAD).toFixed(1), VH = +((maxY-minY)+2*PAD).toFixed(1);

    const smooth = pts => { const n=pts.length; let d=`M${pts[0][0]},${pts[0][1]}`;
      for(let i=0;i<n;i++){ const a=pts[(i-1+n)%n],b=pts[i],c=pts[(i+1)%n],e=pts[(i+2)%n];
        const c1x=b[0]+(c[0]-a[0])/6,c1y=b[1]+(c[1]-a[1])/6,c2x=c[0]-(e[0]-b[0])/6,c2y=c[1]-(e[1]-b[1])/6;
        d+=` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${c[0]},${c[1]}`; }
      return d+"Z"; };
    const poly = pts => "M"+pts.map(p=>p.join(",")).join(" L");
    const along = (pts,t)=>{ const seg=[]; let tot=0;
      for(let i=0;i<pts.length-1;i++){ const l=Math.hypot(pts[i+1][0]-pts[i][0],pts[i+1][1]-pts[i][1]); seg.push(l); tot+=l; }
      let dist=t*tot,i=0; while(i<seg.length-1 && dist>seg[i]){ dist-=seg[i]; i++; }
      const f=seg[i]?Math.min(1,dist/seg[i]):0;
      const pt=[pts[i][0]+(pts[i+1][0]-pts[i][0])*f, pts[i][1]+(pts[i+1][1]-pts[i][1])*f];
      return { pt, done:pts.slice(0,i+1).concat([pt]) }; };

    const coastPath = smooth(COAST.map(P));
    const loughs = LOUGHS.map(l=>{ const c=P(l.at); return `<ellipse cx="${c[0]}" cy="${c[1]}" rx="${l.rx}" ry="${l.ry}" class="wr-lough"/>`; }).join("");
    const shannon = `<path d="${poly(SHANNON.map(P))}" class="wr-shannon"/>`;
    const cities = CITY_LABELS.map(([k,name,dx])=>{ const c=P(PLACES[k]);
      return `<g class="wr-city"><circle cx="${c[0]}" cy="${c[1]}" r="3"/><text x="${c[0]+(dx<0?dx:dx)}" y="${c[1]+4}" ${dx<0?'text-anchor="end"':''}>${name}</text></g>`; }).join("");

    const dub = P(PLACES.dublin);
    const out = VEHICLES.filter(v=>v.status==="out");
    const routes = MAP_ROUTES.map(r=>{
      const v = veh(r.v); if(!v) return "";
      const pts = [PLACES.dublin, ...r.via.map(k=>PLACES[k]), PLACES[r.dest]].map(P);
      const { pt, done } = along(pts, r.prog);
      const destPt = pts[pts.length-1];
      const pct = Math.round(r.prog*100);
      const name = v.name;
      const txt = `${name} · ${pct}%`;
      const [dx,dy] = r.lab || [60,-30];
      const w = 28 + txt.length*6.9;
      const boxX = dx>=0 ? pt[0]+dx : pt[0]+dx-w;   // box sits to the right (dx>=0) or left of the marker
      const boxY = pt[1]+dy-15;
      const nearX = dx>=0 ? boxX : boxX+w, nearY = boxY+15;
      return `<g class="wr-route">
        <path d="${poly(pts)}" class="wr-route-bg"/>
        <path d="${poly(done)}" class="wr-route-done"/>
        <circle cx="${destPt[0]}" cy="${destPt[1]}" r="5.5" class="wr-route-dest"/>
      </g>
      <g class="wr-mpin" data-ent="vehicle:${r.v}" tabindex="0" role="button" aria-label="${name}">
        <line x1="${pt[0]}" y1="${pt[1]}" x2="${nearX.toFixed(0)}" y2="${nearY.toFixed(0)}" class="wr-leader"/>
        <circle cx="${pt[0]}" cy="${pt[1]}" r="15" class="wr-mpin-halo"/>
        <circle cx="${pt[0]}" cy="${pt[1]}" r="10.5" class="wr-mpin-core"/>
        <svg x="${pt[0]-7.5}" y="${pt[1]-7.5}" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS.bus}</svg>
        <g transform="translate(${boxX.toFixed(0)},${boxY.toFixed(0)})">
          <rect width="${w.toFixed(0)}" height="30" rx="9" class="wr-mpin-bg"/>
          <text x="14" y="19.5" class="wr-mpin-lbl">${name}<tspan class="pct"> · ${pct}%</tspan></text>
        </g>
      </g>`;
    }).join("");

    return `
    ${card("Coaches out now", `
      <div class="wr-map">
        <svg viewBox="0 0 ${VW} ${VH}" class="wr-ireland" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Live map of Ireland with ${out.length} coaches and their routes">
          <defs>
            <linearGradient id="wrLand" x1="0" y1="0" x2="0.2" y2="1">
              <stop offset="0" class="wr-land-a"/><stop offset="1" class="wr-land-b"/>
            </linearGradient>
            <filter id="wrSea" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="3.2"/></filter>
          </defs>
          <path d="${coastPath}" class="wr-coast-halo"/>
          <path d="${coastPath}" class="wr-coast"/>
          ${shannon}${loughs}
          <path d="${coastPath}" class="wr-coast-line"/>
          ${cities}
          ${routes}
          <g class="wr-city wr-origin-g"><circle cx="${dub[0]}" cy="${dub[1]}" r="6.5" class="wr-origin"/><circle cx="${dub[0]}" cy="${dub[1]}" r="2.6" class="wr-origin-c"/><text x="${dub[0]+12}" y="${dub[1]+18}">Dublin</text></g>
        </svg>
      </div>
      <div class="wr-maplegend">
        <span><i class="lg-line done"></i>Completed</span>
        <span><i class="lg-line rem"></i>Remaining</span>
        <span><i class="lg-dot origin"></i>Origin · Dublin</span>
        <span><i class="lg-dot live"></i>Live position</span>
        <span class="muted">Live GPS · ${out.length} coaches on the road</span>
      </div>`, {eyebrow:"Live map of Ireland"})}
    <div class="scaffold-note rise"><span class="badge">${icon("map",18)}</span><span>Fleet, Live Map and Inspections together replace Fleet&nbsp;Go and drop its <b>€300 / month</b> fee.</span></div>`;
  }
  function fleetInspections(){
    const subs = [
      ["Bus 1","Pádraig Nolan","07:02","Pass","ok"],
      ["Bus 5","Seán Ó Conaill","06:58","Tyre wear noted, near side rear","warn"],
      ["Bus 2","Tomasz Wójcik","06:49","Pass","ok"],
      ["Bus 9","Pádraig Nolan","06:40","Wiper smear, washer topped","ok"],
    ];
    return `
    ${card("This morning's inspections", tableHTML(["Coach","Driver","Time","Result"], subs.map(s=>({cells:[`<b>${s[0]}</b>`, s[1], s[2], chip(s[4], s[3])]}))), {eyebrow:"Driver submissions", foot:`<button class="ghost" data-toast="Review queue cleared">${icon("check",15)} Mark reviewed</button>`})}
    ${card("Sydney's review queue", `<div class="rows">
      <div class="row"><span class="row-ava">${icon("alert",16)}</span><div class="row-main"><b>Bus 5 tyre wear</b><span>Flagged by Seán, awaiting Sydney's call on swap</span></div>${chip("warn","Open")}</div>
      <div class="row"><span class="row-ava">${icon("check",16)}</span><div class="row-main"><b>Bus 9 wiper</b><span>Resolved on the spot</span></div>${chip("ok","Cleared")}</div>
    </div>`, {eyebrow:"Needs a decision"})}`;
  }

  /* ---------------------------------------------------- OPERATIONS pages -- */
  function opsRoster(){
    const rows = DEPARTURES.filter(d=>d.status!=="low-load").map(d=>{
      const c=veh(d.coach), dr=per(d.driver), g=per(d.guide);
      return { _ent:`departure:${d.id}`, cells:[ROUTES[d.route].name, ent("vehicle",d.coach,c.name), ent("driver",d.driver,dr.name), ent("driver",d.guide,g.name), statusChip("ok"==="ok"&&"available"?"on-tour":"on-tour")] };
    });
    const cover = PEOPLE.filter(p=>p.status==="available").map(p=>`<div class="row"><span class="row-ava">${initials(p.name)}</span><div class="row-main"><b>${p.name}</b><span>${p.role} · ${p.certs.join(", ")}</span></div>${statusChip("available")}</div>`).join("");
    return `
    <div class="scaffold-note rise"><span class="badge">${icon("spark",18)}</span><span>Auto-build draws crew from availability, certs and tachograph headroom, then pairs a guide to each coach. <button class="ghost" data-toast="Roster auto-built. Drag any pair to reassign.">${icon("spark",14)} Auto-build today</button></span></div>
    ${card("Today's pairing", tableHTML(["Route","Coach","Driver","Guide","Status"], rows), {eyebrow:"Drag-drop ready · conflicts flag live"})}
    ${card("Conflicts caught", `<div class="rows">
      <div class="row"><span class="row-ava">${icon("alert",16)}</span><div class="row-main"><b>Pádraig near hours limit</b><span>Cannot take Friday Galway, 53h40 of 56h</span></div>${chip("bad","Blocked")}</div>
      <div class="row"><span class="row-ava">${icon("alert",16)}</span><div class="row-main"><b>Dan not certified for coach</b><span>Private only, kept on the Exec run</span></div>${chip("warn","Flagged")}</div>
    </div>`, {eyebrow:"On drop"})}
    ${card("Sickness cover", cover ? `<div class="rows">${cover}</div>` : "", {eyebrow:"Marek out sick · free crew", foot:`<button class="ghost" data-toast="Liam Gallagher slotted to cover">Assign cover</button>`})}`;
  }
  const DEP_TIMES={ "DEP-CMG":[7.0,19.0], "DEP-CMB":[6.83,18.83], "DEP-BGC":[6.75,19.75], "DEP-KWG":[7.17,18.17], "DEP-EXC":[8.0,18.0] };
  function opsToday(){
    const out=VEHICLES.filter(v=>v.status==="out").length;
    const sold=DEPARTURES.reduce((a,d)=>a+d.sold,0);
    const load=Math.round(DEPARTURES.reduce((a,d)=>a+d.sold/d.cap,0)/DEPARTURES.length*100);
    const tlRows=DEPARTURES.map(d=>{ const t=DEP_TIMES[d.id]||[8,18];
      return { label:ROUTES[d.route].name.split(/[ ,&]/)[0], start:t[0], end:t[1], tone:d.status==="low-load"?"danger":d.status==="private"?"ink":"accent", tag:`${d.sold}/${d.cap}` }; });
    const rows=DEPARTURES.map(d=>{ const c=veh(d.coach), dr=per(d.driver); const l=Math.round(d.sold/d.cap*100);
      return { _ent:`departure:${d.id}`, cells:[ `<b>${ROUTES[d.route].name}</b>`, ent("vehicle",d.coach,c.name), ent("driver",d.driver,dr.name), `<span class="wr-seatcell">${d.sold}/${d.cap} ${bar(l, l<50?"bad":l<75?"warn":"")}</span>`, statusChip(d.status) ] }; });
    return `
    <div class="wr-strip">
      ${tile({label:"Coaches out",value:String(out),raw:out,sub:"of 16",spark:[6,7,8,7,8,8]})}
      ${tile({label:"Seats sold today",value:String(sold),raw:sold,sub:DEPARTURES.length+" departures",delta:{dir:"up",v:"6%"},spark:[142,151,160,158,165,sold]})}
      ${tile({label:"Avg load factor",value:String(load),suf:"%",raw:load,sub:"weighted",delta:{dir:"up",v:"3pt"},spark:[71,73,72,74,75,load]})}
      ${tile({label:"Open alerts",value:String(ALERTS.filter(a=>a.urg==="red").length),sub:"red-line, need you",go:"__alerts"})}
    </div>
    ${card("The day, across the clock", timeline(tlRows,{domain:[6,21],ticks:[{at:7,label:"7am"},{at:10,label:"10"},{at:13,label:"1pm"},{at:16,label:"4"},{at:19,label:"7pm"}]}), {eyebrow:"Every departure on one timeline"})}
    ${card("Every departure today", tableHTML([{label:"Route",sort:true},"Coach","Driver",{label:"Seats",num:true,sort:true},"Status"], rows), {eyebrow:"Click any row · Fleet + Ops + Bookings", foot:`<button class="ghost" data-toast="Run sheet generated for all 5 departures">${icon("doc",15)} Generate run sheet</button>`})}`;
  }
  function opsManifest(){
    const d=dep("DEP-CMG"), c=veh(d.coach);
    const names=["Hannah Whitaker","Brad & Cindy Olsen (2)","The Petersen party (5)","Greta Hoffmann","Émile Laurent","K. Tanaka (2)","R. Singh","M. O'Brien"];
    const chans=["Direct","Direct","Viator","DoDublin","Bresno","Viator","Direct","Big Bus"];
    const tone={Direct:"ok",Viator:"warn",Bresno:"bad",DoDublin:"neutral","Big Bus":"neutral"};
    const rows=names.map((n,i)=>({ cells:[n, n.includes("(")?n.match(/\((\d)\)/)[1]:"1", ROUTES[d.route].pickups[i%ROUTES[d.route].pickups.length].split(" ").slice(1).join(" "), chip(tone[chans[i]]||"neutral",chans[i])] }));
    return `
    ${card(`Manifest · ${ROUTES[d.route].name}`, `<div class="wr-split" style="grid-template-columns:170px 1fr;align-items:start">
      <div style="text-align:center">${ringStat(d.sold,d.cap,{tone:"accent",center:`<b>${d.sold}/${d.cap}</b><span>seats</span>`})}<div class="muted" style="margin-top:10px">${c.name} · ${c.reg}</div></div>
      <div><div class="wr-manhead">Driver ${ent("driver",d.driver,per(d.driver).name)} · guide ${ent("driver",d.guide,per(d.guide).name)}</div>${tableHTML([{label:"Lead passenger",sort:true},{label:"Party",num:true,sort:true},"Pickup","Channel"], rows)}</div>
    </div>`, {eyebrow:"Auto-built from Bookings · channels colour-coded", foot:`<button class="ghost" data-toast="Manifest sent to Pádraig's run sheet">${icon("arrowup",14)} Send to driver</button>`})}
    <div class="scaffold-note rise"><span class="badge">${icon("ticket",18)}</span><span>One manifest per coach, regenerated the moment a booking lands on any channel. No spreadsheet, no double entry.</span></div>`;
  }
  function opsHours(){
    const drivers=PEOPLE.filter(p=>p.role==="Driver").slice().sort((a,b)=>b.hrs-a.hrs);
    const fortnight=p=>[p.hrs*0.12,p.hrs*0.28,p.hrs*0.43,p.hrs*0.58,p.hrs*0.72,p.hrs*0.87,p.hrs];
    const cards=drivers.map(p=>{ const pct=Math.round(p.hrs/HR_LIMIT*100), tone=pct>=95?"danger":pct>=85?"warn":"accent";
      return `<button class="card lift rise wr-hourcard" data-ent="driver:${p.id}">
        <div class="wr-hc-ring">${ringStat(p.hrs,HR_LIMIT,{size:92,thick:9,tone,center:`<b>${p.hrs.toFixed(0)}</b><span>/ ${HR_LIMIT}h</span>`})}</div>
        <div class="wr-hc-main"><div class="wr-hc-top"><b>${p.name}</b>${pct>=95?chip("bad","Red-line"):pct>=85?chip("warn","Watch"):chip("ok","OK")}</div>
          <div class="muted">${p.days} days worked · this fortnight</div>
          <div class="wr-hc-spark">${sparkline(fortnight(p),{w:160,h:30,tone})}</div></div>
      </button>`; }).join("");
    return `
    ${card("Tachograph board", `<div class="wr-hourgrid">${cards}</div>`, {eyebrow:"Sorted by risk · red-line first · 16 to 18 days a month tracked"})}
    ${card("Why it matters", `<p class="brief-p">The board reads straight off the tachograph, so the red-line shows before a driver is rostered over the limit, not after the fine. Pádraig is the one to watch this fortnight.</p>`, {eyebrow:"Red-line before the run, not after"})}`;
  }

  /* ------------------------------------------------------ BOOKINGS pages -- */
  function bkSeats(){
    const sold=DEPARTURES.reduce((a,d)=>a+d.sold,0);
    const cap=DEPARTURES.reduce((a,d)=>a+d.cap,0);
    const load=Math.round(sold/cap*100);
    const nearFull=DEPARTURES.filter(d=>d.sold/d.cap>=0.95).length;
    const low=DEPARTURES.filter(d=>d.sold/d.cap<0.5).length;
    const rows = DEPARTURES.map(d=>{ const load=Math.round(d.sold/d.cap*100); const over = d.sold>d.cap;
      const name = `<b>${ROUTES[d.route].name}</b>` + (d.when?` <span class="muted">${d.when}</span>`:"");
      return { _ent:`departure:${d.id}`, cells:[ name, `${d.sold} / ${d.cap}`, bar(load, load<50?"bad":load<75?"warn":""), over?chip("bad","Oversell"):load>=98?chip("warn","Near full"):chip("ok","Open") ] }; });
    return `
    <div class="wr-strip">
      ${tile({label:"Seats sold today",value:String(sold),raw:sold,sub:cap+" seats available",delta:{dir:"up",v:"6%"},spark:[142,151,160,158,165,sold]})}
      ${tile({label:"Avg load factor",value:String(load),suf:"%",raw:load,sub:"across "+DEPARTURES.length+" departures",delta:{dir:"up",v:"3pt"},spark:[71,73,72,74,75,load]})}
      ${tile({label:"Near full",value:String(nearFull),sub:"95%+ sold, hold a waitlist"})}
      ${tile({label:"Low-load",value:String(low),sub:"under break-even",tone:"danger"})}
    </div>
    ${card("One live seat count per departure", tableHTML([{label:"Departure",sort:true},{label:"Sold / Cap",num:true,sort:true},"Load","Status"], rows), {eyebrow:"Every channel, one number · oversell prevented"})}
    <div class="scaffold-note rise"><span class="badge">${icon("ticket",18)}</span><span>Rezgo, Viator, Bresno, Big Bus and DoDublin all write to the same seat count. The number you see is the number that exists.</span></div>`;
  }
  function bkChannels(){
    const TONES=["accent","ink","warn","mute","danger"];
    const direct=CHANNELS.find(c=>c.id==="direct").share;
    const blended=Math.round(CHANNELS.reduce((a,c)=>a+c.share*c.comm,0)/CHANNELS.reduce((a,c)=>a+c.share,0)*10)/10;
    const segs=CHANNELS.map((c,i)=>({label:c.name.replace(/ \(.*\)/,""),value:c.share,tone:TONES[i%TONES.length]}));
    const rows = CHANNELS.map((c,i)=>({ cells:[
      `<span class="wr-chan"><i class="dl-sw tone-${TONES[i%TONES.length]}"></i><b>${c.name}</b></span>`,
      c.comm===0?chip("ok","0% · direct"):c.comm+"%",
      `<span class="wr-seatcell">${c.share}% ${bar(c.share,c.comm===0?"":"warn")}</span>` ] }));
    return `
    <div class="wr-strip">
      ${tile({label:"Direct share",value:String(direct),suf:"%",raw:direct,sub:"commission-free bookings",delta:{dir:"up",v:"2pt"},spark:[28,30,31,32,33,direct]})}
      ${tile({label:"Blended commission",value:String(blended),suf:"%",raw:blended,dec:1,sub:"weighted across all channels"})}
      ${tile({label:"Commission this month",value:"41.2",pre:"€",suf:"k",raw:41.2,dec:1,sub:"paid to OTAs",tone:"danger"})}
    </div>
    <div class="grid grid-2">
      ${card("Booking mix", `<div class="wr-split"><div>${donut(segs,{center:`<b>${direct}%</b><span>direct</span>`})}</div><div>${donutLegend(segs)}</div></div>`, {eyebrow:"Share of bookings by channel"})}
      ${card("Commission ladder", hbars(CHANNELS.map((c,i)=>({label:c.name.replace(/ \(.*\)/,""),value:c.comm,tone:c.comm===0?"accent":c.comm>=25?"danger":"warn"})),{fmt:v=>v+"%"}), {eyebrow:"What each channel costs you"})}
    </div>
    ${card("Every channel in one view", tableHTML([{label:"Channel",sort:true},{label:"Commission",num:true,sort:true},{label:"Share of bookings",num:true,sort:true}], rows), {eyebrow:"Direct vs OTA at a glance"})}`;
  }
  function bkPickups(){
    return `<div class="grid grid-2">${Object.entries(ROUTES).map(([id,r])=>card(r.name, `<div class="rows">${r.pickups.map(p=>`<div class="row"><span class="row-ava">${icon("pin",15)}</span><div class="row-main"><b>${p.split(" ")[0]}</b><span>${p.split(" ").slice(1).join(" ")}</span></div></div>`).join("")}</div>`, {eyebrow:"Morning pickups"})).join("")}</div>`;
  }
  function bkConfirm(){
    return `
    ${card("Confirmation automation", `<div class="rows">
      <div class="row"><span class="row-ava">${icon("check",16)}</span><div class="row-main"><b>Instant confirmation</b><span>Sent on every booking, all channels, with pickup point and time</span></div>${chip("ok","On")}</div>
      <div class="row"><span class="row-ava">${icon("doc",16)}</span><div class="row-main"><b>Day-before reminder</b><span>Pickup, weather and what to bring, 18:00 the evening prior</span></div>${chip("ok","On")}</div>
    </div>`, {eyebrow:"No manual emails"})}
    ${card("Self-serve flexible return seat", `<p class="brief-p">Guests who want a different coach back pick their return online, the seat count updates live, and the office phone stops ringing at noon. The single change Wild Rover asked for, built in.</p>
      <div class="b-actions"><button class="ghost" data-toast="Return-seat link copied">Copy guest link</button></div>`, {eyebrow:"Kills the noon phone call"})}`;
  }
  function bkAttribution(){
    const data=[["Direct (Rezgo)",2.3,34],["Viator",6.1,27],["Bresno",5.4,14],["Big Bus",1.1,13],["DoDublin",0.8,12]];
    const avg=Math.round(data.reduce((a,r)=>a+r[1]*r[2],0)/data.reduce((a,r)=>a+r[2],0)*10)/10;
    const tlRows=data.map(r=>({ label:r[0].replace(/ \(.*\)/,""), start:0, end:r[1], tone:r[1]>=5?"ink":r[1]<=1.5?"warn":"accent", tag:r[1]+" days" }));
    return `
    ${card("How far ahead each channel books", timeline(tlRows,{domain:[0,7],ticks:[{at:1,label:"1 day"},{at:3,label:"3 days"},{at:5,label:"5 days"},{at:7,label:"1 week"}]}), {eyebrow:`On average, guests book ${avg} days before the tour`})}
    <div class="scaffold-note rise"><span class="badge">${icon("ticket",18)}</span><span>Long bars book early, so you can plan crew and coaches around them. Short bars fill the last seats close to departure.</span></div>`;
  }

  /* ----------------------------------------------------- CUSTOMERS pages -- */
  function crmDirectory(){
    const segDonut=[{label:"American",value:70,tone:"accent"},{label:"European",value:21,tone:"ink"},{label:"Irish & other",value:9,tone:"mute"}];
    const grpDonut=[{label:"Solo",value:58,tone:"accent"},{label:"Group",value:24,tone:"warn"},{label:"Repeat",value:18,tone:"ink"}];
    const avg=Math.round(CUSTOMERS.reduce((a,c)=>a+c.ltv,0)/CUSTOMERS.length);
    const ltvDist=CUSTOMERS.map(c=>c.ltv).sort((a,b)=>a-b);
    const rows=CUSTOMERS.map(c=>({ _ent:`customer:${c.id}`, cells:[`<b>${c.name}</b>`, c.region, c.type, String(c.trips), eur(c.ltv), c.src] }));
    return `
    <div class="grid grid-2">
      ${card("Origin mix", `<div class="wr-split"><div>${donut(segDonut,{center:`<b>70%</b><span>American</span>`})}</div><div>${donutLegend(segDonut)}</div></div>`, {eyebrow:"Who travels with Wild Rover"})}
      ${card("Traveller type", `<div class="wr-split"><div>${donut(grpDonut,{center:`<b>24%</b><span>in groups</span>`})}</div><div>${donutLegend(grpDonut)}</div></div>`, {eyebrow:"Solo vs group vs repeat"})}
    </div>
    ${card("Average lifetime value", `<div class="wr-ltv"><div><div class="kpi-val">${eur(avg)}</div><div class="kpi-sub">repeat guests run about 3x higher</div></div><div class="wr-ltv-spark">${sparkline(ltvDist,{w:260,h:54,kind:"area"})}<span class="muted">value distribution across the base</span></div></div>`, {eyebrow:"LTV"})}
    ${card("Directory", tableHTML([{label:"Name",sort:true},{label:"Region",sort:true},{label:"Type",sort:true},{label:"Trips",num:true,sort:true},{label:"LTV",num:true,sort:true},{label:"Source",sort:true}], rows), {eyebrow:"Central database · click a guest for full history"})}`;
  }
  let wrRevPlat="all";
  function crmReviews(){
    const pos=REVIEWS.filter(r=>r.sent==="pos").length, neu=REVIEWS.filter(r=>r.sent==="neu").length, neg=REVIEWS.filter(r=>r.sent==="neg").length;
    const sentDonut=[{label:"Positive",value:pos,tone:"accent"},{label:"Neutral",value:neu,tone:"warn"},{label:"Negative",value:Math.max(neg,0.0001),tone:"danger"}];
    const list=REVIEWS.filter(r=>wrRevPlat==="all"||r.chan===wrRevPlat).map(r=>`<div class="wr-review">
      <div class="wr-review-top"><b>${r.who}</b><span class="muted">${r.chan} · ${r.when}</span><span class="wr-stars">${"★".repeat(r.stars)}${"☆".repeat(5-r.stars)}</span></div>
      <p class="wr-review-text">${r.text}</p>
      <div class="wr-review-foot">${chip(r.sent==="pos"?"ok":r.sent==="neu"?"warn":"bad", r.sent==="pos"?"Positive":r.sent==="neu"?"Neutral":"Negative")}
        ${r.replied?chip("neutral","Replied"):`<button class="ghost" data-toast="Reply drafted in your voice for ${r.who}">${icon("message",14)} Respond</button>`}</div>
    </div>`).join("");
    const themes=[["Guide",184,"ok"],["Pickup",96,"ok"],["Scenery",142,"ok"],["Lunch stop",38,"warn"],["Timing",27,"warn"]];
    return `
    <div class="wr-strip">
      ${tile({label:"Total reviews",value:"64.2",suf:"k",raw:64.2,dec:1,suf:"k",sub:"TripAdvisor + Google",delta:{dir:"up",v:"2%"},spark:[61,61.6,62.3,63,63.7,64.2]})}
      ${tile({label:"Five star",value:"95",suf:"%",raw:95,sub:"of all reviews",spark:[94,94,95,95,95,95]})}
      ${tile({label:"Avg rating",value:"4.9",raw:4.9,dec:1,sub:"both platforms",delta:{dir:"up",v:"0.1"},spark:[4.7,4.8,4.8,4.9,4.9,4.9]})}
      ${tile({label:"Awaiting reply",value:String(REVIEWS.filter(r=>!r.replied).length),sub:"in the inbox"})}
    </div>
    <div class="grid grid-2">
      ${card("Rating over time", areaTrend([4.7,4.8,4.8,4.9,4.9,4.9],{labels:["Jan","Feb","Mar","Apr","May","Jun"],h:168}), {eyebrow:"4.9 and holding"})}
      ${card("Sentiment split", `<div class="wr-split"><div>${donut(sentDonut,{center:`<b>${Math.round(pos/REVIEWS.length*100)}%</b><span>positive</span>`})}</div><div>${donutLegend(sentDonut)}</div></div>`, {eyebrow:"Across the inbox"})}
    </div>
    ${card("Most-mentioned themes", `<div class="wr-themes">${themes.map(t=>`<span class="wr-theme ${t[2]}">${t[0]} <b>${t[1]}</b></span>`).join("")}</div>`, {eyebrow:"What guests talk about"})}
    ${card("Review inbox", `<div class="wr-seg2" style="margin-bottom:16px">${["all","TripAdvisor","Google"].map(p=>`<button data-revplat="${p}" class="${wrRevPlat===p?'on':''}">${p==="all"?"All platforms":p}</button>`).join("")}</div><div class="wr-reviews">${list}</div>`, {eyebrow:"One inbox · sentiment · auto-request after tour"})}`;
  }
  function crmPipeline(){
    const VAL={ "Enquiry":[3150,2250], "Quoted":[1200,3750], "Confirmed":[840] };
    const PAX={ "Enquiry":[42,30], "Quoted":[16,50], "Confirmed":[7] };
    const totals=PIPELINE.map((c,ci)=>({stage:c.stage, n:c.items.length, val:(VAL[c.stage]||[]).reduce((a,b)=>a+b,0)}));
    const grand=totals.reduce((a,t)=>a+t.val,0);
    const convbar=`<div class="wr-convbar">${totals.map((t,i)=>`<span class="cv" style="flex:${t.n}"><span class="cv-l">${t.stage}</span><span class="cv-v">${t.n} · ${eur(t.val)}</span></span>`).join("")}</div>`;
    const board=`<div class="wr-board">${PIPELINE.map((col,ci)=>`<div class="wr-col">
      <div class="wr-col-h">${col.stage}<span class="wr-col-n">${eur(totals[ci].val)}</span></div>
      ${col.items.map((it,ii)=>`<div class="wr-deal card lift"><b>${it[0]}</b><span class="muted">${it[1]}</span><div class="wr-deal-foot"><span>${(PAX[col.stage]||[])[ii]||"—"} pax</span><b>${eur((VAL[col.stage]||[])[ii]||0)} est</b></div></div>`).join("")}
    </div>`).join("")}</div>`;
    return `${card("Group & charter pipeline", `${convbar}${board}`, {eyebrow:`${eur(grand)} in play across ${PIPELINE.reduce((a,c)=>a+c.items.length,0)} enquiries`})}`;
  }
  function crmCampaigns(){
    return `
    <div class="wr-strip">
      ${tile({label:"Post-tour open rate",value:"62",suf:"%",raw:62,sub:"review-request email",delta:{dir:"up",v:"4pt"},spark:[54,56,58,59,61,62]})}
      ${tile({label:"Bookings driven / mo",value:"148",raw:148,sub:"from campaigns",delta:{dir:"up",v:"11%"},spark:[110,118,126,131,140,148]})}
      ${tile({label:"Win-back rate",value:"7.4",suf:"%",raw:7.4,dec:1,sub:"lapsed guests returning",spark:[5.8,6.2,6.6,6.9,7.1,7.4]})}
    </div>
    <div class="grid grid-2">
      ${card("Post-tour follow-up", `<p class="brief-p">Every guest gets a thank-you with a review request 3 hours after drop-off, while the day is still fresh. That cadence is what feeds the 64k reviews.</p><div style="margin-top:14px">${sparkline([110,118,126,131,140,148],{w:240,h:36,kind:"area"})}</div>`, {eyebrow:"Automatic", foot:`<button class="ghost" data-toast="Flow is live">${icon("check",14)} Live</button>`})}
      ${card("Re-marketing & upsell", `<div class="rows">
        <div class="row"><span class="row-ava">${icon("megaphone",15)}</span><div class="row-main"><b>Win-back, lapsed 12 months</b><span>Email + SMS · 1,240 guests · 41% open</span></div>${chip("ok","Scheduled")}</div>
        <div class="row"><span class="row-ava">${icon("ticket",15)}</span><div class="row-main"><b>Bundle nudge: add Game of Thrones</b><span>To Belfast bookers · 7 days out · 18% attach</span></div>${chip("warn","Draft")}</div>
        <div class="row"><span class="row-ava">${icon("star",15)}</span><div class="row-main"><b>Birthday discount</b><span>10% off · evergreen</span></div>${chip("neutral","Idea")}</div>
      </div>`, {eyebrow:"Email / SMS"})}
    </div>`;
  }

  /* ----------------------------------------------------- MARKETING pages -- */
  function mkRoi(){
    const tot=MKT_SPEND.reduce((a,c)=>a+c.spend,0), book=MKT_SPEND.reduce((a,c)=>a+c.bookings,0);
    const items=MKT_SPEND.map(c=>({label:c.chan.split(" ")[0], spend:c.spend, book:c.bookings}));
    const cpb=MKT_SPEND.map(c=>({chan:c.chan,v:c.spend/c.bookings})).sort((a,b)=>a.v-b.v);
    const cheap=cpb[0].chan, dear=cpb[cpb.length-1].chan;
    const cpbBars=cpb.map(c=>({label:c.chan, value:Math.round(c.v), tone:c.chan===cheap?'accent':c.chan===dear?'warn':'ink'}));
    const rows=MKT_SPEND.map(c=>({ cells:[`<b>${c.chan}</b>`, eur(c.spend), String(c.bookings), eur(c.spend/c.bookings)+(c.chan===cheap?' '+chip('ok','cheapest'):c.chan===dear?' '+chip('warn','dearest'):'')] }));
    const cos6=[24.1,23.5,23.0,22.8,22.6,22.4], mos=["Jan","Feb","Mar","Apr","May","Jun"];
    return `
    <div class="wr-strip">
      ${tile({label:"Spend this month",value:eur(tot).slice(1),pre:"€",raw:tot,sub:"~"+eur(tot*12)+" a year",delta:{dir:"up",v:"4%"},spark:[16800,17900,18400,19100,19400,19800]})}
      ${tile({label:"Cost per booking",value:String(Math.round(tot/book)),pre:"€",raw:Math.round(tot/book),sub:book+" bookings this month",delta:{dir:"down",v:"3%"},spark:[19,18.4,18,17.6,17.3,17]})}
      ${tile({label:"Cost of sales",value:COS_ACTUAL.toFixed(1),suf:"%",raw:COS_ACTUAL,dec:1,sub:"target "+COS_TARGET+"%",delta:{dir:"down",v:"0.2pt"},spark:cos6})}
      ${tile({label:"Vs 20% target",value:"+"+(COS_ACTUAL-COS_TARGET).toFixed(1),suf:"pt",sub:"OTA mix is the cause",go:"finance"})}
    </div>
    ${card("Cost of sales against the 20% target", `<div class="wr-split"><div class="wr-chartwrap">${gauge(COS_ACTUAL,{max:30,target:COS_TARGET})}</div><div class="wr-chartwrap">${areaTrend(cos6,{labels:mos,target:COS_TARGET,targetLabel:"target 20%",tone:"warn",h:172})}</div></div>`, {eyebrow:"Needle in amber · 6 months trending toward target"})}
    ${card("Spend vs bookings by channel", `${barCompare(items,{s1:"spend",s2:"book",lab1:"Spend",lab2:"Bookings",fmt1:v=>eur(v),fmt2:v=>v})}<div style="margin-top:20px">${tableHTML([{label:"Channel",sort:true},{label:"Spend",num:true,sort:true},{label:"Bookings",num:true,sort:true},{label:"Cost / booking",num:true,sort:true}], rows)}</div>`, {eyebrow:"Every channel, one screen"})}
    ${card("Cost per booking, ranked", hbars(cpbBars,{fmt:v=>eur(v)}), {eyebrow:"Cheapest green, dearest amber"})}`;
  }
  let wrTrendPlat="all", wrTrendSort="mom";
  function mkTrends(){
    let list=TRENDS.slice();
    if(wrTrendPlat!=="all") list=list.filter(t=>t.plat===wrTrendPlat);
    if(wrTrendSort==="mom") list.sort((a,b)=>b.mom-a.mom);
    const top=TRENDS.reduce((m,t)=>t.mom>m.mom?t:m,TRENDS[0]);
    const platIc=p=>p==="TikTok"?"waveform":p==="Instagram"?"camera":"play";
    const cards=list.map(t=>{ const hot=t===top;
      return `<div class="wr-trend card lift ${hot?'hot':''}">
        ${hot?`<span class="wr-hotflag">${icon("trending",12)} Fastest rising</span>`:""}
        <div class="wr-trend-top"><span class="wr-trend-plat">${icon(platIc(t.plat),14)} ${t.plat}</span>${chip(t.mom>=30?"ok":t.mom>=20?"warn":"neutral","+"+t.mom+"%")}</div>
        <b class="wr-trend-tag">${t.tag}</b>
        <div class="wr-trend-spark">${sparkline(t.spark,{w:210,h:34,kind:"area",tone:t.mom>=30?"accent":"ink"})}</div>
        <div class="wr-trend-why">${t.why}</div>
        <button class="ghost" data-toast="Added '${t.tag}' to the content calendar as a draft">${icon("spark",14)} Turn into a content angle</button>
      </div>`; }).join("");
    return `
    <div class="wr-controls">
      <div class="wr-seg2">${["all","TikTok","Instagram","Reels"].map(p=>`<button data-trendplat="${p}" class="${wrTrendPlat===p?'on':''}">${p==="all"?"All platforms":p}</button>`).join("")}</div>
      <div class="wr-seg2">${[["mom","Momentum"],["new","Newest"]].map(s=>`<button data-trendsort="${s[0]}" class="${wrTrendSort===s[0]?'on':''}">${s[1]}</button>`).join("")}</div>
    </div>
    <div class="wr-trends">${cards}</div>`;
  }
  function mkContent(){
    const rows = CONTENT.map(c=>({ cells:[`<b>${c[0]}</b>`, c[1], chip(c[2]==="Scheduled"?"ok":c[2]==="Draft"?"warn":"neutral", c[2])] }));
    return `
    ${card("This week's calendar", tableHTML(["Day","Post","Status"], rows), {eyebrow:"AI-drafted · replaces the €1,500 / month agency", foot:`<button class="ghost" data-toast="Draft generated">${icon("spark",15)} Draft next week</button>`})}`;
  }
  function mkChannels(){
    const ch=[
      { name:"SEO", health:["ok","Healthy"], tone:"accent", spark:[40,44,48,52,58,64,70],
        stats:[["Tracked keywords","142"],["Top keyword","“day tours from Dublin” · #2"],["Impressions / mo","318k"],["Clicks / mo","9.2k"]],
        more:[["Avg position","6.4"],["Page-1 keywords","38"],["Backlinks","1,240"]] },
      { name:"Google Ads", health:["ok","Healthy"], tone:"accent", spark:[3.9,4.1,4.3,4.4,4.6,4.7,4.8],
        stats:[["Spend / mo","€8,200"],["ROAS","4.8x"],["Conversions","386"],["CPC","€0.74"]],
        more:[["Impression share","41%"],["Top campaign","Cliffs of Moher · exact"],["CTR","6.1%"]] },
      { name:"Instagram", health:["ok","Healthy"], tone:"accent", spark:[10.8,11.1,11.4,11.7,12.0,12.2,12.4],
        stats:[["Followers","12.4k"],["Growth / mo","+6%"],["Reach / mo","148k"],["Engagement","4.2%"]],
        more:[["Best post","Cliffs golden hour"],["Story replies","320"],["Saves / mo","2.1k"]] },
      { name:"TikTok", health:["warn","Building"], tone:"warn", spark:[1.2,1.8,2.4,3.1,3.9,4.8,5.6],
        stats:[["Views / mo","312k"],["Reels over 50k","3"],["Followers","5.8k"],["Follower growth","+22%"]],
        more:[["Top video","Wild Atlantic Way · 142k"],["Avg watch","61%"],["Shares / mo","1.4k"]] },
    ];
    return `<div class="wr-scards">${ch.map(c=>`
      <details class="wr-scard card lift" ${c.name==="SEO"?"open":""}>
        <summary>
          <div class="sc-head"><b>${c.name}</b>${chip(c.health[0],c.health[1])}</div>
          <div class="sc-spark">${sparkline(c.spark,{w:150,h:34,kind:"area",tone:c.tone})}</div>
          <span class="sc-caret">${icon("chevdown",16)}</span>
        </summary>
        <div class="sc-stats">${c.stats.map(s=>`<div class="sc-stat"><span>${s[0]}</span><b>${s[1]}</b></div>`).join("")}</div>
        <div class="sc-more"><div class="sc-stats">${c.more.map(s=>`<div class="sc-stat"><span>${s[0]}</span><b>${s[1]}</b></div>`).join("")}</div></div>
      </details>`).join("")}</div>`;
  }
  function mkWebsite(){
    const sources=[{label:"Direct",value:34,tone:"accent"},{label:"Organic",value:28,tone:"ink"},{label:"Google Ads",value:18,tone:"warn"},{label:"Meta",value:12,tone:"mute"},{label:"OTA referral",value:8,tone:"danger"}];
    const sessions=[3.1,3.0,3.4,3.6,3.5,3.9,4.2,4.1,4.5,4.7,4.6,5.0];
    const pages=[["Cliffs of Moher tour","18.6k","4.1%"],["Belfast & Causeway tour","11.2k","3.6%"],["Homepage","22.4k","1.2%"],["Checkout","6.2k","57%"]];
    const fn=[{label:"Visited site",value:42800},{label:"Viewed a tour",value:18600},{label:"Started checkout",value:6200},{label:"Booked",value:3540}];
    return `
    <div class="wr-strip">
      ${tile({label:"Sessions / mo",value:"48.2",suf:"k",raw:48.2,dec:1,suf:"k",sub:"unique visitors 38.4k",delta:{dir:"up",v:"9%"},spark:sessions})}
      ${tile({label:"Avg session",value:"2m 41s",sub:"pages / visit 3.4"})}
      ${tile({label:"Bounce rate",value:"38",suf:"%",raw:38,sub:"down from 44%",delta:{dir:"down",v:"6pt"},spark:[44,43,42,41,40,39,38]})}
      ${tile({label:"Direct-booking rate",value:"34",suf:"%",raw:34,sub:"every point off OTA is margin",delta:{dir:"up",v:"3pt"},spark:[28,29,30,31,32,33,34]})}
    </div>
    ${card("Sessions over time", areaTrend(sessions,{labels:["","Wk2","","Wk4","","Wk6","","Wk8","","Wk10","","Wk12"],h:180}), {eyebrow:"Last 12 weeks · the site they manage"})}
    <div class="grid grid-2">
      ${card("Traffic sources", `<div class="wr-split"><div>${donut(sources,{center:`<b>34%</b><span>direct</span>`})}</div><div>${donutLegend(sources)}</div></div>`, {eyebrow:"Where visitors come from"})}
      ${card("Booking funnel", funnel(fn), {eyebrow:"Visit to booked · drop-off visible"})}
    </div>
    ${card("Top pages", tableHTML([{label:"Page",sort:true},{label:"Views",num:true,sort:true},{label:"Conversion",num:true,sort:true}], pages.map(p=>({cells:[`<b>${p[0]}</b>`,p[1],p[2]]}))), {eyebrow:"Most-visited, with conversion"})}
    ${card("Redesign & the OTA story", `<p class="brief-p">The current site was called very average. The redesign carries the premium positioning the reviews already earn, with direct booking front and centre. At 34% direct today, every point pulled off OTA commission is margin kept.</p>`, {eyebrow:"Why ACMR runs the site", foot:`<button class="ghost" data-toast="Staging preview opening">View staging</button>`})}`;
  }
  function mkCompetitors(){
    const routes=[["cliffs","Cliffs of Moher day"],["causeway","Belfast & Causeway day"],["kwg","Kilkenny & Wicklow day"]];
    const priceBars=routes.map(([k,lbl])=>{ const field=COMPETITORS.filter(c=>c[k]>0).sort((a,b)=>b[k]-a[k]);
      return `<div class="wr-pricepos"><div class="eyebrow">${lbl}</div>${hbars(field.map(c=>({label:(c.us?"★ ":"")+c.name, value:c[k], tone:c.us?'accent':'ink'})),{fmt:v=>eur(v)})}</div>`; }).join("");
    const moveChip=m=> m===0 ? `<span class="muted">held</span>` : chip(m>0?'neutral':'ok', (m>0?'▲ €':'▼ €')+Math.abs(m)+" this week");
    const rows=COMPETITORS.map(c=>({ _ent:`competitor:${c.name}`, cells:[
      `<b>${c.name}</b>${c.us?" "+chip("ok","You"):""}`,
      eur(c.cliffs), c.causeway?eur(c.causeway):"<span class='muted'>—</span>",
      `★ ${c.rating} <span class="muted">${(c.reviews/1000).toFixed(c.reviews>=10000?0:1)}k</span>`,
      `#${c.viator}`, c.ads?chip("warn","Live"):`<span class="muted">off</span>`,
      c.social+"k", moveChip(c.move) ] }));
    return `
    ${card("Where Wild Rover sits on price", `<div class="wr-priceposes">${priceBars}</div>`, {eyebrow:"Premium and highest-rated, by design"})}
    ${card("The field", tableHTML([{label:"Operator",sort:true},{label:"Cliffs",num:true,sort:true},{label:"Causeway",num:true,sort:true},{label:"Rating",num:true,sort:true},{label:"Viator",num:true,sort:true},"Ads",{label:"Social",num:true,sort:true},"Last move"], rows), {eyebrow:"Seven operators watched · click a row for detail"})}`;
  }

  /* ------------------------------------------------------- FINANCE pages -- */
  function finPL(){
    const rev=PL[0][1], costs=PL.slice(1).reduce((a,l)=>a+l[1],0), net=rev+costs;
    const maxAbs=Math.max(...PL.map(l=>Math.abs(l[1])));
    const rows=PL.map(l=>({ cells:[ l[0],
      `<span class="${l[2]==='in'?'wr-pos':'wr-neg'}">${l[1]<0?'-':''}${eur(Math.abs(l[1]))}</span>`,
      bar(Math.abs(l[1])/maxAbs*100, l[2]==='in'?'':'warn') ] }));
    rows.push({ cells:[`<b>Net profit</b>`, `<b class="wr-pos">${eur(net)}</b>`, "" ] });
    const rev6=[238000,251000,243000,262000,270000,272400], mos=["Jan","Feb","Mar","Apr","May","Jun"];
    return `
    <div class="wr-strip">
      ${tile({label:"Revenue (month)",value:eur(rev).slice(1),pre:"€",raw:rev,sub:"summer peak",delta:{dir:"up",v:"6%"},spark:rev6})}
      ${tile({label:"Net profit",value:eur(net).slice(1),pre:"€",raw:net,sub:Math.round(net/rev*100)+"% margin",delta:{dir:"up",v:"5%"},spark:[58000,61000,59000,64000,66000,net]})}
      ${tile({label:"Cost of sales",value:COS_ACTUAL.toFixed(1),suf:"%",raw:COS_ACTUAL,dec:1,sub:"target "+COS_TARGET+"%",go:"marketing",delta:{dir:"down",v:"0.2pt"},spark:[24.1,23.5,23,22.8,22.6,22.4]})}
      ${tile({label:"OTA commission",value:eur(-PL[1][1]).slice(1),pre:"€",raw:-PL[1][1],sub:"biggest single cost",delta:{dir:"up",v:"2%"},spark:[34000,36000,37000,39000,40000,41200]})}
    </div>
    ${card("Revenue, last 6 months", areaTrend(rev6,{labels:mos,h:184}), {eyebrow:"Live from the accounting package"})}
    ${card("Profit & loss", tableHTML([{label:"Line",sort:true},{label:"Amount",num:true,sort:true},"Share"], rows), {eyebrow:"This month · money in and out"})}
    <div class="scaffold-note rise"><span class="badge">${icon("euro",18)}</span><span>Synced from your accounting package (Xero). Figures refresh as invoices and settlements land. <button class="ghost" data-toast="Opening the accounting integration">Manage integration</button></span></div>`;
  }
  function finPerDep(){
    const items=DEPARTURES.map(d=>{ const f=depRevenue(d); return { label:ROUTES[d.route].name.split(/[ ,&]/)[0], gross:f.rev, net:f.net }; });
    const rows=DEPARTURES.map(d=>{ const f=depRevenue(d);
      return { _ent:`departure:${d.id}`, cells:[`<b>${ROUTES[d.route].name}</b>`, eur(f.rev), `<span class="wr-neg">-${eur(f.ota)}</span>`, `<b>${eur(f.net)}</b>`, d.sold+"/"+d.cap] }; });
    return `
    ${card("Revenue per departure, net of OTA commission", barCompare(items,{s1:"gross",s2:"net",lab1:"Gross",lab2:"Net of OTA",single:true,fmt1:v=>eur(v),fmt2:v=>eur(v)}), {eyebrow:"Gross vs what each coach actually earns"})}
    ${card("Detail", tableHTML([{label:"Departure",sort:true},{label:"Gross",num:true,sort:true},{label:"OTA commission",num:true,sort:true},{label:"Net",num:true,sort:true},{label:"Seats",num:true,sort:true}], rows), {eyebrow:"Click a departure for full margin"})}`;
  }
  function finMargin(){
    const segs=CHANNELS.map(c=>({label:c.name.split(" ")[0],value:c.share,tone:c.comm===0?'accent':c.comm>=28?'danger':c.comm>=22?'warn':'mute'}));
    const direct=CHANNELS.find(c=>c.comm===0).share, ota=100-direct;
    const rows=CHANNELS.map(c=>({ cells:[`<b>${c.name}</b>`, c.comm+"%", c.share+"%", c.comm===0?chip("ok","Full margin"):c.comm>=25?chip("bad","Thin"):chip("warn","OK")] }));
    return `
    ${card("Direct vs OTA mix", `<div class="wr-split"><div>${donut(segs,{center:`<b>${ota}%</b><span>via OTA</span>`})}</div><div>${donutLegend(segs)}</div></div>`, {eyebrow:`${direct}% direct · ${ota}% carries 20 to 30% commission`})}
    ${card("By channel", tableHTML([{label:"Channel",sort:true},{label:"Commission",num:true,sort:true},{label:"Share",num:true,sort:true},"Margin"], rows), {eyebrow:"Each channel's cut"})}
    ${card("The mix problem", `<p class="brief-p">66% of bookings carry a commission of 20 to 30%. Each point of share moved from Viator and Bresno to direct is pure margin, which is what the website redesign and campaigns are built to do.</p>`, {eyebrow:"The opportunity"})}`;
  }
  function finPartner(){
    const retail=28.5, wholesale=12, margin=retail-wholesale, attach=31;
    const wf=`<div class="wr-waterfall">
      <div class="wf-bar"><span class="wf-seg cost wr-grow-x" style="width:${(wholesale/retail*100).toFixed(1)}%">€12.00</span><span class="wf-seg keep wr-grow-x" style="width:${(margin/retail*100).toFixed(1)}%">€16.50</span></div>
      <div class="wf-axis"><span>€0</span><span class="wf-total">Retail €28.50</span></div>
      <div class="wf-key"><span><i class="wf-sw cost"></i>Wholesale cost to partner</span><span><i class="wf-sw keep"></i>Margin kept (58%)</span></div></div>`;
    return `
    <div class="grid grid-2">
      ${card("Game of Thrones experience", `${wf}<div class="kpi-sub" style="margin-top:16px">€16.50 kept on every add-on, sold inside the Belfast day.</div>`, {eyebrow:"Partner wholesale margin"})}
      ${card("Bundle builder", `<div class="rows">
        <div class="row"><span class="row-ava">${icon("ticket",15)}</span><div class="row-main"><b>Belfast + Game of Thrones</b><span>€85 + €28.50 add-on</span></div>${chip("ok","Live")}</div>
        <div class="row"><span class="row-ava">${icon("ticket",15)}</span><div class="row-main"><b>Galway + Cliffs boat trip</b><span>€79 + €15 add-on</span></div>${chip("warn","Draft")}</div>
        <div class="row"><span class="row-ava">${icon("ticket",15)}</span><div class="row-main"><b>Kilkenny + medieval banquet</b><span>€69 + €22 add-on</span></div>${chip("neutral","Idea")}</div>
      </div>`, {eyebrow:"Attach extras to any route", foot:`<button class="ghost" data-toast="New bundle drafted">${icon("plus",14)} New bundle</button>`})}
    </div>
    <div class="wr-strip">
      ${tile({label:"Bundle attach rate",value:String(attach),suf:"%",raw:attach,sub:"of Belfast bookings add GoT",delta:{dir:"up",v:"4pt"},spark:[22,24,26,28,29,31]})}
      ${tile({label:"Upsell conversion",value:"18",suf:"%",raw:18,sub:"of nudges convert",delta:{dir:"up",v:"2pt"},spark:[13,14,15,16,17,18]})}
      ${tile({label:"Add-on margin / month",value:eur(Math.round(16.5*640)).slice(1),pre:"€",raw:Math.round(16.5*640),sub:"~640 add-ons sold",delta:{dir:"up",v:"7%"},spark:[7000,8000,9000,9500,10000,10560]})}
    </div>`;
  }

  /* register pages */
  ["fleet","operations","bookings","customers","marketing","finance"].forEach(sec=>{ PAGES[sec] = () => renderSection(sec); });
  PAGES["settings"] = settingsPage;
  function settingsPage(){
    const G = (typeof GOOGLE!=="undefined")?GOOGLE:{};
    const conn = (app,name,sub,on,sync)=>`<div class="row wr-conn"><span class="row-ava" style="background:#fff">${G[app]||icon("plug",16)}</span><div class="row-main"><b>${name}</b><span>${sub}</span></div><div class="wr-conn-r">${on?`<span class="wr-sync"><i class="wr-sync-dot"></i>Synced ${sync}</span>${chip("ok","Connected")}`:`<button class="ghost" data-toast="${name} connect flow ready to wire">Connect</button>`}</div></div>`;
    return `
    ${card("Workspace", `<div class="rows">${conn("gmail","Gmail","First-line summaries into the feed",true,"2m ago")}${conn("calendar","Calendar","Departures and service slots",true,"5m ago")}${conn("drive","Drive","Manifests and documents",true,"12m ago")}</div>`, {eyebrow:"Connected · live sync"})}
    ${card("Tour platforms & operations", `<div class="rows">
      ${conn(null,"Rezgo (direct)","Live seat count and confirmations",true,"just now")}
      ${conn(null,"Viator","Bookings and settlements",true,"3m ago")}
      ${conn(null,"Bresno","Partner bookings",true,"8m ago")}
      ${conn(null,"Fleet Go","Replaced by Fleet, Live Map and Inspections",false)}
      ${conn(null,"Accounting package (Xero)","Live P&L and per-departure margin",true,"1h ago")}
    </div>`, {eyebrow:"Everything in one place", foot:`<button class="ghost" data-toast="Fleet Go can be cancelled, saving €300/month">Review Fleet Go</button>`})}`;
  }

  /* ===================== STYLES (reuse tokens, 3 status colours only) ===== */
  const css = document.createElement("style");
  css.textContent = `
  :root{ --ok:var(--accent); --warn:#B8862F; --danger:#B1573F;
         --warn-soft:rgba(184,134,47,.12); --danger-soft:rgba(177,87,63,.12); }
  [data-theme="dark"]{ --warn:#D9A441; --danger:#D98A6E; --warn-soft:rgba(217,164,65,.16); --danger-soft:rgba(217,138,110,.16); }

  /* chips */
  .wr-chip{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600;letter-spacing:.01em;padding:4px 10px;border-radius:99px;white-space:nowrap}
  .wr-chip .dot{width:6px;height:6px;border-radius:99px;background:currentColor}
  .wr-chip.ok{color:var(--ok);background:var(--accent-soft)}
  .wr-chip.warn{color:var(--warn);background:var(--warn-soft)}
  .wr-chip.bad{color:var(--danger);background:var(--danger-soft)}
  .wr-chip.neutral{color:var(--ink-2);background:var(--surface-2)}
  .wr-chip.neutral .dot{background:var(--ink-3)}

  /* tabs */
  .wr-tabs{display:flex;gap:3px;flex-wrap:wrap;margin:0 0 24px;padding:4px;border-radius:14px;background:var(--surface-2);border:1px solid var(--hairline);width:fit-content;max-width:100%}
  .wr-tab{padding:8px 15px;border-radius:10px;font-size:13px;font-weight:500;color:var(--ink-2);transition:color var(--dur) var(--ease),background-color var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
  .wr-tab:hover{color:var(--ink)}
  .wr-tab.on{color:var(--ink);background:var(--surface);box-shadow:var(--shadow-sm);font-weight:600}
  .wr-pane{animation:wrFade .3s var(--ease)}
  @keyframes wrFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion:reduce){.wr-pane{animation:none}}

  /* clickable entity link */
  .wr-link{color:var(--ink);font-weight:550;border-bottom:1px solid var(--hairline-2);padding:0 0 1px;transition:color var(--dur) var(--ease),border-color var(--dur) var(--ease)}
  .wr-link:hover{color:var(--accent);border-color:var(--accent)}
  .wr-row{cursor:pointer;transition:background-color var(--dur) var(--ease)}
  .wr-row:hover td{background:var(--surface-2)}

  /* mini bar */
  .wr-bar{display:inline-block;vertical-align:middle;width:84px;height:6px;border-radius:99px;background:var(--surface-2);border:1px solid var(--hairline);overflow:hidden}
  .wr-bar-fill{display:block;height:100%;background:var(--accent);border-radius:99px}
  .wr-bar-fill.warn{background:var(--warn)} .wr-bar-fill.bad{background:var(--danger)}

  /* tiles + grids */
  .wr-tile{text-align:left;cursor:pointer}
  .wr-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:4px}
  .wr-cardgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:18px}
  .wr-veh{text-align:left;display:flex;flex-direction:column;gap:10px;cursor:pointer;padding:18px 20px}
  .wr-veh-top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
  .wr-veh-top b{font-size:15px;font-weight:600;display:block}
  .wr-veh-top .muted{font-size:12px}
  .wr-veh-make{font-size:12.5px;color:var(--ink-2)}
  .wr-veh-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:2px}
  .wr-mini{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;color:var(--ink-3)}
  .brief-p{margin:0;font-size:14.5px;line-height:1.6;color:var(--ink);max-width:72ch}
  .wr-pos{color:var(--accent);font-weight:600;font-variant-numeric:tabular-nums}
  .wr-neg{color:var(--danger);font-weight:600;font-variant-numeric:tabular-nums}

  /* live map: detailed Ireland with route trails and progress markers */
  .wr-map{position:relative;width:min(560px,100%);margin:4px auto 0;border-radius:18px;padding:14px;
    background:radial-gradient(135% 105% at 42% 22%, var(--surface-2), var(--surface));
    border:1px solid var(--hairline)}
  .wr-ireland{display:block;width:100%;height:auto;overflow:visible}
  .wr-coast{fill:url(#wrLand)}
  .wr-land-a{stop-color:color-mix(in srgb,var(--accent) 8%, var(--surface))}
  .wr-land-b{stop-color:color-mix(in srgb,var(--accent) 17%, var(--surface))}
  [data-theme="dark"] .wr-land-a{stop-color:rgba(95,184,155,.06)} [data-theme="dark"] .wr-land-b{stop-color:rgba(95,184,155,.13)}
  .wr-coast-halo{fill:none;stroke:var(--accent);stroke-width:6;opacity:.12;filter:url(#wrSea)}
  [data-theme="dark"] .wr-coast-halo{opacity:.22}
  .wr-coast-line{fill:none;stroke:var(--accent);stroke-width:1.2;stroke-linejoin:round;stroke-linecap:round;opacity:.85}
  .wr-lough{fill:var(--bg);stroke:var(--accent);stroke-width:.8;opacity:.85}
  .wr-shannon{fill:none;stroke:var(--bg);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:.95}
  .wr-city circle{fill:var(--ink-3)}
  .wr-city text{font-family:var(--font-sans);font-size:11.5px;font-weight:500;fill:var(--ink-3)}
  .wr-route-bg{fill:none;stroke:var(--ink-3);stroke-width:1.6;stroke-dasharray:1 6;stroke-linecap:round;opacity:.55}
  .wr-route-done{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
  .wr-route-dest{fill:var(--surface);stroke:var(--accent);stroke-width:2}
  .wr-leader{stroke:var(--accent);stroke-width:1.1;opacity:.45}
  .wr-origin{fill:var(--accent);stroke:var(--surface);stroke-width:2} .wr-origin-c{fill:#fff}
  .wr-origin-g text{font-weight:600;fill:var(--ink-2)}
  .wr-mpin{cursor:pointer}
  .wr-mpin-halo{fill:var(--accent);opacity:.16;transition:opacity var(--dur) var(--ease)}
  .wr-mpin-core{fill:var(--accent);stroke:var(--surface);stroke-width:2}
  .wr-mpin-bg{fill:var(--accent)}
  .wr-mpin-lbl{font-family:var(--font-sans);font-size:13px;font-weight:600;fill:#fff}
  .wr-mpin-lbl .pct{fill:rgba(255,255,255,.72);font-weight:500}
  .wr-mpin:hover .wr-mpin-halo{opacity:.34}
  .wr-mpin:hover .wr-mpin-core{r:12}
  .wr-maplegend{display:flex;flex-wrap:wrap;align-items:center;gap:16px;margin-top:14px;padding-top:14px;
    border-top:1px solid var(--hairline);font-size:12px;color:var(--ink-2)}
  .wr-maplegend span{display:inline-flex;align-items:center;gap:7px}
  .lg-line{width:18px;height:0;border-top-width:3px;border-top-style:solid;border-radius:2px}
  .lg-line.done{border-color:var(--accent)}
  .lg-line.rem{border-top-style:dotted;border-color:var(--ink-3)}
  .lg-dot{width:10px;height:10px;border-radius:99px}
  .lg-dot.origin{background:var(--accent);box-shadow:inset 0 0 0 2px var(--surface),0 0 0 1px var(--accent)}
  .lg-dot.live{background:var(--accent);box-shadow:0 0 0 4px var(--accent-soft)}

  /* manifest / segments / reviews / board */
  .wr-manhead{font-size:13px;color:var(--ink-2);margin-bottom:14px}
  .wr-segs{display:flex;flex-direction:column;gap:14px}
  .wr-seg-top{display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px}
  .wr-seg .wr-bar{width:100%;height:8px}
  .wr-reviews{display:flex;flex-direction:column;gap:14px}
  .wr-review{padding:15px 16px;border:1px solid var(--hairline);border-radius:14px;background:var(--surface-2)}
  .wr-review-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .wr-review-top b{font-size:13.5px}
  .wr-stars{margin-left:auto;color:var(--warn);font-size:13px;letter-spacing:1px}
  .wr-review-text{margin:8px 0 12px;font-size:13.5px;line-height:1.55;color:var(--ink)}
  .wr-review-foot{display:flex;align-items:center;gap:10px}
  .wr-board{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;align-items:start}
  .wr-col-h{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3);margin-bottom:12px}
  .wr-col-n{display:grid;place-items:center;min-width:20px;height:20px;padding:0 6px;border-radius:99px;background:var(--surface-2);color:var(--ink-2);font-size:11px}
  .wr-deal{padding:14px 16px;margin-bottom:12px;display:block}
  .wr-deal b{font-size:13.5px;font-weight:600;display:block;margin-bottom:3px}
  .wr-deal .muted{font-size:12px}

  /* trends + cos */
  .wr-trends{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .wr-trend{padding:16px 18px;display:flex;flex-direction:column;gap:9px}
  .wr-trend-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
  .wr-trend-top b{font-size:14px;font-weight:600}
  .wr-trend-angle{font-size:13px;color:var(--ink-2);display:flex;align-items:center;gap:7px}
  .wr-trend .ghost{align-self:flex-start}
  .wr-cos{position:relative;height:14px;border-radius:99px;background:var(--surface-2);border:1px solid var(--hairline);overflow:visible;margin:6px 0 10px}
  .wr-cos .wr-bar-fill{position:absolute;left:0;top:0;height:100%}
  .wr-cos-mark{position:absolute;top:-4px;width:2px;height:22px;background:var(--ink);border-radius:2px}
  .wr-cos-lbl{display:flex;justify-content:space-between;font-size:13px}
  .wr-margin{display:flex;align-items:center;gap:18px}
  .wr-margin .kpi-val{font-size:2rem;margin-top:2px}
  .wr-margin-arrow{color:var(--ink-3);transform:rotate(90deg)}

  /* home extras */
  .greet-mark{font-family:var(--font-serif);font-size:15px;letter-spacing:.04em;color:var(--ink-3)}
  .chatpage.wr-home[data-mode="home"]{justify-content:flex-start;overflow-y:auto;padding-top:5vh}
  .chatpage.wr-home[data-mode="home"] .home-inner{justify-content:flex-start}
  .wr-chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%;max-width:var(--home-max);margin:14px auto 0;padding:0 24px}
  .wr-chip-btn{font-size:12.5px;color:var(--ink-2);border:1px solid var(--hairline);background:var(--surface);border-radius:99px;padding:8px 14px;box-shadow:var(--shadow-sm);transition:color var(--dur) var(--ease),border-color var(--dur) var(--ease),transform var(--dur) var(--ease)}
  .wr-chip-btn:hover{color:var(--ink);border-color:var(--hairline-2);transform:translateY(-1px)}
  .wr-home-extra{width:100%;max-width:var(--home-max);margin:26px auto 0;padding:0 24px;display:flex;flex-direction:column;gap:18px}
  .chatpage[data-mode="chat"] .wr-home-extra,.chatpage[data-mode="chat"] .wr-chips{display:none}
  .wr-needs{display:flex;flex-direction:column}
  @media (max-width:1024px){ .wr-strip{grid-template-columns:repeat(2,1fr)} .wr-trends{grid-template-columns:1fr} .wr-board{grid-template-columns:1fr} }
  @media (max-width:760px){ .wr-strip{grid-template-columns:1fr} }

  /* owner toggle in the top bar */
  .wr-owner{position:absolute;left:32px;top:50%;transform:translateY(-50%);display:inline-flex;padding:3px;border-radius:12px;background:var(--surface);border:1px solid var(--hairline);box-shadow:var(--shadow-sm)}
  .wr-owner button{font-size:12.5px;font-weight:500;color:var(--ink-3);padding:6px 12px;border-radius:9px;transition:color var(--dur) var(--ease),background-color var(--dur) var(--ease)}
  .wr-owner button.on{color:var(--ink);background:var(--surface-2);font-weight:600}
  @media (max-width:760px){ .wr-owner{left:18px} .wr-owner button{padding:6px 9px} }

  /* alert bell + dropdown */
  .wr-bell{position:fixed;top:10px;right:70px;z-index:60;width:38px;height:38px;border-radius:13px;display:grid;place-items:center;color:var(--ink);background:var(--surface);border:1px solid var(--hairline);box-shadow:var(--shadow-sm);transition:transform var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
  .wr-bell:hover{box-shadow:var(--shadow);transform:scale(1.04)}
  .wr-bell-badge{position:absolute;top:-3px;right:-3px;min-width:17px;height:17px;padding:0 4px;border-radius:99px;background:var(--danger);color:#fff;font-size:10.5px;font-weight:700;display:grid;place-items:center;border:2px solid var(--bg)}
  .wr-alerts-back{position:fixed;inset:0;z-index:95;display:none}
  .wr-alerts-back.open{display:block}
  .wr-alerts{position:fixed;top:56px;right:24px;width:380px;max-width:92vw;max-height:74vh;overflow-y:auto;border-radius:18px;background:var(--surface);border:1px solid var(--hairline);box-shadow:var(--shadow-lift);padding:8px;animation:wrDrop .26s var(--ease)}
  @keyframes wrDrop{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
  .wr-alerts-h{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);padding:12px 12px 6px}
  .wr-alert{display:flex;gap:11px;align-items:flex-start;width:100%;text-align:left;padding:11px 12px;border-radius:12px;transition:background-color var(--dur) var(--ease)}
  .wr-alert:hover{background:var(--surface-2)}
  .wr-alert-ic{width:30px;height:30px;flex:none;border-radius:9px;display:grid;place-items:center}
  .wr-alert-ic.red{color:var(--danger);background:var(--danger-soft)} .wr-alert-ic.amber{color:var(--warn);background:var(--warn-soft)}
  .wr-alert-main b{display:block;font-size:13px;font-weight:600}
  .wr-alert-main span{font-size:12px;color:var(--ink-3);line-height:1.4}
  .wr-alert-sec{font-size:10.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);margin-top:3px;display:block}

  /* entity slide-in panel */
  .wr-ent-back{position:fixed;inset:0;z-index:100;display:none;justify-content:flex-end;background:rgba(20,19,15,.16)}
  [data-theme="dark"] .wr-ent-back{background:rgba(0,0,0,.46)}
  .wr-ent-back.open{display:flex}
  .wr-ent{width:460px;max-width:94vw;height:100%;overflow-y:auto;background:var(--surface);border-left:1px solid var(--hairline);box-shadow:var(--shadow-lift);padding:26px 28px 40px;animation:wrSlide .34s var(--ease)}
  @keyframes wrSlide{from{transform:translateX(28px);opacity:0}to{transform:none;opacity:1}}
  @media (prefers-reduced-motion:reduce){.wr-ent{animation:none}}
  .wr-ent-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:6px}
  .wr-ent-head h2{margin:4px 0 0;font-size:1.5rem;font-weight:600;letter-spacing:-.02em}
  .wr-ent-x{width:34px;height:34px;flex:none;border-radius:10px;display:grid;place-items:center;color:var(--ink-3);background:var(--surface-2);border:1px solid var(--hairline)}
  .wr-ent-x:hover{color:var(--ink)}
  .wr-ent-sec{margin-top:24px}
  .wr-ent-sec .eyebrow{margin-bottom:12px;display:block}
  .wr-kv{display:flex;justify-content:space-between;gap:14px;padding:9px 0;border-bottom:1px solid var(--hairline);font-size:13.5px}
  .wr-kv:last-child{border-bottom:none}
  .wr-kv span{color:var(--ink-3)} .wr-kv b{font-weight:550;text-align:right}
  .wr-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
  .wr-jump{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:550;color:var(--ink);padding:9px 13px;border-radius:11px;border:1px solid var(--hairline);background:var(--surface-2);transition:border-color var(--dur) var(--ease),color var(--dur) var(--ease),transform var(--dur) var(--ease)}
  .wr-jump:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px)}
  .wr-jump .ic{color:var(--ink-3)} .wr-jump:hover .ic{color:var(--accent)}
  .wr-ent-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}

  /* ---- stat tile upgrades: delta chip + inline sparkline ---- */
  .wr-delta{display:inline-flex;align-items:center;gap:3px;font-size:11.5px;font-weight:700;font-variant-numeric:tabular-nums;padding:2px 7px;border-radius:99px}
  .wr-delta.up{color:var(--ok);background:var(--accent-soft)}
  .wr-delta.down{color:var(--danger);background:var(--danger-soft)}
  .stat .stat-val{font-variant-numeric:tabular-nums}
  .stat-spark{margin:10px 0 2px;height:30px}
  .stat-spark .wr-spark{width:100%;height:30px}

  /* ---- table polish ---- */
  .tbl thead th{position:sticky;top:0;z-index:1}
  .tbl th.num,.tbl td.num{text-align:right;font-variant-numeric:tabular-nums}
  .tbl td.num{color:var(--ink)}
  .tbl th.wr-sortable{cursor:pointer;user-select:none;white-space:nowrap}
  .tbl th.wr-sortable:hover{color:var(--ink-2)}
  .wr-sortcaret{display:inline-flex;vertical-align:middle;margin-left:3px;opacity:.4;transition:transform var(--dur) var(--ease),opacity var(--dur) var(--ease)}
  .tbl th[data-dir] .wr-sortcaret{opacity:.9} .tbl th[data-dir="asc"] .wr-sortcaret{transform:rotate(180deg)}

  /* ---- chart shared + mount animation ---- */
  .wr-chart{display:block;width:100%;height:auto;overflow:visible}
  .tone-accent{color:var(--accent)} .tone-warn{color:var(--warn)} .tone-danger,.tone-bad{color:var(--danger)} .tone-ink{color:var(--ink-3)}
  @media (prefers-reduced-motion:no-preference){
    .wr-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:wrDraw .9s var(--ease) forwards}
    @keyframes wrDraw{to{stroke-dashoffset:0}}
    .wr-arc{animation:wrArc .7s var(--ease) both;animation-delay:calc(var(--d,0)*90ms)}
    @keyframes wrArc{from{opacity:0}to{opacity:1}}
    .wr-grow{transform-box:fill-box;transform-origin:bottom;animation:wrGrow .5s var(--ease) both;animation-delay:calc(var(--d,0)*40ms)}
    @keyframes wrGrow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
    .wr-grow-x{transform-box:fill-box;transform-origin:left;animation:wrGrowX .55s var(--ease) both;animation-delay:calc(var(--d,0)*50ms)}
    @keyframes wrGrowX{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    .hb-fill.wr-grow-x{transform-box:border-box}
    .wr-needle{transform-box:fill-box;transform-origin:bottom;animation:wrNeedle .7s var(--ease) both}
    @keyframes wrNeedle{from{transform:rotate(-44deg)}to{transform:none}}
  }
  /* sparkline */
  .wr-spark{width:130px;height:30px}
  .wr-spark .sp-line{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .wr-spark .sp-fill{fill:currentColor;opacity:.10}
  .wr-spark .sp-dot{fill:currentColor}
  /* area trend */
  .wr-chart.at .at-fill{fill:currentColor;opacity:.12}
  .wr-chart.at .at-line{fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
  .wr-chart.at .at-dot{fill:currentColor;stroke:var(--surface);stroke-width:2}
  .at-target{stroke:var(--ink-3);stroke-width:1.4;stroke-dasharray:3 4;opacity:.7}
  .at-tlabel{font:600 11px var(--font-sans);fill:var(--ink-3)}
  .at-x{font:500 10.5px var(--font-sans);fill:var(--ink-3)}
  /* bar compare */
  .wr-chart.bc .bc-base{stroke:var(--hairline-2)}
  .wr-chart.bc .bc-b1{fill:var(--accent)} .wr-chart.bc .bc-b2{fill:var(--ink-3);opacity:.55}
  .wr-chart.bc .bc-x{font:600 11px var(--font-sans);fill:var(--ink-2)}
  .wr-chart.bc .bc-v{font:500 10px var(--font-sans);fill:var(--ink-3)}
  .wr-legend{display:flex;gap:18px;justify-content:center;margin-top:10px;font-size:12px;color:var(--ink-2)}
  .wr-legend span{display:inline-flex;align-items:center;gap:7px}
  .lg-sw{width:11px;height:11px;border-radius:3px} .lg-sw.s1{background:var(--accent)} .lg-sw.s2{background:var(--ink-3);opacity:.55}
  /* donut */
  .wr-donut{position:relative;display:grid;place-items:center;width:164px;height:164px;margin:0 auto}
  .wr-donut svg{width:100%;height:100%}
  .dn-track{fill:none;stroke:var(--surface-2)} [data-theme="dark"] .dn-track{stroke:rgba(255,255,255,.06)}
  .dn-seg{fill:none;stroke:currentColor;stroke-linecap:butt}
  .dn-center{position:absolute;text-align:center;font-variant-numeric:tabular-nums}
  .dn-center b{display:block;font-size:1.5rem;font-weight:600;letter-spacing:-.02em} .dn-center span{font-size:11.5px;color:var(--ink-3)}
  .wr-dlegend{display:flex;flex-direction:column;gap:9px}
  .wr-dlegend .dl{display:flex;align-items:center;gap:10px;font-size:13px}
  .dl-sw{width:10px;height:10px;border-radius:3px;background:currentColor;flex:none}
  .dl-l{flex:1;color:var(--ink-2)} .dl-v{font-weight:600;font-variant-numeric:tabular-nums}
  /* gauge */
  .wr-gauge{width:100%;max-width:240px;height:auto;display:block;margin:0 auto}
  .gg-track{fill:none;stroke:var(--surface-2);stroke-width:14;stroke-linecap:round} [data-theme="dark"] .gg-track{stroke:rgba(255,255,255,.07)}
  .gg-ok{fill:none;stroke:var(--accent);stroke-width:14;stroke-linecap:round}
  .gg-warn{fill:none;stroke:var(--warn);stroke-width:14;stroke-linecap:round}
  .gg-needle{stroke:var(--ink);stroke-width:3;stroke-linecap:round} .gg-hub{fill:var(--ink)}
  .gg-val{font:700 24px var(--font-sans);fill:var(--ink);font-variant-numeric:tabular-nums}
  .gg-sub{font:500 11px var(--font-sans);fill:var(--ink-3)}
  /* timeline */
  .wr-chart.tl .tl-lbl{font:550 12px var(--font-sans);fill:var(--ink-2)}
  .wr-chart.tl .tl-bar{fill:currentColor}
  .wr-chart.tl .tl-tick{stroke:var(--hairline)} .tl-tx{font:500 10px var(--font-sans);fill:var(--ink-3)}
  .wr-chart.tl .tl-tag{font:600 10.5px var(--font-sans);fill:var(--ink-3)}
  /* funnel */
  .wr-chart.fn .fn-bar{fill:var(--accent);opacity:.9}
  .wr-chart.fn g:nth-child(2) .fn-bar{opacity:.82} .wr-chart.fn g:nth-child(3) .fn-bar{opacity:.66} .wr-chart.fn g:nth-child(4) .fn-bar{opacity:.5}
  .wr-chart.fn .fn-lbl{font:600 12px var(--font-sans);fill:#fff}
  .wr-chart.fn .fn-val{font:600 12px var(--font-sans);fill:var(--ink)} .fn-drop{fill:var(--ink-3);font-weight:500}
  /* ring */
  .wr-ring{position:relative;display:grid;place-items:center;width:120px;height:120px}
  .wr-ring svg{width:100%;height:100%}
  .rg-track{fill:none;stroke:var(--surface-2)} [data-theme="dark"] .rg-track{stroke:rgba(255,255,255,.07)}
  .rg-fill{fill:none;stroke:currentColor}
  .rg-center{position:absolute;text-align:center}
  .rg-center b{display:block;font-size:1.35rem;font-weight:600;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
  .rg-center span{font-size:11px;color:var(--ink-3)}
  /* hbars */
  .wr-hbars{display:flex;flex-direction:column;gap:11px}
  .hb{display:grid;grid-template-columns:130px 1fr auto;align-items:center;gap:12px;font-size:13px}
  .hb-lbl{color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .hb-track{height:9px;border-radius:99px;background:var(--surface-2);overflow:hidden}
  .hb-fill{display:block;height:100%;border-radius:99px;background:var(--accent)}
  .hb-fill.tone-warn{background:var(--warn)} .hb-fill.tone-danger,.hb-fill.tone-bad{background:var(--danger)} .hb-fill.tone-ink{background:var(--ink-3)}
  .hb-val{font-weight:600;font-variant-numeric:tabular-nums;color:var(--ink)}
  /* two-column chart card body */
  .wr-split{display:grid;grid-template-columns:1.3fr .9fr;gap:24px;align-items:center}
  .wr-chartwrap{min-width:0}
  @media (max-width:880px){ .wr-split{grid-template-columns:1fr} }
  .tone-mute{color:var(--ink-2)}

  /* sidebar wordmark: WR -> Wild Rover, crossfade on rail hover (matches search timing) */
  .wr-brandmark{position:relative;display:inline-grid;place-items:center;height:24px;font-family:var(--font-serif);color:var(--ink)}
  .wr-bm-short,.wr-bm-full{grid-area:1/1;white-space:nowrap;transition:opacity var(--dur) var(--ease)}
  .wr-bm-short{font-size:17px;font-weight:500;letter-spacing:.06em;opacity:1}
  .wr-bm-full{font-size:15px;font-weight:500;letter-spacing:.02em;opacity:0}
  .side:hover .wr-bm-short{opacity:0}
  .side:hover .wr-bm-full{opacity:1;transition:opacity var(--dur) var(--ease) .06s}
  @media (prefers-reduced-motion:reduce){ .wr-bm-short,.wr-bm-full{transition:none} }

  /* controls (filter + sort segments) */
  .wr-controls{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:22px}
  .wr-seg2{display:inline-flex;padding:3px;border-radius:12px;background:var(--surface-2);border:1px solid var(--hairline)}
  .wr-seg2 button{font-size:12.5px;font-weight:500;color:var(--ink-3);padding:7px 13px;border-radius:9px;transition:color var(--dur) var(--ease),background-color var(--dur) var(--ease)}
  .wr-seg2 button:hover{color:var(--ink)}
  .wr-seg2 button.on{color:var(--ink);background:var(--surface);box-shadow:var(--shadow-sm);font-weight:600}

  /* trend cards */
  .wr-trend{position:relative}
  .wr-trend.hot{border-color:color-mix(in srgb,var(--accent) 40%,transparent);box-shadow:var(--shadow),0 0 0 1px var(--accent-soft)}
  .wr-hotflag{position:absolute;top:-9px;left:16px;display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#fff;background:var(--accent);padding:3px 9px;border-radius:99px;box-shadow:var(--shadow-sm)}
  .wr-trend-plat{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--ink-2)}
  .wr-trend-plat .ic{color:var(--ink-3)}
  .wr-trend-tag{font-size:15px;font-weight:600;letter-spacing:-.01em}
  .wr-trend-spark{height:34px;margin:2px 0}
  .wr-trend-spark .wr-spark{width:100%;height:34px}
  .wr-trend-why{font-size:12.5px;color:var(--ink-3);line-height:1.45}

  /* channel scorecards (expandable) */
  .wr-scards{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
  .wr-scard{padding:0;overflow:hidden}
  .wr-scard summary{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:14px;padding:18px 20px;cursor:pointer;list-style:none}
  .wr-scard summary::-webkit-details-marker{display:none}
  .sc-head{display:flex;align-items:center;gap:10px}
  .sc-head b{font-size:15px;font-weight:600}
  .sc-spark{width:150px;height:34px} .sc-spark .wr-spark{width:100%;height:34px}
  .sc-caret{color:var(--ink-3);transition:transform var(--dur) var(--ease)}
  .wr-scard[open] .sc-caret{transform:rotate(180deg)}
  .sc-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:0 24px;padding:0 20px}
  .sc-stat{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 0;border-top:1px solid var(--hairline);font-size:13px}
  .sc-stat span{color:var(--ink-3)} .sc-stat b{font-weight:600;font-variant-numeric:tabular-nums;text-align:right}
  .sc-more{padding-bottom:10px;background:var(--surface-2)}
  .sc-more .sc-stats{padding-top:2px}
  @media (max-width:760px){ .wr-scards{grid-template-columns:1fr} }

  /* competitor price-position bars */
  .wr-priceposes{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
  .wr-pricepos .eyebrow{margin-bottom:12px}
  @media (max-width:880px){ .wr-priceposes{grid-template-columns:1fr;gap:20px} }

  /* fleet health strip + filters + vehicle card extras */
  .wr-health{padding:16px 20px;margin-bottom:16px}
  .wr-health-bar{display:flex;height:12px;border-radius:99px;overflow:hidden;background:var(--surface-2)}
  .wr-health-bar .hh{display:block;height:100%} .hh.ok{background:var(--accent)} .hh.warn{background:var(--warn)} .hh.bad{background:var(--danger)}
  .wr-health-key{display:flex;flex-wrap:wrap;gap:18px;margin-top:12px;font-size:12.5px;color:var(--ink-2)}
  .wr-health-key span{display:inline-flex;align-items:center;gap:7px}
  .hk{width:9px;height:9px;border-radius:3px} .hk.ok{background:var(--accent)} .hk.warn{background:var(--warn)} .hk.bad{background:var(--danger)}
  .wr-filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}
  .wr-fchip{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:500;color:var(--ink-2);padding:7px 13px;border-radius:99px;border:1px solid var(--hairline);background:var(--surface);transition:color var(--dur) var(--ease),border-color var(--dur) var(--ease),background-color var(--dur) var(--ease)}
  .wr-fchip:hover{border-color:var(--hairline-2);color:var(--ink)}
  .wr-fchip.on{color:var(--ink);border-color:transparent;background:var(--accent-soft);font-weight:600}
  .fc-n{font-size:11px;font-weight:700;color:var(--ink-3);font-variant-numeric:tabular-nums}
  .wr-fchip.on .fc-n{color:var(--accent)}
  .wr-veh{position:relative;overflow:hidden}
  .wr-veh-accent{position:absolute;left:0;top:0;bottom:0;width:4px;border-radius:4px 0 0 4px}
  .wr-veh-accent.ok{background:var(--accent)} .wr-veh-accent.warn{background:var(--warn)} .wr-veh-accent.bad{background:var(--danger)}
  .wr-veh-pips{display:flex;align-items:center;gap:5px;margin-top:2px}
  .wr-pip{width:9px;height:9px;border-radius:3px;background:var(--accent)} .wr-pip.warn{background:var(--warn)} .wr-pip.bad{background:var(--danger)}
  .wr-veh-pl{margin-left:6px;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
  .wr-veh-svc{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:2px}
  .wr-veh-svc .wr-bar{width:72px}
  .wr-compfilter{margin-bottom:16px}

  /* settings connectors: last-sync */
  .wr-conn-r{display:flex;align-items:center;gap:12px}
  .wr-sync{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--ink-3)}
  .wr-sync-dot{width:7px;height:7px;border-radius:99px;background:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}

  /* home: needs-you severity rows + resolve */
  .wr-needrow{align-items:center}
  .row-ava.sev-red{color:var(--danger);background:var(--danger-soft);border-color:transparent}
  .wr-needrow .row-main{cursor:pointer}
  .wr-needact{display:flex;align-items:center;gap:8px}
  .wr-resolve{padding:6px 10px;font-size:11.5px}
  .wr-resolve .ic{color:var(--ink-3)}

  /* owner voice briefing waveform */
  .wr-voice{display:flex;align-items:center;gap:14px}
  .wr-playbtn{width:44px;height:44px;flex:none;border-radius:99px;display:grid;place-items:center;color:#fff;background:var(--accent);box-shadow:var(--shadow-sm);transition:transform var(--dur) var(--ease)}
  .wr-playbtn:hover{transform:scale(1.06)} .wr-playbtn:active{transform:scale(.95)}
  .wr-wave{flex:1;display:flex;align-items:center;gap:3px;height:40px}
  .wr-wave span{flex:1;background:var(--accent);opacity:.32;border-radius:99px;min-width:2px}
  .wr-wave span:nth-child(3n){opacity:.5} .wr-wave span:nth-child(4n){opacity:.7}
  .wr-voice-time{font-size:12.5px;font-variant-numeric:tabular-nums;color:var(--ink-3)}

  /* driver-hours ring cards */
  .wr-hourgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .wr-hourcard{display:flex;align-items:center;gap:16px;text-align:left;padding:16px 18px}
  .wr-hc-ring{flex:none;width:92px}
  .wr-hc-main{flex:1;min-width:0}
  .wr-hc-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
  .wr-hc-top b{font-size:14.5px;font-weight:600}
  .wr-hc-spark{margin-top:8px;height:30px}
  .wr-hc-spark .wr-spark{width:100%;height:30px}
  .wr-seatcell{display:inline-flex;align-items:center;gap:8px;white-space:nowrap}
  .wr-chan{display:inline-flex;align-items:center;gap:9px}
  @media (max-width:760px){ .wr-hourgrid{grid-template-columns:1fr} }

  /* customers: ltv, themes, pipeline */
  .wr-ltv{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
  .wr-ltv .kpi-val{font-size:2.2rem;font-weight:600;letter-spacing:-.03em}
  .wr-ltv-spark{display:flex;flex-direction:column;gap:6px;align-items:flex-end;min-width:240px}
  .wr-themes{display:flex;flex-wrap:wrap;gap:9px}
  .wr-theme{display:inline-flex;align-items:center;gap:7px;font-size:13px;color:var(--ink-2);padding:8px 13px;border-radius:99px;background:var(--surface-2);border:1px solid var(--hairline)}
  .wr-theme b{font-variant-numeric:tabular-nums;color:var(--ink)}
  .wr-theme.warn{color:var(--warn)} .wr-theme.warn b{color:var(--warn)}
  .wr-convbar{display:flex;gap:6px;margin-bottom:18px;height:auto}
  .wr-convbar .cv{display:flex;flex-direction:column;gap:3px;padding:11px 14px;border-radius:12px;background:var(--accent-soft);min-width:0}
  .wr-convbar .cv:nth-child(2){background:var(--surface-2)} .wr-convbar .cv:nth-child(3){background:var(--surface-2)}
  .cv-l{font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
  .cv-v{font-size:13px;font-weight:600;font-variant-numeric:tabular-nums}
  .wr-deal-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px;padding-top:10px;border-top:1px solid var(--hairline);font-size:12px;color:var(--ink-3)}
  .wr-deal-foot b{font-weight:600;color:var(--ink);font-variant-numeric:tabular-nums}

  /* partner-margin waterfall */
  .wr-waterfall{margin-top:4px}
  .wf-bar{display:flex;height:48px;border-radius:12px;overflow:hidden}
  .wf-seg{display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;font-variant-numeric:tabular-nums}
  .wf-seg.cost{background:var(--ink-3)} .wf-seg.keep{background:var(--accent)}
  .wf-axis{display:flex;justify-content:space-between;margin-top:8px;font-size:11.5px;color:var(--ink-3)}
  .wf-total{font-weight:600;color:var(--ink-2)}
  .wf-key{display:flex;gap:18px;margin-top:14px;font-size:12.5px;color:var(--ink-2)}
  .wf-key span{display:inline-flex;align-items:center;gap:7px}
  .wf-sw{width:11px;height:11px;border-radius:3px} .wf-sw.cost{background:var(--ink-3)} .wf-sw.keep{background:var(--accent)}
  `;
  document.head.appendChild(css);

  /* ===================== ENTITY PANEL (cross-linking) ==================== */
  const entBack = document.createElement("div");
  entBack.className = "wr-ent-back"; entBack.id = "wrEntBack";
  entBack.setAttribute("role","dialog"); entBack.setAttribute("aria-modal","true");
  entBack.innerHTML = `<aside class="wr-ent" id="wrEnt"></aside>`;
  document.body.appendChild(entBack);
  const entEl = entBack.querySelector("#wrEnt");
  entBack.addEventListener("mousedown", e=>{ if(e.target===entBack) closeEnt(); });
  function closeEnt(){ entBack.classList.remove("open"); }
  function openEnt(type,id){
    const html = ENT[type] ? ENT[type](id) : null;
    if(!html){ showToast("No detail wired for that yet"); return; }
    entEl.innerHTML = `<div class="wr-ent-head">${html.head}<button class="wr-ent-x" id="wrEntX" aria-label="Close">${icon("x",17)}</button></div>${html.body}`;
    entBack.classList.add("open"); entEl.scrollTop = 0;
    entEl.querySelector("#wrEntX").addEventListener("click", closeEnt);
  }
  const kv = (k,v)=>`<div class="wr-kv"><span>${k}</span><b>${v}</b></div>`;
  const jump = (label,sec,tab,ic)=>`<button class="wr-jump" data-jump="${sec}${tab?":"+tab:""}">${icon(ic||"chevron",15)} ${label}</button>`;
  const jumpEnt = (label,type,id,ic)=>`<button class="wr-jump" data-ent="${type}:${id}">${icon(ic||"chevron",15)} ${label}</button>`;

  const ENT = {
    vehicle(id){ const v=veh(id); if(!v) return null; const docs=vDocs(id);
      const onTour = DEPARTURES.find(d=>d.coach===id);
      return { head:`<div><div class="eyebrow">${v.kind==="coach"?"Coach":"Private vehicle"} · ${v.reg}</div><h2>${v.name}</h2></div>`,
        body:`
        <div class="wr-links">${statusChip(v.status)}${chip(v.svc<2000?"bad":v.svc<10000?"warn":"ok", v.svc.toLocaleString()+" km to service")}</div>
        <div class="wr-ent-sec"><span class="eyebrow">Vehicle</span>
          ${kv("Make",v.make)}${kv("Seats",v.seats)}${kv("Odometer",v.odo.toLocaleString()+" km")}${kv("Fuel",v.mpk.toFixed(1)+" km / litre")}</div>
        <div class="wr-ent-sec"><span class="eyebrow">Documents</span>
          ${docs.map(d=>kv(d[0], `${d[1]} ${docChip(d[2])}`)).join("")}
          <div class="wr-ent-actions"><button class="ghost" data-toast="RSA paper copy queued to print">${icon("print",15)} Print RSA copy</button><button class="ghost" data-toast="Photo captured, saved as PDF to the vehicle file">${icon("camera",15)} Photo to PDF</button></div></div>
        <div class="wr-ent-sec"><span class="eyebrow">Lifetime cost</span>
          ${kv("Fuel (year)","€21,900")}${kv("Service & parts","€9,180")}${kv("Tyres","€4,300")}${kv("Breakdowns",v.id==="V07"?"€3,040":"€0")}</div>
        <div class="wr-ent-sec"><span class="eyebrow">Connected</span><div class="wr-links">
          ${onTour?jumpEnt("Today's departure","departure",onTour.id,"route"):""}
          ${jump("Maintenance","fleet","","wrench")}${jump("Compliance","fleet","","doc")}</div></div>` };
    },
    driver(id){ const p=per(id); if(!p) return null; const pct=Math.round(p.hrs/HR_LIMIT*100);
      const onTour = DEPARTURES.find(d=>d.driver===id||d.guide===id);
      return { head:`<div><div class="eyebrow">${p.role} · certified ${p.certs.join(", ")}</div><h2>${p.name}</h2></div>`,
        body:`
        <div class="wr-links">${statusChip(p.status)}${pct>=95?chip("bad","Near hours limit"):chip("ok","Within hours")}</div>
        <div class="wr-ent-sec"><span class="eyebrow">Driver hours (fortnight)</span>
          ${kv("Driving time",`${p.hrs.toFixed(1)}h / ${HR_LIMIT}h`)}${kv("Days worked",p.days)}
          <div style="margin-top:10px">${bar(pct,pct>=95?"bad":pct>=85?"warn":"")}</div></div>
        <div class="wr-ent-sec"><span class="eyebrow">Connected</span><div class="wr-links">
          ${onTour?jumpEnt("Assigned departure","departure",onTour.id,"route"):""}
          ${jump("Roster","operations","roster","layers")}${jump("Driver hours board","operations","hours","clock")}</div></div>` };
    },
    departure(id){ const d=dep(id); if(!d) return null; const r=ROUTES[d.route]; const c=veh(d.coach); const f=depRevenue(d); const load=Math.round(d.sold/d.cap*100);
      const mix = Object.entries(d.mix).filter(([,n])=>n>0).map(([k,n])=>`${CHANNELS.find(c=>c.id===k).name.split(" ")[0]} ${n}`).join(" · ");
      return { head:`<div><div class="eyebrow">Departure ${d.when||"today"} · ${r.hrs}${r.extra?" · "+r.extra:""}</div><h2>${r.name}</h2></div>`,
        body:`
        <div class="wr-links">${statusChip(d.status)}${load<50?chip("bad","Below break-even"):chip("ok",load+"% full")}</div>
        <div class="wr-ent-sec"><span class="eyebrow">Crew & coach</span>
          ${kv("Coach",`${c.name} · ${c.reg}`)}${kv("Driver",per(d.driver).name)}${kv("Guide",per(d.guide).name)}
          <div class="wr-links">${jumpEnt(c.name,"vehicle",d.coach,"bus")}${jumpEnt(per(d.driver).name,"driver",d.driver,"users")}${jumpEnt(per(d.guide).name,"driver",d.guide,"users")}</div></div>
        <div class="wr-ent-sec"><span class="eyebrow">Seat truth</span>
          ${kv("Sold / capacity",`${d.sold} / ${d.cap}`)}${kv("Across channels",mix)}
          <div style="margin-top:10px">${bar(load,load<50?"bad":load<75?"warn":"")}</div></div>
        <div class="wr-ent-sec"><span class="eyebrow">Margin</span>
          ${kv("Gross",eur(f.rev))}${kv("OTA commission",`<span class="wr-neg">-${eur(f.ota)}</span>`)}${kv("Net",`<b>${eur(f.net)}</b>`)}</div>
        <div class="wr-ent-sec"><span class="eyebrow">Connected</span><div class="wr-links">
          ${jump("Manifest","operations","manifest","ticket")}${jump("Per-departure margin","finance","perdep","euro")}${jump("Seat truth","bookings","seats","ticket")}</div></div>` };
    },
    competitor(name){ const c=COMPETITORS.find(x=>x.name===name); if(!c) return null;
      return { head:`<div><div class="eyebrow">Competitor · ${c.freq} departures</div><h2>${c.name}</h2></div>`,
        body:`
        <div class="wr-links">${c.us?chip("ok","This is you"):""}${chip(c.ads?"warn":"neutral",c.ads?"Running Google Ads":"No ads live")}${chip("neutral","Viator #"+c.viator)}</div>
        <div class="wr-ent-sec"><span class="eyebrow">Pricing</span>
          ${kv("Cliffs of Moher day",eur(c.cliffs))}${c.causeway?kv("Belfast & Causeway day",eur(c.causeway)):""}${c.kwg?kv("Kilkenny & Wicklow day",eur(c.kwg)):""}
          ${kv("Last price move",c.move===0?"held this week":(c.move>0?"+€":"-€")+Math.abs(c.move)+" this week")}</div>
        <div class="wr-ent-sec"><span class="eyebrow">Reputation & reach</span>
          ${kv("TripAdvisor","★ "+c.rating+" · "+c.reviews.toLocaleString("en-IE")+" reviews")}${kv("Social following",c.social+"k")}${kv("Departures",c.freq)}</div>
        <div class="wr-ent-sec"><span class="eyebrow">Positioning</span><p class="brief-p">${c.usp}.</p></div>
        <div class="wr-ent-sec"><span class="eyebrow">Connected</span><div class="wr-links">${jump("Competitor watch","marketing","competitors","megaphone")}${jump("Channel margin","finance","margin","euro")}</div></div>` };
    },
    customer(id){ const c=cust(id); if(!c) return null;
      return { head:`<div><div class="eyebrow">${c.region} · ${c.type} · via ${c.src}</div><h2>${c.name}</h2></div>`,
        body:`
        <div class="wr-ent-sec"><span class="eyebrow">Profile</span>
          ${kv("Trips taken",c.trips)}${kv("Lifetime value",eur(c.ltv))}${kv("First source",c.src)}${kv("Segment",c.type)}</div>
        <div class="wr-ent-sec"><span class="eyebrow">Booking history</span>
          ${kv("Cliffs of Moher & Galway","Jun 2026")}${c.trips>1?kv("Belfast & Giant's Causeway","Sep 2025"):""}${c.trips>3?kv("Kilkenny & Glendalough","May 2024"):""}</div>
        <div class="wr-ent-sec"><span class="eyebrow">Connected</span><div class="wr-links">${jump("Reviews","customers","reviews","star")}${jump("Campaigns","customers","campaigns","megaphone")}</div></div>` };
    },
  };

  /* ===================== ALERT CENTRE (one bell) ========================= */
  const bell = document.createElement("button");
  bell.className = "wr-bell"; bell.id = "wrBell"; bell.setAttribute("aria-label","Alerts");
  const redCount = ALERTS.filter(a=>a.urg==="red").length;
  bell.innerHTML = `${icon("bell",19)}<span class="wr-bell-badge">${ALERTS.length}</span>`;
  document.body.appendChild(bell);
  const alertsBack = document.createElement("div");
  alertsBack.className = "wr-alerts-back"; alertsBack.id = "wrAlertsBack";
  document.body.appendChild(alertsBack);
  function alertGroup(urg,label){ const items=ALERTS.filter(a=>a.urg===urg); if(!items.length) return "";
    return `<div class="wr-alerts-h">${label}</div>` + items.map(a=>`
      <button class="wr-alert" ${a.ent?`data-ent="${a.ent}"`:`data-go="${a.go}"`}>
        <span class="wr-alert-ic ${urg}">${icon(urg==="red"?"alert":"clock",16)}</span>
        <span class="wr-alert-main"><b>${a.title}</b><span>${a.detail}</span><span class="wr-alert-sec">${a.sec}</span></span>
      </button>`).join("");
  }
  function openAlerts(){
    alertsBack.innerHTML = `<div class="wr-alerts" id="wrAlerts">${alertGroup("red","Urgent")}${alertGroup("amber","This week")}</div>`;
    alertsBack.classList.add("open");
  }
  function closeAlerts(){ alertsBack.classList.remove("open"); }
  bell.addEventListener("click", e=>{ e.stopPropagation(); alertsBack.classList.contains("open")?closeAlerts():openAlerts(); });
  alertsBack.addEventListener("click", e=>{ if(e.target===alertsBack){ closeAlerts(); return; }
    const a = e.target.closest("[data-ent],[data-go]"); if(!a) return;
    closeAlerts();
    if(a.dataset.ent){ const [t,i]=a.dataset.ent.split(":"); openEnt(t,i); }
    else if(a.dataset.go){ setPage(a.dataset.go); }
  });

  /* ===================== OWNER VIEW (John's cockpit) ===================== */
  let wrOwner = false;
  function ownerCockpit(){
    const out = VEHICLES.filter(v=>v.status==="out").length;
    const reds = ALERTS.filter(a=>a.urg==="red");
    return `<div class="page" style="max-width:var(--page-max)">
      ${PageHeader({eyebrow:"Owner digest · read only", title:"Morning, John", sub:"Everything you need from Marbella, before you open a single email."})}
      ${card("Daily voice briefing", `<div class="wr-voice">
          <button class="wr-playbtn" data-toast="Playing the 40-second briefing">${icon("play",16)}</button>
          <div class="wr-wave">${Array.from({length:32},(_,i)=>`<span style="height:${20+Math.round(Math.abs(Math.sin(i*0.7))*60)}%"></span>`).join("")}</div>
          <span class="wr-voice-time">0:40</span>
        </div>
        <p class="brief-p" style="margin-top:16px">Good morning John. Five coaches are out, yesterday came in at €31,480 with an 84% load factor. One thing for you: Bus 9's PSV disc lapses in nineteen days, Sydney has the retest booked. Nothing else needs you today.</p>`, {eyebrow:"08:00 · spoken summary"})}
      <div class="wr-strip" style="margin-top:18px">
        ${tile({label:"Coaches out",value:String(out),raw:out,sub:"of 16",spark:[6,7,8,7,8,8]})}
        ${tile({label:"Yesterday revenue",value:"31,480",pre:"€",raw:31480,sub:"84% load factor",delta:{dir:"up",v:"9%"},spark:[27000,28400,29100,30200,30800,31480]})}
        ${tile({label:"Open red flags",value:String(reds.length),raw:reds.length,sub:"all in hand",go:"__alerts"})}
        ${tile({label:"Departures today",value:String(DEPARTURES.length),raw:DEPARTURES.length,sub:"all crewed"})}
      </div>
      <div class="grid grid-2" style="margin-top:18px">
        ${card("First lines from your inbox", `<div class="rows">
          <div class="row"><span class="row-ava" style="background:#fff">${(GOOGLE&&GOOGLE.gmail)||icon("inbox",15)}</span><div class="row-main"><b>Viator</b><span>Your weekly settlement of €18,240 has been paid...</span></div></div>
          <div class="row"><span class="row-ava" style="background:#fff">${(GOOGLE&&GOOGLE.gmail)||icon("inbox",15)}</span><div class="row-main"><b>Coach Hire enquiry</b><span>Hi, we are 42 people looking for a Galway day in...</span></div></div>
          <div class="row"><span class="row-ava" style="background:#fff">${(GOOGLE&&GOOGLE.gmail)||icon("inbox",15)}</span><div class="row-main"><b>Carlow Motor Factors</b><span>March parts statement attached, balance €1,210...</span></div></div>
        </div>`, {eyebrow:"Summarised, not forwarded"})}
        ${card("Open red flags", `<div class="rows">${reds.map(a=>`<div class="row"><span class="row-ava">${icon("alert",15)}</span><div class="row-main"><b>${a.title}</b><span>${a.detail}</span></div>${chip("bad",a.sec)}</div>`).join("")}</div>`, {eyebrow:"What Sydney is handling"})}
      </div>
      ${card("Today's departures", tableHTML(["Route","Coach","Seats","Status"], DEPARTURES.map(d=>({_ent:`departure:${d.id}`,cells:[`<b>${ROUTES[d.route].name}</b>`, veh(d.coach).name, `${d.sold}/${d.cap}`, statusChip(d.status)]}))), {eyebrow:"Running today"})}
    </div>`;
  }

  /* ===================== HOME (rich, still airy) ========================= */
  const _homeBody = homeBody;
  homeBody = function(){
    if(wrOwner) return ownerCockpit();
    let html = _homeBody();
    // tag the chatpage so the home layout scrolls from the top with the extra blocks
    html = html.replace('class="chatpage"','class="chatpage wr-home"');
    // the ACMR logo image has no Wild Rover equivalent, so drop it from the greeting
    html = html.replace(/<img class="greet-logo"[^>]*>/, `<span class="greet-mark">Wild Rover Tours</span>`);
    // example prompt chips + today strip + needs-you, injected after the composer bar
    const chips = `<div class="wr-chips">${PROMPTS.map(p=>`<button class="wr-chip-btn" data-prompt="${p.replace(/"/g,'&quot;')}">${p}</button>`).join("")}</div>`;
    const reds = ALERTS.filter(a=>a.urg==="red").slice(0,3);
    const out=VEHICLES.filter(v=>v.status==="out").length, sold=DEPARTURES.reduce((a,d)=>a+d.sold,0);
    const strip = `<div class="wr-strip">
      ${tile({label:"Coaches out",value:String(out),raw:out,sub:"of 16",go:"fleet",spark:[6,7,8,7,8,8]})}
      ${tile({label:"Seats sold today",value:String(sold),raw:sold,sub:DEPARTURES.length+" departures",go:"bookings",delta:{dir:"up",v:"6%"},spark:[142,151,160,158,165,sold]})}
      ${tile({label:"Revenue today",value:"28,910",pre:"€",raw:28910,sub:"pacing on last Wed",go:"finance",delta:{dir:"up",v:"6%"},spark:[24100,25800,26400,27100,28200,28910]})}
      ${tile({label:"Open alerts",value:String(ALERTS.length),raw:ALERTS.length,sub:reds.length+" need you now",go:"__alerts",delta:{dir:"down",v:"2"}})}
    </div>`;
    const sev={red:["bad","Act"],amber:["warn","Soon"]};
    const needs = card("Needs you", `<div class="rows wr-needs">${reds.map(a=>`
      <div class="row wr-needrow" data-sev="red">
        <span class="row-ava sev-red">${icon("alert",15)}</span>
        <div class="row-main wr-row" ${a.ent?`data-ent="${a.ent}"`:a.go?`data-go="${a.go}"`:''}><b>${a.title}</b><span>${a.detail}</span></div>
        <div class="wr-needact">${chip("bad",a.sec)}<button class="ghost wr-resolve" data-toast="Marked '${a.title}' as handled">${icon("check",13)} Resolve</button></div></div>`).join("")}</div>`, {eyebrow:"Sydney's queue · "+reds.length+" red-lines"});
    const extra = `<div class="wr-home-extra">${strip}${needs}</div>`;
    // place chips right after the composer bar, extras before the notes feed
    html = html.replace('<div class="notes-wrap"', chips + extra + '<div class="notes-wrap"');
    return html;
  };

  const PROMPTS = [
    "How much did Bus 7 cost this year?",
    "Who's free Thursday?",
    "What's our cost of sales this month?",
    "Which departures are under-loaded?",
  ];

  /* ===================== SYDNEY GPT (mock answers over the data) ========= */
  function answerWR(q){
    const s = (q||"").toLowerCase();
    if(/bus\s*7|gearbox|cost.*year|run.*cost/.test(s))
      return "Bus 7 (Mercedes Tourismo, 201-D-77310) has cost €38,420 to run so far this year: €21,900 fuel, €9,180 service and parts, €4,300 tyres and the €3,040 gearbox repair back in March. That one breakdown is what puts it €4,100 above the fleet average for its mileage band.";
    if(/free|available|cover|thursday|roster|who.*(can|do)/.test(s))
      return "Free on Thursday: Liam Gallagher (coach and private), Dan Whelan (private only), and guides Aoife Brennan and Colm Devlin. Pádraig is out, he is at 53h40 of the 56h fortnight limit, and Marek is off sick. Liam plus Aoife is the clean pairing for a Galway run.";
    if(/cost of sales|cos|margin.*month|20%|target/.test(s))
      return "Cost of sales is running at 22.4% this month against your 20% target. On €272,400 revenue that is €19,800 marketing and €41,200 OTA commission. The overshoot is channel mix: 66% of bookings came through Viator, Bresno and the bus partners at 20 to 30%. Move share to direct and it closes.";
    if(/under.?load|low.?load|empty|break.?even|under.?booked/.test(s))
      return "Two to watch. Kilkenny & Glendalough on Friday is at 19 of 50, below break-even. The Cliffs via Bunratty is at 44 of 51, healthy. If Friday does not lift by Wednesday, merging it into the Galway departure keeps one coach off the road.";
    if(/psv|licence|license|expir|compliance|disc/.test(s))
      return "One red-line on documents: Bus 9's PSV disc (06-D-19874) lapses in 19 days. The CVRT retest is booked. Bus 4's insurance renews 30 July, one month out and flagged amber. Everything else is valid.";
    if(/revenue|takings|how much.*today|sales today/.test(s))
      return "Today is pacing at €28,910 across five departures, up about 6% on last Wednesday. Yesterday closed at €31,480 with an 84% load factor.";
    if(/review|tripadvisor|rating|star/.test(s))
      return "You are on 64,210 reviews at 95% five-star, 4.9 average across TripAdvisor and Google. Two new today, both five-star for the Galway day. One 3-star from Tom R. about the Bunratty lunch stop is waiting on a reply.";
    return "I can answer across the whole business from your live data: fleet costs, who is free, seat counts, channel margin, compliance and the day's run. Try one of the example prompts, or ask about a specific coach, driver or departure.";
  }
  // route every assistant reply through the mock engine
  botReply = function(){
    const last = [...homeMsgs].reverse().find(m=>m.role==="user");
    const text = answerWR(last?last.text:"");
    setTimeout(()=>{ homeMsgs.push({ role:"bot", text }); renderHomeThread(); }, 320);
  };
  // palette "Ask AI" thread too
  enterChat = function(q){
    q=(q||"").trim(); if(!q) return;
    palMode="chat"; palList.classList.add("hide"); palChat.classList.add("show");
    palInput.placeholder="Reply to keep the thread going";
    chatMsgs.push({ role:"user", text:q }); renderChat(); palInput.value="";
    setTimeout(()=>{ chatMsgs.push({ role:"bot", text:answerWR(q) }); renderChat(); }, 280);
  };

  /* ===================== TOP-BAR OWNER TOGGLE ============================ */
  function mountOwnerToggle(){
    const inbar = document.querySelector(".topbar-in"); if(!inbar) return;
    const existing = inbar.querySelector(".wr-owner");
    if(currentPage!=="overview"){ if(existing) existing.remove(); return; }   // Home only
    if(existing) return;
    const t = document.createElement("div");
    t.className = "wr-owner"; t.setAttribute("role","tablist");
    t.innerHTML = `<button data-owner="office" class="${wrOwner?"":"on"}">Office</button><button data-owner="owner" class="${wrOwner?"on":""}">Owner view</button>`;
    inbar.appendChild(t);
    t.addEventListener("click", e=>{ const b=e.target.closest("[data-owner]"); if(!b) return;
      wrOwner = b.dataset.owner==="owner";
      t.querySelectorAll("button").forEach(z=>z.classList.toggle("on", z===b));
      if(currentPage!=="overview"){ setPage("overview"); } else { renderMain(); }
    });
  }

  /* ===================== WIRING (tabs, entities, jumps) ================== */
  function wireWR(){
    // tab switches
    main.querySelectorAll("[data-tab]").forEach(el=>el.addEventListener("click",()=>{
      const [sec,tab]=el.dataset.tab.split(":"); wrTab[sec]=tab; renderMain();
    }));
    // entity openers (rows, tiles, links, pins, veh cards)
    main.querySelectorAll("[data-ent]").forEach(el=>el.addEventListener("click",e=>{
      e.stopPropagation(); const [t,i]=el.dataset.ent.split(":"); if(i) openEnt(t,i);
    }));
    // tiles / buttons that jump to a section (or the alert centre)
    main.querySelectorAll("[data-go]").forEach(el=>el.addEventListener("click",()=>{
      const g=el.dataset.go; if(!g) return;
      if(g==="__alerts") openAlerts(); else setPage(g);
    }));
    // prompt chips on home
    main.querySelectorAll("[data-prompt]").forEach(el=>el.addEventListener("click",()=>{
      const q=el.dataset.prompt;
      if(typeof startChat==="function" && !homeMsgs.length) startChat(q); else sendHome(q);
    }));
    // action buttons -> toast
    main.querySelectorAll("[data-toast]").forEach(el=>el.addEventListener("click",e=>{ e.stopPropagation(); showToast(el.dataset.toast); }));
    // count-up on stat numbers
    countUp(main);
    // sortable table headers
    main.querySelectorAll("th[data-sort]").forEach(th=>th.addEventListener("click",()=>sortTable(th)));
    // trend spotter filter / sort
    main.querySelectorAll("[data-trendplat]").forEach(el=>el.addEventListener("click",()=>{ wrTrendPlat=el.dataset.trendplat; renderMain(); }));
    main.querySelectorAll("[data-trendsort]").forEach(el=>el.addEventListener("click",()=>{ wrTrendSort=el.dataset.trendsort; renderMain(); }));
    // fleet + compliance filters
    main.querySelectorAll("[data-fleetfilter]").forEach(el=>el.addEventListener("click",()=>{ wrFleetFilter=el.dataset.fleetfilter; renderMain(); }));
    main.querySelectorAll("[data-compfilter]").forEach(el=>el.addEventListener("click",()=>{ wrCompFilter=el.dataset.compfilter; renderMain(); }));
    main.querySelectorAll("[data-revplat]").forEach(el=>el.addEventListener("click",()=>{ wrRevPlat=el.dataset.revplat; renderMain(); }));
    // one-tap resolve on the "needs you" queue
    main.querySelectorAll(".wr-resolve").forEach(b=>b.addEventListener("click",e=>{ e.stopPropagation(); const row=b.closest(".wr-needrow"); if(row){ row.style.transition="opacity .25s var(--ease),transform .25s var(--ease)"; row.style.opacity="0"; row.style.transform="translateX(10px)"; setTimeout(()=>row.remove(),240); } }));
    mountOwnerToggle();
  }

  const REDUCE = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  function countUp(scope){
    scope.querySelectorAll(".wr-num[data-count]").forEach(el=>{
      const to=parseFloat(el.dataset.count); if(isNaN(to)) return;
      const dec=+(el.dataset.dec||0), pre=el.dataset.pre||"", suf=el.dataset.suf||"";
      const fmt=v=>pre+(dec?v.toFixed(dec):Math.round(v).toLocaleString("en-IE"))+suf;
      if(REDUCE){ el.textContent=fmt(to); return; }
      const dur=560, t0=performance.now();
      const step=t=>{ const k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3); el.textContent=fmt(to*e); if(k<1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }
  function sortTable(th){
    const table=th.closest("table"), tb=table.tBodies[0], idx=+th.dataset.sort, num=th.dataset.num==="1";
    const dir = th.dataset.dir==="asc" ? "desc" : "asc";
    table.querySelectorAll("th[data-sort]").forEach(h=>h.removeAttribute("data-dir"));
    th.dataset.dir=dir;
    const rows=[...tb.rows];
    const val=tr=>{ const c=tr.cells[idx]; if(!c) return ""; const t=c.textContent.trim();
      if(num){ const n=parseFloat(t.replace(/[^0-9.\-]/g,"")); return isNaN(n)?0:n; } return t.toLowerCase(); };
    rows.sort((a,b)=>{ const x=val(a),y=val(b); return (x<y?-1:x>y?1:0)*(dir==="asc"?1:-1); });
    rows.forEach(r=>tb.appendChild(r));
  }
  // panel-internal jumps (cross-links): close panel, navigate, optionally open another entity
  entBack.addEventListener("click", e=>{
    const to = e.target.closest("[data-toast]"); if(to){ e.stopPropagation(); showToast(to.dataset.toast); return; }
    const j = e.target.closest("[data-jump]"); if(j){ const [sec,tab]=j.dataset.jump.split(":"); closeEnt(); if(tab) wrTab[sec]=tab; setPage(sec); return; }
    const en = e.target.closest("[data-ent]"); if(en){ const [t,i]=en.dataset.ent.split(":"); openEnt(t,i); }
  });

  /* ===================== BOOT ============================================ */
  // wrap renderMain so WR wiring runs after every paint
  const _renderMain = renderMain;
  renderMain = function(){ _renderMain(); wireWR(); };

  // swap the ACMR logo marks for a Wild Rover wordmark (no WR asset exists):
  // "WR" collapsed, "Wild Rover" on hover, crossfading on the rail's own timing.
  function swapMarks(){
    document.querySelectorAll(".brand-logo").forEach(img=>{ const s=document.createElement("span");
      s.className="wr-brandmark";
      s.innerHTML=`<span class="wr-bm-short">WR</span><span class="wr-bm-full">Wild Rover</span>`;
      img.replaceWith(s); });
  }

  // re-render the sidebar so the new NAV icons (bus, ticket, ...) paint, then refresh
  renderSidebar();
  swapMarks();
  document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ closeEnt(); closeAlerts(); } });
  renderMain();
})();
