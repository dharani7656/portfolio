// Enhanced Professional Cybersecurity Portfolio JavaScript
class CybersecurityPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initTypingAnimation();
        this.initScrollAnimations();
        this.initProgressBars();
        this.initScrollToTop();
        this.initSmoothScrolling();
        this.initStatsCounter();
        this.initSkillAnimations();
        this.initCardHoverEffects();
    }

    setupEventListeners() {
        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }

        // Contact form handling
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        // Navbar background on scroll
        window.addEventListener('scroll', this.handleNavbarScroll.bind(this));

        // Add professional button click effects
        this.initButtonEffects();

        // Keyboard navigation support
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));

        // Initialize loading animation
        this.initLoadingAnimation();
    }

    initTypingAnimation() {
        const typingText = document.getElementById('typing-text');
        if (!typingText) return;

        const texts = [
            'SOC Analyst',
            'Cybersecurity Engineer', 
            'Threat Hunter',
            'OSINT Investigator',
            'Penetration Tester',
            'Network Security Specialist',
            'Incident Response Analyst',
            'Security Researcher'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const typeWriter = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 300;
            }

            setTimeout(typeWriter, typeSpeed);
        };

        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Special handling for stats counter
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateStatNumber(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        const animateElements = document.querySelectorAll(`
            .section-header, 
            .about-content, 
            .skill-category, 
            .expertise-card,
            .project-card, 
            .cert-card, 
            .contact-content,
            .target-cert-item
        `);
        
        animateElements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });

        // Special animations for stats
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.classList.add('slide-in-right');
            item.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(item);
        });

        // Animate highlight items
        const highlightItems = document.querySelectorAll('.highlight-item');
        highlightItems.forEach((item, index) => {
            item.classList.add('slide-in-left');
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });

        // Animate expertise cards
        const expertiseCards = document.querySelectorAll('.expertise-card');
        expertiseCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(card);
        });
    }

    initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.dataset.progress;
                    
                    setTimeout(() => {
                        progressBar.style.width = `${progress}%`;
                    }, 500);
                    
                    progressObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }

    initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(statNumber => {
            const finalText = statNumber.textContent;
            const finalNumber = parseInt(finalText);
            
            if (!isNaN(finalNumber)) {
                statNumber.dataset.finalNumber = finalNumber;
                statNumber.dataset.finalText = finalText;
                statNumber.textContent = '0';
            }
        });
    }

    animateStatNumber(statItem) {
        const statNumber = statItem.querySelector('.stat-number');
        if (!statNumber || statNumber.dataset.animated) return;
        
        const finalNumber = parseInt(statNumber.dataset.finalNumber);
        const finalText = statNumber.dataset.finalText;
        
        if (isNaN(finalNumber)) return;
        
        statNumber.dataset.animated = 'true';
        const increment = finalNumber / 30;
        let currentNumber = 0;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                statNumber.textContent = finalText;
                clearInterval(timer);
            } else {
                statNumber.textContent = Math.floor(currentNumber);
            }
        }, 50);
    }

    initSkillAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.5s ease';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 50);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(item);
        });
    }

    initCardHoverEffects() {
        const cards = document.querySelectorAll(`
            .project-card, 
            .cert-card, 
            .skill-category, 
            .stat-item,
            .expertise-card,
            .target-cert-item
        `);
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('placeholder-project')) {
                    card.style.transform = 'translateY(-8px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Special hover effects for skill items
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });
    }

    initScrollToTop() {
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (!scrollToTopBtn) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    initSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    handleContactForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Validate form
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!name || !email || !subject || !message) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'var(--success-color)';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
            
            // Show notification
            this.showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        }, 2000);
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Update active navigation link based on scroll position
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    handleKeyboardNavigation(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            if (navToggle && navMenu && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Close any open notifications
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            });
        }

        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    }

    initButtonEffects() {
        const buttons = document.querySelectorAll(`
            .btn, 
            .project-link, 
            .cert-link, 
            .social-link,
            .target-cert-item
        `);
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            });
        });
    }

    initLoadingAnimation() {
        // Add loading state to page
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--white-pure);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        loader.innerHTML = `
            <div style="text-align: center;">
                <div class="loading" style="width: 40px; height: 40px; border-width: 4px; margin-bottom: 16px;"></div>
                <p style="color: var(--gray-light); font-weight: 500; font-size: var(--font-size-lg);">Loading Portfolio...</p>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Hide loader when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(loader)) {
                        document.body.removeChild(loader);
                    }
                }, 500);
            }, 800);
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        let backgroundColor = 'var(--white-pure)';
        let borderColor = 'var(--border-light)';
        let iconColor = 'var(--gray-text)';
        
        if (type === 'success') {
            borderColor = 'var(--success-color)';
            iconColor = 'var(--success-color)';
        } else if (type === 'error') {
            borderColor = 'var(--error-color)';
            iconColor = 'var(--error-color)';
        } else if (type === 'warning') {
            borderColor = 'var(--warning-color)';
            iconColor = 'var(--warning-color)';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 20px;
            background: ${backgroundColor};
            color: var(--gray-text);
            border: 1px solid ${borderColor};
            border-left: 4px solid ${borderColor};
            border-radius: var(--radius-base);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            box-shadow: 0 10px 30px var(--shadow-medium);
            font-size: var(--font-size-sm);
            font-weight: 500;
            font-family: 'Inter', sans-serif;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="color: ${iconColor}; flex-shrink: 0;">
                    ${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}
                </div>
                <div>${message}</div>
            </div>
        `;
        
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Enhanced performance monitoring
    initPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.now();
                console.log(`Portfolio loaded in ${Math.round(loadTime)}ms`);
                
                if (loadTime > 3000) {
                    console.warn('Page load time is slower than expected:', loadTime + 'ms');
                }
            });
        }
    }

    // Enhanced error handling
    initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Portfolio error:', e.error);
            // In production, you might want to send this to a logging service
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }

    // Optimize resize handling
    initResizeHandling() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Recalculate any layout-dependent features
                const hero = document.querySelector('.hero');
                if (hero && window.innerWidth > 768) {
                    hero.style.minHeight = window.innerHeight + 'px';
                }
                
                // Update mobile menu state on resize
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (window.innerWidth > 768) {
                    navMenu?.classList.remove('active');
                    navToggle?.classList.remove('active');
                }
            }, 250);
        });
    }

    // Initialize theme detection (for future dark mode support)
    initThemeDetection() {
        // Detect user's preferred color scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // User prefers dark mode - could be used for future dark mode implementation
            console.log('User prefers dark mode');
        }
    }

    // Initialize all additional features
    initializeAdvancedFeatures() {
        this.initPerformanceMonitoring();
        this.initErrorHandling();
        this.initResizeHandling();
        this.initThemeDetection();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new CybersecurityPortfolio();
    
    // Initialize additional professional effects after a delay
    setTimeout(() => {
        portfolio.initializeAdvancedFeatures();
    }, 1000);
});

