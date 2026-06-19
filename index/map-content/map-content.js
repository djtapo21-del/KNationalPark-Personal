// 국립공원 정보 데이터
const parkData = [
    { id: 'seorak',   name: '설악산',   status: 'partial', sido: '강원도',   sigungu: '속초시',     address: '강원도 속초시 설악동', desc: '아름다운 암릉과 계곡이 어우러진 대표 명산.', today: '12°C 비 🌧️', tomorrow: '15°C 흐림 ☁️', weekly: ['12°C','15°C','18°C','20°C','17°C','14°C','16°C'] },
    { id: 'odae',     name: '오대산',   status: 'closed',  sido: '강원도',   sigungu: '평창군',     address: '강원도 평창군 오대산로', desc: '한국에서 가장 넓은 산악 국립공원, 깊은 숲과 고개.', today: '14°C 구름 🌤️', tomorrow: '16°C 맑음 ☀️', weekly: ['14°C','16°C','19°C','21°C','18°C','15°C','17°C'] },
    { id: 'bukhan',   name: '북한산',   status: 'partial', sido: '경기도',   sigungu: '고양시',     address: '경기도 고양시 북한산로', desc: '수도권 대표 도심 국립공원.', today: '20°C 맑음 ☀️', tomorrow: '22°C 맑음 ☀️', weekly: ['20°C','22°C','24°C','23°C','21°C','19°C','20°C'] },
    { id: 'chiak',    name: '치악산',   status: 'partial', sido: '강원도',   sigungu: '원주시',     address: '강원도 원주시 치악산로', desc: '기암괴석과 깊은 계곡의 조화.', today: '18°C 흐림 ☁️', tomorrow: '17°C 비 🌧️', weekly: ['18°C','17°C','16°C','19°C','20°C','18°C','17°C'] },
    { id: 'taebaek',  name: '태백산',   status: 'partial', sido: '강원도',   sigungu: '태백시',     address: '강원도 태백시 태백산길', desc: '높은 고도에서 만나는 광활한 설경과 하늘.', today: '15°C 맑음 ☀️', tomorrow: '14°C 구름 🌤️', weekly: ['15°C','14°C','13°C','16°C','18°C','15°C','14°C'] },
    { id: 'sobaek',   name: '소백산',   status: '',        sido: '충청북도', sigungu: '단양군',     address: '충북 단양군 소백산로', desc: '부드러운 능선과 철쭉 군락이 아름다운 산.', today: '16°C 흐름 ☁️', tomorrow: '18°C 맑음 ☀️', weekly: ['16°C','18°C','20°C','19°C','17°C','16°C','18°C'] },
    { id: 'soakri',   name: '속리산',   status: '',        sido: '충청북도', sigungu: '보은군',     address: '충북 보은군 속리산면', desc: '천년 고찰 법주사가 자리한 역사 깊은 산.', today: '17°C 맑음 ☀️', tomorrow: '19°C 구름 🌤️', weekly: ['17°C','19°C','21°C','20°C','18°C','17°C','19°C'] },
    { id: 'worak',    name: '월악산',   status: '',        sido: '충청북도', sigungu: '제천시',     address: '충북 제천시 월악산로', desc: '충주호와 어우러진 수려한 산세.', today: '19°C 구름 🌤️', tomorrow: '20°C 맑음 ☀️', weekly: ['19°C','20°C','18°C','17°C','19°C','21°C','20°C'] },
    { id: 'taean',    name: '태안해안', status: 'partial', sido: '충청남도', sigungu: '태안군',     address: '충남 태안군 태안해안길', desc: '서해안의 아름다운 해안선과 갯벌.', today: '21°C 맑음 ☀️', tomorrow: '23°C 맑음 ☀️', weekly: ['21°C','23°C','22°C','20°C','19°C','21°C','22°C'] },
    { id: 'gyeryong', name: '계룡산',   status: '',        sido: '충청남도', sigungu: '공주시',     address: '충남 공주시 계룡산로', desc: '기암절벽과 운해가 장관인 명산.', today: '22°C 맑음 ☀️', tomorrow: '21°C 흐림 ☁️', weekly: ['22°C','21°C','20°C','23°C','24°C','22°C','21°C'] },
    { id: 'juwang',   name: '주왕산',   status: '',        sido: '경상북도', sigungu: '청송군',     address: '경북 청송군 주왕산로', desc: '기암괴석과 폭포가 어우러진 협곡 미학.', today: '20°C 구름 ☁️', tomorrow: '19°C 비 🌧️', weekly: ['20°C','19°C','18°C','21°C','22°C','20°C','19°C'] },
    { id: 'palgong',  name: '팔공산',   status: 'partial', sido: '대구광역시', sigungu: '동구',     address: '대구 동구 팔공산로', desc: '대구를 대표하는 도심 속 휴식처.', today: '23°C 맑음 ☀️', tomorrow: '24°C 맑음 ☀️', weekly: ['23°C','24°C','25°C','23°C','22°C','24°C','23°C'] },
    { id: 'deogyu',   name: '덕유산',   status: 'partial', sido: '전라북도', sigungu: '무주군',     address: '전북 무주군 덕유산로', desc: '겨울 스키와 여름 계곡이 매력적인 산.', today: '18°C 비 🌧️', tomorrow: '20°C 구름 🌤️', weekly: ['18°C','20°C','22°C','21°C','19°C','17°C','18°C'] },
    { id: 'gyeongju', name: '경주',     status: '',        sido: '경상북도', sigungu: '경주시',     address: '경북 경주시 감포읍', desc: '역사 유적과 자연이 공존하는 문화 국립공원.', today: '24°C 맑음 ☀️', tomorrow: '25°C 맑음 ☀️', weekly: ['24°C','25°C','26°C','24°C','23°C','25°C','24°C'] },
    { id: 'gaya',     name: '가야산',   status: '',        sido: '경상남도', sigungu: '합천군',     address: '경남 합천군 가야산로', desc: '해인사와 함께하는 고즈넉한 명산.', today: '22°C 흐림 ☁️', tomorrow: '21°C 구름 🌤️', weekly: ['22°C','21°C','20°C','23°C','24°C','22°C','21°C'] },
    { id: 'byeonsan', name: '변산반도', status: '',        sido: '전라북도', sigungu: '부안군',     address: '전북 부안군 변산면', desc: '서해안 반도의 산과 바다가 어우러진 풍경.', today: '21°C 구름 🌤️', tomorrow: '22°C 맑음 ☀️', weekly: ['21°C','22°C','23°C','21°C','20°C','22°C','23°C'] },
    { id: 'naejang',  name: '내장산',   status: '',        sido: '전라북도', sigungu: '정읍시',     address: '전북 정읍시 내장산로', desc: '단풍으로 유명한 호남의 명산.', today: '23°C 맑음 ☀️', tomorrow: '24°C 맑음 ☀️', weekly: ['23°C','24°C','22°C','21°C','23°C','25°C','24°C'] },
    { id: 'jiri',     name: '지리산',   status: '',        sido: '전라남도', sigungu: '구례군',     address: '전남 구례군 지리산로', desc: '한국 최초의 국립공원, 웅장한 산림의 보고.', today: '19°C 비 🌧️', tomorrow: '18°C 비 🌧️', weekly: ['19°C','18°C','17°C','20°C','21°C','19°C','18°C'] },
    { id: 'mudeung',  name: '무등산',   status: '',        sido: '광주광역시', sigungu: '동구',     address: '광주 동구 무등산길', desc: '광주 시민의 휴식처이자 증심사가 있는 산.', today: '24°C 맑음 ☀️', tomorrow: '23°C 구름 🌤️', weekly: ['24°C','23°C','22°C','25°C','26°C','24°C','23°C'] },
    { id: 'wolchul',  name: '월출산',   status: 'closed',  sido: '전라남도', sigungu: '영암군',     address: '전남 영암군 월출산로', desc: '기암괴석과 억새가 어우러진 산.', today: '25°C 구름 ☁️', tomorrow: '26°C 맑음 ☀️', weekly: ['25°C','26°C','24°C','23°C','25°C','27°C','26°C'] },
    { id: 'hallyeo',  name: '한려해상', status: 'partial', sido: '경상남도', sigungu: '통영시',     address: '경남 통영시 한려해상로', desc: '청정 바다와 섬이 어우러진 해안 국립공원.', today: '22°C 맑음 ☀️', tomorrow: '22°C 구름 🌤️', weekly: ['22°C','22°C','23°C','24°C','22°C','21°C','23°C'] },
    { id: 'dadohae',  name: '다도해해상',status: 'partial', sido: '전라남도', sigungu: '신안군',     address: '전남 신안군 다도해로', desc: '수많은 섬과 해상 국립공원의 진수.', today: '23°C 흐림 ☁️', tomorrow: '24°C 맑음 ☀️', weekly: ['23°C','24°C','25°C','23°C','22°C','24°C','23°C'] },
    { id: 'halla',    name: '한라산',   status: '',        sido: '제주특별자치도', sigungu: '제주시',     address: '제주시 한라산길', desc: '제주도를 대표하는 대한민국 최고봉.', today: '18°C 비 🌧️', tomorrow: '19°C 흐림 ☁️', weekly: ['18°C','19°C','20°C','18°C','17°C','19°C','20°C'] },
];

