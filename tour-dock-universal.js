(function () {
  "use strict";

  // Prevent duplicate execution
  if (window.__MPM_TOUR_DOCK_UNIVERSAL_V2__) return;
  window.__MPM_TOUR_DOCK_UNIVERSAL_V2__ = true;

  // Normalize hostname
  var host = String(window.location.hostname || "").replace(/^www\./, "").toLowerCase();

  // Hostname -> Agent Booking URL mapping
  var MAP = {
    "ascotarms.prospectportal.com": "https://www.myshowing.com/Midwest_Property_Management/Ascot_Arms_(Empire_Park)/scheduletourwidget/a0F0H00000d3i9sUAA",
    "cambriancourt.prospectportal.com": "https://www.myshowing.com/Midwest_Property_Management/Cambrian_Court_(Cambrian_Heights)/scheduletourwidget/a0F0H00000d3i9vUAA/",
    "cricketcourt.prospectportal.com": "https://www.myshowing.com/Midwest_Property_Management/Cricket_Court_Townhomes_(Aldergrove)/scheduletourwidget/a0F0H00000d3iA1UAI/",
    "elmwoodtownhomes.prospectportal.com": "https://www.myshowing.com/Midwest_Property_Management/Elmwood_Townhomes_(Elmwood)/scheduletourwidget/a0F0H00000d3iA5UAI/",
    "empirepark.prospectportal.com": "https://www.myshowing.com/Midwest_Property_Management/Empire_Park_(Empire_Park)/scheduletourwidget/a0F0H00000d3iA6UAI/",
    "pleasantviewtownhomes.prospectportal.com": "https://www.myshowing.com/Midwest_Property_Management/Pleasantview_Townhomes_(Empire_Park)/scheduletourwidget/a0F0H00000d3iAIUAY",
    "rivervalleytownhomes.prospectportal.com": "https://www.myshowing.com/Midwest_Property_Management/Rivervalley_Townhomes_(Gold_Bar)/scheduletourwidget/a0F0H00000d3iAKUAY/",
    "sirjohnfranklin.prospectportal.com": "https://www.myshowing.com/Midwest_Property_Management/Sir_John_Franklin_(Old_Strathcona)/scheduletourwidget/a0F0H00000d3iAMUAY",
    "thevillageatsouthgate.prospectportal.com": "https://www.myshowing.com/Midwest_Property_Management/The_Village_at_Southgate_(Southgate)/scheduletourwidget/a0F0H00000d3iAPUAY/"
  };

  var targetUrl = MAP[host];
  if (!targetUrl) return;

  // Suppress on contact or application pages to avoid competing with native conversion forms
  var path = window.location.pathname.toLowerCase();
  if (path.indexOf("contact") !== -1 || path.indexOf("apply") !== -1) return;

  // Dynamic context-based CTA label
  var ctaText = "Schedule a Tour";
  if (path.indexOf("floorplan") !== -1 || path.indexOf("apartment") !== -1) {
    ctaText = "Tour This Layout";
  }

  // Preserve UTM marketing parameters into destination URL
  if (window.location.search) {
    var sep = targetUrl.indexOf("?") !== -1 ? "&" : "?";
    targetUrl += sep + window.location.search.replace(/^\?/, "");
  }

  function injectStyles() {
    if (document.getElementById("mpm-tour-dock-styles")) return;

    var css =
      ":root {" +
      "  --mpm-blue: #093457;" +
      "  --mpm-blue-hover: #06233b;" +
      "  --mpm-gold: #eaaa00;" +
      "}" +
      "#mpm-tour-dock {" +
      "  position: fixed;" +
      "  right: 24px;" +
      "  bottom: 24px;" +
      "  z-index: 2147483640;" +
      "  opacity: 0;" +
      "  transform: translateY(20px);" +
      "  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);" +
      "  pointer-events: none;" +
      "}" +
      "#mpm-tour-dock.is-visible {" +
      "  opacity: 1;" +
      "  transform: translateY(0);" +
      "  pointer-events: auto;" +
      "}" +
      "#mpm-tour-dock .mpm-btn {" +
      "  display: inline-flex;" +
      "  align-items: center;" +
      "  gap: 8px;" +
      "  height: 46px;" +
      "  padding: 0 18px 0 14px;" +
      "  border-radius: 999px;" +
      "  background: var(--mpm-blue);" +
      "  color: #ffffff;" +
      "  text-decoration: none;" +
      "  font: 700 13px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;" +
      "  letter-spacing: 0.2px;" +
      "  box-shadow: 0 4px 14px rgba(9, 52, 87, 0.28);" +
      "  border: 1px solid rgba(255, 255, 255, 0.2);" +
      "  cursor: pointer;" +
      "  user-select: none;" +
      "  -webkit-tap-highlight-color: transparent;" +
      "  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease;" +
      "}" +
      "#mpm-tour-dock .mpm-btn:hover {" +
      "  background: var(--mpm-blue-hover);" +
      "  transform: translateY(-2px);" +
      "  box-shadow: 0 6px 20px rgba(9, 52, 87, 0.38);" +
      "}" +
      "#mpm-tour-dock .mpm-btn:active {" +
      "  transform: translateY(0);" +
      "}" +
      "#mpm-tour-dock .mpm-btn:focus-visible {" +
      "  outline: 3px solid var(--mpm-gold);" +
      "  outline-offset: 3px;" +
      "}" +
      "#mpm-tour-dock .mpm-ico {" +
      "  width: 18px;" +
      "  height: 18px;" +
      "  stroke: #ffffff;" +
      "  fill: none;" +
      "  stroke-width: 2;" +
      "  stroke-linecap: round;" +
      "  stroke-linejoin: round;" +
      "  flex-shrink: 0;" +
      "}" +
      "@media (max-width: 600px) {" +
      "  #mpm-tour-dock {" +
      "    right: 16px;" +
      "    bottom: calc(16px + env(safe-area-inset-bottom, 0px));" +
      "  }" +
      "  #mpm-tour-dock.is-collapsed .mpm-label {" +
      "    display: none;" +
      "  }" +
      "  #mpm-tour-dock.is-collapsed .mpm-btn {" +
      "    padding: 0;" +
      "    width: 44px;" +
      "    height: 44px;" +
      "    justify-content: center;" +
      "  }" +
      "}";

    var style = document.createElement("style");
    style.id = "mpm-tour-dock-styles";
    style.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(style);
  }

  function trackEvent() {
    // 1. GA4 gtag direct beacon
    if (typeof window.gtag === "function") {
      window.gtag("event", "schedule_tour_click", {
        event_category: "Engagement",
        event_label: host,
        transport_type: "beacon"
      });
    }

    // 2. Google Tag Manager dataLayer push
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "schedule_tour_click",
        property_hostname: host,
        destination_url: targetUrl
      });
    }
  }

  function renderDock() {
    if (document.getElementById("mpm-tour-dock")) return;

    var dock = document.createElement("div");
    dock.id = "mpm-tour-dock";
    dock.setAttribute("aria-label", "Tour scheduling");

    var anchor = document.createElement("a");
    anchor.className = "mpm-btn";
    anchor.href = targetUrl;
    anchor.target = "_blank";
    anchor.rel = "noopener";
    anchor.setAttribute("aria-label", ctaText);

    anchor.innerHTML =
      '<svg class="mpm-ico" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M8 2v3M16 2v3"></path>' +
        '<path d="M3 8h18"></path>' +
        '<path d="M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path>' +
        '<path d="M8 12h4"></path>' +
        '<path d="M8 16h4"></path>' +
      '</svg>' +
      '<span class="mpm-label">' + ctaText + '</span>';

    anchor.addEventListener("click", trackEvent);
    dock.appendChild(anchor);
    document.body.appendChild(dock);

    // Scroll depth reveal (>250px) and mobile scroll collapse
    var lastScroll = 0;
    window.addEventListener(
      "scroll",
      function () {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 250) {
          dock.classList.add("is-visible");
        } else {
          dock.classList.remove("is-visible");
        }

        if (currentScroll > lastScroll && currentScroll > 400) {
          dock.classList.add("is-collapsed");
        } else {
          dock.classList.remove("is-collapsed");
        }
        lastScroll = Math.max(0, currentScroll);
      },
      { passive: true }
    );
  }

  function whenBodyReady(cb) {
    if (document.body) return cb();
    var attempts = 0;
    var timer = setInterval(function () {
      if (document.body || attempts++ > 80) {
        clearInterval(timer);
        if (document.body) cb();
      }
    }, 50);
  }

  whenBodyReady(function () {
    injectStyles();
    renderDock();
    window.__MPM_TOUR_DOCK_VERSION__ = "universal-gh-v2-dynamic";
  });
})();
