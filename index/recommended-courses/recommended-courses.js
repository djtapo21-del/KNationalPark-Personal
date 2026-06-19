// ─────────────────────────────────────────────
// 추천 코스 슬라이더
// 화살표 버튼 + 드래그/터치 스와이프로 슬라이드 전환
// ─────────────────────────────────────────────
function initCourseSlider() {
    const track = document.getElementById('course-list');
    const prevBtn = document.querySelector('.carousel-btn--prev');
    const nextBtn = document.querySelector('.carousel-btn--next');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!track || !prevBtn || !nextBtn) return;

    const slides = track.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    const totalSlides = slides.length;

    // 드래그 및 터치 관련 상태 변수
    let isDragging = false;
    let startX = 0;
    let diffX = 0;

    const SLIDE_GAP = 20;

    function getSlideWidth() {
        return track.parentElement.clientWidth;
    }

    function slideTo(index) {
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        const slideWidth = getSlideWidth();
        const offset = currentIndex * (slideWidth + SLIDE_GAP);
        track.style.transform = `translateX(-${offset}px)`;
        updateButtons();
        updateDots();
    }

    function updateButtons() {
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= totalSlides - 1;
    }

    function updateDots() {
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    // 드래그/터치 핸들러
    function dragStart(e) {
        isDragging = true;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        diffX = 0;
        track.style.transition = 'none';
    }

    function dragMove(e) {
        if (!isDragging) return;
        const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        diffX = currentX - startX;

        let nextTranslate = -currentIndex * getSlideWidth() + diffX;

        // 끝 경계선 저항 처리 (고무줄 효과)
        if (currentIndex === 0 && diffX > 0) {
            nextTranslate = diffX * 0.3;
        } else if (currentIndex === totalSlides - 1 && diffX < 0) {
            nextTranslate = -currentIndex * getSlideWidth() + diffX * 0.3;
        }

        track.style.transform = `translateX(${nextTranslate}px)`;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;

        const threshold = 50;

        if (Math.abs(diffX) > 10 && e.cancelable) {
            e.preventDefault();
        }

        if (diffX < -threshold && currentIndex < totalSlides - 1) {
            slideTo(currentIndex + 1);
        } else if (diffX > threshold && currentIndex > 0) {
            slideTo(currentIndex - 1);
        } else {
            slideTo(currentIndex);
        }

        diffX = 0;
    }

    // PC 버튼 클릭
    prevBtn.addEventListener('click', () => slideTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => slideTo(currentIndex + 1));

    // Dot 클릭 전환
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.dataset.index, 10);
            if (!isNaN(idx)) slideTo(idx);
        });
    });

    // 이벤트 등록
    track.addEventListener('mousedown', dragStart);
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', dragEnd);

    track.addEventListener('touchstart', dragStart, { passive: true });
    track.addEventListener('touchmove', dragMove, { passive: true });
    track.addEventListener('touchend', dragEnd);

    // 리사이즈 대응
    window.addEventListener('resize', debounce(() => {
        slideTo(currentIndex);
    }, 100), { passive: true });

    // 초기화
    slideTo(0);
}