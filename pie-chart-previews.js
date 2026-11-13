const wideScreen = window.matchMedia("(min-width: 68rem)");
const chartExamples = document.querySelectorAll(".chart-example");

function loadChart(embed, source) {
  embed.replaceChildren();
  embed.dataset.src = source;
  window.Flourish.loadEmbed(embed);
}

function updateMobilePreview(example) {
  const mobileChart = example.querySelector("[data-mobile-chart]");
  if (!wideScreen.matches) {
    mobileChart.replaceChildren();
    return;
  }

  const source = example.querySelector(".chart-label-options input:checked").value;
  const currentEmbed = mobileChart.firstElementChild;
  if (currentEmbed?.dataset.src === source) return;

  const mobileEmbed = document.createElement("div");
  mobileEmbed.className = "flourish-embed flourish-chart";
  mobileChart.replaceChildren(mobileEmbed);
  loadChart(mobileEmbed, source);
}

if (window.Flourish?.loadEmbed) {
  document.documentElement.classList.add("has-flourish-previews");

  chartExamples.forEach((example) => {
    const options = example.querySelector(".chart-label-options");
    const desktopEmbed = example.querySelector(".chart-preview .flourish-embed");

    function updatePreviews() {
      loadChart(desktopEmbed, options.querySelector("input:checked").value);
      updateMobilePreview(example);
    }

    updatePreviews();
    options.hidden = false;
    options.addEventListener("change", updatePreviews);
  });

  wideScreen.addEventListener("change", () => {
    chartExamples.forEach(updateMobilePreview);
  });
}
