import { MEDIA, PROPERTIES, NEIGHBORHOODS, TESTIMONIALS, FAQS, LEGAL_DOCS } from './data.js';

const STORAGE_KEY_FAVS = 'nestora_favorites';

const PRICE_BRACKETS = {
  all: [
    { label: 'Any Price', min: 0, max: Infinity },
    { label: 'Rent: Up to $850 / wk', mode: 'rent', min: 0, max: 850 },
    { label: 'Rent: $850 – $1,400 / wk', mode: 'rent', min: 850, max: 1400 },
    { label: 'Buy: Up to $1,000,000', mode: 'buy', min: 0, max: 1000000 },
    { label: 'Buy: $1,000,000 – $2,200,000', mode: 'buy', min: 1000000, max: 2200000 },
    { label: 'Buy: $2,200,000+', mode: 'buy', min: 2200000, max: Infinity }
  ],
  buy: [
    { label: 'Any Sale Price', min: 0, max: Infinity },
    { label: 'Up to $1,000,000', min: 0, max: 1000000 },
    { label: '$1,000,000 – $1,800,000', min: 1000000, max: 1800000 },
    { label: '$1,800,000 – $2,600,000', min: 1800000, max: 2600000 },
    { label: '$2,600,000+', min: 2600000, max: Infinity }
  ],
  rent: [
    { label: 'Any Weekly Rent', min: 0, max: Infinity },
    { label: 'Up to $800 / week', min: 0, max: 800 },
    { label: '$800 – $1,100 / week', min: 800, max: 1100 },
    { label: '$1,100+ / week', min: 1100, max: Infinity }
  ]
};

const state = {
  heroMode: 'buy',
  filters: {
    mode: 'all', // 'all' | 'buy' | 'rent'
    savedOnly: false,
    location: 'all',
    category: 'all',
    minPrice: 0,
    maxPrice: Infinity,
    bedrooms: 0,
    sort: 'featured'
  },
  favorites: loadFavorites(),
  compareIds: [],
  activePropertyId: null,
  activeGalleryIndex: 0,
  detailInquiryTab: 'viewing' // 'viewing' | 'question'
};

function loadFavorites() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_FAVS);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    return new Set();
  }
}

function saveFavorites() {
  try {
    window.localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify([...state.favorites]));
  } catch {
    // Ignore storage quota errors in restricted browsing modes
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function heartIconSvg() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
}

function homeFallbackSvg(label) {
  return `
    <div class="media-fallback" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z"/>
      </svg>
      <span style="margin-top:0.5rem;font-size:0.85rem;font-weight:600;">${escapeHtml(label)}</span>
    </div>
  `;
}

function wireImageFallbacks(root = document) {
  root.querySelectorAll('.media-frame img').forEach((img) => {
    if (img.dataset.fallbackWired) return;
    img.dataset.fallbackWired = 'true';
    img.addEventListener('error', () => {
      const frame = img.closest('.media-frame');
      if (frame) frame.classList.add('is-fallback');
    });
  });
}

/* ==========================================================================
   STATIC EDITORIAL HYDRATION (HERO, NEIGHBORHOODS, WHY, PROMO, TESTIMONIALS, FAQ)
   ========================================================================== */

function hydrateStaticSections() {
  const heroImg = document.getElementById('hero-bg-img');
  if (heroImg) heroImg.src = MEDIA.hero;

  const whyImg = document.getElementById('why-nestora-img');
  if (whyImg) whyImg.src = MEDIA.whyNestora;

  const listPromoImg = document.getElementById('list-promo-img');
  if (listPromoImg) listPromoImg.src = MEDIA.listProperty;

  // Populate Suburb & Category options dynamically
  const suburbs = [...new Set(PROPERTIES.map((p) => p.suburb))].sort();
  const categories = [...new Set(PROPERTIES.map((p) => p.category))];

  const suburbSelects = [
    document.getElementById('hero-location'),
    document.getElementById('filter-location')
  ];
  suburbSelects.forEach((sel) => {
    if (!sel) return;
    suburbs.forEach((suburb) => {
      const opt = document.createElement('option');
      opt.value = suburb;
      opt.textContent = suburb;
      sel.appendChild(opt);
    });
  });

  const categorySelects = [
    document.getElementById('hero-category'),
    document.getElementById('filter-category')
  ];
  categorySelects.forEach((sel) => {
    if (!sel) return;
    categories.forEach((cat) => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      sel.appendChild(opt);
    });
  });

  renderHeroPriceOptions();
  renderFilterPriceOptions();
  renderNeighborhoods();
  renderTestimonials();
  renderFaqs();
  wireImageFallbacks(document);
}

function renderHeroPriceOptions() {
  const select = document.getElementById('hero-price');
  if (!select) return;
  const brackets = PRICE_BRACKETS[state.heroMode] || PRICE_BRACKETS.buy;
  select.innerHTML = brackets
    .map((b, idx) => `<option value="${idx}">${escapeHtml(b.label)}</option>`)
    .join('');
}

