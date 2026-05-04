const articles = [
    {
        title: "Schneegestöber statt Schulbank drücken",
        id: "ski2026",
        image: "assets/Ski2026a1.jpeg",
        text: "Am 19.03 war es so weit: Die gesamte 10. Stufe traf sich gegen 20 Uhr vor der Schule. Nachdem sich die Schüler und Schülerinnen von ihren Eltern verabschiedet hatten und der Bus fertig beladen war, ging es endlich los – 14 Stunden Abenteuer lagen vor uns.  Nach etwa 3 Stunden Fahrt, machten wir  an…",
        link: "article1.html",
        date: "19.03.2026"
    },
    {
        title: "Von klugen Ideen und Kegelstößen – unsere SV Fahrt",
        id: "svfahrt",
        image: "assets/SV-Fahrt.jpg",
        text: "Am 18. März startete eine kleine Abordnung der SV in Richtung Köln Riehl. Überraschenderweise kam, trotz des Streiks der deutschen Bahn, pünktlich um 8 Uhr unser Zug und brachte uns bis Mülheim. Von dort aus liefen wir ca. eine halbe Stunde bis zu unsererem Heim für die nächsten paar Tage…",
        link: "article2.html",
        date: "18.03.2026"
    },
    {
        title: "5B auf der Lit.kid.Cologne!",
        id: "litkid5b",
        image: "assets/litkid_5b.jpg",
        text: "Am 9. März 2026 sind wir, die Klasse 5b, mit unseren Klassenlehrer:innen Frau Sulski und Herrn Bänsch zu einer Lesung der lit.kid.COLOGNE gefahren. Die lit.kid.COLOGNE gehört zur lit.COLOGNE. Das ist ein Lesefest für jung und alt mit vielen Lesungen von morgens bis abends. Wir sind in die Lesung „Kennst du…",
        link: "article3.html",
        date: "09.03.2026"
    },
    {
        title: "„Was einmal passiert ist, kann sich wiederholen.“  - Gedenkstättenfahrt des NCG nach Oświęcim und Krakau ",
        id: "auschwitzfahrt",
        image: "assets/AuschwitzfahrtTitelbild.jpg",
        text: "Im Rahmen des in diesem Jahr erstmalig stattfindenden Projektkurses Deutsch-Geschichte „Gegen das Vergessen“, welcher sich seit den Sommerferien mit Antisemitismus und dem Holocaust beschäftigt, fuhren wir vom 21. bis zum 26. März nach Polen.  In unserem Projektkurs hatten wir uns zuvor intensiv mit der NS-Zeit beschäftigt. Dabei beleuchteten wir sowohl die Perspektive der Opfer als auch…",
        link: "article4.html",
        date: "04.05.2026"
    },
];

const container = document.getElementById("articlesContainer");

articles.forEach(article => {
    const card = document.createElement("div");
    card.classList.add("articleCard");

    card.innerHTML = `
    <img src="${article.image}" alt="${article.title}">
    <div class="articleContent">
        <h3>${article.title}</h3>
        <p>${article.text.substring(0, 100)}...</p>
        <a class="readBtn" href="Seiten/UeberUns/artikelTemplate.html?id=${article.id}">Lesen</a>
    </div>

    <span class="articleDate">${article.date}</span>
`;

    container.appendChild(card);
});