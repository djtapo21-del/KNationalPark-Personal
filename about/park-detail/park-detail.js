// 시/도 목록 추출
const sidoList = [...new Set(parkData.map(p => p.sido))];

// 시/군/구 목록 추출
function getSigunguList(sido) {
    return [...new Set(parkData.filter(p => !sido || p.sido === sido).map(p => p.sigungu))];
}

// 우측 상세 정보 데이터 매핑 함수 (HTML 하드코딩 없음)
window.renderParkInfo = function (park, container) {
    const statusText = { '': '정상', 'partial': '부분통제', 'closed': '전면통제' };

    const emptyEl = document.getElementById('park-info-empty');
    const detailEl = document.getElementById('park-info-detail');
    if (!emptyEl || !detailEl) return;

    // 1. 상태 분기 스위칭
    emptyEl.style.display = 'none';
    detailEl.classList.remove('pi-detail-content--hidden');

    // 2. 기본 정보 바인딩
    const nameEl = document.getElementById('pi-val-name');
    const statusEl = document.getElementById('pi-val-status');
    const addressEl = document.getElementById('pi-val-address');
    const descEl = document.getElementById('pi-val-desc');

    if (nameEl) nameEl.textContent = park.name;
    if (addressEl) addressEl.textContent = park.address;
    if (descEl) descEl.textContent = park.desc;

    // 3. 통제 뱃지 상태 업데이트
    if (statusEl) {
        statusEl.textContent = statusText[park.status] || '정상';
        statusEl.className = 'pi-status';
        statusEl.classList.add(`pi-status--${park.status || 'normal'}`);
    }

    // 4. 고정 코스명 매핑 (산/공원 이름 접두사 일절 미포함)
    const courseName1 = document.getElementById('pi-course-name-1');
    const courseName2 = document.getElementById('pi-course-name-2');
    const courseName3 = document.getElementById('pi-course-name-3');

    const courseRoute1 = document.getElementById('pi-course-route-1');
    const courseRoute2 = document.getElementById('pi-course-route-2');
    const courseRoute3 = document.getElementById('pi-course-route-3');

    if (courseName1) courseName1.textContent = '둘레길 안성맞춤 순환로';
    if (courseName2) courseName2.textContent = '자연 경관 탐방 코스';
    if (courseName3) courseName3.textContent = '능선 정복 탐방로';

    if (courseRoute1) courseRoute1.textContent = '출발지점 → 비룡폭포';
    if (courseRoute2) courseRoute2.textContent = '사찰입구 → 마당바위';
    if (courseRoute3) courseRoute3.textContent = '대피소 → 최고정상';

    // 5. 날씨 슬롯 업데이트
    const today = new Date();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const weatherDays = document.querySelectorAll('#pi-weather-grid .pi-weather__day');

    const amIcons = ['☀️', '🌤️', '☁️', '🌧️', '☀️', '🌤️', '☀️'];
    const pmIcons = ['🌤️', '☁️', '🌧️', '🌤️', '☀️', '☀️', '☁️'];

    weatherDays.forEach((dayNode, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);

        const dayNameText = `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}(${dayNames[d.getDay()]})`;

        let amTempText = '-';
        let pmTempText = '-';

        if (park.weekly && park.weekly[i]) {
            const baseTemp = parseInt(park.weekly[i], 10);
            amTempText = `${baseTemp - 3}°C`;
            pmTempText = `${baseTemp + 1}°C`;
        }

        const amIcon = amIcons[i % amIcons.length];
        const pmIcon = pmIcons[i % pmIcons.length];

        const dayNameEl = dayNode.querySelector('.pi-weather__day-name');

        const amIconEl = dayNode.querySelector('.pi-weather__ampm--am .pi-weather__ampm-icon');
        const amTempEl = dayNode.querySelector('.pi-weather__ampm--am .pi-weather__ampm-temp');

        const pmIconEl = dayNode.querySelector('.pi-weather__ampm--pm .pi-weather__ampm-icon');
        const pmTempEl = dayNode.querySelector('.pi-weather__ampm--pm .pi-weather__ampm-temp');

        if (dayNameEl) dayNameEl.textContent = dayNameText;

        if (amIconEl) amIconEl.textContent = amIcon;
        if (amTempEl) amTempEl.textContent = amTempText;

        if (pmIconEl) pmIconEl.textContent = pmIcon;
        if (pmTempEl) pmTempEl.textContent = pmTempText;
    });
};

// 단일 선택 바인딩 API
window.selectPark = function (parkId) {
    const park = parkData.find(p => p.id === parkId);
    if (!park) return;

    const event = new CustomEvent('parkSelected', { detail: { parkId: park.id } });
    document.dispatchEvent(event);

    const infoContainer = document.getElementById('park-info-content');
    if (!infoContainer) return;
    renderParkInfo(park, infoContainer);
};

