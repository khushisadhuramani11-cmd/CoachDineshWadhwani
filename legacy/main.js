// Main JS - Interactions and Animations

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open'); // Add/Remove open class for potential icon animation
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('open');
        });
    });

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            navbar.style.padding = '1rem 0';
        }

        // Parallax Effect for Hero
        const heroContent = document.querySelector('.hero-content');
        const videoBg = document.querySelector('.video-background');
        if (heroContent && videoBg) {
            const scrollValue = window.scrollY;
            heroContent.style.transform = `translateY(${scrollValue * 0.4}px)`;
            videoBg.style.transform = `translateY(${scrollValue * 0.2}px)`;
        }
    });

    // 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ============================================
    // STACKING CARDS — Scroll-Driven Animation
    // ============================================
    initStackingCards();
});


function initStackingCards() {
    const containers = document.querySelectorAll('[data-stacking-container], .approach-grid');
    if (containers.length === 0) return;

    containers.forEach(container => {
        const isApproach = container.classList.contains('approach-grid');
        const cardClass = isApproach ? '.approach-card' : '.stacking-card';
        const innerClass = isApproach ? '.approach-card-inner' : '.stacking-card-inner';

        const stackingCards = container.querySelectorAll(cardClass);
        if (stackingCards.length === 0) return;

        const totalCards = stackingCards.length;

        // Apply background colors and initial top offsets
        stackingCards.forEach((card, i) => {
            const inner = card.querySelector(innerClass);
            if (!inner) return;

            // For approach cards, use white background by default if not specified
            if (!isApproach) {
                const color = card.dataset.cardColor || '#333';
                inner.style.backgroundColor = color;
            }

            // Offset each card slightly lower so stacked cards peek
            // For approach cards, we let them stack fully or with a small offset
            const offset = isApproach ? i * 20 : i * 25;
            inner.style.top = `calc(-5vh + ${offset}px)`;
        });

        // Scroll handler
        let ticking = false;

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateCards);
                ticking = true;
            }
        }

        function updateCards() {
            ticking = false;

            if (window.innerWidth <= 900) {
                stackingCards.forEach(card => {
                    const inner = card.querySelector(innerClass);
                    const imgWrap = card.querySelector('.stacking-card-img-wrap');
                    if (inner) inner.style.transform = '';
                    if (imgWrap) imgWrap.style.transform = '';
                });
                return;
            }

            const wrapRect = container.getBoundingClientRect();
            const wrapTop = wrapRect.top;
            const wrapHeight = wrapRect.height;
            const windowHeight = window.innerHeight;

            const scrollTotal = wrapHeight - windowHeight;
            const scrolled = -wrapTop;
            const scrollYProgress = Math.min(Math.max(scrolled / (scrollTotal || 1), 0), 1);

            stackingCards.forEach((card, i) => {
                const inner = card.querySelector(innerClass);
                if (!inner) return;

                const imgWrap = card.querySelector('.stacking-card-img-wrap');

                // --- Scale animation ---
                const targetScale = Math.max(0.6, 1 - (totalCards - i - 1) * 0.08); // Match React component scaling logic
                const rangeStart = i * (1 / totalCards);
                const rangeEnd = 1;

                let progress = 0;
                if (scrollYProgress >= rangeEnd) {
                    progress = 1;
                } else if (scrollYProgress <= rangeStart) {
                    progress = 0;
                } else {
                    progress = (scrollYProgress - rangeStart) / (rangeEnd - rangeStart);
                }

                const scale = 1 + (targetScale - 1) * progress;
                inner.style.transform = `scale(${scale})`;

                // --- Image zoom effect (for offerings only) ---
                if (imgWrap && !isApproach) {
                    const cardRect = card.getBoundingClientRect();
                    const cardCenter = cardRect.top + cardRect.height / 2;
                    const entryProgress = Math.min(Math.max(1 - (cardCenter / windowHeight), 0), 1);
                    const imageScale = 2 - entryProgress;
                    imgWrap.style.transform = `scale(${Math.max(imageScale, 1)})`;
                }
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        updateCards();
    });
}
