const data = [
  { klasse: "10a", fach: "Mathe", statt: "Frau Müller", raum: "203", stunde: 2 },
  { klasse: "8b", fach: "Deutsch", statt: "Herr Schmidt", raum: "105", stunde: 3 },
  { klasse: "EF", fach: "Englisch", statt: "Frau Weber", raum: "312", stunde: 1 },
  { klasse: "10a", fach: "Bio", statt: "Vertretung", raum: "Labor", stunde: 5 }
];

const plan = document.getElementById("plan");
const search = document.getElementById("search");

function render(filter = "") {
  plan.innerHTML = "";

  const filtered = data.filter(d =>
    d.klasse.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(d => {
    plan.innerHTML += `
      <div class="card">
        <div class="top">
          <span>Klasse: ${d.klasse}</span>
          <span class="badge">Stunde ${d.stunde}</span>
        </div>
        <p><strong>Fach:</strong> ${d.fach}</p>
        <p><strong>Vertretung:</strong> ${d.statt}</p>
        <p><strong>Raum:</strong> ${d.raum}</p>
      </div>
    `;
  });
}

search.addEventListener("input", e => {
  render(e.target.value);
});

render();
async function loadPlan() {
  const res = await fetch("http://localhost:3000/api/vertretung");
  const data = await res.json();

  const container = document.getElementById("plan");
  container.innerHTML = "";

  data.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <h3>${item.klassen.join(", ")}</h3>
        <p>${item.subject} → ${item.teachers?.join(", ") || "Vertretung"}</p>
        <p>Raum: ${item.rooms?.join(", ") || "-"}</p>
      </div>
    `;
  });
}

loadPlan();
setInterval(loadPlan, 300000); 