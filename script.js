const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? 'Modo claro' : 'Modo escuro';
  localStorage.setItem('theme', theme);
}
applyTheme(localStorage.getItem('theme') || 'light');

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('.nav__link').forEach(link =>
  link.addEventListener('click', () => nav.classList.remove('open'))
);

const heroPhoto = document.querySelector('.hero__photo');
const heroPhotoImg = heroPhoto.querySelector('img');

heroPhoto.addEventListener('mousemove', (e) => {
  const rect = heroPhoto.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  heroPhotoImg.style.transform = `rotateY(${x * 16}deg) rotateX(${y * -16}deg) scale(1.05)`;
});
heroPhoto.addEventListener('mouseleave', () => {
  heroPhotoImg.style.transform = 'rotateY(0) rotateX(0) scale(1)';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