function renderFilterPriceOptions() {
  const minSel = document.getElementById('filter-min-price');
  const maxSel = document.getElementById('filter-max-price');
  if (!minSel || !maxSel) return;

  const mode = state.filters.mode;
  let minOptions = [];
  let maxOptions = [];

  if (mode === 'rent') {
    minOptions = [
      { value: 0, label: 'No Min Rent' },
      { value: 700, label: '$700 / wk' },
      { value: 850, label: '$850 / wk' },
      { value: 1100, label: '$1,100 / wk' }
    ];
    maxOptions = [
      { value: 'Infinity', label: 'No Max Rent' },
      { value: 800, label: '$800 / wk' },
      { value: 1000, label: '$1,000 / wk' },
      { value: 1250, label: '$1,250 / wk' },
      { value: 1500, label: '$1,500 / wk' }
    ];
  } else if (mode === 'buy') {
    minOptions = [
      { value: 0, label: 'No Min Price' },
      { value: 650000, label: '$650,000' },
      { value: 1000000, label: '$1,000,000' },
      { value: 1800000, label: '$1,800,000' },
      { value: 2500000, label: '$2,500,000' }
    ];
    maxOptions = [
      { value: 'Infinity', label: 'No Max Price' },
      { value: 1000000, label: '$1,000,000' },
      { value: 1800000, label: '$1,800,000' },
      { value: 2500000, label: '$2,500,000' },
      { value: 3500000, label: '$3,500,000' }
    ];
  } else {
    minOptions = [
      { value: 0, label: 'No Minimum' },
      { value: 700, label: '$700+ (Rent or Buy)' },
      { value: 650000, label: '$650,000+ (Sale)' },
      { value: 1500000, label: '$1,500,000+ (Sale)' }
    ];
    maxOptions = [
      { value: 'Infinity', label: 'No Maximum' },
      { value: 1400, label: 'Up to $1,400 / wk' },
      { value: 1000000, label: 'Up to $1,000,000' },
      { value: 2200000, label: 'Up to $2,200,000' },
      { value: 3500000, label: 'Up to $3,500,000' }
    ];
  }

  minSel.innerHTML = minOptions
    .map((o) => `<option value="${o.value}">${escapeHtml(o.label)}</option>`)
    .join('');
  maxSel.innerHTML = maxOptions
    .map((o) => `<option value="${o.value}">${escapeHtml(o.label)}</option>`)
    .join('');

  minSel.value = String(state.filters.minPrice);
  if (minSel.value !== String(state.filters.minPrice)) {
    state.filters.minPrice = 0;
    minSel.value = '0';
  }

  const maxStr = state.filters.maxPrice === Infinity ? 'Infinity' : String(state.filters.maxPrice);
  maxSel.value = maxStr;
  if (maxSel.value !== maxStr) {
    state.filters.maxPrice = Infinity;
    maxSel.value = 'Infinity';
  }
}

/* ==========================================================================
   PROPERTY FILTERING & RENDERING
   ========================================================================== */

function getFilteredProperties() {
  const { mode, savedOnly, location, category, minPrice, maxPrice, bedrooms, sort } = state.filters;

  const list = PROPERTIES.filter((prop) => {
    if (mode !== 'all' && prop.listingType !== mode) return false;
    if (savedOnly && !state.favorites.has(prop.id)) return false;
    if (location !== 'all' && prop.suburb !== location) return false;
    if (category !== 'all' && prop.category !== category) return false;
    if (prop.price < minPrice) return false;
    if (prop.price > maxPrice) return false;
    if (bedrooms > 0 && prop.bedrooms < bedrooms) return false;
    return true;
  });

  if (sort === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === 'beds-desc') {
    list.sort((a, b) => b.bedrooms - a.bedrooms);
  }

  return list;
}

