document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       STICKY HEADER
       ========================================= */
    const header = document.getElementById('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =========================================
       THEME TOGGLE (DARK MODE)
       ========================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const getCurrentTheme = () => body.classList.contains('dark-theme') ? 'dark' : 'light';
    const getSelectedTheme = () => localStorage.getItem('selected-theme');

    if (getSelectedTheme() === 'dark') {
        body.classList.add('dark-theme');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
        lucide.createIcons();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const theme = getCurrentTheme();
            
            if (themeIcon) {
                if (theme === 'dark') {
                    themeIcon.setAttribute('data-lucide', 'sun');
                } else {
                    themeIcon.setAttribute('data-lucide', 'moon');
                }
            }
            
            localStorage.setItem('selected-theme', theme);
            lucide.createIcons();
        });
    }

    /* =========================================
       RTL TOGGLE
       ========================================= */
    const rtlToggle = document.getElementById('rtl-toggle');
    const rtlLink = document.getElementById('rtl-link');
    const html = document.documentElement;

    const getSelectedDir = () => localStorage.getItem('selected-dir');

    if (getSelectedDir() === 'rtl') {
        html.setAttribute('dir', 'rtl');
        if (rtlLink) rtlLink.removeAttribute('disabled');
        if (rtlToggle && rtlToggle.querySelector('span')) {
            rtlToggle.querySelector('span').textContent = 'ltr';
        }
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isRtl = html.getAttribute('dir') === 'rtl';
            
            if (isRtl) {
                html.setAttribute('dir', 'ltr');
                if (rtlLink) rtlLink.setAttribute('disabled', 'true');
                if (rtlToggle.querySelector('span')) rtlToggle.querySelector('span').textContent = 'rtl';
                localStorage.setItem('selected-dir', 'ltr');
            } else {
                html.setAttribute('dir', 'rtl');
                if (rtlLink) rtlLink.removeAttribute('disabled');
                if (rtlToggle.querySelector('span')) rtlToggle.querySelector('span').textContent = 'ltr';
                localStorage.setItem('selected-dir', 'rtl');
            }
        });
    }

    /* =========================================
       MOBILE NAVIGATION TOGGLE
       ========================================= */
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn-signup');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    /* =========================================
       SCROLL REVEAL ANIMATION
       ========================================= */
    const revealElements = document.querySelectorAll('section, .case-card, .process-step, .strength-item');

    // Add 'reveal' class to elements initially
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();

    window.addEventListener('scroll', revealOnScroll);

    /* =========================================
       FORM SUBMISSION (PREVENT DEFAULT)
       ========================================= */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! This is a demo. In a real application, your message would be sent.');
            contactForm.reset();
        });
    }

    /* =========================================
       SMOOTH SCROLLING FOR ALL ANCHORS
       ========================================= */
    document.querySelectorAll('a[href^="#"]:not([target="_blank"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================
       ACTIVE MENU HIGHLIGHT ON SCROLL
       ========================================= */
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLinks = document.querySelectorAll(`.nav-list a[href*="${sectionId}"]`);

            navLinks.forEach(navLink => {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            });
        });
    };

    window.addEventListener('scroll', scrollActive);
    scrollActive(); // Initial call

    /* =========================================
       SCROLL TO TOP
       ========================================= */
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
