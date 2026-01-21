/* =========================
   Smooth Scroll Navigation
========================= */
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile menu after click
    navUl.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  });
});

/* =========================
   Navbar Scroll State
========================= */
const nav = document.querySelector('nav');
let lastState = false;

window.addEventListener('scroll', () => {
  const shouldBeScrolled = window.scrollY > 10;
  if (shouldBeScrolled !== lastState) {
    nav.classList.toggle('scrolled', shouldBeScrolled);
    lastState = shouldBeScrolled;
  }
});

/* =========================
   Burger Menu Toggle
========================= */
const burger = document.querySelector('.burger');
const navUl = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  const isOpen = navUl.classList.toggle('open');
  burger.classList.toggle('active');
  burger.setAttribute('aria-expanded', isOpen);
});

/* =========================
   Close Menu on Outside Click
========================= */
document.addEventListener('click', (e) => {
  if (!navUl.contains(e.target) && !burger.contains(e.target)) {
    navUl.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  }
});

/* =========================
   Contact Form (Demo UX)
========================= */
const form = document.getElementById('contact-form');

if (form) {
  const button = form.querySelector('button');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    button.disabled = true;
    button.textContent = 'Sending...';

    setTimeout(() => {
      form.reset();
      button.textContent = 'Message Sent';
    }, 800);
  });
}

/* =========================
   Dynamic Footer Year
========================= */
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
