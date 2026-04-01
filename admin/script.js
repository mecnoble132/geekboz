/* ══════════════════════════════════════════════════════
   DATA  —  mirrors products.json + carousel_slides
   (in production this is replaced by Firebase reads)
══════════════════════════════════════════════════════ */
let products = [
    { id: "gbz-x1-air", name: "GBZ X1 AiR", series: "gaming", tag: "Gaming", price: 45399, originalPrice: 48899, badge: "Entry", featured: true, inStock: true, order: 1, cpu: "AMD Ryzen 5 5600G | 6C / 12T | 4.6 GHz Max Clock", gpu: "Radeon Vega 7 iGPU | 2 GB", ram: "8 GB XPG DDR4 3200 MHz", storage: "512 GB M.2 Gen 4.0 NVMe SSD", motherboard: "ASUS Prime A520 CSM", psu: "Deepcool 550W | 80+ Bronze", case: "StarLight Gaming Cabinet", description: "Entry-level office & light gaming PC with AMD's integrated Vega 7 graphics — no discrete GPU.", display: "N/A (Desktop)", cooling: "Wraith Air Cooler", weight: "Approx 10 kg", fps: [], highlights: [{ icon: "zap", title: "Great Value", desc: "Solid 1080p gaming performance." }, { icon: "snowflake", title: "Quiet Cooling", desc: "Stays cool under regular load." }, { icon: "cpu", title: "Upgradable", desc: "Ready for future upgrades." }, { icon: "gamepad-2", title: "Game Ready", desc: "Perfect for esports." }], details: { performance: "Entry level performance for everyday gaming at 1080p.", design: "Compact ATX chassis with essential lighting.", cooling: "Reliable air cooling for sustained usage.", features: "Wired connectivity with upgrade paths for future components." }, gallery: ["../assets/images/starlight.jpg", "../assets/images/starlight.jpg"], image: "../assets/images/starlight.jpg" },
    { id: "gbz-m3", name: "GBZ M3", series: "gaming", tag: "Gaming", price: 72499, originalPrice: 75689, badge: "Value Pick", featured: true, inStock: true, order: 2, cpu: "AMD Ryzen 5 5500 | 6C / 12T | 4.2 GHz Max Clock", gpu: "NVIDIA RTX 3050 2X | 6 GB VRAM", ram: "16 GB DDR4 3200 MHz", storage: "512 GB XPG Gen 4.0 SSD", motherboard: "ASUS Prime A520", psu: "Deepcool PL 550W | 80+ Bronze", case: "Starlight ARGB", description: "Budget gaming entry with RTX 3050 — solid for 1080p casual gaming and esports titles.", display: "N/A (Desktop)", cooling: "Stock Cooler", weight: "Approx 12 kg", fps: [{ game: "Valorant", fps: "250+", settings: "Ultra / 1080p" }, { game: "Fortnite", fps: "140 - 160", settings: "Competitive / High" }, { game: "Cyberpunk 2077", fps: "60 - 70", settings: "Medium (DLSS Quality)" }], highlights: [{ icon: "rocket", title: "Fast Performance", desc: "Handles 1080p gaming effortlessly." }, { icon: "snowflake", title: "Advanced Thermals", desc: "Tower cooler for better temps." }, { icon: "zap", title: "Rapid Storage", desc: "Gen4 NVMe speeds." }, { icon: "gamepad-2", title: "Modern Gaming", desc: "Built for current-gen titles." }], details: { performance: "Solid 1080p performance in modern titles without breaking the bank.", design: "Clean aesthetic with moderate RGB configurations.", cooling: "Advanced thermals to keep components cool under heavy usage.", features: "High-fidelity audio jacks and improved VRM cooling." }, gallery: ["../assets/images/starlight.jpg", "../assets/images/starlight.jpg"], image: "../assets/images/starlight.jpg" },
    { id: "gbz-m5", name: "GBZ M5", series: "gaming", tag: "Gaming", price: 98599, originalPrice: 103489, badge: "Best Seller", featured: true, inStock: true, order: 3, cpu: "AMD Ryzen 5 7500F | 6C / 12T | 5.0 GHz Max Clock", gpu: "NVIDIA RTX 3050 2X | 6 GB VRAM", ram: "16 GB DDR5 6000 MHz CL36", storage: "1 TB XPG S60 Gen 4.0 SSD", motherboard: "MSI B650M Gaming WiFi", psu: "Deepcool PL 550W | 80+ Bronze", case: "Starlight ARGB", description: "Mid-range 1080p gaming with Ryzen 5 7500F and RTX 3050 on a modern DDR5 platform.", display: "N/A (Desktop)", cooling: "AMD Wraith Stealth", weight: "Approx 13 kg", fps: [{ game: "Valorant", fps: "450+", settings: "Ultra / 1080p" }, { game: "Fortnite", fps: "210 - 240", settings: "Competitive (DX12)" }, { game: "Cyberpunk 2077", fps: "70 - 85", settings: "Medium (DLSS Quality)" }], highlights: [{ icon: "rocket", title: "Top Tier", desc: "Premium graphics and processor sync." }, { icon: "snowflake", title: "Air Cooled", desc: "Wraith Stealth for silent operation." }, { icon: "cpu", title: "Multitasking", desc: "16GB DDR5 for streaming while playing." }, { icon: "gamepad-2", title: "1080p Capable", desc: "Push pixels in high resolution." }], details: { performance: "Enthusiast-level framerates even on the newest demanding releases.", design: "Tempered glass panels showcasing premium internal components.", cooling: "Air setups for near-silent operation under pressure.", features: "Wi-Fi 6 readiness and vast USB I/O selection." }, gallery: ["../assets/images/starlight.jpg", "../assets/images/prebuiltph2.jpg"], image: "../assets/images/starlight.jpg" },
    { id: "gbz-z1", name: "GBZ Z1", series: "gaming", tag: "Gaming", price: 107999, originalPrice: 117899, badge: null, featured: true, inStock: true, order: 4, cpu: "AMD Ryzen 5 8400F | 6C / 12T | 4.7 GHz Max Clock", gpu: "NVIDIA RTX 3060 2X | 12 GB VRAM", ram: "16 GB DDR5 6000 MHz", storage: "1 TB XPG 860 Gen 4.0 SSD", motherboard: "MSI B650M Gaming WiFi", psu: "Deepcool PL 550W | 80+ Bronze", case: "AURORA ARGB", description: "A well-rounded 1080p gaming rig with RTX 3060 12 GB — great for high FPS and modern titles.", display: "N/A (Desktop)", cooling: "Deepcool AG400 ARGB", weight: "Approx 13 kg", fps: [{ game: "Valorant", fps: "580+", settings: "Ultra / 1080p" }, { game: "Fortnite", fps: "175 - 195", settings: "Epic (DX12)" }, { game: "Cyberpunk 2077", fps: "90 - 105", settings: "High (DLSS Quality)" }], highlights: [{ icon: "cpu", title: "Productivity", desc: "Fast rendering and real-time playback." }, { icon: "zap", title: "Massive Storage", desc: "1TB NVMe for scratch disks." }, { icon: "snowflake", title: "Reliable Cooling", desc: "Deepcool AG400 air cooling." }, { icon: "monitor", title: "Multi-Monitor", desc: "Support for up to 4 displays." }], details: { performance: "Designed with a strong multi-core capability to handle creative software suites.", design: "Professional chassis prioritizing function and minimalism.", cooling: "Optimized airflow focused on hard drive and CPU temperatures.", features: "Excellent connectivity for creative peripherals and external drives." }, gallery: ["../assets/images/auroro.jpg", "../assets/images/prebuiltph.png"], image: "../assets/images/auroro.jpg" },
    { id: "gbz-z3", name: "GBZ Z3", series: "gaming", tag: "Gaming", price: 143969, originalPrice: 151999, badge: "Pro", featured: false, inStock: true, order: 5, cpu: "AMD Ryzen 5 7600X | 6C / 12T | 4.7 GHz Max Clock", gpu: "AMD Radeon RX 9060 XT | 16 GB VRAM", ram: "16 GB DDR5 6000 MHz", storage: "1 TB XPG S60 Gen 4.0 SSD", motherboard: "MSI B650M Gaming WiFi", psu: "Deepcool PL 650W | 80+ Bronze", case: "AURORA ARGB", description: "AMD-focused 1080p/1440p build with RX 9060 XT 16 GB — outstanding VRAM for the price.", display: "N/A (Desktop)", cooling: "MSI A13 240mm AIO", weight: "Approx 14 kg", fps: [], highlights: [{ icon: "zap", title: "Lightning Fast", desc: "Unmatched speed in compile times." }, { icon: "cpu", title: "Massive Memory", desc: "16GB RAM for huge timelines." }, { icon: "snowflake", title: "240mm AIO", desc: "Keeps the flagship CPU icy cool." }, { icon: "rocket", title: "VRAM Storage", desc: "High VRAM speed for textures." }], details: { performance: "Provides top-of-the-line performance required for commercial level rendering.", design: "Stunning aesthetics with comprehensive cable management.", cooling: "Massive radiator setup to quickly exhaust heavy workload heat.", features: "Expansion slots aplenty and cutting-edge networking hardware." }, gallery: ["../assets/images/auroro.jpg"], image: "../assets/images/auroro.jpg" },
    { id: "gbz-z5", name: "GBZ Z5", series: "creatorx", tag: "CreatorX", price: 148999, originalPrice: 154999, badge: "Studio", featured: true, inStock: true, order: 6, cpu: "AMD Ryzen 7 9700X | 8C / 16T | 5.5 GHz Max Clock", gpu: "NVIDIA RTX 5060 Ti | 16 GB VRAM", ram: "16 GB DDR5 6000 MHz", storage: "1 TB XPG S60 Gen 4.0 SSD", motherboard: "MSI B650M Gaming WiFi", psu: "Deepcool PL 650W | 80+ Bronze", case: "AURORA ARGB", description: "Powerful 1440p gaming PC pairing Ryzen 7 9700X with RTX 5060 Ti 16 GB on a DDR5 platform.", display: "N/A (Desktop)", cooling: "MSI A13 360mm AIO", weight: "Approx 14.5 kg", fps: [{ game: "Valorant", fps: "300+", settings: "Ultra / 1440p" }, { game: "Fortnite", fps: "130 - 150", settings: "Epic (DX12)" }, { game: "Cyberpunk 2077", fps: "75 - 90", settings: "Ultra (DLSS Quality, RT Med)" }], highlights: [{ icon: "cpu", title: "Heavy-duty", desc: "Multi-VFX processing made simple." }, { icon: "zap", title: "Ultra Space", desc: "1TB of ultra-fast Gen4 storage." }, { icon: "snowflake", title: "Acoustic Dampening", desc: "Silent operation chassis." }, { icon: "monitor", title: "AI Ready", desc: "Tensor cores for AI upscaling." }], details: { performance: "Extreme multi-threading capabilities handling multiple 4K/8K playbacks.", design: "Sleek and professional tower format with acoustic dampening.", cooling: "Top to bottom active cooling ensuring stability through hours of export.", features: "Premium components designed for immense longevity." }, gallery: ["../assets/images/auroro.jpg", "../assets/images/prebuiltph.png"], image: "../assets/images/auroro.jpg" },
    { id: "gbz-z7", name: "GBZ Z7", series: "workstation", tag: "Workstation AI", price: 199999, originalPrice: 214899, badge: "Flagship", featured: true, inStock: true, order: 7, cpu: "AMD Ryzen 7 9700X | 8C / 16T | 5.5 GHz Max Clock", gpu: "NVIDIA RTX 5070 | 12 GB VRAM", ram: "32 GB DDR5 6000 MHz RGB", storage: "1 TB XPG Legend 860 SSD", motherboard: "MSI B850 PRO Gaming WiFi", psu: "750W | 80+ PCIe 5 Certified", case: "Stellar Prime ARGB", description: "Flagship build with RTX 5070 12 GB and Ryzen 7 9700X — the best of the range for 1440p and 4K gaming.", display: "N/A (Desktop)", cooling: "MSI A13 360mm AIO", weight: "Approx 16 kg", fps: [], highlights: [{ icon: "rocket", title: "No Compromises", desc: "The ultimate specification for AI." }, { icon: "cpu", title: "Massive RAM", desc: "32GB memory for huge datasets." }, { icon: "zap", title: "Unrivaled GPU", desc: "12GB VRAM for deep learning." }, { icon: "snowflake", title: "Maximum Airflow", desc: "Maintains clocks indefinitely." }], details: { performance: "Mind-bending performance for machine learning datasets and dense scene renders.", design: "A massive engineering feat wrapped in a professional-grade chassis.", cooling: "Customized cooling solutions designed for completely unrestrained thermal envelopes.", features: "Limitless connectivity, professional GPU support, and vast storage expandability." }, gallery: ["../assets/images/stellar.webp", "../assets/images/prebuiltph.png"], image: "../assets/images/stellar.webp" }
];

