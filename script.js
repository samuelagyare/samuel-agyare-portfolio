// Smooth scrolling for navigation links
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

// Active navigation link highlighting on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = 'home'; // Default to home
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 150)) { // Adjusted offset
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll progress indicator
const scrollIndicator = document.getElementById('scrollIndicator');

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height);
    scrollIndicator.style.transform = `scaleX(${scrolled})`;
});

// Navbar background change on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 13, 26, 0.8)';
    } else {
        navbar.style.background = 'rgba(13, 13, 26, 0.8)';
    }
});

// --- NEW CONTACT FORM HANDLING ---
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const data = new FormData(form);
    
    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
            formStatus.style.color = 'lightgreen';
            form.reset();
        } else {
            const responseData = await response.json();
            if (Object.hasOwn(responseData, 'errors')) {
                formStatus.textContent = responseData["errors"].map(error => error["message"]).join(", ");
            } else {
                formStatus.textContent = "Oops! There was a problem submitting your form.";
            }
            formStatus.style.color = 'red';
        }
    } catch (error) {
        formStatus.textContent = "Oops! There was a problem submitting your form.";
        formStatus.style.color = 'red';
    }
});


// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Stop observing after it becomes visible
        }
    });
}, observerOptions);

// Apply the observer to elements you want to animate
document.querySelectorAll('.skill-category, .project-card, .about-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
    observer.observe(el);
});
