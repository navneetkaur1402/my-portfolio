// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Typing Effect for Hero Section
const typedTextElement = document.getElementById('typed-text');
const textsToType = [
    'Software Developer',
    'Full-Stack Engineer',
    'Problem Solver',
    'Creative Coder'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
    const currentText = textsToType[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length;
        typingDelay = 500; // Pause before typing next
    }
    
    setTimeout(typeText, typingDelay);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    html.classList.add('dark');
}

function toggleTheme() {
    html.classList.toggle('dark');
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = 'none';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 10px 40px rgba(168, 85, 247, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = '#a855f7';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.remove('hidden');
    } else {
        scrollTopBtn.classList.add('hidden');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="loading"></span> <span>Sending...</span>';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual backend endpoint)
    setTimeout(() => {
        // Success message
        formStatus.classList.remove('hidden');
        formStatus.className = 'mt-4 p-4 rounded-xl border-2';
        formStatus.style.background = 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
        formStatus.style.borderColor = '#10b981';
        formStatus.style.color = '#065f46';
        formStatus.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Thank you! Your message has been sent successfully. I\'ll get back to you soon! 💌';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.innerHTML = originalButtonHTML;
        submitButton.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, 5000);
    }, 1500);
    
    /* For actual implementation, use:
    try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            // Success handling
            formStatus.classList.remove('hidden');
            formStatus.className = 'mt-4 p-4 rounded-xl border-2';
            formStatus.style.background = 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
            formStatus.style.borderColor = '#10b981';
            formStatus.style.color = '#065f46';
            formStatus.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Message sent successfully!';
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        // Error handling
        formStatus.classList.remove('hidden');
        formStatus.className = 'mt-4 p-4 rounded-xl border-2';
        formStatus.style.background = 'linear-gradient(135deg, #fee2e2, #fecaca)';
        formStatus.style.borderColor = '#ef4444';
        formStatus.style.color = '#991b1b';
        formStatus.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>Oops! Something went wrong. Please try again.';
    } finally {
        submitButton.innerHTML = originalButtonHTML;
        submitButton.disabled = false;
    }
    */
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Stats counter animation
function animateCounter(element, target, suffix = '', duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.match(/\d+/)[0]);
                const suffix = text.replace(number, '');
                animateCounter(stat, number, suffix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.getElementById('about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animate-float, .animate-float-delayed, .animate-pulse-slow');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Cursor trail effect (desktop only)
if (window.innerWidth > 768) {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');
    
    // Create cursor circles if they don't exist
    if (circles.length === 0) {
        for (let i = 0; i < 12; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.style.cssText = `
                position: fixed;
                width: ${20 - i}px;
                height: ${20 - i}px;
                border-radius: 50%;
                background: linear-gradient(135deg, rgba(236, 72, 153, ${0.5 - i * 0.04}), rgba(168, 85, 247, ${0.5 - i * 0.04}));
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease-out;
            `;
            document.body.appendChild(circle);
        }
    }
    
    const allCircles = document.querySelectorAll('.cursor-circle');
    
    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });
    
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        
        allCircles.forEach((circle, index) => {
            circle.style.left = x - 10 + 'px';
            circle.style.top = y - 10 + 'px';
            circle.style.transform = `scale(${(allCircles.length - index) / allCircles.length})`;
            
            const nextCircle = allCircles[index + 1] || allCircles[0];
            x += (parseInt(nextCircle.style.left || 0) - x) * 0.3;
            y += (parseInt(nextCircle.style.top || 0) - y) * 0.3;
        });
        
        requestAnimationFrame(animateCircles);
    }
    
    animateCircles();
}

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(highlightNavigation, 10));

// Console message (Easter egg)
console.log('%c✨ Hello, Beautiful Mind! ✨', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #ec4899, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%c👩‍💻 Interested in the code?', 'font-size: 16px; color: #a855f7;');
console.log('%c💜 Crafted with love by Navneet Kaur', 'font-size: 14px; color: #ec4899;');

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add page load fade-in
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';
