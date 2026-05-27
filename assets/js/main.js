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
  const fallbackBgValue = (() => {
    const existing = track.querySelector('.carousel-slide .slide-bg')?.style?.backgroundImage;
    if (existing) return existing; // usually already contains url(...)
    // Absolute fallback (only used if Firestore has no bgImage + DOM has no slides).
    return "url('assets/images/custom_pc_showcase.png')";
  })();

  function createSlideMarkup(product, slide) {
    const name = product?.name || '';
    const shortName = name.replace(/^GBZ\s+/i, '') || product?.id || '';

    const bgValue = slide?.bgImage
      ? `url('${slide.bgImage}')`
      : fallbackBgValue;

    const seriesTag = slide?.tag || '';

    return `
      <div class="carousel-slide">
        <div class="slide-bg" style="background-image: ${bgValue}"></div>
        <div class="slide-overlay"></div>
        <div class="slide-content">
          <div class="slide-content-inner">
            <span class="slide-tag">${seriesTag}</span>
            <h2 class="slide-name">GBZ<br><span>${shortName}</span></h2>
            <p class="slide-desc">${product?.description || ''}</p>
            <div class="slide-specs">
              <div class="spec-item">
                <span class="spec-label">CPU</span>
                <span class="spec-val">${product?.cpu || ''}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">GPU</span>
                <span class="spec-val">${product?.gpu || ''}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">RAM</span>
                <span class="spec-val">${product?.ram || ''}</span>
              </div>
            </div>
            <a href="prebuilts/product/?id=${product?.id}" class="slide-cta">
              View PC
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  async function maybeRenderHomepageCarouselFromFirestore() {
    if (!window.sysApi || !window.sysApi.db) return false;
    try {
      const settingsSnap = await window.sysApi.db.collection('settings').doc('homepageCarousel').get();
      if (!settingsSnap.exists) return false;

      const data = settingsSnap.data() || {};
      const slides = Array.isArray(data.slides) ? data.slides : [];
      const enabledSlides = slides
        .filter(s => s && s.enabled)
        .sort((a, b) => (Number(a.order || 0) - Number(b.order || 0)));

      if (!enabledSlides.length) return false;

      const uniqueProductIds = [...new Set(enabledSlides.map(s => s.productId).filter(Boolean))];
      const productSnaps = await Promise.all(
        uniqueProductIds.map(pid => window.sysApi.db.collection('prebuilts').doc(pid).get())
      );

      const productById = {};
      productSnaps.forEach(snap => {
        if (snap.exists) {
          const d = snap.data() || {};
          productById[snap.id] = { id: snap.id, ...d };
        }
      });

      const slidesToRender = enabledSlides
        .map(s => {
          const product = productById[s.productId];
          if (!product) return null;
          return { product, slide: s };
        })
        .filter(Boolean);

      if (!slidesToRender.length) return false;

      track.innerHTML = '';
      track.innerHTML = slidesToRender.map(x => createSlideMarkup(x.product, x.slide)).join('');
      return true;
    } catch (err) {
      console.error('System error (C-101)');
      return false;
    }
  }

  function initCarousel() {
    const slides = track.querySelectorAll('.carousel-slide');
    const TOTAL = slides.length;
    if (!TOTAL) return;

    // Reset any existing dots (defensive).
    paginationEl.innerHTML = '';

    const INTERVAL = 5000;
    let current = 0;
    let autoTimer = null;
    let isTransitioning = false;

    // Dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'page-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => {
        if (current === i) return;
        goTo(i);
      });
      paginationEl.appendChild(dot);
    });

    function updateDots() {
      paginationEl.querySelectorAll('.page-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function startProgress() {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      void progressBar.offsetWidth; // force reflow
      progressBar.style.transition = 'width ' + INTERVAL + 'ms linear';
      progressBar.style.width = '100%';
    }

    function stopAutoPlay() {
      if (autoTimer) {
        clearTimeout(autoTimer);
        autoTimer = null;
      }
      // Stop progress bar exactly where it is
      progressBar.style.transition = 'none';
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startProgress();
      autoTimer = setTimeout(advance, INTERVAL);
    }

    function advance() {
      goTo(current + 1);
    }

    function goTo(index) {
      if (isTransitioning) return;
      isTransitioning = true;

      current = (index + TOTAL) % TOTAL;
      track.style.transform = 'translate3d(-' + (current * 100) + '%, 0, 0)';
      updateDots();
      resetAutoPlay();

      // prevent rapid clicking glitches by matching CSS track transition (0.65s)
      setTimeout(() => { isTransitioning = false; }, 650);
    }

    // Arrows
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Pause on hover
    const carouselSection = document.getElementById('carousel');
    if (carouselSection) {
      carouselSection.addEventListener('mouseenter', stopAutoPlay);
      carouselSection.addEventListener('mouseleave', resetAutoPlay);

      // Gestures
      let touchX = null;
      carouselSection.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
      carouselSection.addEventListener('touchend', e => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
        touchX = null;
      });
    }

    // Init
    resetAutoPlay();
  }

  (async () => {
    await maybeRenderHomepageCarouselFromFirestore();
    initCarousel();
  })();
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
  // Inject skeleton cards immediately
  const SKELETON_COUNT = 5;
  teaserTrack.innerHTML = Array.from({ length: SKELETON_COUNT }).map(() => `
    <div class="pb-card pb-card-skeleton">
      <div class="pb-card-img skeleton-block"></div>
      <div class="pb-card-body">
        <div class="skeleton-line skeleton-title"></div>
        <div class="skeleton-line skeleton-spec"></div>
        <div class="skeleton-line skeleton-spec short"></div>
        <div class="pb-card-footer">
          <div class="skeleton-line skeleton-price"></div>
          <div class="skeleton-line skeleton-btn"></div>
        </div>
      </div>
    </div>
  `).join('');

  async function loadTeaserItems() {
    // Wait for Firestore to be ready (important on mobile where JS can be slower)
    let retries = 0;
    const maxRetries = 10;
    while (!(window.sysApi && window.sysApi.db) && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 300));
      retries++;
    }

    if (!window.sysApi || !window.sysApi.db) {
      throw new Error('Firestore not initialized after waiting');
    }

    // Always use Firestore - never fall back to products.json (stale prices)
    const snap = await window.sysApi.db.collection('prebuilts').where('featured', '==', true).get();
    return snap.docs
      .map(doc => {
        const d = doc.data() || {};
        return {
          id: d.id || doc.id,
          ...d,
          price: Number(d.price || 0),
          order: Number(d.order || 0)
        };
      })
      .sort((a, b) => a.order - b.order)
      .slice(0, 20);
  }

  loadTeaserItems()
    .then(teaserItems => {
      teaserTrack.innerHTML = '';

      if (teaserItems.length === 0) {
        teaserTrack.innerHTML = '<p class="pb-teaser-empty">No featured builds available right now.</p>';
        return;
      }

      teaserItems.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'pb-card';
        card.style.animationDelay = `${i * 0.1}s`;

        let imgSrc = p.image || `./assets/images/prebuiltph3.webp`;
        if (imgSrc.startsWith('../assets/')) {
            imgSrc = imgSrc.replace('../assets/', '/assets/');
        }

        const seriesClass = {
          gaming: 'gaming',
          creatorx: 'creatorx',
          workstation: 'workstation'
        }[p.series] || 'gaming';

        card.innerHTML = `
          <div class="pb-card-img">
            <img src="${imgSrc}" alt="${p.name}">
            <span class="pb-series-tag ${seriesClass}">${p.tag}</span>
            ${p.badge ? `<span class="pb-badge-tag">${p.badge}</span>` : ''}
          </div>
          <div class="pb-card-body">
            <div class="pb-card-name">GBZ <span>${p.name.replace('GBZ ', '')}</span></div>
            <div class="pb-card-specs">
              <span><i data-lucide="cpu"></i> ${p.cpu}</span>
              <span><i data-lucide="monitor"></i> ${p.gpu}</span>
            </div>
            <div class="pb-card-footer">
              <div class="pb-price">₹${p.price.toLocaleString('en-IN')}</div>
              <a href="prebuilts/product/?id=${p.id}" class="pb-card-btn">
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

      if (window.lucide) lucide.createIcons();
    })
    .catch(err => {
      console.error('System error (T-102)');
      teaserTrack.innerHTML = '<p class="pb-teaser-empty">Could not load builds. Please try again later.</p>';
    });
}

