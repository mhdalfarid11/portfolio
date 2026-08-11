/* =====================================================
   PORTFOLIO JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    const navToggle = document.getElementById("nav-toggle");
    const navList = document.getElementById("nav-list");

    if (navToggle && navList) {

        navToggle.addEventListener("click", () => {

            const isOpen =
                navList.classList.toggle("open");

            navToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

    }


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const href =
                    link.getAttribute("href");

                if (!href || href === "#") {
                    return;
                }

                const target =
                    document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                if (navList) {
                    navList.classList.remove("open");
                }

            });

        });


    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    const header =
        document.getElementById("header");

    const handleScroll = () => {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();


    /* =================================================
       DARK / LIGHT MODE
    ================================================= */

    const themeToggle =
        document.getElementById("theme-toggle");

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.documentElement
            .setAttribute("data-theme", "dark");

    } else {

        document.documentElement
            .setAttribute("data-theme", "light");

    }

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const current =
                    document.documentElement
                        .getAttribute("data-theme");

                const next =
                    current === "dark"
                        ? "light"
                        : "dark";

                document.documentElement
                    .setAttribute(
                        "data-theme",
                        next
                    );

                localStorage.setItem(
                    "theme",
                    next
                );

                themeToggle.setAttribute(
                    "aria-pressed",
                    String(next === "dark")
                );

            }
        );

    }


    /* =================================================
       PROFILE IMAGE FALLBACK
    ================================================= */

    const profileImg =
        document.getElementById("profile-img");

    if (profileImg) {

        profileImg.addEventListener(
            "error",
            () => {

                if (
                    !profileImg.src.includes(
                        "profile.svg"
                    )
                ) {

                    profileImg.src =
                        "assets/profile.svg";

                }

            }
        );

    }


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".hero, .about-grid, .skill-card, " +
            ".project-card, .timeline-item, " +
            ".contact-grid"
        );

    if ("IntersectionObserver" in window) {

        revealElements.forEach((element) => {

            element.classList.add("js-reveal");

        });

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(
            (element) => {

                revealObserver.observe(element);

            }
        );

    } else {

        /* Browser lama:
           pastikan semua konten tetap terlihat */

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =================================================
       BACK TO TOP
    ================================================= */

    const backBtn =
        document.getElementById(
            "back-to-top"
        );

    const updateBackButton = () => {

        if (!backBtn) {
            return;
        }

        if (window.scrollY > 400) {

            backBtn.style.display = "flex";

        } else {

            backBtn.style.display = "none";

        }

    };

    window.addEventListener(
        "scroll",
        updateBackButton,
        { passive: true }
    );

    updateBackButton();

    if (backBtn) {

        backBtn.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =================================================
       CONTACT FORM
    ================================================= */

    const form =
        document.getElementById(
            "contact-form"
        );

    if (form) {

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const name =
                    form.querySelector(
                        '[name="name"]'
                    );

                const email =
                    form.querySelector(
                        '[name="email"]'
                    );

                const message =
                    form.querySelector(
                        '[name="message"]'
                    );

                if (
                    !name ||
                    !email ||
                    !message
                ) {
                    return;
                }

                if (
                    !name.value.trim() ||
                    !email.value.trim() ||
                    !message.value.trim()
                ) {

                    alert(
                        "Mohon lengkapi semua field."
                    );

                    return;

                }

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    !emailPattern.test(
                        email.value.trim()
                    )
                ) {

                    alert(
                        "Silakan masukkan email yang valid."
                    );

                    return;

                }

                alert(
                    "Pesan berhasil divalidasi."
                );

                form.reset();

            }
        );

    }


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    const updateActiveLink = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >= sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach((link) => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                    "#" + currentSection
            );

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    updateActiveLink();

});