// Add ripple animation keyframes and additional styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .page-loader {
        font-family: 'Inter', sans-serif;
    }
    
    .notification {
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
        }
        to {
            transform: translateX(0);
        }
    }
    
    /* Enhanced focus styles for keyboard navigation */
    .keyboard-navigation *:focus {
        outline: 2px solid var(--teal-accent) !important;
        outline-offset: 2px !important;
    }
    
    /* Active navigation link styling */
    .nav-link.active {
        color: var(--teal-accent);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    /* Enhanced loading animation */
    .loading {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(92, 189, 185, 0.3);
        border-radius: 50%;
        border-top-color: var(--teal-accent);
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    /* Enhanced skill item hover effects */
    .skill-item {
        transition: all var(--transition-normal) !important;
    }
    
    /* Professional project card enhancements */
    .project-card.placeholder-project:hover {
        border-color: var(--teal-accent);
        transform: translateY(-5px);
    }
    
    /* Enhanced button hover effects */
    .btn {
        transition: all var(--transition-normal);
    }
    
    .btn:active {
        transform: translateY(1px);
    }
    
    /* Professional scroll indicator */
    .scroll-progress {
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--teal-accent), var(--navy-secondary));
        z-index: 999;
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(style);

// Enhanced scroll performance optimization
let ticking = false;

function updateScrollElements() {
    // Update any scroll-dependent elements here
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    // Update scroll progress indicator
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled_percent = (winScroll / height) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    progressBar.style.width = scrolled_percent + '%';
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollElements);
        ticking = true;
    }
});

// Add accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add skip navigation link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--navy-primary);
        color: var(--white-pure);
        padding: 8px;
        text-decoration: none;
        border-radius: var(--radius-sm);
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels to interactive elements
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        if (!link.getAttribute('aria-label')) {
            const href = link.getAttribute('href');
            if (href.includes('linkedin')) {
                link.setAttribute('aria-label', 'LinkedIn Profile');
            } else if (href.includes('github')) {
                link.setAttribute('aria-label', 'GitHub Profile');
            } else if (href.includes('mailto')) {
                link.setAttribute('aria-label', 'Email Contact');
            }
        }
    });
});

// Export for potential testing or extending
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CybersecurityPortfolio;
}