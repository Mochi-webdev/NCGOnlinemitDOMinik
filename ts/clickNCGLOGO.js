document.getElementById("NCGLogo").addEventListener("click", () => {

    if (window.location.pathname.includes("Seiten/UeberUns/ArtikelTemplate.html")) {
        window.location.href = "../../index.html";
    }
    else {
        window.location.href = "index.html";
    }
});