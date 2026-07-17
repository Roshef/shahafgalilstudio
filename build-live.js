#!/usr/bin/env node
// =====================================================================
// build-live.js v3 — עמודי עבודה מהתבנית האמיתית: הדף החי של תריסים
// (View Source שנמסר). תריסים = 1:1 עם התוכן המקורי המלא.
// הרצה: node build-live.js
// =====================================================================
const fs = require("fs");
const path = require("path");
const { CONFIG, EXHIBITION, EXHIBITIONS_LIST, BODIES, WORKS, SELECTED } = require("./data/site-data.js");
const PEPPERS = JSON.parse(fs.readFileSync(path.join(__dirname, "data/peppers.json"), "utf8"));
const TEMPLATE = fs.readFileSync(path.join(__dirname, "data/work-template.html"), "utf8");

const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const workByKey = Object.fromEntries(WORKS.map(w => [w.key, w]));

// ---------- balanced-brace utilities ----------
function findConst(src, name, open = "{", close = "}") {
  const idx = src.indexOf("const " + name);
  if (idx < 0) throw new Error("const not found: " + name);
  const start = src.indexOf(open, idx);
  let depth = 0, i = start;
  for (; i < src.length; i++) {
    if (src[i] === open) depth++;
    else if (src[i] === close) { depth--; if (depth === 0) break; }
  }
  let end = i + 1;
  if (src[end] === ";") end++;
  return { idx, start, end };
}
function spliceConst(src, name, newLiteral, open = "{", close = "}", keyword = "const") {
  const { idx, end } = findConst(src, name, open, close);
  return src.slice(0, idx) + keyword + " " + name + " = " + newLiteral + ";" + src.slice(end);
}
function extractConst(src, name, open = "{", close = "}") {
  const { start } = findConst(src, name, open, close);
  let depth = 0, i = start;
  for (; i < src.length; i++) {
    if (src[i] === open) depth++;
    else if (src[i] === close) { depth--; if (depth === 0) break; }
  }
  return eval("(" + src.slice(start, i + 1) + ")");
}

// chrome translations from the real live page (trilingual)
const BASE_T = extractConst(TEMPLATE, "translations");

// ---------- helpers ----------
function railFor(work) {
  const b = BODIES.find(x => x.key === work.body);
  const list = work.body === "selected" ? SELECTED.map(k => workByKey[k]) : WORKS.filter(w => w.body === work.body);
  return { list, label: b ? b.title : { he: "נבחרות", ar: "مختارات", en: "Selected" } };
}
// כל הדימויים האמיתיים + הסימונים — מחבילת הרינדור (render-bundle)
const REAL = JSON.parse(fs.readFileSync(path.join(__dirname, "data/real-assets.json"), "utf8"));
const ANNOTATIONS = JSON.parse(fs.readFileSync(path.join(__dirname, "data/annotations_full.json"), "utf8"));
const OBJ_NAMES = JSON.parse(fs.readFileSync(path.join(__dirname, "data/object_names_tri.json"), "utf8"));
const BUNDLE_KEY = { bicycles: "bikes", suit: "suite", "swan-lake": "swan_lake", "broken-circle": "broken_circle",
  "forbidden-apple": "forbidden_apple", necklace: "giant", pitch: "yh00", meetup: "yh01", deal: "yh02",
  build: "yh03", exit: "yh04", closing: "yh05", trails: "trails" };
const TW_SIDES = { h1900: ["tw00", "tw01"], h2000: ["tw02", null], h2100: ["tw03", "tw04"], h2200: ["tw05", "tw06"],
  h2300: ["tw07", "tw08"], h0000: ["tw09", "tw10"], h0100: ["tw11", "tw12"], h0200: ["tw13", "tw14"],
  h0300: ["tw15", "tw16"], h0500: ["tw17", "tw18"], h0700: ["tw19", null] };

const heroPath = w =>
  w.key === "shutters" ? "../assets/shutters-real-1c.jpg"
  : w.key === "peppers" ? "../assets/peppers-real-1.jpg"
  : REAL[w.key] ? "../assets/" + REAL[w.key].A.file
  : `../assets/${w.key}-hero.svg`;

// hotspots אמיתיים מ-annotations_full (x,y כשבר 0–1 → אחוזים)
const HR_ZOOM = new Set(["broken-circle", "forbidden-apple", "meetup", "exit", "deal", "pitch", "closing", "build", "swan-lake", "necklace"]);

function annotationObjects(bundleKey, workKey) {
  const list = ANNOTATIONS[bundleKey] || [];
  return list.map((a, i) => {
    const tri = OBJ_NAMES[a.n] || [];
    return {
      id: "obj" + i, x: Math.round(a.x * 1000) / 10, y: Math.round(a.y * 1000) / 10, small: HR_ZOOM.has(workKey),
      name: { he: a.n, ar: tri[0] || a.n, en: tri[1] || a.n },
      category: {},
    };
  });
}

// תוכן קטגוריות מורחב (תיאור, אור, משמעות, מסלול) לכל העבודות
const CATS = JSON.parse(fs.readFileSync(path.join(__dirname, "data/categories_ext.json"), "utf8"));
function mergeObjectContent(objs, workKey) {
  const conf = CATS[workKey];
  if (!conf || !conf.objects) return objs;
  const byName = {};
  for (const o of conf.objects) byName[o.name] = o;
  for (const obj of objs) {
    const c = byName[obj.name.he];
    if (!c) continue;
    obj.category = obj.category || {};
    if (c.desc) obj.category.description = { he: c.desc };
    if (c.meaning) obj.category.meaning = { he: c.meaning };
  }
  return objs;
}
function lightDataFor(work) {
  if (work.key === "peppers") {
    const src = PEPPERS.objectData.filter(o => o.category && o.category.light);
    if (!src.length) return null;
    return { diagramSrc: null, sources: src.map((o, i) => ({ num: String(i + 1).padStart(2, "0"), title: o.name.he, subtitle: "", text: o.category.light.he })) };
  }
  const conf = CATS[work.key];
  if (!conf || !conf.light || !conf.light.items) return null;
  return { diagramSrc: null, intro: conf.light.intro || "", sources: conf.light.items.map((it, i) => ({ num: String(i + 1).padStart(2, "0"), title: it.title, subtitle: it.subtitle || "", text: it.text })) };
}
function pathDataExtFor(work) {
  const conf = CATS[work.key];
  if (conf && conf.path && conf.path.items) return conf.path.items;
  return null;
}

// מקור האמת התלת-לשוני העדכני (v19 render-bundle)
const CAR = JSON.parse(fs.readFileSync(path.join(__dirname, "data/car_current.json"), "utf8"));
const CAR_KEY = { trails: "layers_trails", bicycles: "layers_bikes", suit: "layers_suite",
  "swan-lake": "layers_swan_lake", "broken-circle": "layers_broken_circle",
  "forbidden-apple": "layers_forbidden_apple", necklace: "layers_giant",
  pitch: "layers_yh00", meetup: "layers_yh01", deal: "layers_yh02",
  build: "layers_yh03", exit: "layers_yh04", closing: "layers_yh05" };

function splitLabel(str) {
  const m = String(str || "").match(/^([^:]{2,40}):\s*([\s\S]*)$/);
  return m ? { label: m[1], text: m[2] } : { label: "", text: String(str || "") };
}
function triRow(slide, i) {
  const he = splitLabel(slide.he), en = splitLabel(slide.en), ar = splitLabel(slide.ar);
  const fallback = "רובד " + String(i + 1).padStart(2, "0");
  return {
    label: { he: he.label || fallback, en: en.label || he.label || fallback, ar: ar.label || he.label || fallback },
    title: { he: "", en: "", ar: "" },
    text: { he: he.text, en: en.text || he.text, ar: ar.text || he.text },
  };
}
// תיקוני תוכן מאושרים ע"י שחף (10.7.2026): מעגל הקוראים · הארכיון האנלוגי
const LAYER_OVERRIDES = {
  "broken-circle": {
    0: { he: "רובד ראשון: מעגל הקוראים. דמויות נעות בקרני האור, ספר פתוח ביד כל אחת. סדר, שייכות, טקס.",
         en: "Layer one: the circle of readers. Figures moving through beams of light, an open book in every hand. Order, belonging, ritual.",
         ar: "الطبقة الأولى: دائرة القرّاء. شخصيات تتحرك في حزم الضوء، كتاب مفتوح في كل يد. نظام، انتماء، طقس." },
    1: { he: "רובד שני: דמות אחת בלי ספר. מופתעת, לא בפנים ולא בחוץ. המעגל שלם רק כל עוד כולם קוראים.",
         en: "Layer two: one figure without a book. Startled, neither inside nor out. The circle is whole only as long as everyone reads.",
         ar: "الطبقة الثانية: شخصية واحدة بلا كتاب. مندهشة، لا في الداخل ولا في الخارج. الدائرة كاملة ما دام الجميع يقرأون." },
  },
  "forbidden-apple": {
    0: { he: "רובד ראשון: הארכיון האנלוגי, שתי דמויות, משהו מושט בין יד ליד.",
         en: "Layer one: the analog archive, two figures, something passed from hand to hand.",
         ar: "الطبقة الأولى: الأرشيف التماثلي، شخصيتان، شيء يُمدّ من يد إلى يد." },
  },
};
function carRows(carKey, workKey) {
  const c = CAR[carKey];
  if (!c) return null;
  const slides = c.slides.map(s => ({ ...s }));
  const ov = LAYER_OVERRIDES[workKey];
  if (ov) for (const [i, s] of Object.entries(ov)) if (slides[i]) slides[i] = s;
  return slides.map(triRow);
}
function layersDataFor(work) {
  if (work.key === "peppers") {
    // 7 הרבדים של פלפלים — כותרות מ-v3.16 (he/en/ar מה-translations)
    const t = PEPPERS.translations;
    return { A: Array.from({ length: 7 }, (_, i) => ({
      label: { he: "רובד 0" + (i + 1), en: "Layer 0" + (i + 1), ar: "الطبقة 0" + (i + 1) },
      title: { he: t.he["layer" + (i + 1)] || "", en: t.en["layer" + (i + 1)] || "", ar: t.ar["layer" + (i + 1)] || "" },
      text: { he: t.he["layer" + (i + 1) + "desc"] || "", en: t.en["layer" + (i + 1) + "desc"] || "", ar: t.ar["layer" + (i + 1) + "desc"] || "" },
    })), B: null };
  }
  if (TW_SIDES[work.key]) {
    const [a, b] = TW_SIDES[work.key];
    return { A: carRows("layers_" + a, work.key) || [], B: b ? carRows("layers_" + b, work.key) : null };
  }
  const fromCar = CAR_KEY[work.key] && carRows(CAR_KEY[work.key], work.key);
  if (fromCar) return { A: fromCar, B: null };
  // fallback — מהטקסטים בעברית שבמודל
  const conv = arr => (arr || []).map((l, i) => triRow({ he: l.he, en: l.en, ar: l.ar }, i));
  return { A: conv(work.layersA || work.layers), B: work.layersB ? conv(work.layersB) : null };
}
const PV = require("./data/pv_texts.json");

