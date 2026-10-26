(function () {
  "use strict";

  try {
    if (window.__MPM_TOUR_DOCK_UNIVERSAL_V4__) return;
    window.__MPM_TOUR_DOCK_UNIVERSAL_V4__ = true;

    var host = String(window.location.hostname || "").replace(/^www\./, "").toLowerCase();
    var href = window.location.href.toLowerCase();

    // Flexible Hostname or URL Keyword Mapping
    var targetUrl = "";

    if (href.indexOf("ascotarms") !== -1) {
      targetUrl = "https://www.myshowing.com/Midwest_Property_Management/Ascot_Arms_(Empire_Park)/scheduletourwidget/a0F0H00000d3i9sUAA";
    } else if (href.indexOf("cambriancourt") !== -1) {
      targetUrl = "https://www.myshowing.com/Midwest_Property_Management/Cambrian_Court_(Cambrian_Heights)/scheduletourwidget/a0F0H00000d3i9vUAA/";
    } else if (href.indexOf("cricketcourt") !== -1) {
      targetUrl = "https://www.myshowing.com/Midwest_Property_Management/Cricket_Court_Townhomes_(Aldergrove)/scheduletourwidget/a0F0H00000d3iA1UAI/";
    } else if (href.indexOf("elmwoodtownhomes") !== -1) {
      targetUrl = "https://www.myshowing.com/Midwest_Property_Management/Elmwood_Townhomes_(Elmwood)/scheduletourwidget/a0F0H00000d3iA5UAI/";
    } else if (href.indexOf("empirepark") !== -1) {
      targetUrl = "https://www.myshowing.com/Midwest_Property_Management/Empire_Park_(Empire_Park)/scheduletourwidget/a0F0H00000d3iA6UAI/";
    } else if (href.indexOf("pleasantviewtownhomes") !== -1) {
      targetUrl = "https://www.myshowing.com/Midwest_Property_Management/Pleasantview_Townhomes_(Empire_Park)/scheduletourwidget/a0F0H00000d3iAIUAY";
    } else if (href.indexOf("rivervalleytownhomes") !== -1) {
      targetUrl = "https://www.myshowing.com/Midwest_Property_Management/Rivervalley_Townhomes_(Gold_Bar)/scheduletourwidget/a0F0H00000d3iAKUAY/";
    } else if (href.indexOf("sirjohnfranklin") !== -1) {
      targetUrl = "https://www.myshowing.com/Midwest_Property_Management/Sir_John_Franklin_(Old_Strathcona)/scheduletourwidget/a0F0H00000d3iAMUAY";
    } else if (href.indexOf("southgate") !== -1) {
      targetUrl = "https://www.myshowing.com/Midwest_Property_Management/The_Village_at_Southgate_(Southgate)/scheduletourwidget/a0F0H00000d3iAPUAY/";
    }

    if (!targetUrl) return;

    var path = String(window.location.pathname || "").toLowerCase();
    if (path.indexOf("contact") !== -1 || path.indexOf("apply") !== -1) return;

    var ctaText = "Schedule a Tour";
    if (path.indexOf("floorplan") !== -1 || path.indexOf("apartment") !== -1) {
      ctaText = "Tour This Layout";
    }

    if (window.location.search) {
      var sep = targetUrl.indexOf("?") !== -1 ? "&" : "?";
      targetUrl += sep + window.location.search.replace(/^\?/, "");
    }

    function injectStyles() {
      if (document.getElementById("mpm-tour-dock-styles")) return;

      var css =
        ":root { --mpm-blue: #093457; --mpm-blue-hover: #06233b; --mpm-gold: #eaaa00; }" +
        "#mpm-tour-dock { position: fixed; right: 24px; bottom: 125px; z-index: 2147483640; opacity: 0; transform: translateY(20px); transition: opacity 0.25s ease, transform 0.25s ease; pointer-events: none; }" +
        "#mpm-tour-dock.is-visible { opacity: 1; transform: translateY(0); pointer-events: auto; }" +
        "#mpm-tour-dock.chat-open { opacity: 0 !important; pointer-events: none !important; }" +
        "#mpm-tour-dock .mpm-btn { display: inline-flex; align-items: center; gap: 8px; height: 46px; padding: 0 18px 0 14px; border-radius: 999px; background: var(--mpm-blue); color: #fff; text-decoration: none; font: 700 13px/1 system-ui, -apple-system, sans-serif; box-shadow: 0 4px 14px rgba(9,52,87,0.28); border: 1px solid rgba(255,255,255,0.2); cursor: pointer; user-select: none; }" +
        "#mpm-tour-dock .mpm-btn:hover { background: var(--mpm-blue-hover); transform: translateY(-2px); }" +
        "#mpm-tour-dock .mpm-ico { width: 18px; height: 18px; stroke: #fff; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }" +
        "@media (max-width: 600px) {" +
        "  #mpm-tour-dock { right: 16px; bottom: calc(85px + env(safe-area-inset-bottom, 0px)); z-index: 999; }" +
        "  #mpm-tour-dock.is-collapsed .mpm-label { display: none; }" +
        "  #mpm-tour-dock.is-collapsed .mpm-btn { padding: 0; width: 44px; height: 44px; justify-content: center; }" +
        "}";

      var style = document.createElement("style");
      style.id = "mpm-tour-dock-styles";
      style.textContent = css;
      (document.head || document.documentElement).appendChild(style);
    }

    function renderDock() {
      if (document.getElementById("mpm-tour-dock")) return;

      var dock = document.createElement("div");
      dock.id = "mpm-tour-dock";

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

      anchor.addEventListener("click", function () {
        if (typeof window.gtag === "function") {
          window.gtag("event", "schedule_tour_click", { event_category: "Engagement", event_label: host, transport_type: "beacon" });
        }
        if (window.dataLayer && Array.isArray(window.dataLayer)) {
          window.dataLayer.push({ event: "schedule_tour_click", property_hostname: host, destination_url: targetUrl });
        }
      });

      dock.appendChild(anchor);
      document.body.appendChild(dock);

      var lastScroll = 0;
      window.addEventListener("scroll", function () {
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
      }, { passive: true });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        injectStyles();
        renderDock();
      });
    } else {
      injectStyles();
      renderDock();
    }
  } catch (err) {
    console.error("[Tour Dock Error]:", err);
  }
})();
