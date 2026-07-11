// timed trilingual statement (word-by-word reading)
(function () {
  var ROWS = window.STATEMENT_ROWS || [];
  var stage = document.getElementById("stage");
  var counter = document.getElementById("counter");
  var playBtn = document.getElementById("playBtn");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var rowIndex = 0, runToken = 0, playing = false;

  function words(text) {
    return String(text || "").trim().split(/\s+/).filter(Boolean)
      .map(function (w) { return '<span class="statement-word">' + w + "</span>"; }).join(" ");
  }
  function renderRow(i) {
    var r = ROWS[i];
    var html = '<div class="statement-block">';
    html += '<div class="statement-line he">' + words(r.he) + "</div>";
    if (r.ar) html += '<div class="statement-line ar">' + words(r.ar) + "</div>";
    if (r.en) html += '<div class="statement-line en">' + words(r.en) + "</div>";
    html += "</div>";
    stage.innerHTML = html;
    counter.textContent = (i + 1) + " / " + ROWS.length;
    requestAnimationFrame(function () { stage.firstChild.classList.add("is-visible"); });
  }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  async function animate(token) {
    var lines = Array.prototype.slice.call(stage.querySelectorAll(".statement-line"));
    var max = Math.max.apply(null, lines.map(function (l) { return l.querySelectorAll(".statement-word").length; }));
    for (var i = 0; i < max; i++) {
      if (token !== runToken) return;
      lines.forEach(function (line) {
        var ws = line.querySelectorAll(".statement-word");
        ws.forEach(function (w, j) {
          w.classList.toggle("is-active", j === i);
          if (j < i) w.classList.add("is-read");
        });
      });
      await sleep(185);
    }
    lines.forEach(function (line) {
      line.querySelectorAll(".statement-word").forEach(function (w) {
        w.classList.remove("is-active"); w.classList.add("is-read");
      });
    });
  }
  async function playAll() {
    runToken++; var token = runToken; playing = true; playBtn.textContent = "Stop";
    for (var i = rowIndex; i < ROWS.length; i++) {
      if (token !== runToken) return;
      rowIndex = i; renderRow(i);
      await sleep(700); await animate(token); await sleep(950);
    }
    playing = false; playBtn.textContent = "Play";
  }
  function stop() { runToken++; playing = false; playBtn.textContent = "Play"; }
  function nav(d) { stop(); rowIndex = (rowIndex + d + ROWS.length) % ROWS.length; renderRow(rowIndex); }

  playBtn.addEventListener("click", function () { playing ? stop() : playAll(); });
  prevBtn.addEventListener("click", function () { nav(-1); });
  nextBtn.addEventListener("click", function () { nav(1); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") nav(1);
    if (e.key === "ArrowRight") nav(-1);
    if (e.key === "Escape") stop();
    if (e.key === " ") { e.preventDefault(); playing ? stop() : playAll(); }
  });
  renderRow(0);
})();
