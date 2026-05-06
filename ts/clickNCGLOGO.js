setTimeout(() => {

    const logo = document.getElementById("NCGLogo");

    if (!logo) {
        console.log("Logo not found");
        return;
    }

    logo.addEventListener("click", () => {

        const isAdmin = window.location.hash === "#Admin234987s20873kl29820";

        if (isAdmin) {
            window.location.href = "/AdminOrdner/Admin/Dashboard.html#Admin234987s20873kl29820";
        } else {
            window.location.href = "/index.html";
        }

    });

}, 500);