function renderProperties() {
  const spotlightContainer = document.getElementById('spotlight-container');
  const gridContainer = document.getElementById('properties-grid');
  const emptyContainer = document.getElementById('properties-empty');
  const summaryEl = document.getElementById('results-summary');
  const savedBtnCount = document.getElementById('saved-count');

  if (!spotlightContainer || !gridContainer || !emptyContainer) return;

  if (savedBtnCount) {
    savedBtnCount.textContent = String(state.favorites.size);
  }

  const savedToggleBtn = document.getElementById('filter-saved-btn');
  if (savedToggleBtn) {
    savedToggleBtn.classList.toggle('active', state.filters.savedOnly);
    savedToggleBtn.setAttribute('aria-pressed', String(state.filters.savedOnly));
  }

  document.querySelectorAll('[data-filter-mode]').forEach((btn) => {
    const active = btn.getAttribute('data-filter-mode') === state.filters.mode;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  const filtered = getFilteredProperties();

  if (summaryEl) {
    const modeLabel =
      state.filters.mode === 'buy'
        ? 'for sale'
        : state.filters.mode === 'rent'
          ? 'for rent'
          : 'across sale & lease';
    summaryEl.textContent = `Showing ${filtered.length} of ${PROPERTIES.length} demonstration homes ${modeLabel}`;
  }

  if (filtered.length === 0) {
    spotlightContainer.innerHTML = '';
    gridContainer.innerHTML = '';
    emptyContainer.hidden = false;
    return;
  }

  emptyContainer.hidden = true;

  // Show featured editorial horizontal layout when viewing 4+ homes in Featured order
  const useSpotlight = filtered.length >= 4 && state.filters.sort === 'featured';
  const spotlightProp = useSpotlight ? filtered[0] : null;
  const gridProps = useSpotlight ? filtered.slice(1) : filtered;

  if (spotlightProp) {
    const isFav = state.favorites.has(spotlightProp.id);
    const isCompared = state.compareIds.includes(spotlightProp.id);
    const modeText = spotlightProp.listingType === 'buy' ? 'For Sale' : 'For Rent';

    spotlightContainer.innerHTML = `
      <article class="spotlight-listing" aria-label="Featured property: ${escapeHtml(spotlightProp.title)}">
        <div class="media-frame spotlight-media">
          <img src="${spotlightProp.image}" alt="${escapeHtml(spotlightProp.imageAlt)}" referrerpolicy="no-referrer" loading="eager" />
          ${homeFallbackSvg(spotlightProp.title)}
          <button
            type="button"
            class="fav-btn"
            data-action="toggle-fav"
            data-id="${spotlightProp.id}"
            aria-pressed="${isFav}"
            aria-label="${isFav ? 'Remove from saved homes' : 'Save home to favorites'}: ${escapeHtml(spotlightProp.title)}"
          >
            ${heartIconSvg()}
          </button>
        </div>
        <div class="spotlight-body">
          <div>
            <p class="listing-meta-line">
              Featured Selection <span class="meta-sep" aria-hidden="true">·</span>
              ${escapeHtml(spotlightProp.category)} <span class="meta-sep" aria-hidden="true">·</span>
              ${escapeHtml(spotlightProp.suburb)} <span class="meta-sep" aria-hidden="true">·</span>
              ${modeText}
            </p>
            <h3 class="spotlight-title">${escapeHtml(spotlightProp.title)}</h3>
            <p class="listing-address">${escapeHtml(spotlightProp.address)}</p>
            <p class="spotlight-price tabular-nums">${escapeHtml(spotlightProp.priceDisplay)}</p>
            <div class="specs-row tabular-nums">
              <span>${spotlightProp.bedrooms} Bed</span>
              <span class="meta-sep" aria-hidden="true">·</span>
              <span>${spotlightProp.bathrooms} Bath</span>
              <span class="meta-sep" aria-hidden="true">·</span>
              <span>${spotlightProp.parking} Parking</span>
              <span class="meta-sep" aria-hidden="true">·</span>
              <span>${spotlightProp.areaSqm} m² internal</span>
            </div>
            <p class="listing-desc">${escapeHtml(spotlightProp.shortDescription)}</p>
          </div>
          <div class="card-footer-actions">
            <button
              type="button"
              class="btn btn-primary"
              data-action="open-detail"
              data-id="${spotlightProp.id}"
            >
              View Details
            </button>
            <div class="card-icon-actions">
              <button
                type="button"
                class="compare-toggle-btn"
                data-action="toggle-compare"
                data-id="${spotlightProp.id}"
                aria-pressed="${isCompared}"
              >
                ${isCompared ? 'Selected to Compare' : 'Compare'}
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  } else {
    spotlightContainer.innerHTML = '';
  }

  gridContainer.innerHTML = gridProps
    .map((prop) => {
      const isFav = state.favorites.has(prop.id);
      const isCompared = state.compareIds.includes(prop.id);
      const modeText = prop.listingType === 'buy' ? 'For Sale' : 'For Rent';

      return `
        <article class="property-card">
          <div class="media-frame card-media">
            <img src="${prop.image}" alt="${escapeHtml(prop.imageAlt)}" referrerpolicy="no-referrer" loading="lazy" />
            ${homeFallbackSvg(prop.title)}
            <button
              type="button"
              class="fav-btn"
              data-action="toggle-fav"
              data-id="${prop.id}"
              aria-pressed="${isFav}"
              aria-label="${isFav ? 'Remove from saved homes' : 'Save home to favorites'}: ${escapeHtml(prop.title)}"
            >
              ${heartIconSvg()}
            </button>
          </div>
          <div class="card-body">
            <p class="listing-meta-line">
              ${escapeHtml(prop.category)} <span class="meta-sep" aria-hidden="true">·</span>
              ${escapeHtml(prop.suburb)} <span class="meta-sep" aria-hidden="true">·</span>
              ${modeText}
            </p>
            <div class="card-price-row">
              <span class="card-price tabular-nums">${escapeHtml(prop.priceDisplay)}</span>
            </div>
            <h3 class="card-title">${escapeHtml(prop.title)}</h3>
            <p class="card-address">${escapeHtml(prop.address)}</p>
            <div class="card-specs tabular-nums">
              <span>${prop.bedrooms} Bed</span>
              <span class="meta-sep" aria-hidden="true">·</span>
              <span>${prop.bathrooms} Bath</span>
              <span class="meta-sep" aria-hidden="true">·</span>
              <span>${prop.parking} Car</span>
              <span class="meta-sep" aria-hidden="true">·</span>
              <span>${prop.areaSqm} m²</span>
            </div>
            <p class="card-excerpt">${escapeHtml(prop.shortDescription)}</p>
            <div class="card-footer-actions">
              <button
                type="button"
                class="btn btn-outline"
                data-action="open-detail"
                data-id="${prop.id}"
              >
                View Details
              </button>
              <button
                type="button"
                class="compare-toggle-btn"
                data-action="toggle-compare"
                data-id="${prop.id}"
                aria-pressed="${isCompared}"
              >
                ${isCompared ? 'Comparing' : 'Compare'}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  wireImageFallbacks(spotlightContainer);
  wireImageFallbacks(gridContainer);
}

/* ==========================================================================
   NEIGHBORHOODS, TESTIMONIALS & FAQS
   ========================================================================== */

function renderNeighborhoods() {
  const container = document.getElementById('neighborhood-grid');
  if (!container) return;

  container.innerHTML = NEIGHBORHOODS.map(
    (hood) => `
      <article class="neighborhood-card">
        <div class="media-frame">
          <img src="${hood.image}" alt="${escapeHtml(hood.alt)}" referrerpolicy="no-referrer" loading="lazy" />
          ${homeFallbackSvg(hood.name)}
        </div>
        <div class="neighborhood-scrim" aria-hidden="true"></div>
        <div class="neighborhood-content">
          <p class="neighborhood-meta">${escapeHtml(hood.postcode)} · Melbourne</p>
          <h3 class="neighborhood-name">${escapeHtml(hood.name)}</h3>
          <p class="neighborhood-desc">${escapeHtml(hood.description)}</p>
          <button
            type="button"
            class="btn btn-light"
            data-action="explore-area"
            data-suburb="${escapeHtml(hood.name)}"
          >
            Explore Area
          </button>
        </div>
      </article>
    `
  ).join('');

  wireImageFallbacks(container);
}

function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  container.innerHTML = TESTIMONIALS.map(
    (item) => `
      <blockquote class="testimonial-item">
        <p class="testimonial-quote">“${escapeHtml(item.quote)}”</p>
        <footer>
          <p class="testimonial-author">${escapeHtml(item.author)}</p>
          <p class="testimonial-context">${escapeHtml(item.context)}</p>
        </footer>
      </blockquote>
    `
  ).join('');
}

function renderFaqs() {
  const container = document.getElementById('faq-list');
  if (!container) return;

  container.innerHTML = FAQS.map(
    (faq, index) => `
      <div class="faq-item">
        <h3>
          <button
            type="button"
            class="faq-question"
            aria-expanded="${index === 0 ? 'true' : 'false'}"
            aria-controls="faq-panel-${index}"
            id="faq-trigger-${index}"
          >
            <span>${escapeHtml(faq.question)}</span>
            <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </h3>
        <div
          id="faq-panel-${index}"
          class="faq-answer"
          role="region"
          aria-labelledby="faq-trigger-${index}"
          ${index === 0 ? '' : 'hidden'}
        >
          <p>${escapeHtml(faq.answer)}</p>
        </div>
      </div>
    `
  ).join('');

  container.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panelId = btn.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });
}

