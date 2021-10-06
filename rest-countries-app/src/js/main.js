// Router
import "./router.js";

// Theme toggle
const themeBtn = document.querySelector("#theme-toggle"),
      html = document.documentElement;

themeBtn.addEventListener("input", () => {
    // Remove transition duration to avoir slow change
    html.style.setProperty("--dur", "0s");
    html.classList.toggle("dark");
    setTimeout(() => html.style.setProperty("--dur", ".1s"), 100);
    localStorage.theme = html.classList.contains("dark") ? "dark" : null;
});