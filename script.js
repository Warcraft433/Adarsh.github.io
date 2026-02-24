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
    // === Certifications & Training Logic ===
    const certGrid = document.getElementById('cert-grid');
    const certTabs = document.querySelectorAll('.cert-tab-btn');

    const certificates = [
        // Workshops
        {
            title: "Master Backtracking Masterclass",
            org: "Scaler",
            year: "2025",
            category: "Workshops",
            image: "assets/certificates/AdarshA_Scaler_MasterBacktracking_Masterclass_2025.jpg",
            icon: "fas fa-code-branch"
        },
        {
            title: "Data Science & Machine Learning Workshop",
            org: "Techosa",
            year: "2022",
            category: "Workshops",
            image: "assets/certificates/AdarshA_Techosa_DataScience_MachineLearning_Workshop_2022.jpg",
            icon: "fas fa-brain"
        },
        {
            title: "Embedded Systems & Robotics Workshop",
            org: "Techosa",
            year: "2022",
            category: "Workshops",
            image: "assets/certificates/AdarshA_Techosa_EmbeddedSystems_Robotics_Workshop_2022.jpg",
            icon: "fas fa-microchip"
        },
        {
            title: "Ethical Hacking / Cybersecurity Workshop",
            org: "HackingFlix",
            year: "2024",
            category: "Workshops",
            image: "assets/certificates/AdarshA_HackingFlix_EthicalHacking_Workshop_2024.png",
            icon: "fas fa-user-shield"
        },
        {
            title: "Resume & LinkedIn Creation Workshop",
            org: "IEEE",
            year: "2025",
            category: "Workshops IEEE",
            image: "assets/certificates/AdarshA_IEEE_Resume_LinkedIn_Workshop_2025.jpg",
            icon: "fab fa-linkedin"
        },
        {
            title: "Web Development Workshop",
            org: "ICFOSS",
            year: "2024",
            category: "Workshops",
            image: "assets/certificates/AdarshA_ICFOSS_WebDevelopment_Workshop_2024.jpg",
            icon: "fas fa-laptop-code"
        },
        {
            title: "ECE / BSNL Workshop",
            org: "Sidhanta '23",
            year: "2023",
            category: "Workshops",
            image: "assets/certificates/AdarshA_Sidhanta_Workshop_2023.jpg",
            icon: "fas fa-broadcast-tower"
        },
        {
            title: "IMPACT 2023 Event",
            org: "Chrysalis",
            year: "2023",
            category: "Workshops",
            image: "assets/certificates/AdarshA_Chrysalis_IMPACT_Event_Participation_2023.jpg",
            icon: "fas fa-award"
        },
        {
            title: "Startup & Innovation Conclave",
            org: "IEDC",
            year: "2025",
            category: "Workshops",
            image: "assets/certificates/AdarshA_IEDC_Startup_Innovation_Conclave_2025.jpg",
            icon: "fas fa-lightbulb"
        },
        // Bootcamps
        {
            title: "Data Science with Python Bootcamp",
            org: "LetsUpgrade",
            year: "2024",
            category: "Bootcamps",
            image: "assets/certificates/AdarshA_LetsUpgrade_DataScience_Python_Bootcamp_2024.jpg",
            icon: "fab fa-python"
        },
        {
            title: "Flutter Bootcamp",
            org: "LetsUpgrade",
            year: "2024",
            category: "Bootcamps",
            image: "assets/certificates/AdarshA_LetsUpgrade_Flutter_Bootcamp_2024.jpg",
            icon: "fas fa-mobile-alt"
        },
        // Internships
        {
            title: "Python & Web Design Internship",
            org: "CodeDesign Technologies",
            year: "2024 (7 Days)",
            category: "Internships",
            image: "assets/certificates/AdarshA_Python_WebDesign_Internship_CodeDesign_2024.jpg",
            icon: "fas fa-file-code"
        },
        {
            title: "Python & Data Science Internship",
            org: "Srishti / Technopark",
            year: "2024 (1 Week)",
            category: "Internships",
            image: "assets/certificates/AdarshA_Python_DataScience_Internship_Srishti_2024.jpg",
            icon: "fas fa-database"
        },
        // Govt / Institutional
        {
            title: "Industrial Training on Fiber Optics",
            org: "BSNL",
            year: "2025",
            category: "Govt",
            image: "assets/certificates/AdarshA_BSNL_FiberOptics_IndustrialTraining_2025.jpg",
            icon: "fas fa-network-wired"
        },
        {
            title: "Machine Learning Vocational Training",
            org: "NSDC / Skill India",
            year: "2025",
            category: "Govt",
            image: "assets/certificates/AdarshA_NSRC_MachineLearning_VocationalTraining_2025.jpg",
            icon: "fas fa-robot"
        },
        {
            title: "Machine Learning Workshop",
            org: "ICFOSS / Govt of Kerala",
            year: "2025",
            category: "Govt",
            image: "assets/certificates/AdarshA_ICFOSS_MachineLearningWorkshop_2025.jpg",
            icon: "fas fa-university"
        },
        // IEEE
        {
            title: "Resume & LinkedIn Creation Workshop",
            org: "IEEE",
            year: "2025",
            category: "IEEE",
            image: "assets/certificates/AdarshA_IEEE_Resume_LinkedIn_Workshop_2025.jpg",
            icon: "fab fa-linkedin"
        },
        // NPTEL
        {
            title: "Programming in Java",
            org: "NPTEL",
            year: "2024",
            category: "NPTEL",
            image: "assets/certificates/AdarshA_NPTEL_ProgrammingInJava_2024.jpg",
            icon: "fab fa-java"
        }
    ];

    function renderCertificates(filter) {
        if (!certGrid) return;

        certGrid.innerHTML = '';
        const filteredCerts = certificates.filter(cert => cert.category.includes(filter));

        filteredCerts.forEach(cert => {
            const card = document.createElement('div');
            card.className = 'cert-card glass';
            card.innerHTML = `
                <div class="cert-icon"><i class="${cert.icon}"></i></div>
                <div class="cert-content">
                    <h3 class="cert-org">${cert.org}</h3>
                    <h3>${cert.title}</h3>
                    <p class="cert-year">${cert.year}</p>
                </div>
                <a href="${cert.image}" target="_blank" class="btn btn-secondary cert-view-btn">View Certificate</a>
            `;
            certGrid.appendChild(card);
        });
    }

    if (certTabs.length > 0) {
        certTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                certTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');
                // Render certificates for selected category
                renderCertificates(tab.getAttribute('data-category'));
            });
        });

        // Initial render
        renderCertificates('Workshops');
    }
});
