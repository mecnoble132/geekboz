/* ─── prebuilts.js ───────────────────────────────────────
   Handles: JSON load, render, filter by series/price,
   search by name, sort, dual range slider, mobile drawer,
   active filter tags, URL param series pre-filter.
─────────────────────────────────────────────────────────── */

'use strict';

// ── State ─────────────────────────────────────────────────
const state = {
    products: [],
    series: [],        // active series checkboxes
    minPrice: 0,
    maxPrice: 500000,
    search: '',
    sort: 'default'
};

const PRICE_MAX = 500000;

// ── DOM refs ──────────────────────────────────────────────
const grid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');
const resultCount = document.getElementById('resultCount');
const activeTags = document.getElementById('activeTags');
const fabBadge = document.getElementById('fabBadge');

// Desktop sidebar
const searchInput = document.getElementById('searchInput');
const minPriceEl = document.getElementById('minPrice');
const maxPriceEl = document.getElementById('maxPrice');
const minRange = document.getElementById('minRange');
const maxRange = document.getElementById('maxRange');
const priceFill = document.getElementById('priceFill');
const minLabel = document.getElementById('minLabel');
const maxLabel = document.getElementById('maxLabel');
const sortSelect = document.getElementById('sortSelect');

// Mobile drawer
const searchMobile = document.getElementById('searchInputMobile');
const minPriceMob = document.getElementById('minPriceMobile');
const maxPriceMob = document.getElementById('maxPriceMobile');
const minRangeMob = document.getElementById('minRangeMobile');
const maxRangeMob = document.getElementById('maxRangeMobile');
const priceFillMob = document.getElementById('priceFillMobile');
const minLabelMob = document.getElementById('minLabelMobile');
const maxLabelMob = document.getElementById('maxLabelMobile');

// ── Format price ──────────────────────────────────────────
function formatPrice(n) {
    return '₹' + n.toLocaleString('en-IN');
}

// ── Update dual-range fill track ─────────────────────────
function updateFill(minEl, maxEl, fillEl) {
    if (!minEl || !maxEl || !fillEl) return;
    const min = parseInt(minEl.value);
    const max = parseInt(maxEl.value);
    const pct1 = (min / PRICE_MAX) * 100;
    const pct2 = (max / PRICE_MAX) * 100;
    fillEl.style.left = pct1 + '%';
    fillEl.style.width = (pct2 - pct1) + '%';
}

// ── Sync both sets of range/number inputs ─────────────────
function syncRangeToState() {
    state.minPrice = parseInt(minRange.value) || 0;
    state.maxPrice = parseInt(maxRange.value) || PRICE_MAX;
    minPriceEl.value = state.minPrice || '';
    maxPriceEl.value = state.maxPrice === PRICE_MAX ? '' : state.maxPrice;
    minLabel.textContent = formatPrice(state.minPrice);
    maxLabel.textContent = formatPrice(state.maxPrice);
    updateFill(minRange, maxRange, priceFill);
}

function syncMobileRangeToState() {
    state.minPrice = parseInt(minRangeMob.value) || 0;
    state.maxPrice = parseInt(maxRangeMob.value) || PRICE_MAX;
    minPriceMob.value = state.minPrice || '';
    maxPriceMob.value = state.maxPrice === PRICE_MAX ? '' : state.maxPrice;
    minLabelMob.textContent = formatPrice(state.minPrice);
    maxLabelMob.textContent = formatPrice(state.maxPrice);
    updateFill(minRangeMob, maxRangeMob, priceFillMob);
}

// ── Get checked series ────────────────────────────────────
function getCheckedSeries(groupId) {
    const boxes = document.querySelectorAll(`#${groupId} input[type="checkbox"]`);
    return Array.from(boxes).filter(b => b.checked).map(b => b.value);
}

