import embed from "vega-embed";

document.querySelectorAll("[data-spec]").forEach((div) => {
  const spec = JSON.parse(div.dataset.spec);
  embed(`#${div.id}`, spec, { actions: false });
});
