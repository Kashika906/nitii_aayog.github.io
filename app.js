
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = 64; 
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveNav();
});


function highlightActiveNav() {
  const sections = ['home','categories','press','divisions','initiatives'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 80) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active-link', href === `#${current}`);
  });
}


function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));


const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


document.getElementById('divisionFilters').addEventListener('click', e => {
  const btn = e.target.closest('.pill');
  if (!btn) return;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  document.querySelectorAll('.div-card').forEach(card => {
    const show = filter === 'all' || card.dataset.cat === filter;
    card.style.display = show ? '' : 'none';
    if (show) card.classList.add('visible');
  });
});


document.getElementById('hamburger').addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const isOpen = links.classList.contains('mobile-open');
  links.classList.toggle('mobile-open', !isOpen);
});


const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const searchCat = document.querySelector('.search-cat');


const searchIndex = [
  
  { title: 'Strengthening Tribal and Rural Livelihoods through Sustainable Enterprise Development', section: 'press', tag: 'Livelihoods', el: document.querySelectorAll('.press-card')[0] },
  { title: 'Three Reports on Enhancing Circular Economy in End-of-Life Vehicles, Waste Tyres & E-waste', section: 'press', tag: 'Circular Economy', el: document.querySelectorAll('.press-card')[1] },
  { title: 'Achieving Efficiencies in MSME Sector through Convergence of Schemes', section: 'press', tag: 'MSME', el: document.querySelectorAll('.press-card')[2] },
  
  { title: 'Administration', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[0] },
  { title: 'Agriculture & Policy', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[1] },
  { title: 'Economics & Finance', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[2] },
  { title: 'Education', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[3] },
  { title: 'Energy', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[4] },
  { title: 'Health & Family', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[5] },
  { title: 'IT & Telecom', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[6] },
  { title: 'Law', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[7] },
  { title: 'Infrastructure', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[8] },
  { title: 'Sustainable Dev. Goals', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[9] },
  { title: 'Water & Land', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[10] },
  { title: 'Women & Child Dev.', section: 'divisions', tag: 'Division', el: document.querySelectorAll('.div-card')[11] },
  
  { title: 'LIFE Initiative', section: 'initiatives', tag: 'Initiative', el: document.querySelectorAll('.init-card')[0] },
  { title: 'State Support Mission', section: 'initiatives', tag: 'Initiative', el: document.querySelectorAll('.init-card')[1] },
  { title: 'Women Entrepreneurship', section: 'initiatives', tag: 'Initiative', el: document.querySelectorAll('.init-card')[2] },
  { title: 'Aspirational Districts', section: 'initiatives', tag: 'Initiative', el: document.querySelectorAll('.init-card')[3] },
  
  { title: 'Tourism & Culture', section: 'categories', tag: 'Category', el: document.querySelectorAll('.cat-card')[0] },
  { title: 'Agriculture', section: 'categories', tag: 'Category', el: document.querySelectorAll('.cat-card')[1] },
  { title: 'Energy', section: 'categories', tag: 'Category', el: document.querySelectorAll('.cat-card')[2] },
  { title: 'Industry & Investment', section: 'categories', tag: 'Category', el: document.querySelectorAll('.cat-card')[3] },
  { title: 'Cooperative Federalism', section: 'categories', tag: 'Category', el: document.querySelectorAll('.cat-card')[4] },
  { title: 'Education', section: 'categories', tag: 'Category', el: document.querySelectorAll('.cat-card')[5] },
  { title: 'Health & Welfare', section: 'categories', tag: 'Category', el: document.querySelectorAll('.cat-card')[6] },
  { title: 'IT & Telecom', section: 'categories', tag: 'Category', el: document.querySelectorAll('.cat-card')[7] },
];


const resultsBox = document.createElement('div');
resultsBox.id = 'searchResults';
resultsBox.style.cssText = `
  position:absolute; top:100%; left:0; right:0; z-index:2000;
  background:#fff; border-radius:0 0 10px 10px;
  box-shadow:0 12px 40px rgba(0,0,0,0.25);
  max-height:380px; overflow-y:auto; display:none;
`;
document.querySelector('.hero-search').style.position = 'relative';
document.querySelector('.hero-search').appendChild(resultsBox);

function runSearch() {
  const q = searchInput.value.trim().toLowerCase();
  const cat = searchCat.value;
  resultsBox.innerHTML = '';

  if (!q) { resultsBox.style.display = 'none'; return; }

  const catMap = { 'Reports': 'press', 'Schemes': 'press', 'Initiatives': 'initiatives', 'Divisions': 'divisions' };
  const filtered = searchIndex.filter(item => {
    const matchQ = item.title.toLowerCase().includes(q);
    const matchCat = cat === 'All Categories' || (catMap[cat] && item.section === catMap[cat]) || item.tag.toLowerCase().includes(cat.toLowerCase());
    return matchQ && matchCat;
  });

  if (!filtered.length) {
    resultsBox.innerHTML = `<div style="padding:1.25rem 1.5rem;color:#888;font-size:0.85rem;font-family:Inter,sans-serif">No results found for "<strong>${searchInput.value}</strong>"</div>`;
    resultsBox.style.display = 'block';
    return;
  }

  filtered.forEach(item => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:1rem;padding:0.85rem 1.25rem;cursor:pointer;border-bottom:1px solid #f0f0f0;transition:background 0.15s';
    row.innerHTML = `
      <div style="flex-shrink:0;width:32px;height:32px;border-radius:6px;background:#f0ebe4;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#e8500a;font-family:Manrope,sans-serif">${item.tag.slice(0,3).toUpperCase()}</div>
      <div style="flex:1">
        <div style="font-size:0.85rem;font-weight:600;color:#1a1a1a;font-family:Manrope,sans-serif;line-height:1.3">${item.title}</div>
        <div style="font-size:0.72rem;color:#888;margin-top:0.15rem;font-family:Inter,sans-serif;text-transform:capitalize">${item.section} · ${item.tag}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>`;
    row.addEventListener('mouseenter', () => row.style.background = '#fdf5f0');
    row.addEventListener('mouseleave', () => row.style.background = '');
    row.addEventListener('click', () => {
      resultsBox.style.display = 'none';
      searchInput.value = item.title;
      
      const target = document.getElementById(item.section);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      
      if (item.el) {
        item.el.style.transition = 'box-shadow 0.3s, border-color 0.3s';
        item.el.style.boxShadow = '0 0 0 3px rgba(232,80,10,0.4)';
        item.el.style.borderColor = '#e8500a';
        setTimeout(() => {
          item.el.style.boxShadow = '';
          item.el.style.borderColor = '';
        }, 2500);
      }
    });
    resultsBox.appendChild(row);
  });

  resultsBox.style.display = 'block';
}

searchInput.addEventListener('input', runSearch);
searchCat.addEventListener('change', runSearch);
searchBtn.addEventListener('click', runSearch);
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') runSearch(); if (e.key === 'Escape') resultsBox.style.display = 'none'; });
document.addEventListener('click', e => {
  if (!document.querySelector('.hero-search').contains(e.target)) resultsBox.style.display = 'none';
});

