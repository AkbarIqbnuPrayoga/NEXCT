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
        
        navToggle.classList.remove('active');
        dropdownMenu.classList.remove('active');
    });
}

// Typing Effect
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
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 100;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Create moving particles
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}vw`;
        
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

dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        dropdownMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (navToggle && dropdownMenu) {
        if (!navToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            dropdownMenu.classList.remove('active');
        }
    }
});

// Smooth scrolling
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

// Scroll Spy - Only for desktop
function updateActiveNavLink() {
    if (window.innerWidth <= 992) return;
    
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
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
    
    updateActiveNavLink();
    
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Firebase Form Submission
const messageForm = document.getElementById('messageForm');
const alertBox = document.getElementById('alertBox');
const alertMessage = document.getElementById('alertMessage');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');

if (messageForm) {
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validasi form
        if (!name || !email || !message) {
            showAlert('Harap lengkapi semua field!', 'error');
            return;
        }

        // Validasi email sederhana
        if (!email.includes('@') || !email.includes('.')) {
            showAlert('Masukkan email yang valid!', 'error');
            return;
        }

        // Tampilkan loading
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline';

        try {
            // Simpan ke Firebase
            await db.collection('messages').add({
                name: name,
                email: email,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                read: false,
                replied: false
            });

            // Tampilkan pesan sukses
            showAlert(`Terima kasih ${name}! Pesan Anda berhasil dikirim.`, 'success');
            
            // Reset form
            messageForm.reset();
            
        } catch (error) {
            console.error('Error sending message:', error);
            showAlert('Maaf, terjadi kesalahan. Silakan coba lagi nanti.', 'error');
        } finally {
            // Sembunyikan loading
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnSpinner.style.display = 'none';
        }
    });
}

// Fungsi untuk menampilkan alert dengan warna di JS
function showAlert(message, type) {
    alertBox.style.display = 'block';
    alertBox.className = `alert-box`; // Hapus class alert-success/error
    alertMessage.innerText = message;
    
    // Set style langsung di JavaScript
    if (type === 'success') {
        alertBox.style.background = 'linear-gradient(135deg, #0a2463, #1e3a8a, #3b82f6)';
        alertBox.style.color = 'white';
        alertBox.style.border = 'none';
        alertBox.style.boxShadow = '0 5px 15px rgba(10, 36, 99, 0.3)';
    } else {
        alertBox.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c, #991b1b)';
        alertBox.style.color = 'white';
        alertBox.style.border = 'none';
        alertBox.style.boxShadow = '0 5px 15px rgba(220, 38, 38, 0.3)';
    }
    
    // Auto hide setelah 5 detik
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 5000);
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

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 992) {
        navLinks.forEach(link => link.classList.remove('active'));
    } else {
        updateActiveNavLink();
    }
    checkScroll();
});

// Initialize
window.addEventListener('DOMContentLoaded', function() {
    createParticles();
    checkScroll();
    
    if (window.innerWidth > 992) {
        updateActiveNavLink();
    }
    
    setTimeout(typeWriter, 1000);
    
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        setInterval(() => {
            logoIcon.style.animation = 'none';
            setTimeout(() => {
                logoIcon.style.animation = 'logoPulse 3s infinite';
            }, 10);
        }, 10000);
    }
    
    if (window.innerWidth > 992) {
        const currentSection = window.location.hash || '#beranda';
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
});