// ─────────────────────────────────────────────
// 지도 마커 및 날씨 카드
// 국립공원 마커를 생성하고, 클릭 시 날씨 카드를 표시합니다.
// ─────────────────────────────────────────────
// parkData를 id로 빠르게 조회하기 위한 Map (initMap 최초 호출 시 1회 생성)
let parkDataMap;

function initMap() {
    const mapArea = document.querySelector('.map-container__image-area');
    if (!mapArea) return;

    // guide 요소는 루프 밖에서 1회만 조회합니다.
    const mapGuide = mapArea.querySelector('.map-container__guide');
    const labels = parkData.map((park) => {
        const label = document.createElement('button');
        label.className = 'park-marker';
        label.dataset.parkId = park.id;
        if (park.status) label.dataset.status = park.status;
        label.textContent = park.name;

        if (mapGuide) {
            mapArea.insertBefore(label, mapGuide);
        } else {
            mapArea.appendChild(label);
        }

        return label;
    });

    const weatherCard = document.createElement('div');
    weatherCard.className = 'weather-card';
    mapArea.appendChild(weatherCard);

    // parkDataMap이 아직 생성되지 않았다면 (최초 호출) 1회만 빌드합니다.
    if (!parkDataMap) {
        parkDataMap = new Map(parkData.map((p) => [p.id, p]));
    }

    labels.forEach((label) => {
        label.addEventListener('click', () => toggleWeatherCard(label, labels, weatherCard, mapArea));
    });
}

function toggleWeatherCard(label, labels, weatherCard, mapArea) {
    const isActive = label.classList.contains('park-marker--active');
    labels.forEach((item) => item.classList.remove('park-marker--active'));

    if (isActive) {
        weatherCard.classList.remove('weather-card--visible');
        return;
    }

    const park = parkDataMap?.get(label.dataset.parkId);
    label.classList.add('park-marker--active');
    weatherCard.innerHTML = `
        <div class="weather-row">오늘 : ${park?.today || '-'}</div>
        <div class="weather-row">내일 : ${park?.tomorrow || '-'}</div>
    `;

    const mapRect = mapArea.getBoundingClientRect();
    const labelRect = label.getBoundingClientRect();
    weatherCard.style.left = `${((labelRect.left - mapRect.left + labelRect.width / 2) / mapRect.width) * 100}%`;
    weatherCard.style.top  = `${((labelRect.bottom - mapRect.top) / mapRect.height) * 100}%`;
    weatherCard.classList.add('weather-card--visible');
}