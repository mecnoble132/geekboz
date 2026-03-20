// ── Dropdown ──────────────────────────────────────────
const moreBtn = document.getElementById('moreBtn');
const dropdown = document.getElementById('dropdown');

if (moreBtn && dropdown) {
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
}

// ── Mobile menu ───────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
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
}

// ── Carousel ──────────────────────────────────────────
const track = document.getElementById('track');
const paginationEl = document.getElementById('pagination');
const progressBar = document.getElementById('progress');

if (track && paginationEl && progressBar) {
  const slides = track.querySelectorAll('.carousel-slide');
  const TOTAL = slides.length;
  const INTERVAL = 5000;
  let current = 0;
  let autoTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'page-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
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
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
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
    void progressBar.offsetWidth;
    progressBar.style.transition = 'width ' + INTERVAL + 'ms linear';
    progressBar.style.width = '100%';
  }

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  const carouselSection = document.getElementById('carousel');
  if (carouselSection) {
    carouselSection.addEventListener('mouseenter', () => {
      clearInterval(autoTimer);
      progressBar.style.transition = 'none';
    });
    carouselSection.addEventListener('mouseleave', () => {
      startProgress();
      autoTimer = setInterval(advance, INTERVAL);
    });
    let touchX = null;
    carouselSection.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    carouselSection.addEventListener('touchend', e => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
      touchX = null;
    });
  }

  startProgress();
  autoTimer = setInterval(advance, INTERVAL);
}

// ── Prebuilts drag to scroll ───────────────────────────
const pbWrapper = document.querySelector('.pb-track-wrapper');
if (pbWrapper) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let hasDragged = false;

  pbWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    hasDragged = false;
    pbWrapper.classList.add('active');
    startX = e.pageX - pbWrapper.offsetLeft;
    scrollLeft = pbWrapper.scrollLeft;
  });

  pbWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    pbWrapper.classList.remove('active');
  });

  pbWrapper.addEventListener('mouseup', () => {
    isDown = false;
    pbWrapper.classList.remove('active');
  });

  pbWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    
    const x = e.pageX - pbWrapper.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast multiplier
    
    // Check if we've actually moved enough to be a "drag"
    if (Math.abs(walk) > 5) {
      hasDragged = true;
    }
    
    e.preventDefault();
    pbWrapper.scrollLeft = scrollLeft - walk;
  });

  // Prevent clicks if we were dragging
  pbWrapper.addEventListener('click', (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true); // Use capture phase to catch before cards
}

// ── Prebuilt Teaser (Loading from JSON) ───────────────
const teaserTrack = document.getElementById('pbTeaserTrack');
if (teaserTrack) {
  fetch('./prebuilts/products.json')
    .then(r => r.json())
    .then(data => {
      teaserTrack.innerHTML = '';
      // Show first 5 or any specific number
      const teaserItems = data.slice(0, 5);
      
      teaserItems.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'pb-card';
        card.style.animationDelay = `${i * 0.1}s`;

        // Image path adjustment: JSON uses ../assets/ for prebuilt page. 
        // Homepage needs ./assets/
        const imgSrc = p.image ? p.image.replace('../', './') : `./assets/images/prebuiltph3.webp`;

        const seriesClass = {
          gaming: 'gaming',
          creatorx: 'creatorx',
          workstation: 'workstation'
        }[p.series] || 'gaming';

        card.innerHTML = `
          <div class="pb-card-img">
            <img src="${imgSrc}" alt="${p.name}">
            <span class="pb-series-tag ${seriesClass}">${p.tag}</span>
          </div>
          <div class="pb-card-body">
            <div class="pb-card-name">GBZ <span>${p.name.replace('GBZ ', '')}</span></div>
            <div class="pb-card-specs">
              <span><i data-lucide="cpu"></i> ${p.cpu}</span>
              <span><i data-lucide="monitor"></i> ${p.gpu}</span>
            </div>
            <div class="pb-card-footer">
              <div class="pb-price">₹${p.price.toLocaleString('en-IN')}</div>
              <a href="prebuilts/product.html?id=${p.id}" class="pb-card-btn">
                View Build
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        `;
        teaserTrack.appendChild(card);
      });

      // Initialize Lucide icons
      if (window.lucide) lucide.createIcons();
    })
    .catch(err => console.error('Error loading teaser prebuilts:', err));
}