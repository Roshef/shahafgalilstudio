// work page: hotspots, layers, sides, peppers categories, rail, share
(function () {
  var D = window.WORK_DATA || {};
  var NS = "http://www.w3.org/2000/svg";

  // ---------- hotspots ----------
  var layer = document.getElementById("hotspotLayer");
  var spots = D.hotspots || [];
  if (D.peppers && D.peppers.objectData && D.peppers.objectData.length) {
    spots = D.peppers.objectData.map(function (o) {
      return { id: o.id, x: o.x, y: o.y, name: o.name };
    });
  }
  function renderHotspots() {
    if (!layer) return;
    layer.replaceChildren();
    spots.forEach(function (h) {
      var g = document.createElementNS(NS, "g");
      g.setAttribute("class", "hs");
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      var name = (h.name && (h.name.he || h.name.en)) || h.id;
      g.setAttribute("aria-label", name);
      // y arrives as 0-100 of image height; viewBox is 100x75 (4:3)
      var y = h.y * 0.75;
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", h.x); c.setAttribute("cy", y); c.setAttribute("r", "0.55");
      var flip = h.x > 72; // keep labels inside frame
      var lx = flip ? h.x - 3.2 : h.x + 3.2;
      var ly = y - 3;
      var line = document.createElementNS(NS, "line");
      line.setAttribute("x1", h.x); line.setAttribute("y1", y);
      line.setAttribute("x2", flip ? h.x - 2.6 : h.x + 2.6); line.setAttribute("y2", ly + 0.8);
      var t = document.createElementNS(NS, "text");
      t.setAttribute("x", lx); t.setAttribute("y", ly);
      if (flip) t.setAttribute("text-anchor", "end");
      t.textContent = name;
      g.append(c, line, t);
      g.addEventListener("click", function () {
        if (window.clarity) window.clarity("set", "hotspot", D.key + ":" + h.id);
        if (window.gtag) window.gtag("event", "hotspot_click", { work: D.key, hotspot: h.id });
        g.querySelector("circle").setAttribute("r", "1.1");
        setTimeout(function () { g.querySelector("circle").setAttribute("r", "0.55"); }, 700);
      });
      layer.append(g);
    });
  }
  renderHotspots();

  // ---------- layers (standard + sides) ----------
  var list = document.getElementById("layerList");
  var copy = document.getElementById("layerCopy");
  var count = document.getElementById("layerCount");
  var side = "A";
  var idx = 0;

  function currentLayers() {
    if (D.layersA) return side === "A" ? D.layersA : D.layersB;
    return D.layers || [];
  }
  function layerLabel(text, i) {
    var m = String(text).match(/^(רובד [^:]+|מה שנשאר)/);
    return m ? m[1] : "רובד " + (i + 1);
  }
  function renderLayers() {
    if (!list || !copy) return;
    var L = currentLayers();
    if (!L.length) return;
    if (idx >= L.length) idx = 0;
    list.replaceChildren();
    L.forEach(function (l, i) {
      var b = document.createElement("button");
      b.className = "layer-btn" + (i === idx ? " is-active" : "");
      b.textContent = (i + 1) + ". " + layerLabel(l.he, i);
      b.addEventListener("click", function () {
        idx = i; renderLayers();
        if (window.gtag) window.gtag("event", "layer_view", { work: D.key, layer: i + 1 });
      });
      list.append(b);
    });
    copy.textContent = L[idx].he;
    if (count) count.textContent = (idx + 1) + " / " + L.length;
  }
  renderLayers();

  document.querySelectorAll("[data-side]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      side = btn.getAttribute("data-side");
      idx = 0;
      document.querySelectorAll("[data-side]").forEach(function (b) { b.classList.toggle("is-active", b === btn); });
      renderLayers();
    });
  });

  // ---------- peppers: 5-category reading ----------
  var catBody = document.getElementById("catBody");
  if (catBody && D.peppers) {
    var CC = D.peppers.categoryContent;
    function renderCat(cat) {
      var c = CC[cat] && CC[cat].he;
      if (!c) return;
      var html = '<div class="cat-intro">' + (c.intro || "") + "</div>";
      html += '<div class="cat-items">';
      (c.items || []).forEach(function (it) {
        html += '<article class="cat-item">' +
          (it.meta ? '<div class="meta">' + it.meta + "</div>" : "") +
          (it.title ? "<h4>" + it.title + "</h4>" : "") +
          "<p>" + (it.text || "") + "</p></article>";
      });
      html += "</div>";
      catBody.innerHTML = html;
      if (window.gtag) window.gtag("event", "category_view", { work: D.key, category: cat });
    }
    document.querySelectorAll("[data-cat]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("[data-cat]").forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        renderCat(btn.getAttribute("data-cat"));
      });
    });
    renderCat("layers");
  }

  // ---------- progress rail ----------
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-rail]"));
  var secs = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && secs.length) {
    var io = new IntersectionObserver(function (entries) {
      var vis = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
      if (!vis) return;
      links.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + vis.target.id);
      });
    }, { threshold: [0.25, 0.5, 0.75] });
    secs.forEach(function (s) { io.observe(s); });
  }

  // ---------- share ----------
  var shareBtn = document.getElementById("shareBtn");
  var copyBtn = document.getElementById("copyBtn");
  if (shareBtn) {
    if (navigator.share) {
      shareBtn.addEventListener("click", function () {
        navigator.share({ title: document.title, url: location.href }).catch(function () {});
      });
    } else { shareBtn.style.display = "none"; }
  }
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(location.href).then(function () {
        var orig = copyBtn.textContent;
        copyBtn.textContent = "✓";
        setTimeout(function () { copyBtn.textContent = orig; }, 1400);
      });
    });
  }
})();
