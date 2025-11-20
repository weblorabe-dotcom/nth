/**
 * ========================================
 * DIGIBOOST - MAIN JAVASCRIPT
 * Ultra-modern interactive functionality
 * ========================================
 */

// ========================================
// CONSTANTS & UTILITIES
// ========================================
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ========================================
// NAVIGATION
// ========================================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.handleScroll();
        this.handleMenuToggle();
        this.handleNavLinks();
        this.handleActiveSection();
        
        window.addEventListener('scroll', debounce(() => this.handleScroll(), 10));
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    handleMenuToggle() {
        this.menuToggle.addEventListener('click', () => {
            this.menuToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    handleNavLinks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Close mobile menu
                    this.menuToggle.classList.remove('active');
                    this.navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    handleActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -66%',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.setActiveLink(id);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
    
    setActiveLink(id) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }
}

// ========================================
// HERO CHART
// ========================================
class HeroChart {
    constructor() {
        this.canvas = document.getElementById('heroChart');
        if (!this.canvas) return;
        
        this.init();
    }
    
    init() {
        const ctx = this.canvas.getContext('2d');
        
        // Gradient for chart
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.4)');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0.05)');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Croissance',
                    data: [30, 45, 60, 70, 90, 127],
                    borderColor: '#2563EB',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#2563EB',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#2563EB',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return '+' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748B',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(148, 163, 184, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#64748B',
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
}

// ========================================
// SCROLL ANIMATIONS (AOS-like)
// ========================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }
    
    init() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);
        
        this.elements.forEach(el => {
            el.classList.add('aos-init');
            observer.observe(el);
        });
        
        this.addAnimationStyles();
    }
    
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            [data-aos] {
                transition-duration: 0.6s;
                transition-timing-function: ease;
            }
            
            [data-aos].aos-init {
                opacity: 0;
            }
            
            [data-aos].aos-animate {
                opacity: 1;
            }
            
            [data-aos="fade-up"].aos-init {
                transform: translateY(40px);
            }
            
            [data-aos="fade-up"].aos-animate {
                transform: translateY(0);
            }
            
            [data-aos="fade-right"].aos-init {
                transform: translateX(-40px);
            }
            
            [data-aos="fade-right"].aos-animate {
                transform: translateX(0);
            }
            
            [data-aos="fade-left"].aos-init {
                transform: translateX(40px);
            }
            
            [data-aos="fade-left"].aos-animate {
                transform: translateX(0);
            }
            
            [data-aos="zoom-in"].aos-init {
                transform: scale(0.9);
            }
            
            [data-aos="zoom-in"].aos-animate {
                transform: scale(1);
            }
            
            [data-aos][data-aos-delay="100"] {
                transition-delay: 0.1s;
            }
            
            [data-aos][data-aos-delay="200"] {
                transition-delay: 0.2s;
            }
            
            [data-aos][data-aos-delay="300"] {
                transition-delay: 0.3s;
            }
            
            [data-aos][data-aos-delay="400"] {
                transition-delay: 0.4s;
            }
            
            [data-aos][data-aos-delay="500"] {
                transition-delay: 0.5s;
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', debounce(() => this.handleScroll(), 100));
        this.button.addEventListener('click', () => this.scrollToTop());
    }
    
    handleScroll() {
        if (window.scrollY > 500) {
            this.button.classList.add('show');
        } else {
            this.button.classList.remove('show');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ========================================
// CONTACT FORM
// ========================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;
        
        this.successMessage = document.getElementById('formSuccess');
        this.errorMessage = document.getElementById('formError');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Hide previous messages
        this.successMessage.classList.remove('show');
        this.errorMessage.classList.remove('show');
        
        // Get form data
        const formData = new FormData(this.form);
        
        // Submit button state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitButton.disabled = true;
        
        try {
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.successMessage.classList.add('show');
                this.form.reset();
                
                // Scroll to success message
                this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    this.successMessage.classList.remove('show');
                }, 5000);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.errorMessage.classList.add('show');
            
            // Scroll to error message
            this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                this.errorMessage.classList.remove('show');
            }, 5000);
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }
}

