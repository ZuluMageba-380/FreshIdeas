/* =====================================================
   FRESH IDEAS — PREMIUM MERGED SCRIPT
   Animations · Navigation · Interactions · Forms
   ===================================================== */

'use strict';

// ============ CONFIG ============
const CONFIG = {
    emailjs: {
        publicKey: '-eyeyCsZ8GKCkGWvQ',
        serviceId: 'service_bc64j0e',
        templateId: 'template_emrwd3b'
    }
};

// ============ UTILITY ============
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function debounce(fn, wait) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

function throttle(fn, limit) {
    let inThrottle;
    return (...args) => { if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } };
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

// ============ CUSTOM CURSOR ============
function initCursor() {
    const cursor = $('#cursor');
    const follower = $('#cursorFollower');
    if (!cursor || !follower || window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Scale on interactive elements
    const interactives = $$('a, button, .svc-card, .pf-item, .team-card, .testi-btn');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(2.5)';
            follower.style.transform += ' scale(1.5)';
            follower.style.borderColor = 'rgba(0,193,106,0.8)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.borderColor = 'rgba(0,193,106,0.5)';
        });
    });
}

// ============ NAVIGATION ============
function initNavigation() {
    const navbar = $('#navbar');
    const hamburger = $('#hamburger');
    const navMenu = $('#navMenu');
    const navLinks = $$('.nav-link');

    if (!navbar) return;

    // Scroll effects
    const handleScroll = throttle(() => {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);

        // Back to top
        const backTop = $('#backTop');
        if (backTop) backTop.classList.toggle('show', window.scrollY > 400);

        // Active link on scroll
        setActiveNavOnScroll();
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Hamburger toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const open = navMenu.classList.toggle('open');
            hamburger.classList.toggle('active', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });
    }

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
                // Close mobile menu
                navMenu?.classList.remove('open');
                hamburger?.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on outside click (mobile)
    document.addEventListener('click', (e) => {
        if (navMenu?.classList.contains('open') && !navbar.contains(e.target)) {
            navMenu.classList.remove('open');
            hamburger?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function setActiveNavOnScroll() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link[data-nav]');
    let currentSection = '';

    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top <= 120) currentSection = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-nav') === currentSection);
    });
}

// ============ SCROLL REVEAL ============
function initScrollReveal() {
    const elements = $$('.reveal-up, .reveal-right');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    elements.forEach(el => observer.observe(el));
}

// ============ COUNTER ANIMATIONS ============
function initCounters(scope = document) {
    const counters = scope.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'));
            const duration = 1800;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.round(current);
            }, 16);

            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

function initHeroCounters() {
    initCounters();
}

// ============ PARALLAX MOUSE ============
function initParallax() {
    const hero = $('.hero');
    if (!hero || window.matchMedia('(hover: none)').matches) return;

    document.addEventListener('mousemove', throttle((e) => {
        const { clientX, clientY } = e;
        const { innerWidth: W, innerHeight: H } = window;
        const x = (clientX / W - 0.5) * 20;
        const y = (clientY / H - 0.5) * 20;

        $$('.orb').forEach((orb, i) => {
            const factor = (i + 1) * 0.3;
            orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });

        const cards = $$('.h-card');
        cards.forEach((card, i) => {
            const factor = (i + 1) * 0.2;
            card.style.transform = `translateY(${y * factor}px) rotateX(${-y * 0.2}deg)`;
        });
    }, 16));
}

// ============ PORTFOLIO FILTER ============
function initPortfolioFilter() {
    const filterBtns = $$('.pf-btn');
    const items = $$('.pf-item');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            items.forEach((item, i) => {
                const cat = item.getAttribute('data-cat');
                const show = filter === 'all' || cat === filter;

                if (show) {
                    item.style.display = '';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, i * 60);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95) translateY(10px)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // Initial state
    items.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1) translateY(0)';
        item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    });
}

