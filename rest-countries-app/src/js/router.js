import home from "./views/home.js";
import detail from "./views/detail.js";

const routes = {
    "/": { title: "Home", render: home },
    "/detail": { title: "Detail", render: detail },
};

const app = document.querySelector("#app");

function router() {
    let view = routes[location.pathname];

    if (view) {
        view.render(app);
        document.title = view.title;
    } else {
        history.replaceState("", "", "/");
        router();
    }
};

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.matches("a[data-country]")) {
        e.preventDefault();
        history.pushState("", "", e.target.href);
        router();
    }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);