function objectDataFor(work) {
  if (work.key === "peppers") return PEPPERS.objectData; // 6 אובייקטים עם תוכן פר-קטגוריה
  if (TW_SIDES[work.key]) return mergeObjectContent(annotationObjects(TW_SIDES[work.key][0], work.key), work.key);
  if (BUNDLE_KEY[work.key]) return mergeObjectContent(annotationObjects(BUNDLE_KEY[work.key], work.key), work.key);
  return (work.hotspots || []).map(h => ({
    id: h.id, x: h.x, y: h.y, small: false,
    name: { he: h.name.he, en: h.name.en || h.name.he, ar: h.name.ar || h.name.he },
    category: {},
  }));
}
function leaderDirsFor(work) {
  const dirs = {};
  for (const h of objectDataFor(work)) dirs[h.id] = h.x > 62 ? "up-left" : h.x < 38 ? "up-right" : h.y < 40 ? "down-right" : "up-right";
  if (TW_SIDES[work.key] && TW_SIDES[work.key][1]) {
    for (const h of annotationObjects(TW_SIDES[work.key][1])) dirs[h.id + "b"] = h.x > 62 ? "up-left" : h.x < 38 ? "up-right" : "up-right";
  }
  return dirs;
}
function pathDataFor(work) {
  if (work.key !== "peppers") return [];
  // מסלול ההולכה של פלפלים — מהטקסטים הפר-אובייקטיים של v3.16
  return PEPPERS.objectData
    .filter(o => o.category && o.category.path)
    .map((o, i) => ({ num: String(i + 1), title: o.name.he, text: o.category.path.he }));
}

function translationsFor(work, rail) {
  const t = JSON.parse(JSON.stringify(BASE_T));
  const idx = rail.list.findIndex(w => w.key === work.key);
  const counter = `${String(idx + 1).padStart(2, "0")} / ${String(rail.list.length).padStart(2, "0")}`;
  const patch = {
    he: {
      summary: work.summary.he,
      navCounter: `${counter} · ${work.title.he}`,
      ctaAskDesc: "שאל על הבנייה, על השכבות, על ההחלטות. אני עונה בעצמי, לא תמיד מיד.",
      ctaAskAction: "כתוב לי ←",
      ctaJoin: "יומן הפרויקט",
      ctaJoinDesc: "תיעוד התהליך, התלבטויות והחלטות שעוד מתהוות." + (CONFIG.substackUrl ? "" : " נפתח בקרוב."),
      ctaJoinAction: "לעדכונים ←",
      footerSubscribe: CONFIG.substackUrl ? "הירשם →" : "עדכנו אותי →",
      footerLink_emptiness: "הצהרת אמן",
    },
    en: {
      summary: work.summary.en || work.summary.he,
      navCounter: `${counter} · ${work.title.en || work.title.he}`,
      ctaAskDesc: "Ask about the construction, the layers, the decisions. I answer personally.",
      ctaAskAction: "Write to me →",
      ctaJoin: "Project Journal",
      ctaJoinDesc: "Process notes, doubts and decisions still taking shape." + (CONFIG.substackUrl ? "" : " Opening soon."),
      ctaJoinAction: "Get updates →",
      footerSubscribe: CONFIG.substackUrl ? "Subscribe →" : "Notify me →",
      footerLink_emptiness: "Artist Statement",
    },
    ar: {
      summary: work.summary.ar || work.summary.he,
      navCounter: `${counter} · ${work.title.ar || work.title.he}`,
      ctaAskDesc: "اسأل عن البناء، عن الطبقات، عن القرارات. أجيب بنفسي.",
      ctaAskAction: "اكتب لي ←",
      ctaJoin: "يوميات المشروع",
      ctaJoinDesc: "توثيق العملية وقرارات ما زالت تتشكل." + (CONFIG.substackUrl ? "" : " تُفتح قريباً."),
      ctaJoinAction: "للتحديثات ←",
      footerSubscribe: CONFIG.substackUrl ? "اشترك ←" : "أخبروني ←",
      footerLink_emptiness: "بيان الفنان",
    },
  };
  for (const lang of ["he", "en", "ar"]) {
    Object.assign(t[lang], patch[lang]);
    // מפתחות legacy שאינם מרונדרים (ירושה מדורות קודמים של הדף)
    for (const k of Object.keys(t[lang])) if (/^(footerLink_fb|footerLink_dc|layer\d+|work0\d|hotspot\d)/.test(k)) delete t[lang][k];
  }
  return t;
}

const langWord = (lang, txt) => txt ? `<button class="lang-word" data-lang="${lang}"${lang === "ar" ? ' lang="ar"' : ""}>${esc(txt)}</button>` : "";
const langWords = tri => [langWord("he", tri.he), langWord("ar", tri.ar), langWord("en", tri.en)]
  .filter(Boolean).join('<span class="sep">·</span>');

function modalsHtml(work) {
  const M = CONFIG.email;
  const subj = s => encodeURIComponent(s + " — " + work.title.he);
  const journalHref = CONFIG.substackUrl || `mailto:${M}?subject=${encodeURIComponent("עדכנו אותי כשהיומן נפתח")}`;
  return `<div class="modal" id="modal-inquire"><div class="modal-content"><button class="modal-close" onclick="closeModal()">×</button><div class="modal-title">פנייה</div><div class="modal-subtitle">בחר את הפרופיל המתאים</div><div class="profile-options"><a class="profile-option" href="mailto:${M}?subject=${subj("אספן · רכישה")}"><div class="profile-name">אספן · רכישה</div><div class="profile-desc">Collector · Acquisition</div></a><a class="profile-option" href="mailto:${M}?subject=${subj("אוצר · תערוכה")}"><div class="profile-name">אוצר · תערוכה</div><div class="profile-desc">Curator · Exhibition</div></a><a class="profile-option" href="mailto:${M}?subject=${subj("גלריה · ייצוג")}"><div class="profile-name">גלריה · ייצוג</div><div class="profile-desc">Gallery · Representation</div></a><a class="profile-option" href="mailto:${M}?subject=${subj("עיתונות · כתיבה")}"><div class="profile-name">עיתונות · כתיבה</div><div class="profile-desc">Press · Editorial</div></a><a class="profile-option" href="mailto:${M}?subject=${subj("סקרן · שיחה")}"><div class="profile-name">סקרן · שיחה</div><div class="profile-desc">Curious · Conversation</div></a></div></div></div><div class="modal" id="modal-ask"><div class="modal-content"><button class="modal-close" onclick="closeModal()">×</button><div class="modal-title">שאלה לאמן</div><div class="modal-subtitle">Ask the artist — directly</div><p style="font-family: var(--serif-heb); font-weight: 300; font-size: 15px; line-height: 1.8; color: var(--bone-dim); margin-bottom: 28px; text-align: start;">אפשר לשאול על הבנייה, על השכבות, על ההחלטות של "${esc(work.title.he)}". אני עונה בעצמי, לא תמיד מיד.</p><a href="mailto:${M}?subject=${subj("שאלה לאמן")}" style="display:block; text-align:center; font-family: var(--mono); font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--bone); border: 1px solid var(--bone); padding: 14px;">כתוב לי ←</a></div></div><div class="modal" id="modal-share"><div class="modal-content"><button class="modal-close" onclick="closeModal()">×</button><div class="modal-title">שיתוף</div><div class="modal-subtitle">Share this work</div><div class="profile-options"><button class="profile-option" onclick="shareNative()"><div class="profile-name">שיתוף…</div><div class="profile-desc">Share</div></button><button class="profile-option" onclick="copyLink(this)"><div class="profile-name">העתק קישור</div><div class="profile-desc">Copy link</div></button><a class="profile-option" href="${CONFIG.instagram}" target="_blank" rel="noopener"><div class="profile-name">אינסטגרם</div><div class="profile-desc">Instagram ↗</div></a></div></div></div><div class="modal" id="modal-respond"><div class="modal-content"><button class="modal-close" onclick="closeModal()">×</button><div class="modal-title">הצטרפות</div><div class="modal-subtitle">Follow · Respond</div><p style="font-family: var(--serif-heb); font-weight: 300; font-size: 14px; line-height: 1.8; color: var(--bone-dim); margin-bottom: 28px; text-align: start;">השיח על העבודות קורה ביומן הפרויקט ובאינסטגרם — שם אפשר להגיב, לשאול ולעקוב.</p><div class="profile-options"><a class="profile-option" href="${journalHref}"><div class="profile-name">יומן הפרויקט</div><div class="profile-desc">Project Journal</div></a><a class="profile-option" href="${CONFIG.instagram}" target="_blank" rel="noopener"><div class="profile-name">אינסטגרם</div><div class="profile-desc">Instagram ↗</div></a></div></div></div>`;
}

