(async function () {
  const root = document.getElementById("ptable-root");
  if (!root) return;

  // Use Sphinx's URL_ROOT so the path works on nested pages too
  const base = (window.DOCUMENTATION_OPTIONS && DOCUMENTATION_OPTIONS.URL_ROOT) || "";
  const res  = await fetch(base + "_static/ptable/elements.json");
  const data = await res.json();

  // Controls
  const controls = document.createElement("div");
  controls.id = "ptable-controls";
  controls.innerHTML = `<label>Filter: <input id="ptable-q" placeholder="Search name/symbol…" /></label>`;
  root.appendChild(controls);

  // Grid container
  const table = document.createElement("div");
  table.className = "ptable";
  root.appendChild(table);

  function render(query = "") {
    table.innerHTML = "";
    const q = query.trim().toLowerCase();
    data
      .filter(el => !q || el.name.toLowerCase().includes(q) || el.symbol.toLowerCase().includes(q))
      .forEach(el => {
        const cell = document.createElement("button");
        cell.className = "cell";
        cell.title = `${el.name} (${el.symbol})`;
        cell.innerHTML = `
          <div class="Z">${el.Z}</div>
          <div class="sym">${el.symbol}</div>
          <div class="name">${el.name}</div>
        `;
        cell.addEventListener("click", () => showDetails(el));
        table.appendChild(cell);
      });
  }

  const panel = document.createElement("div");
  panel.id = "ptable-details";
  root.appendChild(panel);

  function showDetails(el) {
    panel.innerHTML = `
      <h3>${el.name} (${el.symbol})</h3>
      <p><b>Z:</b> ${el.Z}</p>
      ${el.pp ? `<p><b>PP:</b> ${el.pp}</p>` : ""}
      ${el.links ? el.links.map(u => `<a href="${u}" target="_blank" rel="noopener">Download / Info</a>`).join(" ") : ""}
    `;
  }

  document.getElementById("ptable-q").addEventListener("input", (e) => render(e.target.value));
  render();
})();
