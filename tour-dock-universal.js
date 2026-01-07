(function () {
  "use strict";

  // Avoid duplicates
  if (window.__MPM_TOUR_DOCK_UNIVERSAL_GH_V1__) return;
  window.__MPM_TOUR_DOCK_UNIVERSAL_GH_V1__ = true;

  // Normalize hostname
  var host = String(window.location.hostname || "").replace(/^www\./, "").toLowerCase();
  if (!/\.prospectportal\.com$/.test(host)) return;

  // Map hostname -> links
  var MAP = {
    "ascotarms.prospectportal.com": {
      selfUrl: "https://prop.peek.us/659c209ccdaa2af31fe90c5e/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Ascot_Arms_(Empire_Park)/scheduletourwidget/a0F0H00000d3i9sUAA"
    },
    "cambriancourt.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66aaaa33f7d05462a7f4be8e/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Cambrian_Court_(Cambrian_Heights)/scheduletourwidget/a0F0H00000d3i9vUAA/"
    },
    "cricketcourt.prospectportal.com": {
      selfUrl: "https://prop.peek.us/668c76b1edee275669b4508d/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Cricket_Court_Townhomes_(Aldergrove)/scheduletourwidget/a0F0H00000d3iA1UAI/"
    },
    "elmwoodtownhomes.prospectportal.com": {
      selfUrl: "https://prop.peek.us/668c766ffa52e0189568d9a9/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Elmwood_Townhomes_(Elmwood)/scheduletourwidget/a0F0H00000d3iA5UAI/"
    },
    "empirepark.prospectportal.com": {
      selfUrl: "https://prop.peek.us/659c20d06dc4272dc1c6fe18/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Empire_Park_(Empire_Park)/scheduletourwidget/a0F0H00000d3iA6UAI/"
    },
    "pleasantviewtownhomes.prospectportal.com": {
      selfUrl: "https://prop.peek.us/668c75b7bbe11732e731384f/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Pleasantview_Townhomes_(Empire_Park)/scheduletourwidget/a0F0H00000d3iAIUAY"
    },
    "rivervalleytownhomes.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66350d825cb18b6935f276b2/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Rivervalley_Townhomes_(Gold_Bar)/scheduletourwidget/a0F0H00000d3iAKUAY/"
    },
    "sirjohnfranklin.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66350e28f4dbddfd2b19646a/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/Sir_John_Franklin_(Old_Strathcona)/scheduletourwidget/a0F0H00000d3iAMUAY"
    },
    "thevillageatsouthgate.prospectportal.com": {
      selfUrl: "https://prop.peek.us/66350d32f4dbddfd2b1863d7/self-guided-tour/",
      agentUrl: "https://www.myshowing.com/Midwest_Property_Management/The_Village_at_Southgate_(Southgate)/scheduletourwidget/a0F0H00000d3iAPUAY/"
    }
  };

  var cfg = MAP[host];
  if (!cfg || !cfg.selfUrl || !cfg.agentUrl) return;

  function whenBodyReady(cb) {
    var i = 0;
    (function t() {
      if (document.body) return cb();
      if (i++ < 80) return setTimeout(t, 50);
    })();
  }

  function injectStyles() {
    if (document.getElementById("mpm-tour-dock-styles")) return;

    var css =
      ":root{--mpm-btn:48px;--mpm-right:85px;--mpm-bottom:25px;--mpm-blue:#093457;--mpm-pill-bg:rgba(255,255,255,.96);--mpm-pill-border:rgba(9,52,87,.18);--mpm-tip-bg:#093457;--mpm-tip-text:#fff;}" +
      "#mpm-tour-dock{position:fixed;right:var(--mpm-right);bottom:var(--mpm-bottom);z-index:2147483647;pointer-events:none;}" +
      "#mpm-tour-dock .mpm-pill{pointer-events:auto;background:var(--mpm-pill-bg);border:1px solid var(--mpm-pill-border);border-radius:999px;padding:10px;display:inline-flex;align-items:center;gap:12px;box-shadow:none!important;}" +
      "#mpm-tour-dock .mpm-btn{width:var(--mpm-btn);height:var(--mpm-btn);border-radius:999px;background:var(--mpm-blue);display:inline-flex;align-items:center;justify-content:center;text-decoration:none;position:relative;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;box-shadow:none!important;border:1px solid rgba(255,255,255,.14);}" +
      "#mpm-tour-dock .mpm-ico{width:52%;height:52%;stroke:#fff;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}" +
      "#mpm-tour-dock .mpm-btn:after{content:attr(data-label);position:absolute;right:calc(100% + 12px);top:50%;transform:translateY(-50%);opacity:0;background:var(--mpm-tip-bg);color:var(--mpm-tip-text);padding:8px 10px;border-radius:999px;font:700 12px/1 system-ui,-apple-system,Segoe UI,Roboto,Arial;white-space:nowrap;pointer-events:none;transition:opacity .14s ease;}" +
      "#mpm-tour-dock .mpm-btn:hover:after,#mpm-tour-dock .mpm-btn:focus-visible:after{opacity:1;}" +
      "#mpm-tour-dock .mpm-btn:focus{outline:none;}" +
      "#mpm-tour-dock .mpm-btn:focus-visible{outline:3px solid rgba(234,170,0,.55);outline-offset:3px;}";

    var style = document.createElement("style");
    style.id = "mpm-tour-dock-styles";
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(style);
  }

  function renderDock() {
    if (document.getElementById("mpm-tour-dock")) return;

    var wrap = document.createElement("div");
    wrap.id = "mpm-tour-dock";
    wrap.setAttribute("aria-label", "Tour options");

    wrap.innerHTML =
      '<div class="mpm-pill">' +
        '<a class="mpm-btn" data-label="Schedule a Tour" href="' + cfg.agentUrl + '" target="_blank" rel="noopener" aria-label="Schedule a Tour">' +
          '<svg class="mpm-ico" viewBox="0 0 24 24" aria-hidden="true">' +
            '<path d="M8 2v3M16 2v3"></path>' +
            '<path d="M3 8h18"></path>' +
            '<path d="M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path>' +
            '<path d="M8 12h4"></path>' +
            '<path d="M8 16h4"></path>' +
          '</svg>' +
        '</a>' +
        '<a class="mpm-btn" data-label="Self-Guided Tour" href="' + cfg.selfUrl + '" target="_blank" rel="noopener" aria-label="Self-Guided Tour">' +
          '<svg class="mpm-ico" viewBox="0 0 24 24" aria-hidden="true">' +
            '<rect x="5" y="11" width="14" height="10" rx="2"></rect>' +
            '<path d="M8 11V8a4 4 0 0 1 8 0v3"></path>' +
            '<circle cx="9" cy="16" r="1.5"></circle>' +
            '<path d="M10.5 16h5"></path>' +
            '<path d="M14.5 16v2"></path>' +
          '</svg>' +
        '</a>' +
      "</div>";

    document.body.appendChild(wrap);
  }

  whenBodyReady(function () {
    injectStyles();
    renderDock();
    window.__MPM_TOUR_DOCK_VERSION__ = "universal-gh-v1";
  });
})();
