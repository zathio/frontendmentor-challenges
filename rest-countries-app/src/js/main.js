// Router
import "./router.js";

// Theme toggle
const themeBtn = document.querySelector("#theme-toggle");

themeBtn.addEventListener("input", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : null;
});