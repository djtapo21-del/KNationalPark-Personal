// ─────────────────────────────────────────────
// 통합예약(UR) 초기화
// ─────────────────────────────────────────────
function initUR() {
    // 시설 선택 클릭 스타일 — 활성 제거용 핸들 셋을 1회만 조회합니다.
    const facItems = document.querySelectorAll('.ur__facility-item');
    facItems.forEach((btn) => {
        btn.addEventListener('click', () => {
            facItems.forEach((b) => b.classList.remove('ur__facility-item--active'));
            btn.classList.add('ur__facility-item--active');
        });
    });

    // 지역 선택 클릭 스타일 — 활성 제거용 핸들 셋을 1회만 조회합니다.
    const parkItems = document.querySelectorAll('.ur__park');
    parkItems.forEach((btn) => {
        btn.addEventListener('click', () => {
            parkItems.forEach((b) => b.classList.remove('ur__park--active'));
            btn.classList.add('ur__park--active');
        });
    });

    // 날짜 박스 전체 클릭 시 달력 열기
    document.querySelectorAll('.ur__calendar-group').forEach(group => {
        group.addEventListener('click', function() {
            const input = this.querySelector('.ur__calendar-input');
            if (!input) return;
            try { input.showPicker?.(); } catch(e) { }
            input.focus();
            input.click();
        });
    });

    // 입실일/퇴실일 기본값 설정 및 퇴실일 min 자동 조정
    const dateIn = document.getElementById('ur-date-in');
    const dateOut = document.getElementById('ur-date-out');

    const formatDate = date => date.toISOString().slice(0, 10);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (dateIn) {
        dateIn.min = formatDate(today);
        dateIn.value = formatDate(today);
    }

    if (dateOut) {
        dateOut.min = formatDate(tomorrow);
        dateOut.value = formatDate(tomorrow);
    }

    if (dateIn) {
        dateIn.addEventListener('change', () => {
            const val = dateIn.value;
            if (val && dateOut) {
                dateOut.min = val;
                if (dateOut.value && dateOut.value < val) {
                    const nextDay = new Date(val);
                    nextDay.setDate(nextDay.getDate() + 1);
                    dateOut.value = formatDate(nextDay);
                }
            }
        });
    }

    // 인원 증감 버튼
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            const el = document.getElementById('ur-' + target);
            if (!el) return;
            let val = parseInt(el.textContent, 10);
            if (val > 0) {
                val--;
                el.textContent = val;
            }
        });
    });

    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            const el = document.getElementById('ur-' + target);
            if (!el) return;
            let val = parseInt(el.textContent, 10);
            val++;
            el.textContent = val;
        });
    });
}