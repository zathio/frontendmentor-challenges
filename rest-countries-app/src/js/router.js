import home from "./views/home.js";
import detail from "./views/detail.js";

const app = document.querySelector("#app");

function router() {
    document.title = location.pathname.split("/")[1] || "Countries App";
    location.pathname === "/" ? home(app) : detail(app);
};

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.matches("a[data-country]")) {
        e.preventDefault();
        history.pushState("", "", e.target.href);
    }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);