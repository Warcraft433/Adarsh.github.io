/**
 * Portfolio Interaction Logic
 * Handles navigation, scroll animations, and form validation
 */

document.addEventListener('DOMContentLoaded', () => {
    // === Navigation Management ===
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTop = document.querySelector('.scroll-top');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme Management
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'light-theme') {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const icon = themeToggle.querySelector('i');

            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light-theme');
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                localStorage.setItem('theme', 'dark-theme'); // Explicitly set it
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // Sticky Header & Scroll Top Visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            scrollTop.classList.add('scroll-top-active');
        } else {
            scrollTop.classList.remove('scroll-top-active');
        }
    });

    // Mobile Menu Toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close menu when a link is clicked (Mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });


    // === Scroll Reveal Animations ===
    const revealElements = document.querySelectorAll('.reveal, .glass, .skills-category');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // CSS for reveal animation if not already handled in style.css
    // Note: Some are handled in style.css, adding 'active' class triggers them.


    // === Active Link Highlighting (Scroll-Spy) ===
    const sections = document.querySelectorAll('section[id]');

    const navObserverOptions = {
        threshold: 0,
        rootMargin: '-40% 0px -40% 0px' // Detect sections when they cross the center of the viewport
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });


    // === Contact Form Validation & Submission ===
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            // Simple Validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!/^\S+@\S+\.\S+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // UI Feedback
            btn.disabled = true;
            btn.textContent = 'Preparing Email...';
            btn.style.background = 'var(--accent-teal)';
            btn.style.color = '#000';

            // Construct mailto link
            const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoUrl = `mailto:adarsh.official2011@gmail.com?subject=${subject}&body=${body}`;

            setTimeout(() => {
                // Open email client
                window.location.href = mailtoUrl;

                btn.textContent = 'Message Ready!';
                btn.style.background = '#00ff88'; // Success color

                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    contactForm.reset();
                }, 3000);
            }, 1000);
        });
    }

    // Smooth scroll for anchor links (leveraging CSS scroll-padding-top)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            // Check if it's a valid internal link
            if (document.querySelector(targetId)) {
                // If the mobile menu is open, it's already being closed by another listener
                // But we let the browser handle the smooth scroll natively to respect scroll-padding-top
            }
        });
    });
});
