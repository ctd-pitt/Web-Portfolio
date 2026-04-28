document.addEventListener("DOMContentLoaded", function () {
    const videoOverlay = document.getElementById("video-overlay");
    const expandedVideo = document.getElementById("expanded-video");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    // Mobile menu toggle
    mobileMenuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("open");
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => navLinks.classList.remove("open"));
    });

    // Project hover: play/pause video previews
    document.querySelectorAll(".project-card").forEach(card => {
        const video = card.querySelector(".project-preview video");
        if (!video) return;

        card.addEventListener("mouseenter", () => {
            video.currentTime = 0;
            video.play();
        });

        card.addEventListener("mouseleave", () => {
            video.pause();
        });

        // Click on preview video to expand
        video.addEventListener("click", function (e) {
            e.stopPropagation();
            expandedVideo.src = this.src;
            expandedVideo.load();
            videoOverlay.classList.add("active");
            expandedVideo.play();
        });
    });

    // Close expanded video overlay
    videoOverlay.addEventListener("click", function (e) {
        if (e.target === this || e.target === expandedVideo) {
            this.classList.remove("active");
            expandedVideo.pause();
            expandedVideo.removeAttribute("src");
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && videoOverlay.classList.contains("active")) {
            videoOverlay.classList.remove("active");
            expandedVideo.pause();
            expandedVideo.removeAttribute("src");
        }
    });

    // Scroll-based fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    // Add fade-in class to animatable elements
    const animatable = document.querySelectorAll(
        ".timeline-item, .education-card, .project-card, .skill-category, .contact-card"
    );
    animatable.forEach((el, i) => {
        el.classList.add("fade-in");
        el.style.transitionDelay = `${i % 4 * 0.1}s`;
        observer.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        navbar.style.borderBottomColor = window.scrollY > 50
            ? "var(--border)"
            : "transparent";
    });
});