// ── Cart System & WhatsApp Checkout ────────────────────
const CART_VERSION = 2; // bump when cart schema changes

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem('gbz_cart'));
    // If version doesn't match or data is in old format, reset it
    if (!raw || !raw.version || raw.version < CART_VERSION) {
      localStorage.removeItem('gbz_cart');
      return [];
    }
    return raw.items || [];
  } catch (e) {
    localStorage.removeItem('gbz_cart');
    return [];
  }
}

const cartState = loadCart();
const cartBadgeEls = document.querySelectorAll('.cart-badge');

function saveCart() {
  localStorage.setItem('gbz_cart', JSON.stringify({ version: CART_VERSION, items: cartState }));
  updateCartUI();
}

function updateCartUI() {
  // Badges update
  const total = cartState.length;
  cartBadgeEls.forEach(b => {
    b.textContent = total;
    b.style.display = total > 0 ? 'flex' : 'none';
  });

  const list = document.getElementById('cartItemsList');
  if (!list) return;

  list.innerHTML = '';
  let grandTotal = 0;

  if (cartState.length === 0) {
    list.innerHTML = '<div class="cart-empty" style="text-align:center; padding: 2rem; color: var(--muted); font-size:0.9rem;">Your cart is empty.</div>';
  } else {
    cartState.forEach((item, idx) => {
      grandTotal += item.totalPrice;
      const itemDiv = document.createElement('div');
      itemDiv.className = 'mini-cart-item';

      let pLink = '#';
      if (item.id) {
        const path = window.location.pathname;
        const isProductPage = path.includes('/product/');
        const isSubPage = path.includes('/cart/') || path.includes('/prebuilts/') || path.includes('/custom-build/') || path.includes('/about/') || path.includes('/help/') || path.includes('/service/');
        
        if (isProductPage) {
          pLink = `../?id=${item.id}`; // From prebuilts/product/ up to prebuilts/product/?id=... wait, no.
          // If we are on prebuilts/product/index.html, and we want to go to another product,
          // we just need ?id=... (since we stay in the same folder).
          pLink = `?id=${item.id}`;
        } else if (isSubPage) {
          pLink = `../prebuilts/product/?id=${item.id}`;
        } else {
          pLink = `prebuilts/product/?id=${item.id}`;
        }
      }

      let addonsHtml = '';
      if (item.addons && item.addons.length) {
        addonsHtml = `<div style="font-size: 0.7rem; color: var(--muted); margin-top: 0.15rem; line-height: 1.2;">+ ${item.addons.join('<br>+ ')}</div>`;
      }

      const imgHtml = item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border);">` : `<div style="width: 60px; height: 60px; background: var(--surface2); border-radius: 6px; border:1px solid var(--border);"></div>`;

      itemDiv.innerHTML = `
                ${imgHtml}
                <div style="flex: 1; min-width: 0;">
                    <a href="${pLink}" style="font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 700; color: var(--text); text-decoration: none; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; transition: color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--text)'">${item.name}</a>
                    <div style="font-family: 'DM Sans', sans-serif; color: var(--accent); font-weight: 700; font-size: 0.85rem; margin-top: 2px;">₹${item.totalPrice.toLocaleString('en-IN')}</div>
                    ${addonsHtml}
                </div>
                <button onclick="window.removeFromCart(${idx})" style="background: transparent; border: none; color: #ff3c5f; cursor: pointer; padding: 0.2rem; opacity: 0.6; transition: 0.2s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2m-6 3v8m4-8v8"/></svg></button>
            `;
      list.appendChild(itemDiv);
    });
  }

  const priceEl = document.getElementById('cartTotalPrice');
  if (priceEl) priceEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
}

