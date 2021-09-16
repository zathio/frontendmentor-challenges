// Router
import "./router.js";

// Theme toggle
const themeBtn = document.querySelector("#theme-toggle");

themeBtn.addEventListener("input", () => {
    // Remove transition duration to avoir slow change
    document.documentElement.style.setProperty("--dur", "0s");
    document.documentElement.classList.toggle("dark");
    setTimeout(() => {
        document.documentElement.style.setProperty("--dur", ".1s");
    }, 100);
    localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : null;
});