function patchScript(work, rail) {
  const isShutters = work.key === "shutters";
  const layers = isShutters ? null : layersDataFor(work);
  const idx = rail.list.findIndex(w => w.key === work.key);
  const prev = rail.list[(idx - 1 + rail.list.length) % rail.list.length];
  const next = rail.list[(idx + 1) % rail.list.length];
  const hasSides = layers && layers.B;
  const hasObjCats = work.key === "peppers";

  return `
<script>
// ===== per-work patch (build-live) =====
var WORK_KEY = ${JSON.stringify(work.key)};
var PREV_URL = ${JSON.stringify(prev.key + ".html")};
var NEXT_URL = ${JSON.stringify(next.key + ".html")};
${isShutters ? "" : `
var LAYERS_ROWS = ${JSON.stringify(Array.isArray(layers) ? layers : layers.A)};
var LAYERS_B = ${JSON.stringify(Array.isArray(layers) ? null : layers.B)};
var currentSide = 'A';
// רנדרינג רבדים נרטיבי (מחליף את הגרסה של תריסים)
var SIDE_NAMES = { A: { he: 'צד ראשון', en: 'Side One', ar: 'الجانب الأول' }, B: { he: 'צד שני', en: 'Side Two', ar: 'الجانب الثاني' } };
renderLayersContent = function (lang) {
  var rows = (currentSide === 'B' && LAYERS_B) ? LAYERS_B : LAYERS_ROWS;
  var pick = function (tri) { return (tri && (tri[lang] || tri.he)) || ''; };
  var html = '';
  if (LAYERS_B) {
    html += '<div class="categories-row" style="margin-bottom:24px;border-bottom:1px solid var(--bone-faint)">' +
      ['A', 'B'].map(function (s) {
        return '<button class="category-btn' + (currentSide === s ? ' active' : '') + '" onclick="setSide(\\'' + s + '\\')"><span class="cat-name">' + SIDE_NAMES[s][lang === 'en' ? 'en' : lang] + '</span><span class="cat-name-en">' + SIDE_NAMES[s].en + '</span></button>';
      }).join('') + '</div>';
  }
  html += '<div class="panel-path">';
  rows.forEach(function (l) {
    html += '<div class="panel-stop"><div class="panel-stop-num">' + pick(l.label) + '</div>' +
      (pick(l.title) ? '<div class="panel-stop-title">' + pick(l.title) + '</div>' : '') +
      '<div class="panel-stop-text">' + pick(l.text) + '</div></div>';
  });
  html += '</div>';
  return html;
};
var SIDE_IMG = ${JSON.stringify(REAL[work.key] && REAL[work.key].B ? { A: "../assets/" + REAL[work.key].A.file, B: "../assets/" + REAL[work.key].B.file } : null)};
var SIDE_OBJECTS = ${JSON.stringify(TW_SIDES[work.key] && TW_SIDES[work.key][1] ? { A: mergeObjectContent(annotationObjects(TW_SIDES[work.key][0], work.key), work.key), B: mergeObjectContent(annotationObjects(TW_SIDES[work.key][1]), work.key) } : null)};
function recomputeDirs() {
  LEADER_DIRS = {};
  objectData.forEach(function (o) { LEADER_DIRS[o.id] = o.x > 62 ? 'up-left' : o.x < 38 ? 'up-right' : 'up-right'; });
}
function setSide(s) {
  currentSide = s;
  if (SIDE_OBJECTS && SIDE_OBJECTS[s]) { objectData = SIDE_OBJECTS[s]; recomputeDirs(); }
  if (SIDE_IMG && SIDE_IMG[s]) {
    var ic = document.querySelector('.image-content');
    if (ic) ic.style.backgroundImage = "url('" + SIDE_IMG[s] + "')";
  }
  setCategory('layers', false);
  if (window.gtag) gtag('event', 'side_switch', { work: WORK_KEY, side: s });
}
// זמינות קטגוריות: מציגים רק לשוניות עם תוכן
// רנדור אור ללא דיאגרמה (רק לתריסים יש תרשים)
var _origRenderLight = renderLightContent;
renderLightContent = function (lang) {
  if (LIGHT_DATA && LIGHT_DATA.diagramSrc) return _origRenderLight(lang);
  if (!LIGHT_DATA || !LIGHT_DATA.sources) return '';
  var html = '<div class="panel-items">';
  LIGHT_DATA.sources.forEach(function (s) {
    html += '<div class="panel-item"><div class="panel-item-meta">' + s.num + (s.subtitle ? ' · ' + s.subtitle : '') + '</div><div class="panel-item-title">' + s.title + '</div><div class="panel-item-text">' + s.text + '</div></div>';
  });
  return html + '</div>';
};
(function () {
  var avail = {
    layers: LAYERS_ROWS.length > 0,
    light: !!(LIGHT_DATA && LIGHT_DATA.sources && LIGHT_DATA.sources.length),
    path: PATH_DATA.length > 0,
    description: objectData.some(function (o) { return o.category && o.category.description; }),
    meaning: objectData.some(function (o) { return o.category && o.category.meaning; })
  };
  document.querySelectorAll('.category-btn[data-mode]').forEach(function (btn) {
    if (!avail[btn.dataset.mode]) btn.style.display = 'none';
  });
  setTimeout(function () { setCategory(avail.description ? 'description' : 'layers', false); }, 0);
})();
`}
// חשיפה קולנועית: גלילת רשימת העצמים מלמטה למעלה, כל נקודה נדלקת בתורה
triggerInitialReveal = function () {
  if (window.__revealDone) return; window.__revealDone = true;
  var DURATION = 1000; // שנייה אחת לכל הרצף
  var col = document.getElementById('panelCol');
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-panel-obj-id]'));
  function clearAll(delay) {
    setTimeout(function () {
      document.querySelectorAll('.hotspot.is-revealed').forEach(function (h) { h.classList.remove('is-revealed'); });
      document.querySelectorAll('.panel-item.focused').forEach(function (p) { p.classList.remove('focused'); });
    }, delay);
  }
  function light(it) {
    var h = document.querySelector('.hotspot[data-obj-id="' + it.dataset.panelObjId + '"]');
    if (h) h.classList.add('is-revealed');
    it.classList.add('focused');
    setTimeout(function () { it.classList.remove('focused'); }, 600);
  }
  if (items.length && col) {
    var order = items.slice().reverse();
    var startTop = 0;
    try { col.scrollTop = col.scrollHeight; startTop = col.scrollTop; } catch (e) {}
    var revealed = 0, t0 = null;
    function frame(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / DURATION);
      try { col.scrollTop = startTop * (1 - p); } catch (e) {}
      var want = Math.floor(p * order.length);
      while (revealed < want) light(order[revealed++]);
      if (p < 1) requestAnimationFrame(frame);
      else { while (revealed < order.length) light(order[revealed++]); clearAll(1200); }
    }
    requestAnimationFrame(frame);
  } else {
    var hs = Array.prototype.slice.call(document.querySelectorAll('.hotspot'));
    hs.sort(function (a, b) { return parseFloat(b.style.top) - parseFloat(a.style.top); });
    var step = Math.max(40, DURATION / Math.max(1, hs.length));
    var k = 0;
    (function tick() {
      if (k >= hs.length) { clearAll(1400); return; }
      hs[k].classList.add('is-revealed');
      k++; setTimeout(tick, step);
    })();
  }
};

// ברבדים אין כוכבים על הדימוי, הם שייכים לתיאור/משמעות/מסלול
(function () {
  var _setCat = setCategory;
  setCategory = function (m, s) {
    _setCat(m, s);
    var L = document.getElementById('hotspotsLayer');
    if (L) L.style.display = (m === 'layers') ? 'none' : '';
  };
  setTimeout(function () {
    var L = document.getElementById('hotspotsLayer');
    if (L) L.style.display = (currentCategory === 'layers') ? 'none' : '';
  }, 50);
})();

// prev/next: חיצי הכותרת + מקלדת
(function () {
  var p = document.querySelector('.title-nav-prev');
  var n = document.querySelector('.title-nav-next');
  if (p) p.addEventListener('click', function () { location.href = PREV_URL; });
  if (n) n.addEventListener('click', function () { location.href = NEXT_URL; });
  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input,textarea')) return;
    if (e.key === 'ArrowRight') location.href = PREV_URL; // rtl: ימינה = קודם
    if (e.key === 'ArrowLeft') location.href = NEXT_URL;
  });
})();
// share
function shareNative() {
  if (navigator.share) navigator.share({ title: document.title, url: location.href }).catch(function () {});
}
function copyLink(el) {
  navigator.clipboard.writeText(location.href).then(function () {
    if (el) { var n = el.querySelector('.profile-name'); var o = n.textContent; n.textContent = 'הועתק ✓'; setTimeout(function () { n.textContent = o; }, 1400); }
  });
}
// analytics: section_view + שהייה בסקשנים + עצירה על אובייקטים
(function () {
  var seen = {}, dwell = {}, openAt = {};
  function report(name) {
    if (seen[name]) return; seen[name] = true;
    if (window.clarity) clarity('set', 'section', WORK_KEY + ':' + name);
    if (window.gtag) gtag('event', 'section_view', { work: WORK_KEY, section_name: name });
  }
  function bucket(s) { return s < 5 ? '0-5s' : s < 15 ? '5-15s' : s < 30 ? '15-30s' : s < 60 ? '30-60s' : s < 120 ? '1-2m' : '2m+'; }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var id = en.target.id || en.target.dataset.section;
        if (en.isIntersecting) { report(id); openAt[id] = Date.now(); }
        else if (openAt[id]) { dwell[id] = (dwell[id] || 0) + (Date.now() - openAt[id]); delete openAt[id]; }
      });
    }, { threshold: 0.4 });
    ['title', 'image', 'categoryPanel'].forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
  function flush() {
    var now = Date.now();
    for (var id in openAt) { dwell[id] = (dwell[id] || 0) + (now - openAt[id]); }
    openAt = {};
    for (var id in dwell) {
      var s = Math.round(dwell[id] / 1000);
      if (s < 1) continue;
      if (window.clarity) clarity('set', 'dwell_' + id, bucket(s));
      if (window.gtag) gtag('event', 'section_dwell', { work: WORK_KEY, section_name: id, seconds: s });
    }
    if (window.clarity && Object.keys(dwell).length) clarity('event', 'dwell_report');
    dwell = {};
  }
  window.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); });
  // עצירה על אובייקט: ריחוף מעל 700ms נספר כהתעכבות
  document.addEventListener('mouseover', function (e) {
    var h = e.target.closest && e.target.closest('.hotspot');
    if (!h || h.__t0) return;
    h.__t0 = Date.now();
    h.addEventListener('mouseleave', function onLeave() {
      var dt = Date.now() - h.__t0; h.__t0 = null;
      h.removeEventListener('mouseleave', onLeave);
      if (dt >= 700) {
        var name = (h.querySelector('.hotspot-tag-name') || {}).textContent || h.dataset.objId;
        if (window.clarity) { clarity('set', 'object_focus', WORK_KEY + ':' + name); clarity('event', 'object_focus'); }
        if (window.gtag) gtag('event', 'object_focus', { work: WORK_KEY, object: name, ms: dt });
      }
    });
  });
  document.querySelectorAll('.category-btn[data-mode]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (window.clarity) clarity('set', 'category', WORK_KEY + ':' + b.dataset.mode);
      if (window.gtag) gtag('event', 'category_view', { work: WORK_KEY, category: b.dataset.mode });
    });
  });
})();
</script>`;
}

