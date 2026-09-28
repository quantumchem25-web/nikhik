// ===== Starfield Animation =====
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function initStars() {
  const count = Math.floor((W * H) / 6000);
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      alpha: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * Math.PI * 2
    });
  }
}
initStars();
window.addEventListener('resize', initStars);

function drawStars() {
  ctx.clearRect(0, 0, W, H);
  stars.forEach(function(s) {
    s.twinkle += 0.02;
    s.y += s.speed;
    if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
    const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,' + a + ')';
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', function() { navLinks.classList.toggle('open'); });

// ===== Smooth scroll for nav links =====
document.querySelectorAll('.nav-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
    navLinks.classList.remove('open');
    setActive(link);
  });
});

function setActive(active) {
  document.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
  active.classList.add('active');
}

// ===== Planet data =====
const planets = [
  { name: 'Mercury', type: 'Terrestrial', color: '#b0b8c8', desc: 'The smallest planet and closest to the Sun. A world of extremes.' },
  { name: 'Venus', type: 'Terrestrial', color: '#f4c95d', desc: 'The hottest planet, wrapped in thick clouds of sulfuric acid.' },
  { name: 'Earth', type: 'Terrestrial', color: '#4a9eff', desc: 'Our home — the only known world to harbor life.' },
  { name: 'Mars', type: 'Terrestrial', color: '#ff5c3c', desc: 'The Red Planet, home to the tallest volcano in the solar system.' },
  { name: 'Jupiter', type: 'Gas Giant', color: '#e0a86e', desc: 'The largest planet, with a storm bigger than Earth.' },
  { name: 'Saturn', type: 'Gas Giant', color: '#f0d9a0', desc: 'Famous for its stunning rings made of ice and rock.' },
  { name: 'Uranus', type: 'Ice Giant', color: '#7fd4d4', desc: 'An ice giant that rotates on its side.' },
  { name: 'Neptune', type: 'Ice Giant', color: '#4a6fd6', desc: 'The windiest planet, with gusts over 2,000 km/h.' }
];

const grid = document.getElementById('planetGrid');
planets.forEach(function(p) {
  const card = document.createElement('div');
  card.className = 'planet-card reveal';
  card.innerHTML = '<div class="planet-orb" style="background: radial-gradient(circle at 35% 35%, ' + p.color + ', #1a1c2e 130%);"></div>' +
    '<h3 class="planet-name">' + p.name + '</h3>' +
    '<p class="planet-type">' + p.type + '</p>' +
    '<p class="planet-desc">' + p.desc + '</p>';
  grid.appendChild(card);
});

// ===== Mission timeline data =====
const missions = [
  { year: '1969', title: 'Apollo 11', desc: 'Humans first walked on the Moon.' },
  { year: '1977', title: 'Voyager 1', desc: 'The farthest human-made object from Earth.' },
  { year: '1990', title: 'Hubble Telescope', desc: 'Revolutionized our view of the universe.' },
  { year: '2012', title: 'Curiosity Rover', desc: 'Landed on Mars to search for signs of life.' },
  { year: '2021', title: 'James Webb', desc: 'The most powerful space telescope ever built.' }
];

const timeline = document.getElementById('timeline');
missions.forEach(function(m) {
  const item = document.createElement('div');
  item.className = 'timeline-item reveal';
  item.innerHTML = '<div class="timeline-dot"></div>' +
    '<div class="timeline-year">' + m.year + '</div>' +
    '<div class="timeline-title">' + m.title + '</div>' +
    '<div class="timeline-desc">' + m.desc + '</div>';
  timeline.appendChild(item);
});

// ===== Scroll reveal =====
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });

// ===== Animated counters =====
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(function(el) { counterObserver.observe(el); });

// ===== Buttons =====
document.getElementById('exploreBtn').addEventListener('click', function() {
  document.getElementById('planets').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('learnBtn').addEventListener('click', function() {
  document.getElementById('missions').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('navCta').addEventListener('click', function() {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('ctaBtn').addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Active nav link on scroll =====
const sections = ['home', 'planets', 'missions', 'about'];
window.addEventListener('scroll', function() {
  let current = 'home';
  sections.forEach(function(id) {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(function(l) {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});