// ========================================
// SMOOTH SCROLL FOR ALL LINKS
// ========================================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href.length <= 1) return;
                
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ========================================
// PARALLAX EFFECT
// ========================================
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        if (!this.hero) return;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', debounce(() => this.handleScroll(), 10));
    }
    
    handleScroll() {
        const scrolled = window.scrollY;
        const heroContent = this.hero.querySelector('.hero-content');
        const heroVisual = this.hero.querySelector('.hero-visual');
        
        // Désactiver le parallax sur mobile pour éviter les problèmes
        if (window.innerWidth <= 768) return;
        
        if (heroContent && scrolled < 500) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = Math.max(0.4, 1 - (scrolled * 0.001));
        }
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
}

// ========================================
// COUNTER ANIMATION
// ========================================
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number, .visual-stat .stat-number');
        if (this.counters.length === 0) return;
        
        this.init();
    }
    
    init() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const text = element.textContent;
        const hasPercent = text.includes('%');
        const hasPlus = text.includes('+');
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        
        if (isNaN(number)) return;
        
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let displayText = Math.floor(current).toString();
            if (hasPlus) displayText = '+' + displayText;
            if (hasPercent) displayText += '%';
            
            element.textContent = displayText;
        }, duration / steps);
    }
}

// ========================================
// IMAGE LAZY LOADING
// ========================================
class LazyLoading {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        if (this.images.length === 0) return;
        
        this.init();
    }
    
    init() {
        const observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.01
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, observerOptions);
        
        this.images.forEach(img => observer.observe(img));
    }
}

// ========================================
// TYPING EFFECT (Optional Enhancement)
// ========================================
class TypingEffect {
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, delayBetween = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.delayBetween = delayBetween;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        if (this.element) {
            this.type();
        }
    }
    
    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeedCurrent = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            typeSpeedCurrent = this.delayBetween;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
        }
        
        setTimeout(() => this.type(), typeSpeedCurrent);
    }
}

// ========================================
// CURSOR FOLLOWER (Optional Enhancement)
// ========================================
class CursorFollower {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-follower';
        document.body.appendChild(this.cursor);
        
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot';
        document.body.appendChild(this.cursorDot);
        
        this.init();
        this.addStyles();
    }
    
    init() {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            this.cursorDot.style.left = mouseX + 'px';
            this.cursorDot.style.top = mouseY + 'px';
        });
        
        const animate = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            this.cursor.style.left = cursorX + 'px';
            this.cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Add hover effects
        document.querySelectorAll('a, button, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorDot.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorDot.classList.remove('hover');
            });
        });
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cursor-follower,
            .cursor-dot {
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                border-radius: 50%;
                transition: transform 0.2s ease;
            }
            
            .cursor-follower {
                width: 40px;
                height: 40px;
                border: 2px solid #2563EB;
                transform: translate(-50%, -50%);
                opacity: 0.5;
            }
            
            .cursor-dot {
                width: 8px;
                height: 8px;
                background: #2563EB;
                transform: translate(-50%, -50%);
            }
            
            .cursor-follower.hover {
                transform: translate(-50%, -50%) scale(1.5);
            }
            
            .cursor-dot.hover {
                transform: translate(-50%, -50%) scale(0);
            }
            
            @media (max-width: 768px) {
                .cursor-follower,
                .cursor-dot {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new Navigation();
    new HeroChart();
    new ScrollAnimations();
    new BackToTop();
    new ContactForm();
    new SmoothScroll();
    new ParallaxEffect();
    new CounterAnimation();
    new LazyLoading();
    
    // Optional enhancements (uncomment to enable)
    // new CursorFollower();
    
    // Console log for developers
    console.log('%c🚀 Weblora Website Loaded Successfully!', 'color: #2563EB; font-size: 16px; font-weight: bold;');
    console.log('%cDeveloped with ❤️ by Weblora', 'color: #10B981; font-size: 12px;');
});

// ========================================
// PERFORMANCE MONITORING
// ========================================
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});