// ── Render cards ──────────────────────────────────────────
function renderCards(products) {
    grid.innerHTML = '';

    if (products.length === 0) {
        emptyState.style.display = 'flex';
        resultCount.innerHTML = '<span>0</span> builds found';
        return;
    }

    emptyState.style.display = 'none';
    resultCount.innerHTML = `<span>${products.length}</span> build${products.length !== 1 ? 's' : ''} found`;

    products.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'pb-card';
        card.style.animationDelay = `${i * 0.04}s`;

        // Fallback image placeholder
        const imgSrc = p.image || `https://placehold.co/400x400/0e1420/A4F93F?text=${encodeURIComponent(p.name)}`;

        // Series tag class map
        const seriesClass = {
            gaming: 'gaming',
            creatorx: 'creatorx',
            workstation: 'workstation'
        }[p.series] || 'gaming';

        card.innerHTML = `
      <div class="pb-card-img">
        <img
          src="${imgSrc}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.src='https://placehold.co/400x400/0e1420/A4F93F?text=${encodeURIComponent(p.name)}'"
        >
        <span class="pb-series-tag ${seriesClass}">${p.tag}</span>
        ${p.badge ? `<span class="pb-badge-tag">${p.badge}</span>` : ''}
      </div>
      <div class="pb-card-body">
        <div class="pb-card-name">GBZ <span>${p.name.replace('GBZ ', '')}</span></div>
        <div class="pb-card-specs">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
              <path d="M15 2v2M9 2v2M2 15h2M2 9h2M22 15h-2M22 9h-2M15 22v-2M9 22v-2"/>
            </svg>
            ${p.cpu}
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            ${p.gpu}
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 19v-3M10 19v-7M14 19v-5M18 19v-9"/>
            </svg>
            ${p.ram}
          </span>
        </div>
        <div class="pb-card-footer">
          <div class="pb-price">${formatPrice(p.price)}</div>
          <a href="product?id=${p.id}" class="pb-card-btn">
            View Build
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    `;

        grid.appendChild(card);
    });

    // Re-init lucide icons for newly created elements
    if (window.lucide) lucide.createIcons();
}

