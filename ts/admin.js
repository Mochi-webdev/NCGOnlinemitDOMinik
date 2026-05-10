const loginBtn = document.getElementById("loginBtn");

const USER_HASH =
"8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

const PASS_HASH =
"d7b7214ebcafdc7beccdfc1728683f95c9258c19b33a2a9f6621c2737336b010";

loginBtn.addEventListener("click", async () => {

    const username =
        document.getElementById("Username").value;

    const password =
        document.getElementById("Password").value;

    const usernameHash = await hashText(username);
    const passwordHash = await hashText(password);

    if (
        usernameHash === USER_HASH &&
        passwordHash === PASS_HASH
    ) {

        localStorage.setItem("isAdmin", "true");

        window.location.href =
        "/AdminOrdner/Admin/Dashboard.html#Admin234987s20873kl29820";

    } else {

        alert("Falscher Login");

    }

});

async function hashText(text) {

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashBuffer =
        await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}