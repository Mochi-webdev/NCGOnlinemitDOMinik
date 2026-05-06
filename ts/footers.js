document.addEventListener("DOMContentLoaded", () => {

    fetch("/components/footer.html")
        .then(res => {
            if (!res.ok) throw new Error("Footer not found");
            return res.text();
        })
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(err => console.error("FOOTER LOAD ERROR:", err));

});