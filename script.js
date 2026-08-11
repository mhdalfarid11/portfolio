/* =========================================================
   MUHAMMAD AL FARID - PORTFOLIO
   Native JavaScript
   ========================================================= */


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navToggle = document.getElementById("nav-toggle");
    const navList = document.getElementById("nav-list");
    const header = document.getElementById("header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = Array.from(document.querySelectorAll("main section"));

    const form = document.getElementById("contact-form");
    const backBtn = document.getElementById("back-to-top");

    const themeToggle = document.getElementById("theme-toggle");
    const profileImg = document.getElementById("profile-img");

    const root = document.documentElement;


    /* =====================================================
       ENABLE JAVASCRIPT ANIMATION
       ===================================================== */

    root.classList.add("js-ready");


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    if (navToggle && navList) {

        navToggle.addEventListener("click", () => {

            const open = navList.classList.toggle("open");

            navToggle.setAttribute(
                "aria-expanded",
                String(open)
            );

        });

    }


    /* =====================================================
       SMOOTH SCROLLING
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

            /* Close mobile navigation */

            if (navList) {
                navList.classList.remove("open");
            }

            if (navToggle) {
                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    function handleScroll() {

        if (header) {

            if (window.scrollY > 10) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        }

        updateActiveLink();
        backToTopVisibility();

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    function updateActiveLink() {

        if (!sections.length) {
            return;
        }

        const offset = window.innerHeight / 3;

        let currentSection = sections.find(
            (section) =>
                section.getBoundingClientRect().top - offset < 0
        );

        if (!currentSection) {
            currentSection = sections[0];
        }

        navLinks.forEach((link) => {

            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection.id}`
            );

        });

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".hero, .about-grid, .skill-card, .project-card, .timeline-item, .contact-grid"
    );


    revealElements.forEach((element) => {

        element.classList.add("scroll-reveal");

    });


    /* =====================================================
       INTERSECTION OBSERVER
       ===================================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        /* Browser fallback */

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    if (form) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            const name = form.name
                ? form.name.value.trim()
                : "";

            const email = form.email
                ? form.email.value.trim()
                : "";

            const message = form.message
                ? form.message.value.trim()
                : "";


            if (!name || !email || !message) {

                alert(
                    "Mohon lengkapi semua field sebelum mengirim."
                );

                return;

            }


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Silakan masukkan alamat email yang valid."
                );

                return;

            }


            alert(
                "Pesan tervalidasi. Pesan siap dikirim."
            );


            form.reset();

        });

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    function backToTopVisibility() {

        if (!backBtn) {
            return;
        }

        if (window.scrollY > 400) {

            backBtn.style.display = "flex";

        } else {

            backBtn.style.display = "none";

        }

    }


    if (backBtn) {

        backBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       DARK / LIGHT MODE
       ===================================================== */

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        root.setAttribute(
            "data-theme",
            "dark"
        );

        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-pressed",
                "true"
            );

        }

    } else {

        root.setAttribute(
            "data-theme",
            "light"
        );

        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const currentTheme =
                root.getAttribute("data-theme");

            const nextTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";


            root.setAttribute(
                "data-theme",
                nextTheme
            );


            localStorage.setItem(
                "theme",
                nextTheme
            );


            themeToggle.setAttribute(
                "aria-pressed",
                String(nextTheme === "dark")
            );

        });

    }


    /* =====================================================
       PROFILE IMAGE FALLBACK
       ===================================================== */

    if (profileImg) {

        profileImg.addEventListener(
            "error",
            () => {

                if (
                    !profileImg.src.endsWith(
                        "profile.svg"
                    )
                ) {

                    profileImg.src =
                        "assets/profile.svg";

                }

            }
        );

    }


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    handleScroll();


    /* =====================================================
       SCROLL EVENT
       ===================================================== */

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

});