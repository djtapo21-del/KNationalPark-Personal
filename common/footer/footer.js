// ─────────────────────────────────────────────
// 푸터 패밀리사이트 드롭다운 토글
// init 시 각 버튼의 list 참조를 미리 캐싱해 클릭 시 DOM 탐색을 제거합니다.
// ─────────────────────────────────────────────
function initFooter() {
    document.querySelectorAll('.family-site-btn').forEach((btn) => {
        const list = btn.parentElement?.querySelector('.family-site-list');
        if (!list) return;
        btn.addEventListener('click', () => toggleFamilySite(btn, list));
    });
}

function toggleFamilySite(btn, list) {
    const isOpen = list.classList.contains('family-site-list--open');

    // 다른 드롭다운이 열려 있으면 먼저 모두 닫습니다.
    document.querySelectorAll('.family-site-list--open').forEach((l) => l.classList.remove('family-site-list--open'));
    document.querySelectorAll('.family-site-btn--open').forEach((b) => b.classList.remove('family-site-btn--open'));

    if (!isOpen) {
        list.classList.add('family-site-list--open');
        btn.classList.add('family-site-btn--open');
    }
}