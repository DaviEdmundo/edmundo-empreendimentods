// ============================================
// EDMUNDO EMPREENDIMENTOS - MAIN JS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on nav links
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Phone mask for contact form
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 7) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d{0,2})$/, '($1');
            }
            
            e.target.value = value;
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const interest = document.getElementById('interest').value;
            
            // Basic validation
            if (!name || !phone) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Show success modal
            if (successModal) {
                successModal.classList.add('active');
            }
            
            // Reset form
            contactForm.reset();
            
            // Optional: Send to WhatsApp
            let message = 'Olá! Meu nome é ' + name + ' e tenho interesse em ';
            if (interest) {
                const interestText = document.getElementById('interest').options[document.getElementById('interest').selectedIndex].text;
                message += interestText.toLowerCase() + '. ';
            } else {
                message += 'imóveis da Edmundo Empreendimentos. ';
            }
            message += 'Meu telefone: ' + phone;
            
            // Encode for WhatsApp
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = 'https://wa.me/5531999862188?text=' + encodedMessage;
            
            // Open WhatsApp after a short delay
            setTimeout(function() {
                window.open(whatsappUrl, '_blank');
            }, 1500);
        });
    }
    
    if (closeModal && successModal) {
        closeModal.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
        
        // Close modal on outside click
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successModal.classList.contains('active')) {
                successModal.classList.remove('active');
            }
        });
    }
    
    // Property cards animation on scroll
    const propertyCards = document.querySelectorAll('.property-card');
    const advantageCards = document.querySelectorAll('.advantage-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize cards with hidden state
    propertyCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
        observer.observe(card);
    });
    
    advantageCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
        observer.observe(card);
    });
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const countUp = function(element, target, suffix) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const numericValue = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
                if (!isNaN(numericValue)) {
                    countUp(element, numericValue, suffix);
                }
                
                statsObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(function(stat) {
        statsObserver.observe(stat);
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    // Preloader (optional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
});
