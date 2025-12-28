// Counter animation function
function animateCounter(element, target, duration, prefix = '', suffix = '') {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = prefix + target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
        }
    }, 16);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Hero revenue counter
    const heroRevenueElement = document.getElementById('heroRevenueCount');
    if (heroRevenueElement) {
        heroRevenueElement.textContent = '$0+';
        setTimeout(() => {
            animateCounter(heroRevenueElement, 100000000, 3000, '$', '+');
        }, 500);
    }

    // Intersection Observer for metrics section
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // You can add additional animations here if needed
                // For now, the hero counter is already running
            }
        });
    }, observerOptions);

    // Observe revenue section if you want to trigger something when it comes into view
    const revenueSection = document.querySelector('.revenue-section');
    if (revenueSection) {
        observer.observe(revenueSection);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to elements as they come into view
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all cards and sections for fade-in
    const elementsToAnimate = document.querySelectorAll(
        '.qualification-card, .problem-card, .solution-card, .outcome-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(el);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.qualification-card, .problem-card, .solution-card, .outcome-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Logo scroll animation - ensure it's working
    const logoScroll = document.querySelector('.logo-scroll-content');
    if (logoScroll) {
        // Reset animation if needed
        logoScroll.style.animation = 'none';
        setTimeout(() => {
            logoScroll.style.animation = 'scroll-infinite 20s linear infinite';
        }, 10);
    }
});

// Format number with commas
function formatNumber(num) {
    return num.toLocaleString();
}

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Ensure all images are loaded
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;
    const totalImages = images.length;
    
    if (totalImages === 0) {
        return;
    }
    
    images.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
        } else {
            img.addEventListener('load', function() {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    // All images loaded
                }
            });
            
            img.addEventListener('error', function() {
                imagesLoaded++;
                // Handle image load error
            });
        }
    });
});

