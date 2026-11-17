const preview = document.querySelector("[data-warm-preview]");

if (preview) {
  const image = preview.querySelector("[data-warm-image]");
  const label = preview.querySelector("[data-warm-label]");
  const caption = preview.querySelector("[data-warm-caption]");
  const buttons = preview.querySelectorAll("[data-warm-view]");

  const views = {
    globe: {
      src: "assets/how-much-warmer-preview.webp",
      alt: "The global temperature-change globe from How much warmer is your city?",
      label: "GLOBAL VIEW",
      caption: "Global view: a 3D globe mapped with temperature-change data.",
    },
    city: {
      src: "assets/how-much-warmer-city.webp",
      alt: "The BBC story with Brighton selected, showing recorded January and July temperatures.",
      label: "CITY LOOKUP",
      caption: "City view: recorded January and July temperatures for Brighton.",
    },
    arctic: {
      src: "assets/how-much-warmer-arctic-still.webp",
      alt: "Illustration from the BBC story mapping Arctic sea ice coverage.",
      label: "ARCTIC SEA ICE",
      caption: "The Arctic illustration shows how sea ice coverage changed over time.",
    },
  };
  const animatedViews = {
    globe: {
      ...views.globe,
      src: "assets/how-much-warmer-globe-motion.webp",
    },
    city: {
      src: "assets/how-much-warmer-amsterdam.gif",
      alt: "The BBC chart revealing historical temperatures and future projections for Amsterdam.",
      label: "CITY LOOKUP",
      caption: "City view: Amsterdam’s recorded temperatures and projections through 2100.",
    },
    arctic: {
      ...views.arctic,
      src: "assets/how-much-warmer-arctic.gif",
    },
  };

  let selectedView = "globe";
  const renderPreview = () => {
    const motionEnabled = document.documentElement.classList.contains("site-motion-on");
    const view = motionEnabled ? animatedViews[selectedView] : views[selectedView];

    if (image.getAttribute("src") !== view.src) image.src = view.src;
    image.alt = view.alt;
    label.textContent = view.label;
    if (caption.textContent.trim() !== view.caption) caption.textContent = view.caption;
  };

  preview.classList.add("has-interactive-preview");
  document.addEventListener("site-motion-change", renderPreview);
  renderPreview();
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedView = button.dataset.warmView;
      renderPreview();
      buttons.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
    });
  });
}
