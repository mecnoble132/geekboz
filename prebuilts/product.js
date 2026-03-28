document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const productContent = document.getElementById('productContent');

    if (!productId) {
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
        return;
    }

    try {
        let products = [];
        if (window.fb && window.fb.db) {
            const snap = await window.fb.db.collection('prebuilts').get();
            products = snap.docs.map(doc => {
                const d = doc.data() || {};
                return {
                    id: d.id || doc.id,
                    ...d,
                    price: Number(d.price || 0),
                    order: Number(d.order || 0)
                };
            });
        } else {
            const response = await fetch('../products.json');
            products = await response.json();
        }

        const product = products.find(p => p.id === productId);

        loadingState.style.display = 'none';

        if (!product) {
            errorState.style.display = 'block';
            return;
        }

        // Helper to fix relative paths for subfolder
        const fixPath = (path) => path.startsWith('../') ? '../' + path : path;
        product.image = fixPath(product.image);
        if (product.gallery) product.gallery = product.gallery.map(fixPath);

        // 1. Populate Hero
        document.title = `${product.name} — GeekBoZ`;
        document.getElementById('bcName').textContent = product.name;
        document.getElementById('prodName').textContent = product.name;
        document.getElementById('prodTagline').textContent = product.description;
        
        let basePrice = product.price;
        let currentTotal = basePrice;

        const priceEl = document.getElementById('prodPrice');
        priceEl.textContent = `₹${basePrice.toLocaleString('en-IN')}`; // Keep base price static

        const summaryEl = document.getElementById('priceSummary');
        const totalEl = document.getElementById('totalPriceDisplay');
        
        const updatePriceDisplay = () => {
            if (currentTotal > basePrice) {
                summaryEl.style.display = 'flex';
                totalEl.textContent = `₹${currentTotal.toLocaleString('en-IN')}`;
            } else {
                summaryEl.style.display = 'none';
            }
        };
        updatePriceDisplay();
        
        // Addons Logic
        document.querySelectorAll('.addon-checkbox').forEach(cb => {
            cb.addEventListener('change', (e) => {
                if(e.target.checked) currentTotal += parseInt(e.target.value);
                else currentTotal -= parseInt(e.target.value);
                updatePriceDisplay();
            });
        });

        const mainImg = document.getElementById('prodMainImg');
        const imgBox = document.querySelector('.prod-main-img-box');
        
        mainImg.src = product.image;
        mainImg.alt = product.name;

        // Hover Zoom Logic
        imgBox.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = imgBox.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            
            mainImg.style.transformOrigin = `${x}% ${y}%`;
            mainImg.style.transform = 'scale(1.7)';
        });

        imgBox.addEventListener('mouseleave', () => {
            mainImg.style.transformOrigin = 'center';
            mainImg.style.transform = 'scale(1)';
        });

        // Thumbnails
        const thumbContainer = document.getElementById('prodThumbnails');
        if(product.gallery && product.gallery.length) {
            product.gallery.forEach((src, idx) => {
                const box = document.createElement('div');
                box.className = `thumbnail-box ${idx===0 ? 'active' : ''}`;
                box.innerHTML = `<img src="${src}" alt="Thumb">`;
                box.onclick = () => {
                    mainImg.src = src;
                    document.querySelectorAll('.thumbnail-box').forEach(b => b.classList.remove('active'));
                    box.classList.add('active');
                };
                thumbContainer.appendChild(box);
            });
        }

        const tag = document.getElementById('prodTag');
        tag.textContent = product.tag;
        tag.className = `prod-series-tag ${product.series}`;

        const badge = document.getElementById('prodBadge');
        if (product.badge) {
            badge.textContent = product.badge;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }

        // 2. Populate Specs Table
        const specsTable = document.getElementById('specsTable');
        const specsData = [
            { icon: 'cpu', label: 'Processor', val: product.cpu },
            { icon: 'monitor', label: 'Graphics', val: product.gpu },
            { icon: 'memory-stick', label: 'Memory', val: product.ram },
            { icon: 'hard-drive', label: 'Storage', val: product.storage },
            { icon: 'tv', label: 'Display Opt', val: product.display || 'N/A' },
            { icon: 'snowflake', label: 'Cooling', val: product.cooling || 'Advanced Cooling' },
            { icon: 'weight', label: 'Weight', val: product.weight || '—', hidden: true }
        ];

        specsData.forEach((s, i) => {
            const tr = document.createElement('tr');
            if(s.hidden) tr.className = 'specs-hidden';
            tr.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i data-lucide="${s.icon}"></i> 
                        <span style="display: block; transform: translateY(1px);">${s.label}</span>
                    </div>
                </td>
                <td class="spec-val">${s.val}</td>
            `;
            specsTable.appendChild(tr);
        });

        document.getElementById('expandSpecsBtn').addEventListener('click', (e) => {
            document.querySelectorAll('.specs-hidden').forEach(el => el.classList.remove('specs-hidden'));
            e.currentTarget.style.display = 'none';
        });

        // 3. Highlights
        const highlGrid = document.getElementById('highlightsGrid');
        if(product.highlights) {
            product.highlights.forEach(h => {
                const div = document.createElement('div');
                div.className = 'highlight-card';
                div.innerHTML = `
                    <div class="highlight-icon"><i data-lucide="${h.icon}"></i></div>
                    <h3>${h.title}</h3>
                    <p>${h.desc}</p>
                `;
                highlGrid.appendChild(div);
            });
        }

        // 4. FPS Table
        const fpsTableBody = document.getElementById('fpsTableBody');
        if(product.fps) {
            product.fps.forEach(f => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${f.game}</td>
                    <td style="color:var(--muted); font-size: 0.75rem;">${f.settings}</td>
                    <td>${f.fps} FPS</td>
                `;
                fpsTableBody.appendChild(tr);
            });
        }

        // 7. Related (Using Standard PB-Card)
        const relatedGrid = document.getElementById('relatedGrid');
        const related = products.filter(p => p.series === product.series && p.id !== product.id).slice(0, 4);
        if(related.length === 0) {
            related.push(...products.filter(p=>p.id!==product.id).slice(0,4));
        }

        related.forEach(r => {
            const a = document.createElement('a');
            a.href = `?id=${r.id}`;
            a.style.textDecoration = 'none';
            a.style.display = 'block';
            const rImage = fixPath(r.image);
            a.innerHTML = `
                <div class="pb-card">
                    <div class="pb-card-img">
                        <span class="pb-series-tag ${r.series}">${r.tag}</span>
                        <img src="${rImage}" alt="${r.name}" loading="lazy">
                    </div>
                    <div class="pb-card-body">
                        <h3 class="pb-card-name">GeekBoZ <br><span>${r.name.replace('GBZ ', '')}</span></h3>
                        <div class="pb-card-specs">
                            <span><i data-lucide="cpu"></i> ${r.cpu}</span>
                            <span><i data-lucide="monitor"></i> ${r.gpu}</span>
                        </div>
                        <div class="pb-card-footer">
                            <span class="pb-price">₹${r.price.toLocaleString('en-IN')}</span>
                            <span class="pb-card-btn">
                                View Build <i data-lucide="arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </div>
            `;
            relatedGrid.appendChild(a);
        });

        // Initialize icons dynamically mapped
        lucide.createIcons();
        productContent.style.display = 'block';

        // CTA Actions
        const getWAUrl = () => {
            const addons = Array.from(document.querySelectorAll('.addon-checkbox:checked')).map(cb => cb.nextElementSibling.textContent);
            let addonText = addons.length ? `\nAdd-ons included: ${addons.join(', ')}` : '';
            const text = `Hi GeekBoZ! I'm interested in the ${product.name} (Total: ₹${currentTotal.toLocaleString('en-IN')}).${addonText}\nCan we discuss further?`;
            return `https://wa.me/919567776571?text=${encodeURIComponent(text)}`;
        }

        document.getElementById('addCartBtn').addEventListener('click', () => { 
            const addons = Array.from(document.querySelectorAll('.addon-checkbox:checked')).map(cb => cb.nextElementSibling.textContent);
            // Normalize image path to root-relative so it works from any page
            const rawImg = product.image || '';
            const isExternal = /^https?:\/\//i.test(rawImg);
            const rootImg = isExternal
                ? rawImg
                : (rawImg.startsWith('/') ? rawImg : '/assets/images/' + rawImg.split('/').pop());
            window.addToCart(product.name, basePrice, currentTotal, addons, product.id, rootImg);

            const btn = document.getElementById('addCartBtn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check"></i> Added!';
            btn.style.background = '#64b4ff'; // Blue highlight
            lucide.createIcons();
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = 'var(--accent)';
                lucide.createIcons();
            }, 2000);
        });
        
        document.getElementById('contactBtn').addEventListener('click', () => { window.open(getWAUrl(), '_blank'); });

    } catch (e) {
        console.error(e);
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
    }
});






