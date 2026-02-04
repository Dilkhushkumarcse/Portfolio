// TYPING EFFECT (SAFE FOR MULTI-PAGES)
const roles = [
    "Data Scientist",
    "Data Analyst",
    "AI & ML Engineer"
];

let roleIndex = 0;
let charIndex = 0;
const typing = document.querySelector(".typing");

function typeEffect() {
    if (!typing) return;

    if (charIndex === 0) {
        typing.textContent = "";
    }

    if (charIndex < roles[roleIndex].length) {
        typing.textContent += roles[roleIndex][charIndex];
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    if (!typing) return;

    if (charIndex > 0) {
        typing.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 60);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    }
}

typeEffect();
// NAVBAR & MOBILE MENU
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navLinks");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        nav.classList.toggle("show");
    });
}
// SMART NAVIGATION (SCROLL + REDIRECT)
const links = document.querySelectorAll(".nav-links a");
const page = document.getElementById("page-content");

links.forEach(link => {
    link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (nav) nav.classList.remove("show");

        // Same-page smooth scroll
        if (href.startsWith("#")) {
            e.preventDefault();
            const section = document.querySelector(href);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
        // Page redirect with fade
        else if (href.startsWith("/") && page) {
            e.preventDefault();
            page.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = href;
            }, 350);
        }
    });
});
// PROJECT FILTERING (PROJECT PAGE)
const projectFilterBtns = document.querySelectorAll(".filter-btn[data-filter]");
const projects = document.querySelectorAll(".project-card");

projectFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        projectFilterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        projects.forEach(project => {
            project.style.display =
                filter === "all" || project.classList.contains(filter)
                    ? "block"
                    : "none";
        });
    });
});

// CERTIFICATE FILTERING
function filterItems(category, button) {
    const cards = document.querySelectorAll(".certificate-card");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => btn.classList.remove("active"));
    if (button) button.classList.add("active");

    cards.forEach(card => {
        card.style.display =
            category === "all" || card.classList.contains(category)
                ? "block"
                : "none";
    });
}
// CERTIFICATE FULLSCREEN VIEW
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certImage");
const modalPdf = document.getElementById("certPdf");
const closeBtn = document.querySelector(".cert-close");

if (modal && closeBtn) {
    // Image certificates
    document.querySelectorAll(".cert-preview").forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.dataset.full;
            modalImg.style.display = "block";
            modalPdf.style.display = "none";
        });
    });

    // PDF certificates
    document.querySelectorAll(".cert-pdf").forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalPdf.src = img.dataset.pdf;
            modalPdf.style.display = "block";
            modalImg.style.display = "none";
        });
    });

    // Close modal
    closeBtn.onclick = () => {
        modal.style.display = "none";
        modalImg.src = "";
        modalPdf.src = "";
    };

    modal.onclick = (e) => {
        if (e.target === modal) closeBtn.onclick();
    };

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeBtn.onclick();
    });
}
