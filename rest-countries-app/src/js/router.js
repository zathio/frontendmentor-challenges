import home from "./views/home.js";
import detail from "./views/detail.js";

const app = document.querySelector("#app"),
      formatTitle = str => decodeURI(str.charAt(0).toUpperCase() + str.slice(1));

function router() {
    location.pathname === "/" ? home(app) : detail(app);
    document.title = formatTitle(location.pathname.split("/")[1]) || "Countries App";
    history.replaceState("", "", document.title);
};

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.closest("a[data-link]")) {
        e.preventDefault();
        history.replaceState("", "", e.target.closest("a[data-link]").href);
        router();
    }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);