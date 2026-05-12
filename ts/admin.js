const loginBtn = document.getElementById("loginBtn");


const USER_HASH = "c1c224b03cd9bc7b6a86d77f5dace40191766c485cd55dc48caf9ac873335d6f";


const PASS_HASH = "995c9a059530ffb222077555d5429a1325800fb928c82a29159cc27162d93c74";
loginBtn.addEventListener("click", async () => {
  
    const username = document.getElementById("Username").value.trim();
    const password = document.getElementById("Password").value.trim();

    const usernameHash = await hashText(username);
    const passwordHash = await hashText(password);


    if (usernameHash === USER_HASH && passwordHash === PASS_HASH) {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "/AdminOrdner/Admin/Dashboard.html#Admin234987s20873kl29820";
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
