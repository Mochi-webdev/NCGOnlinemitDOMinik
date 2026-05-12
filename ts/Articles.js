let articles = [];
const ADMIN_HASH = "#Admin234987s20873kl29820";
const isAdmin = window.location.hash.includes(ADMIN_HASH);

const TEMPLATE_PATH = "/Seiten/UeberUns/artikelTemplate.html";
const API_ENDPOINT = "/api/articles";

async function loadArticlesData() {
    
    const saved = localStorage.getItem("articles");
    let localArticles = saved ? JSON.parse(saved) : [];

    try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) throw new Error();
        const serverArticles = await response.json();

        if (serverArticles.length >= localArticles.length) {
            articles = serverArticles;
        } else {
            articles = localArticles;
        }

        localStorage.setItem("articles", JSON.stringify(articles));
        return articles;
    } catch (e) {
        articles = localArticles;
        return articles;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadArticlesData();
    initProgressBar();

    const container = document.getElementById("articlesContainer");
    const articleTitle = document.getElementById("articleTitle");

    if (container) {
        const limit = container.classList.contains("homepage-preview") ? 4 : null;
        renderArticleList(articles, limit);
    } else if (articleTitle) {
        renderSingleArticle(articles);
        if (isAdmin) initAdminMode(articles);
    }

    const fileInput = document.getElementById('imageUpload');
    const imgPreview = document.getElementById('imagePreview');
    if (fileInput && imgPreview) {
        fileInput.addEventListener('change', function(e) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imgPreview.src = event.target.result;
                imgPreview.style.display = 'block';
            };
            if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
        });
    }
});

function renderArticleList(data, limit = null) {
    const container = document.getElementById("articlesContainer");
    if (!container) return;
    container.innerHTML = "";

    const displayData = limit ? data.slice(0, limit) : data;

    displayData.forEach(article => {
        const card = document.createElement("div");
        card.classList.add("articleCard");
        
        const isBase64 = article.image && article.image.startsWith('data:image');
        const cleanImageSrc = article.image.replace(/^(\.\.\/)+/, '');
        const finalSrc = isBase64 ? article.image : `/${cleanImageSrc}`;

        card.innerHTML = `
            <img src="${finalSrc}" alt="${article.title}">
            <div class="articleContent">
                <h3>${article.title}</h3>
                <p>${article.text.substring(0, 100)}...</p>
                <a class="readBtn" href="${TEMPLATE_PATH}?id=${article.id}${isAdmin ? ADMIN_HASH : ''}">Lesen</a>
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
    if (imageEl) {
        const isBase64 = article.image && article.image.startsWith('data:image');
        const cleanImageSrc = article.image.replace(/^(\.\.\/)+/, '');
        imageEl.src = isBase64 ? article.image : `/${cleanImageSrc}`;
    }
    if (dateEl) dateEl.textContent = article.date;
    if (contentEl) {
        contentEl.innerHTML = `<p>${article.text.replace(/\n/g, "</p><p>")}</p>`;
    }

    const photoGrid = document.getElementById("photoGrid");
    if (photoGrid && article.photos && article.photos.length > 0) {
        photoGrid.innerHTML = article.photos.map((src, index) => {
            const isBase64 = src.startsWith('data:image');
            const cleanPhotoSrc = src.replace(/^(\.\.\/)+/, '');
            const finalPhotoSrc = isBase64 ? src : `/${cleanPhotoSrc}`;
            return `<img src="${finalPhotoSrc}" class="article-photo" onclick="openPhotoViewer(${JSON.stringify(article.photos)}, ${index})" />`;
        }).join("");
    }
}

function initProgressBar() {
    window.addEventListener("scroll", () => {
        const bar = document.getElementById("progressBar");
        if (!bar) return;
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (scrollTop / scrollHeight) * 100 + "%";
    });
}

async function createArticle() {
    const current = await loadArticlesData();
    const titleVal = document.getElementById("titleInput").value.trim();
    const idVal = document.getElementById("idInput").value.trim();
    const dateVal = document.getElementById("dateInput").value.trim();
    const textVal = document.getElementById("textInput").value.trim();
    const fileInput = document.getElementById("imageUpload");

    if (!titleVal || !idVal) {
        alert("Bitte mindestens Titel und ID eingeben!");
        return;
    }

    let imageData = "assets/default.jpg";
    if (fileInput.files && fileInput.files[0]) {
        imageData = await getBase64(fileInput.files[0]);
    }

    const newArticle = {
        title: titleVal,
        id: idVal,
        image: imageData,
        text: textVal || "Inhalt hier eingeben...",
        date: dateVal || new Date().toLocaleDateString("de-DE"),
        photos: []
    };

    const updatedArticles = [...current, newArticle];
    await syncWithServer(updatedArticles);
}

async function syncWithServer(updatedData) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                articles: updatedData,
                adminHash: ADMIN_HASH.replace('#', '')
            })
        });

        if (!response.ok) throw new Error('Server error');

        articles = updatedData;
        localStorage.setItem("articles", JSON.stringify(articles));
        alert("Erfolgreich gespeichert!");
        location.reload();
    } catch (error) {
        alert("Fehler beim Speichern auf dem Server.");
    }
}

function initAdminMode(data) {
    const adminBar = document.getElementById("adminBar");
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");
    
    if (adminBar) adminBar.classList.remove("hidden");

    editBtn?.addEventListener("click", () => {
        document.getElementById("articleTitle").contentEditable = true;
        document.getElementById("articleContent").contentEditable = true;
        document.getElementById("articleTitle").classList.add("editable");
        document.getElementById("articleContent").classList.add("editable");
    });

    saveBtn?.addEventListener("click", async () => {
        const id = new URLSearchParams(window.location.search).get("id");
        const index = data.findIndex(a => a.id === id);
        if (index !== -1) {
            data[index].title = document.getElementById("articleTitle").innerText.trim();
            data[index].text = document.getElementById("articleContent").innerText.trim();
            await syncWithServer(data);
        }
    });
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

window.openPhotoViewer = (images, startIndex) => {
    let current = startIndex;
    const viewer = document.getElementById("viewer");
    const viewerImg = document.getElementById("viewerImg");

    const update = () => {
        const src = images[current];
        const isBase64 = src.startsWith('data:image');
        const cleanSrc = src.replace(/^(\.\.\/)+/, '');
        viewerImg.src = isBase64 ? src : `/${cleanSrc}`;
        viewer.style.display = "flex";
    };

    window.nextImage = () => { current = (current + 1) % images.length; update(); };
    window.prevImage = () => { current = (current - 1 + images.length) % images.length; update(); };
    update();
};