let carouselSlides = [
    { productId: "gbz-z5", tag: "New Arrival", bgImage: "../assets/images/auroro.jpg", order: 1, enabled: true },
    { productId: "gbz-m5", tag: "Best Seller", bgImage: "../assets/images/starlight.jpg", order: 2, enabled: true },
    { productId: "gbz-z1", tag: "Compact Beast", bgImage: "../assets/images/auroro.jpg", order: 3, enabled: true },
    { productId: "gbz-z7", tag: "Workstation", bgImage: "../assets/images/stellar.webp", order: 4, enabled: true }
];

let events = [];
let addons = [];

// Admin authentication gate (Firebase Auth)
let adminAuthorized = false;
let adminGateStarted = false;

function setAuthGateVisible(visible) {
    const gate = document.getElementById('authGate');
    if (!gate) return;
    gate.style.display = visible ? 'flex' : 'none';
}

async function isCurrentUserAdmin(user) {
    try {
        if (!user || !window.fb || !window.fb.db) return false;
        const snap = await window.fb.db.collection('roles').doc(user.uid).get();
        const data = snap.data();
        return !!data && data.role === 'admin';
    } catch (e) {
        console.error('Role check failed:', e);
        return false;
    }
}

function initAdminAuthGate() {
    if (adminGateStarted) return;
    adminGateStarted = true;

    setAuthGateVisible(true);
    const statusSpan = document.querySelector('.sidebar-footer .status-info span');
    if (statusSpan) statusSpan.textContent = 'Sign in required';

    const emailEl = document.getElementById('adminEmail');
    const passEl = document.getElementById('adminPassword');
    const btn = document.getElementById('adminSignInBtn');
    const msgEl = document.getElementById('authMsg');

    if (!window.fb || !window.fb.auth || !window.fb.db) {
        if (msgEl) msgEl.textContent = 'Firebase is not configured yet.';
        return;
    }

    if (btn && emailEl && passEl) {
        btn.addEventListener('click', async () => {
            const email = (emailEl.value || '').trim();
            const password = passEl.value || '';

            if (!email || !password) {
                if (msgEl) msgEl.textContent = 'Enter email and password.';
                return;
            }

            try {
                btn.disabled = true;
                if (msgEl) msgEl.textContent = 'Signing in...';
                await window.fb.auth.signInWithEmailAndPassword(email, password);
            } catch (e) {
                console.error('Sign-in failed:', e);
                if (msgEl) msgEl.textContent = e?.message || 'Sign-in failed.';
                setAuthGateVisible(true);
            } finally {
                btn.disabled = false;
            }
        });
    }

    window.fb.auth.onAuthStateChanged(async (user) => {
        adminAuthorized = false;

        if (!user) {
            if (msgEl) msgEl.textContent = 'Please sign in as admin.';
            setAuthGateVisible(true);
            return;
        }

        const ok = await isCurrentUserAdmin(user);
        if (!ok) {
            if (msgEl) msgEl.textContent = 'Access denied: admin role required.';
            setAuthGateVisible(true);
            try { await window.fb.auth.signOut(); } catch (_) { }
            return;
        }

        // Authorized.
        adminAuthorized = true;
        if (msgEl) msgEl.textContent = '';
        setAuthGateVisible(false);
        if (statusSpan) statusSpan.textContent = 'Signed in (admin)';

        // Load Firestore-backed state, then render views.
        await loadAdminDataFromFirestore();
        renderDashboard();
        renderProductTable();
        renderTeaserList();
        renderCarouselList();
        renderEventTable();
        renderAddonTable();
    });
}

