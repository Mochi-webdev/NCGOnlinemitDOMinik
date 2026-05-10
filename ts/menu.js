document.addEventListener("DOMContentLoaded", () => {

    fetch("/components/menu.html")
        .then(res => {
            if (!res.ok) throw new Error("Fetch failed");
            return res.text();
        })
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;

            initMenu();
        })
        .catch(err => {
            console.error("MENU LOAD ERROR:", err);
        });

});

function initMenu() {
    const menuButton = document.getElementById("MenuButton");
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");

    console.log(menuButton, sideMenu, overlay);

    if (!menuButton || !sideMenu || !overlay) {
        console.error("Elements not found after load");
        return;
    }

    function toggleMenu() {
        menuButton.classList.toggle("active");
        sideMenu.classList.toggle("active");
        overlay.classList.toggle("active");
    }

    menuButton.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);

    document.querySelectorAll(".menuCategory").forEach(btn => {
        btn.addEventListener("click", () => {

            const parent = btn.parentElement;

        
            document.querySelectorAll(".menuItem.open").forEach(item => {
                if (item !== parent) {
                    item.classList.remove("open");
                }
            });

          
            parent.classList.toggle("open");
        });
    });
}