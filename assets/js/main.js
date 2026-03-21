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

  function resetAutoPlay() {
    stopAutoPlay();
    startProgress();
    autoTimer = setTimeout(advance, INTERVAL);
  }

  function stopAutoPlay() {
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = null;
    }
    // Stop progress bar exactly where it is
    progressBar.style.transition = 'none';
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
    } catch(e) {
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
    if(!list) return;

    list.innerHTML = '';
    let grandTotal = 0;

    if(cartState.length === 0) {
        list.innerHTML = '<div class="cart-empty" style="text-align:center; padding: 2rem; color: var(--muted); font-size:0.9rem;">Your cart is empty.</div>';
    } else {
        cartState.forEach((item, idx) => {
            grandTotal += item.totalPrice;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'mini-cart-item';
            
            const pLink = item.id ? (window.location.pathname.includes('/cart/') || window.location.pathname.includes('/prebuilts/') || window.location.pathname.includes('/custom-build/') || window.location.pathname.includes('/about/') || window.location.pathname.includes('/help/') || window.location.pathname.includes('/service/') ? `../prebuilts/product.html?id=${item.id}` : `prebuilts/product.html?id=${item.id}`) : '#';

            let addonsHtml = '';
            if(item.addons && item.addons.length) {
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
    if(priceEl) priceEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
}

window.removeFromCart = function(index) {
    cartState.splice(index, 1);
    saveCart();
};

window.addToCart = function(name, base, total, addons, id = null, image = null) {
    cartState.push({ name, basePrice: base, totalPrice: total, addons, id, image });
    saveCart();
    window.toggleCart(true); 
};

window.toggleCart = function(forceOpen = null) {
    let cartWrap = document.getElementById('globalCartWrap');
    if(cartWrap) {
        if(forceOpen === true) cartWrap.classList.add('open');
        else if(forceOpen === false) cartWrap.classList.remove('open');
        else cartWrap.classList.toggle('open');
        updateCartUI();
    }
};

window.checkoutCart = function() {
    if(cartState.length === 0) return;
    let text = "Hi GeekBoz! I'd like to place an order from my cart:%0A%0A";
    let gt = 0;
    cartState.forEach((item, i) => {
        gt += item.totalPrice;
        text += `*${i+1}. ${item.name}* (Base: ₹${item.basePrice.toLocaleString('en-IN')})%0A`;
        if(item.addons && item.addons.length) {
            item.addons.forEach(a => text += `   + ${a}%0A`);
        }
        text += `   Subtotal: ₹${item.totalPrice.toLocaleString('en-IN')}%0A%0A`;
    });
    text += `*Grand Total: ₹${gt.toLocaleString('en-IN')}*%0A%0A`;
    text += "Please confirm my order details and share payment info.";
    window.open(`https://wa.me/919567776571?text=${text}`, '_blank');
};

window.goToCartPage = function() {
    const p = window.location.pathname;
    if(p.includes('/prebuilts/') || p.includes('/custom-build/') || p.includes('/about/') || p.includes('/help/') || p.includes('/legal/') || p.includes('/service/')) {
        window.location.href = '../cart/';
    } else {
        window.location.href = './cart/';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Inject UI globally
    if(!document.getElementById('globalCartWrap')) {
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
            if(btn.tagName === 'BUTTON') {
                e.preventDefault();
                window.toggleCart(true);
            }
        });
    });
    
    updateCartUI();
});