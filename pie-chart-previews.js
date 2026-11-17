const chartExamples = document.querySelectorAll(".chart-example");

if (window.Flourish?.loadEmbed) {
  chartExamples.forEach((example) => {
    const options = example.querySelector(".chart-label-options");
    const embed = example.querySelector(".chart-preview .flourish-embed");

    function updatePreview() {
      embed.replaceChildren();
      embed.dataset.src = options.querySelector("input:checked").value;
      window.Flourish.loadEmbed(embed);
    }

    updatePreview();
    options.hidden = false;
    options.addEventListener("change", updatePreview);
  });
}
