import { useState, useMemo, useCallback, useRef } from "react";

/* ================================================================
   CACTUS JAX ROOFING & CONSTRUCTION — HOUSTON, TX
   ================================================================ */
const C = {
  name: "Cactus Jax Roofing & Construction",
  nameShort: "Cactus Jax",
  phone: "(713) 364-0518",
  phoneRaw: "7133640518",
  email: "sales@cactusjaxroofing.com",
  city: "Houston",
  state: "TX",
  serviceArea: "the Houston Metro Area",
  address: "1660 South Dairy Ashford Rd, Houston, TX 77077",
  tagline: "Woman-Owned. Family-Operated. Built on Integrity.",
  rating: "5.0",
  reviewCount: "30+",
  yearsExp: "20+",
  projectsCompleted: "1,000+",
  pri: "#2D4A3E",
  priL: "#3D6B5A",
  acc: "#D4764E",
  accH: "#C0623B",
  calOwner: "Reid",
  calTitle: "15-Min Roofing Consultation",
  dur: 15,
  slots: {
    1: ["10:00","10:30","11:00","13:00","13:30","14:00","14:30","15:00","15:30","16:00"],
    2: ["10:00","10:30","11:00","13:00","13:30","14:00","14:30","15:00","15:30","16:00"],
    3: ["10:00","10:30","11:00","13:00","13:30","14:00","14:30","15:00","15:30","16:00"],
    4: ["10:00","10:30","11:00","13:00","13:30","14:00","14:30","15:00","15:30","16:00"],
    5: ["10:00","10:30","11:00","13:00","13:30","14:00"],
  },
};

/* Free-to-use roofing/house images */
const IMG = {
  hero: "/images/mid-cities/hero.webp",
  gallery: [
    "/images/mid-cities/gallery1.jpg",
    "/images/mid-cities/gallery2.png",
    "/images/mid-cities/gallery3.jpg",
    "/images/mid-cities/gallery4.avif",
  ],
  work1: "/images/mid-cities/work1.webp",
  work2: "/images/mid-cities/hero.webp",
};

const REVIEWS = [
  { text: "Bryan is the most knowledgeable roofing contractor in the industry. He insists on quality work and having highly skilled people. Go with Cactus Jax — you'll get the roof replacement you pay for.", name: "Verified Customer", loc: "Houston, TX" },
  { text: "BK and Darren took care of a complete outside remodel on my house with roof replacement. Great communication the whole way through. The whole neighborhood has given us so many compliments.", name: "Verified Customer", loc: "Houston, TX" },
  { text: "They replaced my mom's roof and I couldn't be happier. Professional, very informative, fair pricing with no surprises. The installation team was friendly, efficient, and tidy. Highly recommend.", name: "Verified Customer", loc: "Houston, TX" },
];

const SERVICES = [
  { title: "Roof Replacement", desc: "Complete tear-off and replacement with GAF lifetime warranty materials. Residential and commercial.", icon: "home" },
  { title: "Roof Repair", desc: "From minor leaks to major storm damage. Thorough inspection and expert repairs to restore your roof.", icon: "tool" },
  { title: "Storm Damage", desc: "24-hour emergency response. Insurance claim assistance and full storm damage restoration.", icon: "storm" },
  { title: "Commercial Roofing", desc: "TPO, PVC, EPDM, metal — full commercial solutions for offices, retail, and industrial.", icon: "building" },
  { title: "Free Inspections", desc: "Comprehensive roof assessment with photos and an honest report. No pressure, no obligation.", icon: "clipboard" },
  { title: "Solar Installation", desc: "Solar power installation to reduce energy costs and increase property value.", icon: "sun" },
];

const AREAS = ["Katy", "Cypress", "Clear Lake", "Missouri City", "Crosby", "Sugar Land", "Pearland", "Spring"];

