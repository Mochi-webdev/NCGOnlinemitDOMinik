setInterval(() => {
    const logo = document.getElementById("NCGLogo");  
      if (logo) {
         logo.addEventListener("click", () => {
            window.location.href = "/index.html";
         });
      }
}, 1000);