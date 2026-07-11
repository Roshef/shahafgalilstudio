// shared: cookie consent + section_view analytics
(function () {
  // ---- cookie consent (only when a banner exists = analytics configured)
  var banner = document.getElementById("cookieBanner");
  if (banner) {
    var choice = localStorage.getItem("cookie-choice");
    if (!choice) banner.classList.add("is-visible");
    if (choice === "yes" && window.clarity) window.clarity("consent");
    banner.addEventListener("click", function (e) {
      var v = e.target && e.target.getAttribute("data-cookie");
      if (!v) return;
      localStorage.setItem("cookie-choice", v);
      banner.classList.remove("is-visible");
      if (v === "yes" && window.clarity) window.clarity("consent");
    });
  }

  // ---- section_view events (named sections; fires once per section per visit)
  var seen = {};
  function report(name) {
    if (seen[name]) return;
    seen[name] = true;
    if (window.clarity) window.clarity("set", "section", name);
    if (window.gtag) window.gtag("event", "section_view", { section_name: name, page_path: location.pathname });
  }
  var sections = document.querySelectorAll("section[id], main.page-shell");
  if ("IntersectionObserver" in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && en.intersectionRatio >= 0.5) report(en.target.id || "page");
      });
    }, { threshold: [0.5] });
    sections.forEach(function (s) { io.observe(s); });
  }
})();