/* ================================================================
   STYLES
   ================================================================ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap');
:root {
  --pri:${C.pri};--priL:${C.priL};--acc:${C.acc};--accH:${C.accH};
  --dk:#12201A;--wh:#FFFFFF;--g50:#F9FAF9;--g100:#F0F2F0;--g200:#DFE3DF;--g300:#C5CAC5;--g400:#9AA09A;--g500:#6B736B;--g700:#3A423A;--g900:#1A1F1A;
  --red:#C0392B;
  --fd:'Oswald',sans-serif;--fb:'Source Sans 3',sans-serif;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
body{font-family:var(--fb);color:var(--g900);background:var(--wh);line-height:1.6;overflow-x:hidden}
img{max-width:100%;display:block}a{text-decoration:none;color:inherit}

.tb{background:var(--dk);color:var(--wh);padding:10px 0;text-align:center;font-size:14px;font-weight:600;letter-spacing:.4px;position:sticky;top:0;z-index:1000}
.tb a{color:var(--acc);font-size:17px;letter-spacing:.5px}
.tb .el{display:inline-block;background:var(--red);font-size:10px;font-weight:700;padding:2px 8px;border-radius:3px;margin-right:8px;letter-spacing:1px;text-transform:uppercase;vertical-align:middle}
.ctn{max-width:1120px;margin:0 auto;padding:0 24px}

/* HERO with BG image */
.hero{position:relative;color:var(--wh);padding:80px 0 64px;overflow:hidden;min-height:560px;display:flex;align-items:center}
.hero-bg{position:absolute;inset:0;z-index:0}
.hero-bg img{width:100%;height:100%;object-fit:cover}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(145deg,rgba(18,32,26,.92) 0%,rgba(45,74,62,.85) 50%,rgba(18,32,26,.8) 100%)}
.hero .ctn{position:relative;z-index:1}
.hg{display:grid;grid-template-columns:1.1fr .9fr;gap:44px;align-items:center}
.ht h1{font-family:var(--fd);font-size:clamp(30px,5vw,50px);font-weight:700;line-height:1.08;text-transform:uppercase;margin-bottom:8px}
.ht h1 span{color:var(--acc)}
.ht .tl{font-size:15px;color:var(--acc);font-weight:600;letter-spacing:.5px;text-transform:uppercase;margin-bottom:12px;font-family:var(--fd)}
.ht p{font-size:17px;opacity:.85;margin-bottom:24px;max-width:480px}
.hb{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}
.bdg{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);padding:5px 12px;border-radius:6px;font-size:12px;font-weight:600;letter-spacing:.3px}
.pc{display:flex;align-items:center;gap:12px;margin-top:10px}
.pc a{font-family:var(--fd);font-size:24px;font-weight:700;color:var(--acc);letter-spacing:1px}
.pc .orl{font-size:13px;opacity:.55;text-transform:uppercase;letter-spacing:1px}

.cta{display:block;width:100%;padding:15px;background:var(--acc);color:var(--wh);border:none;border-radius:8px;font-family:var(--fd);font-size:17px;font-weight:700;text-transform:uppercase;letter-spacing:1px;cursor:pointer;transition:background .2s,transform .1s;text-align:center}
.cta:hover{background:var(--accH);transform:translateY(-1px)}
.cta:active{transform:translateY(0)}
.cta:disabled{opacity:.45;cursor:default;transform:none}

.fc{background:var(--wh);color:var(--g900);border-radius:14px;padding:32px 28px;box-shadow:0 24px 64px rgba(0,0,0,.3);position:relative;z-index:2}
.fc h2{font-family:var(--fd);font-size:22px;font-weight:600;text-transform:uppercase;margin-bottom:4px;color:var(--pri)}
.fc .sh{font-size:13px;color:var(--g500);margin-bottom:16px}
.fc input,.fc select{width:100%;padding:13px 14px;border:1.5px solid var(--g300);border-radius:8px;font-family:var(--fb);font-size:15px;transition:border .2s;background:var(--g50);margin-bottom:10px}
.fc input:focus,.fc select:focus{outline:none;border-color:var(--pri);background:var(--wh)}
.fn{text-align:center;font-size:12px;color:var(--g500);margin-top:6px}

/* PROOF */
.ps{background:var(--g100);padding:28px 0;border-bottom:1px solid var(--g200)}
.pg{display:flex;justify-content:center;align-items:center;gap:44px;flex-wrap:wrap}
.pi{text-align:center}
.pi .nm{font-family:var(--fd);font-size:34px;font-weight:700;color:var(--pri);line-height:1}
.pi .lb{font-size:12px;color:var(--g500);font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-top:4px}
.st{color:var(--acc);font-size:18px;letter-spacing:2px}

/* GALLERY STRIP */
.gal{padding:0;overflow:hidden}
.gal-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0}
.gal-grid img{width:100%;height:200px;object-fit:cover;display:block;transition:transform .3s}
.gal-grid img:hover{transform:scale(1.03)}

/* AREAS */
.as{background:var(--pri);padding:16px 0;overflow:hidden}
.as-inner{display:flex;gap:32px;animation:scroll 22s linear infinite;white-space:nowrap}
@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.as-inner{animation:none;flex-wrap:wrap;justify-content:center}}
.as span{font-family:var(--fd);font-size:14px;font-weight:600;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:2px}
.as .dot{color:var(--acc)}

