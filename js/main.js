// Random Theme Functionality
const themes = ['theme1', 'theme2', 'theme3', 'theme4', 'theme5'];
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('selectedTheme') || 'theme1';
body.setAttribute('data-theme', savedTheme);

// Random theme function
function setRandomTheme() {
    const currentTheme = body.getAttribute('data-theme');
    let newTheme;
    
    // Pastikan tidak mendapatkan tema yang sama
    do {
        const randomIndex = Math.floor(Math.random() * themes.length);
        newTheme = themes[randomIndex];
    } while (newTheme === currentTheme && themes.length > 1);
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('selectedTheme', newTheme);
}

// Desktop random theme button
const desktopRandomBtn = document.getElementById('desktopThemeRandom');
if (desktopRandomBtn) {
    desktopRandomBtn.addEventListener('click', setRandomTheme);
}

// Mobile random theme button
const mobileRandomBtn = document.getElementById('mobileThemeRandom');
if (mobileRandomBtn) {
    mobileRandomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setRandomTheme();
        
        // Close dropdown after selecting
        navToggle.classList.remove('active');
        dropdownMenu.classList.remove('active');
    });
}

// Typing Effect - DIPERBAIKI
const texts = [
    "FrontEnd Developer",
    "Computer Science",
    "Web Developer",
    "AI&Machine Learning",
    "Data Analyst",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const currentText = texts[textIndex];
    
    if (isDeleting) {
        // Menghapus karakter
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Mengetik karakter
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    // Jika selesai mengetik
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Jeda 2 detik
        isDeleting = true;
    } 
    // Jika selesai menghapus
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 100; // Jeda 0.1 detik sebelum mengetik kata baru
    }

    setTimeout(typeWriter, typeSpeed);
}


// Create moving particles
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Random animation
        const duration = 10 + Math.random() * 10;
        const delay = Math.random() * 5;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const navLinks = document.querySelectorAll('.nav-link');
const dropdownLinks = document.querySelectorAll('.dropdown-menu a:not(#mobileThemeRandom)');

if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navToggle.classList.toggle('active');
        dropdownMenu.classList.toggle('active');
    });
}

// Close mobile dropdown when clicking a link
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        dropdownMenu.classList.remove('active');
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (navToggle && dropdownMenu) {
        if (!navToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            dropdownMenu.classList.remove('active');
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]:not(#mobileThemeRandom)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Spy - Active nav link berdasarkan scroll position (HANYA UNTUK DESKTOP)
function updateActiveNavLink() {
    // Hanya jalankan di desktop
    if (window.innerWidth <= 992) return;
    
    const scrollPosition = window.scrollY + 100; // Offset untuk header

    // Dapatkan semua section
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Hapus active dari semua link
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Tambahkan active ke link yang sesuai
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        }
    });
}

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active nav link (hanya untuk desktop)
    updateActiveNavLink();
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Form submission
const messageForm = document.getElementById('messageForm');
const alertBox = document.getElementById('alertBox');
const alertMessage = document.getElementById('alertMessage');

if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        alertBox.style.display = 'block';

        if (name && email && message) {
            alertBox.className = 'alert-box alert-success';
            alertMessage.innerText =
                `Terima kasih ${name}! Pertanyaan anda berhasil dikirim. Kami akan menghubungi Anda melalui email ${email} dalam 1-2 hari kerja.`;

            messageForm.reset();
        } else {
            alertBox.className = 'alert-box alert-error';
            alertMessage.innerText =
                'Harap lengkapi semua field sebelum mengirim formulir.';
        }
    });
}

// Album tabs functionality
const albumTabs = document.querySelectorAll('.album-tab');
const albumContainers = document.querySelectorAll('.album-container');

albumTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        albumTabs.forEach(t => t.classList.remove('active'));
        albumContainers.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        
        const albumId = tab.getAttribute('data-album');
        document.getElementById(albumId).classList.add('active');
    });
});

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

const checkScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Handle window resize - update scroll spy behavior
window.addEventListener('resize', () => {
    // Reset active states when switching to mobile
    if (window.innerWidth <= 992) {
        navLinks.forEach(link => link.classList.remove('active'));
    } else {
        // Re-check active state when switching to desktop
        updateActiveNavLink();
    }
    checkScroll();
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    createParticles();
    checkScroll();
    
    // Set initial active nav link untuk desktop
    if (window.innerWidth > 992) {
        updateActiveNavLink();
    }
    
    // Mulai typing effect setelah 1 detik
    setTimeout(typeWriter, 1000);
    
    // Animate logo
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        setInterval(() => {
            logoIcon.style.animation = 'none';
            setTimeout(() => {
                logoIcon.style.animation = 'logoPulse 3s infinite';
            }, 10);
        }, 10000);
    }
    
    // Set initial active nav link berdasarkan hash URL (hanya untuk desktop)
    if (window.innerWidth > 992) {
        const currentSection = window.location.hash || '#beranda';
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
});