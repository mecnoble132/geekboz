/* ══════════════════════════════════════════════════════
   DATA  —  mirrors products.json + carousel_slides
   (in production this is replaced by Firebase reads)
══════════════════════════════════════════════════════ */
let products = [
    { id: "gbz-x1-air", name: "GBZ X1 AiR", series: "gaming", tag: "Gaming", price: 45399, badge: "Entry", featured: true, inStock: true, order: 1, cpu: "Intel Core i3 / AMD Ryzen 5", gpu: "NVIDIA GTX 1650 / AMD RX 6500 XT", ram: "16GB DDR4 3200MHz", storage: "500GB NVMe M.2 SSD", description: "An excellent entry into PC gaming that balances cost and performance effectively.", display: "N/A (Desktop)", cooling: "Standard Air Cooler", weight: "Approx 10 kg", fps: [{ game: "Valorant", fps: 200, settings: "Competitive" }, { game: "CS:GO", fps: 250, settings: "High" }], highlights: [{ icon: "zap", title: "Great Value", desc: "Solid 1080p gaming performance." }, { icon: "snowflake", title: "Quiet Cooling", desc: "Stays cool under regular load." }, { icon: "cpu", title: "Upgradable", desc: "Ready for future upgrades." }, { icon: "gamepad-2", title: "Game Ready", desc: "Perfect for esports." }], details: { performance: "Entry level performance for everyday gaming at 1080p.", design: "Compact ATX chassis with essential lighting.", cooling: "Reliable air cooling for sustained usage.", features: "Wired connectivity with upgrade paths for future components." }, gallery: ["../assets/images/prebuiltph3.webp", "../assets/images/prebuiltph3.webp", "../assets/images/prebuiltph3.webp"], image: "../assets/images/prebuiltph3.webp" },
    { id: "gbz-m3", name: "GBZ M3", series: "gaming", tag: "Gaming", price: 72499, badge: "Value Pick", featured: true, inStock: true, order: 2, cpu: "Intel Core i5 / AMD Ryzen 5", gpu: "NVIDIA RTX 4060 / AMD RX 7600", ram: "16GB DDR5 5200MHz", storage: "1TB NVMe M.2 SSD", description: "High performance mid-tier gaming powerhouse that delivers excellent framerates.", display: "N/A (Desktop)", cooling: "120mm AIO / Tower Air Cooler", weight: "Approx 12 kg", fps: [{ game: "Cyberpunk 2077", fps: 70, settings: "High 1080p" }, { game: "Call of Duty", fps: 120, settings: "High 1440p" }], highlights: [{ icon: "rocket", title: "Fast Performance", desc: "Handles 1440p gaming effortlessly." }, { icon: "snowflake", title: "Advanced Thermals", desc: "Tower cooler for better temps." }, { icon: "zap", title: "Rapid Storage", desc: "1TB Gen4 NVMe speeds." }, { icon: "gamepad-2", title: "Modern Gaming", desc: "Built for current-gen titles." }], details: { performance: "Solid 1440p performance in modern titles without breaking the bank.", design: "Clean aesthetic with moderate RGB configurations.", cooling: "Advanced thermals to keep components cool under heavy usage.", features: "High-fidelity audio jacks and improved VRM cooling." }, gallery: ["../assets/images/prebuiltph3.webp", "../assets/images/prebuiltph3.webp"], image: "../assets/images/prebuiltph3.webp" },
    { id: "gbz-m5", name: "GBZ M5", series: "gaming", tag: "Gaming", price: 98599, badge: "Best Seller", featured: true, inStock: true, order: 3, cpu: "Intel Core i7 / AMD Ryzen 7", gpu: "NVIDIA RTX 4070 / AMD RX 7800 XT", ram: "32GB DDR5 6000MHz", storage: "1TB Gen4 NVMe M.2 SSD", description: "A high-end rig designed purely for pushing maximum frames in your favorite games.", display: "N/A (Desktop)", cooling: "240mm AIO Liquid Cooler", weight: "Approx 13 kg", fps: [{ game: "Cyberpunk 2077", fps: 90, settings: "Ultra 1440p" }, { game: "Valorant", fps: 400, settings: "Competitive" }], highlights: [{ icon: "rocket", title: "Top Tier", desc: "Premium graphics and processor sync." }, { icon: "snowflake", title: "Liquid Cooled", desc: "240mm AIO for silent operation." }, { icon: "cpu", title: "Multitasking", desc: "32GB RAM for streaming while playing." }, { icon: "gamepad-2", title: "4K Capable", desc: "Push pixels in high resolution." }], details: { performance: "Enthusiast-level framerates even on the newest demanding releases.", design: "Tempered glass panels showcasing premium internal components.", cooling: "Dual-fan AIO setups for near-silent operation under pressure.", features: "Wi-Fi 6 readiness and vast USB I/O selection." }, gallery: ["../assets/images/prebuiltph3.webp", "../assets/images/prebuiltph3.webp"], image: "../assets/images/prebuiltph3.webp" },
    { id: "gbz-z1", name: "GBZ Z1", series: "creatorx", tag: "CreatorX", price: 107999, badge: null, featured: true, inStock: true, order: 4, cpu: "Intel Core i7 / AMD Ryzen 9", gpu: "NVIDIA RTX 4070 Super", ram: "32GB DDR5 6000MHz", storage: "2TB Gen4 NVMe M.2 SSD", description: "Built for creative professionals tackling demanding photo and video projects.", display: "N/A (Desktop)", cooling: "280mm AIO Liquid Cooler", weight: "Approx 13 kg", fps: [{ game: "Blender Render", fps: 120, settings: "Samples/min" }, { game: "Premiere Pro", fps: 60, settings: "4K Playback" }], highlights: [{ icon: "cpu", title: "Productivity", desc: "Fast rendering and real-time playback." }, { icon: "zap", title: "Massive Storage", desc: "2TB NVMe for scratch disks." }, { icon: "snowflake", title: "Reliable Cooling", desc: "280mm liquid cooling." }, { icon: "monitor", title: "Multi-Monitor", desc: "Support for up to 4 displays." }], details: { performance: "Designed with a strong multi-core capability to handle creative software suites.", design: "Professional chassis prioritizing function and minimalism.", cooling: "Optimized airflow focused on hard drive and CPU temperatures.", features: "Excellent connectivity for creative peripherals and external drives." }, gallery: ["../assets/images/prebuiltph3.webp", "../assets/images/prebuiltph3.webp"], image: "../assets/images/prebuiltph3.webp" },
    { id: "gbz-z3", name: "GBZ Z3", series: "creatorx", tag: "CreatorX", price: 143969, badge: "Pro", featured: false, inStock: true, order: 5, cpu: "Intel Core i9 / AMD Ryzen 9", gpu: "NVIDIA RTX 4080", ram: "64GB DDR5 6000MHz", storage: "2TB NVMe SSD + 2TB HDD", description: "Serious rendering capabilities for 3D modeling, high-res editing, and simulation.", display: "N/A (Desktop)", cooling: "360mm AIO Liquid Cooler", weight: "Approx 14 kg", fps: [{ game: "Unreal Engine", fps: 140, settings: "Viewport FPS" }, { game: "After Effects", fps: 60, settings: "Real-time preview" }], highlights: [{ icon: "zap", title: "Lightning Fast", desc: "Unmatched speed in compile times." }, { icon: "cpu", title: "Massive Memory", desc: "64GB RAM for huge timelines." }, { icon: "snowflake", title: "360mm AIO", desc: "Keeps the flagship CPU icy cool." }, { icon: "rocket", title: "Dual Storage", desc: "SSD speed paired with HDD bulk." }], details: { performance: "Provides top-of-the-line performance required for commercial level rendering.", design: "Stunning aesthetics with comprehensive cable management.", cooling: "Massive radiator setup to quickly exhaust heavy workload heat.", features: "Expansion slots aplenty and cutting-edge networking hardware." }, gallery: ["../assets/images/prebuiltph3.webp"], image: "../assets/images/prebuiltph3.webp" },
    { id: "gbz-z5", name: "GBZ Z5", series: "creatorx", tag: "CreatorX", price: 148999, badge: "Studio", featured: true, inStock: true, order: 6, cpu: "Intel Core i9-14900K / AMD Ryzen 9 7950X", gpu: "NVIDIA RTX 4080 Super", ram: "64GB DDR5 6400MHz", storage: "4TB NVMe SSD", description: "High-tier creator machine perfectly tuned for motion designers and seasoned editors.", display: "N/A (Desktop)", cooling: "360mm AIO Liquid Cooler", weight: "Approx 14.5 kg", fps: [{ game: "DaVinci Resolve", fps: 60, settings: "8K Playback" }, { game: "AutoCAD", fps: 160, settings: "Viewport" }], highlights: [{ icon: "cpu", title: "Heavy-duty", desc: "Multi-VFX processing made simple." }, { icon: "zap", title: "Ultra Space", desc: "4TB of ultra-fast Gen4 storage." }, { icon: "snowflake", title: "Acoustic Dampening", desc: "Silent operation chassis." }, { icon: "monitor", title: "AI Ready", desc: "Tensor cores for AI upscaling." }], details: { performance: "Extreme multi-threading capabilities handling multiple 4K/8K playbacks.", design: "Sleek and professional tower format with acoustic dampening.", cooling: "Top to bottom active cooling ensuring stability through hours of export.", features: "Premium components designed for immense longevity." }, gallery: ["../assets/images/prebuiltph3.webp"], image: "../assets/images/prebuiltph3.webp" },
    { id: "gbz-z7", name: "GBZ Z7", series: "workstation", tag: "Workstation AI", price: 199999, badge: "Flagship", featured: true, inStock: true, order: 7, cpu: "AMD Ryzen 9 9950X / Intel Core Ultra 9", gpu: "NVIDIA RTX 4090 24GB", ram: "128GB DDR5 6000MHz", storage: "8TB NVMe SSD", description: "Absolute flagship workstation geared towards AI, complex scientific simulations, and top-tier VFX.", display: "N/A (Desktop)", cooling: "Custom Loop / 420mm AIO", weight: "Approx 16 kg", fps: [{ game: "AI Training", fps: 1000, settings: "Images/sec" }, { game: "V-Ray", fps: 300, settings: "Render speed" }], highlights: [{ icon: "rocket", title: "No Compromises", desc: "The ultimate specification for AI." }, { icon: "cpu", title: "Massive RAM", desc: "128GB memory for huge datasets." }, { icon: "zap", title: "Unrivaled GPU", desc: "24GB VRAM for deep learning." }, { icon: "snowflake", title: "Maximum Airflow", desc: "Maintains clocks indefinitely." }], details: { performance: "Mind-bending performance for machine learning datasets and dense scene renders.", design: "A massive engineering feat wrapped in a professional-grade chassis.", cooling: "Customized cooling solutions designed for completely unrestrained thermal envelopes.", features: "Limitless connectivity, professional GPU support, and vast storage expandability." }, gallery: ["../assets/images/prebuiltph3.webp"], image: "../assets/images/prebuiltph3.webp" }
];

