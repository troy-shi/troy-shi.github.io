/* =========================================================
   全站共用脚本：从 data/*.json 读取内容并渲染页面。
   内容请在 Pages CMS 编辑器里修改（https://app.pagescms.org），
   一般不需要改这个文件。
   ========================================================= */

const PAGES = [
  { id: 'about',      href: 'index.html',      label: { zh: '关于我',   en: 'About' } },
  { id: 'education',  href: 'education.html',  label: { zh: '学历',     en: 'Education' } },
  { id: 'projects',   href: 'projects.html',   label: { zh: '个人项目', en: 'Projects' } },
  { id: 'internship', href: 'internship.html', label: { zh: '实习',     en: 'Internships' } },
];

const LANGS = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
];

const ICONS = {
  pin:      '<path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>',
  mail:     '<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>',
  github:   '<path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/>',
  linkedin: '<path d="M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2zM8 19H5V9h3v10zM6.5 7.7a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5zM19 19h-3v-4.9c0-1.2 0-2.7-1.6-2.7S12.5 12.6 12.5 14v5h-3V9h2.9v1.4c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19z"/>',
  cv:       '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 13h8v2H8v-2zm0 4h8v2H8v-2z"/>',
};

/* ---------- 小工具 ---------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const has = v => v != null && String(v).trim() !== '';
// 双语文本：某一种语言没填时，用另一种语言代替
const t = (zh, en) => {
  zh = has(zh) ? zh : en; en = has(en) ? en : zh;
  return `<span class="zh">${zh ?? ''}</span><span class="en">${en ?? ''}</span>`;
};
const tx = (zh, en) => t(esc(zh), esc(en));
// 多段文字：空行分段，单个换行保留
const paras = s => esc(s).split(/\n\s*\n/).filter(p => p.trim()).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
const txp = (zh, en, cls = '') => {
  if (!has(zh) && !has(en)) return '';
  zh = has(zh) ? zh : en; en = has(en) ? en : zh;
  return `<div class="zh ${cls}">${paras(zh)}</div><div class="en ${cls}">${paras(en)}</div>`;
};
const svg = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
const placeholder = (zh, en) => `<div class="placeholder">${tx('待填写：' + zh, 'Coming soon: ' + en)}</div>`;
const url = u => /^(https?:|mailto:|\/|#)/.test(u) ? u : 'https://' + u;

async function load(name, fallback) {
  try {
    const r = await fetch(`data/${name}.json`, { cache: 'no-cache' });
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch (e) {
    console.warn('无法读取 data/' + name + '.json', e);
    return fallback;
  }
}

const root = document.documentElement;
const currentPage = document.body.dataset.page;

/* ---------- 顶部导航 + 左侧栏 ---------- */
function renderChrome(P) {
  const nameZh = P.name_zh || P.name_en || '', nameEn = P.name_en || P.name_zh || '';
  document.getElementById('topbar').outerHTML = `
<header class="topbar">
  <div class="topbar-inner">
    <a class="brand" href="index.html">${tx(nameZh + ' ' + nameEn, nameEn + ' · ' + nameZh)}</a>
    <nav class="nav">
      ${PAGES.map(p => `<a href="${p.href}"${p.id === currentPage ? ' class="active" aria-current="page"' : ''}>${tx(p.label.zh, p.label.en)}</a>`).join('')}
    </nav>
    <div class="tools">
      <div class="lang">
        <button class="lang-btn" id="langBtn" aria-haspopup="true" aria-expanded="false" aria-label="Language / 语言">
          🌐 <span id="langCurrent"></span> <span class="caret">▾</span>
        </button>
        <div class="lang-menu" id="langMenu" role="menu" hidden>
          ${LANGS.map(l => `<button role="menuitemradio" data-lang="${l.code}">${l.label}<span class="check">✓</span></button>`).join('')}
        </div>
      </div>
      <button class="theme-btn" id="themeBtn" aria-label="Toggle dark mode / 切换深浅色">◐</button>
    </div>
  </div>
</header>`;

  const links = [];
  if (has(P.city_zh) || has(P.city_en)) links.push(`<li>${svg('pin')}<span>${tx(P.city_zh, P.city_en)}</span></li>`);
  if (has(P.email))    links.push(`<li>${svg('mail')}<a href="mailto:${esc(P.email)}">Email</a></li>`);
  if (has(P.github))   links.push(`<li>${svg('github')}<a href="${esc(url(P.github))}">GitHub</a></li>`);
  if (has(P.linkedin)) links.push(`<li>${svg('linkedin')}<a href="${esc(url(P.linkedin))}">LinkedIn</a></li>`);
  if (has(P.cv))       links.push(`<li>${svg('cv')}<a href="${esc(P.cv)}">${tx('简历 (PDF)', 'CV (PDF)')}</a></li>`);

  document.getElementById('sidebar').outerHTML = `
<aside class="sidebar">
  ${has(P.avatar)
    ? `<img class="avatar" src="${esc(P.avatar)}" alt="${esc(nameZh)} ${esc(nameEn)}">`
    : `<div class="avatar-fallback" aria-hidden="true">${tx(nameZh.slice(0, 1), nameEn.slice(0, 1))}</div>`}
  <h1>${tx(nameZh, nameEn)}</h1>
  <p class="en-name">${tx(nameEn, nameZh)}</p>
  ${has(P.role_zh) || has(P.role_en) ? `<p class="role">${tx(P.role_zh, P.role_en)}</p>` : ''}
  ${links.length ? `<ul class="links">${links.join('')}</ul>` : ''}
</aside>`;

  const footer = document.getElementById('footer');
  if (footer) footer.innerHTML = `© ${new Date().getFullYear()} ${tx(nameZh + ' ' + nameEn + ' · 托管于 GitHub Pages', nameEn + ' (' + nameZh + ') · Hosted on GitHub Pages')}`;
}