/* ══════════════════════════════════════════════════════
   SIDEBAR (mobile)
══════════════════════════════════════════════════════ */
async function loadAdminDataFromFirestore() {
    try {
        // Products
        const productsSnap = await window.fb.db.collection('prebuilts').orderBy('order').get();
        if (!productsSnap.empty) {
            products = productsSnap.docs.map(doc => {
                const d = doc.data() || {};
                return {
                    id: d.id || doc.id,
                    ...d,
                    price: Number(d.price || 0),
                    order: Number(d.order || 0),
                    featured: !!d.featured,
                    inStock: !!d.inStock,
                    badge: d.badge || null,
                    fps: Array.isArray(d.fps) ? d.fps : [],
                    highlights: Array.isArray(d.highlights) ? d.highlights : [],
                    details: d.details && typeof d.details === 'object'
                        ? d.details
                        : { performance: '', design: '', cooling: '', features: '' },
                    gallery: Array.isArray(d.gallery) ? d.gallery : [],
                    image: d.image || ''
                };
            });
        }
    } catch (e) {
        console.warn('Could not load products from Firebase (using fallbacks):', e);
    }

    try {
        // Carousel settings
        carouselSlides = [];
        const carouselSnap = await window.fb.db.collection('settings').doc('homepageCarousel').get();
        if (carouselSnap.exists) {
            const rawSlides = (carouselSnap.data() || {}).slides;
            if (Array.isArray(rawSlides)) {
                carouselSlides = rawSlides
                    .filter(s => s)
                    .map(s => ({
                        productId: s.productId,
                        tag: s.tag || '',
                        bgImage: s.bgImage || '',
                        order: Number(s.order || 0),
                        enabled: !!s.enabled
                    }))
                    .sort((a, b) => a.order - b.order);
            }
        }
    } catch (e) {
        console.warn('Could not load carousel settings:', e);
    }

    try {
        // Events
        const eventsSnap = await window.fb.db.collection('events').get();
        events = eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.warn('Could not load events:', e);
    }

    try {
        // Add-ons
        const addonsSnap = await window.fb.db.collection('addons').orderBy('order', 'asc').get();
        addons = addonsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.warn('Could not load addons:', e);
    }
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.add('open');
    overlay.style.display = 'block';
    // trigger reflow then fade in
    requestAnimationFrame(() => overlay.classList.add('visible'));
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }, 280);
}

/* ══════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════ */
const pageTitles = {
    dashboard: 'Dashboard',
    products: 'All Products',
    addons: 'Add-ons & Upgrades',
    teaser: 'Teaser Section',
    carousel: 'Hero Carousel',
    events: 'Live Events'
};

function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => {
        if (n.getAttribute('onclick') === `navigate('${page}')`) n.classList.add('active');
    });
    document.getElementById('headerTitle').textContent = pageTitles[page];

    if (page === 'dashboard') renderDashboard();
    if (page === 'products') renderProductTable();
    if (page === 'teaser') renderTeaserList();
    if (page === 'carousel') renderCarouselList();
    if (page === 'events') renderEventTable();
    if (page === 'addons') renderAddonTable();

    // Close sidebar on mobile after navigating
    closeSidebar();
}

/* ══════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════ */
function renderDashboard() {
    if (!adminAuthorized) {
        // Start the auth gate when the dashboard is first requested.
        initAdminAuthGate();
        return;
    }
    document.getElementById('stat-total').textContent = products.length;
    document.getElementById('stat-stock').textContent = products.filter(p => p.inStock).length;
    document.getElementById('stat-featured').textContent = products.filter(p => p.featured).length;
    document.getElementById('stat-carousel').textContent = carouselSlides.filter(s => s.enabled).length;

    const seriesMap = {};
    products.forEach(p => { seriesMap[p.series] = (seriesMap[p.series] || 0) + 1; });
    const labels = { gaming: 'Gaming', creatorx: 'CreatorX', workstation: 'Workstation AI' };

    document.getElementById('series-breakdown').innerHTML = Object.entries(seriesMap).map(([k, v]) => `
        <div class="series-chip">
            <div class="series-chip-label">${labels[k] || k}</div>
            <div class="series-chip-count">${v}</div>
        </div>
    `).join('');
}

async function syncDefaultProductsToFirestore() {
    if (!adminAuthorized || !window.fb || !window.fb.db) {
        toast('error', 'Authentication required.');
        return;
    }
    const btn = document.querySelector('.btn-secondary[onclick="syncDefaultProductsToFirestore()"]');
    if(btn) btn.disabled = true;
    toast('success', 'Syncing products to DB...');
    
    try {
        const response = await fetch('../prebuilts/products.json');
        const defaultProducts = await response.json();
        
        let batch = window.fb.db.batch();
        let count = 0;
        
        for (const dp of defaultProducts) {
            const docRef = window.fb.db.collection('prebuilts').doc(dp.id);
            batch.set(docRef, dp, { merge: true });
            count++;
        }
        
        await batch.commit();
        toast('success', `Synced ${count} default specs to DB!`);
        
        // Reload dashboard
        await loadAdminDataFromFirestore();
        renderDashboard();
        renderProductTable();
        
    } catch(err) {
        console.error('Error syncing:', err);
        toast('error', 'Sync failed. See console.');
    } finally {
        if(btn) btn.disabled = false;
    }
}

