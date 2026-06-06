/* =========================================================
   KRINZY Portfolio — JavaScript
   =========================================================
   PROJECT DATA STRUCTURE
   ----------------------
   Add your own files to the `assets/` folder, then add
   entries to the `projects` array below.

   Each object:
   {
     src:    "assets/your-file.png",       // path to image or video
     title:  "Project Name",              // display name
     category: "thumbnails",              // must match a filter-tab data-category
     type:   "image",                     // "image" | "video"
     overlayType: null                     // "animated" | "short" | "static" | null
   }

   For overlay projects, set category to "overlays" and
   overlayType to one of the three sub-types. The overlay
   sub-menu will automatically pick them up.
   ========================================================= */

const projects = [
  // ── Thumbnails ──
  { src: "/thumb-01.png", title: "Gaming Montage", category: "thumbnails", type: "image", overlayType: null },
  { src: "/thumb-02.png", title: "Pro Tournament", category: "thumbnails", type: "image", overlayType: null },
  { src: "assets/thumb-02.png", title: "Road to Champion", category: "thumbnails", type: "image", overlayType: null },
  { src: "Picsart_26-06-04_14-53-36-001.png", title: "Clutch Moment", category: "thumbnails", type: "image", overlayType: null },

  // ── Logos ──
  { src: "assets/logo-01.svg", title: "Esports Brand ID", category: "logos", type: "image", overlayType: null },
  { src: "assets/logo-02.svg", title: "Streamer Emblem", category: "logos", type: "image", overlayType: null },
  { src: "assets/logo-03.svg", title: "Clan Crest", category: "logos", type: "image", overlayType: null },

  // ── Banners ──
  { src: "assets/banner-01.svg", title: "Channel Banner", category: "banners", type: "image", overlayType: null },
  { src: "assets/banner-02.svg", title: "Twitch Header", category: "banners", type: "image", overlayType: null },

  // ── Scoreboards ──
  { src: "assets/scoreboard-01.svg", title: "Tournament Bracket", category: "scoreboards", type: "image", overlayType: null },
  { src: "assets/scoreboard-02.svg", title: "Live Score HUD", category: "scoreboards", type: "image", overlayType: null },

  // ── PSDs ──
  { src: "assets/psd-01.svg", title: "Thumbnail Template", category: "psds", type: "image", overlayType: null },
  { src: "assets/psd-02.svg", title: "Overlay Pack Source", category: "psds", type: "image", overlayType: null },

  // ── Overlays — Animated ──
  // Replace .svg with .mp4 when you add real video files
  { src: "assets/overlay-stati-01.png", title: "Neon Stream Overlay", category: "overlays", type: "video", overlayType: "animated" },
  { src: "assets/overlay-anim-02.svg", title: "Cyber Frame Pack", category: "overlays", type: "video", overlayType: "animated" },

  // ── Overlays — Short ──
  { src: "assets/overlay-short-01.svg", title: "Starting Soon", category: "overlays", type: "image", overlayType: "short" },
  { src: "assets/overlay-short-02.svg", title: "BRB Screen", category: "overlays", type: "image", overlayType: "short" },

  // ── Overlays — Static ──
  { src: "assets/overlay-static-01.png", title: "Webcam Frame", category: "overlays", type: "image", overlayType: "static" },
  { src: "assets/overlay-static-02.svg", title: "Alert Widget BG", category: "overlays", type: "image", overlayType: "static" },
];

/* =========================================================
   State
   ========================================================= */
let activeCategory = "all";
let activeOverlayType = "all";

/* =========================================================
   DOM References
   ========================================================= */
const grid = document.getElementById("portfolioGrid");
const filterTabs = document.getElementById("filterTabs");
const overlaySubmenu = document.getElementById("overlaySubmenu");
const lightbox = document.getElementById("lightbox");
const lightboxMedia = document.getElementById("lightboxMedia");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

/* =========================================================
   Render Gallery
   ========================================================= */
