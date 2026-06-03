/* Quantum Multiscale — shared header/footer + interactions
   Uses root-relative paths (site served from apex domain quantum-multiscale.org). */
(function () {
  "use strict";

  var page = document.body.getAttribute("data-page") || "";
  var root = document.body.getAttribute("data-root") || "";

  var navItems = [
    { id: "home",     label: "Home",            href: root + "index.html" },
    { id: "team",     label: "Team",            href: root + "index.html#team" },
    { id: "software", label: "Software",        href: root + "index.html#software" },
    { id: "schools",  label: "Schools",         href: root + "schools/index.html" },
    { id: "hack",     label: "Hackathons",      href: root + "hackathons/index.html" }
  ];

  function navLinksHtml() {
    return navItems.map(function (n) {
      var active = n.id === page ? ' class="active"' : "";
      return '<li><a href="' + n.href + '"' + active + '>' + n.label + "</a></li>";
    }).join("");
  }

  // Q-MS brand mark: gradient "Q" ring with "MS" in the center (currentColor).
  function markSvg(variant) {
    var id = "qmsg-" + variant;
    return '<svg class="mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#3a72f6"/>' +
        '<stop offset="0.55" stop-color="#6a5cf2"/>' +
        '<stop offset="1" stop-color="#8b3df0"/>' +
      '</linearGradient></defs>' +
      '<circle cx="31" cy="30" r="20.5" fill="none" stroke="url(#' + id + ')" stroke-width="8.5"/>' +
      '<line x1="44.5" y1="43.5" x2="55" y2="54.5" stroke="url(#' + id + ')" stroke-width="8.5" stroke-linecap="round"/>' +
      '<text x="31" y="31.5" text-anchor="middle" dominant-baseline="central" ' +
        'font-family="\'Space Grotesk\', \'Inter\', system-ui, sans-serif" font-weight="700" ' +
        'font-size="17" letter-spacing="-0.5" fill="currentColor">MS</text>' +
    '</svg>';
  }

  var headerHtml =
    '<header class="site-header">' +
      '<div class="container nav">' +
        '<a class="brand" href="' + root + 'index.html" aria-label="Quantum Multiscale home">' +
          markSvg("header") +
          '<span class="brand-text"><b>Quantum Multiscale</b><span>NSF Center · Q-MS</span></span>' +
        '</a>' +
        '<button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false"><span></span></button>' +
        '<div class="nav-menu">' +
          '<ul class="nav-links">' + navLinksHtml() + '</ul>' +
          '<span class="nav-cta"><a class="btn btn-accent btn-sm" href="' + root + 'software/index.html">Explore software</a></span>' +
        '</div>' +
      '</div>' +
    '</header>';

  var year = new Date().getFullYear();

  var footerHtml =
    '<footer class="site-footer">' +
      '<div class="footer-top"><div class="container footer-grid">' +
        '<div class="footer-about">' +
          '<div class="footer-brand">' + markSvg("footer") + '<b>Quantum Multiscale</b></div>' +
          '<p>An NSF Center developing sustainable, first-principles multiscale modeling software grounded in quantum mechanics and data-driven approaches.</p>' +
        '</div>' +
        '<div>' +
          '<h4>Explore</h4>' +
          '<ul class="footer-links">' +
            '<li><a href="' + root + 'team.html">Team</a></li>' +
            '<li><a href="' + root + 'software/index.html">Software</a></li>' +
            '<li><a href="' + root + 'schools/index.html">Schools</a></li>' +
            '<li><a href="' + root + 'hackathons/index.html">Hackathons</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' +
          '<h4>Research groups</h4>' +
          '<ul class="footer-links">' +
            '<li><a href="http://www.materialab.org/" target="_blank" rel="noopener">MATERIALab · Boise State</a></li>' +
            '<li><a href="https://sites.rutgers.edu/prg/" target="_blank" rel="noopener">PRG · Rutgers</a></li>' +
            '<li><a href="https://paesanigroup.ucsd.edu/" target="_blank" rel="noopener">Paesani Lab · UCSD</a></li>' +
            '<li><a href="https://www.shaoxc.com/" target="_blank" rel="noopener">MS² Lab · Jilin</a></li>' +
          '</ul>' +
        '</div>' +
      '</div></div>' +
      '<div class="sponsors"><div class="container">' +
        '<div class="label">We are grateful to our sponsors &amp; partner institutions</div>' +
        '<div class="sponsors-row">' +
          '<a href="https://www.boisestate.edu/" target="_blank" rel="noopener"><img src="' + root + '_static/boise-state-logo.png" alt="Boise State University" loading="lazy"></a>' +
          '<a href="https://www.rutgers.edu/" target="_blank" rel="noopener"><img src="' + root + '_static/rutgers-logo-white.svg" alt="Rutgers University" loading="lazy"></a>' +
          '<a href="https://ucsd.edu/" target="_blank" rel="noopener"><img src="' + root + '_static/ucsd.png" alt="University of California San Diego" loading="lazy"></a>' +
          '<a href="https://www.nsf.gov/" target="_blank" rel="noopener"><img src="' + root + '_static/nsf-logo-white.svg" alt="National Science Foundation" loading="lazy"></a>' +
        '</div>' +
        '<p class="note">The CyberTraining activities of the Q-MS Center are sponsored by the NSF OAC award numbers <strong>2321102 / 2321103 / 2321104</strong>.</p>' +
      '</div></div>' +
      '<div class="footer-bottom"><div class="container" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;width:100%">' +
        '<span>© ' + year + ' Quantum Multiscale (Q-MS) Center.</span>' +
        '<span><a href="https://www.quantum-multiscale.org/">quantum-multiscale.org</a></span>' +
      '</div></div>' +
    '</footer>';

  // Inject header at top, footer at bottom.
  document.body.insertAdjacentHTML("afterbegin", headerHtml);
  document.body.insertAdjacentHTML("beforeend", footerHtml);

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-menu a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
    });
  }

  // Accordion (schedule days)
  document.querySelectorAll(".acc-head").forEach(function (head) {
    head.addEventListener("click", function () {
      head.parentElement.classList.toggle("open");
    });
  });

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
