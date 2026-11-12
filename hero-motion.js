const hero = document.querySelector(".hero");
const motionToggle = document.querySelector("[data-hero-motion-toggle]");

if (hero && motionToggle) {
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

  const savePreference = (enabled) => {
    try {
      window.localStorage.setItem(preferenceKey, enabled ? "on" : "off");
    } catch {
      // The toggle still works for this page when storage is unavailable.
    }
  };

  const setMotion = (enabled) => {
    hero.classList.toggle("hero-motion-on", enabled);
    motionToggle.setAttribute("aria-pressed", String(enabled));
    motionLabel.textContent = enabled ? "Motion on" : "Motion off";
  };

  const savedPreference = readPreference();
  setMotion(savedPreference === null ? !reducedMotion.matches : savedPreference === "on");

  motionToggle.addEventListener("click", () => {
    const enabled = motionToggle.getAttribute("aria-pressed") !== "true";
    setMotion(enabled);
    savePreference(enabled);
  });

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      setMotion(false);
      savePreference(false);
    }
  });
}
