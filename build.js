#!/usr/bin/env node
// =====================================================================
// build.js, מייצר את כל דפי האתר הסטטיים מ-data/site-data.js
// הרצה: node build.js   (הפלט נכתב לתיקייה הנוכחית)
// =====================================================================
const fs = require("fs");
const path = require("path");
const { CONFIG, EXHIBITION, EXHIBITIONS_LIST, EXHIBITIONS_PAST, CHROME, BODIES, WORKS, SELECTED, ABOUT } = require("./data/site-data.js");
// הצהרת האמן, מהמקור התלת-לשוני העדכני (v19), עם fallback למודל
let STATEMENT = require("./data/site-data.js").STATEMENT;
try {
  const car = JSON.parse(fs.readFileSync(path.join(__dirname, "data/car_current.json"), "utf8"));
  if (car.statement && car.statement.slides) STATEMENT = car.statement.slides;
} catch (e) {}

let PEPPERS = null;
try { PEPPERS = JSON.parse(fs.readFileSync(path.join(__dirname, "data/peppers.json"), "utf8")); } catch (e) {}

const T = CHROME.he;
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const nl2p = s => String(s ?? "").split(/\n\n+/).map(p => `<p>${esc(p)}</p>`).join("");

const FONTS = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Frank+Ruhl+Libre:wght@300;400;500&family=JetBrains+Mono:wght@300;400&family=Noto+Naskh+Arabic:wght@400&family=Noto+Sans:wght@300;400;500&display=swap" rel="stylesheet">`;

// ---------- analytics (loads only if ids configured) ----------
function analyticsHead() {
  let out = "";
  if (CONFIG.clarityId) {
    out += `
<script type="text/javascript">
(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CONFIG.clarityId}");
</script>`;
  }
  if (CONFIG.ga4Id) {
    out += `
<script async src="https://www.googletagmanager.com/gtag/js?id=${CONFIG.ga4Id}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${CONFIG.ga4Id}');</script>`;
  }
  return out;
}

function cookieBanner() {
  if (!CONFIG.clarityId && !CONFIG.ga4Id) return "";
  return `
<div class="cookie-banner" id="cookieBanner">
  <p>${esc(T.cookieText)}</p>
  <button class="btn" data-cookie="yes">${esc(T.cookieOk)}</button>
  <button class="btn" data-cookie="no" style="border-color:var(--hair);color:var(--bone-faint)">${esc(T.cookieNo)}</button>
</div>`;
}

// ---------- shared chrome ----------
function nav(active, depth = 0) {
  const p = depth ? "../" : "";
  const items = [
    ["works", `${p}index.html#works`, T.works],
    ["about", `${p}about.html`, T.about],
    ["exhibitions", `${p}exhibitions.html`, T.exhibitions],
    ["journal", `${p}journal.html`, T.journal],
    ["contact", `${p}contact.html`, T.contact],
  ];
  return `
<nav class="top-nav">
  <div class="nav-links">
    ${items.map(([k, href, label]) => `<a href="${href}" ${k === active ? 'class="is-active"' : ""}>${esc(label)}</a>`).join("\n    ")}
  </div>
  <a class="brand" href="${p}index.html">SHAHAF GALIL</a>
</nav>`;
}

function footer(depth = 0) {
  const p = depth ? "../" : "";
  const journalInner = CONFIG.substackUrl
    ? `<p>${esc(T.ctaJoinDesc)}</p><div class="substack-embed"><iframe src="${CONFIG.substackUrl.replace(/\/$/, "")}/embed" frameborder="0" scrolling="no"></iframe></div>`
    : `<p>${esc(T.ctaJoinDesc)}</p><p><span class="note-soon">${esc(T.journalSoon)}</span></p><div class="footer-links"><a href="mailto:${CONFIG.email}?subject=${encodeURIComponent("עדכנו אותי כשהיומן נפתח")}">${esc(T.ctaJoinAction)}</a></div>`;
  return `
<footer class="site-footer">
  <div class="footer-inner">
    <div>
      <h3>${esc(T.ctaJoin)} · Journal</h3>
      ${journalInner}
    </div>
    <div>
      <h3>${esc(T.works)}</h3>
      <div class="footer-links">
        ${BODIES.map(b => `<a href="${p}index.html#body-${b.key}">${esc(b.title.he)}</a>`).join("\n        ")}
        <a href="${p}index.html#body-selected">${esc(T.selectedWorks)}</a>
      </div>
    </div>
    <div>
      <h3>Contact · Follow</h3>
      <div class="footer-links">
        <a href="${CONFIG.instagram}" target="_blank" rel="noopener">${esc(T.followIg)} ↗</a>
        <a href="${p}contact.html">${esc(T.contact)}</a>
        <a href="${p}statement.html">${esc(T.statement)}</a>
        <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>
      </div>
    </div>
  </div>
  <div class="footer-base">
    <span>© ${new Date().getFullYear()} SHAHAF GALIL</span>
    <span>FORGED TREES · أشجار معوجّة · עצים מעוקמים</span>
  </div>
</footer>`;
}