function renderGallery() {
  const filtered = projects.filter((p) => {
    const catMatch = activeCategory === "all" || p.category === activeCategory;
    const overlayMatch = activeCategory !== "overlays" || activeOverlayType === "all" || p.overlayType === activeOverlayType;
    return catMatch && overlayMatch;
  });

  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="empty-state">No projects found in this category.</p>';
    return;
  }

  filtered.forEach((project, i) => {
    const card = document.createElement("div");
    card.className = "portfolio-card entering";
    card.style.animationDelay = `${i * 0.06}s`;

    const mediaEl =
      project.type === "video"
        ? `<video class="portfolio-card__media" muted loop playsinline><source src="${project.src}" type="video/mp4"/></video>`
        : `<img class="portfolio-card__media" src="${project.src}" alt="${project.title}" loading="lazy"/>`;

    const badge =
      project.category === "overlays" && project.overlayType
        ? `<span class="portfolio-card__badge">${project.overlayType}</span>`
        : "";

    card.innerHTML = `
      ${mediaEl}
      ${badge}
      <div class="portfolio-card__overlay">
        <span class="portfolio-card__title">${project.title}</span>
        <span class="portfolio-card__category">${project.category}</span>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(project));
    grid.appendChild(card);
  });
}

/* =========================================================
   Filter Tabs
   ========================================================= */
filterTabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".filter-tab");
  if (!tab) return;

  activeCategory = tab.dataset.category;
  activeOverlayType = "all";

  filterTabs.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");

  // Show/hide overlay sub-menu
  if (activeCategory === "overlays") {
    overlaySubmenu.classList.add("visible");
  } else {
    overlaySubmenu.classList.remove("visible");
  }

  // Reset overlay sub-tabs
  overlaySubmenu.querySelectorAll(".overlay-subtab").forEach((t) => t.classList.remove("active"));
  overlaySubmenu.querySelector('[data-overlay="all"]').classList.add("active");

  renderGallery();
});

/* =========================================================
   Overlay Sub-Menu Tabs
   ========================================================= */
overlaySubmenu.addEventListener("click", (e) => {
  const subtab = e.target.closest(".overlay-subtab");
  if (!subtab) return;

  activeOverlayType = subtab.dataset.overlay;

  overlaySubmenu.querySelectorAll(".overlay-subtab").forEach((t) => t.classList.remove("active"));
  subtab.classList.add("active");

  renderGallery();
});

/* =========================================================
   Lightbox
   ========================================================= */
function openLightbox(project) {
  lightboxMedia.innerHTML = "";

  if (project.type === "video") {
    const video = document.createElement("video");
    video.src = project.src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.style.maxWidth = "100%";
    video.style.maxHeight = "75vh";
    lightboxMedia.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = project.src;
    img.alt = project.title;
    lightboxMedia.appendChild(img);
  }

  lightboxTitle.textContent = project.title;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  // Pause any playing video
  const video = lightboxMedia.querySelector("video");
  if (video) video.pause();
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-backdrop").addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* =========================================================
   Navbar Scroll & Mobile Toggle
   ========================================================= */
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close mobile menu on link click
navLinks.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");

const observerOptions = { rootMargin: "-50% 0px -50% 0px" };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinkEls.forEach((l) => l.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, observerOptions);

sections.forEach((s) => sectionObserver.observe(s));

/* =========================================================
   Hero Particles (lightweight floating dots)
   ========================================================= */
function createParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) return;

  const count = window.innerWidth < 768 ? 20 : 40;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    const size = Math.random() * 3 + 1;
    const isCyan = Math.random() > 0.5;

    Object.assign(dot.style, {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: isCyan ? "rgba(6, 182, 212, 0.5)" : "rgba(168, 85, 247, 0.5)",
      boxShadow: isCyan
        ? "0 0 6px rgba(6, 182, 212, 0.3)"
        : "0 0 6px rgba(168, 85, 247, 0.3)",
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `floatParticle ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite alternate`,
    });

    container.appendChild(dot);
  }
}

// Inject the particle keyframes
const particleStyle = document.createElement("style");
particleStyle.textContent = `
  @keyframes floatParticle {
    0%   { transform: translate(0, 0) scale(1); opacity: 0.4; }
    100% { transform: translate(${Math.random() > 0.5 ? "" : "-"}30px, -40px) scale(1.3); opacity: 1; }
  }
`;
document.head.appendChild(particleStyle);

/* =========================================================
   Init
   ========================================================= */
createParticles();
renderGallery();