// ── Apply filters + sort ──────────────────────────────────
function applyFilters() {
    let filtered = [...state.products];

    // Series filtering (pills & checkboxes)
    if (state.series.length > 0) {
        filtered = filtered.filter(p => state.series.includes(p.series));
    }

    // Price
    filtered = filtered.filter(p => p.price >= state.minPrice && p.price <= state.maxPrice);

    // Search
    if (state.search.trim()) {
        const q = state.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.cpu.toLowerCase().includes(q) ||
            p.gpu.toLowerCase().includes(q) ||
            p.series.toLowerCase().includes(q)
        );
    }

    // Sort
    if (state.sort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (state.sort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    renderCards(filtered);
    updateActiveTags();
    updateFabBadge();
}

// ── Active filter tags ────────────────────────────────────
function updateActiveTags() {
    activeTags.innerHTML = '';

    // Update header pills UI based on state.series
    document.querySelectorAll('.pb-series-pill').forEach(p => p.classList.remove('active'));
    if (state.series.length === 0) {
        document.querySelector('.pb-series-pill[data-series="all"]')?.classList.add('active');
    } else if (state.series.length === 1) {
        document.querySelector(`.pb-series-pill[data-series="${state.series[0]}"]`)?.classList.add('active');
    }

    state.series.forEach(s => {
        addTag(capitalize(s), () => {
            state.series = state.series.filter(x => x !== s);
            // Uncheck box
            document.querySelectorAll(`#seriesFilters input[value="${s}"],#seriesFiltersMobile input[value="${s}"]`)
                .forEach(b => b.checked = false);
            applyFilters();
        });
    });

    if (state.minPrice > 0) {
        addTag('Min: ' + formatPrice(state.minPrice), () => {
            state.minPrice = 0;
            resetRangeMin();
            applyFilters();
        });
    }

    if (state.maxPrice < PRICE_MAX) {
        addTag('Max: ' + formatPrice(state.maxPrice), () => {
            state.maxPrice = PRICE_MAX;
            resetRangeMax();
            applyFilters();
        });
    }

    if (state.search.trim()) {
        addTag(`"${state.search}"`, () => {
            state.search = '';
            if (searchInput) searchInput.value = '';
            if (searchMobile) searchMobile.value = '';
            applyFilters();
        });
    }
}

function addTag(label, onRemove) {
    const el = document.createElement('span');
    el.className = 'pb-tag';
    el.innerHTML = `${label}<span class="pb-tag-remove">
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </span>`;
    el.querySelector('.pb-tag-remove').addEventListener('click', onRemove);
    activeTags.appendChild(el);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── FAB badge ─────────────────────────────────────────────
function updateFabBadge() {
    let count = 0;
    if (state.series.length > 0) count += state.series.length;
    if (state.minPrice > 0) count++;
    if (state.maxPrice < PRICE_MAX) count++;
    if (state.search.trim()) count++;

    if (count > 0) {
        fabBadge.style.display = 'grid';
        fabBadge.textContent = count;
    } else {
        fabBadge.style.display = 'none';
    }
}

// ── Reset helpers ─────────────────────────────────────────
function resetRangeMin() {
    minRange.value = 0;
    minRangeMob.value = 0;
    minPriceEl.value = '';
    minPriceMob.value = '';
    minLabel.textContent = formatPrice(0);
    minLabelMob.textContent = formatPrice(0);
    updateFill(minRange, maxRange, priceFill);
    updateFill(minRangeMob, maxRangeMob, priceFillMob);
}

function resetRangeMax() {
    maxRange.value = PRICE_MAX;
    maxRangeMob.value = PRICE_MAX;
    maxPriceEl.value = '';
    maxPriceMob.value = '';
    maxLabel.textContent = formatPrice(PRICE_MAX);
    maxLabelMob.textContent = formatPrice(PRICE_MAX);
    updateFill(minRange, maxRange, priceFill);
    updateFill(minRangeMob, maxRangeMob, priceFillMob);
}

function resetAllFilters() {
    state.series = [];
    state.minPrice = 0;
    state.maxPrice = PRICE_MAX;
    state.search = '';
    state.sort = 'default';

    // Uncheck all checkboxes
    document.querySelectorAll('#seriesFilters input, #seriesFiltersMobile input')
        .forEach(b => b.checked = false);

    // Reset header pills UI matches updateActiveTags, so we just reset UI here too
    document.querySelectorAll('.pb-series-pill').forEach(p => p.classList.remove('active'));
    document.querySelector('.pb-series-pill[data-series="all"]')?.classList.add('active');

    // Reset ranges
    resetRangeMin();
    resetRangeMax();

    // Reset search
    if (searchInput) searchInput.value = '';
    if (searchMobile) searchMobile.value = '';

    // Reset sort
    sortSelect.value = 'default';
    document.querySelectorAll('#sortGroup input[value="default"], #sortGroupMobile input[value="default"]')
        .forEach(r => r.checked = true);

    applyFilters();
}

// ── Event listeners — Desktop sidebar ────────────────────
if (searchInput) {
    searchInput.addEventListener('input', () => {
        state.search = searchInput.value;
        if (searchMobile) searchMobile.value = searchInput.value;
        applyFilters();
    });
}

document.querySelectorAll('#seriesFilters input').forEach(box => {
    box.addEventListener('change', () => {
        state.series = getCheckedSeries('seriesFilters');
        // Sync mobile
        document.querySelectorAll('#seriesFiltersMobile input').forEach(b => {
            b.checked = state.series.includes(b.value);
        });
        applyFilters();
    });
});

// Desktop dual range
if (minRange && maxRange) {
    minRange.addEventListener('input', () => {
        if (parseInt(minRange.value) > parseInt(maxRange.value)) {
            minRange.value = maxRange.value;
        }
        syncRangeToState();
        // Sync mobile
        minRangeMob.value = minRange.value;
        updateFill(minRangeMob, maxRangeMob, priceFillMob);
        applyFilters();
    });

    maxRange.addEventListener('input', () => {
        if (parseInt(maxRange.value) < parseInt(minRange.value)) {
            maxRange.value = minRange.value;
        }
        syncRangeToState();
        // Sync mobile
        maxRangeMob.value = maxRange.value;
        updateFill(minRangeMob, maxRangeMob, priceFillMob);
        applyFilters();
    });
}

// Desktop number inputs
if (minPriceEl) {
    minPriceEl.addEventListener('change', () => {
        const v = Math.max(0, parseInt(minPriceEl.value) || 0);
        state.minPrice = v;
        minRange.value = v;
        minRangeMob.value = v;
        minLabel.textContent = formatPrice(v);
        minLabelMob.textContent = formatPrice(v);
        updateFill(minRange, maxRange, priceFill);
        updateFill(minRangeMob, maxRangeMob, priceFillMob);
        applyFilters();
    });
}

if (maxPriceEl) {
    maxPriceEl.addEventListener('change', () => {
        const v = maxPriceEl.value === '' ? PRICE_MAX : Math.min(PRICE_MAX, parseInt(maxPriceEl.value) || PRICE_MAX);
        state.maxPrice = v;
        maxRange.value = v;
        maxRangeMob.value = v;
        maxLabel.textContent = formatPrice(v);
        maxLabelMob.textContent = formatPrice(v);
        updateFill(minRange, maxRange, priceFill);
        updateFill(minRangeMob, maxRangeMob, priceFillMob);
        applyFilters();
    });
}

// Desktop sort select (toolbar)
if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        state.sort = sortSelect.value;
        // Sync sidebar radios
        document.querySelectorAll('#sortGroup input').forEach(r => {
            r.checked = r.value === state.sort;
        });
        applyFilters();
    });
}

// Desktop sidebar sort radios
document.querySelectorAll('#sortGroup input[type="radio"]').forEach(r => {
    r.addEventListener('change', () => {
        state.sort = r.value;
        sortSelect.value = r.value;
        applyFilters();
    });
});

// Clear all (sidebar)
document.getElementById('clearFilters')?.addEventListener('click', resetAllFilters);

// Empty state reset
document.getElementById('emptyReset')?.addEventListener('click', resetAllFilters);