function htmlShell({ title, desc, body, active, depth = 0, extraHead = "", scripts = "" }) {
  const p = depth ? "../" : "";
  const url = CONFIG.baseUrl;
  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Shahaf Galil">
${FONTS}
<link rel="stylesheet" href="${p}css/site.css">
${analyticsHead()}
${extraHead}
</head>
<style>
/* טלפון אנכי: בקשה לסובב לרוחב */
.rotate-ask{display:none;position:fixed;inset:0;z-index:9999;background:#050505;align-items:center;justify-content:center;flex-direction:column;gap:20px;text-align:center;padding:32px}
@media (max-width:560px) and (orientation:portrait){.rotate-ask{display:flex}}
.rotate-ask .ra-icon{width:56px;height:56px;color:#e8e4dd;animation:raRot 2.6s ease-in-out infinite}
.rotate-ask .ra-icon svg{width:100%;height:100%;stroke:currentColor;fill:none;stroke-width:1.2}
@keyframes raRot{0%,100%{transform:rotate(0deg)}50%{transform:rotate(90deg)}}
.rotate-ask .ra-he{font-family:'Frank Ruhl Libre',serif;font-weight:300;font-size:18px;color:#e8e4dd}
.rotate-ask .ra-sub{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#8a857c}

@media (max-height:520px) and (orientation:landscape){
  .page-shell{padding-top:64px !important;padding-bottom:36px}
  .top-nav{padding:10px 18px}
}
</style>
<body>
${nav(active, depth)}
${body}
${footer(depth)}
${cookieBanner()}
<script src="${p}js/site.js"></script>
<div class="rotate-ask" aria-hidden="true">
  <div class="ra-icon"><svg viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="1.6"/><line x1="10.5" y1="18.5" x2="13.5" y2="18.5"/></svg></div>
  <div class="ra-he">סובבו את המכשיר לרוחב</div>
  <div class="ra-sub"><span>ROTATE TO LANDSCAPE</span><span lang="ar" style="font-family:'Noto Naskh Arabic',serif;text-transform:none;letter-spacing:.05em">اقلبوا الجهاز أفقياً</span></div>
</div>
${scripts}
</body>
</html>`;
}

// ---------- placeholder hero SVG per work ----------
function heroSvg(work) {
  const spots = (work.hotspots || []).slice(0, 5).map(h =>
    `<circle cx="${h.x * 16}" cy="${h.y * 12}" r="60" fill="url(#glow)" opacity="0.5"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#050505"/><stop offset="0.65" stop-color="#0f0e0c"/><stop offset="1" stop-color="#14120f"/>
</linearGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#c8923a" stop-opacity="0.5"/><stop offset="1" stop-color="#c8923a" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1600" height="1200" fill="url(#sky)"/>
${spots}
<rect x="24" y="24" width="1552" height="1152" fill="none" stroke="#2b2823" stroke-width="2"/>
<text x="800" y="560" text-anchor="middle" fill="#e9e3d6" font-family="serif" font-size="86" font-weight="300">${esc(work.title.he)}</text>
<text x="800" y="640" text-anchor="middle" fill="#6e675b" font-family="monospace" font-size="30" letter-spacing="14">${esc((work.title.en || "").toUpperCase())}</text>
<text x="800" y="720" text-anchor="middle" fill="#6e675b" font-family="monospace" font-size="22" letter-spacing="6">PLACEHOLDER · הדימוי המקורי יוצב כאן</text>
</svg>`;
}

// ---------- HOME ----------
function buildHome() {
  const byBody = {};
  for (const w of WORKS) (byBody[w.body] = byBody[w.body] || []).push(w);
  const workByKey = Object.fromEntries(WORKS.map(w => [w.key, w]));

  const exhibitionBlock = EXHIBITION.confirmed
    ? `
<section class="exhibition-block" id="exhibition">
  <div class="eyebrow">${esc(T.exhibitionCurrent)} · EXHIBITION</div>
  <div class="exhibition-card">
    <div class="exhibition-info">
      <h2>${esc(EXHIBITION.title.he)}</h2>
      <div class="exhibition-meta">${esc(EXHIBITION.venue)} · ${esc(EXHIBITION.city.he)}<br>${esc(EXHIBITION.dates)}${EXHIBITION.hours ? " · " + esc(EXHIBITION.hours) : ""}</div>
    </div>
    <div class="exhibition-actions">
      ${EXHIBITION.rsvpUrl ? `<a class="btn accent" href="${EXHIBITION.rsvpUrl}" target="_blank" rel="noopener">${esc(T.rsvp)} ←</a>` : ""}
      <a class="btn" href="exhibitions.html">${esc(T.details)} ←</a>
    </div>
  </div>
</section>`
    : `
<section class="exhibition-block" id="exhibition">
  <div class="eyebrow">${esc(T.exhibitionUpcoming)} · UPCOMING</div>
  <div class="exhibition-card">
    <div class="exhibition-info">
      <h2>${esc(T.exhibitionSoon)}</h2>
      <div class="exhibition-meta">תערוכה קרובה נמצאת בתכנון. ההודעה הראשונה, לרשימת התפוצה.</div>
    </div>
    <div class="exhibition-actions">
      <a class="btn accent" href="mailto:${CONFIG.email}?subject=${encodeURIComponent("ספרו לי כשהתערוכה מגיעה לעיר שלי")}&body=${encodeURIComponent("העיר שלי: ")}">${esc(T.exhibitionNotify)} ←</a>
    </div>
  </div>
</section>`;

  const menuBodies = BODIES.map((b, i) => {
    const works = byBody[b.key] || [];
    return bodyMenuItem(b.key, b.menuLabel.he, b.title, works.length, b.oneLiner.he, works, i + 1);
  }).join("\n");

  const selWorks = SELECTED.map(k => workByKey[k]).filter(Boolean);
  const selectedItem = bodyMenuItem("selected", T.selectedWorks, { he: "", ar: "مختارات", en: "Selected" }, selWorks.length, "מבחר מכל גופי העבודה, כולל עבודות שאינן חלק מסדרה.", selWorks, BODIES.length + 1);

  function bodyMenuItem(key, label, title, count, desc, works, idx) {
    return `
<div class="body-item" id="body-${key}">
  <button class="body-head" data-body-toggle aria-expanded="false">
    <span class="idx">0${idx}</span>
    <span class="name">${esc(label)}${title.he && title.he !== label ? `<span class="full">${esc(title.he)}</span>` : ""}${title.en ? `<span class="full">${esc(title.en)}</span>` : ""}</span>
    <span class="count">${count} ${esc(T.worksIn)}</span>
    <span class="arrow">←</span>
  </button>
  <div class="body-works">
    <div class="body-desc">${esc(desc)}</div>
    <div class="works-list">
      ${works.map(w => `
      <a class="work-link" href="works/${w.key}.html">
        <span class="num">${esc(w.num)}</span>
        <span class="t">${esc(w.title.he)}</span>
        <span class="t-en">${esc(w.title.en || "")}</span>
        <span class="enter-mark">${esc(T.enter)} ←</span>
      </a>`).join("")}
    </div>
  </div>
</div>`;
  }

  const body = `
<header class="hero">
  <h1 class="hero-name">${esc(CONFIG.siteName.he)}<span class="en">${esc(CONFIG.siteName.en)}</span></h1>
  <p class="hero-tag">${esc(CONFIG.tagline.he)}<span class="ar">${esc(CONFIG.tagline.ar)}</span><span class="en2">${esc(CONFIG.tagline.en)}</span></p>
  <div class="hero-scroll">SCROLL ↓</div>
</header>
${exhibitionBlock}
<section class="bodies-menu" id="works">
  <div class="eyebrow">${esc(T.works)} · WORKS · أعمال</div>
  ${menuBodies}
  ${selectedItem}
</section>
<section class="exhibition-block">
  <div class="exhibition-card">
    <div class="exhibition-info">
      <h2 style="font-size:24px">${esc(T.statement)}</h2>
      <div class="exhibition-meta">אני בונה עולמות., קריאה מוקצבת בשלוש שפות</div>
    </div>
    <div class="exhibition-actions"><a class="btn" href="statement.html">${esc(T.enter)} ←</a></div>
  </div>
</section>`;

  return htmlShell({
    title: "שחף גליל · Shahaf Galil, עצים מעוקמים · Forged Trees",
    desc: "עולמות מבוימים בצילום: עצים מעוקמים, ספרייה לאומית ישנה, יוסי חכמי, 12. הדפסות פיגמנט ופלטינה-פלדיום בקנה מידה גדול.",
    body, active: "works",
    scripts: `<script src="js/home.js"></script>`,
  });
}

// ---------- WORK PAGE ----------
function buildWork(work, prevNext) {
  const b = BODIES.find(x => x.key === work.body);
  const seriesLabel = b ? `${b.title.he} · ${b.title.en || ""}` : T.selectedWorks;

  // peppers gets full 5-category tabs
  let layersSection;
  if (work.peppersFull && PEPPERS) {
    const cats = ["description", "light", "meaning", "layers", "path"];
    const catNames = { description: ["תיאור", "DESCRIPTION"], light: ["אור", "LIGHT"], meaning: ["משמעות", "MEANING"], layers: ["רבדים", "LAYERS"], path: ["מסלול הולכה", "EYE PATH"] };
    layersSection = `
<section class="section" id="layers">
  <div class="inner">
    <div class="eyebrow">${esc(T.layersLabel)} · READING</div>
    <div class="cat-tabs">
      ${cats.map((c, i) => `<button class="cat-tab${i === 3 ? " is-active" : ""}" data-cat="${c}"><span class="he-l">${catNames[c][0]}</span><span>${catNames[c][1]}</span></button>`).join("")}
    </div>
    <div id="catBody"></div>
  </div>
</section>`;
  } else if (work.sides) {
    layersSection = `
<section class="section" id="layers">
  <div class="inner">
    <div class="eyebrow">${esc(T.layersLabel)} · LAYERS</div>
    <div class="side-switch">
      <button data-side="A" class="is-active">צד ראשון · SIDE ONE</button>
      <button data-side="B">צד שני · SIDE TWO</button>
    </div>
    <div class="layers-grid">
      <div class="layer-list" id="layerList"></div>
      <div>
        <div class="layer-copy" id="layerCopy"></div>
        <div class="layer-count" id="layerCount"></div>
      </div>
    </div>
  </div>
</section>`;
  } else {
    layersSection = `
<section class="section" id="layers">
  <div class="inner">
    <div class="eyebrow">${esc(T.layersLabel)} · LAYERS</div>
    <div class="layers-grid">
      <div class="layer-list" id="layerList"></div>
      <div>
        <div class="layer-copy" id="layerCopy"></div>
        <div class="layer-count" id="layerCount"></div>
      </div>
    </div>
  </div>
</section>`;
  }

  const contextStrip = (b && (b.context.length || b.process.length)) || work.context ? `
<div class="context-strip">
  <div class="eyebrow">${esc(T.contextLabel)} · ${esc(T.processLabel)}</div>
  <div class="cols">
    <div>${(work.context || (b ? b.context : [])).slice(0, 3).map(t => `<p>${esc(t)}</p>`).join("")}</div>
    <div>${(b ? b.process : []).slice(0, 3).map(t => `<p>${esc(t)}</p>`).join("")}</div>
  </div>
</div>` : "";

  const mailAsk = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`שאלה על ${work.title.he}`)}`;
  const journalHref = CONFIG.substackUrl || `mailto:${CONFIG.email}?subject=${encodeURIComponent("עדכנו אותי כשהיומן נפתח")}`;

  const body = `
<aside class="progress-rail" aria-label="Sections">
  <a href="#title" data-rail>${esc(T.railTitle)}</a>
  <a href="#image" data-rail>${esc(T.railImage)}</a>
  <a href="#layers" data-rail>${esc(T.railLayers)}</a>
  <a href="#construction" data-rail>${esc(T.railConstruction)}</a>
  <a href="#actions" data-rail>${esc(T.railActions)}</a>
</aside>

<main class="work-page">
  <section class="section" id="title">
    <div class="inner">
      <div class="series-eyebrow eyebrow"><span>${esc(seriesLabel)}</span><span>·</span><span>${esc(work.num)}</span></div>
      <h1 class="work-title">${esc(work.title.he)}${work.title.ar ? `<span class="ar">${esc(work.title.ar)}</span>` : ""}${work.title.en ? `<span class="en">${esc(work.title.en)}</span>` : ""}</h1>
      <div class="work-meta">
        ${work.year ? `<span>${esc(work.year)}</span>` : ""}
        <span>${esc(work.dimensions)}</span>
        <span>${esc(work.medium)}</span>
      </div>
      <p class="work-summary">${esc(work.summary.he)}</p>
    </div>
  </section>

  <section class="section" id="image">
    <div class="inner">
      <div class="hero-wrap">
        <img class="hero-image" src="../assets/${work.key}-hero.svg" alt="${esc(work.title.he)}, ${esc(work.summary.he)}" width="1600" height="1200">
        <svg class="hotspot-layer" id="hotspotLayer" viewBox="0 0 100 75" preserveAspectRatio="none" aria-label="${esc(T.objectsLabel)}"></svg>
      </div>
      <div class="image-hint">${esc(T.objectsLabel)} · לחיצה על נקודה מדגישה אובייקט</div>
    </div>
  </section>

  ${layersSection}

  <section class="section" id="construction">
    <div class="inner">
      <div class="eyebrow">${esc(T.constructionLabel)} · CONSTRUCTION</div>
      <div class="construction-grid">
        ${(work.construction || []).map(c => `<article class="info-card"><h3>${esc(c.title.he)}</h3><p>${esc(c.text.he)}</p></article>`).join("")}
      </div>
      ${contextStrip}
    </div>
  </section>

  <section class="section" id="actions">
    <div class="inner">
      <div class="eyebrow">${esc(T.railActions)} · ACTIONS</div>
      <div class="cta-grid">
        <a class="cta-card" href="../contact.html">
          <div><div class="cta-title">${esc(T.ctaInquire)}</div><div class="cta-title-en">${esc(T.ctaInquireEn)}</div></div>
          <div class="cta-desc">${esc(T.ctaInquireDesc)}</div>
          <span class="cta-action">${esc(T.contact)} ←</span>
        </a>
        <a class="cta-card" href="${mailAsk}">
          <div><div class="cta-title">${esc(T.ctaAsk)}</div><div class="cta-title-en">${esc(T.ctaAskEn)}</div></div>
          <div class="cta-desc">${esc(T.ctaAskDesc)}</div>
          <span class="cta-action">${esc(T.ctaAskAction)}</span>
        </a>
        <a class="cta-card" href="${journalHref}">
          <div><div class="cta-title">${esc(T.ctaJoin)}</div><div class="cta-title-en">${esc(T.ctaJoinEn)}</div></div>
          <div class="cta-desc">${esc(T.ctaJoinDesc)}</div>
          <span class="cta-action">${esc(T.ctaJoinAction)}</span>
        </a>
      </div>
      <div class="share-row">
        <span>${esc(T.share)}</span>
        <button id="shareBtn">SHARE</button>
        <button id="copyBtn">${esc(T.copyLink)}</button>
        <a href="${CONFIG.instagram}" target="_blank" rel="noopener">INSTAGRAM ↗</a>
      </div>
    </div>
  </section>
</main>

<a class="next-work" href="${prevNext.next}.html">
  <div class="eyebrow">${esc(T.nextWork)} · NEXT</div>
  <div class="t">${esc(prevNext.nextTitle)}</div>
</a>`;

  const workData = {
    key: work.key,
    hotspots: work.hotspots,
    layers: work.layers || [],
    layersA: work.layersA || null,
    layersB: work.layersB || null,
    peppers: work.peppersFull && PEPPERS ? { categoryContent: PEPPERS.categoryContent, objectData: PEPPERS.objectData } : null,
  };

  return htmlShell({
    title: `${work.title.he}${work.title.en ? " · " + work.title.en : ""}, שחף גליל`,
    desc: work.summary.he,
    body, active: "works", depth: 1,
    scripts: `<script>window.WORK_DATA=${JSON.stringify(workData)};</script>\n<script src="../js/world.js"></script>`,
  });
}

// ---------- STATEMENT ----------
function buildStatement() {
  const body = `
<main class="statement-page">
  <div class="statement-stage" id="stage" aria-live="polite"></div>
  <footer class="statement-foot">
    <div id="counter">1 / ${STATEMENT.length}</div>
    <div class="statement-controls">
      <button id="prevBtn" aria-label="Previous">→</button>
      <button id="playBtn">Play</button>
      <button id="nextBtn" aria-label="Next">←</button>
    </div>
  </footer>
</main>`;
  return htmlShell({
    title: "הצהרת אמן · Artist Statement, שחף גליל",
    desc: "אני בונה עולמות. הצהרת אמן בקריאה מוקצבת, בשלוש שפות.",
    body, active: "",
    scripts: `<script>window.STATEMENT_ROWS=${JSON.stringify(STATEMENT)};</script>\n<script src="js/statement.js"></script>`,
  });
}

// ---------- ABOUT ----------
function buildAbout() {
  const body = `
<main class="page-shell">
  <div class="two-col">
    <div class="prose">
      <div class="eyebrow" style="color:#ffffff">${esc(T.aboutTitle)} · ABOUT · نبذة</div>
      ${nl2p(ABOUT.bio.he)}
      <p><a class="btn" href="statement.html">${esc(T.playStatement)}</a></p>
    </div>
    <div>
      <div class="eyebrow" style="color:#ffffff">${esc(T.cvTitle)} · CV</div>
      <p style="margin:0 0 22px;display:flex;gap:16px;flex-wrap:wrap;font-family:var(--mono);font-size:10px;letter-spacing:.15em">
        <a href="cv/Shahaf_Galil_CV_HE.pdf" download style="color:var(--accent);border-bottom:1px solid var(--hair);padding-bottom:2px">הורדה PDF · עברית ⇩</a>
        <a href="cv/Shahaf_Galil_CV_EN.pdf" download style="color:var(--accent);border-bottom:1px solid var(--hair);padding-bottom:2px">English ⇩</a>
        <a href="cv/Shahaf_Galil_CV_AR.pdf" download style="color:var(--accent);border-bottom:1px solid var(--hair);padding-bottom:2px">العربية ⇩</a>
      </p>
      ${ABOUT.cv.map(sec => `<div style="margin-bottom:26px"><div class="eyebrow">${esc(sec.h.he)} · ${esc(sec.h.en)}</div>${sec.items.map(it => `<p class="dim" style="margin:0 0 10px;font-size:14px;line-height:1.8">${esc(it.he)}</p>`).join("")}</div>`).join("")}
      <div style="margin-top:40px">
        <div class="eyebrow">גופי עבודה · BODIES OF WORK</div>
        ${BODIES.map(b => `<p class="dim"><a href="index.html#body-${b.key}">${esc(b.title.he)}</a>, ${esc(b.meta)}</p>`).join("")}
      </div>
    </div>
  </div>
</main>`;
  return htmlShell({
    title: "אודות · About, שחף גליל",
    desc: ABOUT.bio.he.split("\n")[0],
    body, active: "about",
  });
}

// ---------- EXHIBITIONS ----------
function buildExhibitions() {
  const css = `<style>
  .exh-line{display:flex;gap:14px;align-items:baseline;flex-wrap:wrap;font-size:13px;padding:12px 0;border-bottom:1px solid var(--hair)}
  .exh-line:first-of-type{border-top:1px solid var(--hair)}
  .exh-info{color:#ffffff;font-weight:700}
  .exh-count{color:#ffffff;font-weight:700;font-family:var(--mono);font-size:11px;letter-spacing:.08em}
  .exh-rsvp{font-family:var(--mono);font-size:10px;letter-spacing:.12em;color:var(--accent);border-bottom:1px solid var(--hair);padding-bottom:2px}
  .exh-sub{width:100%;color:var(--bone-dim);font-size:12px;line-height:1.7}
  .exh-line.past .exh-info{color:var(--bone-dim);font-weight:400}
  </style>`;

  const listHtml = (EXHIBITIONS_LIST || []).map(x => `
  <div class="exh-line" ${x.start ? `data-start="${x.start}"` : ""} ${x.end ? `data-end="${x.end}"` : ""}>
    <span class="exh-info">"${esc(x.title.he)}" · ${esc(x.venue.he)} · ${esc(x.city.he)}</span>
    <span class="exh-count"></span>
    ${x.url ? `<a class="exh-rsvp" href="${x.url}" target="_blank" rel="noopener">פרטים ←</a>` : ""}
    ${x.cal ? `<a class="exh-rsvp" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(x.cal.title)}&dates=${x.cal.dates}${x.cal.ctz ? "&ctz=" + x.cal.ctz : ""}&location=${encodeURIComponent(x.cal.location)}" target="_blank" rel="noopener">הוסף ליומן ⊕</a>` : ""}
    <span class="exh-sub">${esc(x.dates)}${x.cal && x.cal.location ? " · " + esc(x.cal.location) : ""}${x.note && x.note.he ? " · " + esc(x.note.he) : ""}</span>
  </div>`).join("");

  const body = `
${css}
<main class="page-shell">
  <div class="eyebrow" style="color:#ffffff">${esc(T.exhibitions)} · EXHIBITIONS · معارض</div>

  <div style="border:1px solid var(--hair);background:var(--bg-panel);padding:32px 34px;max-width:760px;margin-top:26px">
    <div class="eyebrow" style="color:#ffffff">לאוצרות ולאוצרים · FOR CURATORS</div>
    <p class="dim" style="margin:0 0 18px;font-size:14px;line-height:1.9">כל החומרים במקום אחד: קורות חיים, הצהרת אמן ותיק העבודות המלא. לשיחה על תערוכה, שיתוף פעולה או השאלת עבודות, כתבו לי ואחזור אליכם עם חבילת חומרים מלאה.</p>
    <p style="margin:0;display:flex;gap:18px;flex-wrap:wrap;font-family:var(--mono);font-size:10px;letter-spacing:.14em">
      <a href="mailto:${CONFIG.email}?subject=${encodeURIComponent("הזמנה לתערוכה, פנייה מאוצר/ת")}&body=${encodeURIComponent("שם:\nמוסד / גלריה:\nהחלל והעיר:\nתאריכים מוצעים:\nטלפון:\n\nכמה מילים על הכיוון:\n")}" style="color:#ffffff;font-weight:700;border-bottom:1px solid var(--bone-faint);padding-bottom:2px">צור קשר ←</a>
      <a href="portfolio/Shahaf_Galil_Portfolio.pdf" download style="color:var(--accent);border-bottom:1px solid var(--hair);padding-bottom:2px;align-self:center">פורטפוליו PDF ⇩</a>
      <a href="cv/Shahaf_Galil_CV_HE.pdf" download style="color:var(--accent);border-bottom:1px solid var(--hair);padding-bottom:2px;align-self:center">קו"ח PDF ⇩</a>
      <a href="statement.html" style="color:var(--accent);border-bottom:1px solid var(--hair);padding-bottom:2px;align-self:center">הצהרת אמן ←</a>
      <a href="index.html" style="color:var(--accent);border-bottom:1px solid var(--hair);padding-bottom:2px;align-self:center">תיק העבודות ←</a>
    </p>
  </div>

  <div style="margin-top:56px;max-width:760px">
    ${listHtml}
    <div class="exh-line" style="border-bottom:none;margin-top:30px">
      <a class="exh-rsvp" style="color:#ffffff;font-size:12px;border-bottom-color:var(--bone-faint)" href="mailto:${CONFIG.email}?subject=${encodeURIComponent("אני רוצה הזמנה לפתיחה של התערוכות הבאות")}&body=${encodeURIComponent("שם: \n")}">אני רוצה הזמנה לפתיחה של התערוכות הבאות ←</a>
    </div>
  </div>

  <div style="margin-top:70px;max-width:760px">
    <div class="eyebrow">${esc(T.exhibitionsPast)} · PAST</div>
    ${(EXHIBITIONS_PAST || []).map(x => `
    <div class="exh-line past">
      <span class="exh-info">${esc(x.dates)} · "${esc(x.title)}" · ${esc(x.venue)}${x.note ? " · " + esc(x.note) : ""}</span>
      ${x.url ? `<a class="exh-rsvp" href="${x.url}" target="_blank" rel="noopener">פרטים ←</a>` : ""}
    </div>`).join("")}
  </div>
</main>`;
  return htmlShell({
    title: "תערוכות · Exhibitions, שחף גליל",
    desc: "תערוכות נוכחיות, קרובות וארכיון, עצים מעוקמים ועבודות נוספות.",
    body, active: "exhibitions",
    scripts: `<script>
(function () {
  var now = new Date(); now.setHours(0, 0, 0, 0);
  function days(iso) { return Math.round((new Date(iso + "T00:00:00") - now) / 86400000); }
  document.querySelectorAll(".exh-line[data-start]").forEach(function (line) {
    var el = line.querySelector(".exh-count"); if (!el) return;
    var toOpen = days(line.dataset.start), t = "";
    if (toOpen > 0) t = toOpen === 1 ? "נפתחת מחר" : "נפתחת בעוד " + toOpen + " ימים";
    else if (line.dataset.end) {
      var left = days(line.dataset.end);
      if (left > 1) t = "פתוחה עכשיו · נותרו " + left + " ימים";
      else if (left === 1) t = "יום אחרון מחר";
      else if (left === 0) t = "היום האחרון";
      else t = "ננעלה";
    } else if (toOpen === 0) t = "נפתחת היום";
    el.textContent = t;
  });
})();
<\/script>`,
  });
}

// ---------- JOURNAL ----------
function buildJournal() {
  const inner = CONFIG.substackUrl ? `
  <p class="page-lede">${esc(T.ctaJoinDesc)}</p>
  <div class="substack-embed"><iframe src="${CONFIG.substackUrl.replace(/\/$/, "")}/embed" frameborder="0" scrolling="no"></iframe></div>
  <p style="margin-top:26px"><a class="btn" href="${CONFIG.substackUrl}" target="_blank" rel="noopener">לכל הפוסטים ←</a></p>` : `
  <div class="journal-card">
    <h2>${esc(T.journalSoon)}</h2>
    <p>יומן הפרויקט, תיעוד התהליך, סיפורים מהשטח, התלבטויות והחלטות שעוד מתהוות, ייפתח בקרוב כניוזלטר.</p>
    <p>רוצה לקבל את הפוסט הראשון?</p>
    <a class="btn accent" href="mailto:${CONFIG.email}?subject=${encodeURIComponent("עדכנו אותי כשהיומן נפתח")}">עדכנו אותי ←</a>
  </div>
  <p class="dim" style="margin-top:40px">בינתיים, התהליך מתועד ב<a href="${CONFIG.instagram}" target="_blank" rel="noopener" style="border-bottom:1px solid var(--hair)">אינסטגרם</a>.</p>`;

  const body = `
<main class="page-shell">
  <div class="eyebrow">${esc(T.journal)} · PROJECT JOURNAL · يوميات</div>
  <h1 class="page-title">${esc(T.ctaJoin)}</h1>
  ${inner}
</main>`;
  return htmlShell({
    title: "יומן הפרויקט · Journal, שחף גליל",
    desc: "תיעוד התהליך: סיפורים מהשטח, התלבטויות והחלטות שעוד מתהוות.",
    body, active: "journal",
  });
}

// ---------- CONTACT ----------
function buildContact() {
  const panel = (label, text, links) => `
  <div style="border:1px solid var(--hair);background:var(--bg-panel);padding:16px 22px;max-width:760px;margin-top:12px">
    <div class="eyebrow" style="color:#ffffff;margin-bottom:8px">${label}</div>
    <p class="dim" style="margin:0 0 10px;font-size:13px;line-height:1.75">${text}</p>
    <p style="margin:0;display:flex;gap:16px;flex-wrap:wrap;font-family:var(--mono);font-size:10px;letter-spacing:.14em">${links}</p>
  </div>`;
  const cta = (href, label) => `<a href="${href}" style="color:#ffffff;font-weight:700;border-bottom:1px solid var(--bone-faint);padding-bottom:2px">${label}</a>`;
  const lnk = (href, label, dl) => `<a href="${href}"${dl ? " download" : ""}${href.startsWith("http") ? ` target="_blank" rel="noopener"` : ""} style="color:var(--accent);border-bottom:1px solid var(--hair);padding-bottom:2px;align-self:center">${label}</a>`;
  const mail = (subject, body) => `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const body = `
<style>.page-shell{padding-top:92px !important}</style>
<main class="page-shell">
  <div class="eyebrow" style="color:#ffffff">${esc(T.contact)} · CONTACT · تواصل</div>

  ${panel("לאספנות ולרכישה <span style=\"font-size:8px\">· COLLECTORS</span>",
    "העבודות מודפסות בהדפסות פיגמנט ופלטינה פלדיום, במהדורות מוגבלות ובקנה מידה גדול. כתבו לי לקבלת רשימת עבודות זמינות, מפרט הדפסה ומחירים, או לתיאום צפייה בעבודות.",
    cta(mail("רכישת עבודה, פנייה מאספן/ית", "שם:\nטלפון:\nהעבודה שמעניינת אותי:\n"), "צור קשר ←") +
    lnk("portfolio/Shahaf_Galil_Portfolio.pdf", "פורטפוליו PDF ⇩", true) +
    lnk("index.html", "תיק העבודות ←"))}

  ${panel("לאוצרות ולאוצרים <span style=\"font-size:8px\">· CURATORS</span>",
    "כל החומרים במקום אחד: פורטפוליו, קורות חיים, הצהרת אמן ותיק העבודות המלא. לשיחה על תערוכה, שיתוף פעולה או השאלת עבודות, כתבו לי ואחזור אליכם עם חבילת חומרים מלאה.",
    cta(mail("הזמנה לתערוכה, פנייה מאוצר/ת", "שם:\nמוסד / גלריה:\nהחלל והעיר:\nתאריכים מוצעים:\nטלפון:\n\nכמה מילים על הכיוון:\n"), "צור קשר ←") +
    lnk("portfolio/Shahaf_Galil_Portfolio.pdf", "פורטפוליו PDF ⇩", true) +
    lnk("cv/Shahaf_Galil_CV_HE.pdf", "קו\"ח PDF ⇩", true) +
    lnk("statement.html", "הצהרת אמן ←"))}

  ${panel("לעיתונות ולכתיבה <span style=\"font-size:8px\">· PRESS</span>",
    "דימויים ברזולוציית דפוס, הצהרת אמן, ביוגרפיה וזמינות לראיון, הכל במייל אחד. ציינו את כלי התקשורת ואת הדדליין ואחזור אליכם באותו יום.",
    cta(mail("עיתונות וכתיבה, פנייה", "שם:\nכלי התקשורת:\nדדליין:\nמה צריך (דימויים / ראיון / טקסטים):\n"), "צור קשר ←") +
    lnk("statement.html", "הצהרת אמן ←") +
    lnk("about.html", "אודות וקו\"ח ←"))}

  ${panel("לגלריות ולייצוג <span style=\"font-size:8px\">· GALLERIES</span>",
    "פתוח לשיחה על ייצוג, תערוכות משותפות והשאלות. כאן תמצאו את הפורטפוליו המלא, קורות החיים והיסטוריית התערוכות, ואשמח להשלים כל חומר נוסף.",
    cta(mail("ייצוג גלריה, פנייה", "שם הגלריה:\nעיר:\nקישור:\nמה מעניין אתכם:\n"), "צור קשר ←") +
    lnk("portfolio/Shahaf_Galil_Portfolio.pdf", "פורטפוליו PDF ⇩", true) +
    lnk("cv/Shahaf_Galil_CV_HE.pdf", "קו\"ח PDF ⇩", true) +
    lnk("exhibitions.html", "תערוכות ←"))}

  ${panel("שאלה לאמן <span style=\"font-size:8px\">· ASK</span>",
    "הדימוי לא עוזב אתכם? יש שאלה על עבודה, על רובד, על איך זה צולם? כתבו לי ישירות, אני עונה אישית על כל פנייה. אפשר גם פשוט לבקש הזמנה לפתיחות.",
    cta(mail("שאלה לאמן", "השאלה שלי:\n"), "כתבו לי ←") +
    lnk(mail("אני רוצה הזמנה לפתיחה של התערוכות הבאות", "שם: \n"), "הזמנה לפתיחות ←") +
    lnk(CONFIG.instagram, "אינסטגרם ↗"))}

  <p class="dim" style="margin-top:28px">או ישירות: <a href="mailto:${CONFIG.email}" style="border-bottom:1px solid var(--hair)">${CONFIG.email}</a></p>
</main>`;
  return htmlShell({
    title: "פנייה · Contact, שחף גליל",
    desc: "אספנות, אוצרות, עיתונות, גלריות או שאלה לאמן, כל פנייה מגיעה ישירות אליי.",
    body, active: "contact",
  });
}

// ---------- write everything ----------
const out = (rel, content) => {
  const f = path.join(__dirname, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
  console.log("✓", rel);
};

// order works within body for next-links
const orderKeys = [];
for (const b of BODIES) orderKeys.push(...WORKS.filter(w => w.body === b.key).map(w => w.key));
orderKeys.push(...WORKS.filter(w => w.body === "selected").map(w => w.key));
const workByKey = Object.fromEntries(WORKS.map(w => [w.key, w]));

// עמודי העבודות ודף הבית נבנים ע"י build-live.js (שיבוט הדף החי).
// כאן: דפי הפנים + נכסי placeholder בלבד.
for (let i = 0; i < orderKeys.length; i++) {
  const w = workByKey[orderKeys[i]];
  out(`assets/${w.key}-hero.svg`, heroSvg(w));
}
out("statement.html", buildStatement());
out("about.html", buildAbout());
out("exhibitions.html", buildExhibitions());
out("journal.html", buildJournal());
out("contact.html", buildContact());
out("vercel.json", JSON.stringify({
  cleanUrls: true, trailingSlash: false,
  headers: [{ source: "/assets/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }],
}, null, 2));

console.log(`\nDone: inner pages + ${orderKeys.length} placeholder assets. הרץ גם: node build-live.js`);
