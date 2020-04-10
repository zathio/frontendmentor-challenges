var hamburgerIcon = document.getElementById("hamburger");
var mobileNavOverlay = document.getElementById("overlay");

function mobileNav() {
    mobileNavOverlay.classList.toggle("hide");
    if (mobileNavOverlay.classList.contains("hide")) {
        hamburgerIcon.src = "images/icon-hamburger.svg";
    } else {
        hamburgerIcon.src = "images/icon-close.svg";
    }
}