// ── Header series pills ───────────────────────────────────
document.querySelectorAll('.pb-series-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        const seriesName = pill.dataset.series;

        if (seriesName === 'all') {
            state.series = [];
        } else {
            state.series = [seriesName];
        }

        // Sync checkboxes
        document.querySelectorAll('#seriesFilters input, #seriesFiltersMobile input').forEach(box => {
            box.checked = state.series.includes(box.value);
        });

        applyFilters();
    });
});

// ── Mobile drawer ─────────────────────────────────────────
const filterFab = document.getElementById('filterFab');
const filterDrawer = document.getElementById('filterDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');
const drawerClear = document.getElementById('drawerClear');
const drawerApply = document.getElementById('drawerApply');

function openDrawer() {
    filterDrawer.classList.remove('closing');
    filterDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    filterDrawer.classList.add('closing');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
    filterDrawer.addEventListener('animationend', () => {
        filterDrawer.classList.remove('open', 'closing');
    }, { once: true });
}

filterFab?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
drawerOverlay?.addEventListener('click', closeDrawer);

drawerApply?.addEventListener('click', () => {
    // Read mobile state
    state.search = searchMobile?.value || '';
    if (searchInput) searchInput.value = state.search;

    state.series = getCheckedSeries('seriesFiltersMobile');
    document.querySelectorAll('#seriesFilters input').forEach(b => {
        b.checked = state.series.includes(b.value);
    });

    syncMobileRangeToState();
    // Sync desktop
    minRange.value = minRangeMob.value;
    maxRange.value = maxRangeMob.value;
    updateFill(minRange, maxRange, priceFill);
    minLabel.textContent = formatPrice(state.minPrice);
    maxLabel.textContent = formatPrice(state.maxPrice);

    const sortMobile = document.querySelector('#sortGroupMobile input[type="radio"]:checked');
    if (sortMobile) {
        state.sort = sortMobile.value;
        sortSelect.value = state.sort;
        document.querySelectorAll('#sortGroup input').forEach(r => r.checked = r.value === state.sort);
    }

    applyFilters();
    closeDrawer();
});

drawerClear?.addEventListener('click', () => {
    resetAllFilters();
    closeDrawer();
});

// Mobile drawer range sliders
if (minRangeMob && maxRangeMob) {
    minRangeMob.addEventListener('input', () => {
        if (parseInt(minRangeMob.value) > parseInt(maxRangeMob.value)) {
            minRangeMob.value = maxRangeMob.value;
        }
        syncMobileRangeToState();
    });

    maxRangeMob.addEventListener('input', () => {
        if (parseInt(maxRangeMob.value) < parseInt(minRangeMob.value)) {
            maxRangeMob.value = minRangeMob.value;
        }
        syncMobileRangeToState();
    });
}

// Mobile number inputs
if (minPriceMob) {
    minPriceMob.addEventListener('change', () => {
        const v = Math.max(0, parseInt(minPriceMob.value) || 0);
        minRangeMob.value = v;
        minLabelMob.textContent = formatPrice(v);
        updateFill(minRangeMob, maxRangeMob, priceFillMob);
    });
}

if (maxPriceMob) {
    maxPriceMob.addEventListener('change', () => {
        const v = maxPriceMob.value === '' ? PRICE_MAX : Math.min(PRICE_MAX, parseInt(maxPriceMob.value) || PRICE_MAX);
        maxRangeMob.value = v;
        maxLabelMob.textContent = formatPrice(v);
        updateFill(minRangeMob, maxRangeMob, priceFillMob);
    });
}

// Mobile search live
if (searchMobile) {
    searchMobile.addEventListener('input', () => {
        if (searchInput) searchInput.value = searchMobile.value;
    });
}

// ── Read URL params (series pre-filter from homepage) ─────
function readURLParams() {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('series');
    if (s) {
        const pill = document.querySelector(`.pb-series-pill[data-series="${s}"]`);
        if (pill) {
            pill.click();
        }
    }
}

// ── Init fill ─────────────────────────────────────────────
updateFill(minRange, maxRange, priceFill);
updateFill(minRangeMob, maxRangeMob, priceFillMob);

// ── Load products.json ────────────────────────────────────
// Show skeleton cards while loading
const SKELETON_COUNT = 6;
grid.innerHTML = Array.from({ length: SKELETON_COUNT }).map(() => `
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
resultCount.innerHTML = '<span>—</span> builds found';

fetch('./products.json')
    .then(r => r.json())
    .then(data => {
        state.products = data;
        readURLParams();
        applyFilters();
    })
    .catch(err => {
        console.error('Failed to load products.json:', err);
        grid.innerHTML = '';
        resultCount.textContent = 'Failed to load products.';
    });