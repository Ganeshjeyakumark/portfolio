document.addEventListener('DOMContentLoaded', () => {
    /* ==== 1. Initialize AOS (Animate on Scroll) ==== */
    AOS.init({
        once: true, // Animation happens only once
        offset: 100, // Offset (in px) from the original trigger point
        duration: 800, // Values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // Default easing for AOS animations
    });

    /* ==== 2. Navigation Menu Toggle ==== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when link receives click
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    /* ==== 3. Sticky Navbar & Active Link Highlight ==== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Navbar Effect
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
            navbar.style.background = 'rgba(10, 14, 23, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(10, 14, 23, 0.85)';
        }

        // Active Link Highlight on Scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* ==== 4. Typing Effect ==== */
    const typingText = document.querySelector('.typing-text');
    const words = ["Software Engineer", "Java Backend Developer", "Spring Boot Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);

    /* ==== 5. Particles Background Effect ==== */
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        
        // Method to draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        // Check particle position, check mouse position, move the particle, draw the particle
        update() {
            // Check if particle is still within canvas
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;
            
            // Draw
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 0.5;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5;
            let directionY = (Math.random() * 1) - 0.5;
            let color = 'rgba(99, 102, 241, 0.2)'; // Faint Indigo

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    initParticles();
    animateParticles();
});

/* ==== 6. Certifications Modal ==== */
window.openModal = function(imgSrc, captionText) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const caption = document.getElementById("modalCaption");
    
    modal.style.display = "block";
    modalImg.src = imgSrc;
    caption.innerHTML = captionText;
    
    // Disable body scrolling
    document.body.style.overflow = "hidden";
};

window.closeModal = function() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
    
    // Enable body scrolling
    document.body.style.overflow = "auto";
};

// Close modal when clicking outside the image
window.onclick = function(event) {
    const imgModal = document.getElementById("imageModal");
    const projModal = document.getElementById("projectModal");
    if (event.target == imgModal) {
        window.closeModal();
    }
    if (event.target == projModal) {
        window.closeProjectModal();
    }
};

// Close on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const imgModal = document.getElementById("imageModal");
        if (imgModal && imgModal.style.display === "block") {
            window.closeModal();
        }
        const projModal = document.getElementById("projectModal");
        if (projModal && projModal.style.display === "block") {
            window.closeProjectModal();
        }
    }
});

/* ==== 7. Project Details Modal ==== */
const projectDetails = {
    'pneumonia': {
        title: 'AI Powered Pneumonia Detection',
        desc: 'Developed a CNN-based Deep Learning model using TensorFlow and Python for automated pneumonia detection on 5000+ chest X-ray images. Applied image preprocessing and data augmentation techniques. Achieved 95% validation accuracy.<br><br>Features:<br>- High accuracy CNN model using TensorFlow<br>- Applied advanced image preprocessing and data augmentation techniques<br>- Achieved 95% validation accuracy',
        images: ['image.png'],
        github: 'https://github.com/Ganeshjeyakumark',
        demo: '#'
    },
    'threehearts': {
        title: 'Three Hearts Handmades',
        desc: 'Developed a responsive business website showcasing 20+ handmade products. Designed modern product catalog pages with responsive layouts. Improved brand visibility through digital product presentation.<br><br>Features:<br>- Designed modern product catalog pages with responsive layouts<br>- Improved brand visibility through digital product presentation<br>- Clean, semantic HTML and CSS styling',
        images: ['assets/three_hearts.png'],
        github: 'https://github.com/Ganeshjeyakumark',
        demo: '#'
    },
    'skillswap': {
        title: 'Skill Swap Platform',
        desc: 'Built a responsive skill-sharing platform. Implemented interactive profile management modules. Designed scalable architecture for future backend integration.<br><br>Features:<br>- Implemented interactive profile management modules<br>- Designed scalable architecture for future backend integration<br>- Built with responsive modern CSS framework principles',
        images: ['assets/skillswap.jpg'],
        github: 'https://github.com/Ganeshjeyakumark',
        demo: '#'
    }
};

window.openProjectModal = function(projectId) {
    const data = projectDetails[projectId];
    if(!data) return;

    document.getElementById('projectModalTitle').innerText = data.title;
    document.getElementById('projectModalDesc').innerHTML = data.desc;
    document.getElementById('projectModalGithub').href = data.github;
    document.getElementById('projectModalDemo').href = data.demo;
    
    const sliderContainer = document.getElementById('projectModalImages');
    sliderContainer.innerHTML = ''; // Reset
    
    // Add images
    data.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'project-slider-img';
        img.alt = 'Project Image';
        sliderContainer.appendChild(img);
    });

    document.getElementById('projectModal').style.display = 'flex';
    
    // Disable body scrolling
    document.body.style.overflow = "hidden";
};

window.closeProjectModal = function() {
    document.getElementById('projectModal').style.display = 'none';
    
    // Enable body scrolling
    document.body.style.overflow = "auto";
};

/* ==== 8. Achievements Count-Up Animation ==== */
document.addEventListener('DOMContentLoaded', () => {
    const achievementsSection = document.getElementById('achievements');
    const counters = document.querySelectorAll('.counter-val');

    const startCountUp = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const duration = 2000; // 2 seconds animation
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                if (elapsedTime < duration) {
                    count = Math.ceil((elapsedTime / duration) * target);
                    counter.innerText = count.toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            requestAnimationFrame(updateCount);
        });
    };

    if (achievementsSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCountUp();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(achievementsSection);
    }
});

/* ==== 9. Contact Form Validation & WhatsApp Redirect ==== */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Toast Notification helper
    function showToast(message, type = 'error') {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = '<i class="fas fa-exclamation-circle"></i>';
        if (type === 'success') icon = '<i class="fas fa-check-circle"></i>';
        if (type === 'info') icon = '<i class="fas fa-info-circle"></i>';

        toast.innerHTML = `${icon}<span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Remove toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        // Validation
        if (!name) {
            showToast('Name is required!', 'error');
            return;
        }

        if (!email) {
            showToast('Email is required!', 'error');
            return;
        }

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address!', 'error');
            return;
        }

        if (!subject) {
            showToast('Subject is required!', 'error');
            return;
        }

        if (!message) {
            showToast('Message is required!', 'error');
            return;
        }

        // Show loading state on button
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing message...';

        // Format WhatsApp message
        const waMessage = `👋 New Portfolio Enquiry\n\n👤 Name:\n${name}\n\n📧 Email:\n${email}\n\n📌 Subject:\n${subject}\n\n📝 Message:\n${message}`;
        const encodedMessage = encodeURIComponent(waMessage);
        const waUrl = `https://wa.me/917010085235?text=${encodedMessage}`;

        // Wait 1 second (loading animation) before redirecting
        setTimeout(() => {
            // Open in new tab
            window.open(waUrl, '_blank');
            
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            
            // Clear form
            contactForm.reset();

            showToast('Redirecting to WhatsApp...', 'success');
        }, 1000);
    });
});

