/* ══════════════════════════════════════════════════════
   ADMIN PANEL — SECURED MODULE
   All state is closure-scoped. Only UI event handlers
   required by HTML onclick attributes are attached to
   the window object, and every one of them checks auth.
══════════════════════════════════════════════════════ */
;(function () {
    'use strict';

    /* ── private refs to the backend API ── */
    var _api  = function () { return window.sysApi || null; };
    var _auth = function () { var a = _api(); return a ? a.auth : null; };
    var _db   = function () { var a = _api(); return a ? a.db   : null; };

    /* ══════════════════════════════════════════════════════
       DATA  —  mirrors products.json + carousel_slides
       (in production this is replaced by DB reads)
    ══════════════════════════════════════════════════════ */
    var products = [
        { id: "gbz-x1-air", name: "GBZ X1 AiR", series: "gaming", tag: "Gaming", price: 45399, originalPrice: 48899, badge: "Entry", featured: true, inStock: true, order: 1, cpu: "AMD Ryzen 5 5600G | 6C / 12T | 4.6 GHz Max Clock", gpu: "Radeon Vega 7 iGPU | 2 GB", ram: "8 GB XPG DDR4 3200 MHz", storage: "512 GB M.2 Gen 4.0 NVMe SSD", motherboard: "ASUS Prime A520 CSM", psu: "Deepcool 550W | 80+ Bronze", case: "StarLight Gaming Cabinet", description: "Entry-level office & light gaming PC with AMD's integrated Vega 7 graphics — no discrete GPU.", display: "N/A (Desktop)", cooling: "Wraith Air Cooler", weight: "Approx 10 kg", fps: [], highlights: [{ icon: "zap", title: "Great Value", desc: "Solid 1080p gaming performance." }, { icon: "snowflake", title: "Quiet Cooling", desc: "Stays cool under regular load." }, { icon: "cpu", title: "Upgradable", desc: "Ready for future upgrades." }, { icon: "gamepad-2", title: "Game Ready", desc: "Perfect for esports." }], details: { performance: "Entry level performance for everyday gaming at 1080p.", design: "Compact ATX chassis with essential lighting.", cooling: "Reliable air cooling for sustained usage.", features: "Wired connectivity with upgrade paths for future components." }, gallery: ["../assets/images/starlight.jpg", "../assets/images/starlight.jpg"], image: "../assets/images/starlight.jpg" },
        { id: "gbz-m3", name: "GBZ M3", series: "gaming", tag: "Gaming", price: 72499, originalPrice: 75689, badge: "Value Pick", featured: true, inStock: true, order: 2, cpu: "AMD Ryzen 5 5500 | 6C / 12T | 4.2 GHz Max Clock", gpu: "NVIDIA RTX 3050 2X | 6 GB VRAM", ram: "16 GB DDR4 3200 MHz", storage: "512 GB XPG Gen 4.0 SSD", motherboard: "ASUS Prime A520", psu: "Deepcool PL 550W | 80+ Bronze", case: "Starlight ARGB", description: "Budget gaming entry with RTX 3050 — solid for 1080p casual gaming and esports titles.", display: "N/A (Desktop)", cooling: "Stock Cooler", weight: "Approx 12 kg", fps: [{ game: "Valorant", fps: "250+", settings: "Ultra / 1080p" }, { game: "Fortnite", fps: "140 - 160", settings: "Competitive / High" }, { game: "Cyberpunk 2077", fps: "60 - 70", settings: "Medium (DLSS Quality)" }], highlights: [{ icon: "rocket", title: "Fast Performance", desc: "Handles 1080p gaming effortlessly." }, { icon: "snowflake", title: "Advanced Thermals", desc: "Tower cooler for better temps." }, { icon: "zap", title: "Rapid Storage", desc: "Gen4 NVMe speeds." }, { icon: "gamepad-2", title: "Modern Gaming", desc: "Built for current-gen titles." }], details: { performance: "Solid 1080p performance in modern titles without breaking the bank.", design: "Clean aesthetic with moderate RGB configurations.", cooling: "Advanced thermals to keep components cool under heavy usage.", features: "High-fidelity audio jacks and improved VRM cooling." }, gallery: ["../assets/images/starlight.jpg", "../assets/images/starlight.jpg"], image: "../assets/images/starlight.jpg" },
        { id: "gbz-m5", name: "GBZ M5", series: "gaming", tag: "Gaming", price: 98599, originalPrice: 103489, badge: "Best Seller", featured: true, inStock: true, order: 3, cpu: "AMD Ryzen 5 7500F | 6C / 12T | 5.0 GHz Max Clock", gpu: "NVIDIA RTX 3050 2X | 6 GB VRAM", ram: "16 GB DDR5 6000 MHz CL36", storage: "1 TB XPG S60 Gen 4.0 SSD", motherboard: "MSI B650M Gaming WiFi", psu: "Deepcool PL 550W | 80+ Bronze", case: "Starlight ARGB", description: "Mid-range 1080p gaming with Ryzen 5 7500F and RTX 3050 on a modern DDR5 platform.", display: "N/A (Desktop)", cooling: "AMD Wraith Stealth", weight: "Approx 13 kg", fps: [{ game: "Valorant", fps: "450+", settings: "Ultra / 1080p" }, { game: "Fortnite", fps: "210 - 240", settings: "Competitive (DX12)" }, { game: "Cyberpunk 2077", fps: "70 - 85", settings: "Medium (DLSS Quality)" }], highlights: [{ icon: "rocket", title: "Top Tier", desc: "Premium graphics and processor sync." }, { icon: "snowflake", title: "Air Cooled", desc: "Wraith Stealth for silent operation." }, { icon: "cpu", title: "Multitasking", desc: "16GB DDR5 for streaming while playing." }, { icon: "gamepad-2", title: "1080p Capable", desc: "Push pixels in high resolution." }], details: { performance: "Enthusiast-level framerates even on the newest demanding releases.", design: "Tempered glass panels showcasing premium internal components.", cooling: "Air setups for near-silent operation under pressure.", features: "Wi-Fi 6 readiness and vast USB I/O selection." }, gallery: ["../assets/images/starlight.jpg", "../assets/images/prebuiltph2.jpg"], image: "../assets/images/starlight.jpg" },
        { id: "gbz-z1", name: "GBZ Z1", series: "gaming", tag: "Gaming", price: 107999, originalPrice: 117899, badge: null, featured: true, inStock: true, order: 4, cpu: "AMD Ryzen 5 8400F | 6C / 12T | 4.7 GHz Max Clock", gpu: "NVIDIA RTX 3060 2X | 12 GB VRAM", ram: "16 GB DDR5 6000 MHz", storage: "1 TB XPG 860 Gen 4.0 SSD", motherboard: "MSI B650M Gaming WiFi", psu: "Deepcool PL 550W | 80+ Bronze", case: "AURORA ARGB", description: "A well-rounded 1080p gaming rig with RTX 3060 12 GB — great for high FPS and modern titles.", display: "N/A (Desktop)", cooling: "Deepcool AG400 ARGB", weight: "Approx 13 kg", fps: [{ game: "Valorant", fps: "580+", settings: "Ultra / 1080p" }, { game: "Fortnite", fps: "175 - 195", settings: "Epic (DX12)" }, { game: "Cyberpunk 2077", fps: "90 - 105", settings: "High (DLSS Quality)" }], highlights: [{ icon: "cpu", title: "Productivity", desc: "Fast rendering and real-time playback." }, { icon: "zap", title: "Massive Storage", desc: "1TB NVMe for scratch disks." }, { icon: "snowflake", title: "Reliable Cooling", desc: "Deepcool AG400 air cooling." }, { icon: "monitor", title: "Multi-Monitor", desc: "Support for up to 4 displays." }], details: { performance: "Designed with a strong multi-core capability to handle creative software suites.", design: "Professional chassis prioritizing function and minimalism.", cooling: "Optimized airflow focused on hard drive and CPU temperatures.", features: "Excellent connectivity for creative peripherals and external drives." }, gallery: ["../assets/images/auroro.jpg", "../assets/images/prebuiltph.png"], image: "../assets/images/auroro.jpg" },
        { id: "gbz-z3", name: "GBZ Z3", series: "gaming", tag: "Gaming", price: 143969, originalPrice: 151999, badge: "Pro", featured: false, inStock: true, order: 5, cpu: "AMD Ryzen 5 7600X | 6C / 12T | 4.7 GHz Max Clock", gpu: "AMD Radeon RX 9060 XT | 16 GB VRAM", ram: "16 GB DDR5 6000 MHz", storage: "1 TB XPG S60 Gen 4.0 SSD", motherboard: "MSI B650M Gaming WiFi", psu: "Deepcool PL 650W | 80+ Bronze", case: "AURORA ARGB", description: "AMD-focused 1080p/1440p build with RX 9060 XT 16 GB — outstanding VRAM for the price.", display: "N/A (Desktop)", cooling: "MSI A13 240mm AIO", weight: "Approx 14 kg", fps: [], highlights: [{ icon: "zap", title: "Lightning Fast", desc: "Unmatched speed in compile times." }, { icon: "cpu", title: "Massive Memory", desc: "16GB RAM for huge timelines." }, { icon: "snowflake", title: "240mm AIO", desc: "Keeps the flagship CPU icy cool." }, { icon: "rocket", title: "VRAM Storage", desc: "High VRAM speed for textures." }], details: { performance: "Provides top-of-the-line performance required for commercial level rendering.", design: "Stunning aesthetics with comprehensive cable management.", cooling: "Massive radiator setup to quickly exhaust heavy workload heat.", features: "Expansion slots aplenty and cutting-edge networking hardware." }, gallery: ["../assets/images/auroro.jpg"], image: "../assets/images/auroro.jpg" },
        { id: "gbz-z5", name: "GBZ Z5", series: "creatorx", tag: "CreatorX", price: 148999, originalPrice: 154999, badge: "Studio", featured: true, inStock: true, order: 6, cpu: "AMD Ryzen 7 9700X | 8C / 16T | 5.5 GHz Max Clock", gpu: "NVIDIA RTX 5060 Ti | 16 GB VRAM", ram: "16 GB DDR5 6000 MHz", storage: "1 TB XPG S60 Gen 4.0 SSD", motherboard: "MSI B650M Gaming WiFi", psu: "Deepcool PL 650W | 80+ Bronze", case: "AURORA ARGB", description: "Powerful 1440p gaming PC pairing Ryzen 7 9700X with RTX 5060 Ti 16 GB on a DDR5 platform.", display: "N/A (Desktop)", cooling: "MSI A13 360mm AIO", weight: "Approx 14.5 kg", fps: [{ game: "Valorant", fps: "300+", settings: "Ultra / 1440p" }, { game: "Fortnite", fps: "130 - 150", settings: "Epic (DX12)" }, { game: "Cyberpunk 2077", fps: "75 - 90", settings: "Ultra (DLSS Quality, RT Med)" }], highlights: [{ icon: "cpu", title: "Heavy-duty", desc: "Multi-VFX processing made simple." }, { icon: "zap", title: "Ultra Space", desc: "1TB of ultra-fast Gen4 storage." }, { icon: "snowflake", title: "Acoustic Dampening", desc: "Silent operation chassis." }, { icon: "monitor", title: "AI Ready", desc: "Tensor cores for AI upscaling." }], details: { performance: "Extreme multi-threading capabilities handling multiple 4K/8K playbacks.", design: "Sleek and professional tower format with acoustic dampening.", cooling: "Top to bottom active cooling ensuring stability through hours of export.", features: "Premium components designed for immense longevity." }, gallery: ["../assets/images/auroro.jpg", "../assets/images/prebuiltph.png"], image: "../assets/images/auroro.jpg" },
        { id: "gbz-z7", name: "GBZ Z7", series: "workstation", tag: "Workstation AI", price: 199999, originalPrice: 214899, badge: "Flagship", featured: true, inStock: true, order: 7, cpu: "AMD Ryzen 7 9700X | 8C / 16T | 5.5 GHz Max Clock", gpu: "NVIDIA RTX 5070 | 12 GB VRAM", ram: "32 GB DDR5 6000 MHz RGB", storage: "1 TB XPG Legend 860 SSD", motherboard: "MSI B850 PRO Gaming WiFi", psu: "750W | 80+ PCIe 5 Certified", case: "Stellar Prime ARGB", description: "Flagship build with RTX 5070 12 GB and Ryzen 7 9700X — the best of the range for 1440p and 4K gaming.", display: "N/A (Desktop)", cooling: "MSI A13 360mm AIO", weight: "Approx 16 kg", fps: [], highlights: [{ icon: "rocket", title: "No Compromises", desc: "The ultimate specification for AI." }, { icon: "cpu", title: "Massive RAM", desc: "32GB memory for huge datasets." }, { icon: "zap", title: "Unrivaled GPU", desc: "12GB VRAM for deep learning." }, { icon: "snowflake", title: "Maximum Airflow", desc: "Maintains clocks indefinitely." }], details: { performance: "Mind-bending performance for machine learning datasets and dense scene renders.", design: "A massive engineering feat wrapped in a professional-grade chassis.", cooling: "Customized cooling solutions designed for completely unrestrained thermal envelopes.", features: "Limitless connectivity, professional GPU support, and vast storage expandability." }, gallery: ["../assets/images/stellar.webp", "../assets/images/prebuiltph.png"], image: "../assets/images/stellar.webp" }
    ];

    var carouselSlides = [
        { productId: "gbz-z5", tag: "New Arrival", bgImage: "../assets/images/auroro.jpg", order: 1, enabled: true },
        { productId: "gbz-m5", tag: "Best Seller", bgImage: "../assets/images/starlight.jpg", order: 2, enabled: true },
        { productId: "gbz-z1", tag: "Compact Beast", bgImage: "../assets/images/auroro.jpg", order: 3, enabled: true },
        { productId: "gbz-z7", tag: "Workstation", bgImage: "../assets/images/stellar.webp", order: 4, enabled: true }
    ];

    var events = [];
    var addons = [];

    /* ── Auth state (private) ── */
    var _authorized = false;
    var _gateStarted = false;
    var _editingId = null;
    var _deleteTargetId = null;
    var _editingEventId = null;
    var _deleteEventTargetId = null;
    var _editingAddonId = null;
    var _imgStore = [];

    /* ── Guard: every exposed function passes through this ── */
    function _requireAuth(silent) {
        if (_authorized) return true;
        if (!silent) _toast('error', 'Authentication required.');
        return false;
    }

    /* ══════════════════════════════════════════════════════
       AUTH GATE
    ══════════════════════════════════════════════════════ */
    function _setAuthGateVisible(visible) {
        var gate = document.getElementById('authGate');
        if (!gate) return;
        gate.style.display = visible ? 'flex' : 'none';
    }

    function _isCurrentUserAdmin(user) {
        try {
            if (!user || !_db()) return Promise.resolve(false);
            return _db().collection('roles').doc(user.uid).get().then(function (snap) {
                var data = snap.data();
                return !!data && data.role === 'admin';
            });
        } catch (e) {
            return Promise.resolve(false);
        }
    }

    function _initAuthGate() {
        if (_gateStarted) return;
        _gateStarted = true;

        _setAuthGateVisible(true);
        var statusSpan = document.querySelector('.sidebar-footer .status-info span');
        if (statusSpan) statusSpan.textContent = 'Sign in required';

        var emailEl = document.getElementById('adminEmail');
        var passEl  = document.getElementById('adminPassword');
        var btn     = document.getElementById('adminSignInBtn');
        var msgEl   = document.getElementById('authMsg');

        if (!_auth() || !_db()) {
            if (msgEl) msgEl.textContent = 'Backend is not configured yet.';
            return;
        }

        if (btn && emailEl && passEl) {
            btn.addEventListener('click', function () {
                var email    = (emailEl.value || '').trim();
                var password = passEl.value || '';

                if (!email || !password) {
                    if (msgEl) msgEl.textContent = 'Enter email and password.';
                    return;
                }

                btn.disabled = true;
                if (msgEl) msgEl.textContent = 'Signing in...';
                _auth().signInWithEmailAndPassword(email, password)
                    .catch(function (e) {
                        if (msgEl) msgEl.textContent = 'Sign-in failed. Check credentials.';
                        _setAuthGateVisible(true);
                    })
                    .finally(function () { btn.disabled = false; });
            });
        }

        _auth().onAuthStateChanged(function (user) {
            _authorized = false;

            if (!user) {
                if (msgEl) msgEl.textContent = 'Please sign in as admin.';
                _setAuthGateVisible(true);
                document.getElementById('app').style.display = 'none';
                return;
            }

            _isCurrentUserAdmin(user).then(function (ok) {
                if (!ok) {
                    if (msgEl) msgEl.textContent = 'Access denied: admin role required.';
                    _setAuthGateVisible(true);
                    document.getElementById('app').style.display = 'none';
                    try { _auth().signOut(); } catch (_) { }
                    return;
                }

                /* ── Authorized ── */
                _authorized = true;
                if (msgEl) msgEl.textContent = '';
                _setAuthGateVisible(false);
                document.getElementById('app').style.display = '';
                if (statusSpan) statusSpan.textContent = 'Signed in (admin)';

                _loadDataFromDB().then(function () {
                    _renderDashboard();
                    _renderProductTable();
                    _renderTeaserList();
                    _renderCarouselList();
                    _renderEventTable();
                    _renderAddonTable();
                });
            });
        });
    }

    function _signOut() {
        if (!_auth()) return;
        _auth().signOut()
            .then(function () { _toast('success', 'Signed out successfully'); })
            .catch(function () { _toast('error', 'Sign out failed'); });
    }

    /* ══════════════════════════════════════════════════════
       DATA LOADING (from DB)
    ══════════════════════════════════════════════════════ */
    function _loadDataFromDB() {
        var p1 = _db().collection('prebuilts').orderBy('order').get().then(function (snap) {
            if (!snap.empty) {
                products = snap.docs.map(function (doc) {
                    var d = doc.data() || {};
                    return {
                        id: d.id || doc.id,
                        name: d.name || '', series: d.series || '', tag: d.tag || '',
                        price: Number(d.price || 0), originalPrice: Number(d.originalPrice || 0),
                        order: Number(d.order || 0), featured: !!d.featured, inStock: !!d.inStock,
                        badge: d.badge || null, description: d.description || '',
                        cpu: d.cpu || '', gpu: d.gpu || '', ram: d.ram || '',
                        storage: d.storage || '', motherboard: d.motherboard || '',
                        cooling: d.cooling || '', psu: d.psu || '', case: d.case || '',
                        weight: d.weight || '', display: d.display || '',
                        image: d.image || '',
                        fps: Array.isArray(d.fps) ? d.fps : [],
                        highlights: Array.isArray(d.highlights) ? d.highlights : [],
                        details: d.details && typeof d.details === 'object'
                            ? d.details
                            : { performance: '', design: '', cooling: '', features: '' },
                        gallery: Array.isArray(d.gallery) ? d.gallery : []
                    };
                });
            }
        }).catch(function () { /* use fallback data */ });

        var p2 = _db().collection('settings').doc('homepageCarousel').get().then(function (snap) {
            if (snap.exists) {
                var raw = (snap.data() || {}).slides;
                if (Array.isArray(raw)) {
                    carouselSlides = raw.filter(Boolean).map(function (s) {
                        return { productId: s.productId, tag: s.tag || '', bgImage: s.bgImage || '', order: Number(s.order || 0), enabled: !!s.enabled };
                    }).sort(function (a, b) { return a.order - b.order; });
                }
            }
        }).catch(function () { });

        var p3 = _db().collection('events').get().then(function (snap) {
            events = snap.docs.map(function (doc) { return Object.assign({ id: doc.id }, doc.data()); });
        }).catch(function () { });

        var p4 = _db().collection('addons').orderBy('order', 'asc').get().then(function (snap) {
            addons = snap.docs.map(function (doc) { return Object.assign({ id: doc.id }, doc.data()); });
        }).catch(function () { });

        return Promise.all([p1, p2, p3, p4]);
    }

    /* ══════════════════════════════════════════════════════
       SIDEBAR (mobile)
    ══════════════════════════════════════════════════════ */
    function _openSidebar() {
        var sidebar = document.getElementById('sidebar');
        var overlay = document.getElementById('sidebarOverlay');
        sidebar.classList.add('open');
        overlay.style.display = 'block';
        requestAnimationFrame(function () { overlay.classList.add('visible'); });
        document.body.style.overflow = 'hidden';
    }

    function _closeSidebar() {
        var sidebar = document.getElementById('sidebar');
        var overlay = document.getElementById('sidebarOverlay');
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
        setTimeout(function () {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 280);
    }

    /* ══════════════════════════════════════════════════════
       NAV
    ══════════════════════════════════════════════════════ */
    var _pageTitles = {
        dashboard: 'Dashboard', products: 'All Products', addons: 'Add-ons & Upgrades',
        teaser: 'Teaser Section', carousel: 'Hero Carousel', events: 'Live Events'
    };

    function _navigate(page) {
        document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
        document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
        document.getElementById('page-' + page).classList.add('active');
        document.querySelectorAll('.nav-item').forEach(function (n) {
            if (n.getAttribute('onclick') === "navigate('" + page + "')") n.classList.add('active');
        });
        document.getElementById('headerTitle').textContent = _pageTitles[page];

        if (page === 'dashboard')  _renderDashboard();
        if (page === 'products')   _renderProductTable();
        if (page === 'teaser')     _renderTeaserList();
        if (page === 'carousel')   _renderCarouselList();
        if (page === 'events')     _renderEventTable();
        if (page === 'addons')     _renderAddonTable();

        _closeSidebar();
    }

    /* ══════════════════════════════════════════════════════
       DASHBOARD
    ══════════════════════════════════════════════════════ */
    function _renderDashboard() {
        if (!_authorized) {
            _initAuthGate();
            return;
        }
        document.getElementById('stat-total').textContent    = products.length;
        document.getElementById('stat-stock').textContent    = products.filter(function (p) { return p.inStock; }).length;
        document.getElementById('stat-featured').textContent = products.filter(function (p) { return p.featured; }).length;
        document.getElementById('stat-carousel').textContent = carouselSlides.filter(function (s) { return s.enabled; }).length;

        var seriesMap = {};
        products.forEach(function (p) { seriesMap[p.series] = (seriesMap[p.series] || 0) + 1; });
        var labels = { gaming: 'Gaming', creatorx: 'CreatorX', workstation: 'Workstation AI' };

        document.getElementById('series-breakdown').innerHTML = Object.entries(seriesMap).map(function (entry) {
            var k = entry[0], v = entry[1];
            return '<div class="series-chip"><div class="series-chip-label">' + (labels[k] || k) + '</div><div class="series-chip-count">' + v + '</div></div>';
        }).join('');
    }



    /* ══════════════════════════════════════════════════════
       PRODUCT TABLE
    ══════════════════════════════════════════════════════ */
    function _renderProductTable() {
        var q = (document.getElementById('searchInput')?.value || '').toLowerCase();
        var s = document.getElementById('seriesFilter')?.value || '';

        var filtered = products.filter(function (p) {
            return (!q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)) &&
                   (!s || p.series === s);
        }).sort(function (a, b) { return a.order - b.order; });

        var seriesClass = { gaming: 'badge-gaming', creatorx: 'badge-creatorx', workstation: 'badge-workstation' };
        var seriesLabel = { gaming: 'Gaming', creatorx: 'CreatorX', workstation: 'Workstation AI' };

        /* Desktop table rows */
        document.getElementById('productTableBody').innerHTML = filtered.map(function (p) {
            return '<tr>' +
                '<td><div class="prod-name-cell">' +
                    (p.image ? '<img class="prod-thumb" src="' + p.image + '" alt="' + p.name + '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' : '') +
                    '<div class="prod-thumb-placeholder" ' + (p.image ? 'style="display:none"' : '') + '><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 6l4 4 3-3 3 3 4-4"/></svg></div>' +
                    '<div><div class="prod-name">' + p.name + '</div><div class="prod-id">' + p.id + '</div></div></div></td>' +
                '<td><span class="badge ' + (seriesClass[p.series] || '') + '">' + (seriesLabel[p.series] || p.series) + '</span></td>' +
                '<td>₹' + p.price.toLocaleString('en-IN') + '</td>' +
                '<td><span class="' + (p.inStock ? 'in-stock' : 'out-stock') + '">' + (p.inStock ? 'In Stock' : 'Out of Stock') + '</span></td>' +
                '<td><label class="toggle"><input type="checkbox" ' + (p.featured ? 'checked' : '') + ' onchange="toggleFeatured(\'' + p.id + '\',this.checked)" /><div class="toggle-track"></div></label></td>' +
                '<td style="text-align:right"><div style="display:flex;gap:6px;justify-content:flex-end">' +
                    '<button class="btn btn-ghost btn-sm btn-icon" onclick="openEditModal(\'' + p.id + '\')"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg></button>' +
                    '<button class="btn btn-danger btn-sm btn-icon" onclick="confirmDelete(\'' + p.id + '\')"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg></button>' +
                '</div></td></tr>';
        }).join('') || '<tr><td colspan="6"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h4"/></svg><p>No products match your filters.</p></div></td></tr>';

        /* Mobile product cards */
        document.getElementById('productCards').innerHTML = filtered.map(function (p) {
            return '<div class="product-card-item">' +
                '<div class="product-card-thumb">' +
                    (p.image
                        ? '<img src="' + p.image + '" alt="' + p.name + '" onerror="this.parentElement.innerHTML=\'<svg viewBox=&quot;0 0 16 16&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;1.5&quot;><rect x=&quot;1&quot; y=&quot;3&quot; width=&quot;14&quot; height=&quot;10&quot; rx=&quot;1.5&quot;/></svg>\'">'
                        : '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 6l4 4 3-3 3 3 4-4"/></svg>') +
                '</div>' +
                '<div class="product-card-info">' +
                    '<div class="product-card-name">' + p.name + '</div>' +
                    '<div class="product-card-meta">' +
                        '<span class="badge ' + (seriesClass[p.series] || '') + '">' + (seriesLabel[p.series] || p.series) + '</span>' +
                        '<span class="' + (p.inStock ? 'in-stock' : 'out-stock') + '">' + (p.inStock ? '● Stock' : '● Out') + '</span>' +
                        (p.featured ? '<span style="color:var(--accent);font-size:10px;font-weight:600">★ Featured</span>' : '') +
                    '</div></div>' +
                '<div class="product-card-price">₹' + p.price.toLocaleString('en-IN') + '</div>' +
                '<div class="product-card-actions">' +
                    '<button class="btn btn-ghost btn-sm btn-icon" onclick="openEditModal(\'' + p.id + '\')" title="Edit"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg></button>' +
                    '<button class="btn btn-danger btn-sm btn-icon" onclick="confirmDelete(\'' + p.id + '\')" title="Delete"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg></button>' +
                '</div></div>';
        }).join('') || '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h4"/></svg><p>No products match your filters.</p></div>';
    }

    function _toggleFeatured(id, val) {
        if (!_requireAuth()) return;
        var p = products.find(function (x) { return x.id === id; });
        if (!p) return;

        var prev = p.featured;
        p.featured = val;

        if (!_db()) { _toast('error', 'Backend not initialized.'); return; }
        _db().collection('prebuilts').doc(id).update({ featured: !!val })
            .then(function () {
                _renderProductTable();
                _renderDashboard();
                _renderTeaserList();
            })
            .catch(function () {
                p.featured = prev;
                _toast('error', 'Could not update featured status.');
                _renderProductTable();
                _renderDashboard();
                _renderTeaserList();
            });
    }

    /* ══════════════════════════════════════════════════════
       DYNAMIC ROWS (FPS, Highlights, Gallery)
    ══════════════════════════════════════════════════════ */
    function _addRow(listId) {
        var list = document.getElementById(listId);
        var row  = document.createElement('div');
        row.className = 'dynamic-row';

        var isFps     = listId === 'fpsList';
        var isHL      = listId === 'highlightsList';
        var isGallery = listId === 'galleryList';

        if (isFps) {
            row.style.gridTemplateColumns = '1fr 80px 1fr 28px';
            row.innerHTML = '<input type="text" placeholder="Game" data-field="game" />' +
                '<input type="number" placeholder="FPS" data-field="fps" />' +
                '<input type="text" placeholder="Settings" data-field="settings" />' +
                '<button class="remove-btn" onclick="this.closest(\'.dynamic-row\').remove()"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l10 10M13 3L3 13"/></svg></button>';
        } else if (isHL) {
            row.style.gridTemplateColumns = '100px 1fr 1fr 28px';
            row.innerHTML = '<input type="text" placeholder="Icon" data-field="icon" />' +
                '<input type="text" placeholder="Title" data-field="title" />' +
                '<input type="text" placeholder="Description" data-field="desc" />' +
                '<button class="remove-btn" onclick="this.closest(\'.dynamic-row\').remove()"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l10 10M13 3L3 13"/></svg></button>';
        } else if (isGallery) {
            row.style.gridTemplateColumns = '1fr 28px';
            row.innerHTML = '<input type="text" placeholder="https://…" data-field="url" />' +
                '<button class="remove-btn" onclick="this.closest(\'.dynamic-row\').remove()"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l10 10M13 3L3 13"/></svg></button>';
        }
        list.appendChild(row);
    }

    function _collectRows(listId, fields) {
        return [].slice.call(document.getElementById(listId).querySelectorAll('.dynamic-row')).map(function (row) {
            var obj = {};
            fields.forEach(function (f) {
                var el = row.querySelector('[data-field="' + f + '"]');
                obj[f] = el ? el.value : '';
            });
            return obj;
        }).filter(function (obj) { return Object.values(obj).some(function (v) { return v; }); });
    }

    /* ══════════════════════════════════════════════════════
       MODAL  —  Add / Edit
    ══════════════════════════════════════════════════════ */
    function _get(id) { return (document.getElementById(id) || {}).value || ''; }
    function _set(id, val) { var el = document.getElementById(id); if (el) el.value = val; }

    function _clearForm() {
        ['f-id', 'f-name', 'f-tag', 'f-price', 'f-originalPrice', 'f-badge', 'f-order', 'f-image', 'f-description',
            'f-cpu', 'f-gpu', 'f-ram', 'f-storage', 'f-motherboard', 'f-cooling', 'f-psu', 'f-case', 'f-weight', 'f-display',
            'f-det-performance', 'f-det-design', 'f-det-cooling', 'f-det-features'
        ].forEach(function (id) { var el = document.getElementById(id); if (el) el.value = ''; });
        document.getElementById('f-featured').checked = false;
        document.getElementById('f-instock').checked = true;
        ['fpsList', 'highlightsList'].forEach(function (id) {
            var el = document.getElementById(id); if (el) el.innerHTML = '';
        });
        _imgStore = [];
        _renderImgGrid();
    }

    function _openAddModal() {
        if (!_requireAuth()) return;
        _editingId = null;
        document.getElementById('modalTitle').textContent = 'Add Product';
        _clearForm();
        _imgStore = [];
        _renderImgGrid();
        document.getElementById('productModal').classList.add('open');
        setTimeout(_initImgDropZone, 0);
    }

    function _openEditModal(id) {
        if (!_requireAuth()) return;
        _editingId = id;
        var p = products.find(function (x) { return x.id === id; });
        if (!p) return;

        document.getElementById('modalTitle').textContent = 'Edit Product';
        _clearForm();

        _set('f-id', p.id); _set('f-name', p.name);
        document.getElementById('f-series').value = p.series;
        _set('f-tag', p.tag); _set('f-price', p.price);
        _set('f-originalPrice', p.originalPrice || '');
        _set('f-badge', p.badge || ''); _set('f-order', p.order);
        _set('f-image', p.image || ''); _set('f-description', p.description || '');
        document.getElementById('f-featured').checked = !!p.featured;
        document.getElementById('f-instock').checked  = !!p.inStock;
        _set('f-cpu', p.cpu || ''); _set('f-gpu', p.gpu || '');
        _set('f-ram', p.ram || ''); _set('f-storage', p.storage || '');
        _set('f-motherboard', p.motherboard || ''); _set('f-cooling', p.cooling || '');
        _set('f-psu', p.psu || ''); _set('f-case', p.case || '');
        _set('f-weight', p.weight || ''); _set('f-display', p.display || '');

        if (p.details) {
            _set('f-det-performance', p.details.performance || '');
            _set('f-det-design', p.details.design || '');
            _set('f-det-cooling', p.details.cooling || '');
            _set('f-det-features', p.details.features || '');
        }

        (p.fps || []).forEach(function (r) {
            _addRow('fpsList');
            var row = document.getElementById('fpsList').lastElementChild;
            row.querySelector('[data-field="game"]').value     = r.game;
            row.querySelector('[data-field="fps"]').value      = r.fps;
            row.querySelector('[data-field="settings"]').value = r.settings;
        });
        (p.highlights || []).forEach(function (r) {
            _addRow('highlightsList');
            var row = document.getElementById('highlightsList').lastElementChild;
            row.querySelector('[data-field="icon"]').value  = r.icon;
            row.querySelector('[data-field="title"]').value = r.title;
            row.querySelector('[data-field="desc"]').value  = r.desc;
        });

        _loadImgStore(p.image || '', p.gallery || []);
        document.getElementById('productModal').classList.add('open');
        setTimeout(_initImgDropZone, 0);
    }

    function _closeModal() {
        document.getElementById('productModal').classList.remove('open');
    }

    function _saveProduct() {
        if (!_requireAuth()) return;
        var id   = _get('f-id').trim();
        var name = _get('f-name').trim();
        if (!id || !name) { _toast('error', 'ID and Name are required'); return; }

        var prod = {
            id: id, name: name, series: _get('f-series'), tag: _get('f-tag'),
            price: Number(_get('f-price')) || 0,
            originalPrice: Number(_get('f-originalPrice')) || null,
            badge: _get('f-badge') || null,
            order: Number(_get('f-order')) || 99,
            featured: document.getElementById('f-featured').checked,
            inStock: document.getElementById('f-instock').checked,
            description: _get('f-description'),
            cpu: _get('f-cpu'), gpu: _get('f-gpu'), ram: _get('f-ram'),
            storage: _get('f-storage'), motherboard: _get('f-motherboard'),
            cooling: _get('f-cooling'), psu: _get('f-psu'), case: _get('f-case'),
            weight: _get('f-weight'), display: _get('f-display'),
            image: _get('f-image').startsWith('data:') ? '' : _get('f-image'),
            fps: _collectRows('fpsList', ['game', 'fps', 'settings']),
            highlights: _collectRows('highlightsList', ['icon', 'title', 'desc']),
            details: {
                performance: _get('f-det-performance'), design: _get('f-det-design'),
                cooling: _get('f-det-cooling'), features: _get('f-det-features')
            },
            gallery: _collectImgGallery()
        };

        if (_imgStore.some(function (img) { return img.uploading; })) {
            _toast('error', 'Please wait for image uploads to finish.');
            return;
        }
        if (!_db()) { _toast('error', 'Backend not initialized.'); return; }

        var prodRef = _db().collection('prebuilts').doc(id);
        var chain = Promise.resolve();

        if (!_editingId) {
            chain = prodRef.get().then(function (existing) {
                if (existing.exists) { throw new Error('DUP'); }
            });
        }

        chain.then(function () { return prodRef.set(prod); })
            .then(function () {
                if (_editingId) {
                    var idx = products.findIndex(function (p) { return p.id === _editingId; });
                    if (idx >= 0) products[idx] = prod; else products.push(prod);
                    _toast('success', name + ' updated');
                } else {
                    products.push(prod);
                    _toast('success', name + ' added to catalog');
                }
                _closeModal();
                _renderProductTable(); _renderDashboard(); _renderTeaserList();
                _renderCarouselList(); _updateCarouselDropdown();
            })
            .catch(function (e) {
                if (e && e.message === 'DUP') {
                    _toast('error', 'A product with this ID already exists');
                } else {
                    _toast('error', 'Could not save product.');
                }
            });
    }

    /* ══════════════════════════════════════════════════════
       DELETE
    ══════════════════════════════════════════════════════ */
    function _confirmDelete(id) {
        if (!_requireAuth()) return;
        var p = products.find(function (x) { return x.id === id; });
        _deleteTargetId = id;
        document.getElementById('confirmTitle').textContent = 'Delete ' + (p ? p.name : '') + '?';
        document.getElementById('confirmMsg').textContent   = 'This product will be permanently removed from the catalog.';
        document.getElementById('confirmOkBtn').onclick     = _doDelete;
        document.getElementById('confirmModal').classList.add('open');
    }

    function _closeConfirm() { document.getElementById('confirmModal').classList.remove('open'); }

    function _doDelete() {
        var id = _deleteTargetId;
        if (!id) return;
        if (!_requireAuth()) return;
        if (!_db()) { _toast('error', 'Backend not initialized.'); return; }

        _db().collection('prebuilts').doc(id).delete()
            .then(function () {
                var settingsRef = _db().collection('settings').doc('homepageCarousel');
                return settingsRef.get().then(function (snap) {
                    var rawSlides = snap.exists ? (snap.data() || {}).slides : [];
                    var nextSlides = Array.isArray(rawSlides) ? rawSlides.filter(function (s) { return s.productId !== id; }) : [];
                    nextSlides.sort(function (a, b) { return Number(a.order || 0) - Number(b.order || 0); });
                    nextSlides = nextSlides.map(function (s, i) { return Object.assign({}, s, { order: i + 1 }); });
                    return settingsRef.set({ slides: nextSlides }).then(function () {
                        products = products.filter(function (p) { return p.id !== id; });
                        carouselSlides = nextSlides;
                    });
                });
            })
            .then(function () {
                _closeConfirm();
                _renderProductTable(); _renderDashboard(); _renderTeaserList();
                _renderCarouselList(); _updateCarouselDropdown();
                _toast('success', 'Product deleted');
            })
            .catch(function () {
                _toast('error', 'Could not delete product.');
            });
    }

    /* ══════════════════════════════════════════════════════
       TEASER
    ══════════════════════════════════════════════════════ */
    function _renderTeaserList() {
        var list = [].concat(products).sort(function (a, b) { return a.order - b.order; });
        var el = document.getElementById('teaserList');
        var featCount = 0;
        el.innerHTML = list.map(function (p) {
            var active = p.featured;
            if (active) featCount++;
            var n = active ? featCount : '';
            return '<div class="mgmt-row ' + (active ? 'active-row' : '') + '" data-id="' + p.id + '">' +
                '<div class="mgmt-drag"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 4h1M10 4h1M5 8h1M10 8h1M5 12h1M10 12h1"/></svg></div>' +
                '<div class="order-num">' + (active && featCount <= 20 ? n : '—') + '</div>' +
                '<div class="mgmt-info"><div class="prod-name">' + p.name + '</div><div class="prod-spec">' + p.gpu + ' · ₹' + p.price.toLocaleString('en-IN') + '</div></div>' +
                '<label class="toggle"><input type="checkbox" ' + (active ? 'checked' : '') + ' onchange="setTeaserFeatured(\'' + p.id + '\',this.checked)" /><div class="toggle-track"></div></label></div>';
        }).join('');
    }

    function _setTeaserFeatured(id, val) {
        if (!_requireAuth()) return;
        var p = products.find(function (x) { return x.id === id; });
        if (!p) return;

        var prev = p.featured;
        p.featured = val;
        _renderTeaserList(); _renderDashboard();

        if (!_db()) return;
        _db().collection('prebuilts').doc(id).update({ featured: !!val }).catch(function () {
            p.featured = prev;
            _toast('error', 'Could not update teaser featured.');
            _renderTeaserList(); _renderDashboard();
        });
    }

    function _saveTeaser() { _toast('success', 'Teaser settings saved'); }

    /* ══════════════════════════════════════════════════════
       CAROUSEL
    ══════════════════════════════════════════════════════ */
    function _updateCarouselDropdown() {
        var sel = document.getElementById('carouselAddProduct');
        sel.innerHTML = '<option value="">— Pick a product to add —</option>' +
            products.map(function (p) { return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
    }

    function _renderCarouselList() {
        _updateCarouselDropdown();
        var slides = [].concat(carouselSlides).sort(function (a, b) { return a.order - b.order; });
        var el = document.getElementById('carouselList');

        if (!slides.length) {
            el.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg><p>No slides yet. Add one above.</p></div>';
            return;
        }

        el.innerHTML = slides.map(function (s, i) {
            var p = products.find(function (x) { return x.id === s.productId; });
            if (!p) return '';
            return '<div class="mgmt-row ' + (s.enabled ? 'active-row' : '') + '" data-idx="' + i + '">' +
                '<div class="mgmt-drag"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 4h1M10 4h1M5 8h1M10 8h1M5 12h1M10 12h1"/></svg></div>' +
                '<div class="order-num">' + (i + 1) + '</div>' +
                '<div class="mgmt-info">' +
                    '<div class="prod-name">' + p.name + '</div>' +
                    '<div class="carousel-fields">' +
                        '<input type="text" placeholder="Badge text" value="' + (s.tag || '') + '" oninput="updateSlideTag(' + i + ',this.value)" />' +
                        '<div class="slide-bg-field">' +
                            '<input type="text" placeholder="Background image URL" value="' + (s.bgImage || '') + '" oninput="updateSlideBg(' + i + ',this.value)" />' +
                            '<input type="file" accept="image/*" id="slideBgInput-' + i + '" style="display:none" onchange="handleSlideBgFile(' + i + ',this)" />' +
                            '<button class="btn btn-ghost btn-sm" onclick="triggerSlideBgUpload(' + i + ')" title="Upload background">⬆</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<label class="toggle"><input type="checkbox" ' + (s.enabled ? 'checked' : '') + ' onchange="toggleSlide(' + i + ',this.checked)" /><div class="toggle-track"></div></label>' +
                '<button class="btn btn-danger btn-sm btn-icon" onclick="removeSlide(' + i + ')"><svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg></button>' +
            '</div>';
        }).join('');
    }

    function _addCarouselSlide() {
        if (!_requireAuth()) return;
        var id = document.getElementById('carouselAddProduct').value;
        if (!id) { _toast('error', 'Select a product first'); return; }
        if (carouselSlides.find(function (s) { return s.productId === id; })) { _toast('error', 'This product is already in the carousel'); return; }
        carouselSlides.push({ productId: id, tag: '', bgImage: '', order: carouselSlides.length + 1, enabled: true });
        _renderCarouselList();
    }

    function _removeSlide(i) {
        var sorted = [].concat(carouselSlides).sort(function (a, b) { return a.order - b.order; });
        var slide = sorted[i];
        carouselSlides = carouselSlides.filter(function (s) { return s !== slide; });
        carouselSlides.forEach(function (s, j) { s.order = j + 1; });
        _renderCarouselList();
    }

    function _toggleSlide(i, val) {
        var sorted = [].concat(carouselSlides).sort(function (a, b) { return a.order - b.order; });
        sorted[i].enabled = val;
        _renderCarouselList();
    }

    function _updateSlideTag(i, val) {
        var sorted = [].concat(carouselSlides).sort(function (a, b) { return a.order - b.order; });
        if (sorted[i]) sorted[i].tag = val;
    }

    function _updateSlideBg(i, val) {
        var sorted = [].concat(carouselSlides).sort(function (a, b) { return a.order - b.order; });
        if (sorted[i]) sorted[i].bgImage = val;
    }

    function _saveCarousel() {
        if (!_requireAuth()) return;
        if (!_db()) { _toast('error', 'Backend not initialized.'); return; }

        var slides = carouselSlides
            .map(function (s) {
                return { productId: s.productId, tag: s.tag || '', bgImage: s.bgImage || '', order: Number(s.order || 0), enabled: !!s.enabled };
            })
            .sort(function (a, b) { return a.order - b.order; });
        slides.forEach(function (s, i) { s.order = i + 1; });

        _db().collection('settings').doc('homepageCarousel').set({ slides: slides })
            .then(function () { _toast('success', 'Carousel saved'); })
            .catch(function () { _toast('error', 'Could not save carousel.'); });
    }

    /* ══════════════════════════════════════════════════════
       IMAGE MANAGER
    ══════════════════════════════════════════════════════ */
    var _CLOUD_NAME   = 'dzbjr3asg';
    var _UPLOAD_PRESET = 'geekboz_unsigned_prebuilts';
    var _CLOUD_FOLDER  = 'geekboz/prebuilts';
    var _MAX_IMG_MB    = 5;

    function _isImgHostConfigured() {
        return !!_CLOUD_NAME && !_CLOUD_NAME.includes('PUT_') && !!_UPLOAD_PRESET && !_UPLOAD_PRESET.includes('PUT_');
    }

    function _uploadImage(file) {
        if (!_isImgHostConfigured()) return Promise.resolve(null);
        var endpoint = 'https://api.cloudinary.com/v1_1/' + _CLOUD_NAME + '/image/upload';
        var fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', _UPLOAD_PRESET);
        if (_CLOUD_FOLDER) fd.append('folder', _CLOUD_FOLDER);

        return fetch(endpoint, { method: 'POST', body: fd })
            .then(function (res) {
                return res.json().then(function (data) {
                    if (!res.ok || !data || !data.secure_url) throw new Error('Upload failed');
                    return data.secure_url;
                });
            });
    }

    function _initImgDropZone() {
        var zone = document.getElementById('imgDropZone');
        if (!zone) return;
        zone.addEventListener('dragover', function (e) { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', function () { zone.classList.remove('drag-over'); });
        zone.addEventListener('drop', function (e) {
            e.preventDefault(); zone.classList.remove('drag-over');
            _handleImgFiles(e.dataTransfer.files);
        });
    }

    function _handleImgFiles(files) {
        if (!_isImgHostConfigured()) {
            _toast('error', 'Image hosting is not configured.');
            return;
        }
        [].slice.call(files).forEach(function (file) {
            if (!file.type.startsWith('image/')) return;
            if (file.size > _MAX_IMG_MB * 1024 * 1024) {
                _toast('error', '"' + file.name + '" exceeds ' + _MAX_IMG_MB + ' MB limit.');
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                var previewUrl = e.target.result;
                var isMain = _imgStore.length === 0;
                var entry = { dataUrl: previewUrl, secureUrl: null, isMain: isMain, uploading: true };
                _imgStore.push(entry);
                _renderImgGrid(); _syncImgToForm();

                _uploadImage(file).then(function (url) {
                    if (url) { entry.secureUrl = url; entry.dataUrl = url; }
                }).catch(function () {
                    _toast('error', 'Image upload failed.');
                }).finally(function () {
                    entry.uploading = false;
                    _renderImgGrid(); _syncImgToForm();
                });
            };
            reader.readAsDataURL(file);
        });
    }

    function _renderImgGrid() {
        var grid = document.getElementById('imgGrid');
        if (!grid) return;
        if (!_imgStore.length) { grid.innerHTML = ''; return; }
        grid.innerHTML = _imgStore.map(function (img, i) {
            return '<div class="img-tile ' + (img.isMain ? 'img-tile-main' : '') + '" onclick="setMainImg(' + i + ')" title="' + (img.isMain ? 'Main image' : 'Click to set as main') + '">' +
                '<img src="' + img.dataUrl + '" alt="img ' + (i + 1) + '" />' +
                (img.isMain ? '<div class="img-main-badge"><svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l2 4.5H15l-4 3 1.5 5L8 11l-4.5 2.5L5 8.5 1 5.5h5z"/></svg>Main</div>' : '') +
                '<button class="img-remove-btn" onclick="removeImg(event,' + i + ')" title="Remove"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 3l10 10M13 3L3 13"/></svg></button></div>';
        }).join('');
    }

    function _setMainImg(i) {
        _imgStore.forEach(function (img, idx) { img.isMain = idx === i; });
        _renderImgGrid(); _syncImgToForm();
    }

    function _removeImg(e, i) {
        e.stopPropagation();
        var wasMain = _imgStore[i].isMain;
        _imgStore.splice(i, 1);
        if (wasMain && _imgStore.length) _imgStore[0].isMain = true;
        _renderImgGrid(); _syncImgToForm();
    }

    function _syncImgToForm() {
        var main = _imgStore.find(function (img) { return img.isMain; });
        document.getElementById('f-image').value = main ? main.dataUrl : '';
    }

    function _collectImgGallery() {
        return _imgStore.map(function (img) { return img.secureUrl || img.dataUrl; }).filter(function (url) { return !url.startsWith('data:'); });
    }

    function _loadImgStore(mainUrl, galleryUrls) {
        _imgStore = [];
        var all = galleryUrls && galleryUrls.length ? galleryUrls : (mainUrl ? [mainUrl] : []);
        all.forEach(function (url) {
            _imgStore.push({ dataUrl: url, secureUrl: url, isMain: url === mainUrl, uploading: false });
        });
        if (_imgStore.length && !_imgStore.some(function (i) { return i.isMain; })) _imgStore[0].isMain = true;
        _renderImgGrid(); _syncImgToForm();
    }

    /* ── Carousel slide background uploader ── */
    function _triggerSlideBgUpload(i) {
        var input = document.getElementById('slideBgInput-' + i);
        if (input) input.click();
    }

    function _handleSlideBgFile(i, input) {
        if (!_isImgHostConfigured()) { _toast('error', 'Image hosting not configured.'); return; }
        var file = input.files[0];
        if (!file) return;
        if (file.size > _MAX_IMG_MB * 1024 * 1024) { _toast('error', 'Image exceeds ' + _MAX_IMG_MB + ' MB limit.'); return; }
        var reader = new FileReader();
        reader.onload = function (e) {
            _updateSlideBg(i, e.target.result);
            _renderCarouselList();
        };
        reader.readAsDataURL(file);

        _uploadImage(file).then(function (url) {
            if (!url) return;
            _updateSlideBg(i, url);
            _renderCarouselList();
        }).catch(function () { _toast('error', 'Slide background upload failed.'); });
    }

    /* ══════════════════════════════════════════════════════
       TOAST
    ══════════════════════════════════════════════════════ */
    function _toast(type, msg) {
        var wrap = document.getElementById('toastWrap');
        var t = document.createElement('div');
        t.className = 'toast ' + type;
        var icon = type === 'success'
            ? '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 8l4 4 8-8"/></svg>'
            : '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 4v4M8 11v1"/><circle cx="8" cy="8" r="6"/></svg>';
        t.innerHTML = '<span class="toast-icon">' + icon + '</span><span>' + msg + '</span>';
        wrap.appendChild(t);
        setTimeout(function () {
            t.style.opacity = '0'; t.style.transform = 'translateY(6px)'; t.style.transition = 'all 0.2s';
            setTimeout(function () { t.remove(); }, 220);
        }, 3000);
    }

    /* ══════════════════════════════════════════════════════
       EVENTS
    ══════════════════════════════════════════════════════ */
    function _renderEventTable() {
        var list = events;

        document.getElementById('eventTableBody').innerHTML = list.map(function (ev) {
            return '<tr>' +
                '<td><div style="font-weight:600">' + ev.title + '</div></td>' +
                '<td>' + (ev.date || '—') + '</td>' +
                '<td><span class="badge ' + (ev.enabled ? 'badge-gaming' : '') + '">' + (ev.enabled ? 'Active' : 'Inactive') + '</span></td>' +
                '<td style="text-align:right"><div style="display:flex;gap:6px;justify-content:flex-end">' +
                    '<button class="btn btn-ghost btn-sm btn-icon" onclick="openEventEditModal(\'' + ev.id + '\')"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg></button>' +
                    '<button class="btn btn-danger btn-sm btn-icon" onclick="confirmDeleteEvent(\'' + ev.id + '\')"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg></button>' +
                '</div></td></tr>';
        }).join('') || '<tr><td colspan="4"><div class="empty-state"><p>No events found.</p></div></td></tr>';

        var cardEl = document.getElementById('eventCards');
        if (cardEl) {
            cardEl.innerHTML = list.map(function (ev) {
                return '<div class="product-card-item">' +
                    '<div class="product-card-info"><div class="product-card-name">' + ev.title + '</div>' +
                    '<div class="product-card-meta"><span class="badge ' + (ev.enabled ? 'badge-gaming' : '') + '">' + (ev.enabled ? 'Active' : 'Inactive') + '</span><span>' + (ev.date || 'No schedule') + '</span></div></div>' +
                    '<div class="product-card-actions">' +
                        '<button class="btn btn-ghost btn-sm btn-icon" onclick="openEventEditModal(\'' + ev.id + '\')"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg></button>' +
                        '<button class="btn btn-danger btn-sm btn-icon" onclick="confirmDeleteEvent(\'' + ev.id + '\')"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg></button>' +
                    '</div></div>';
            }).join('') || '<div class="empty-state"><p>No events found.</p></div>';
        }
    }

    function _openEventAddModal() {
        if (!_requireAuth()) return;
        _editingEventId = null;
        document.getElementById('eventModalTitle').textContent = 'Create Event';
        _clearEventForm();
        _renderEventImg('');
        document.getElementById('eventModal').classList.add('open');
        setTimeout(_initEventImgDropZone, 0);
    }

    function _openEventEditModal(id) {
        if (!_requireAuth()) return;
        _editingEventId = id;
        var ev = events.find(function (x) { return x.id === id; });
        if (!ev) return;

        document.getElementById('eventModalTitle').textContent = 'Edit Event';
        _clearEventForm();
        _set('ev-title', ev.title); _set('ev-date', ev.date || '');
        _set('ev-image', ev.image || ''); _set('ev-btn-text', ev.btnText || '');
        _set('ev-btn-url', ev.btnUrl || ''); _set('ev-desc', ev.desc || '');
        document.getElementById('ev-enabled').checked = !!ev.enabled;
        _renderEventImg(ev.image || '');
        document.getElementById('eventModal').classList.add('open');
        setTimeout(_initEventImgDropZone, 0);
    }

    function _closeEventModal() {
        document.getElementById('eventModal').classList.remove('open');
    }

    function _clearEventForm() {
        ['ev-title', 'ev-date', 'ev-image', 'ev-btn-text', 'ev-btn-url', 'ev-desc'].forEach(function (id) {
            var el = document.getElementById(id); if (el) el.value = '';
        });
        document.getElementById('ev-enabled').checked = true;
    }

    function _saveEvent() {
        if (!_requireAuth()) return;
        var title = _get('ev-title').trim();
        if (!title) { _toast('error', 'Title is required'); return; }

        var ev = {
            title: title, date: _get('ev-date'), image: _get('ev-image'),
            btnText: _get('ev-btn-text'), btnUrl: _get('ev-btn-url'), desc: _get('ev-desc'),
            enabled: document.getElementById('ev-enabled').checked,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (!_db()) { _toast('error', 'Backend not initialized.'); return; }

        var promise;
        if (_editingEventId) {
            promise = _db().collection('events').doc(_editingEventId).update(ev).then(function () {
                var idx = events.findIndex(function (x) { return x.id === _editingEventId; });
                if (idx >= 0) events[idx] = Object.assign({}, events[idx], ev);
                _toast('success', 'Event updated');
            });
        } else {
            promise = _db().collection('events').add(ev).then(function (docRef) {
                events.push(Object.assign({ id: docRef.id }, ev));
                _toast('success', 'Event created');
            });
        }

        promise.then(function () {
            _closeEventModal(); _renderEventTable();
        }).catch(function () {
            _toast('error', 'Could not save event.');
        });
    }

    function _confirmDeleteEvent(id) {
        if (!_requireAuth()) return;
        _deleteEventTargetId = id;
        var ev = events.find(function (x) { return x.id === id; });
        document.getElementById('confirmTitle').textContent = 'Delete ' + (ev ? ev.title : '') + '?';
        document.getElementById('confirmMsg').textContent   = 'This event will be removed.';
        document.getElementById('confirmOkBtn').onclick     = _doDeleteEvent;
        document.getElementById('confirmModal').classList.add('open');
    }

    function _doDeleteEvent() {
        if (!_deleteEventTargetId) return;
        if (!_requireAuth()) return;
        if (!_db()) return;

        _db().collection('events').doc(_deleteEventTargetId).delete()
            .then(function () {
                events = events.filter(function (x) { return x.id !== _deleteEventTargetId; });
                _toast('success', 'Event deleted');
            })
            .catch(function () { _toast('error', 'Could not delete event.'); })
            .finally(function () { _closeConfirm(); _renderEventTable(); });
    }

    function _initEventImgDropZone() {
        var zone = document.getElementById('eventImgDropZone');
        if (!zone) return;
        zone.addEventListener('dragover', function (e) { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', function () { zone.classList.remove('drag-over'); });
        zone.addEventListener('drop', function (e) {
            e.preventDefault(); zone.classList.remove('drag-over');
            _handleEventImgFiles(e.dataTransfer.files);
        });
    }

    function _handleEventImgFiles(files) {
        if (!_isImgHostConfigured()) { _toast('error', 'Image hosting not configured.'); return; }
        var file = files[0];
        if (!file || !file.type.startsWith('image/')) return;
        if (file.size > _MAX_IMG_MB * 1024 * 1024) { _toast('error', 'Image exceeds ' + _MAX_IMG_MB + ' MB limit.'); return; }

        var reader = new FileReader();
        reader.onload = function (e) {
            var previewUrl = e.target.result;
            _renderEventImg(previewUrl, true);
            _uploadImage(file).then(function (url) {
                if (url) { _renderEventImg(url, false); document.getElementById('ev-image').value = url; }
            }).catch(function () { _toast('error', 'Image upload failed.'); _renderEventImg('', false); });
        };
        reader.readAsDataURL(file);
    }

    function _renderEventImg(url, uploading) {
        var grid = document.getElementById('eventImgGrid');
        if (!grid) return;
        if (!url) { grid.innerHTML = ''; return; }
        grid.innerHTML = '<div class="img-tile ' + (uploading ? 'uploading' : '') + '" style="width:100%; max-width:200px">' +
            '<img src="' + url + '" alt="Event Image" />' +
            '<button class="img-remove-btn" onclick="removeEventImg(event)" title="Remove"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 3l10 10M13 3L3 13"/></svg></button>' +
            (uploading ? '<div style="position:absolute; inset:0; background:rgba(0,0,0,0.4); display:grid; place-items:center; font-size:10px; color:white">Uploading...</div>' : '') +
        '</div>';
        document.getElementById('ev-image').value = url;
    }

    function _removeEventImg(e) {
        if (e) e.stopPropagation();
        _renderEventImg('');
        document.getElementById('ev-image').value = '';
    }

    /* ══════════════════════════════════════════════════════
       ADD-ONS
    ══════════════════════════════════════════════════════ */
    function _renderAddonTable() {
        var tableBody = document.getElementById('addonTableBody');
        var cardsBody = document.getElementById('addonCards');
        if (!tableBody || !cardsBody) return;

        var list = [].concat(addons).sort(function (a, b) { return (Number(a.order) || 0) - (Number(b.order) || 0); });

        tableBody.innerHTML = list.map(function (a) {
            return '<tr>' +
                '<td><div class="prod-name-cell"><div><div class="prod-name">' + a.title + '</div>' +
                    (a.highlighted ? '<div class="prod-id" style="color:var(--accent)">' + (a.subtitle || '') + '</div>' : '') +
                '</div></div></td>' +
                '<td>₹' + Number(a.price).toLocaleString('en-IN') + '</td>' +
                '<td><span class="' + (a.highlighted ? 'in-stock' : '') + '" style="' + (a.highlighted ? 'background:rgba(164,249,63,0.1);color:var(--accent)' : '') + '">' + (a.highlighted ? 'Yes' : 'No') + '</span></td>' +
                '<td style="text-align:right"><div style="display:flex;gap:6px;justify-content:flex-end">' +
                    '<button class="btn btn-ghost btn-sm btn-icon" onclick="openAddonModal(\'' + a.id + '\')"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg></button>' +
                    '<button class="btn btn-danger btn-sm btn-icon" onclick="confirmDeleteAddon(\'' + a.id + '\')"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg></button>' +
                '</div></td></tr>';
        }).join('') || '<tr><td colspan="4"><div class="empty-state"><p>No add-ons found.</p></div></td></tr>';

        cardsBody.innerHTML = list.map(function (a) {
            return '<div class="product-card-item">' +
                '<div class="product-card-info"><div class="product-card-name">' + a.title + '</div>' +
                    (a.highlighted ? '<div class="product-card-meta"><span style="color:var(--accent);font-size:10px;font-weight:600">★ Highlighted: ' + a.subtitle + '</span></div>' : '') +
                '</div>' +
                '<div class="product-card-price">₹' + Number(a.price).toLocaleString('en-IN') + '</div>' +
                '<div class="product-card-actions">' +
                    '<button class="btn btn-ghost btn-sm btn-icon" onclick="openAddonModal(\'' + a.id + '\')"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-8 8H3v-3L11 2z"/></svg></button>' +
                    '<button class="btn btn-danger btn-sm btn-icon" onclick="confirmDeleteAddon(\'' + a.id + '\')"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/></svg></button>' +
                '</div></div>';
        }).join('') || '<div class="empty-state"><p>No add-ons found.</p></div>';
    }

    function _openAddonModal(id) {
        if (!_requireAuth()) return;
        _editingAddonId = id || null;
        document.getElementById('addonModalTitle').textContent = id ? 'Edit Add-on' : 'Create Add-on';

        ['ad-title', 'ad-price', 'ad-order', 'ad-subtitle', 'ad-desc'].forEach(function (f) {
            var el = document.getElementById(f); if (el) el.value = '';
        });
        var highCheck = document.getElementById('ad-highlighted');
        if (highCheck) highCheck.checked = false;

        if (id) {
            var a = addons.find(function (x) { return x.id === id; });
            if (a) {
                _set('ad-title', a.title || ''); _set('ad-price', a.price || '');
                _set('ad-order', a.order || ''); _set('ad-subtitle', a.subtitle || '');
                _set('ad-desc', a.desc || '');
                if (highCheck) highCheck.checked = !!a.highlighted;
            }
        }
        document.getElementById('addonModal').classList.add('open');
    }

    function _closeAddonModal() { document.getElementById('addonModal').classList.remove('open'); }

    function _saveAddon() {
        if (!_requireAuth()) return;
        var title = _get('ad-title').trim();
        if (!title) { _toast('error', 'Title is required'); return; }

        var ad = {
            title: title,
            price: Number(_get('ad-price')) || 0,
            order: Number(_get('ad-order')) || 99,
            highlighted: document.getElementById('ad-highlighted').checked,
            subtitle: _get('ad-subtitle'),
            desc: _get('ad-desc')
        };

        if (!_db()) { _toast('error', 'Backend not initialized.'); return; }

        var promise;
        if (_editingAddonId) {
            promise = _db().collection('addons').doc(_editingAddonId).update(ad).then(function () {
                var idx = addons.findIndex(function (x) { return x.id === _editingAddonId; });
                if (idx >= 0) addons[idx] = Object.assign({ id: _editingAddonId }, ad);
                _toast('success', 'Add-on updated');
            });
        } else {
            promise = _db().collection('addons').add(ad).then(function (docRef) {
                addons.push(Object.assign({ id: docRef.id }, ad));
                _toast('success', 'Add-on created');
            });
        }

        promise.then(function () {
            _closeAddonModal(); _renderAddonTable();
        }).catch(function () { _toast('error', 'Could not save add-on.'); });
    }

    function _confirmDeleteAddon(id) {
        if (!_requireAuth()) return;
        var a = addons.find(function (x) { return x.id === id; });
        if (!a) return;
        _deleteTargetId = id;
        document.getElementById('confirmTitle').textContent = 'Delete Add-on?';
        document.getElementById('confirmMsg').textContent   = '"' + a.title + '" will be permanently removed.';
        document.getElementById('confirmOkBtn').onclick     = _doDeleteAddon;
        document.getElementById('confirmModal').classList.add('open');
    }

    function _doDeleteAddon() {
        var id = _deleteTargetId;
        if (!id || !_authorized || !_db()) return;

        _db().collection('addons').doc(id).delete()
            .then(function () {
                addons = addons.filter(function (x) { return x.id !== id; });
                _toast('success', 'Add-on deleted');
            })
            .catch(function () { _toast('error', 'Could not delete add-on.'); })
            .finally(function () { _closeConfirm(); _renderAddonTable(); });
    }

    /* ══════════════════════════════════════════════════════
       BACKDROP CLOSE + RESIZE HANDLER
    ══════════════════════════════════════════════════════ */
    document.getElementById('productModal').addEventListener('click', function (e) {
        if (e.target === document.getElementById('productModal')) _closeModal();
    });
    document.getElementById('confirmModal').addEventListener('click', function (e) {
        if (e.target === document.getElementById('confirmModal')) _closeConfirm();
    });
    document.getElementById('eventModal').addEventListener('click', function (e) {
        if (e.target === document.getElementById('eventModal')) _closeEventModal();
    });
    document.getElementById('addonModal').addEventListener('click', function (e) {
        if (e.target === document.getElementById('addonModal')) _closeAddonModal();
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 860) {
            document.getElementById('sidebarOverlay').style.display = 'none';
            document.getElementById('sidebarOverlay').classList.remove('visible');
            document.body.style.overflow = '';
        }
    });

    /* ══════════════════════════════════════════════════════
       PUBLIC API — only these are accessible from HTML
       onclick attributes.  Every one guards auth.
    ══════════════════════════════════════════════════════ */
    window.navigate                       = _navigate;
    window.openSidebar                    = _openSidebar;
    window.closeSidebar                   = _closeSidebar;
    window.renderProductTable             = _renderProductTable;


    /* Products */
    window.openAddModal      = _openAddModal;
    window.openEditModal     = _openEditModal;
    window.closeModal        = _closeModal;
    window.saveProduct       = _saveProduct;
    window.confirmDelete     = _confirmDelete;
    window.closeConfirm      = _closeConfirm;
    window.toggleFeatured    = _toggleFeatured;
    window.addRow            = _addRow;

    /* Teaser */
    window.setTeaserFeatured = _setTeaserFeatured;
    window.saveTeaser        = _saveTeaser;

    /* Carousel */
    window.addCarouselSlide    = _addCarouselSlide;
    window.removeSlide         = _removeSlide;
    window.toggleSlide         = _toggleSlide;
    window.updateSlideTag      = _updateSlideTag;
    window.updateSlideBg       = _updateSlideBg;
    window.saveCarousel        = _saveCarousel;
    window.triggerSlideBgUpload = _triggerSlideBgUpload;
    window.handleSlideBgFile   = _handleSlideBgFile;

    /* Images */
    window.setMainImg     = _setMainImg;
    window.removeImg      = _removeImg;
    window.handleImgFiles = _handleImgFiles;

    /* Events */
    window.openEventAddModal  = _openEventAddModal;
    window.openEventEditModal = _openEventEditModal;
    window.closeEventModal    = _closeEventModal;
    window.saveEvent          = _saveEvent;
    window.confirmDeleteEvent = _confirmDeleteEvent;
    window.removeEventImg     = _removeEventImg;
    window.handleEventImgFiles = _handleEventImgFiles;

    /* Add-ons */
    window.openAddonModal      = _openAddonModal;
    window.closeAddonModal     = _closeAddonModal;
    window.saveAddon           = _saveAddon;
    window.confirmDeleteAddon  = _confirmDeleteAddon;
    window.signOut             = _signOut;

    /* ══════════════════════════════════════════════════════
       INIT
    ══════════════════════════════════════════════════════ */
    _renderDashboard();

})();
