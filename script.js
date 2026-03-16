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
    const words = ["Java Backend Developer", "AI Enthusiast", "Tech Innovator", "Problem Solver"];
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
        desc: 'Deep learning CNN model built using TensorFlow that analyzes chest X-ray images and predicts pneumonia. The system includes image preprocessing, model training, and AI-based prediction output. <br><br>Features:<br>- High accuracy CNN model<br>- Chest X-Ray pre-processing pipeline<br>- Real-time prediction interface',
        images: ['image.png', 'https://via.placeholder.com/800x450/111827/6366f1?text=Pneumonia+Detection+Architecture', 'https://via.placeholder.com/800x450/111827/6366f1?text=Chest+X-Ray+Sample'],
        github: '#',
        demo: '#'
    },
    'skillswap': {
        title: 'Skill Swap Platform',
        desc: 'A web platform where users can list their skills and learn new skills from others. Includes profile creation, skill listings, and matching functionality. <br><br>Features:<br>- User authentication and profiles<br>- Smart skill matching algorithm<br>- Real-time chat system',
        images: ['assets/skillswap.jpg', 'https://via.placeholder.com/800x450/111827/8b5cf6?text=Skill+Listings', 'https://via.placeholder.com/800x450/111827/8b5cf6?text=User+Profile'],
        github: '#',
        demo: '#'
    },
    'aibackend': {
        title: 'AI Integrated Backend Service',
        desc: 'Backend service developed using Java Spring Boot with REST APIs and MySQL database. Integrates AI prediction services with backend applications. <br><br>Features:<br>- Scalable REST API architecture<br>- JWT-based security<br>- Seamless AI model integration via Python Microservices',
        images: ['assets/ai_backend.png', 'https://via.placeholder.com/800x450/111827/3b82f6?text=API+Documentation', 'https://via.placeholder.com/800x450/111827/3b82f6?text=Database+Schema'],
        github: '#',
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
