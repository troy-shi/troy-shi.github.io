/* =========================================================
   全站共用：顶部导航 + 左侧个人信息栏 + 语言菜单 + 深浅色
   ✏️ 改名字、链接、导航，只需要改下面 PROFILE 和 PAGES 两处
   ========================================================= */

const PROFILE = {
  name:    { zh: '史张倬悦', en: 'Troy' },
  subName: { zh: 'Troy',     en: '史张倬悦' },
  initial: { zh: '史',       en: 'T' },
  avatar:  '',                       // ✏️ 有照片后填 'assets/avatar.jpg'
  role:    { zh: '身份 / 学校', en: 'Title / School' },
  city:    { zh: '所在城市',   en: 'City' },
  links: [                           // ✏️ 换成真实地址
    { icon: 'mail',   href: 'mailto:you@example.com',        label: { zh: 'Email', en: 'Email' } },
    { icon: 'github', href: 'https://github.com/your-username', label: { zh: 'GitHub', en: 'GitHub' } },
    { icon: 'cv',     href: 'cv.pdf',                        label: { zh: '简历 (PDF)', en: 'CV (PDF)' } },
  ],
};

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

/* ---------------- 以下一般不用改 ---------------- */

const ICONS = {
  pin:    '<path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>',
  mail:   '<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>',
  github: '<path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/>',
  cv:     '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 13h8v2H8v-2zm0 4h8v2H8v-2z"/>',
};

const t = obj => `<span class="zh">${obj.zh}</span><span class="en">${obj.en}</span>`;
const svg = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
const root = document.documentElement;
const currentPage = document.body.dataset.page;

/* ---------- 顶部导航 ---------- */
document.getElementById('topbar').outerHTML = `
<header class="topbar">
  <div class="topbar-inner">
    <a class="brand" href="index.html">${t({ zh: PROFILE.name.zh + ' ' + PROFILE.name.en, en: PROFILE.name.en + ' · ' + PROFILE.name.zh })}</a>
    <nav class="nav">
      ${PAGES.map(p => `<a href="${p.href}"${p.id === currentPage ? ' class="active" aria-current="page"' : ''}>${t(p.label)}</a>`).join('')}
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

/* ---------- 左侧个人信息栏 ---------- */
document.getElementById('sidebar').outerHTML = `
<aside class="sidebar">
  ${PROFILE.avatar
    ? `<img class="avatar" src="${PROFILE.avatar}" alt="${PROFILE.name.zh} ${PROFILE.name.en}">`
    : `<div class="avatar-fallback" aria-hidden="true">${t(PROFILE.initial)}</div>`}
  <h1>${t(PROFILE.name)}</h1>
  <p class="en-name">${t(PROFILE.subName)}</p>
  <p class="role">${t(PROFILE.role)}</p>
  <ul class="links">
    <li>${svg('pin')}<span>${t(PROFILE.city)}</span></li>
    ${PROFILE.links.map(l => `<li>${svg(l.icon)}<a href="${l.href}">${t(l.label)}</a></li>`).join('')}
  </ul>
</aside>`;

/* ---------- 页脚年份 ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- 语言菜单 ---------- */
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

/* ---------- 深浅色 ---------- */
document.getElementById('themeBtn').addEventListener('click', () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});
