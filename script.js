/* ============================
   THEME SWITCHER (LIGHT/DARK)
============================ */

const themeBtn = document.getElementById("theme-toggle");

// Load saved theme if exists
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
}

// Toggle theme when button clicked
themeBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});


/* ============================
   BUTTON PRESS ANIMATION
============================ */

const buttons = document.querySelectorAll("button");
buttons.forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(0.95)";
    });
    btn.addEventListener("mouseup", () => {
        btn.style.transform = "scale(1)";
    });
});


/* ============================
   SMOOTH SCROLLING NAV LINKS
============================ */

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        // only scroll if link starts with #
        if (href.startsWith("#")) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/* ============================
   SCROLL ANIMATION (FADE-UP)
============================ */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-up-show");
        }
    });
});

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
