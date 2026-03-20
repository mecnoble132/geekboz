// ── Dropdown ──────────────────────────────────────────
const moreBtn = document.getElementById('moreBtn');
const dropdown = document.getElementById('dropdown');

moreBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = dropdown.classList.toggle('open');
  moreBtn.classList.toggle('open', open);
});
document.addEventListener('click', () => {
  dropdown.classList.remove('open');
  moreBtn.classList.remove('open');
});
dropdown.addEventListener('click', e => e.stopPropagation());


// ── Mobile menu ───────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMenu() {
  mobileMenu.classList.add('closing');
  hamburger.classList.remove('open');
  mobileMenu.addEventListener('animationend', () => {
    mobileMenu.classList.remove('open', 'closing');
  }, { once: true });
}

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  if (mobileMenu.classList.contains('open')) {
    closeMenu();
  } else {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
  }
});

document.addEventListener('click', (e) => {
  if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target)) {
    closeMenu();
  }
});
mobileMenu.addEventListener('click', e => e.stopPropagation());


// ── Carousel ──────────────────────────────────────────
const track = document.getElementById('track');
const slides = track.querySelectorAll('.carousel-slide');
const paginationEl = document.getElementById('pagination');
const progressBar = document.getElementById('progress');
const TOTAL = slides.length;
const INTERVAL = 5000;
let current = 0;
let autoTimer = null;

// Build pagination dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'page-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Slide ${i + 1}`);
  dot.addEventListener('click', () => goTo(i, true));
  paginationEl.appendChild(dot);
});

function updateDots() {
  paginationEl.querySelectorAll('.page-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function goTo(index, resetTimer = true) {
  current = (index + TOTAL) % TOTAL;
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
  if (resetTimer) {
    clearInterval(autoTimer);
    startProgress();
    autoTimer = setInterval(advance, INTERVAL);
  }
}

function advance() { goTo(current + 1, false); startProgress(); }

function startProgress() {
  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';
  void progressBar.offsetWidth; // force reflow
  progressBar.style.transition = `width ${INTERVAL}ms linear`;
  progressBar.style.width = '100%';
}

// Arrow buttons
document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

// Pause on hover
const carouselSection = document.getElementById('carousel');
carouselSection.addEventListener('mouseenter', () => {
  clearInterval(autoTimer);
  progressBar.style.transition = 'none';
});
carouselSection.addEventListener('mouseleave', () => {
  startProgress();
  autoTimer = setInterval(advance, INTERVAL);
});

// Touch swipe
let touchX = null;
carouselSection.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
carouselSection.addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
  touchX = null;
});

// Init
startProgress();
autoTimer = setInterval(advance, INTERVAL);
-e 


// ── Prebuilts drag to scroll ───────────────────────────
const pbWrapper = document.querySelector('.pb-track-wrapper');
if (pbWrapper) {
  let isDown = false, startX, scrollLeft;

  pbWrapper.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - pbWrapper.offsetLeft;
    scrollLeft = pbWrapper.scrollLeft;
  });
  pbWrapper.addEventListener('mouseleave', () => isDown = false);
  pbWrapper.addEventListener('mouseup', () => isDown = false);
  pbWrapper.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - pbWrapper.offsetLeft;
    pbWrapper.scrollLeft = scrollLeft - (x - startX);
  });
}