/* ---------- 各页面内容 ---------- */
const RENDER = {
  async about() {
    const d = await load('about', {});
    return txp(d.about_zh, d.about_en) || placeholder('个人介绍', 'About me');
  },
  async education() {
    const items = (await load('education', {})).items || [];
    if (!items.length) return placeholder('教育经历', 'Education');
    return items.map(e => `
      <div class="entry">
        <h3>${tx(e.school_zh, e.school_en)}</h3>
        <span class="when">${esc(e.period)}</span>
        ${has(e.degree_zh) || has(e.degree_en) ? `<span class="sub">${tx(e.degree_zh, e.degree_en)}</span>` : ''}
        ${txp(e.details_zh, e.details_en, 'desc')}
      </div>`).join('');
  },
  async projects() {
    const items = (await load('projects', {})).items || [];
    if (!items.length) return placeholder('个人项目', 'Projects');
    return `<div class="cards">${items.map(p => {
      const title = tx(p.name_zh, p.name_en);
      const tags = (p.tags || []).filter(has);
      return `
      <div class="card">
        <h3>${has(p.link) ? `<a href="${esc(url(p.link))}">${title}</a>` : title}</h3>
        ${txp(p.desc_zh, p.desc_en, 'card-desc')}
        ${tags.length ? `<div class="tags">${tags.map(g => `<span class="tag">${esc(g)}</span>`).join('')}</div>` : ''}
      </div>`;
    }).join('')}</div>`;
  },
  async internship() {
    const items = (await load('internship', {})).items || [];
    if (!items.length) return placeholder('实习经历', 'Internships');
    return items.map(i => {
      const head = [t(esc(i.company_zh), esc(i.company_en)), (has(i.role_zh) || has(i.role_en)) ? tx(i.role_zh, i.role_en) : ''].filter(Boolean).join(' · ');
      return `
      <div class="entry">
        <h3>${head}</h3>
        <span class="when">${esc(i.period)}</span>
        ${has(i.team_zh) || has(i.team_en) ? `<span class="sub">${tx(i.team_zh, i.team_en)}</span>` : ''}
        ${txp(i.desc_zh, i.desc_en, 'desc')}
      </div>`;
    }).join('');
  },
};

/* ---------- 语言菜单 ---------- */
function initLang() {
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');
  const pageTitle = document.body.dataset.title ? JSON.parse(document.body.dataset.title) : null;

  function setLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.getElementById('langCurrent').textContent = LANGS.find(l => l.code === lang).label;
    langMenu.querySelectorAll('button').forEach(b => b.setAttribute('aria-checked', b.dataset.lang === lang));
    if (pageTitle) document.title = pageTitle[lang];
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  function openMenu(open) {
    langMenu.hidden = !open;
    langBtn.setAttribute('aria-expanded', open);
    if (open) langMenu.querySelector('[aria-checked="true"]')?.focus();
  }
  langBtn.addEventListener('click', e => { e.stopPropagation(); openMenu(langMenu.hidden); });
  langMenu.addEventListener('click', e => {
    const b = e.target.closest('button[data-lang]');
    if (!b) return;
    setLang(b.dataset.lang);
    openMenu(false);
    langBtn.focus();
  });
  document.addEventListener('click', e => { if (!e.target.closest('.lang')) openMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !langMenu.hidden) { openMenu(false); langBtn.focus(); } });
  setLang(root.dataset.lang || 'zh');
}

/* ---------- 深浅色 ---------- */
function initTheme() {
  document.getElementById('themeBtn').addEventListener('click', () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });
}

/* ---------- 启动 ---------- */
(async () => {
  const [profile, content] = await Promise.all([
    load('profile', {}),
    RENDER[currentPage] ? RENDER[currentPage]() : Promise.resolve(''),
  ]);
  renderChrome(profile);
  initLang();
  initTheme();
  document.getElementById('content').innerHTML = content;
})();