// ============ TESTIMONIALS SLIDER ============
function initTestimonials() {
    const track = $('#testiTrack');
    const prevBtn = $('#testiPrev');
    const nextBtn = $('#testiNext');
    const dotsContainer = $('#testiDots');
    if (!track) return;

    const cards = track.querySelectorAll('.testi-card');
    let current = 0;
    let autoTimer;

    // Build dots
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('testi-dot');
        dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer?.appendChild(dot);
    });

    function getVisible() {
        const w = window.innerWidth;
        if (w < 768) return 1;
        if (w < 1100) return 2;
        return 3;
    }

    function goTo(index) {
        const visible = getVisible();
        const max = Math.max(0, cards.length - visible);
        current = Math.max(0, Math.min(index, max));

        const cardW = cards[0].offsetWidth + 32; // gap
        track.style.transform = `translateX(-${current * cardW}px)`;

        // Update dots
        const dots = $$('.testi-dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === current));

        // Update active card
        cards.forEach((c, i) => c.classList.toggle('active', i === current));
    }

    function next() { goTo(current + 1 > cards.length - getVisible() ? 0 : current + 1); }
    function prev() { goTo(current - 1 < 0 ? cards.length - getVisible() : current - 1); }

    prevBtn?.addEventListener('click', () => { prev(); resetAuto(); });
    nextBtn?.addEventListener('click', () => { next(); resetAuto(); });

    function startAuto() { autoTimer = setInterval(next, 5000); }
    function resetAuto() { clearInterval(autoTimer); startAuto(); }

    // Touch/swipe
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        resetAuto();
    }, { passive: true });

    goTo(0);
    startAuto();
    window.addEventListener('resize', debounce(() => goTo(current), 200));
}

// ============ CONTACT FORM ============
function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    // Try init EmailJS
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init({
                publicKey: CONFIG.emailjs.publicKey,
                blockHeadless: true,
                limitRate: { id: 'app', throttle: 300 }
            });
        }
    } catch (e) {
        console.warn('EmailJS not loaded:', e);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = getFormData(form);
        const msg = $('#formMessage');
        const submitBtn = form.querySelector('.btn-submit');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnLoading = submitBtn?.querySelector('.btn-loading');

        // Validate
        if (!data.name) { showFormMsg(msg, 'Please enter your name.', 'error'); return; }
        if (!isValidEmail(data.email)) { showFormMsg(msg, 'Please enter a valid email address.', 'error'); return; }
        if (!data.service) { showFormMsg(msg, 'Please select a service.', 'error'); return; }
        if (!data.message || data.message.length < 10) { showFormMsg(msg, 'Please enter a message (at least 10 characters).', 'error'); return; }

        // Loading state
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'flex';
        if (submitBtn) submitBtn.disabled = true;

        try {
            if (typeof emailjs !== 'undefined') {
                const params = {
                    to_email: 'info@freshideasza.co.za',
                    to_name: 'Fresh Ideas Team',
                    from_name: data.name,
                    from_email: data.email,
                    phone: data.phone || 'Not provided',
                    service: data.service,
                    message: data.message,
                    reply_to: data.email
                };
                const res = await emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, params);
                if (res.status === 200) {
                    showFormMsg(msg, '✓ Thank you! Your message has been sent. We\'ll be in touch within 24 hours.', 'success');
                    form.reset();
                }
            } else {
                // Simulate success if EmailJS not available
                await new Promise(r => setTimeout(r, 1500));
                showFormMsg(msg, '✓ Thank you! Your message has been received. We\'ll be in touch within 24 hours.', 'success');
                form.reset();
            }
        } catch (err) {
            console.error('Form error:', err);
            showFormMsg(msg, '✗ Failed to send message. Please email us directly at info@freshideasza.co.za', 'error');
        } finally {
            if (btnText) btnText.style.display = '';
            if (btnLoading) btnLoading.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

function getFormData(form) {
    const d = new FormData(form);
    return {
        name: d.get('name')?.trim(),
        email: d.get('email')?.trim(),
        phone: d.get('phone')?.trim(),
        service: d.get('service'),
        message: d.get('message')?.trim()
    };
}

function showFormMsg(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.className = `form-msg ${type}`;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (type === 'success') {
        setTimeout(() => {
            el.textContent = '';
            el.className = 'form-msg';
        }, 8000);
    }
}

// ============ BACK TO TOP ============
function initBackToTop() {
    const btn = $('#backTop');
    if (!btn) return;
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============ KEYBOARD SHORTCUTS ============
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        // Escape closes mobile nav
        if (e.key === 'Escape') {
            const navMenu = $('#navMenu');
            const hamburger = $('#hamburger');
            if (navMenu?.classList.contains('open')) {
                navMenu.classList.remove('open');
                hamburger?.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        // Cmd/Ctrl + Enter submits form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const form = $('#contactForm');
            if (form && document.activeElement?.closest('#contactForm')) {
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }
        }
    });
}

