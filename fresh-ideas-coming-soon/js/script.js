// ============ PAGE LOAD ============
document.addEventListener('DOMContentLoaded', () => {
    initializeLoader();
    initializeCursor();
    initializeEmailJS();
    initializeNavigation();
    initializeCarousel();
    initializePortfolioFilter();
    initializeContactForm();
    initializeSmoothScroll();
});

// ============ EMAILJS INITIALIZATION ============
function initializeEmailJS() {
    // Initialize EmailJS 
    emailjs.init({
        publicKey: '-eyeyCsZ8GKCkGWvQ', // Replace with your actual Public Key
        blockHeadless: true,
        limitRate: {
            id: 'app',
            throttle: 300
        }
    });
    
    console.log('EmailJS initialized successfully');
}

// ============ NAVIGATION ============
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            
            // Set active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Set active link on page load
    const currentPage = window.location.pathname;
    const currentHash = window.location.hash;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (currentHash && href === currentHash) {
            link.classList.add('active');
            return;
        }

        if ((currentPage.includes(href) && href !== '/') || 
            (currentPage.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============ CLIENTS CAROUSEL ============
function initializeCarousel() {
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    const clientsWrapper = document.getElementById('clientsWrapper');

    if (!leftArrow || !rightArrow || !clientsWrapper) return;

    let scrollPosition = 0;
    const scrollAmount = 200;
    const maxScroll = clientsWrapper.scrollWidth - clientsWrapper.parentElement.offsetWidth;

    leftArrow.addEventListener('click', () => {
        scrollPosition = Math.max(scrollPosition - scrollAmount, 0);
        clientsWrapper.style.transform = `translateX(-${scrollPosition}px)`;
        clientsWrapper.style.animation = 'none';
        updateArrowState();
    });

    rightArrow.addEventListener('click', () => {
        scrollPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
        clientsWrapper.style.transform = `translateX(-${scrollPosition}px)`;
        clientsWrapper.style.animation = 'none';
        updateArrowState();
    });

    function updateArrowState() {
        leftArrow.disabled = scrollPosition === 0;
        rightArrow.disabled = scrollPosition >= maxScroll;
        leftArrow.style.opacity = scrollPosition === 0 ? '0.5' : '1';
        rightArrow.style.opacity = scrollPosition >= maxScroll ? '0.5' : '1';
    }

    updateArrowState();
}

// ============ PORTFOLIO FILTER ============
function initializePortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const isMatch = filterValue === 'all' || item.getAttribute('data-category') === filterValue;
                
                if (isMatch) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============ CONTACT FORM ============
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        const formMessage = document.getElementById('formMessage');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        // Validation
        if (!name) {
            showMessage('Please enter your name', 'error', formMessage);
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error', formMessage);
            return;
        }

        if (!service) {
            showMessage('Please select a service', 'error', formMessage);
            return;
        }

        if (!message || message.length < 10) {
            showMessage('Please enter a message (at least 10 characters)', 'error', formMessage);
            return;
        }

        // Disable button and show loading state
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '⏳ Sending...';
        submitButton.disabled = true;

        try {
            // Prepare email parameters
            const templateParams = {
                to_email: 'sabelontshani380@gmail.com', // Change this to your email
                to_name: 'Fresh Ideas Team',
                from_name: name,
                from_email: email,
                phone: phone || 'Not provided',
                service: service,
                message: message,
                reply_to: email
            };

            // Send email using EmailJS
            const response = await emailjs.send(
                'service_bc64j0e', // Replace with YOUR_SERVICE_ID
                'template_emrwd3b', // Replace with YOUR_TEMPLATE_ID
                templateParams
            );

            if (response.status === 200) {
                console.log('✓ Email sent successfully!', response);
                showMessage('✓ Thank you! Your message has been sent successfully. We\'ll be in touch within 24 hours!', 'success', formMessage);
                contactForm.reset();
                
                // Reset button
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);

                // Clear message after 6 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 6000);
            }
        } catch (error) {
            console.error('❌ Error sending email:', error);
            showMessage('✗ Failed to send message. Please try again or contact us directly at info@freshideas.com', 'error', formMessage);
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// ============ VALIDATION HELPERS ============
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type, element) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.animation = 'slideInUp 0.5s ease';
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// ============ SMOOTH SCROLL ============
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                }
            }
        });
    });
}

// ============ LOADER & CURSOR ============
function initializeLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    document.body.classList.add('no-scroll');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hide');
            document.body.classList.remove('no-scroll');
        }, 600);

        loader.addEventListener('animationend', () => {
            if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, { once: true });
    });
}

function initializeCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;

    window.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;

        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        follower.style.left = `${x}px`;
        follower.style.top = `${y}px`;
    });

    document.querySelectorAll('a, button, .cta-button, .nav-link').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            follower.classList.add('cursor-hover');
        });

        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            follower.classList.remove('cursor-hover');
        });
    });
}

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
    document.body.style.animation = 'none';
    
    // Trigger animations for elements in view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .value-card, .testimonial-card, .team-member').forEach(el => {
        observer.observe(el);
    });
});

// ============ SCROLL ANIMATIONS ============
function handleScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
}

// ============ PERFORMANCE OPTIMIZATION ============
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-slow', 'none');
    document.documentElement.style.setProperty('--transition-bounce', 'none');
}

// ============ CONSOLE MESSAGE ============
console.log('%c🚀 Fresh Ideas - Professional Digital Agency', 
    'font-size: 16px; color: #73BD6A; font-weight: bold;');
console.log('%c✨ Premium Web Experience | Branding | Photography | IT Solutions', 
    'font-size: 12px; color: #8FD180; font-weight: 600;');

// ============ UTILITY FUNCTIONS ============
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============ WINDOW RESIZE HANDLER ============
window.addEventListener('resize', debounce(() => {
    console.log('Window resized');
}, 250));

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit contact form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.dispatchEvent(new Event('submit'));
        }
    }

    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    }
});

// ============ PARALLAX EFFECT ============
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', throttle(() => {
        parallaxElements.forEach(el => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = el.offsetTop;
            const distance = scrollPosition - elementOffset;
            const percentage = distance * 0.5;
            
            el.style.transform = `translateY(${percentage}px)`;
        });
    }, 10));
}

document.addEventListener('DOMContentLoaded', initializeParallax);

// ============ ACTIVE PAGE INDICATOR ============
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ============ RESPONSIVE BEHAVIOR ============
let isMobile = window.innerWidth <= 768;

window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
        isMobile = newIsMobile;
        console.log('Mobile mode:', isMobile);
    }
});

// ============ PERFORMANCE MONITORING ============
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('📊 Page Load Time: ' + pageLoadTime + 'ms');
    });
}



// ============ LOADER ============
function initLoader() {
    const loader = $('#loader');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
            initHeroCounters();
        }, 2200);
    });

    // Fallback
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
    }, 4000);
}

// =========================================
// SMOOTH INFINITE CLIENT LOGO LOOP
// =========================================

const clientsInner = document.getElementById("clientsInner");

let isPaused = false;

clientsInner.addEventListener("mouseenter", () => {
    isPaused = true;
});

clientsInner.addEventListener("mouseleave", () => {
    isPaused = false;
});

// OPTIONAL PARALLAX FEEL
document.addEventListener("mousemove", (e) => {

    const moveX = (window.innerWidth / 2 - e.clientX) / 120;

    clientsInner.style.transform = `
        translateX(${moveX}px)
    `;
});

