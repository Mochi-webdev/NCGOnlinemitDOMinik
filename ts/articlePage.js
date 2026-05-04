document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const articles = [
        {
            title: "Schneegestöber statt Schulbank drücken",
            id: "ski2026",
            image: "../../assets/Ski2026a1.jpeg",
            text: "Am 19.03 war es so weit: Die gesamte 10. Stufe traf sich gegen 20 Uhr vor der Schule. Nachdem sich die Schüler und Schülerinnen von ihren Eltern verabschiedet hatten und der Bus fertig beladen war, ging es endlich los – 14 Stunden Abenteuer lagen vor uns. Nach etwa 3 Stunden Fahrt, machten wir  an einer Tankstelle halt, wo wir uns mit überteuertem Eis als Mitternachtssnack stärkten, bevor es weiterging. Nach rund 11 weiteren  Stunden kamen wir endlich in Hochkrimml an. Nachdem wir alles ausgeladen hatten, beschäftigten wir uns erst einmal ein paar Stunden mit Spielen oder Gesprächen.  Hauptsächlich versuchten wir aber, wach zu bleiben. Als wir schließlich unser Equipment vom Skiverleih abgeholt hatten, bezogen wir die Zimmer – und lieferten uns mehrere Kämpfe mit den Bettlaken, aus denen erschöpfte Gewinner*innen hervorgingen. Am späteren Nachmittag wurden die Anfänger*innen in ihre Skier gesteckt, eingewiesen und bekamen von den Fortgeschrittenen und Lehrer*innen die Grundlagen beigebracht. Nach einer langen ersten Nacht ging es endlich los: Wir standen auf der Piste – also fast. Als Erstes war Aufwärmen angesagt. Täglich stattfindend zu dem neuen Lieblingssong der gesamten 10. Stufe: „Theo Theo“; inklusive des dazugehörigen Tanzes von Herrn Thomas, der bei uns Schülern und Schülerinnen hervorragend ankam. Nachdem wir das Aufwärmen erfolgreich absolviert hatten, marschierten wir zum Lift – wobei viele unterschätzten, wie schwer es ist, mit Skischuhen zu laufen. Dann standen wir endlich auf dem Berg. Die Fortgeschrittenen stiegen direkt in den Lift  und fuhren hoch, während die Anfänger*innen erstmal unten blieben und sich langsam herantasteten. Das wiederholte sich an den meisten Tagen: aufstehen, frühstücken, „Theo Theo“ tanzen, Ski fahren – und wieder von vorne. Die Anfänger*innen machten große Fortschritte und manche konnten am Ende der Woche sogar schwarze Pisten herunterfahren, was am Anfang noch wie ein schlechter Witz klang. Die Lehrer*innen überraschten uns Schüler*innen am letzten Abend noch mit einem Casino-Abend – das hieß: schick anziehen! Nachdem alle sich geschniegelt und gestriegelt hatten, ging es ins „Casino“, wo wir sehr viel Spaß hatten. Am Ende der Fahrt konnten wir alle, trotz leichten Verletzungen auf eine schöne Woche mit viel Spaß zurück blicken. Als Stufengemeinschaft sind wir zusammengewachsen und haben insgesamt eine stärkere Bindung aufgebaut. Nach 6 Tagen hieß es :12 Stunden Rückfahrt und Abschied nehmen. Gegen 22:00 Uhr kamen wir wieder heil am NCG an und wurden nach dem Ausladen direkt in die Ferien entlassen. Geschrieben von Bennet Linden (10b)",
            link: "article1.html",
            date: "19.03.2026"
        },
        {
            title: "Von klugen Ideen und Kegelstößen – unsere SV Fahrt",
            id: "svfahrt",
            image: "../../assets/SV-Fahrt.jpg",
            text: "Am 18. März startete eine kleine Abordnung der SV in Richtung Köln Riehl. Überraschenderweise kam, trotz des Streiks der deutschen Bahn, pünktlich um 8 Uhr unser Zug und brachte uns bis Mülheim. Von dort aus liefen wir ca. eine halbe Stunde bis zu unsererem Heim für die nächsten paar Tage – die Jugendherberge Köln Riehl. Da es noch früh am Tag war, widmeten wir uns vor dem Mittagessen der Struktur und Planung unserer Arbeitszeiten und dem Sortieren verschiedener Themenbereiche, die wir ansprechen wollten. Die Themenbereiche „Gestaltung des neuen SV Raumes“ und „SV Internes“ wurden, in dem ungewohnt hellen und freundlichen Raum, für den ersten Tag auserkoren. Auch nach dem Mittagsessen, ausgeteilt von Gesichtern mit verblüffender Ähnlichkeit zu uns bekannten, widmeten wir uns also in einer weiteren Arbeitsphase diesen Themen. Abends spielten wir Kennenlernspiele und erfuhren so ein wenig mehr über unsere Mitmenschen – beispielsweise Kindheitserinnerungen, letzte Verbrechen oder vollständige Namen. Gut gelaunt und müde ging es danach in Richtung der Betten. Am nächsten Morgen starteten wir, eingestimmt mit tassenweise Kakao, in die nächste Arbeitsphase. Dieses Mal beschäftigten wir uns den Tag über mit neuen Projekten, die wir einführen könnten. Der Fokus lag dabei auf dem Bereich „Seelsorge“, welchen wir von unterschiedlichen Seiten beleuchteten. Abends starteten wir einen Spaziergang über den Rhein zu einer Kneipe unseres Vertrauens, in der wir gegeneinander beim Kegeln antraten. In unterschiedlichen Spielen, von möglichst hohen Zahlen bis sehr niedrigen, zeigten sich Frauenpower und die Überlegenheit von Sportstudiumabsolventen – für alle waren jedoch einige erfolgreiche Runden dabei. Als der Freitag gekommen war und die Kakaommaschiene nicht mehr funktionierte, traten auch wir nach einer letzten Arbeitseinheit, zum Thema der Reflektion, unsere Rückreise an. Da die Bahnen wieder in ihrem gewöhnlich zuverlässigen Betrieb fuhren, kamen wir nach kurzer Zeit wieder in Bergisch Gladbach an und können uns nun in den nächsten Wochen darauf freuen unsere Ergebnisse umzusetzen. Geschrieben von Franziska Königshofen, Bild von Elias Reiter",
            link: "article2.html",
            date: "18.03.2026"
        },
        {
            title: "5B auf der Lit.kid.Cologne!",
            id: "litkid5b",
            image: "../../assets/litkid_5b.jpg",
            text: "Am 9. März 2026 sind wir, die Klasse 5b, mit unseren Klassenlehrer:innen Frau Sulski und Herrn Bänsch zu einer Lesung der lit.kid.COLOGNE gefahren. Die lit.kid.COLOGNE gehört zur lit.COLOGNE. Das ist ein Lesefest für jung und alt mit vielen Lesungen von morgens bis abends. Wir sind in die Lesung „Kennst du deine Rechte?“ des Autors Sherif Rizkallah gegangen, der auch Moderator der logo-Nachrichten auf kika ist. Dazu sind wir mit der Bahn nach Köln in die Balloni Hallen gefahren, wo die Lesung stattfand. In der Lesung hat Sherif Texte zu den Grundrechten vorgelesen und Fragen gestellt. Wir haben auch Fragen gestellt und über die Grundrechte gesprochen. Am Ende haben wir Autogramme und Selfies bekommen. Und unsere Klasse hat ein Foto mit Sherif gemacht. Der Ausflug hat uns sehr gut gefallen. Janne Barabas, 5b",
            link: "article3.html",
            date: "09.03.2026"
        },
        {
            title: "„Was einmal passiert ist, kann sich wiederholen.“  - Gedenkstättenfahrt des NCG nach Oświęcim und Krakau ",
            id: "auschwitzfahrt",
            image: "../../assets/AuschwitzfahrtTitelbild.jpg",
            photos: [
                "../../assets/Auschwitzfahrt1.jpg",
                "../../assets/Auschwitzfahrt2.jpg",
                "../../assets/Auschwitzfahrt3.jpg",
                "../../assets/Auschwitzfahrt4.jpg",
                "../../assets/Auschwitzfahrt5.jpg",
            ],
            text: `Im Rahmen des in diesem Jahr erstmalig stattfindenden Projektkurses Deutsch-Geschichte „Gegen das Vergessen“, welcher sich seit den Sommerferien mit Antisemitismus und dem Holocaust beschäftigt, fuhren wir vom 21. bis zum 26. März nach Polen. 
In unserem Projektkurs hatten wir uns zuvor intensiv mit der NS-Zeit beschäftigt. Dabei beleuchteten wir sowohl die Perspektive der Opfer als auch die der Täter*innen. Individuell beschäftigten wir uns mehrere Monate mit persönlich ausgewählten Biographien von Auschwitz-Überlebenden.  
Am Samstag, den 21. März, machten wir uns um 05:30 Uhr auf den 15-stündigen Weg nach Oświecim. Ausgelaugt kamen wir am Samstagabend an und wurden direkt von unseren beiden Teamerinnen Katja und Bibi auf die folgenden Tage eingestimmt.  
Am ersten Morgen besuchten wir das Stammlager (Auschwitz I). Zu Beginn gingen wir durch einen Tunnel, in welchem die Namen aller Opfer vorgelesen wurden. Beim Durchgehen wurde uns schon einmal bewusst, wie viele Menschen Opfer des Holocausts wurden. Wir wurden von unserer Guide durch das Tor mit der Aufschrift „Arbeit macht frei“ geführt und sie erzählte uns, dass in dem Vernichtungs- und Konzentrationslager innerhalb von 4,5 Jahren etwa 1,1 Millionen Menschen ermordet wurden – von den meisten blieb nur Asche übrig. Vor Ort bewegten wir uns auf den Spuren der Häftlinge und schauten uns verschiedene Orte im Lager an. So zum Beispiel den Appellplatz mit Galgen, die Gefängniszellen, in denen Häftlinge bei „Ungehorsam“ mit Dunkelheit und Hunger bestraft wurden, sowie die Baracken, die sie bauten und in denen zu viele Menschen leben mussten. Besonders beeindruckt hat uns, dass das gesamte Lager wie eine kleine strukturierte Stadt ausgesehen hat und man sich zunächst nicht vorstellen konnte, welche Gräueltaten dort geschahen. Diese beinhalteten beispielsweise grausame Spiele mit den Häftlingen oder Experimente, vor allem an Frauen, deren Eierstöcke vergiftet wurden, um sie zu sterilisieren. 
Um uns die Realität von vor 85 Jahren zu zeigen, wurden wir von unserer Guide in verschiedene Baracken geführt, in denen das Leben der Menschen und einzelne Schicksale beschrieben wurden. Diese von einzelnen Staaten gestalteten „Länderausstellungen“ konzentrieren sich auf die Opfer aus den jeweiligen Ländern, wie Frankreich, die Niederlande oder Israel oder auf Opfergruppen, wie Sinti und Roma. An diesem Tag besuchten wir die israelische Ausstellung, in welcher sich zum einen die Geschichten verschiedener jüdischer Opfer und Bilder aus ihrem Leben vor der Deportation befanden. Mit diesen fröhlichen und friedlichen Alltagsbildern im Kopf, wurden wir im nächsten Raum mit rassistischen und antisemitischen Propagandareden von hochgestellten NSDAP Mitgliedern konfrontiert. Dieser Kontrast wirkte sehr bewegend auf uns, da er uns die wahnsinnige NS-Rassenideologie und die krankhafte Überzeugung der Täter*innen vor Augen führte. 
In anderen Baracken waren Nachbildungen von Folterinstrumenten zu sehen (Prügelbock, Knüppel oder Peitschen), um den Häftlingen Schmerzen zuzufügen. Ganz besonders eindrücklich war für uns die Ausstellung, in der Haare und mehrere Tonnen an Schuhen, Taschen und weiteren Habseligkeiten der Opfer ausgestellt waren. Wir fühlten uns in diesen Räumen den Opfern sehr Nahe und uns wurde bewusst, dass hinter all diesen Gegenständen Menschen mit eigenen Identitäten, Leben und Träumen, welche ihnen viel zu früh gestohlen wurden, stehen. 
Der Montag begann mit einer dreistündigen Führung durch das Vernichtungslager Birkenau (Auschwitz II.). Wieder waren wir mit unserer Guide auf den Wegen der Häftlinge unterwegs und sie führte uns durch verschiedene Baracken. Anders als die im Stammlager, waren diese allerdings zugig, kalt und aus Holz erbaut. 
Der Unterschied bestand darin, dass Birkenau ein Vernichtungslager war, in dem Menschen meist nur kurze Zeit lebten und dann in die Gaskammern geführt wurden. Sie betraten die Räume als Menschen und verließen sie als Nummern. 
Von den Gaskammern sind heute nur noch Ruinen erhalten. Besonders eindrücklich waren für uns gefundene Gegenstände wie Blechdosen, Löffel und Kämme, die zeigten, wie schnell persönliche Dinge und Geschichten ausgelöscht werden können. 
Nach dem Mittagessen besuchten wir Marian Kolodziejas Werk im Keller von Harmeze. Seine Bilder zeigten die grausame Realität der Lager auf erschütternde Weise. Diese Eindrücke werden uns wahrscheinlich unser Leben lang begleiten. 
Am Dienstag besuchten wir eine Synagoge, das jüdische Museum und erhielten eine Stadtführung durch Oświęcim. Besonders der einzige Stolperstein für die vierjährige Franciszka Haberfeld blieb uns in Erinnerung. 
Am Nachmittag fuhren wir nach Krakau. Dort erkundeten wir die Stadt und besuchten das Restaurant „Marchewka z Groszkiem“. 
Am Mittwoch besuchten wir Krakau erneut, das jüdische Viertel, den Friedhof und das Galicia Jewish Museum. Dort trafen wir die Zeitzeugin Anna Janowska-Ciońćka, die uns ihre Lebensgeschichte erzählte. Besonders ihr Satz „Was einmal passiert ist, kann sich wiederholen.“ blieb uns im Gedächtnis. 
Am Abend besuchten wir das Restaurant „Klezmer-Hois“ und traten danach die Heimreise an. 

Wir möchten uns herzlich bei allen bedanken, die diese Fahrt ermöglicht haben. Besonders bei Frau Petri, unseren Lehrer*innen, Teamerinnen und unserem Busfahrer Frank.`
        }
    ];

    const article = articles.find(a => a.id === id);

    if (!article) {
        document.body.innerHTML = "<h1>Artikel nicht gefunden</h1>";
        return;
    }

    document.getElementById("articleTitle").textContent = article.title;
    document.getElementById("articleImage").src = article.image;
    document.getElementById("articleDate").textContent = article.date;


    document.getElementById("articleContent").innerHTML =
        `<p>${article.text.replace(/\n/g, "</p><p>")}</p>`;

    const photoGrid = document.getElementById("photoGrid");

    if (article.photos && article.photos.length > 0) {
        photoGrid.innerHTML = article.photos.map(src => `
        <img src="${src}" class="article-photo" />
    `).join("");
    }

    photoGrid.innerHTML = article.photos.map((src, index) => `
    <img 
        src="${src}" 
        class="article-photo"
        onclick="openPhotoViewer(article.photos, ${index})"
    />
`).join("");

    function openPhotoViewer(images, startIndex) {
        let current = startIndex;

        const viewer = document.getElementById("viewer");
        const viewerImg = document.getElementById("viewerImg");

        function update() {
            viewerImg.src = images[current];
            viewer.style.display = "flex";
        }

        window.nextImage = () => {
            current = (current + 1) % images.length;
            update();
        };

        window.prevImage = () => {
            current = (current - 1 + images.length) % images.length;
            update();
        };

        update();
    }
});

window.addEventListener("scroll", () => {
    const bar = document.getElementById("progressBar");
    if (!bar) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / scrollHeight) * 100;
    bar.style.width = progress + "%";
});
