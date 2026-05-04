document.addEventListener("DOMContentLoaded", () => {


    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.getElementById("dots");

    let currentIndex = 0;

    function updateSlider() {
        slides.forEach((s, i) => s.classList.toggle("active", i === currentIndex));
        dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
    }

   
    const dots = [];

    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");

        dot.addEventListener("click", () => {
            currentIndex = i;
            updateSlider();
        });

        dotsContainer.appendChild(dot);
        dots.push(dot);
    });

   
    document.getElementById("nextBtn").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    document.getElementById("prevBtn").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 5000);

    updateSlider();
});