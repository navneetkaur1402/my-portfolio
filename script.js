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
        navbar.style.boxShadow = '0 10px 30px rgba(3,105,161,0.08)';
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
                    link.style.color = '#0369a1';
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

// Parallax effect removed for cleaner layout (floating decorations removed)
// window.addEventListener('scroll', ...) intentionally disabled.

// Cursor-trail removed for a cleaner, professional experience.
// The previous cursor-circle animation was intentionally removed.

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
console.log('Navneet Kaur — Portfolio');

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add page load fade-in
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';
