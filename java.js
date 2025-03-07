
document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3D tilt effect for images
    const heroImage = document.querySelector('.left1 img');
    const graphImage = document.querySelector('.graph1 img');
    
    function handleTilt(event, element) {
        const box = element.getBoundingClientRect();
        const centerX = box.left + box.width / 2;
        const centerY = box.top + box.height / 2;
        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;
        
        const rotateX = mouseY * -0.02;
        const rotateY = mouseX * 0.02;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    function resetTilt(element) {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        element.style.transition = 'transform 0.5s ease';
    }
    
    if (heroImage) {
        heroImage.parentElement.addEventListener('mousemove', (e) => handleTilt(e, heroImage));
        heroImage.parentElement.addEventListener('mouseleave', () => resetTilt(heroImage));
    }
    
    if (graphImage) {
        graphImage.parentElement.addEventListener('mousemove', (e) => handleTilt(e, graphImage));
        graphImage.parentElement.addEventListener('mouseleave', () => resetTilt(graphImage));
    }

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-box, .right1 h1, .right1 p, .graph2 p, .graph2 button');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-box, .graph2 p, .graph2 button').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Particle background effect in hero section
    const createParticleCanvas = () => {
        const main1 = document.querySelector('.main1');
        if (!main1) return;
        
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        
        main1.style.position = 'relative';
        main1.style.overflow = 'hidden';
        main1.insertBefore(canvas, main1.firstChild);
        
        const ctx = canvas.getContext('2d');
        
        // Make the canvas fill its parent
        const resizeCanvas = () => {
            canvas.width = main1.offsetWidth;
            canvas.height = main1.offsetHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        // Particle settings
        const particleCount = 30;
        const particles = [];
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = `rgba(74, 107, 255, ${Math.random() * 0.3})`;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) {
                    this.x = 0;
                } else if (this.x < 0) {
                    this.x = canvas.width;
                }
                
                if (this.y > canvas.height) {
                    this.y = 0;
                } else if (this.y < 0) {
                    this.y = canvas.height;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        const init = () => {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animate);
        };
        
        init();
        animate();
    };
    
    createParticleCanvas();
    
    // Form validation and submission effect
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const inputs = this.querySelectorAll('input, textarea, select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.type !== 'checkbox' && !input.value.trim()) {
                    input.style.borderColor = '#ff6b4a';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            if (isValid) {
                // Success animation
                const button = this.querySelector('.send-button');
                button.innerText = 'Sent!';
                button.style.backgroundColor = '#28a745';
                
                // Reset form after animation
                setTimeout(() => {
                    this.reset();
                    button.innerText = 'Send';
                    button.style.backgroundColor = '';
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.textContent = 'Your message has been sent successfully!';
                    successMsg.style.color = '#28a745';
                    successMsg.style.textAlign = 'center';
                    successMsg.style.marginTop = '20px';
                    successMsg.style.padding = '10px';
                    successMsg.style.borderRadius = '5px';
                    successMsg.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
                    
                    this.appendChild(successMsg);
                    
                    setTimeout(() => {
                        successMsg.remove();
                    }, 3000);
                }, 1500);
            }
        });
    }

    
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
});

