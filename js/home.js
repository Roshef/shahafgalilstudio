// home: bodies accordion
(function () {
  document.querySelectorAll("[data-body-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".body-item");
      var open = item.classList.contains("is-open");
      document.querySelectorAll(".body-item.is-open").forEach(function (o) {
        o.classList.remove("is-open");
        o.querySelector("[data-body-toggle]").setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        if (window.gtag) window.gtag("event", "body_open", { body: item.id });
        if (window.clarity) window.clarity("set", "body_open", item.id);
      }
    });
  });
  // deep link: index.html#body-xxx opens that body
  if (location.hash && location.hash.indexOf("#body-") === 0) {
    var target = document.querySelector(location.hash);
    if (target) {
      target.classList.add("is-open");
      setTimeout(function () { target.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
    }
  }
})();