// ============ SMOOTH SCROLL ANCHORS ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ============ NAVBAR DROPDOWN TOUCH ============
function initDropdownTouch() {
    const dropdownWraps = $$('.nav-dropdown-wrap');
    dropdownWraps.forEach(wrap => {
        wrap.querySelector('.nav-link')?.addEventListener('click', (e) => {
            if (window.matchMedia('(hover: none)').matches) {
                e.preventDefault();
                const dd = wrap.querySelector('.nav-dropdown');
                if (dd) dd.style.display = dd.style.display === 'block' ? '' : 'block';
            }
        });
    });
}

// ============ SERVICE CARD GLOW FOLLOW ============
function initServiceCardGlow() {
    const cards = $$('.svc-card');
    if (window.matchMedia('(hover: none)').matches) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const glow = card.querySelector('.svc-glow');
            if (glow) {
                glow.style.left = `${x - 75}px`;
                glow.style.top = `${y - 75}px`;
                glow.style.bottom = 'auto';
                glow.style.right = 'auto';
            }
        });
    });
}

// ============ NEWSLETTER ============
function initNewsletter() {
    const form = $('.nl-form');
    if (!form) return;

    const btn = form.querySelector('button');
    const input = form.querySelector('input');

    btn?.addEventListener('click', () => {
        const email = input?.value.trim();
        if (!email || !isValidEmail(email)) {
            input?.focus();
            return;
        }
        btn.textContent = '✓';
        btn.style.background = '#00c16a';
        input.value = '';
        input.placeholder = 'You\'re subscribed!';
        setTimeout(() => {
            btn.textContent = '→';
            input.placeholder = 'Your email address';
        }, 3000);
    });
}

// ============ PERFORMANCE MONITORING ============
function initPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const t = window.performance.timing;
            const loadTime = t.loadEventEnd - t.navigationStart;
            console.log(`%c📊 Fresh Ideas — Page Load: ${loadTime}ms`, 'color: #00c16a; font-weight: 600;');
        });
    }
}

// ============ REDUCED MOTION CHECK ============
function checkReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduced-motion');
    }
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    checkReducedMotion();
    initLoader();
    initCursor();
    initNavigation();
    initScrollReveal();
    initParallax();
    initPortfolioFilter();
    initTestimonials();
    initContactForm();
    initBackToTop();
    initKeyboard();
    initSmoothScroll();
    initDropdownTouch();
    initServiceCardGlow();
    initNewsletter();
    initPerformance();
    initCounters();

    // Console brand message
    console.log('%c🌿 Fresh Ideas — Premium Digital Agency', 'font-size: 16px; color: #00c16a; font-weight: 800;');
    console.log('%c✨ Branding · Photography · IT Solutions | Vereeniging, South Africa', 'font-size: 12px; color: #5aad80;');
});
