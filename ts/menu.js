document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("MenuButton");
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");

    function toggleMenu() {
        menuButton.classList.toggle("active");
        sideMenu.classList.toggle("active");
        overlay.classList.toggle("active");
    }

    menuButton.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);

    document.querySelectorAll(".menuCategory").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.parentElement.classList.toggle("open");
        });
    });
});