import home from "./views/home.js";
import detail from "./views/detail.js";

const app = document.querySelector("#app");

function router() {
    document.title = decodeURI(location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2)) || "Countries App";
    location.pathname === "/" ? home(app) : (detail(app), history.replaceState("", "", document.title));
};

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.closest("a[data-link]")) {
        e.preventDefault();
        history.pushState("", "", e.target.closest("a[data-link]").href);
        router();
    }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);