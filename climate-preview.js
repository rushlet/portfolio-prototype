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
  };

  preview.classList.add("has-interactive-preview");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const view = views[button.dataset.warmView];
      if (!view) return;

      image.src = view.src;
      image.alt = view.alt;
      label.textContent = view.label;
      caption.textContent = view.caption;
      buttons.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
    });
  });
}
