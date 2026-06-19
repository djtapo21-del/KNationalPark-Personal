// ─────────────────────────────────────────────
// 추천 국립공원 비디오 호버 재생 및 일시정지 제어
// IntersectionObserver로 뷰포트 근처에 진입한 카드만 초기화합니다.
// ─────────────────────────────────────────────
function initParkVideos() {
    const cards = document.querySelectorAll('.park-card');
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
        cards.forEach(initParkVideoCard);
        return;
    }

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            initParkVideoCard(entry.target);
            videoObserver.unobserve(entry.target);
        });
    }, { rootMargin: '200px 0px' });

    cards.forEach((card) => videoObserver.observe(card));
}

function initParkVideoCard(card) {
    const video = card.querySelector('.park-card__video');
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    card.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play().catch((error) => {
            console.log('비디오 재생 보류 (브라우저 사용자 제약):', error);
        });
    });

    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
}