/* ══════════════════════════════════════════════════════
   PRODUCT TABLE  (desktop) + PRODUCT CARDS  (mobile)
══════════════════════════════════════════════════════ */
function renderProductTable() {
    const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const s = document.getElementById('seriesFilter')?.value || '';

    const filtered = products.filter(p =>
        (!q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)) &&
        (!s || p.series === s)
    ).sort((a, b) => a.order - b.order);

    const seriesClass = { gaming: 'badge-gaming', creatorx: 'badge-creatorx', workstation: 'badge-workstation' };
    const seriesLabel = { gaming: 'Gaming', creatorx: 'CreatorX', workstation: 'Workstation AI' };

    /* ── Desktop table rows ── */
    document.getElementById('productTableBody').innerHTML = filtered.map(p => `
        <tr>
            <td>
                <div class="prod-name-cell">
                    ${p.image
            ? `<img class="prod-thumb" src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
            : ''}
                    <div class="prod-thumb-placeholder" ${p.image ? 'style="display:none"' : ''}>
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 6l4 4 3-3 3 3 4-4"/></svg>
                    </div>
                    <div>
                        <div class="prod-name">${p.name}</div>
                        <div class="prod-id">${p.id}</div>
                    </div>
                </div>
            </td>
            <td><span class="badge ${seriesClass[p.series] || ''}">${seriesLabel[p.series] || p.series}</span></td>
            <td>₹${p.price.toLocaleString('en-IN')}</td>
            <td><span class="${p.inStock ? 'in-stock' : 'out-stock'}">${p.inStock ? 'In Stock' : 'Out of Stock'}</span></td>
            <td>
                <label class="toggle">
                    <input type="checkbox" ${p.featured ? 'checked' : ''} onchange="toggleFeatured('${p.id}',this.checked)" />
                    <div class="toggle-track"></div>
                </label>
            </td>
            <td style="text-align:right">
                <div style="display:flex;gap:6px;justify-content:flex-end">
                    <button class="btn btn-ghost btn-sm btn-icon" onclick="openEditModal('${p.id}')">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg>
                    </button>
                    <button class="btn btn-danger btn-sm btn-icon" onclick="confirmDelete('${p.id}')">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('') || `<tr><td colspan="6"><div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h4"/></svg>
        <p>No products match your filters.</p></div></td></tr>`;

    /* ── Mobile product cards ── */
    document.getElementById('productCards').innerHTML = filtered.map(p => `
        <div class="product-card-item">
            <div class="product-card-thumb">
                ${p.image
            ? `<img src="${p.image}" alt="${p.name}" onerror="this.parentElement.innerHTML='<svg viewBox=&quot;0 0 16 16&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot;><rect x=&quot;1&quot; y=&quot;3&quot; width=&quot;14&quot; height=&quot;10&quot; rx=&quot;1.5&quot;/></svg>'">`
            : `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 6l4 4 3-3 3 3 4-4"/></svg>`
        }
            </div>
            <div class="product-card-info">
                <div class="product-card-name">${p.name}</div>
                <div class="product-card-meta">
                    <span class="badge ${seriesClass[p.series] || ''}">${seriesLabel[p.series] || p.series}</span>
                    <span class="${p.inStock ? 'in-stock' : 'out-stock'}">${p.inStock ? '● Stock' : '● Out'}</span>
                    ${p.featured ? '<span style="color:var(--accent);font-size:10px;font-weight:600">★ Featured</span>' : ''}
                </div>
            </div>
            <div class="product-card-price">₹${p.price.toLocaleString('en-IN')}</div>
            <div class="product-card-actions">
                <button class="btn btn-ghost btn-sm btn-icon" onclick="openEditModal('${p.id}')" title="Edit">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg>
                </button>
                <button class="btn btn-danger btn-sm btn-icon" onclick="confirmDelete('${p.id}')" title="Delete">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg>
                </button>
            </div>
        </div>
    `).join('') || `<div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h4"/></svg>
        <p>No products match your filters.</p></div>`;
}

async function toggleFeatured(id, val) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    const prev = p.featured;
    p.featured = val;

    try {
        if (!window.fb || !window.fb.db) throw new Error('Firebase not initialized');
        await window.fb.db.collection('prebuilts').doc(id).update({ featured: !!val });
        renderProductTable();
        renderDashboard();
        renderTeaserList();
    } catch (e) {
        console.error('Failed to update featured:', e);
        p.featured = prev;
        toast('error', 'Could not update featured status.');
        renderProductTable();
        renderDashboard();
        renderTeaserList();
    }
}

/* ══════════════════════════════════════════════════════
   DYNAMIC ROWS (FPS, Highlights, Gallery)
══════════════════════════════════════════════════════ */
function addRow(listId, fields) {
    const list = document.getElementById(listId);
    const row = document.createElement('div');
    row.className = 'dynamic-row';

    const isFps = listId === 'fpsList';
    const isHL = listId === 'highlightsList';
    const isGallery = listId === 'galleryList';

    if (isFps) {
        row.style.gridTemplateColumns = '1fr 80px 1fr 28px';
        row.innerHTML = `
            <input type="text" placeholder="Game" data-field="game" />
            <input type="number" placeholder="FPS" data-field="fps" />
            <input type="text" placeholder="Settings" data-field="settings" />
            <button class="remove-btn" onclick="this.closest('.dynamic-row').remove()">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l10 10M13 3L3 13"/></svg>
            </button>`;
    } else if (isHL) {
        row.style.gridTemplateColumns = '100px 1fr 1fr 28px';
        row.innerHTML = `
            <input type="text" placeholder="Icon" data-field="icon" />
            <input type="text" placeholder="Title" data-field="title" />
            <input type="text" placeholder="Description" data-field="desc" />
            <button class="remove-btn" onclick="this.closest('.dynamic-row').remove()">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l10 10M13 3L3 13"/></svg>
            </button>`;
    } else if (isGallery) {
        row.style.gridTemplateColumns = '1fr 28px';
        row.innerHTML = `
            <input type="text" placeholder="https://…" data-field="url" />
            <button class="remove-btn" onclick="this.closest('.dynamic-row').remove()">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l10 10M13 3L3 13"/></svg>
            </button>`;
    }

    list.appendChild(row);
}

function collectRows(listId, fields) {
    return [...document.getElementById(listId).querySelectorAll('.dynamic-row')].map(row => {
        const obj = {};
        fields.forEach(f => {
            const el = row.querySelector(`[data-field="${f}"]`);
            obj[f] = el ? el.value : '';
        });
        return obj;
    }).filter(obj => Object.values(obj).some(v => v));
}

/* ══════════════════════════════════════════════════════
   MODAL  —  Add / Edit
══════════════════════════════════════════════════════ */
let editingId = null;

function openAddModal() {
    editingId = null;
    document.getElementById('modalTitle').textContent = 'Add Product';
    clearForm();
    imgStore = [];
    renderImgGrid();
    document.getElementById('productModal').classList.add('open');
    setTimeout(initImgDropZone, 0);
}

function openEditModal(id) {
    editingId = id;
    const p = products.find(x => x.id === id);
    if (!p) return;

    document.getElementById('modalTitle').textContent = 'Edit Product';
    clearForm();

    set('f-id', p.id);
    set('f-name', p.name);
    document.getElementById('f-series').value = p.series;
    set('f-tag', p.tag);
    set('f-price', p.price);
    set('f-originalPrice', p.originalPrice || '');
    set('f-badge', p.badge || '');
    set('f-order', p.order);
    set('f-image', p.image || '');
    set('f-description', p.description || '');
    document.getElementById('f-featured').checked = !!p.featured;
    document.getElementById('f-instock').checked = !!p.inStock;
    set('f-cpu', p.cpu || '');
    set('f-gpu', p.gpu || '');
    set('f-ram', p.ram || '');
    set('f-storage', p.storage || '');
    set('f-motherboard', p.motherboard || '');
    set('f-cooling', p.cooling || '');
    set('f-psu', p.psu || '');
    set('f-case', p.case || '');
    set('f-weight', p.weight || '');
    set('f-display', p.display || '');

    if (p.details) {
        set('f-det-performance', p.details.performance || '');
        set('f-det-design', p.details.design || '');
        set('f-det-cooling', p.details.cooling || '');
        set('f-det-features', p.details.features || '');
    }

    // Populate dynamic rows
    p.fps?.forEach(r => {
        addRow('fpsList', ['game', 'fps', 'settings']);
        const row = document.getElementById('fpsList').lastElementChild;
        row.querySelector('[data-field="game"]').value = r.game;
        row.querySelector('[data-field="fps"]').value = r.fps;
        row.querySelector('[data-field="settings"]').value = r.settings;
    });

    p.highlights?.forEach(r => {
        addRow('highlightsList', ['icon', 'title', 'desc']);
        const row = document.getElementById('highlightsList').lastElementChild;
        row.querySelector('[data-field="icon"]').value = r.icon;
        row.querySelector('[data-field="title"]').value = r.title;
        row.querySelector('[data-field="desc"]').value = r.desc;
    });

    loadImgStore(p.image || '', p.gallery || []);

    document.getElementById('productModal').classList.add('open');
    setTimeout(initImgDropZone, 0);
}

function closeModal() {
    document.getElementById('productModal').classList.remove('open');
}

function clearForm() {
    ['f-id', 'f-name', 'f-tag', 'f-price', 'f-originalPrice', 'f-badge', 'f-order', 'f-image', 'f-description',
        'f-cpu', 'f-gpu', 'f-ram', 'f-storage', 'f-motherboard', 'f-cooling', 'f-psu', 'f-case', 'f-weight', 'f-display',
        'f-det-performance', 'f-det-design', 'f-det-cooling', 'f-det-features'
    ].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });

    document.getElementById('f-featured').checked = false;
    document.getElementById('f-instock').checked = true;
    ['fpsList', 'highlightsList'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });
    imgStore = [];
    renderImgGrid();
}

function get(id) { return document.getElementById(id)?.value || ''; }
function set(id, val) { const el = document.getElementById(id); if (el) el.value = val; }

async function saveProduct() {
    const id = get('f-id').trim();
    const name = get('f-name').trim();
    if (!id || !name) { toast('error', 'ID and Name are required'); return; }

    const prod = {
        id,
        name,
        series: get('f-series'),
        tag: get('f-tag'),
        price: Number(get('f-price')) || 0,
        originalPrice: Number(get('f-originalPrice')) || null,
        badge: get('f-badge') || null,
        order: Number(get('f-order')) || 99,
        featured: document.getElementById('f-featured').checked,
        inStock: document.getElementById('f-instock').checked,
        description: get('f-description'),
        cpu: get('f-cpu'), gpu: get('f-gpu'), ram: get('f-ram'),
        storage: get('f-storage'), motherboard: get('f-motherboard'),
        cooling: get('f-cooling'), psu: get('f-psu'), case: get('f-case'),
        weight: get('f-weight'), display: get('f-display'),
        image: get('f-image').startsWith('data:') ? '' : get('f-image'),
        fps: collectRows('fpsList', ['game', 'fps', 'settings']),
        highlights: collectRows('highlightsList', ['icon', 'title', 'desc']),
        details: {
            performance: get('f-det-performance'),
            design: get('f-det-design'),
            cooling: get('f-det-cooling'),
            features: get('f-det-features')
        },
        gallery: collectImgGallery()
    };

    if (imgStore.some(img => img.uploading)) {
        toast('error', 'Please wait for image uploads to finish.');
        return;
    }

    if (!adminAuthorized) { toast('error', 'Please sign in as admin.'); return; }
    if (!window.fb || !window.fb.db) { toast('error', 'Firebase not initialized.'); return; }

    const prodRef = window.fb.db.collection('prebuilts').doc(id);

    try {
        // Prevent accidental overwrites on "Add".
        if (!editingId) {
            const existing = await prodRef.get();
            if (existing.exists) { toast('error', 'A product with this ID already exists'); return; }
        }

        await prodRef.set(prod);

        if (editingId) {
            const idx = products.findIndex(p => p.id === editingId);
            if (idx >= 0) products[idx] = prod;
            else products.push(prod);
            toast('success', `${name} updated`);
        } else {
            products.push(prod);
            toast('success', `${name} added to catalog`);
        }
    } catch (e) {
        console.error('Failed to save product:', e);
        toast('error', 'Could not save product.');
        return;
    }

    closeModal();
    renderProductTable();
    renderDashboard();
    renderTeaserList();
    renderCarouselList();
    updateCarouselDropdown();
}

/* ══════════════════════════════════════════════════════
   DELETE
══════════════════════════════════════════════════════ */
let deleteTargetId = null;

function confirmDelete(id) {
    const p = products.find(x => x.id === id);
    deleteTargetId = id;
    document.getElementById('confirmTitle').textContent = `Delete ${p?.name}?`;
    document.getElementById('confirmMsg').textContent = 'This product will be permanently removed from the catalog.';
    document.getElementById('confirmOkBtn').onclick = doDelete;
    document.getElementById('confirmModal').classList.add('open');
}

function closeConfirm() { document.getElementById('confirmModal').classList.remove('open'); }

async function doDelete() {
    const id = deleteTargetId;
    if (!id) return;
    if (!adminAuthorized) { toast('error', 'Please sign in as admin.'); return; }
    if (!window.fb || !window.fb.db) { toast('error', 'Firebase not initialized.'); return; }

    try {
        await window.fb.db.collection('prebuilts').doc(id).delete();

        // Remove carousel slides referencing this product.
        const settingsRef = window.fb.db.collection('settings').doc('homepageCarousel');
        const settingsSnap = await settingsRef.get();
        const rawSlides = settingsSnap.exists ? (settingsSnap.data() || {}).slides : [];
        let nextSlides = Array.isArray(rawSlides) ? rawSlides.filter(s => s.productId !== id) : [];

        nextSlides.sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
        nextSlides = nextSlides.map((s, i) => ({ ...s, order: i + 1 }));

        await settingsRef.set({ slides: nextSlides });

        products = products.filter(p => p.id !== id);
        carouselSlides = nextSlides;
    } catch (e) {
        console.error('Failed to delete product:', e);
        toast('error', 'Could not delete product.');
        return;
    }

    closeConfirm();
    renderProductTable();
    renderDashboard();
    renderTeaserList();
    renderCarouselList();
    updateCarouselDropdown();
    toast('success', 'Product deleted');
}

/* ══════════════════════════════════════════════════════
   TEASER
══════════════════════════════════════════════════════ */
function renderTeaserList() {
    const list = [...products].sort((a, b) => a.order - b.order);
    const el = document.getElementById('teaserList');
    let featCount = 0;
    el.innerHTML = list.map((p) => {
        const active = p.featured;
        if (active) featCount++;
        const n = active ? featCount : '';
        return `
    <div class="mgmt-row ${active ? 'active-row' : ''}" data-id="${p.id}">
      <div class="mgmt-drag">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 4h1M10 4h1M5 8h1M10 8h1M5 12h1M10 12h1"/></svg>
      </div>
      <div class="order-num">${active && featCount <= 5 ? n : '—'}</div>
      <div class="mgmt-info">
        <div class="prod-name">${p.name}</div>
        <div class="prod-spec">${p.gpu} · ₹${p.price.toLocaleString('en-IN')}</div>
      </div>
      <label class="toggle">
        <input type="checkbox" ${active ? 'checked' : ''} onchange="setTeaserFeatured('${p.id}',this.checked)" />
        <div class="toggle-track"></div>
      </label>
    </div>`;
    }).join('');
}

function setTeaserFeatured(id, val) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    const prev = p.featured;
    p.featured = val;
    renderTeaserList();
    renderDashboard();

    if (!window.fb || !window.fb.db) return;
    window.fb.db.collection('prebuilts').doc(id).update({ featured: !!val }).then(() => {
        // no-op; UI already updated optimistically
    }).catch(e => {
        console.error('Failed to update teaser featured:', e);
        p.featured = prev;
        toast('error', 'Could not update teaser featured.');
        renderTeaserList();
        renderDashboard();
    });
}

function saveTeaser() {
    toast('success', 'Teaser settings saved');
}

/* ══════════════════════════════════════════════════════
   CAROUSEL
══════════════════════════════════════════════════════ */
function updateCarouselDropdown() {
    const sel = document.getElementById('carouselAddProduct');
    sel.innerHTML = '<option value="">— Pick a product to add —</option>' +
        products.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

function renderCarouselList() {
    updateCarouselDropdown();
    const slides = [...carouselSlides].sort((a, b) => a.order - b.order);
    const el = document.getElementById('carouselList');

    if (!slides.length) {
        el.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg><p>No slides yet. Add one above.</p></div>`;
        return;
    }

    el.innerHTML = slides.map((s, i) => {
        const p = products.find(x => x.id === s.productId);
        if (!p) return '';
        return `
    <div class="mgmt-row ${s.enabled ? 'active-row' : ''}" data-idx="${i}">
      <div class="mgmt-drag">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 4h1M10 4h1M5 8h1M10 8h1M5 12h1M10 12h1"/></svg>
      </div>
      <div class="order-num">${i + 1}</div>
      <div class="mgmt-info" style="flex:1">
        <div class="prod-name">${p.name}</div>
        <div class="prod-spec">${p.cpu} · ${p.gpu}</div>
        <div class="carousel-extra">
          <input type="text" placeholder="Slide tag (e.g. New Arrival)" value="${s.tag || ''}" oninput="updateSlideTag(${i},this.value)" />
          <div class="slide-bg-uploader" onclick="triggerSlideBgUpload(${i})" title="Click or drop an image for the slide background">
            <input type="file" accept="image/*" style="display:none" id="slideBgInput-${i}" onchange="handleSlideBgFile(${i},this)" />
            ${s.bgImage
                ? `<img src="${s.bgImage}" class="slide-bg-preview" alt="bg" /><span class="slide-bg-change">Change image</span>`
                : `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 9l3-3 3 3 3-4 5 5"/></svg><span>Upload background</span>`
            }
          </div>
        </div>
      </div>
      <label class="toggle">
        <input type="checkbox" ${s.enabled ? 'checked' : ''} onchange="toggleSlide(${i},this.checked)" />
        <div class="toggle-track"></div>
      </label>
      <button class="btn btn-danger btn-sm btn-icon" onclick="removeSlide(${i})">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg>
      </button>
    </div>`;
    }).join('');
}

function addCarouselSlide() {
    const id = document.getElementById('carouselAddProduct').value;
    if (!id) { toast('error', 'Select a product first'); return; }
    if (carouselSlides.find(s => s.productId === id)) { toast('error', 'This product is already in the carousel'); return; }
    carouselSlides.push({ productId: id, tag: '', bgImage: '', order: carouselSlides.length + 1, enabled: true });
    renderCarouselList();
}

function removeSlide(i) {
    const sorted = [...carouselSlides].sort((a, b) => a.order - b.order);
    const slide = sorted[i];
    carouselSlides = carouselSlides.filter(s => s !== slide);
    carouselSlides.forEach((s, j) => s.order = j + 1);
    renderCarouselList();
}

function toggleSlide(i, val) {
    const sorted = [...carouselSlides].sort((a, b) => a.order - b.order);
    sorted[i].enabled = val;
    renderCarouselList();
}

function updateSlideTag(i, val) {
    const sorted = [...carouselSlides].sort((a, b) => a.order - b.order);
    if (sorted[i]) sorted[i].tag = val;
}

function updateSlideBg(i, val) {
    const sorted = [...carouselSlides].sort((a, b) => a.order - b.order);
    if (sorted[i]) sorted[i].bgImage = val;
}

async function saveCarousel() {
    if (!adminAuthorized) { toast('error', 'Please sign in as admin.'); return; }
    if (!window.fb || !window.fb.db) { toast('error', 'Firebase not initialized.'); return; }

    try {
        const slides = carouselSlides
            .map(s => ({
                productId: s.productId,
                tag: s.tag || '',
                bgImage: s.bgImage || '',
                order: Number(s.order || 0),
                enabled: !!s.enabled
            }))
            .sort((a, b) => a.order - b.order);

        // Re-normalize order after sort.
        slides.forEach((s, i) => { s.order = i + 1; });

        await window.fb.db.collection('settings').doc('homepageCarousel').set({ slides });
        toast('success', 'Carousel saved');
    } catch (e) {
        console.error('Failed to save carousel:', e);
        toast('error', 'Could not save carousel.');
    }
}

/* ══════════════════════════════════════════════════════
   IMAGE MANAGER  — drag-drop, gallery, main image pick
══════════════════════════════════════════════════════ */

// In-memory store for the currently open product's images
// Each entry: { dataUrl: string, isMain: boolean }
let imgStore = [];

// Cloudinary (unsigned upload) configuration.
// TODO: replace placeholders with your Cloudinary values.
const CLOUDINARY_CLOUD_NAME = 'dzbjr3asg';
const CLOUDINARY_UPLOAD_PRESET = 'geekboz_unsigned_prebuilts';
// Folder is optional but recommended for organization.
const CLOUDINARY_FOLDER = 'geekboz/prebuilts';

function isCloudinaryConfigured() {
    return !!CLOUDINARY_CLOUD_NAME &&
        !CLOUDINARY_CLOUD_NAME.includes('PUT_') &&
        !!CLOUDINARY_UPLOAD_PRESET &&
        !CLOUDINARY_UPLOAD_PRESET.includes('PUT_');
}

async function uploadImageToCloudinary(file) {
    // If not configured yet, we silently skip uploads and keep local previews.
    if (!isCloudinaryConfigured()) return null;
    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    if (CLOUDINARY_FOLDER) formData.append('folder', CLOUDINARY_FOLDER);

    const res = await fetch(endpoint, { method: 'POST', body: formData });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.secure_url) {
        throw new Error('Cloudinary upload failed');
    }
    return data.secure_url;
}

function initImgDropZone() {
    const zone = document.getElementById('imgDropZone');
    if (!zone) return;
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        handleImgFiles(e.dataTransfer.files);
    });
}

const MAX_IMG_SIZE_MB = 5;

function handleImgFiles(files) {
    if (!isCloudinaryConfigured()) {
        toast('error', 'Image hosting (Cloudinary) is not configured. Upload images via Cloudinary or use external URLs in the image fields.');
        return;
    }

    [...files].forEach(file => {
        if (!file.type.startsWith('image/')) return;

        if (file.size > MAX_IMG_SIZE_MB * 1024 * 1024) {
            toast('error', `"${file.name}" exceeds ${MAX_IMG_SIZE_MB} MB limit.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = async e => {
            const previewUrl = e.target.result;
            const isMain = imgStore.length === 0;
            const entry = { dataUrl: previewUrl, secureUrl: null, isMain, uploading: true };
            imgStore.push(entry);

            renderImgGrid();
            syncImgToForm();

            try {
                const secureUrl = await uploadImageToCloudinary(file);
                if (secureUrl) {
                    entry.secureUrl = secureUrl;
                    entry.dataUrl = secureUrl;
                }
            } catch (err) {
                console.error('Image upload failed:', err);
                toast('error', 'Image upload failed.');
            } finally {
                entry.uploading = false;
                renderImgGrid();
                syncImgToForm();
            }
        };
        reader.readAsDataURL(file);
    });
}

