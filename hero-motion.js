const hero = document.querySelector(".hero");
const motionToggle = document.querySelector("[data-hero-motion-toggle]");

if (motionToggle) {
  const motionLabel = motionToggle.querySelector("[data-hero-motion-label]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const preferenceKey = "rushlet-hero-motion";

  const readPreference = () => {
    try {
      return window.localStorage.getItem(preferenceKey);
    } catch {
      return null;
    }
  };

  let wantsMotion = readPreference() !== "off";

  const updateMotion = () => {
    const enabled = wantsMotion && !reducedMotion.matches;
    if (hero) hero.classList.toggle("hero-motion-on", enabled);
    document.documentElement.classList.toggle("site-motion-on", enabled);
    document.body.classList.toggle("motion-enabled", enabled);
    motionToggle.setAttribute("aria-pressed", String(enabled));
    motionToggle.setAttribute("aria-disabled", String(reducedMotion.matches));
    motionLabel.textContent = enabled ? "Motion on" : "Motion off";
  };

  motionToggle.addEventListener("click", () => {
    if (reducedMotion.matches) return;
    wantsMotion = !wantsMotion;
    updateMotion();
    try {
      window.localStorage.setItem(preferenceKey, wantsMotion ? "on" : "off");
    } catch {
      // The toggle still works for this page when storage is unavailable.
    }
  });

  updateMotion();
  motionToggle.closest(".nav-motion-group").hidden = false;
  reducedMotion.addEventListener("change", updateMotion);
}
