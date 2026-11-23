/* =========================================================
   Othmane Fakir — Portfolio interactions
   ========================================================= */
document.documentElement.classList.add('js');

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ---------- Theme toggle ---------- */
const themeToggle = $('#theme-toggle');
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  $('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f7f8fb' : '#0b0f17');
  try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
});

/* ---------- Nav: scrolled state ---------- */
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Mobile menu ---------- */
const burger = $('#burger');
const navLinks = $('#nav-links');

const setMenu = (open) => {
  navLinks.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};

burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
$$('a', navLinks).forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !burger.contains(e.target)) setMenu(false);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* ---------- Active nav link while scrolling ---------- */
const sections = $$('main section[id]');
const linkFor = (id) => $(`.nav__links a[href="#${id}"]`);
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      $$('.nav__links a').forEach((a) => a.classList.remove('is-active'));
      linkFor(entry.target.id)?.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));
}

/* ---------- Reveal on scroll ---------- */
const revealEls = $$('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ---------- Project filters ---------- */
const filters = $$('.filter');
const projects = $$('.project[data-cat]');
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.filter;
    filters.forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    projects.forEach((p) => {
      const show = cat === 'all' || p.dataset.cat === cat;
      p.classList.toggle('is-hidden', !show);
      if (show) p.classList.add('is-visible');
    });
    // Hide headings/sections that end up empty
    const featuredVisible = $$('.featured .project:not(.is-hidden)').length > 0;
    $('.featured').style.display = featuredVisible ? '' : 'none';
    $('.subhead').style.display = featuredVisible ? '' : 'none';
  });
});

/* ---------- Copy email ---------- */
const copyBtn = $('#copy-email');
copyBtn?.addEventListener('click', async () => {
  const email = copyBtn.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyBtn.textContent = 'Copied!';
  } catch (e) {
    window.location.href = `mailto:${email}`;
  }
  setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1800);
});

/* ---------- Contact form → opens the visitor's email app ---------- */
const form = $('#contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = ['name', 'email', 'message'].map((id) => $(`#${id}`, form));
  let valid = true;
  fields.forEach((f) => {
    const ok = f.checkValidity() && f.value.trim() !== '';
    f.closest('.field').classList.toggle('has-error', !ok);
    if (!ok && valid) { f.focus(); valid = false; }
  });
  const note = $('#form-note');
  if (!valid) {
    note.textContent = 'Please fill in your name, a valid email and a message.';
    return;
  }
  const [name, email, message] = fields.map((f) => f.value.trim());
  const subject = `Portfolio contact from ${name}`;
  const body = `${message}\n\n— ${name} (${email})`;
  window.location.href =
    `mailto:othmanefakir010@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = 'Your email app should open now. If it doesn\'t, email me directly at othmanefakir010@gmail.com.';
});

/* ---------- Footer year ---------- */
const year = $('#year');
if (year) year.textContent = new Date().getFullYear();