let carouselSlides = [
    { productId: "gbz-z5", tag: "New Arrival", bgImage: "https://hips.hearstapps.com/hmg-prod/images/pop-gaming-desktops-social-697a79b13a6ff.jpg", order: 1, enabled: true },
    { productId: "gbz-m5", tag: "Best Seller", bgImage: "https://hips.hearstapps.com/hmg-prod/images/pop-gaming-desktops-social-697a79b13a6ff.jpg", order: 2, enabled: true },
    { productId: "gbz-z1", tag: "Compact Beast", bgImage: "https://hips.hearstapps.com/hmg-prod/images/pop-gaming-desktops-social-697a79b13a6ff.jpg", order: 3, enabled: true },
    { productId: "gbz-z7", tag: "Workstation", bgImage: "https://hips.hearstapps.com/hmg-prod/images/pop-gaming-desktops-social-697a79b13a6ff.jpg", order: 4, enabled: true }
];

/* ══════════════════════════════════════════════════════
   SIDEBAR (mobile)
══════════════════════════════════════════════════════ */
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
    teaser: 'Teaser Section',
    carousel: 'Hero Carousel'
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

    // Close sidebar on mobile after navigating
    closeSidebar();
}

/* ══════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════ */
function renderDashboard() {
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

function toggleFeatured(id, val) {
    const p = products.find(x => x.id === id);
    if (p) p.featured = val;
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
    set('f-cooling', p.cooling || '');
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
    ['f-id', 'f-name', 'f-tag', 'f-price', 'f-badge', 'f-order', 'f-image', 'f-description',
        'f-cpu', 'f-gpu', 'f-ram', 'f-storage', 'f-cooling', 'f-weight', 'f-display',
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

function saveProduct() {
    const id = get('f-id').trim();
    const name = get('f-name').trim();
    if (!id || !name) { toast('error', 'ID and Name are required'); return; }

    const prod = {
        id,
        name,
        series: get('f-series'),
        tag: get('f-tag'),
        price: Number(get('f-price')) || 0,
        badge: get('f-badge') || null,
        order: Number(get('f-order')) || 99,
        featured: document.getElementById('f-featured').checked,
        inStock: document.getElementById('f-instock').checked,
        description: get('f-description'),
        cpu: get('f-cpu'), gpu: get('f-gpu'), ram: get('f-ram'),
        storage: get('f-storage'), cooling: get('f-cooling'),
        weight: get('f-weight'), display: get('f-display'),
        image: get('f-image'),
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

    if (editingId) {
        const idx = products.findIndex(p => p.id === editingId);
        if (idx >= 0) products[idx] = prod;
        toast('success', `${name} updated`);
    } else {
        if (products.find(p => p.id === id)) { toast('error', 'A product with this ID already exists'); return; }
        products.push(prod);
        toast('success', `${name} added to catalog`);
    }

    closeModal();
    renderProductTable();
    renderDashboard();
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

function doDelete() {
    products = products.filter(p => p.id !== deleteTargetId);
    carouselSlides = carouselSlides.filter(s => s.productId !== deleteTargetId);
    closeConfirm();
    renderProductTable();
    renderDashboard();
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
    if (p) { p.featured = val; renderTeaserList(); }
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

function saveCarousel() {
    toast('success', 'Carousel saved');
}

/* ══════════════════════════════════════════════════════
   IMAGE MANAGER  — drag-drop, gallery, main image pick
══════════════════════════════════════════════════════ */

// In-memory store for the currently open product's images
// Each entry: { dataUrl: string, isMain: boolean }
let imgStore = [];

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

function handleImgFiles(files) {
    [...files].forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = e => {
            imgStore.push({ dataUrl: e.target.result, isMain: imgStore.length === 0 });
            renderImgGrid();
            syncImgToForm();
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

// Returns gallery array for saveProduct()
function collectImgGallery() {
    return imgStore.map(img => img.dataUrl);
}

// Populate imgStore when editing an existing product
function loadImgStore(mainUrl, galleryUrls) {
    imgStore = [];
    const all = galleryUrls && galleryUrls.length ? galleryUrls : (mainUrl ? [mainUrl] : []);
    all.forEach(url => {
        imgStore.push({ dataUrl: url, isMain: url === mainUrl });
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
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        updateSlideBg(i, e.target.result);
        renderCarouselList();
    };
    reader.readAsDataURL(file);
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
   INIT
══════════════════════════════════════════════════════ */
renderDashboard();