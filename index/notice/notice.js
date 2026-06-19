// ─────────────────────────────────────────────
// 공지사항 탭 전환
// display 조작을 CSS 클래스(.notice__list--hidden)로 위임합니다.
// ─────────────────────────────────────────────
function initNoticeTabs() {
    const tabs = document.querySelectorAll('.notice__tab');
    const lists = document.querySelectorAll('.notice__list');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            if (!target) return;

            tabs.forEach((t) => t.classList.remove('notice__tab--active'));
            tab.classList.add('notice__tab--active');

            lists.forEach((list) => {
                list.classList.toggle('notice__list--hidden', list.dataset.list !== target);
            });
        });
    });
}