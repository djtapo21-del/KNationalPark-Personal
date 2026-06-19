// index 페이지 컴포넌트 로더
const COMPONENT_ERROR_HTML = '<p class="component-load-error" role="alert">콘텐츠를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>';

const components = [
    { id: 'header-placeholder',              url: './common/header/header.html',           init: 'initHeader' },
    { id: 'footer-placeholder',              url: './common/footer/footer.html',           init: 'initFooter' },
    { id: 'main-banner-placeholder',         url: './index/main-banner/main-banner.html' },
    { id: 'map-placeholder',                 url: './index/map-content/map-content.html',        init: 'initMap' },
    { id: 'recommended-courses-placeholder', url: './index/recommended-courses/recommended-courses.html', init: 'initCourseSlider' },
    { id: 'recommended-parks-placeholder',   url: './index/recommended-parks/recommended-parks.html',   init: 'initParkVideos' },
    { id: 'quick-menu-placeholder',          url: './index/quick-menu/quick-menu.html' },
    { id: 'notice-placeholder',              url: './index/notice/notice.html',                  init: 'initNoticeTabs' },
    { id: 'notice-banner-placeholder',       url: './index/notice-banner/notice-banner.html' },
    { id: 'ur-placeholder',                  url: './index/ur/ur.html',                          init: 'initUR' },
];

document.addEventListener('DOMContentLoaded', async () => {
    await loadSvgSprite();
    await loadComponents();
    initGlobalClickHandler();
});

async function loadSvgSprite() {
    try {
        const response = await fetch('./common/svg-sprite/svg-sprite.html');
        if (!response.ok) throw new Error('svg-sprite load failed');
        const wrapper = document.createElement('div');
        wrapper.style.position = 'absolute';
        wrapper.style.width = '0';
        wrapper.style.height = '0';
        wrapper.style.overflow = 'hidden';
        wrapper.innerHTML = await response.text();
        document.body.prepend(wrapper);
    } catch (e) { console.error('[svg-sprite]', e); }
}

function loadComponents() {
    return Promise.allSettled(
        components.filter(({ id }) => document.getElementById(id)).map(loadComponent)
    );
}

async function loadComponent({ id, url, init }) {
    const el = document.getElementById(id);
    try {
        const r = await fetch(url);
        if (!r.ok) throw new Error('load failed');
        el.innerHTML = await r.text();
        if (typeof init === 'string' && typeof window[init] === 'function') window[init]();
    } catch (e) {
        console.error('[component]', id, e);
        el.innerHTML = COMPONENT_ERROR_HTML;
    }
}

function initGlobalClickHandler() {
    const hasGnb = !!document.querySelector('.gnb');
    const hasFamily = !!document.querySelector('.family-site-wrap');
    if (!hasGnb && !hasFamily) return;
    document.addEventListener('click', (e) => {
        if (hasGnb && !e.target.closest('.gnb > li')) {
            document.querySelectorAll('.gnb > li.active').forEach((item) => {
                item.classList.remove('active');
                item.querySelector('.sub-menu')?.style.removeProperty('--submenu-top');
            });
        }
        if (hasFamily && !e.target.closest('.family-site-wrap')) {
            document.querySelectorAll('.family-site-list--open').forEach((l) => l.classList.remove('family-site-list--open'));
            document.querySelectorAll('.family-site-btn--open').forEach((b) => b.classList.remove('family-site-btn--open'));
        }
    });
}

function debounce(fn, delay) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}