window.removeFromCart = function (index) {
  cartState.splice(index, 1);
  saveCart();
};

window.addToCart = function (name, base, total, addons, id = null, image = null) {
  cartState.push({ name, basePrice: base, totalPrice: total, addons, id, image });
  saveCart();
  window.toggleCart(true);
};

window.toggleCart = function (forceOpen = null) {
  let cartWrap = document.getElementById('globalCartWrap');
  if (cartWrap) {
    if (forceOpen === true) cartWrap.classList.add('open');
    else if (forceOpen === false) cartWrap.classList.remove('open');
    else cartWrap.classList.toggle('open');
    updateCartUI();
  }
};

window.checkoutCart = function () {
  if (cartState.length === 0) return;
  let text = "Hi GeekBoZ! I'd like to place an order from my cart:%0A%0A";
  let gt = 0;
  cartState.forEach((item, i) => {
    gt += item.totalPrice;
    text += `*${i + 1}. ${item.name}* (Base: ₹${item.basePrice.toLocaleString('en-IN')})%0A`;
    if (item.addons && item.addons.length) {
      item.addons.forEach(a => text += `   + ${a}%0A`);
    }
    text += `   Subtotal: ₹${item.totalPrice.toLocaleString('en-IN')}%0A%0A`;
  });
  text += `*Grand Total: ₹${gt.toLocaleString('en-IN')}*%0A%0A`;
  text += "Please confirm my order details and share payment info.";
  window.open(`https://wa.me/919567776571?text=${text}`, '_blank');
};

