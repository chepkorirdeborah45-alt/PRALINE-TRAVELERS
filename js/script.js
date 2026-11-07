
/* =========================================
   PRALINE TRAVELERS
   NAVIGATION FUNCTIONALITY
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    // =====================================
    // 1. SELECT HTML ELEMENTS
    // =====================================

    const menuToggle = document.getElementById("menuToggle");

    const navLinks = document.getElementById("navLinks");


    // =====================================
    // 2. OPEN AND CLOSE MOBILE MENU
    // =====================================

    menuToggle.addEventListener("click", function () {

        // Toggle hamburger animation
        menuToggle.classList.toggle("active");

        // Toggle navigation visibility
        navLinks.classList.toggle("active");


        // Update accessibility attributes
        const isExpanded = menuToggle.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isExpanded);

        menuToggle.setAttribute(
            "aria-label",
            isExpanded
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    // =====================================
    // 3. CLOSE MENU WHEN LINK IS CLICKED
    // =====================================

    const navigationLinks = navLinks.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            menuToggle.classList.remove("active");

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    // =====================================
    // 4. CLOSE MENU USING ESCAPE KEY
    // =====================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            menuToggle.classList.remove("active");

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


    // =====================================
    // 5. RESET MENU ON DESKTOP RESIZE
    // =====================================

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

            menuToggle.classList.remove("active");

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


});