function renderImgGrid() {
    const grid = document.getElementById('imgGrid');
    if (!grid) return;
    if (!imgStore.length) { grid.innerHTML = ''; return; }
    grid.innerHTML = imgStore.map((img, i) => `
        <div class="img-tile ${img.isMain ? 'img-tile-main' : ''}" onclick="setMainImg(${i})" title="${img.isMain ? 'Main image' : 'Click to set as main'}">
            <img src="${img.dataUrl}" alt="img ${i + 1}" />
            ${img.isMain ? `<div class="img-main-badge"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l2 4.5H15l-4 3 1.5 5L8 11l-4.5 2.5L5 8.5 1 5.5h5z"/></svg>Main</div>` : ''}
            <button class="img-remove-btn" onclick="removeImg(event,${i})" title="Remove">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 3l10 10M13 3L3 13"/></svg>
            </button>
        </div>
    `).join('');
}

function setMainImg(i) {
    imgStore.forEach((img, idx) => img.isMain = idx === i);
    renderImgGrid();
    syncImgToForm();
}

function removeImg(e, i) {
    e.stopPropagation();
    const wasMain = imgStore[i].isMain;
    imgStore.splice(i, 1);
    if (wasMain && imgStore.length) imgStore[0].isMain = true;
    renderImgGrid();
    syncImgToForm();
}

// Writes current imgStore back into the hidden f-image + galleryList
function syncImgToForm() {
    const main = imgStore.find(img => img.isMain);
    document.getElementById('f-image').value = main ? main.dataUrl : '';
}

// Returns gallery array for saveProduct() — excludes base64 data URLs to avoid Firestore 1MB limit
function collectImgGallery() {
    return imgStore.map(img => img.secureUrl || img.dataUrl).filter(url => !url.startsWith('data:'));
}

// Populate imgStore when editing an existing product
function loadImgStore(mainUrl, galleryUrls) {
    imgStore = [];
    const all = galleryUrls && galleryUrls.length ? galleryUrls : (mainUrl ? [mainUrl] : []);
    all.forEach(url => {
        imgStore.push({ dataUrl: url, secureUrl: url, isMain: url === mainUrl, uploading: false });
    });
    if (imgStore.length && !imgStore.some(i => i.isMain)) imgStore[0].isMain = true;
    renderImgGrid();
    syncImgToForm();
}

/* ── Carousel slide background uploader ── */
function triggerSlideBgUpload(i) {
    const input = document.getElementById(`slideBgInput-${i}`);
    if (input) input.click();
}

function handleSlideBgFile(i, input) {
    if (!isCloudinaryConfigured()) {
        toast('error', 'Image hosting not configured.');
        return;
    }
    const file = input.files[0];
    if (!file) return;
    if (file.size > MAX_IMG_SIZE_MB * 1024 * 1024) {
        toast('error', `Image exceeds ${MAX_IMG_SIZE_MB} MB limit.`);
        return;
    }
    const reader = new FileReader();
    reader.onload = e => {
        updateSlideBg(i, e.target.result);
        renderCarouselList();
    };
    reader.readAsDataURL(file);

    uploadImageToCloudinary(file)
        .then(secureUrl => {
            if (!secureUrl) return;
            updateSlideBg(i, secureUrl);
            renderCarouselList();
        })
        .catch(err => {
            console.error('Slide background upload failed:', err);
            toast('error', 'Slide background upload failed.');
        });
}

/* ══════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════ */
function toast(type, msg) {
    const wrap = document.getElementById('toastWrap');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    const icon = type === 'success'
        ? `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 8l4 4 8-8"/></svg>`
        : `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 4v4M8 11v1"/><circle cx="8" cy="8" r="6"/></svg>`;
    t.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
    wrap.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(6px)'; t.style.transition = 'all 0.2s'; setTimeout(() => t.remove(), 220); }, 3000);
}

/* ══════════════════════════════════════════════════════
   CLOSE ON BACKDROP CLICK
══════════════════════════════════════════════════════ */
document.getElementById('productModal').addEventListener('click', e => {
    if (e.target === document.getElementById('productModal')) closeModal();
});
document.getElementById('confirmModal').addEventListener('click', e => {
    if (e.target === document.getElementById('confirmModal')) closeConfirm();
});

/* ══════════════════════════════════════════════════════
   RESIZE HANDLER — re-evaluate sidebar state
══════════════════════════════════════════════════════ */
window.addEventListener('resize', () => {
    if (window.innerWidth >= 860) {
        // On desktop, reset any mobile state
        document.getElementById('sidebarOverlay').style.display = 'none';
        document.getElementById('sidebarOverlay').classList.remove('visible');
        document.body.style.overflow = '';
    }
});

/* ══════════════════════════════════════════════════════
   EVENTS
══════════════════════════════════════════════════════ */
function renderEventTable() {
    const list = events;
    
    // Desktop table
    document.getElementById('eventTableBody').innerHTML = list.map(ev => `
        <tr>
            <td>
                <div style="font-weight:600">${ev.title}</div>
            </td>
            <td>${ev.date || '—'}</td>
            <td><span class="badge ${ev.enabled ? 'badge-gaming' : ''}">${ev.enabled ? 'Active' : 'Inactive'}</span></td>
            <td style="text-align:right">
                <div style="display:flex;gap:6px;justify-content:flex-end">
                    <button class="btn btn-ghost btn-sm btn-icon" onclick="openEventEditModal('${ev.id}')">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg>
                    </button>
                    <button class="btn btn-danger btn-sm btn-icon" onclick="confirmDeleteEvent('${ev.id}')">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('') || `<tr><td colspan="4"><div class="empty-state"><p>No events found.</p></div></td></tr>`;

    // Mobile cards
    const cardEl = document.getElementById('eventCards');
    if (cardEl) {
        cardEl.innerHTML = list.map(ev => `
            <div class="product-card-item">
                <div class="product-card-info">
                    <div class="product-card-name">${ev.title}</div>
                    <div class="product-card-meta">
                        <span class="badge ${ev.enabled ? 'badge-gaming' : ''}">${ev.enabled ? 'Active' : 'Inactive'}</span>
                        <span>${ev.date || 'No schedule'}</span>
                    </div>
                </div>
                <div class="product-card-actions">
                    <button class="btn btn-ghost btn-sm btn-icon" onclick="openEventEditModal('${ev.id}')">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg>
                    </button>
                    <button class="btn btn-danger btn-sm btn-icon" onclick="confirmDeleteEvent('${ev.id}')">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg>
                    </button>
                </div>
            </div>
        `).join('') || `<div class="empty-state"><p>No events found.</p></div>`;
    }
}

let editingEventId = null;

function openEventAddModal() {
    editingEventId = null;
    document.getElementById('eventModalTitle').textContent = 'Create Event';
    clearEventForm();
    renderEventImg(''); 
    document.getElementById('eventModal').classList.add('open');
    setTimeout(initEventImgDropZone, 0);
}

function openEventEditModal(id) {
    editingEventId = id;
    const ev = events.find(x => x.id === id);
    if (!ev) return;

    document.getElementById('eventModalTitle').textContent = 'Edit Event';
    clearEventForm();

    set('ev-title', ev.title);
    set('ev-date', ev.date || '');
    set('ev-image', ev.image || '');
    set('ev-btn-text', ev.btnText || '');
    set('ev-btn-url', ev.btnUrl || '');
    set('ev-desc', ev.desc || '');
    document.getElementById('ev-enabled').checked = !!ev.enabled;

    renderEventImg(ev.image || '');

    document.getElementById('eventModal').classList.add('open');
    setTimeout(initEventImgDropZone, 0);
}

function closeEventModal() {
    document.getElementById('eventModal').classList.remove('open');
}

function clearEventForm() {
    ['ev-title', 'ev-date', 'ev-image', 'ev-btn-text', 'ev-btn-url', 'ev-desc'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('ev-enabled').checked = true;
}

async function saveEvent() {
    const title = get('ev-title').trim();
    if (!title) { toast('error', 'Title is required'); return; }

    const ev = {
        title,
        date: get('ev-date'),
        image: get('ev-image'),
        btnText: get('ev-btn-text'),
        btnUrl: get('ev-btn-url'),
        desc: get('ev-desc'),
        enabled: document.getElementById('ev-enabled').checked,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (!adminAuthorized) { toast('error', 'Please sign in as admin.'); return; }

    try {
        if (editingEventId) {
            await window.fb.db.collection('events').doc(editingEventId).update(ev);
            const idx = events.findIndex(x => x.id === editingEventId);
            if (idx >= 0) events[idx] = { ...events[idx], ...ev };
            toast('success', 'Event updated');
        } else {
            const docRef = await window.fb.db.collection('events').add(ev);
            events.push({ id: docRef.id, ...ev });
            toast('success', 'Event created');
        }
    } catch (e) {
        console.error('Failed to save event:', e);
        toast('error', 'Could not save event.');
        return;
    }

    closeEventModal();
    renderEventTable();
}

let deleteEventTargetId = null;
function confirmDeleteEvent(id) {
    deleteEventTargetId = id;
    const ev = events.find(x => x.id === id);
    document.getElementById('confirmTitle').textContent = `Delete ${ev?.title}?`;
    document.getElementById('confirmMsg').textContent = 'This event will be removed.';
    document.getElementById('confirmOkBtn').onclick = doDeleteEvent;
    document.getElementById('confirmModal').classList.add('open');
}

async function doDeleteEvent() {
    if (!deleteEventTargetId) return;
    try {
        await window.fb.db.collection('events').doc(deleteEventTargetId).delete();
        events = events.filter(x => x.id !== deleteEventTargetId);
        toast('success', 'Event deleted');
    } catch (e) {
        console.error('Failed to delete event:', e);
        toast('error', 'Could not delete event.');
    }
    closeConfirm();
    renderEventTable();
}

document.getElementById('eventModal').addEventListener('click', e => {
    if (e.target === document.getElementById('eventModal')) closeEventModal();
});

function initEventImgDropZone() {
    const zone = document.getElementById('eventImgDropZone');
    if (!zone) return;
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        handleEventImgFiles(e.dataTransfer.files);
    });
}

function handleEventImgFiles(files) {
    if (!isCloudinaryConfigured()) {
        toast('error', 'Image hosting not configured.');
        return;
    }
    const file = files[0];
    if (!file || !file.type.startsWith('image/')) return;
    
    if (file.size > MAX_IMG_SIZE_MB * 1024 * 1024) {
        toast('error', `Image exceeds ${MAX_IMG_SIZE_MB} MB limit.`);
        return;
    }

    const reader = new FileReader();
    reader.onload = async e => {
        const previewUrl = e.target.result;
        renderEventImg(previewUrl, true);
        
        try {
            const secureUrl = await uploadImageToCloudinary(file);
            if (secureUrl) {
                renderEventImg(secureUrl, false);
                document.getElementById('ev-image').value = secureUrl;
            }
        } catch (err) {
            console.error('Event image upload failed:', err);
            toast('error', 'Image upload failed.');
            renderEventImg('', false);
        }
    };
    reader.readAsDataURL(file);
}

function renderEventImg(url, uploading = false) {
    const grid = document.getElementById('eventImgGrid');
    if (!grid) return;
    if (!url) { grid.innerHTML = ''; return; }
    
    grid.innerHTML = `
        <div class="img-tile ${uploading ? 'uploading' : ''}" style="width:100%; max-width:200px">
            <img src="${url}" alt="Event Image" />
            <button class="img-remove-btn" onclick="removeEventImg(event)" title="Remove">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 3l10 10M13 3L3 13"/></svg>
            </button>
            ${uploading ? '<div style="position:absolute; inset:0; background:rgba(0,0,0,0.4); display:grid; place-items:center; font-size:10px; color:white">Uploading...</div>' : ''}
        </div>
    `;
    document.getElementById('ev-image').value = url;
}

function removeEventImg(e) {
    if (e) e.stopPropagation();
    renderEventImg('');
    document.getElementById('ev-image').value = '';
}


/* ══════════════════════════════════════════════════════
   ADD-ONS
══════════════════════════════════════════════════════ */
function renderAddonTable() {
    const tableBody = document.getElementById('addonTableBody');
    const cardsBody = document.getElementById('addonCards');
    if (!tableBody || !cardsBody) return;

    const list = [...addons].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

    tableBody.innerHTML = list.map(a => `
        <tr>
            <td>
                <div class="prod-name-cell">
                    <div>
                        <div class="prod-name">${a.title}</div>
                        ${a.highlighted ? `<div class="prod-id" style="color:var(--accent)">${a.subtitle || ''}</div>` : ''}
                    </div>
                </div>
            </td>
            <td>₹${Number(a.price).toLocaleString('en-IN')}</td>
            <td><span class="${a.highlighted ? 'in-stock' : ''}" style="${a.highlighted ? 'background:rgba(164,249,63,0.1);color:var(--accent)' : ''}">${a.highlighted ? 'Yes' : 'No'}</span></td>
            <td style="text-align:right">
                <div style="display:flex;gap:6px;justify-content:flex-end">
                    <button class="btn btn-ghost btn-sm btn-icon" onclick="openAddonModal('${a.id}')">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg>
                    </button>
                    <button class="btn btn-danger btn-sm btn-icon" onclick="confirmDeleteAddon('${a.id}')">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('') || `<tr><td colspan="4"><div class="empty-state"><p>No add-ons found.</p></div></td></tr>`;

    cardsBody.innerHTML = list.map(a => `
        <div class="product-card-item">
            <div class="product-card-info">
                <div class="product-card-name">${a.title}</div>
                ${a.highlighted ? `<div class="product-card-meta"><span style="color:var(--accent);font-size:10px;font-weight:600">★ Highlighted: ${a.subtitle}</span></div>` : ''}
            </div>
            <div class="product-card-price">₹${Number(a.price).toLocaleString('en-IN')}</div>
            <div class="product-card-actions">
                <button class="btn btn-ghost btn-sm btn-icon" onclick="openAddonModal('${a.id}')">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg>
                </button>
                <button class="btn btn-danger btn-sm btn-icon" onclick="confirmDeleteAddon('${a.id}')">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg>
                </button>
            </div>
        </div>
    `).join('') || `<div class="empty-state"><p>No add-ons found.</p></div>`;
}

let editingAddonId = null;

function openAddonModal(id = null) {
    editingAddonId = id;
    document.getElementById('addonModalTitle').textContent = id ? 'Edit Add-on' : 'Create Add-on';
    
    // Clear form
    ['ad-title', 'ad-price', 'ad-order', 'ad-subtitle', 'ad-desc'].forEach(f => {
        const el = document.getElementById(f);
        if (el) el.value = '';
    });
    const highCheck = document.getElementById('ad-highlighted');
    if (highCheck) highCheck.checked = false;

    if (id) {
        const a = addons.find(x => x.id === id);
        if (a) {
            set('ad-title', a.title || '');
            set('ad-price', a.price || '');
            set('ad-order', a.order || '');
            set('ad-subtitle', a.subtitle || '');
            set('ad-desc', a.desc || '');
            if (highCheck) highCheck.checked = !!a.highlighted;
        }
    }

    document.getElementById('addonModal').classList.add('open');
}

function closeAddonModal() {
    document.getElementById('addonModal').classList.remove('open');
}

document.getElementById('addonModal').addEventListener('click', e => {
    if (e.target === document.getElementById('addonModal')) closeAddonModal();
});

async function saveAddon() {
    const title = get('ad-title').trim();
    if (!title) { toast('error', 'Title is required'); return; }

    const ad = {
        title,
        price: Number(get('ad-price')) || 0,
        order: Number(get('ad-order')) || 99,
        highlighted: document.getElementById('ad-highlighted').checked,
        subtitle: get('ad-subtitle'),
        desc: get('ad-desc')
    };

    if (!adminAuthorized) { toast('error', 'Please sign in as admin.'); return; }
    if (!window.fb || !window.fb.db) { toast('error', 'Firebase not initialized.'); return; }

    try {
        let docRef;
        if (editingAddonId) {
            docRef = window.fb.db.collection('addons').doc(editingAddonId);
            await docRef.update(ad);
            const idx = addons.findIndex(x => x.id === editingAddonId);
            if (idx >= 0) addons[idx] = { id: editingAddonId, ...ad };
            toast('success', `Add-on updated`);
        } else {
            docRef = await window.fb.db.collection('addons').add(ad);
            addons.push({ id: docRef.id, ...ad });
            toast('success', `Add-on created`);
        }
    } catch (e) {
        console.error('Failed to save add-on:', e);
        toast('error', 'Could not save add-on.');
        return;
    }

    closeAddonModal();
    renderAddonTable();
}

function confirmDeleteAddon(id) {
    const a = addons.find(x => x.id === id);
    if (!a) return;
    deleteTargetId = id;
    document.getElementById('confirmTitle').textContent = `Delete Add-on?`;
    document.getElementById('confirmMsg').textContent = `"${a.title}" will be permanently removed.`;
    document.getElementById('confirmOkBtn').onclick = doDeleteAddon;
    document.getElementById('confirmModal').classList.add('open');
}

async function doDeleteAddon() {
    const id = deleteTargetId;
    if (!id) return;
    if (!adminAuthorized || !window.fb || !window.fb.db) return;

    try {
        await window.fb.db.collection('addons').doc(id).delete();
        addons = addons.filter(x => x.id !== id);
        toast('success', 'Add-on deleted');
    } catch (e) {
        console.error('Failed to delete add-on:', e);
        toast('error', 'Could not delete add-on.');
    }
    closeConfirm();
    renderAddonTable();
}


/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
renderDashboard();