/* SERVICES */
.svcs{padding:64px 0}
.sh2{text-align:center;margin-bottom:40px}
.sh2 h2{font-family:var(--fd);font-size:clamp(26px,4vw,38px);font-weight:700;text-transform:uppercase;color:var(--pri)}
.sh2 p{font-size:16px;color:var(--g500);max-width:540px;margin:6px auto 0}
.sg{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px}
.sc{background:var(--wh);border:1.5px solid var(--g200);border-radius:12px;padding:28px 20px;text-align:center;transition:border-color .2s,box-shadow .2s}
.sc:hover{border-color:var(--acc);box-shadow:0 8px 28px rgba(0,0,0,.06)}
.sc .ic{width:52px;height:52px;background:linear-gradient(135deg,var(--pri),var(--priL));border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.sc h3{font-family:var(--fd);font-size:16px;font-weight:600;text-transform:uppercase;margin-bottom:6px}
.sc p{font-size:13px;color:var(--g500);line-height:1.5}

/* SPLIT IMAGE+TEXT */
.split{padding:72px 0}
.split-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.split-img{border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,.1)}
.split-img img{width:100%;height:380px;object-fit:cover;display:block}
.split-txt h2{font-family:var(--fd);font-size:clamp(24px,3.5vw,36px);font-weight:700;text-transform:uppercase;color:var(--pri);margin-bottom:12px}
.split-txt p{font-size:16px;color:var(--g500);line-height:1.7;margin-bottom:16px}
.split-txt .tag{display:inline-block;background:var(--g100);border:1px solid var(--g200);border-radius:6px;padding:4px 12px;font-size:12px;font-weight:600;color:var(--g700);margin-right:8px;margin-bottom:6px}

/* WHY US */
.wu{background:var(--pri);color:var(--wh);padding:64px 0}
.wu .sh2 h2{color:var(--wh)}.wu .sh2 p{color:rgba(255,255,255,.65)}
.wg{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:28px}
.wi{text-align:center}
.wi .wn{font-family:var(--fd);font-size:44px;font-weight:700;color:var(--acc);line-height:1}
.wi h3{font-family:var(--fd);font-size:15px;font-weight:600;text-transform:uppercase;margin:6px 0 4px;letter-spacing:.5px}
.wi p{font-size:13px;opacity:.7}

/* REVIEWS */
.rv{padding:64px 0;background:var(--g50)}
.rg{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.rc{background:var(--wh);border-radius:12px;padding:24px 20px;box-shadow:0 2px 12px rgba(0,0,0,.04);border:1px solid var(--g200)}
.rc .st{margin-bottom:10px;display:block}
.rc p{font-size:14px;color:var(--g700);line-height:1.6;font-style:italic;margin-bottom:12px}
.rc .rn{font-weight:700;font-size:13px;color:var(--g900)}
.rc .rn span{font-weight:400;color:var(--g500)}

/* FINANCING */
.fin{padding:48px 0;text-align:center;border-bottom:1px solid var(--g200)}
.fin h2{font-family:var(--fd);font-size:28px;font-weight:700;color:var(--pri);text-transform:uppercase;margin-bottom:8px}
.fin p{font-size:16px;color:var(--g500);max-width:560px;margin:0 auto}
.fin .pills{display:flex;gap:12px;justify-content:center;margin-top:16px;flex-wrap:wrap}
.fin .pill{background:var(--g100);border:1px solid var(--g200);border-radius:8px;padding:8px 18px;font-size:13px;font-weight:600;color:var(--g700)}

/* BOTTOM CTA */
.bc{background:linear-gradient(145deg,var(--dk) 0%,var(--pri) 100%);color:var(--wh);text-align:center;padding:64px 24px;position:relative;overflow:hidden}
.bc::before{content:'';position:absolute;inset:0;background:url('${IMG.work2}') center/cover;opacity:.1;pointer-events:none}
.bc .ctn{position:relative;z-index:1}
.bc h2{font-family:var(--fd);font-size:clamp(26px,4vw,40px);font-weight:700;text-transform:uppercase;margin-bottom:14px}
.bc p{font-size:17px;opacity:.8;max-width:520px;margin:0 auto 24px}
.bc .cta{display:inline-block;width:auto;padding:16px 44px}
.bc .pb{margin-top:18px;font-size:14px;opacity:.7}
.bc .pb a{color:var(--acc);font-size:20px;font-weight:700;font-family:var(--fd)}

.ft{background:var(--dk);color:rgba(255,255,255,.45);text-align:center;padding:24px;font-size:13px}
.ft a{color:var(--acc)}

/* ============================================================
   BOOKING MODAL — 5-STEP QUALIFIER
   ============================================================ */
.bko{position:fixed;inset:0;background:rgba(18,32,26,.78);z-index:2000;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(5px);animation:fi .25s ease}
@keyframes fi{from{opacity:0}to{opacity:1}}
.bkm{background:var(--wh);border-radius:16px;max-width:560px;width:100%;max-height:92vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.45);animation:su .3s ease}
@keyframes su{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}
.bkh{display:flex;align-items:center;justify-content:space-between;padding:20px 24px 12px}
.bkh h2{font-family:var(--fd);font-size:20px;font-weight:600;color:var(--pri);text-transform:uppercase}
.bkx{background:none;border:none;cursor:pointer;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;transition:background .2s;color:var(--g500);font-size:18px}
.bkx:hover{background:var(--g100);color:var(--g900)}

