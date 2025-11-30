document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger to X (optional, can add CSS for this later)
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Chat Widget Logic
    const chatPopup = document.querySelector('.chat-popup');
    const chatBtn = document.querySelector('.chat-btn');
    const chatClose = document.querySelector('.chat-close');

    if (chatPopup && chatBtn) {
        // Show popup after 2 seconds
        setTimeout(() => {
            chatPopup.classList.add('active');
        }, 2000);

        // Toggle popup on button click
        chatBtn.addEventListener('click', () => {
            chatPopup.classList.toggle('active');
        });

        // Close button
        if (chatClose) {
            chatClose.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the toggle
                chatPopup.classList.remove('active');
            });
        }
    }

    // Number Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;

        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target;
                    // Add '+' if needed
                    if (stat.getAttribute('data-plus') === 'true') {
                        stat.innerText += '+';
                    }
                }
            };
            updateCount();
        });
        hasAnimated = true;
    }

    // Trigger animation when stats section is in view
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
            }
        });
        observer.observe(statsSection);
    }
});