window.goToCartPage = function () {
  const p = window.location.pathname;
  if (p.includes('/product/')) {
    window.location.href = '../../cart/';
  } else if (p.includes('/prebuilts/') || p.includes('/custom-build/') || p.includes('/about/') || p.includes('/help/') || p.includes('/legal/') || p.includes('/service/')) {
    window.location.href = '../cart/';
  } else {
    window.location.href = './cart/';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Inject UI globally
  if (!document.getElementById('globalCartWrap')) {
    const wrap = document.createElement('div');
    wrap.id = 'globalCartWrap';
    wrap.innerHTML = `
            <div class="cart-overlay" onclick="window.toggleCart(false)" style="position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 9998; opacity: 0; pointer-events: none; transition: opacity 0.3s;"></div>
            <div class="cart-panel" style="position: fixed; top: 0; right: 0; width: 100%; max-width: 400px; height: 100vh; background: var(--surface); border-left: 1px solid var(--border); box-shadow: -10px 0 40px rgba(0,0,0,0.5); z-index: 9999; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); display: flex; flex-direction: column;">
                <div style="padding: 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="font-family: 'Oxanium', sans-serif; font-size: 1.25rem;">Your Cart</h2>
                    <button onclick="window.toggleCart(false)" style="background:transparent; border:none; color: var(--text); cursor: pointer;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                </div>
                <div id="cartItemsList" style="flex: 1; overflow-y: auto; padding: 1.5rem;"></div>
                <div style="padding: 1.5rem; border-top: 1px solid var(--border); background: var(--surface2);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <span style="font-size: 1rem; color: var(--muted); font-family: 'DM Sans', sans-serif;">Grand Total</span>
                        <span id="cartTotalPrice" style="font-size: 1.5rem; font-family: 'Oxanium', sans-serif; font-weight: 800; color: var(--accent);">₹0</span>
                    </div>
                    <button onclick="window.checkoutCart()" style="width: 100%; padding: 1rem; border-radius: 8px; background: var(--accent); color: #000; font-family: 'DM Sans', sans-serif; font-weight: 700; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: transform 0.2s;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13 2 9L22 2Z"></path></svg> Complete via WhatsApp
                    </button>
                    <button onclick="window.goToCartPage()" style="display:block; width:100%; text-align:center; background:none; border:none; margin-top:1rem; color:var(--muted); text-decoration:underline; font-size:0.85rem; cursor:pointer;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--muted)'">
                        View Full Cart Page
                    </button>
                </div>
            </div>
            <style>
                #globalCartWrap.open .cart-overlay { opacity: 1; pointer-events: auto; }
                #globalCartWrap.open .cart-panel { transform: translateX(0); }

                /* ── Mini Cart Items in side panel ── */
                .mini-cart-item {
                    background: var(--surface2);
                    padding: 0.75rem;
                    border-radius: 8px;
                    margin-bottom: 0.75rem;
                    border: 1px solid var(--border);
                    display: flex;
                    gap: 0.75rem;
                    align-items: flex-start;
                    transition: border-color 0.2s;
                }
                .mini-cart-item:hover { border-color: var(--accent); }
            </style>
        `;
    document.body.appendChild(wrap);
  }

  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If it's a link (<a> tag), let it navigate naturally.
      // If it's a <button>, open the side panel.
      if (btn.tagName === 'BUTTON') {
        e.preventDefault();
        window.toggleCart(true);
      }
    });
  });

  // ── Copyright Year ────────────────────────────────────
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── WhatsApp Widget Injection ─────────────────────────
  if (!document.getElementById('whatsapp-widget')) {
    const waWidget = document.createElement('a');
    waWidget.id = 'whatsapp-widget';
    waWidget.className = 'whatsapp-widget';
    waWidget.href = 'https://wa.me/919567776571';
    waWidget.target = '_blank';
    waWidget.rel = 'noopener noreferrer';
    waWidget.setAttribute('aria-label', 'Chat with us on WhatsApp');
    waWidget.innerHTML = `
      <div class="whatsapp-label">
        <span>Online</span>
        Chat with us
      </div>
      <div class="whatsapp-icon-wrap">
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </div>
    `;

    document.body.appendChild(waWidget);
  }


  // ── Event Popup Injection ─────────────────────────────
  async function checkEventPopup() {
    if (!window.sysApi || !window.sysApi.db) return;
    try {
      // Get the most recent enabled event
      const snap = await window.sysApi.db.collection('events')
        .where('enabled', '==', true)
        .orderBy('updatedAt', 'desc')
        .limit(1)
        .get();

      if (snap.empty) return;
      const event = snap.docs[0].data();
      const eventId = snap.docs[0].id;

      // Check if already seen in this session
      if (sessionStorage.getItem('gbz_event_seen_' + eventId)) return;

      // Inject HTML
      const backdrop = document.createElement('div');
      backdrop.className = 'event-backdrop';
      backdrop.innerHTML = `
        <div class="event-modal">
          <button class="event-close" id="closeEvent">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          ${event.image ? `<img src="${event.image}" class="event-image" alt="${event.title}">` : ''}
          <div class="event-body">
            <div class="event-status">Live Event</div>
            <h2 class="event-title">${event.title}</h2>
            ${event.date ? `<div class="event-schedule"><i data-lucide="calendar" style="width:14px"></i> ${event.date}</div>` : ''}
            <p class="event-desc">${event.desc || ''}</p>
            ${event.btnUrl ? `<a href="${event.btnUrl}" class="event-cta" target="_blank" rel="noopener">${event.btnText || 'Learn More'}</a>` : ''}
          </div>
        </div>
      `;
      document.body.appendChild(backdrop);
      if (window.lucide) lucide.createIcons();

      // Show after short delay
      setTimeout(() => backdrop.classList.add('open'), 1500);

      const closeBtn = backdrop.querySelector('#closeEvent');
      closeBtn.onclick = () => {
        backdrop.classList.remove('open');
        sessionStorage.setItem('gbz_event_seen_' + eventId, 'true');
        setTimeout(() => backdrop.remove(), 500);
      };

      // Close on backdrop click
      backdrop.onclick = (e) => {
        if (e.target === backdrop) closeBtn.onclick();
      };
    } catch (err) {
      console.error('System error (E-103)');
    }
  }

  checkEventPopup();

  updateCartUI();
});