
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});


document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for reaching out! I will get back to you soon.');
  this.reset();
});

window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 10) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


const burger = document.querySelector('.burger');
const navUl = document.querySelector('nav ul');

// Toggle burger menu
burger.addEventListener('click', () => {
  navUl.classList.toggle('open');
  burger.classList.toggle('active');
});

// Close menu when clicking on nav links
navUl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navUl.classList.remove('open');
    burger.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navUl.contains(e.target) && !burger.contains(e.target)) {
    navUl.classList.remove('open');
    burger.classList.remove('active');
  }
});

// Close menu on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    navUl.classList.remove('open');
    burger.classList.remove('active');
  }
});