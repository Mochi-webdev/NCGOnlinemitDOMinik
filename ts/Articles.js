let articles = [];
const ADMIN_HASH = "#Admin234987s20873kl29820";
const isAdmin = window.location.hash.includes(ADMIN_HASH);

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
        if (container.classList.contains("homepage-preview")) {
            renderArticleList(articles, 4);
        } else {
            renderArticleList(articles);
        }
    } else if (articleTitle) {
        renderSingleArticle(articles);
        if (isAdmin) initAdminMode(articles);
    }

    const fileInput = document.getElementById('imageUpload');
    const imgPreview = document.getElementById('imagePreview');
    if (fileInput && imgPreview) {
        fileInput.addEventListener('change', function(e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imgPreview.src = event.target.result;
                imgPreview.style.display = 'block';
            }
            if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
            }
        });
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

function renderArticleList(data, limit = null) {
    const container = document.getElementById("articlesContainer");
    if (!container) return;
    container.innerHTML = "";

    const displayData = limit ? data.slice(0, limit) : data;
    
    
    const isDeepLevel = window.location.pathname.toLowerCase().includes('/seiten/');
    const pathPrefix = isDeepLevel ? '../../' : '';

    displayData.forEach(article => {
        const card = document.createElement("div");
        card.classList.add("articleCard");
        
        const isBase64 = article.image && article.image.startsWith('data:image');
     
        const cleanImageSrc = article.image.replace(/^(\.\.\/)+/, '');
        const finalSrc = isBase64 ? article.image : `${pathPrefix}${cleanImageSrc}`;

        card.innerHTML = `
            <img src="${finalSrc}" alt="${article.title}">
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
    if (imageEl) {
        // Ensure single article view also handles relative paths correctly
        const isBase64 = article.image && article.image.startsWith('data:image');
        const isDeepLevel = window.location.pathname.toLowerCase().includes('/seiten/');
        const pathPrefix = isDeepLevel ? '../../' : '';
        const cleanImageSrc = article.image.replace(/^(\.\.\/)+/, '');
        
        imageEl.src = isBase64 ? article.image : `${pathPrefix}${cleanImageSrc}`;
    }
    if (dateEl) dateEl.textContent = article.date;
    if (contentEl) {
        contentEl.innerHTML = `<p>${article.text.replace(/\n/g, "</p><p>")}</p>`;
    }

    const photoGrid = document.getElementById("photoGrid");
    if (photoGrid && article.photos && article.photos.length > 0) {
        photoGrid.innerHTML = article.photos.map((src, index) => {
            const cleanPhotoSrc = src.replace(/^(\.\.\/)+/, '');
            const isDeep = window.location.pathname.toLowerCase().includes('/seiten/');
            const pfx = isDeep ? '../../' : '';
            const finalPhotoSrc = src.startsWith('data:image') ? src : `${pfx}${cleanPhotoSrc}`;
            
            return `<img src="${finalPhotoSrc}" class="article-photo" onclick="openPhotoViewer(${JSON.stringify(article.photos)}, ${index})" />`;
        }).join("");
    }
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

    if (current.some(a => a.id === idVal)) {
        alert("Diese ID existiert bereits!");
        return;
    }

    let imageData = "assets/default.jpg";

    if (fileInput.files && fileInput.files[0]) {
        try {
            imageData = await getBase64(fileInput.files[0]);
        } catch (error) {
            console.error(error);
            alert("Fehler beim Verarbeiten des Bildes.");
            return;
        }
    }

    const newArticle = {
        title: titleVal,
        id: idVal,
        image: imageData,
        text: textVal || "Inhalt hier eingeben...",
        date: dateVal || new Date().toLocaleDateString("de-DE"),
        photos: []
    };

    current.push(newArticle);
    localStorage.setItem("articles", JSON.stringify(current));
    
    alert("Artikel erfolgreich erstellt!");
    location.reload();
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
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
        const isDeep = window.location.pathname.toLowerCase().includes('/seiten/');
        const pfx = isDeep ? '../../' : '';
        const src = images[current];
        const cleanSrc = src.replace(/^(\.\.\/)+/, '');
        
        viewerImg.src = src.startsWith('data:image') ? src : `${pfx}${cleanSrc}`;
        viewer.style.display = "flex";
    };

    window.nextImage = () => { current = (current + 1) % images.length; update(); };
    window.prevImage = () => { current = (current - 1 + images.length) % images.length; update(); };
    
    update();
};