/* ==========================================================================
   MODALS: PROPERTY DETAIL, COMPARISON, LIST YOUR PROPERTY & LEGAL
   ========================================================================== */

let lastFocusedElement = null;

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  const closeBtn = modal.querySelector('.modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach((m) => {
    m.hidden = true;
  });
  document.body.classList.remove('modal-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

function openPropertyDetail(propertyId) {
  const prop = PROPERTIES.find((p) => p.id === propertyId);
  if (!prop) return;

  state.activePropertyId = prop.id;
  state.activeGalleryIndex = 0;
  state.detailInquiryTab = 'viewing';

  renderPropertyDetailModal(prop);
  openModal('property-detail-modal');
}

function renderPropertyDetailModal(prop) {
  const titleEl = document.getElementById('detail-modal-heading');
  const bodyEl = document.getElementById('detail-modal-body');
  if (!titleEl || !bodyEl) return;

  const isFav = state.favorites.has(prop.id);
  const activeSlide = prop.gallery[state.activeGalleryIndex] || {
    src: prop.image,
    caption: prop.title,
    alt: prop.imageAlt
  };
  const modeLabel = prop.listingType === 'buy' ? 'For Sale' : 'For Rent';

  titleEl.textContent = `${prop.title} — ${prop.suburb}`;

  bodyEl.innerHTML = `
    <div class="detail-layout">
      <div>
        <div class="media-frame detail-main-photo">
          <img id="detail-hero-img" src="${activeSlide.src}" alt="${escapeHtml(activeSlide.alt)}" referrerpolicy="no-referrer" />
          ${homeFallbackSvg(prop.title)}
        </div>
        <p id="detail-photo-caption" class="detail-caption">${escapeHtml(activeSlide.caption)}</p>
        <div class="detail-thumbs" role="group" aria-label="Property photograph views">
          ${prop.gallery
            .map(
              (img, idx) => `
              <button
                type="button"
                class="detail-thumb-btn ${idx === state.activeGalleryIndex ? 'active' : ''}"
                data-action="switch-gallery"
                data-index="${idx}"
                aria-label="View photo ${idx + 1}: ${escapeHtml(img.caption)}"
              >
                <img src="${img.src}" alt="${escapeHtml(img.alt)}" referrerpolicy="no-referrer" />
              </button>
            `
            )
            .join('')}
        </div>

        <p class="listing-meta-line">
          ${escapeHtml(prop.category)} <span class="meta-sep">·</span>
          ${modeLabel} <span class="meta-sep">·</span>
          ${escapeHtml(prop.priceNote)}
        </p>
        <h3 class="spotlight-title" style="margin-bottom:0.25rem;">${escapeHtml(prop.address)}</h3>
        <p class="spotlight-price tabular-nums">${escapeHtml(prop.priceDisplay)}</p>

        <div class="specs-row tabular-nums">
          <span>${prop.bedrooms} Bedrooms</span>
          <span class="meta-sep">·</span>
          <span>${prop.bathrooms} Bathrooms</span>
          <span class="meta-sep">·</span>
          <span>${prop.parking} Parking</span>
          <span class="meta-sep">·</span>
          <span>${prop.areaSqm} m²</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:0.9rem;margin-bottom:1.5rem;">
          ${prop.fullDescription.map((para) => `<p class="listing-desc">${escapeHtml(para)}</p>`).join('')}
        </div>

        <h4 class="principle-title">Key Property Features</h4>
        <ul class="detail-features-grid">
          ${prop.features.map((feat) => `<li>• ${escapeHtml(feat)}</li>`).join('')}
        </ul>

        <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border-subtle);font-size:0.875rem;color:var(--charcoal-700);">
          <p><strong>Inspection Window:</strong> ${escapeHtml(prop.inspectionTime)}</p>
          <p style="margin-top:0.25rem;"><strong>Property Notes:</strong> ${escapeHtml(prop.outgoingsContext)}</p>
        </div>
      </div>

      <aside class="detail-sidebar-panel">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;">
          <div class="segmented-control" role="tablist" aria-label="Inquiry options">
            <button
              type="button"
              class="segment-btn ${state.detailInquiryTab === 'viewing' ? 'active' : ''}"
              data-action="detail-tab"
              data-tab="viewing"
            >
              Request Viewing
            </button>
            <button
              type="button"
              class="segment-btn ${state.detailInquiryTab === 'question' ? 'active' : ''}"
              data-action="detail-tab"
              data-tab="question"
            >
              Send Inquiry
            </button>
          </div>
          <button
            type="button"
            class="compare-toggle-btn"
            data-action="toggle-fav"
            data-id="${prop.id}"
            aria-pressed="${isFav}"
          >
            ${isFav ? '♥ Saved' : '♡ Save'}
          </button>
        </div>

        <form id="property-inquiry-form" class="form-stack" novalidate>
          <p style="font-size:0.9rem;color:var(--charcoal-700);">
            ${
              state.detailInquiryTab === 'viewing'
                ? 'Select a preferred inspection day and our Melbourne demonstration interface will confirm your viewing request immediately.'
                : 'Ask about contract documentation, floorplan measurements, lease terms, or neighborhood context.'
            }
          </p>

          ${
            state.detailInquiryTab === 'viewing'
              ? `
              <div class="form-grid-two">
                <div class="field-group">
                  <label class="field-label" for="inq-date">Preferred Date</label>
                  <input class="field-control" type="date" id="inq-date" name="date" required />
                </div>
                <div class="field-group">
                  <label class="field-label" for="inq-Slot">Preferred Window</label>
                  <select class="field-control" id="inq-Slot" name="slot">
                    <option value="Saturday Morning">Saturday Morning</option>
                    <option value="Saturday Afternoon">Saturday Afternoon</option>
                    <option value="Midweek Evening">Midweek Evening</option>
                    <option value="Private Appointment">Private Appointment</option>
                  </select>
                </div>
              </div>
            `
              : ''
          }

          <div class="field-group">
            <label class="field-label" for="inq-name">Full Name</label>
            <input class="field-control" type="text" id="inq-name" name="name" placeholder="e.g. Hannah Reid" required />
          </div>

          <div class="form-grid-two">
            <div class="field-group">
              <label class="field-label" for="inq-email">Email Address</label>
              <input class="field-control" type="email" id="inq-email" name="email" placeholder="hannah@example.com" required />
            </div>
            <div class="field-group">
              <label class="field-label" for="inq-phone">Phone (Optional)</label>
              <input class="field-control" type="tel" id="inq-phone" name="phone" placeholder="0400 000 000" />
            </div>
          </div>

          <div class="field-group">
            <label class="field-label" for="inq-notes">Message or Questions</label>
            <textarea class="field-control" id="inq-notes" name="notes" placeholder="${
              state.detailInquiryTab === 'viewing'
                ? 'Let us know if you have accessibility requirements or questions prior to viewing.'
                : 'Request sample Section 32 / lease summary or ask a specific question about this property.'
            }"></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;">
            ${state.detailInquiryTab === 'viewing' ? 'Confirm Viewing Request' : 'Send Property Inquiry'}
          </button>

          <div id="property-inquiry-feedback" hidden></div>

          <p class="form-demo-note">
            Demonstration Notice: Inquiries run locally in your browser to showcase user-experience flow. No real estate agent or external server receives this submission.
          </p>
        </form>
      </aside>
    </div>
  `;

  wireImageFallbacks(bodyEl);

  const form = document.getElementById('property-inquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleDemoFormSubmit(form, 'property-inquiry-feedback', (data) => {
        const actionType =
          state.detailInquiryTab === 'viewing' ? 'Viewing request recorded' : 'Property inquiry recorded';
        return `${actionType} for ${prop.title} (${prop.suburb}). Thank you, ${data.name}—this portfolio demonstration processed your request locally with zero external data transmission.`;
      });
    });
  }
}