/* Progress bar */
.bk-prog{padding:0 24px 16px;display:flex;gap:6px}
.bk-prog .bar{flex:1;height:4px;border-radius:4px;background:var(--g200);transition:background .3s}
.bk-prog .bar.active{background:var(--acc)}
.bk-prog .bar.done{background:var(--pri)}

.bk-body{padding:0 24px 24px}
.bk-body h3{font-family:var(--fd);font-size:20px;font-weight:600;color:var(--g900);text-transform:uppercase;margin-bottom:4px}
.bk-body .sub{font-size:14px;color:var(--g500);margin-bottom:18px}

/* Option cards */
.opt-grid{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.opt{display:flex;align-items:center;gap:14px;padding:14px 16px;border:1.5px solid var(--g200);border-radius:10px;cursor:pointer;transition:all .15s;background:var(--wh)}
.opt:hover{border-color:var(--priL);background:rgba(45,74,62,.03)}
.opt.sel{border-color:var(--pri);background:rgba(45,74,62,.06)}
.opt .opt-radio{width:20px;height:20px;border-radius:50%;border:2px solid var(--g300);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s}
.opt.sel .opt-radio{border-color:var(--pri);background:var(--pri)}
.opt.sel .opt-radio::after{content:'';width:8px;height:8px;border-radius:50%;background:var(--wh)}
.opt .opt-txt h4{font-size:15px;font-weight:600;color:var(--g900);margin:0}
.opt .opt-txt p{font-size:12px;color:var(--g500);margin:2px 0 0}

/* Form inputs in booking */
.bk-field{margin-bottom:12px}
.bk-field label{display:block;font-size:13px;font-weight:600;color:var(--g700);margin-bottom:4px}
.bk-field input{width:100%;padding:12px 14px;border:1.5px solid var(--g300);border-radius:8px;font-family:var(--fb);font-size:15px;background:var(--g50);transition:border .2s}
.bk-field input:focus{outline:none;border-color:var(--pri);background:var(--wh)}

/* Booking nav */
.bk-nav{display:flex;gap:10px;margin-top:16px}
.bk-nav .bk-back{flex:0 0 auto;padding:12px 20px;border:1.5px solid var(--g300);border-radius:8px;background:var(--wh);font-family:var(--fd);font-size:15px;font-weight:600;color:var(--g700);cursor:pointer;text-transform:uppercase;letter-spacing:.5px;transition:all .15s}
.bk-nav .bk-back:hover{border-color:var(--g500);color:var(--g900)}
.bk-nav .cta{flex:1}

/* Calendar (step 5) */
.ch{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.ch .cm{font-family:var(--fd);font-size:17px;font-weight:600;color:var(--g900)}
.cn{display:flex;gap:5px}
.cn button{width:30px;height:30px;border-radius:8px;border:1px solid var(--g300);background:var(--wh);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s;color:var(--g700);font-size:14px}
.cn button:hover:not(:disabled){background:var(--g100)}
.cn button:disabled{opacity:.3;cursor:default}
.cd{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;margin-bottom:3px}
.cd span{font-size:10px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.5px;padding:3px 0}
.cg{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.cy{width:100%;aspect-ratio:1;border-radius:7px;border:none;background:none;font-family:var(--fb);font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;color:var(--g700);display:flex;align-items:center;justify-content:center}
.cy:hover:not(:disabled):not(.sl){background:var(--g100)}
.cy.sl{background:var(--pri);color:var(--wh)}
.cy.td:not(.sl){border:2px solid var(--acc)}
.cy:disabled{color:var(--g300);cursor:default}
.cy.em{visibility:hidden}
.ts{margin-top:12px}
.tsl{font-family:var(--fd);font-size:12px;font-weight:600;color:var(--g500);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}
.tsg{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;max-height:160px;overflow-y:auto}
.tsb{padding:9px 8px;border:1.5px solid var(--g300);border-radius:8px;background:var(--wh);font-family:var(--fb);font-size:13px;font-weight:600;color:var(--g700);cursor:pointer;transition:all .15s;text-align:center}
.tsb:hover{border-color:var(--pri);color:var(--pri)}
.tsb.sl{border-color:var(--pri);background:var(--pri);color:var(--wh)}

/* CONFIRMED */
.bkc{text-align:center;padding:40px 24px}
.bkc .ck{width:64px;height:64px;background:var(--pri);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px}
.bkc h3{font-family:var(--fd);font-size:24px;font-weight:700;color:var(--pri);text-transform:uppercase;margin-bottom:8px}
.bkc p{font-size:15px;color:var(--g500);margin-bottom:4px}
.bkc .dt{font-weight:700;color:var(--g900);font-size:16px}
.bkc .summ{background:var(--g50);border:1px solid var(--g200);border-radius:10px;padding:16px;margin:18px 0;text-align:left;font-size:13px;color:var(--g700);line-height:1.7}
.bkc .summ strong{color:var(--g900)}

@media(max-width:768px){
  .hg{grid-template-columns:1fr;gap:28px}
  .split-grid{grid-template-columns:1fr}
  .split-img img{height:260px}
  .gal-grid{grid-template-columns:repeat(2,1fr)}
  .gal-grid img{height:160px}
  .pg{gap:24px}
  .wg{grid-template-columns:1fr 1fr}
  .tsg{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:480px){.wg{grid-template-columns:1fr}.gal-grid{grid-template-columns:1fr}.gal-grid img{height:200px}}
`;

/* Helpers */
const MO=["January","February","March","April","May","June","July","August","September","October","November","December"];
const DY=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const fmt=t=>{const[h,m]=t.split(":").map(Number);return`${h%12||12}:${m.toString().padStart(2,"0")} ${h>=12?"PM":"AM"}`};
const addM=(t,n)=>{const[h,m]=t.split(":").map(Number);const x=h*60+m+n;return`${Math.floor(x/60)%24}:${(x%60).toString().padStart(2,"0")}`};
const dim=(y,m)=>new Date(y,m+1,0).getDate();
const fdm=(y,m)=>new Date(y,m,1).getDay();

const Ic={
  chk:<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M14 4.5L6.5 12 2 7.5l1.4-1.4 3.1 3.1L12.6 3.1 14 4.5z" fill="#4ADE80"/></svg>,
  star:<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 1l2.2 4.5 5 .7-3.6 3.5.9 5L8 12.4 3.5 14.7l.9-5L.8 6.2l5-.7L8 1z" fill="#D4764E"/></svg>,
  clk:<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" stroke="#6B9E8A" strokeWidth="2" fill="none"/><path d="M8 4v4l3 2" stroke="#6B9E8A" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>,
  home:<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 21h18M4 21V10l8-7 8 7v11" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  tool:<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.8-3.8a7 7 0 01-9.9 9.9L6.3 20.7a2 2 0 01-2.8 0l-.2-.2a2 2 0 010-2.8l5.3-5.3a7 7 0 019.9-9.9L14.7 6.3z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  storm:<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  building:<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 9h.01M15 9h.01M9 13h.01M15 13h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  clipboard:<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  sun:<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>,
  cl:<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  cr:<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  bigChk:<svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};
const iconMap={home:Ic.home,tool:Ic.tool,storm:Ic.storm,building:Ic.building,clipboard:Ic.clipboard,sun:Ic.sun};

/* ================================================================
   5-STEP QUALIFYING BOOKING MODAL
   Step 1: Pick date & time
   Step 2: Contact info (name, phone, email)
   Step 3: What's your situation? (inspection / upcoming project / storm damage / insurance claim)
   Step 4: Do you have homeowner's insurance?
   Step 5: Need financing?
   Step 6: Confirmation / Thank you
   ================================================================ */
const SITUATIONS = [
  { id: "inspection", title: "Roof Inspection", desc: "I want a professional to check my roof's condition" },
  { id: "project", title: "Upcoming Project (3+ Months)", desc: "Planning a replacement or major repair down the road" },
  { id: "storm", title: "Storm or Weather Damage", desc: "My roof was recently damaged by a storm, hail, or wind" },
  { id: "leak", title: "Active Leak or Urgent Repair", desc: "I need help now — water is coming in or visible damage" },
  { id: "insurance", title: "Insurance Claim Assistance", desc: "I need help filing or managing a roof insurance claim" },
];

const INSURANCE_OPTS = [
  { id: "yes", title: "Yes, I Have Homeowner's Insurance", desc: "I have an active homeowner's insurance policy" },
  { id: "no", title: "No Insurance / Self-Pay", desc: "I'll be paying out of pocket for this project" },
  { id: "unsure", title: "Not Sure / Need Help", desc: "I'd like guidance on insurance options for my roof" },
];

const FINANCE_OPTS = [
  { id: "yes", title: "Yes, I'm Interested in Financing", desc: "I'd like to hear about monthly payment options" },
  { id: "no", title: "No, I'll Pay in Full", desc: "I plan to cover the cost upfront or through insurance" },
  { id: "maybe", title: "Maybe — Tell Me More on the Call", desc: "I want to understand my options first" },
];

function OptionCard({ items, value, onChange }) {
  return (
    <div className="opt-grid">
      {items.map(o => (
        <div key={o.id} className={`opt${value === o.id ? " sel" : ""}`} onClick={() => onChange(o.id)}>
          <div className="opt-radio" />
          <div className="opt-txt"><h4>{o.title}</h4><p>{o.desc}</p></div>
        </div>
      ))}
    </div>
  );
}

function BookingModal({ onClose }) {
  const todayRef = useRef(new Date());
  const today = todayRef.current;
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [situation, setSituation] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [finance, setFinance] = useState(null);

  // Calendar state
  const [cY, sY] = useState(today.getFullYear());
  const [cM, sM] = useState(today.getMonth());
  const [selD, sSelD] = useState(null);
  const [selT, sSelT] = useState(null);

  const totalSteps = 5;
  const d = dim(cY, cM), f = fdm(cY, cM);
  const canP = cY > today.getFullYear() || (cY === today.getFullYear() && cM > today.getMonth());
  const slots = useMemo(() => { if (!selD) return []; const dow = new Date(cY, cM, selD).getDay(); return C.slots[dow] || []; }, [selD, cY, cM]);
  const dis = useCallback(day => { const d2 = new Date(cY, cM, day); if (d2 < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return true; const dow = d2.getDay(); return !C.slots[dow] || C.slots[dow].length === 0; }, [cY, cM, today]);
  const pm = () => { if (cM === 0) { sM(11); sY(y => y - 1); } else sM(m => m - 1); sSelD(null); sSelT(null); };
  const nm = () => { if (cM === 11) { sM(0); sY(y => y + 1); } else sM(m => m + 1); sSelD(null); sSelT(null); };
  const ds = selD ? `${DY[new Date(cY, cM, selD).getDay()]}, ${MO[cM]} ${selD}, ${cY}` : "";

  const canNext = () => {
    if (step === 1) return selD && selT;
    if (step === 2) return contact.name.trim() && contact.phone.trim();
    if (step === 3) return !!situation;
    if (step === 4) return !!insurance;
    if (step === 5) return !!finance;
    return false;
  };

  const sitLabel = SITUATIONS.find(s => s.id === situation)?.title || "";
  const insLabel = INSURANCE_OPTS.find(s => s.id === insurance)?.title || "";
  const finLabel = FINANCE_OPTS.find(s => s.id === finance)?.title || "";

  return (
    <div className="bko" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bkm">
        <div className="bkh">
          <h2>{step <= 5 ? `Step ${step} of ${totalSteps}` : "Confirmed!"}</h2>
          <button className="bkx" onClick={onClose}>✕</button>
        </div>

        {step <= 5 && (
          <div className="bk-prog">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className={`bar${i + 1 < step ? " done" : ""}${i + 1 === step ? " active" : ""}`} />
            ))}
          </div>
        )}

        {step === 6 ? (
          <div className="bkc">
            <div className="ck">{Ic.bigChk}</div>
            <h3>You're All Set!</h3>
            <p>Your consultation is booked.</p>
            <p className="dt">{ds} at {selT && fmt(selT)}</p>
            <div className="summ">
              <strong>{contact.name}</strong> · {contact.phone}{contact.email && ` · ${contact.email}`}<br />
              <strong>Need:</strong> {sitLabel}<br />
              <strong>Insurance:</strong> {insLabel}<br />
              <strong>Financing:</strong> {finLabel}
            </div>
            <p style={{ fontSize: 13, color: "var(--g400)" }}>A confirmation has been sent{contact.email ? ` to ${contact.email}` : ""}. We look forward to helping you!</p>
            <button className="cta" style={{ marginTop: 16 }} onClick={onClose}>Done</button>
          </div>
        ) : (
          <div className="bk-body">
            {/* STEP 1: Calendar */}
            {step === 1 && (<>
              <h3>Pick a Date & Time</h3>
              <p className="sub">Choose a 15-minute slot that works for you.</p>
              <div className="ch"><span className="cm">{MO[cM]} {cY}</span><div className="cn"><button onClick={pm} disabled={!canP}>{Ic.cl}</button><button onClick={nm}>{Ic.cr}</button></div></div>
              <div className="cd">{DY.map(d => <span key={d}>{d}</span>)}</div>
              <div className="cg">
                {Array.from({ length: f }, (_, i) => <button key={`e${i}`} className="cy em" disabled />)}
                {Array.from({ length: d }, (_, i) => { const day = i + 1; const isT = day === today.getDate() && cM === today.getMonth() && cY === today.getFullYear(); return (<button key={day} className={`cy${day === selD ? " sl" : ""}${isT ? " td" : ""}`} disabled={dis(day)} onClick={() => { sSelD(day); sSelT(null); }}>{day}</button>); })}
              </div>
              {selD && slots.length > 0 && (
                <div className="ts">
                  <div className="tsl">{ds}</div>
                  <div className="tsg">{slots.map(t => <button key={t} className={`tsb${selT === t ? " sl" : ""}`} onClick={() => sSelT(t)}>{fmt(t)}</button>)}</div>
                </div>
              )}
            </>)}

            {/* STEP 2: Contact */}
            {step === 2 && (<>
              <h3>Your Contact Info</h3>
              <p className="sub">Tell us how to reach you.</p>
              <div className="bk-field"><label>Full Name *</label><input value={contact.name} onChange={e => setContact(c => ({ ...c, name: e.target.value }))} placeholder="e.g. Bryan Smith" /></div>
              <div className="bk-field"><label>Phone Number *</label><input type="tel" value={contact.phone} onChange={e => setContact(c => ({ ...c, phone: e.target.value }))} placeholder="(713) 555-1234" /></div>
              <div className="bk-field"><label>Email (optional)</label><input type="email" value={contact.email} onChange={e => setContact(c => ({ ...c, email: e.target.value }))} placeholder="you@email.com" /></div>
            </>)}

            {/* STEP 3: Situation */}
            {step === 3 && (<>
              <h3>What Brings You In?</h3>
              <p className="sub">Select the option that best describes your situation.</p>
              <OptionCard items={SITUATIONS} value={situation} onChange={setSituation} />
            </>)}

            {/* STEP 4: Insurance */}
            {step === 4 && (<>
              <h3>Homeowner's Insurance</h3>
              <p className="sub">This helps us prepare the right options for your consultation.</p>
              <OptionCard items={INSURANCE_OPTS} value={insurance} onChange={setInsurance} />
            </>)}

            {/* STEP 5: Financing */}
            {step === 5 && (<>
              <h3>Interested in Financing?</h3>
              <p className="sub">We partner with Enhancify for flexible monthly payment plans.</p>
              <OptionCard items={FINANCE_OPTS} value={finance} onChange={setFinance} />
            </>)}

            {/* NAV */}
            <div className="bk-nav">
              {step > 1 && <button className="bk-back" onClick={() => setStep(s => s - 1)}>← Back</button>}
              <button className="cta" disabled={!canNext()} onClick={() => { if (step === 5) { window.location.href = "/book"; } else { setStep(s => s + 1); } }}>
                {step === 5 ? "Confirm Booking →" : "Continue →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   MAIN
   ================================================================ */
export default function CactusJaxLanding() {
  const [bk, sBk] = useState(false);
  const areaList = [...AREAS, ...AREAS];

  return (
    <>
      <style>{css}</style>

      <div className="tb"><span className="el">24/7 Emergency</span>Call Now: <a href={`tel:${C.phoneRaw}`}>{C.phone}</a></div>

      {/* HERO WITH BG IMAGE */}
      <section className="hero">
        <div className="hero-bg"><img src={IMG.hero} alt="" /><div /></div>
        <div className="ctn"><div className="hg">
          <div className="ht">
            <div className="tl">{C.tagline}</div>
            <div className="hb">
              <div className="bdg">{Ic.chk} Licensed & Insured</div>
              <div className="bdg">{Ic.star} GAF Lifetime Warranty</div>
              <div className="bdg">{Ic.clk} 24-Hour Response</div>
            </div>
            <h1>{C.city}'s Trusted <span>Roofing Experts</span></h1>
            <p>Storm damage? Leaks? Full replacement? {C.name} delivers expert craftsmanship with honest pricing and flexible financing across {C.serviceArea}.</p>
            <div className="pc"><span className="orl">Or call →</span><a href={`tel:${C.phoneRaw}`}>{C.phone}</a></div>
          </div>
          <div className="fc">
            <h2>Book Consultation</h2>
              <p className="sh">Schedule your free roofing consultation in under 60 seconds.</p>
              <button className="cta" onClick={() => sBk(true)}>Book Consultation →</button>
              <p className="fn">No spam. No pressure. Just a straight answer.</p>
          </div>
        </div></div>
      </section>

      {/* PROOF */}
      <div className="ps"><div className="ctn"><div className="pg">
        <div className="pi"><div className="st">★★★★★</div><div className="nm">{C.rating}</div><div className="lb">Google Rating</div></div>
        <div className="pi"><div className="nm">{C.reviewCount}</div><div className="lb">5-Star Reviews</div></div>
        <div className="pi"><div className="nm">{C.yearsExp}</div><div className="lb">Years Experience</div></div>
        <div className="pi"><div className="nm">{C.projectsCompleted}</div><div className="lb">Projects Completed</div></div>
      </div></div></div>

      {/* GALLERY */}
      <div className="gal"><div className="gal-grid">
        {IMG.gallery.map((src, i) => <img key={i} src={src} alt={`Completed roofing project ${i + 1}`} />)}
      </div></div>

      {/* AREAS */}
      <div className="as"><div className="as-inner">{areaList.map((a, i) => <span key={i}><span className="dot">✦</span> {a}, TX</span>)}</div></div>

      {/* SERVICES */}
      <section className="svcs"><div className="ctn">
        <div className="sh2"><h2>Our Services</h2><p>Residential & commercial roofing solutions across {C.serviceArea}</p></div>
        <div className="sg">{SERVICES.map((s, i) => <div className="sc" key={i}><div className="ic">{iconMap[s.icon]}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
      </div></section>

      {/* SPLIT — IMAGE + TEXT */}
      <section className="split"><div className="ctn"><div className="split-grid">
        <div className="split-img"><img src={IMG.work1} alt="Beautiful home with new roof" /></div>
        <div className="split-txt">
          <h2>Built to Last. Backed for Life.</h2>
          <p>Every Cactus Jax roof comes with a GAF Lifetime Warranty covering all labor and materials. We use only premium-grade shingles, underlayment, and flashing — no shortcuts, no compromise.</p>
          <p>As a woman-owned, family-operated business with nearly two decades of experience, we treat every project like it's our own home.</p>
          <div><span className="tag">GAF Certified</span><span className="tag">Enhancify Financing</span><span className="tag">24/7 Emergency</span></div>
        </div>
      </div></div></section>

      {/* WHY US */}
      <section className="wu"><div className="ctn">
        <div className="sh2"><h2>Why {C.nameShort}?</h2><p>Here's what sets us apart in {C.city}</p></div>
        <div className="wg">
          <div className="wi"><div className="wn">01</div><h3>Woman-Owned</h3><p>Family-operated with integrity and accountability at every level.</p></div>
          <div className="wi"><div className="wn">02</div><h3>GAF Certified</h3><p>Lifetime warranty on all labor and GAF materials. Your investment is protected.</p></div>
          <div className="wi"><div className="wn">03</div><h3>Flexible Financing</h3><p>Enhancify partnership for competitive rates and payment plans that work.</p></div>
          <div className="wi"><div className="wn">04</div><h3>24/7 Emergency</h3><p>Round-the-clock response for storm damage and urgent roof issues.</p></div>
        </div>
      </div></section>

      {/* REVIEWS */}
      <section className="rv"><div className="ctn">
        <div className="sh2"><h2>What Customers Say</h2><p>Real Google reviews from Houston homeowners</p></div>
        <div className="rg">{REVIEWS.map((r, i) => <div className="rc" key={i}><span className="st">★★★★★</span><p>"{r.text}"</p><div className="rn">{r.name} <span>— {r.loc}</span></div></div>)}</div>
      </div></section>

      {/* SPLIT 2 — reverse */}
      <section className="split" style={{ background: "var(--g50)" }}><div className="ctn"><div className="split-grid">
        <div className="split-txt">
          <h2>Storm Season Ready</h2>
          <p>Houston weather doesn't wait — and neither do we. Our 24-hour emergency response team is on standby for hail, wind, and storm damage. We handle the inspection, the insurance paperwork, and the full restoration so you can focus on your family.</p>
          <p>Don't wait until the next storm hits. Get a free inspection today and know your roof is ready.</p>
          <button className="cta" style={{ maxWidth: 280, marginTop: 8 }} onClick={() => sBk(true)}>Book Free Inspection →</button>
        </div>
        <div className="split-img"><img src={IMG.work2} alt="Houston home with quality roofing" /></div>
      </div></div></section>

      {/* FINANCING */}
      <section className="fin"><div className="ctn">
        <h2>Financing Available</h2>
        <p>Quality roofing shouldn't break the bank. Flexible payment options through our Enhancify partnership.</p>
        <div className="pills">
          <div className="pill">Low Monthly Payments</div>
          <div className="pill">Quick Approval</div>
          <div className="pill">No Prepayment Penalty</div>
        </div>
      </div></section>

      {/* BOTTOM CTA */}
      <section className="bc"><div className="ctn">
        <h2>Protect What Matters Most</h2>
        <p>Free inspection. Honest estimate. GAF lifetime warranty. No pressure — just straight answers from {C.city}'s most trusted roofers.</p>
        <button className="cta" style={{ display: "inline-block", width: "auto", padding: "16px 44px" }} onClick={() => sBk(true)}>Book Your Free Call →</button>
        <div className="pb">Or call now: <a href={`tel:${C.phoneRaw}`}>{C.phone}</a></div>
      </div></section>

      <footer className="ft">© 2026 {C.name}. All rights reserved. | Licensed & Insured | {C.address} | <a href={`mailto:${C.email}`}>{C.email}</a></footer>

      {bk && <BookingModal onClose={() => sBk(false)} />}
    </>
  );
}
