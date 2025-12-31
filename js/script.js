// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .btn[href^="#"]');
    
    // Add click event listeners for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calculate offset for sticky header
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Active Navigation Link Highlighting
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Function to update active nav link
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            if (window.pageYOffset >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
    
    // ============================================
    // Book Cover Animation on Scroll
    // ============================================
    const bookCover = document.querySelector('.book-cover');
    
    if (bookCover) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'float 3s ease-in-out infinite';
                }
            });
        }, observerOptions);
        
        observer.observe(bookCover);
    }
    
    // ============================================
    // Fade-in Animation for Cards on Scroll
    // ============================================
    const animatedElements = document.querySelectorAll('.feature-card, .activity-item, .stat-item');
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay for staggered animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initialize elements with hidden state
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });
    
    // ============================================
    // Download Button Click Tracking
    // ============================================
    const downloadBtn = document.querySelector('.btn-download');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Optional: Track download (you can add analytics here)
            console.log('Book download initiated');
        });
    }
    
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const menuClose = document.querySelector('.menu-close');
    
    // Function to close menu
    function closeMenu() {
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Function to open menu
    function openMenu() {
        if (mobileMenuToggle) mobileMenuToggle.classList.add('active');
        if (navMenu) navMenu.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    if (mobileMenuToggle && navMenu) {
        // Toggle menu on hamburger click
        mobileMenuToggle.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close menu on close button click
        if (menuClose) {
            menuClose.addEventListener('click', closeMenu);
        }
        
        // Close menu when clicking on overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }
        
        // Close menu when clicking on a link
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });
        
        // Close menu when clicking outside (but not on overlay)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                const isClickInsideNav = navMenu.contains(e.target);
                const isClickOnToggle = mobileMenuToggle.contains(e.target);
                const isClickOnOverlay = menuOverlay && menuOverlay.contains(e.target);
                
                if (!isClickInsideNav && !isClickOnToggle && !isClickOnOverlay && navMenu.classList.contains('active')) {
                    closeMenu();
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }
});

// ============================================
// Add CSS for active navigation link
// ============================================
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        background: rgba(255, 255, 255, 0.2);
        padding: 0.5rem 1rem;
        border-radius: 5px;
    }
`;
document.head.appendChild(style);