function updateCompareTray() {
  const tray = document.getElementById('compare-tray');
  const text = document.getElementById('compare-tray-text');
  if (!tray || !text) return;

  if (state.compareIds.length === 0) {
    tray.hidden = true;
    return;
  }

  tray.hidden = false;
  text.textContent = `${state.compareIds.length} of 3 homes selected for comparison`;
}

function openComparisonModal() {
  const bodyEl = document.getElementById('compare-modal-body');
  if (!bodyEl) return;

  const selected = state.compareIds
    .map((id) => PROPERTIES.find((p) => p.id === id))
    .filter(Boolean);

  if (selected.length === 0) {
    bodyEl.innerHTML = `<p class="listing-desc">Select up to three properties using the "Compare" button on any listing card to inspect their specifications side by side.</p>`;
  } else {
    bodyEl.innerHTML = `
      <div class="compare-table-wrap">
        <table class="compare-table tabular-nums">
          <thead>
            <tr>
              <th>Property</th>
              ${selected
                .map(
                  (p) => `
                  <td>
                    <strong style="font-family:var(--font-display);font-size:1rem;">${escapeHtml(p.title)}</strong>
                    <div style="font-size:0.82rem;color:var(--charcoal-500);margin-top:0.2rem;">${escapeHtml(p.address)}</div>
                  </td>
                `
                )
                .join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Guide / Rent</th>
              ${selected.map((p) => `<td><strong style="color:var(--forest-800);">${escapeHtml(p.priceDisplay)}</strong><br/><span style="font-size:0.8rem;color:var(--charcoal-500);">${escapeHtml(p.priceNote)}</span></td>`).join('')}
            </tr>
            <tr>
              <th>Category</th>
              ${selected.map((p) => `<td>${escapeHtml(p.category)} (${p.listingType === 'buy' ? 'Sale' : 'Rent'})</td>`).join('')}
            </tr>
            <tr>
              <th>Accommodation</th>
              ${selected.map((p) => `<td>${p.bedrooms} Bed · ${p.bathrooms} Bath · ${p.parking} Car</td>`).join('')}
            </tr>
            <tr>
              <th>Internal Area</th>
              ${selected.map((p) => `<td>${p.areaSqm} m²</td>`).join('')}
            </tr>
            <tr>
              <th>Key Highlights</th>
              ${selected.map((p) => `<td>${escapeHtml(p.features.slice(0, 3).join(' · '))}</td>`).join('')}
            </tr>
            <tr>
              <th>Outgoings / Lease</th>
              ${selected.map((p) => `<td>${escapeHtml(p.outgoingsContext)}</td>`).join('')}
            </tr>
            <tr>
              <th>Action</th>
              ${selected
                .map(
                  (p) => `
                  <td>
                    <button type="button" class="btn btn-outline" data-action="open-detail" data-id="${p.id}">
                      View Full Details
                    </button>
                  </td>
                `
                )
                .join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  openModal('compare-modal');
}

function openLegalModal(docKey) {
  const doc = LEGAL_DOCS[docKey];
  if (!doc) return;
  const heading = document.getElementById('legal-modal-heading');
  const body = document.getElementById('legal-modal-body');
  if (!heading || !body) return;

  heading.textContent = doc.title;
  body.innerHTML = `
    <p class="listing-meta-line" style="margin-bottom:1rem;">Last Updated: ${escapeHtml(doc.updated)}</p>
    <div style="display:flex;flex-direction:column;gap:1rem;">
      ${doc.paragraphs.map((p) => `<p class="listing-desc">${escapeHtml(p)}</p>`).join('')}
    </div>
  `;
  openModal('legal-modal');
}

/* ==========================================================================
   CLIENT-SIDE FORM VALIDATION HELPER
   ========================================================================== */

function handleDemoFormSubmit(form, feedbackId, buildSuccessText) {
  const feedbackEl = document.getElementById(feedbackId);
  if (!feedbackEl) return;

  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailValid) {
    feedbackEl.hidden = false;
    feedbackEl.className = 'form-feedback error';
    feedbackEl.textContent =
      'Please enter your name and a valid email address so we can demonstrate the confirmation flow.';
    return;
  }

  feedbackEl.hidden = false;
  feedbackEl.className = 'form-feedback success';
  feedbackEl.textContent = buildSuccessText({
    name,
    email,
    topic: String(formData.get('topic') || ''),
    suburb: String(formData.get('suburb') || '')
  });
  form.reset();
}

/* ==========================================================================
   EVENT LISTENERS & INTERACTION WIRING
   ========================================================================== */

function syncFilterControlsUI() {
  const loc = document.getElementById('filter-location');
  const cat = document.getElementById('filter-category');
  const beds = document.getElementById('filter-bedrooms');
  const sort = document.getElementById('filter-sort');

  if (loc) loc.value = state.filters.location;
  if (cat) cat.value = state.filters.category;
  if (beds) beds.value = String(state.filters.bedrooms);
  if (sort) sort.value = state.filters.sort;

  renderFilterPriceOptions();
}

function resetAllFilters() {
  state.filters = {
    mode: 'all',
    savedOnly: false,
    location: 'all',
    category: 'all',
    minPrice: 0,
    maxPrice: Infinity,
    bedrooms: 0,
    sort: 'featured'
  };
  syncFilterControlsUI();
  renderProperties();
}

function wireEvents() {
  // Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
    mobileDrawer.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Hero Buy / Rent segmented tabs
  document.querySelectorAll('[data-hero-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-hero-mode') || 'buy';
      state.heroMode = mode;
      document.querySelectorAll('[data-hero-mode]').forEach((b) => {
        const active = b.getAttribute('data-hero-mode') === mode;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      renderHeroPriceOptions();
    });
  });

  // Hero Search submission -> syncs to Discovery Filters & scrolls smoothly
  const heroForm = document.getElementById('hero-search-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loc = document.getElementById('hero-location')?.value || 'all';
      const cat = document.getElementById('hero-category')?.value || 'all';
      const priceIdx = Number(document.getElementById('hero-price')?.value || 0);
      const beds = Number(document.getElementById('hero-bedrooms')?.value || 0);

      const bracketList = PRICE_BRACKETS[state.heroMode] || PRICE_BRACKETS.buy;
      const bracket = bracketList[priceIdx] || { min: 0, max: Infinity };

      state.filters.mode = bracket.mode || state.heroMode;
      state.filters.savedOnly = false;
      state.filters.location = loc;
      state.filters.category = cat;
      state.filters.minPrice = bracket.min;
      state.filters.maxPrice = bracket.max;
      state.filters.bedrooms = beds;

      syncFilterControlsUI();
      renderProperties();

      document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Discovery Toolbar Mode Tabs
  document.querySelectorAll('[data-filter-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const newMode = btn.getAttribute('data-filter-mode') || 'all';
      state.filters.mode = newMode;
      state.filters.minPrice = 0;
      state.filters.maxPrice = Infinity;
      renderFilterPriceOptions();
      renderProperties();
    });
  });

  // Saved Favorites Filter Button
  document.getElementById('filter-saved-btn')?.addEventListener('click', () => {
    state.filters.savedOnly = !state.filters.savedOnly;
    renderProperties();
  });

  // Dropdown Filters
  document.getElementById('filter-location')?.addEventListener('change', (e) => {
    state.filters.location = e.target.value;
    renderProperties();
  });

  document.getElementById('filter-category')?.addEventListener('change', (e) => {
    state.filters.category = e.target.value;
    renderProperties();
  });

  document.getElementById('filter-min-price')?.addEventListener('change', (e) => {
    state.filters.minPrice = Number(e.target.value);
    renderProperties();
  });

  document.getElementById('filter-max-price')?.addEventListener('change', (e) => {
    state.filters.maxPrice = e.target.value === 'Infinity' ? Infinity : Number(e.target.value);
    renderProperties();
  });

  document.getElementById('filter-bedrooms')?.addEventListener('change', (e) => {
    state.filters.bedrooms = Number(e.target.value);
    renderProperties();
  });

  document.getElementById('filter-sort')?.addEventListener('change', (e) => {
    state.filters.sort = e.target.value;
    renderProperties();
  });

  document.getElementById('reset-filters-btn')?.addEventListener('click', resetAllFilters);
  document.getElementById('empty-reset-btn')?.addEventListener('click', resetAllFilters);

  // Delegated Clicks (Cards, Modals, Neighborhoods, Footer quick-filters)
  document.addEventListener('click', (e) => {
    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) {
      // Backdrop click closes modal
      if (e.target.classList.contains('modal-backdrop')) {
        closeAllModals();
      }
      return;
    }

    const action = actionEl.getAttribute('data-action');

    if (action === 'toggle-fav') {
      const id = actionEl.getAttribute('data-id');
      if (!id) return;
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
      } else {
        state.favorites.add(id);
      }
      saveFavorites();
      renderProperties();
      if (state.activePropertyId === id && !document.getElementById('property-detail-modal')?.hidden) {
        const activeProp = PROPERTIES.find((p) => p.id === id);
        if (activeProp) renderPropertyDetailModal(activeProp);
      }
    } else if (action === 'open-detail') {
      const id = actionEl.getAttribute('data-id');
      if (id) {
        closeAllModals();
        openPropertyDetail(id);
      }
    } else if (action === 'toggle-compare') {
      const id = actionEl.getAttribute('data-id');
      if (!id) return;
      const idx = state.compareIds.indexOf(id);
      if (idx >= 0) {
        state.compareIds.splice(idx, 1);
      } else {
        if (state.compareIds.length >= 3) {
          state.compareIds.shift();
        }
        state.compareIds.push(id);
      }
      updateCompareTray();
      renderProperties();
    } else if (action === 'open-compare') {
      openComparisonModal();
    } else if (action === 'clear-compare') {
      state.compareIds = [];
      updateCompareTray();
      renderProperties();
    } else if (action === 'switch-gallery') {
      const idx = Number(actionEl.getAttribute('data-index') || 0);
      state.activeGalleryIndex = idx;
      const prop = PROPERTIES.find((p) => p.id === state.activePropertyId);
      if (prop) renderPropertyDetailModal(prop);
    } else if (action === 'detail-tab') {
      const tab = actionEl.getAttribute('data-tab') || 'viewing';
      state.detailInquiryTab = tab;
      const prop = PROPERTIES.find((p) => p.id === state.activePropertyId);
      if (prop) renderPropertyDetailModal(prop);
    } else if (action === 'explore-area') {
      const suburb = actionEl.getAttribute('data-suburb') || 'all';
      resetAllFilters();
      state.filters.location = suburb;
      syncFilterControlsUI();
      renderProperties();
      document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'quick-category') {
      const category = actionEl.getAttribute('data-category') || 'all';
      resetAllFilters();
      state.filters.category = category;
      syncFilterControlsUI();
      renderProperties();
      document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'quick-mode') {
      const mode = actionEl.getAttribute('data-mode') || 'all';
      resetAllFilters();
      state.filters.mode = mode;
      syncFilterControlsUI();
      renderProperties();
      document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'open-appraisal-modal') {
      openModal('appraisal-modal');
    } else if (action === 'open-legal') {
      const docKey = actionEl.getAttribute('data-doc');
      if (docKey) openLegalModal(docKey);
    } else if (action === 'close-modal') {
      closeAllModals();
    }
  });

  // Escape key closes open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // List Your Property / Talk to Our Team Modal Form
  const appraisalForm = document.getElementById('appraisal-form');
  if (appraisalForm) {
    appraisalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleDemoFormSubmit(appraisalForm, 'appraisal-feedback', (data) => {
        return `Thank you, ${data.name}. Your demonstration property presentation inquiry for ${data.suburb || 'Melbourne'} has been validated locally. No data was sent externally.`;
      });
    });
  }

  // Contact Section Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleDemoFormSubmit(contactForm, 'contact-feedback', (data) => {
        return `Message confirmed for ${data.name} (${data.email}). Because Nestora Property Co. is a frontend portfolio showcase, this submission was handled strictly inside your browser.`;
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  hydrateStaticSections();
  renderProperties();
  updateCompareTray();
  wireEvents();
});