// ---------- page assembly ----------
function buildWorkPage(work) {
  const rail = railFor(work);
  const idx = rail.list.findIndex(w => w.key === work.key);
  const counter = `${String(idx + 1).padStart(2, "0")} / ${String(rail.list.length).padStart(2, "0")} · ${work.title.he}`;
  const isShutters = work.key === "shutters";
  let html = TEMPLATE;

  // head
  html = html.replace(/<title>[\s\S]*?<\/title>/,
    `<title>${esc(work.title.he)}${work.title.en ? " · " + esc(work.title.en) : ""} — שחף גליל</title><meta name="description" content="${esc(work.summary.he)}"><meta property="og:title" content="${esc(work.title.he)} — שחף גליל"><meta property="og:description" content="${esc(work.summary.he)}"><meta property="og:type" content="article">`);

  // יחס תצוגה לפי הדימוי האמיתי (tw/yh הם 3:2, לא 4:3)
  if (REAL[work.key]) {
    const { w, h } = REAL[work.key].A;
    if (Math.abs(w / h - 4 / 3) > 0.02) {
      html = html.replace("</head>", `<style>.image-frame{aspect-ratio:${w}/${h} !important}</style></head>`);
    }
  }

  // הדימוי מופיע מיידית — בלי הדיליי של 1.3ש שהסתיר את נקודות החשיפה
  html = html.replace(".image-stage{margin-bottom:0;opacity:0;animation:titleIn 1.5s 1.3s ease-out forwards}",
    ".image-stage{margin-bottom:0}");

  // שורת ניווט-אתר מעל סרגל העבודה (עבודות · אודות · תערוכות · יומן · פנייה)
  html = html.replace("</head>", `<style>
.site-bar{position:fixed;top:0;right:0;left:0;z-index:210;height:40px;display:flex;align-items:center;justify-content:flex-start;direction:rtl;padding:0 40px;gap:38px;background:var(--black-deep);border-bottom:1px solid rgba(74,70,63,.5);font-family:var(--mono);font-size:12px;letter-spacing:.35em}
.site-bar a{color:var(--bone-dim);text-decoration:none;transition:color .4s;padding:4px 0}
a{text-decoration:none}
.site-bar a:hover{color:var(--bone)}
@media (max-width:560px){.site-bar{gap:16px;font-size:9px;letter-spacing:.18em}}
</style></head>`);
  html = html.replace(/(<nav class="top-nav">)/, `<div class="site-bar"><a href="../index.html">עבודות</a><a href="../about.html">אודות</a><a href="../exhibitions.html">תערוכות</a><a href="../journal.html">יומן</a><a href="../contact.html">פנייה</a></div>$1`);
  // להזיז את סרגל העבודה והפריים מתחת לשורה החדשה
  html = html.replace(".top-nav{position:fixed;top:0;", ".top-nav{position:fixed;top:40px;");
  html = html.replace(".locked-frame{position:absolute;top:64px;", ".locked-frame{position:absolute;top:104px;");
  html = html.replace(".sticky-bundle.is-fixed{position:fixed;top:56px;", ".sticky-bundle.is-fixed{position:fixed;top:96px;");
  html = html.split("const topNavHeight = 56;").join("const topNavHeight = 96;");
  html = html.split("window.innerWidth > 900 ? 64 : 56").join("window.innerWidth > 900 ? 104 : 96");

  // הקטנת טיפוגרפיה בפאנל (בקשת שחף): כל הכיתוב בחלון הקטגוריות ירד בשתי נקודות
  if (isShutters) {
    // הצילום נחתך מהמסגרת הלבנה (30,31)-(1531,1156) מתוך 1566x1191 — ממפים את
    // הקואורדינטות של הכוכבים וסמני האור לתצוגה החדשה (cover בפריים 4:3)
    const rx = v => Math.round(((v * 15.66 - 30.5) / 15.00) * 100) / 100;
    const ry = v => Math.round(((v * 11.745 - 22.75) / 11.25) * 100) / 100;
    ["objectData", "LIGHT_MARKERS"].forEach(name => {
      const s = html.indexOf(name + " = [");
      const e = html.indexOf("];", s);
      if (s < 0 || e < 0) throw new Error("remap: " + name + " not found");
      const block = html.slice(s, e).replace(/x: ([\d.]+), y: ([\d.]+)/g,
        (m, a, b) => "x: " + rx(+a) + ", y: " + ry(+b));
      html = html.slice(0, s) + block + html.slice(e);
    });
  }
  html = html.split(".panel-intro{font-family:var(--serif-heb);font-weight:300;font-size:17px;").join(".panel-intro{font-family:var(--serif-heb);font-weight:300;font-size:15px;");
  html = html.split(".panel-item-title{font-family:var(--serif-heb);font-weight:400;font-size:22px;").join(".panel-item-title{font-family:var(--serif-heb);font-weight:400;font-size:20px;");
  html = html.split(".panel-item-text{font-family:var(--serif-heb);font-weight:300;font-size:15px;").join(".panel-item-text{font-family:var(--serif-heb);font-weight:300;font-size:13px;");
  html = html.split(".panel-stop-title{font-family:var(--serif-heb);font-weight:400;font-size:20px;").join(".panel-stop-title{font-family:var(--serif-heb);font-weight:400;font-size:18px;");
  html = html.split(".panel-stop-text{font-family:var(--serif-heb);font-weight:300;font-size:15px;").join(".panel-stop-text{font-family:var(--serif-heb);font-weight:300;font-size:13px;");

  // שם העבודה בחצי
  html = html.split("font-size:clamp(40px,5.4vw,66px)").join("font-size:clamp(20px,2.7vw,33px)");
  html = html.split(".work-title-line .lang-word[data-lang=\"en\"]{font-family:var(--serif-en);font-style:italic;font-size:clamp(34px,4.5vw,56px)}").join(".work-title-line .lang-word[data-lang=\"en\"]{font-family:var(--serif-en);font-style:italic;font-size:clamp(17px,2.3vw,28px)}");
  html = html.split(".work-title-line .sep{font-family:var(--serif-heb);font-weight:300;color:var(--bone-faint);font-size:clamp(34px,4.5vw,56px)}").join(".work-title-line .sep{font-family:var(--serif-heb);font-weight:300;color:var(--bone-faint);font-size:clamp(17px,2.3vw,28px)}");

  // clarity (אין בתבנית; מוסיפים רק אם הוגדר מזהה)
  if (CONFIG.clarityId) {
    html = html.replace("</head>", `<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", ${JSON.stringify(CONFIG.clarityId)});</script></head>`);
  } else {
    html = html.replace("setTimeout(() => banner.classList.add('show'), 2000);", "/* אין אנליטיקס מוגדר — הבאנר כבוי */");
  }

  // hero + light diagram
  html = html.replace(/\{\{IMG_1\}\}/g, heroPath(work));
  if (isShutters) html = html.replace(/\{\{IMG_2\}\}/g, "../assets/shutters-real-2.png");

  // nav-home
  html = html.replace('<a href="#" class="nav-home"', '<a href="../index.html" class="nav-home"');

  // top-nav project line (שם גוף העבודה)
  html = html.replace(/<h2 class="project-line lang-block top-nav-title" dir="rtl">[\s\S]*?<\/h2>/,
    `<h2 class="project-line lang-block top-nav-title" dir="rtl">${langWords(rail.label)}</h2>`);

  // work title line
  html = html.replace(/<h1 class="work-title-line lang-block" dir="rtl">[\s\S]*?<\/h1>/,
    `<h1 class="work-title-line lang-block" dir="rtl">${langWords(work.title)}</h1>`);

  // nav counter (סטטי)
  html = html.replace(/<div class="nav-counter" data-i18n="navCounter">[\s\S]*?<\/div>/,
    `<div class="nav-counter" data-i18n="navCounter">${esc(counter)}</div>`);

  // summary (סטטי)
  html = html.replace(/(<p class="summary-text" data-i18n="summary">)[\s\S]*?(<\/p>)/,
    `$1${esc(work.summary.he)}$2`);

  // footer: קישורים חיים
  const journalHref = CONFIG.substackUrl || `mailto:${CONFIG.email}?subject=${encodeURIComponent("עדכנו אותי כשהיומן נפתח")}`;
  html = html.replace('<a href="#" class="footer-substack-link"', `<a href="${journalHref}" class="footer-substack-link"`);
  html = html.replace('<a href="#" class="footer-link" data-i18n="footerLink_allImages"', '<a href="../index.html" class="footer-link" data-i18n="footerLink_allImages"');
  html = html.replace('<a href="#" class="footer-link" data-i18n="footerLink_about"', '<a href="../about.html" class="footer-link" data-i18n="footerLink_about"');
  html = html.replace('<a href="#" class="footer-link" data-i18n="footerLink_emptiness"', '<a href="../statement.html" class="footer-link" data-i18n="footerLink_emptiness"');

  // social corner: אינסטגרם חי, בלי פייסבוק/דיסקורד
  html = html.replace(/<div class="social-corner"[\s\S]*?<\/div>/,
    `<div class="social-corner" role="navigation" aria-label="social"><a href="${CONFIG.instagram}" target="_blank" rel="noopener" class="social-corner-icon" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg></a><a href="../journal.html" class="social-corner-icon" aria-label="Journal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4h13a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/></svg></a></div>`);

  // construction link → היומן (שם יתפרסם הניתוח המלא)
  html = html.replace('<a href="#" class="construction-link">', '<a href="../journal.html" class="construction-link">');

  // modals: החלפה מלאה (מייל/שיתוף/יומן — בלי דיסקורד ובלי הרשמה מתה)
  {
    const start = html.indexOf('<div class="modal" id="modal-inquire">');
    const end = html.indexOf("<script>", start);
    html = html.slice(0, start) + modalsHtml(work) + html.slice(end);
  }

  // LIKE_KEY פר עבודה (תיקון גם לבאג 'peppers' שבמקור)
  html = html.replace(/const LIKE_KEY = '[^']*';/, `const LIKE_KEY = 'forged-trees:like:${work.key}';`);

  // תרגומים: בסיס הדף החי + התאמות פר עבודה
  html = spliceConst(html, "translations", JSON.stringify(translationsFor(work, rail), null, 1));

  if (!isShutters) {
    // תוכן פר עבודה במקום התוכן של תריסים
    html = spliceConst(html, "LIGHT_DATA", JSON.stringify(lightDataFor(work)));
    html = spliceConst(html, "LIGHT_MARKERS", "[]", "[", "]");
    html = spliceConst(html, "PATH_ARROWS", "[]", "[", "]");
    html = spliceConst(html, "LEADER_DIRS", JSON.stringify(leaderDirsFor(work)), "{", "}", "let");
    html = spliceConst(html, "LAYERS_DATA", "[]", "[", "]"); // מוחלף ע"י LAYERS_ROWS בפאץ'
    html = spliceConst(html, "PATH_DATA", JSON.stringify(pathDataExtFor(work) || pathDataFor(work), null, 1), "[", "]");
    html = spliceConst(html, "objectData", JSON.stringify(objectDataFor(work), null, 1), "[", "]", "let");
    // intros גנריים (של תריסים מזכירים 17 רבדים וסטראדלה)
    html = spliceConst(html, "intros", JSON.stringify({
      description: { he: "תיאור גולמי של מה שיש בדימוי, ללא פרשנות. <em>מה רואים, לפני שיש משמעות.</em>", en: "Raw description of what is in the image, without interpretation.", ar: "وصف خام لما في الصورة، بلا تفسير." },
      light: { he: (CATS[work.key] && CATS[work.key].light && CATS[work.key].light.intro) || "קריאת האור של העבודה: מקורות, כיוונים, ומה הם בוחרים לחשוף.", en: "A reading of the light: sources, directions, and what they choose to reveal.", ar: "قراءة الضوء: المصادر والاتجاهات وما تختار كشفه." },
      meaning: { he: "מה כל אובייקט מסמל, מה תפקידו בסיפור. <em>הקריאה הסימבולית.</em>", en: "What each object symbolizes, its role in the story.", ar: "ما يرمز إليه كل غرض، دوره في الحكاية." },
      layers: { he: "הרבדים של הקריאה. כל רובד נסבל ברגע שלו, וכל רובד נחצה בידי הבא אחריו. <em>הסכמה נבנית, ואז שוברת.</em>", en: "The layers of reading. <em>The schema builds, and breaks.</em>", ar: "طبقات القراءة. <em>يُبنى المخطط، ثم يُكسر.</em>" },
      path: { he: "מסלול העין: איך הצופה מובל מתחנה לתחנה.", en: "The eye path: how the viewer is led from stop to stop.", ar: "مسار النظر: كيف يُقاد المشاهد من محطة إلى محطة." },
    }, null, 1));
    // ברירת המחדל בקטגוריות נקבעת בפאץ' — מבטלים את הקריאה המקורית
    html = html.replace("setCategory('description', false);", "/* initial category set by patch */");
    // גשם רק בעבודות הגשומות
    if (!(work.body === "forged-trees" || work.body === "twelve")) {
      html = html.replace(/for \(let i = 0; i < \d+; i\+\+\) \{(\s*const drop)/, "for (let i = 0; i < 0; i++) {$1");
    }
  }

  // פאץ' פר עבודה
  html = html.replace("</body></html>", patchScript(work, rail) + "</body></html>");
  return html;
}

// ---------- דפי גופי עבודה: טקסט קיר + כל העבודות ----------
function heroAsset(w) {
  return w.key === "shutters" ? "assets/shutters-real-1c.jpg"
    : w.key === "peppers" ? "assets/peppers-real-1.jpg"
    : REAL[w.key] ? "assets/" + (REAL[w.key].A.tile || REAL[w.key].A.file)
    : "assets/" + w.key + "-hero.svg";
}
function bodyPageList() {
  const list = BODIES.map(b => ({ key: b.key, title: b.title, wall: (b.wall && b.wall.he) || "", meta: b.meta || "",
    works: WORKS.filter(w => w.body === b.key) }));
  list.push({ key: "selected", title: { he: "נבחרות", ar: "مختارات", en: "Selected" },
    wall: "מבחר עבודות מכל גופי העבודה, כולל עבודות שאינן חלק מסדרה.", meta: "",
    works: SELECTED.map(k => workByKey[k]) });
  return list;
}
function buildBodyPage(b) {
  const wallHtml = b.wall.split(/\n\n+/).map(p => `<p>${esc(p)}</p>`).join("");
  const grid = b.works.map(w => `
    <a class="bp-tile" href="works/${w.key}.html">
      <span class="bp-img"><img src="${heroAsset(w)}" alt="${esc(w.title.he)}" loading="lazy"></span>
      <span class="bp-name">${esc(w.title.he)}</span>
      <span class="bp-en">${esc(w.title.en || "")}</span>
    </a>`).join("");
  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(b.title.he)}${b.title.en ? " · " + esc(b.title.en) : ""}, שחף גליל</title>
<meta name="description" content="${esc(b.wall.slice(0, 150))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Frank+Ruhl+Libre:wght@300;400;500&family=JetBrains+Mono:wght@300;400&family=Noto+Naskh+Arabic:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/site.css">
${CONFIG.clarityId ? `<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CONFIG.clarityId}");</script>` : ""}
<style>
.bp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:18px;margin-top:44px}
.bp-tile{display:block;color:var(--bone-dim);transition:color .3s}
.bp-tile:hover{color:var(--bone)}
.bp-img{display:block;aspect-ratio:4/3;overflow:hidden;background:var(--bg-panel);box-shadow:0 14px 40px var(--shadow)}
.bp-img img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.4,0,.2,1);filter:saturate(.96)}
.bp-tile:hover .bp-img img{transform:scale(1.04)}
.bp-name{display:block;margin-top:10px;font-size:15px;color:#ffffff}
.bp-en{display:block;font-family:var(--serif-en);font-style:italic;font-size:11px;color:var(--bone-faint)}
.bp-wall{max-width:640px;font-size:14px;line-height:2;color:var(--bone)}
.bp-wall p{margin:0 0 18px}
.bp-meta{font-family:var(--mono);font-size:10px;letter-spacing:.15em;color:var(--bone-faint);margin-top:6px}
</style>
<style>
/* טלפון אנכי: בקשה לסובב לרוחב */
.rotate-ask{display:none;position:fixed;inset:0;z-index:9999;background:#050505;align-items:center;justify-content:center;flex-direction:column;gap:20px;text-align:center;padding:32px}
/* בקשת הסיבוב בוטלה: לדפים יש פריסה אנכית מלאה */
.rotate-ask .ra-icon{width:56px;height:56px;color:#e8e4dd;animation:raRot 2.6s ease-in-out infinite}
.rotate-ask .ra-icon svg{width:100%;height:100%;stroke:currentColor;fill:none;stroke-width:1.2}
@keyframes raRot{0%,100%{transform:rotate(0deg)}50%{transform:rotate(90deg)}}
.rotate-ask .ra-he{font-family:'Frank Ruhl Libre',serif;font-weight:300;font-size:18px;color:#e8e4dd}
.rotate-ask .ra-sub{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#8a857c}

@media (max-height:520px) and (orientation:landscape){
  .bp-shell{padding-top:60px !important}
  .top-nav{padding:10px 18px}
}
</style></head>
<body>\n<div class="rotate-ask" aria-hidden="true">  <div class="ra-icon"><svg viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="1.6"/><line x1="10.5" y1="18.5" x2="13.5" y2="18.5"/></svg></div>  <div class="ra-he">סובבו את המכשיר לרוחב</div>  <div class="ra-sub"><span>ROTATE TO LANDSCAPE</span><span lang="ar" style="font-family:'Noto Naskh Arabic',serif;text-transform:none;letter-spacing:.05em">اقلبوا الجهاز أفقياً</span></div></div>
<nav class="top-nav">
  <div class="nav-links">
    <a href="index.html#works" class="is-active">עבודות</a>
    <a href="about.html">אודות</a>
    <a href="exhibitions.html">תערוכות</a>
    <a href="journal.html">יומן</a>
    <a href="contact.html">פנייה</a>
  </div>
  <a class="brand" href="index.html">SHAHAF GALIL</a>
</nav>
<main class="page-shell">
  <div class="eyebrow" style="color:#ffffff">${esc(b.title.he)}${b.title.ar ? " · " + esc(b.title.ar) : ""}${b.title.en ? " · " + esc(b.title.en) : ""}</div>
  <div class="bp-wall">${wallHtml}</div>
  ${b.meta ? `<div class="bp-meta">${esc(b.meta)}</div>` : ""}
  <div class="bp-grid">${grid}</div>
</main>
<script src="js/site.js"></script>
</body>
</html>`;
}

// ---------- single-screen home (ללא שינוי מהותי מ-v2) ----------
function buildHome() {
  const byBody = k => k === "selected" ? SELECTED.map(x => workByKey[x]) : WORKS.filter(w => w.body === k);
  const menuBodies = [...BODIES.map(b => ({ key: b.key, label: b.menuLabel })),
    { key: "selected", label: { he: "נבחרות", ar: "مختارات", en: "Selected" } }];

  const menuHtml = menuBodies.map(b => {
    const works = byBody(b.key);
    return `
    <div class="menu-body" data-body="${b.key}">
      <button class="menu-body-head">
        <span data-b="he">${esc(b.label.he)}</span><span data-b="ar" hidden>${esc(b.label.ar)}</span><span data-b="en" hidden>${esc(b.label.en)}</span>
      </button>
      <div class="menu-works">
        <a href="body-${b.key}.html" class="menu-work menu-all"><span class="mw-num">··</span><span data-b="he">דף פרוייקט</span><span data-b="ar" hidden>صفحة المشروع</span><span data-b="en" hidden>Project page</span></a>
        ${works.map(w => `<a href="works/${w.key}.html" class="menu-work" data-wk="${w.key}">
          <span class="mw-num">${esc(w.num)}</span>
          <span data-b="he">${esc(w.title.he)}</span><span data-b="ar" hidden>${esc(w.title.ar || w.title.he)}</span><span data-b="en" hidden>${esc(w.title.en || w.title.he)}</span>
        </a>`).join("\n        ")}
      </div>
    </div>`;
  }).join("\n");

  const exh = `<div class="exh-stack">
      <div class="exh-head"><span data-b="he">תערוכות</span><span data-b="ar" hidden>معارض</span><span data-b="en" hidden>Exhibitions</span></div>` + (EXHIBITIONS_LIST || []).map(x => `
      <div class="exh-line" ${x.start ? `data-start="${x.start}"` : ""} ${x.end ? `data-end="${x.end}"` : ""}>
        <span class="exh-info"><span data-b="he">"${esc(x.title.he)}" · ${esc(x.venue.he)} · ${esc(x.city.he)}</span><span data-b="ar" hidden>${esc(x.title.he)} · ${esc(x.venue.he)}</span><span data-b="en" hidden>${esc(x.title.en)} · ${esc(x.venue.en)} · ${esc(x.city.en)}</span></span>
        <span class="exh-count"></span>
        ${x.url ? `<a class="exh-rsvp" href="${x.url}" target="_blank" rel="noopener"><span data-b="he">פרטים ←</span><span data-b="ar" hidden>تفاصيل ←</span><span data-b="en" hidden>Details →</span></a>` : ""}
        ${x.cal ? `<a class="exh-rsvp" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(x.cal.title)}&dates=${x.cal.dates}${x.cal.ctz ? "&ctz=" + x.cal.ctz : ""}&location=${encodeURIComponent(x.cal.location)}" target="_blank" rel="noopener"><span data-b="he">הוסף ליומן ⊕</span><span data-b="ar" hidden>أضف إلى التقويم ⊕</span><span data-b="en" hidden>Add to calendar ⊕</span></a>` : ""}
      </div>`).join("") + `
      <div class="exh-line exh-cta">
        <a class="exh-rsvp" href="mailto:${CONFIG.email}?subject=${encodeURIComponent("הודיעו לי על תערוכות חדשות")}&body=${encodeURIComponent("שם: \nעיר: \n")}"><span data-b="he">הודיעו לי על תערוכות חדשות ←</span><span data-b="ar" hidden>أخبروني عن معارض جديدة ←</span><span data-b="en" hidden>Tell me about new exhibitions →</span></a>
      </div></div>`;

  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>שחף גליל · Shahaf Galil — עצים מעוקמים · Forged Trees</title>
<meta name="description" content="עולמות מבוימים בצילום: עצים מעוקמים, ספרייה לאומית ישנה, יוסי חכמי, 12. הדפסות פיגמנט ופלטינה-פלדיום בקנה מידה גדול.">
<meta property="og:title" content="שחף גליל · Shahaf Galil">
<meta property="og:description" content="אני בונה עולמות. עולמות מבוימים בצילום.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Frank+Ruhl+Libre:wght@300;400;500;700&family=JetBrains+Mono:wght@300;400;700&family=Noto+Naskh+Arabic:wght@400&display=swap" rel="stylesheet">
${CONFIG.clarityId ? `<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CONFIG.clarityId}");</script>` : ""}
<style>
:root{--black:#0a0a0a;--black-deep:#050505;--bone:#e8e4dd;--bone-dim:#8a857c;--bone-faint:#4a463f;--accent:#b8a78f;
--serif-heb:'Frank Ruhl Libre',serif;--serif-en:'Cormorant Garamond',serif;--serif-ar:'Noto Naskh Arabic',serif;--mono:'JetBrains Mono',monospace}
*{margin:0;padding:0;box-sizing:border-box}
::selection{background:var(--bone);color:var(--black-deep)}
html,body{height:100%;overflow:hidden}
body{background:var(--black-deep);color:var(--bone);font-family:var(--serif-heb);font-weight:300;-webkit-font-smoothing:antialiased}
body::before{content:'';position:fixed;top:-50%;left:-50%;width:200%;height:200%;pointer-events:none;z-index:9998;opacity:0.04;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");animation:grainShift 0.5s steps(1) infinite;mix-blend-mode:overlay}
@keyframes grainShift{0%{transform:translate(0,0)}20%{transform:translate(-2%,1%)}40%{transform:translate(1%,-2%)}60%{transform:translate(-1%,2%)}80%{transform:translate(2%,-1%)}100%{transform:translate(0,0)}}
a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}

/* ── פס ניווט עליון ── */
.top-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;
direction:rtl;padding:22px 40px;font-family:var(--mono);font-size:12px;letter-spacing:.35em;
opacity:0;animation:fadeUp .9s 2.6s forwards}
.top-nav .nav-items{display:flex;gap:38px}
.top-nav a{color:var(--bone-dim);transition:color .4s}
.top-nav a:hover{color:var(--bone)}
.top-nav a.active{color:var(--bone)}
.lang-row{display:flex;gap:16px;font-size:10px;letter-spacing:.15em}
.lang-row button{color:var(--bone-faint);padding:2px 0;border-bottom:1px solid transparent;transition:all .4s}
.lang-row button.active{color:var(--bone);border-color:var(--bone-faint)}
.lang-row button:hover:not(.active){color:var(--bone-dim)}


/* טלפון אנכי: בקשה לסובב לרוחב */
.rotate-ask{display:none;position:fixed;inset:0;z-index:9999;background:#050505;align-items:center;justify-content:center;flex-direction:column;gap:20px;text-align:center;padding:32px}
/* בקשת הסיבוב בוטלה: לדפים יש פריסה אנכית מלאה */
.rotate-ask .ra-icon{width:56px;height:56px;color:#e8e4dd;animation:raRot 2.6s ease-in-out infinite}
.rotate-ask .ra-icon svg{width:100%;height:100%;stroke:currentColor;fill:none;stroke-width:1.2}
@keyframes raRot{0%,100%{transform:rotate(0deg)}50%{transform:rotate(90deg)}}
.rotate-ask .ra-he{font-family:'Frank Ruhl Libre',serif;font-weight:300;font-size:18px;color:#e8e4dd}
.rotate-ask .ra-sub{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#8a857c}

@media (max-height:520px) and (orientation:landscape){
  .top-nav{padding:8px 16px;font-size:9px;letter-spacing:.25em}
  .top-nav .nav-items{gap:20px}
  .menu{width:min(200px,27vw);padding:34px 16px 4vh}
  .menu-body-head{font-size:11px;padding:4px 0}
  .menu-work{font-size:9px;padding:3px 0;gap:7px}
  .menu-extra a{font-size:11px}
  .menu-sep{margin:12px 0}
  /* הבמה שומרת מקום לרצועת התערוכות בתחתית */
  .main{padding:36px 3vw 96px}
  .brand h1{font-size:clamp(20px,4vw,34px)}
  .brand .en-name{margin-top:7px;font-size:clamp(7px,1.1vw,11px);letter-spacing:.3em}
  .tagline{margin-top:3vh;font-size:clamp(12px,1.5vw,16px);line-height:1.6}
  .tagline .l2{margin-top:3px}
  .tagline .l3{margin-top:2px}
  /* תערוכות: רצועה קבועה, תחומה בקו, על רקע מלא, מהקצה ועד התפריט */
  .exh-stack{position:fixed;bottom:0;left:0;right:min(200px,27vw);inset-inline:auto;padding:6px 3vw 9px;margin:0;background:var(--black-deep);border-top:1px solid rgba(232,228,221,.18);gap:2px;z-index:50}
  html[dir="rtl"] .exh-stack{left:0;right:min(200px,27vw)}
  html[dir="ltr"] .exh-stack{right:0;left:min(200px,27vw)}
  .exh-head{font-size:10px;margin-bottom:1px}
  .exh-line{font-size:9.5px;gap:8px;flex-wrap:nowrap;white-space:nowrap;overflow:hidden}
  .exh-line .exh-rsvp{font-size:8px}
  .preview{top:40px;bottom:88px;inset-inline-start:calc(min(200px,27vw) + 12px);inset-inline-end:3vw}
  .pv-top{margin-bottom:8px}
  .pv-wall{font-size:11.5px;line-height:1.6;margin-bottom:10px}
  .pv-desc{display:none}
  .pv-meta{font-size:8px}
  .pv-name{font-size:11px;margin-top:5px}
  .pv-grid{gap:12px 10px}
}
/* ── שער כניסה (מובייל אנכי) ── */
.gate{position:fixed;inset:0;z-index:10000;background:rgba(5,5,5,.7);display:none;flex-direction:column;padding:max(9vh,44px) 28px 30px;color:#e8e4dd}
.gate.on{display:flex}
.gate-exh{text-align:center;font-size:12px;color:var(--bone-dim);margin-bottom:14px;display:block}
.gate-exh .exh-count{color:#fff;font-family:var(--mono);font-size:10px;letter-spacing:.08em}
.gate-rows{margin-top:auto;display:flex;flex-direction:column}
.gate-row{display:flex;justify-content:center;align-items:baseline;gap:12px;padding:19px 2px;border-top:1px solid rgba(232,228,221,.22);font-size:23px;color:#e8e4dd;text-align:center;width:100%;background:none;border-inline:none;border-bottom:none;font-family:var(--serif-heb);cursor:pointer;position:relative;z-index:2;font-weight:700}
.gate-row .g-mark{font-family:var(--mono);font-size:15px;color:var(--bone-dim)}
.gate-enter{margin-top:26px;border:1px solid #e8e4dd;background:#e8e4dd;color:#0a0a0a;padding:16px;font-size:23px;font-weight:700;font-family:var(--serif-heb);width:100%;text-align:center;cursor:pointer}
@media (orientation:landscape),(min-width:861px){.gate{display:none !important}}
/* ── במה ── */
.stage{height:100%;display:flex;flex-direction:row-reverse}
html[dir="ltr"] .stage{flex-direction:row}
@media (min-width:861px){
  .menu{position:fixed;top:0;bottom:0;right:0;left:auto}
  html[dir="ltr"] .menu{left:0;right:auto}
  .main{width:100%}
}
.main{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;min-width:0;position:relative;padding:0 4vw}
.brand{text-align:center}
.brand h1{font-size:clamp(32px,5vw,75px);font-weight:300;line-height:1;opacity:0;animation:fadeUp 1.2s .3s cubic-bezier(.4,0,.2,1) forwards}
.brand .en-name{display:block;font-family:var(--serif-en);font-size:clamp(11px,1.5vw,22px);letter-spacing:.4em;text-transform:uppercase;color:var(--bone-dim);margin-top:26px;font-weight:300}
.tagline{margin-top:6vh;font-size:clamp(19px,2vw,28px);color:var(--bone-dim);line-height:1.9;text-align:center;opacity:0;animation:fadeUp 1.1s 1.3s cubic-bezier(.4,0,.2,1) forwards}
.tagline .l2{display:block;font-family:var(--serif-ar);font-size:.78em;color:var(--bone-faint);margin-top:8px}
.tagline .l3{display:block;font-family:var(--serif-en);font-style:italic;font-size:.78em;color:var(--bone-faint);margin-top:4px}
.exh-stack{position:absolute;bottom:4vh;inset-inline-start:4vw;display:flex;flex-direction:column;gap:10px;opacity:0;animation:fadeUp .9s 3.1s forwards}\n.exh-line{display:flex;gap:14px;align-items:baseline;flex-wrap:wrap;font-size:13px}
.exh-label{font-family:var(--mono);font-size:9px;letter-spacing:.25em;color:var(--accent);text-transform:uppercase}
.exh-info{color:var(--bone-dim)}
.exh-rsvp{font-family:var(--mono);font-size:9px;letter-spacing:.15em;color:var(--bone);border-bottom:1px solid var(--bone-faint);padding-bottom:3px;transition:all .4s}
.exh-rsvp:hover{border-color:var(--bone)}
.exh-count{font-family:var(--mono);font-size:10px;letter-spacing:.12em;color:#ffffff;font-weight:700}
.exh-head{font-size:16px;font-weight:700;color:#ffffff;letter-spacing:.04em;margin-bottom:2px}
.exh-info{color:#ffffff;font-weight:700}
.exh-cta{margin-top:4px;padding-top:10px;border-top:1px solid rgba(74,70,63,.4);gap:22px}
.preview{position:fixed;top:70px;bottom:calc(4vh + 150px);inset-inline-start:calc(min(300px,26vw) + 28px);inset-inline-end:4vw;display:flex;flex-direction:column;padding:6px 0 16px;opacity:0;pointer-events:none;transition:opacity .35s;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--bone-faint) transparent}
.preview.active{opacity:1;pointer-events:auto}
.brand{transition:opacity .35s}
.brand.faded{opacity:0;pointer-events:none}
.pv-top{display:flex;align-items:baseline;gap:20px;margin-bottom:20px}
.pv-head{font-size:16px;color:#ffffff;font-weight:700;letter-spacing:.04em}
.pv-close{margin-inline-start:auto;font-family:var(--mono);font-size:11px;color:var(--bone-faint);transition:color .3s}
.pv-close:hover{color:#fff}
.pv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px 18px;width:100%;padding:5px 9px;box-sizing:border-box}
.pv-tile{display:block;color:var(--bone-dim);transition:color .3s}
.pv-img{display:block;aspect-ratio:4/3;overflow:hidden;background:var(--black);outline:1px solid transparent;transition:outline-color .3s,transform .3s}
.pv-img img{width:100%;height:100%;object-fit:cover;opacity:.82;transition:opacity .3s}
.pv-name{display:block;margin-top:9px;font-size:14px;color:#ffffff}
.pv-name i{font-family:var(--serif-en);font-size:11px;color:var(--bone-dim);font-style:italic}
.pv-meta{display:block;margin-top:2px;font-family:var(--mono);font-size:9px;letter-spacing:.08em;color:var(--bone-dim)}
.pv-desc{display:block;margin-top:5px;font-size:11.5px;line-height:1.65;color:#c9c4bb;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.pv-tile.hl .pv-img{outline-color:var(--bone);transform:scale(1.03)}
.pv-tile.hl .pv-img img{opacity:1}
.pv-tile:hover .pv-img img{opacity:1}
.pv-wall{margin:0 auto 22px;max-width:820px;font-size:15px;line-height:1.9;color:#b5b0a7;text-align:center;transition:color .35s}
.pv-wall:hover{color:#ffffff}
.pv-link{font-family:var(--mono);font-size:10px;letter-spacing:.15em;color:var(--accent);border-bottom:1px solid var(--bone-faint);padding-bottom:3px}


/* ── מניו ימני — נקי, 20px ── */
.menu{width:min(300px,26vw);display:flex;flex-direction:column;justify-content:flex-start;padding:58px 48px 9vh;
opacity:0;animation:fadeUp 1s 2.1s cubic-bezier(.4,0,.2,1) forwards;overflow-y:auto;scrollbar-width:none}
.menu::-webkit-scrollbar{display:none}
.menu-body{margin-bottom:6px}
.menu-body-head{display:block;width:100%;text-align:start;font-size:12px;font-weight:400;letter-spacing:.06em;color:var(--bone-dim);
padding:9px 0;transition:color .4s,padding .35s;position:relative}
.menu-body-head:hover{color:var(--bone);padding-inline-start:8px}
.menu-body.open .menu-body-head{color:var(--bone)}
.menu-works{max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(.4,0,.2,1)}
.menu-body.open .menu-works{max-height:52vh;overflow-y:auto;scrollbar-width:none}
.menu-body.open .menu-works::-webkit-scrollbar{display:none}
.menu-work{display:flex;gap:10px;align-items:baseline;padding:6px 0;
color:var(--bone-dim);font-size:10px;letter-spacing:.06em;transition:all .3s}
.menu-work:hover{color:var(--bone);padding-inline-start:8px}
.mw-num{font-family:var(--mono);font-size:8px;letter-spacing:.15em;color:var(--bone-faint);min-width:32px}
.menu-sep{height:1px;background:var(--bone-faint);opacity:.4;margin:22px 0}
.menu-extra{display:flex;flex-direction:column;gap:8px}
.menu-extra a{font-size:15px;color:var(--bone-faint);transition:color .4s,padding .3s}
.menu-extra a:hover{color:var(--bone);padding-inline-start:6px}
@media (prefers-reduced-motion:reduce){.top-nav,.brand h1,.tagline,.exh-stack,.menu{opacity:1;animation:none}}
@media (max-width:860px) and (orientation:portrait){
  /* דף כניסה במובייל: מותג קטן, תפריט צ'יפים, גריד עצים מעוקמים, תערוכות למטה */
  .rotate-ask{display:none !important}
  html,body{height:auto;overflow:auto}
  .stage{flex-direction:column;height:auto}
  .main{display:contents}
  .top-nav{position:static;order:0;opacity:1;animation:none;padding:14px 16px 4px;font-size:9px;letter-spacing:.2em;flex-wrap:wrap;gap:8px}
  .top-nav .nav-items{gap:14px;flex-wrap:wrap}
  .brand{order:1;text-align:center;padding:14px 16px 0}
  .brand h1{font-size:30px;opacity:1;animation:none}
  .brand .en-name{font-size:9px;margin-top:5px;letter-spacing:.35em}
  .brand.faded{opacity:1;pointer-events:auto}
  .tagline{margin:7px 0 0;font-size:13px;opacity:1;animation:none;line-height:1.5}
  .tagline .l2,.tagline .l3{display:none}
  .menu{order:2;position:static;width:100%;display:flex;flex-direction:row;align-items:center;gap:8px;overflow-x:auto;padding:14px 16px 4px;opacity:1;animation:none;scrollbar-width:none}
  .menu::-webkit-scrollbar{display:none}
  .menu-body{margin:0;flex:0 0 auto}
  .menu-body-head{border:1px solid var(--bone-faint);padding:6px 14px;font-size:12px;white-space:nowrap;color:var(--bone-dim);transition:all .3s}
  .menu-body-head:hover{padding-inline-start:14px}
  .menu-body.open .menu-body-head{color:var(--black-deep);background:var(--bone);border-color:var(--bone)}
  .menu-works,.menu-sep,.menu-extra{display:none}
  .preview{order:3;position:static;inset:auto;display:none;opacity:1;pointer-events:auto;padding:12px 16px 4px;overflow:visible}
  .preview.active{display:block}
  .pv-close{display:none}
  .pv-top{margin-bottom:10px}
  .pv-head{font-size:14px}
  .pv-grid{grid-template-columns:repeat(2,1fr);gap:16px 10px;padding:0}
  .pv-name{font-size:12px;margin-top:6px}
  .pv-name i{font-size:9px}
  .pv-meta{font-size:8px}
  .pv-desc{display:none}
  .pv-wall{font-size:12.5px;line-height:1.8;margin:0 0 14px;text-align:start}
  .exh-stack{order:4;position:static;margin:24px 16px 28px;padding-top:16px;border-top:1px solid rgba(232,228,221,.18);opacity:1;animation:none}
}
</style>
</head>
<body>
<nav class="top-nav">
  <div class="nav-items">
    <a href="#" class="active" data-menu-focus><span data-b="he">עבודות</span><span data-b="ar" hidden>أعمال</span><span data-b="en" hidden>WORKS</span></a>
    <a href="about.html"><span data-b="he">אודות</span><span data-b="ar" hidden>نبذة</span><span data-b="en" hidden>ABOUT</span></a>
    <a href="exhibitions.html"><span data-b="he">תערוכות</span><span data-b="ar" hidden>معارض</span><span data-b="en" hidden>EXHIBITIONS</span></a>
    <a href="journal.html"><span data-b="he">יומן</span><span data-b="ar" hidden>يوميات</span><span data-b="en" hidden>JOURNAL</span></a>
    <a href="contact.html"><span data-b="he">פנייה</span><span data-b="ar" hidden>تواصل</span><span data-b="en" hidden>CONTACT</span></a>
  </div>
  <div class="lang-row">
    <button data-lang="he" class="active">עברית</button>
    <button data-lang="ar">العربية</button>
    <button data-lang="en">EN</button>
  </div>
</nav>

${CONFIG.clarityId ? `<div id="ckb" style="display:none;position:fixed;bottom:18px;right:18px;z-index:400;max-width:340px;background:var(--black-deep);border:1px solid var(--bone-faint);padding:16px 20px;font-size:12px;line-height:1.7;color:var(--bone-dim)">האתר משתמש ב-cookies לניתוח אנונימי של חוויית הצפייה. לא נאסף מידע מזהה.<div style="margin-top:10px;display:flex;gap:10px"><button onclick="ckOk()" style="font-family:var(--mono);font-size:10px;letter-spacing:.15em;background:var(--bone);color:var(--black-deep);border:none;padding:7px 14px;cursor:pointer">הבנתי</button><button onclick="ckNo()" style="font-family:var(--mono);font-size:10px;letter-spacing:.15em;background:none;color:var(--bone-dim);border:1px solid var(--bone-faint);padding:7px 14px;cursor:pointer">דחה</button></div></div>
<script>function ckOk(){try{localStorage.setItem('cookieChoice','accepted')}catch(e){};document.getElementById('ckb').style.display='none'}
function ckNo(){try{localStorage.setItem('cookieChoice','declined')}catch(e){};document.getElementById('ckb').style.display='none';if(window.clarity)clarity('consent',false)}
try{if(!localStorage.getItem('cookieChoice'))setTimeout(function(){document.getElementById('ckb').style.display='block'},2000)}catch(e){}</script>` : ""}
<div class="gate" id="gate">
  <div class="gate-rows">
    <div class="gate-exh exh-line" data-start="2026-07-09" data-end="2026-08-13">
      <span data-b="he">"מרחבים זמניים" · פנוכו, תל אביב</span><span data-b="ar" hidden>"فضاءات مؤقتة" · تل أبيب</span><span data-b="en" hidden>"Temporary Spaces" · Panuko, Tel Aviv</span>
      <span class="exh-count"></span>
    </div>
    <a class="gate-row" href="${CONFIG.instagram}" target="_blank" rel="noopener"><span data-b="he">אינסטגרם</span><span data-b="ar" hidden>إنستغرام</span><span data-b="en" hidden>Instagram</span><span class="g-mark">↗</span></a>
    <a class="gate-row" href="https://wa.me/13477888007?text=${encodeURIComponent("היי שחף,\nראיתי את עצים מעוקמים בתערוכת הגמר של בצלאל,")}" target="_blank" rel="noopener"><span data-b="he">ווטסאפ</span><span data-b="ar" hidden>واتساب</span><span data-b="en" hidden>WhatsApp</span><span class="g-mark">↗</span></a>
    <a class="gate-row" href="mailto:${CONFIG.email}?subject=${encodeURIComponent("פנייה")}&body=${encodeURIComponent("היי שחף,\nראיתי את עצים מעוקמים בתערוכת הגמר של בצלאל,\n\n")}"><span data-b="he">פנייה</span><span data-b="ar" hidden>تواصل</span><span data-b="en" hidden>Contact</span><span class="g-mark">←</span></a>
    <a class="gate-row" href="mailto:${CONFIG.email}?subject=${encodeURIComponent("אני רוצה הזמנה לפתיחה של התערוכות הבאות")}&body=${encodeURIComponent("היי שחף,\nראיתי את עצים מעוקמים בתערוכת הגמר של בצלאל,\nאשמח לשמוע על תערוכות נוספות\n")}"><span data-b="he">הזמנה לפתיחות</span><span data-b="ar" hidden>دعوة للافتتاحات</span><span data-b="en" hidden>Opening invitations</span><span class="g-mark">⊕</span></a>
    <button class="gate-row" id="gateShare" type="button"><span data-b="he">שתף</span><span data-b="ar" hidden>مشاركة</span><span data-b="en" hidden>Share</span><span class="g-mark">⤴</span></button>
    <button class="gate-enter" id="gateEnter"><span data-b="he">כניסה לאתר ←</span><span data-b="ar" hidden>دخول الموقع ←</span><span data-b="en" hidden>Enter site →</span></button>
  </div>
</div>
<div class="stage">
  <main class="main">
    <div class="brand">
      <h1><span data-b="he">שחף גליל</span><span data-b="ar" hidden>شهاف چليل</span><span data-b="en" hidden>Shahaf Galil</span><span class="en-name">Shahaf Galil</span></h1>
      <p class="tagline">
        <span data-b="he">אני בונה עולמות.</span><span data-b="ar" hidden>أبني عوالم.</span><span data-b="en" hidden>I build worlds.</span>
        <span class="l2">أبني عوالم.</span>
        <span class="l3">I build worlds.</span>
      </p>
    </div>
    ${exh}
    ${bodyPageList().map(b => `
    <div class="preview" data-preview="${b.key}">
      <div class="pv-top"><span class="pv-head">${esc(b.title.he)}</span><a class="pv-link" href="body-${b.key}.html">דף פרוייקט ←</a><button class="pv-close" aria-label="סגור">✕</button></div>
      ${(PV.wall[b.key] || b.wall) ? `<div class="pv-wall">${esc((PV.wall[b.key] || b.wall).replace(/\s*\n+\s*/g, " "))}</div>` : ""}
      <div class="pv-grid">
        ${b.works.map(w => `<a class="pv-tile" data-wk="${w.key}" href="works/${w.key}.html">
          <span class="pv-img"><img src="${heroAsset(w)}" alt="${esc(w.title.he)}" loading="lazy"></span>
          <span class="pv-name">${esc(w.title.he)}${w.title.en ? ` <i>${esc(w.title.en)}</i>` : ""}</span>
          <span class="pv-meta">${esc(w.dimensions || "")}${w.medium ? " · " + esc(w.medium) : ""}</span>
          <span class="pv-desc">${esc(PV.scene[w.key] || (w.summary && w.summary.he) || "")}</span>
        </a>`).join("")}
      </div>
    </div>`).join("")}
  </main>

  <aside class="menu" id="works">
    ${menuHtml}
    <div class="menu-sep"></div>
    <div class="menu-extra">
      <a href="statement.html"><span data-b="he">הצהרת אמן</span><span data-b="ar" hidden>بيان الفنان</span><span data-b="en" hidden>Artist Statement</span></a>
      <a href="${CONFIG.instagram}" target="_blank" rel="noopener">Instagram ↗</a>
    </div>
  </aside>
</div>

<script>
document.querySelectorAll('.menu-body-head').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = btn.closest('.menu-body');
    var wasOpen = item.classList.contains('open');
    document.querySelectorAll('.menu-body.open').forEach(function (o) { o.classList.remove('open'); });
    if (!wasOpen) {
      item.classList.add('open');
      if (window.gtag) gtag('event', 'body_open', { body: item.dataset.body });
      if (window.clarity) clarity('set', 'body_open', item.dataset.body);
    }
  });
});
var mf = document.querySelector('[data-menu-focus]');
if (mf) mf.addEventListener('click', function (e) {
  e.preventDefault();
  var first = document.querySelector('.menu-body');
  if (first && !document.querySelector('.menu-body.open')) first.querySelector('.menu-body-head').click();
  document.getElementById('works').scrollIntoView({ behavior: 'smooth' });
});
// תצוגה מקדימה: ריחוף על גוף מחליף את שחף גליל בגריד העבודות
(function () {
  var brand = document.querySelector('.brand');
  var current = null;
  function show(key) {
    document.querySelectorAll('.preview').forEach(function (p) {
      var on = p.dataset.preview === key;
      p.classList.toggle('active', on);
      if (on && key !== current) p.scrollTop = 0;
    });
    if (brand) brand.classList.toggle('faded', !!key);
    current = key;
  }
  // ריחוף על שם גוף פותח את תת-התפריט שלו ומציג את דף העבודות;
  // לחיצה עדיין עובדת, וסגירה מחזירה את שחף גליל
  document.querySelectorAll('.menu-body').forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      if (!item.classList.contains('open')) {
        document.querySelectorAll('.menu-body.open').forEach(function (o) { o.classList.remove('open'); });
        item.classList.add('open');
      }
      show(item.dataset.body);
    });
  });
  document.querySelectorAll('.menu-body-head').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.menu-body');
      show(item.classList.contains('open') ? item.dataset.body : null);
    });
  });
  // התצוגה נשארת גם אחרי עזיבת התפריט, כדי שאפשר יהיה להגיע לתמונות
  document.querySelectorAll('.pv-close').forEach(function (b) {
    b.addEventListener('click', function () { show(null); });
  });
  // מובייל אנכי: הגריד של עצים מעוקמים נפתח כברירת מחדל
  try {
    var mq = window.matchMedia('(max-width:860px) and (orientation:portrait)');
    var mobileDefault = function () {
      if (mq.matches && !document.querySelector('.preview.active')) {
        var f = document.querySelector('.menu-body[data-body="forged-trees"]');
        if (f) f.classList.add('open');
        show('forged-trees');
      }
    };
    mobileDefault();
    (mq.addEventListener || mq.addListener).call(mq, 'change', mobileDefault);
  } catch (e) {}
  // שער הכניסה: עולה בכל ביקור במובייל אנכי, ולא שוב באותו סשן
  try {
    var gate = document.getElementById('gate');
    var pmq = window.matchMedia('(max-width:860px) and (orientation:portrait)');
    if (gate && pmq.matches) gate.classList.add('on');
    var ge = document.getElementById('gateEnter');
    if (ge) ge.addEventListener('click', function () {
      gate.classList.remove('on');
      if (window.clarity) clarity('event', 'gate_enter');
    });
    // ניווט מוקשח: גם אם ההקשה על הקישור נבלעת, מנווטים ידנית
    if (gate) gate.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a.gate-row') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (a.target === '_blank' || href.indexOf('mailto:') === 0) return;
      e.preventDefault();
      window.location.href = href;
    });
    var gs = document.getElementById('gateShare');
    if (gs) gs.addEventListener('click', function () {
      var url = 'https://galil.art/';
      try { if (window.location.protocol.indexOf('http') === 0) url = window.location.href.split('#')[0]; } catch (e) {}
      var done = function () {
        var sp = gs.querySelector('[data-b]:not([hidden])') || gs.querySelector('[data-b="he"]');
        if (sp) { var t = sp.textContent; sp.textContent = 'הקישור הועתק ✓'; setTimeout(function () { sp.textContent = t; }, 2000); }
      };
      var copyFallback = function () {
        try {
          var ta = document.createElement('textarea');
          ta.value = msg + '\\n' + url; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); document.body.removeChild(ta); done();
        } catch (e) { window.prompt('העתק את הקישור:', url); }
      };
      var msg = 'מוזמנים לראות את עצים מעוקמים, פרוייקט של שחף גליל מתערוכת הגמר של בצלאל';
      if (navigator.share) { navigator.share({ title: 'שחף גליל · Shahaf Galil', text: msg, url: url }).catch(function () {}); }
      else if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(msg + '\\n' + url).then(done, copyFallback);
      else copyFallback();
      if (window.clarity) clarity('event', 'gate_share');
    });
  } catch (e) {}
  document.querySelectorAll('.menu-work[data-wk]').forEach(function (a) {
    a.addEventListener('mouseenter', function () {
      var p = document.querySelector('.preview.active'); if (!p) return;
      p.querySelectorAll('.pv-tile').forEach(function (t) {
        var on = t.dataset.wk === a.dataset.wk;
        t.classList.toggle('hl', on);
        if (on) t.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
    });
    a.addEventListener('mouseleave', function () {
      var p = document.querySelector('.preview.active'); if (!p) return;
      p.querySelectorAll('.pv-tile.hl').forEach(function (t) { t.classList.remove('hl'); });
    });
  });
})();
function setLang(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
  document.querySelectorAll('[data-b]').forEach(function (el) { el.hidden = el.getAttribute('data-b') !== lang; });
  document.querySelectorAll('.lang-row button').forEach(function (b) { b.classList.toggle('active', b.dataset.lang === lang); });
  try { localStorage.setItem('lang', lang); } catch (e) {}
}
document.querySelectorAll('.lang-row button').forEach(function (b) {
  b.addEventListener('click', function () { setLang(b.dataset.lang); });
});
try { var saved = localStorage.getItem('lang'); if (saved) setLang(saved); } catch (e) {}

// ספירת ימים חיה לתערוכות
(function () {
  var now = new Date(); now.setHours(0, 0, 0, 0);
  function days(iso) { return Math.round((new Date(iso + 'T00:00:00') - now) / 86400000); }
  document.querySelectorAll('.exh-line[data-start]').forEach(function (line) {
    var el = line.querySelector('.exh-count'); if (!el) return;
    var toOpen = days(line.dataset.start);
    var t = { he: '', ar: '', en: '' };
    if (toOpen > 0) {
      t.he = toOpen === 1 ? 'נפתחת מחר' : 'נפתחת בעוד ' + toOpen + ' ימים';
      t.ar = toOpen === 1 ? 'يفتتح غداً' : 'يفتتح بعد ' + toOpen + ' أيام';
      t.en = toOpen === 1 ? 'Opens tomorrow' : 'Opens in ' + toOpen + ' days';
    } else if (line.dataset.end) {
      var left = days(line.dataset.end);
      if (left > 1) { t.he = 'פתוחה עכשיו · נותרו ' + left + ' ימים'; t.ar = 'مفتوح الآن · بقي ' + left + ' أيام'; t.en = 'Open now · ' + left + ' days left'; }
      else if (left === 1) { t.he = 'יום אחרון מחר'; t.ar = 'اليوم الأخير غداً'; t.en = 'Last day tomorrow'; }
      else if (left === 0) { t.he = 'היום האחרון'; t.ar = 'اليوم الأخير'; t.en = 'Last day today'; }
      else { t.he = 'ננעלה'; t.ar = 'أُغلق'; t.en = 'Closed'; }
    } else if (toOpen === 0) { t.he = 'נפתחת היום'; t.ar = 'يفتتح اليوم'; t.en = 'Opens today'; }
    else { t.he = 'פתוחה'; t.ar = 'مفتوح'; t.en = 'Open'; }
    el.innerHTML = '<span data-b="he">' + t.he + '</span><span data-b="ar" hidden>' + t.ar + '</span><span data-b="en" hidden>' + t.en + '</span>';
    var lang = document.documentElement.getAttribute('lang') || 'he';
    el.querySelectorAll('[data-b]').forEach(function (s) { s.hidden = s.getAttribute('data-b') !== lang; });
  });
})();
</script>
</body>
</html>`;
}

// ---------- run ----------
const out = (rel, content) => {
  const f = path.join(__dirname, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
  console.log("✓", rel);
};

for (const w of WORKS) out(`works/${w.key}.html`, buildWorkPage(w));
for (const b of bodyPageList()) out(`body-${b.key}.html`, buildBodyPage(b));
out("index.html", buildHome());
console.log(`\nDone: ${WORKS.length} pages from the real live template + single-screen home.`);
