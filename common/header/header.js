// ─────────────────────────────────────────────
// 헤더 메뉴 초기화
// 모바일 서브메뉴 토글, resize 시 위치 재조정을 처리합니다.
// ─────────────────────────────────────────────
function initHeader() {
    const gnbItems = document.querySelectorAll('.gnb > li');
    const mobileQuery = window.matchMedia('(max-width: 1024px)');

    // 활성화된 서브메뉴를 모두 닫고 위치 속성을 초기화합니다.
    function closeMenus() {
        gnbItems.forEach((item) => {
            item.classList.remove('active');
            item.querySelector('.sub-menu')?.style.removeProperty('--submenu-top');
        });
    }

    // 모바일 화면에서 서브메뉴 위치를 클릭한 메뉴 아래로 맞춥니다.
    function positionMobileSubMenu(mainLink, subMenu) {
        if (!mobileQuery.matches) {
            subMenu.style.removeProperty('--submenu-top');
            return;
        }

        const nav = mainLink.closest('.gnb-nav');
        if (!nav) return;

        const navRect = nav.getBoundingClientRect();
        const linkRect = mainLink.getBoundingClientRect();
        subMenu.style.setProperty('--submenu-top', `${linkRect.bottom - navRect.top + 10}px`);
    }

    // 메뉴 하단 검색바
    const searchBtn = document.querySelector('.header-search');
    const searchBar = document.querySelector('.header-search-bar');
    const searchIcon = searchBtn?.querySelector('.header-search__icon--search');
    const closeIcon = searchBtn?.querySelector('.header-search__icon--close');
    const isMobile = () => window.innerWidth <= 1024;

    function toggleSearch(e) {
        e.stopPropagation();
        if (!searchBar) return;

        const isOpen = searchBar.classList.contains('header-search-bar--open');
        if (isOpen) {
            closeSearch();
        } else {
            closeMenus();
            searchBar.classList.add('header-search-bar--open');
            const input = searchBar.querySelector('.header-search-bar__input');
            if (input) input.focus();
            updateMobileIcons(true);
        }
    }

    function closeSearch() {
        if (!searchBar) return;
        searchBar.classList.remove('header-search-bar--open');
        const input = searchBar.querySelector('.header-search-bar__input');
        if (input) input.value = '';
        updateMobileIcons(false);
    }

    function updateMobileIcons(open) {
        if (!isMobile() || !searchIcon || !closeIcon) return;
        searchIcon.style.display = open ? 'none' : 'block';
        closeIcon.style.display = open ? 'block' : 'none';
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', toggleSearch);
    }

    gnbItems.forEach((item) => {
        const mainLink = item.querySelector('.main-link');
        const subMenu = item.querySelector('.sub-menu');
        if (!mainLink || !subMenu) return;

        mainLink.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            // 검색창 열려있으면 닫기
            if (searchBar?.classList.contains('header-search-bar--open')) {
                closeSearch();
            }

            const isActive = item.classList.contains('active');
            closeMenus();

            if (!isActive) {
                positionMobileSubMenu(mainLink, subMenu);
                item.classList.add('active');
            }
        });
    });

    // document 레벨 이벤트(keydown / 외부 클릭)는 단일 리스너로 통합해 등록 수를 줄입니다.
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchBar?.classList.contains('header-search-bar--open')) {
            closeSearch();
        }
    });

    document.addEventListener('click', (e) => {
        if (searchBar?.classList.contains('header-search-bar--open') &&
            !e.target.closest('.header-search') &&
            !e.target.closest('.header-search-bar')) {
            closeSearch();
        }
    });

    // resize 이벤트에 debounce를 적용해 과호출을 방지합니다.
    window.addEventListener('resize', debounce(() => {
        const activeItem = document.querySelector('.gnb > li.active');
        const activeLink = activeItem?.querySelector('.main-link');
        const activeSubMenu = activeItem?.querySelector('.sub-menu');

        if (!activeItem || !activeLink || !activeSubMenu) {
            closeMenus();
            return;
        }

        positionMobileSubMenu(activeLink, activeSubMenu);
    }, 100), { passive: true });
}