// 통합 초기화 컨트롤러 (about.js 로더가 실행)
function initParkDetail() {
    const sidoSelect = document.getElementById('rs-sido');
    const sigunguSelect = document.getElementById('rs-sigungu');
    const parkList = document.getElementById('rs-park-list');
    const mapArea = document.querySelector('.rs-map-area');

    if (!sidoSelect || !sigunguSelect || !parkList || !mapArea) return;

    // 드롭다운 바인딩
    sidoSelect.innerHTML = '<option value="">전체 시/도</option>';
    sidoList.forEach(sido => {
        const opt = document.createElement('option');
        opt.value = sido;
        opt.textContent = sido;
        sidoSelect.appendChild(opt);
    });

    let markers = [];
    let currentActiveId = null;

    function renderMarkers() {
        markers.forEach(m => m.remove());
        markers = [];

        const mapGuide = mapArea.querySelector('.rs-map-guide');

        parkData.forEach((park) => {
            const label = document.createElement('button');
            label.className = 'rs-park-marker';
            label.dataset.parkId = park.id;
            if (park.status) label.dataset.status = park.status;
            label.textContent = park.name;

            if (mapGuide) {
                mapArea.insertBefore(label, mapGuide);
            } else {
                mapArea.appendChild(label);
            }

            label.addEventListener('click', () => {
                window.selectPark(park.id);
            });

            markers.push(label);
        });
    }

    function updateMarkerActive(parkId) {
        markers.forEach(m => {
            m.classList.toggle('rs-park-marker--active', m.dataset.parkId === parkId);
        });
    }

    function renderParkList(sido, sigungu) {
        const filtered = parkData.filter(p => {
            if (sido && p.sido !== sido) return false;
            if (sigungu && p.sigungu !== sigungu) return false;
            return true;
        });

        parkList.innerHTML = '';

        if (filtered.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'rs-list-empty';
            empty.textContent = '해당 지역에 국립공원이 없습니다.';
            parkList.appendChild(empty);
            return;
        }

        filtered.forEach(park => {
            const item = document.createElement('button');
            item.className = 'rs-list-item';
            if (park.id === currentActiveId) {
                item.classList.add('rs-list-item--active');
            }
            item.textContent = park.name;
            item.dataset.parkId = park.id;
            item.addEventListener('click', () => {
                window.selectPark(park.id);
            });
            parkList.appendChild(item);
        });
    }

    function onFilterChange() {
        const sido = sidoSelect.value;
        const currentSigungu = sigunguSelect.value;

        sigunguSelect.innerHTML = '<option value="">전체 시/군/구</option>';
        const sigunguList = getSigunguList(sido);
        sigunguList.forEach(sg => {
            const opt = document.createElement('option');
            opt.value = sg;
            opt.textContent = sg;
            sigunguSelect.appendChild(opt);
        });

        if (currentSigungu && sigunguList.includes(currentSigungu)) {
            sigunguSelect.value = currentSigungu;
        }

        renderParkList(sidoSelect.value, sigunguSelect.value);
    }

    sidoSelect.addEventListener('change', onFilterChange);
    sigunguSelect.addEventListener('change', onFilterChange);

    // 이벤트 리스너 정의
    document.addEventListener('parkSelected', (e) => {
        const parkId = e.detail.parkId;
        const park = parkData.find(p => p.id === parkId);
        if (!park) return;

        currentActiveId = parkId;
        sidoSelect.value = park.sido;

        const sgList = getSigunguList(park.sido);
        sigunguSelect.innerHTML = '<option value="">전체 시/군/구</option>';
        sgList.forEach(sg => {
            const opt = document.createElement('option');
            opt.value = sg;
            opt.textContent = sg;
            sigunguSelect.appendChild(opt);
        });
        sigunguSelect.value = park.sigungu;

        renderParkList(park.sido, park.sigungu);
        updateMarkerActive(parkId);
    });

    renderMarkers();
    renderParkList('', '');

    // [PC 드래그 & 휠 스크롤 전용 기능 추가]
    const weatherGrid = document.getElementById('pi-weather-grid');
    if (weatherGrid) {
        initDesktopDragAndWheelScroll(weatherGrid);
    }
}

// PC 환경용 가로 드래그 및 마우스 휠 리다이렉트 제어 함수 (보완 적용 완료)
function initDesktopDragAndWheelScroll(slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.style.cursor = 'grab';

    // 1. 드래그 중 이미지 움직임 및 글자 블록 지정을 원천적으로 차단
    slider.addEventListener('dragstart', (e) => e.preventDefault());
    slider.addEventListener('selectstart', (e) => e.preventDefault());

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';

        // [중요] 마우스 다운 시 브라우저 기본 동작(드래그 블록지정) 차단
        e.preventDefault();

        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    // 2. [수정] 감지 대상을 document로 확대하여, 박스 영역을 완전히 이탈한 시점에서도 마우스 풀림 상태를 완벽 검출
    document.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // 스크롤 감도 계수
        slider.scrollLeft = scrollLeft - walk;
    });

    // 3. 수직 마우스 휠 동작을 수평 스크롤로 리다이렉트하는 로직
    slider.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            slider.scrollLeft += e.deltaY;
        }
    }, { passive: false });
}