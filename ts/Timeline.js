const items = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

items.forEach(item => observer.observe(item));
document.querySelectorAll(".timeline-content").forEach(item => {
    item.addEventListener("click", () => {

      
        document.querySelectorAll(".timeline-content").forEach(el => {
            if (el !== item) el.classList.remove("open");
        });

        item.classList.toggle("open");
    });
});