let articles = [];
const ADMIN_HASH = "#Admin234987s20873kl29820";
const isAdmin = window.location.hash === ADMIN_HASH;

async function loadArticlesData() {
    let saved = localStorage.getItem("articles");
    if (saved) {
        articles = JSON.parse(saved);
        return articles;
    }

    try {
        const response = await fetch('/articles.json');
        if (!response.ok) throw new Error();
        articles = await response.json();
        localStorage.setItem("articles", JSON.stringify(articles));
        return articles;
    } catch (e) {
        articles = [];
        return articles;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadArticlesData();

    initProgressBar();

    const container = document.getElementById("articlesContainer");
    const articleTitle = document.getElementById("articleTitle");

    if (container) {
        renderArticleList(articles);
    } else if (articleTitle) {
        renderSingleArticle(articles);
        if (isAdmin) initAdminMode(articles);
    }
});

function initProgressBar() {
    window.addEventListener("scroll", () => {
        const bar = document.getElementById("progressBar");
        if (!bar) return;
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (scrollTop / scrollHeight) * 100 + "%";
    });
}

function renderArticleList(data) {
    const container = document.getElementById("articlesContainer");
    if (!container) return;
    container.innerHTML = "";

    const pathPrefix = window.location.pathname.includes('Seiten') ? '../../' : '';

    data.forEach(article => {
        const card = document.createElement("div");
        card.classList.add("articleCard");
        
        const cleanImagePath = article.image ? article.image.replace('../../', '') : 'assets/default.jpg';

        card.innerHTML = `
            <img src="${pathPrefix}${cleanImagePath}" alt="${article.title}">
            <div class="articleContent">
                <h3>${article.title}</h3>
                <p>${article.text.substring(0, 100)}...</p>
                <a class="readBtn" href="${pathPrefix}Seiten/UeberUns/artikelTemplate.html?id=${article.id}${isAdmin ? ADMIN_HASH : ''}">Lesen</a>
            </div>
            <span class="articleDate">${article.date}</span>
        `;
        container.appendChild(card);
    });
}

function renderSingleArticle(data) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const article = data.find(a => a.id === id);

    if (!article) {
        document.body.innerHTML = "<h1>Artikel nicht gefunden</h1>";
        return;
    }

    const titleEl = document.getElementById("articleTitle");
    const imageEl = document.getElementById("articleImage");
    const dateEl = document.getElementById("articleDate");
    const contentEl = document.getElementById("articleContent");

    if (titleEl) titleEl.textContent = article.title;
    if (imageEl) imageEl.src = article.image;
    if (dateEl) dateEl.textContent = article.date;
    if (contentEl) {
        contentEl.innerHTML = `<p>${article.text.replace(/\n/g, "</p><p>")}</p>`;
    }

    const photoGrid = document.getElementById("photoGrid");
    if (photoGrid && article.photos && article.photos.length > 0) {
        photoGrid.innerHTML = article.photos.map((src, index) => `
            <img src="${src}" class="article-photo" onclick="openPhotoViewer(${JSON.stringify(article.photos)}, ${index})" />
        `).join("");
    }
}

async function createArticle() {
    const current = await loadArticlesData();
    const newId = "news-" + Date.now();
    
    const newArticle = {
        title: "Klicken zum Bearbeiten des Titels",
        id: newId,
        image: "../../assets/default.jpg",
        text: "Klicken zum Bearbeiten des Inhalts...",
        date: new Date().toLocaleDateString("de-DE"),
        photos: []
    };

    current.push(newArticle);
    localStorage.setItem("articles", JSON.stringify(current));
    
    const isInsideSubfolder = window.location.pathname.includes('Seiten');
    const redirectPath = isInsideSubfolder ? 'UeberUns/artikelTemplate.html' : 'Seiten/UeberUns/artikelTemplate.html';
    
    window.location.href = `${redirectPath}?id=${newId}${ADMIN_HASH}`;
}

function initAdminMode(data) {
    const adminBar = document.getElementById("adminBar");
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");
    const title = document.getElementById("articleTitle");
    const content = document.getElementById("articleContent");

    if (adminBar) adminBar.classList.remove("hidden");

    editBtn?.addEventListener("click", () => {
        title.contentEditable = true;
        content.contentEditable = true;
        title.classList.add("editable");
        content.classList.add("editable");
        title.focus();
    });

    saveBtn?.addEventListener("click", () => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        
        const index = data.findIndex(a => a.id === id);
        
        if (index !== -1) {
            data[index].title = title.innerText.trim();
            data[index].text = content.innerText.trim();
            
            localStorage.setItem("articles", JSON.stringify(data));
            
            title.contentEditable = false;
            content.contentEditable = false;
            title.classList.remove("editable");
            content.classList.remove("editable");
            
            alert("Änderungen erfolgreich gespeichert!");
            location.reload();
        }
    });
}

window.openPhotoViewer = (images, startIndex) => {
    let current = startIndex;
    const viewer = document.getElementById("viewer");
    const viewerImg = document.getElementById("viewerImg");

    if (!viewer || !viewerImg) return;

    const update = () => {
        viewerImg.src = images[current];
        viewer.style.display = "flex";
    };

    window.nextImage = () => { current = (current + 1) % images.length; update(); };
    window.prevImage = () => { current = (current - 1 + images.length) % images.length; update(); };
    
    update();
};