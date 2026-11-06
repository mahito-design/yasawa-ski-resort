const slides = [...document.querySelectorAll('.slide')];
const controls = document.querySelector('.controls');
const counter = document.querySelector('#counter');
const toggle = document.querySelector('#toggle');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let timer = null;
function show(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => { slide.hidden = i !== current; });
  if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
}
function stop() { clearInterval(timer); timer = null; if (toggle) { toggle.textContent = '再生'; toggle.setAttribute('aria-label', '再生'); toggle.dataset.playing = 'false'; } if (window.updateSlideLabel) window.updateSlideLabel(); }
function start() { if (!timer) timer = setInterval(() => show(current + 1), 7000); if (toggle) { toggle.textContent = '一時停止'; toggle.setAttribute('aria-label', '一時停止'); toggle.dataset.playing = 'true'; } if (window.updateSlideLabel) window.updateSlideLabel(); }
document.querySelector('#previous')?.addEventListener('click', () => { stop(); show(current - 1); });
document.querySelector('#next')?.addEventListener('click', () => { stop(); show(current + 1); });
toggle?.addEventListener('click', () => timer ? stop() : start());
if (toggle) toggle.hidden = false;
motion.addEventListener('change', e => { if (e.matches) stop(); });
if (controls) controls.hidden = false;
if (motion.matches) stop(); else start();

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-menu');
const smallScreen = window.matchMedia('(max-width: 900px)');
function syncMenu() {
  menuButton.hidden = !smallScreen.matches;
  menu.hidden = smallScreen.matches;
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menu.hidden = open;
});
menu.addEventListener('click', event => {
  if (smallScreen.matches && event.target.closest('a')) {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  }
});
smallScreen.addEventListener('change', syncMenu);
syncMenu();

// Show the current photograph in each mobile course gallery.
document.querySelectorAll('.course-gallery').forEach(gallery => {
  const photos = [...gallery.querySelectorAll('img')];
  if (photos.length < 2) return;
  const indicators = document.createElement('div');
  indicators.className = 'course-dots';
  indicators.setAttribute('aria-hidden', 'true');
  const dots = photos.map(() => {
    const dot = document.createElement('span');
    dot.className = 'course-dot';
    indicators.appendChild(dot);
    return dot;
  });
  gallery.insertAdjacentElement('afterend', indicators);
  function updateDots() {
    const galleryLeft = gallery.getBoundingClientRect().left;
    let closest = 0;
    let distance = Infinity;
    photos.forEach((photo, index) => {
      const candidate = Math.abs(photo.getBoundingClientRect().left - galleryLeft);
      if (candidate < distance) { distance = candidate; closest = index; }
    });
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index === closest));
  }
  gallery.addEventListener('scroll', updateDots, { passive: true });
  window.addEventListener('resize', updateDots);
  updateDots();
});

