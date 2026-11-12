const preview = document.querySelector("[data-warm-preview]");

if (preview) {
  const image = preview.querySelector("[data-warm-image]");
  const label = preview.querySelector("[data-warm-label]");
  const caption = preview.querySelector("[data-warm-caption]");
  const buttons = preview.querySelectorAll("[data-warm-view]");

  const views = {
    globe: {
      src: "assets/climate-change-globe.png",
      alt: "The global temperature-change globe from How much warmer is your city?",
      label: "GLOBAL VIEW",
      caption: "Global view: a 3D globe mapped with temperature-change data.",
    },
    city: {
      src: "assets/climate-change-chart.png",
      alt: "A city temperature chart from How much warmer is your city?, shown on a laptop screen.",
      label: "CITY LOOKUP",
      caption: "City view: monthly temperatures and projections for a selected place.",
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
