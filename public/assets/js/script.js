function openCloseBlock() {
    const openBlockBtn = document.querySelectorAll('[data-open-block-btn]');
    openBlockBtn.forEach(openBtn => {
        openBtn?.addEventListener('click', (event) => {
            const openBlockWrapper = event.target.closest('[data-open-block-wrapper]');
            const openingBlock = openBlockWrapper.querySelector('[data-open-block]');
            openBlockWrapper.classList.toggle('open');
            if (openingBlock.style.maxHeight) {
                openingBlock.removeAttribute('style');
            } else {
                openingBlock.style.maxHeight = openingBlock.scrollHeight + 'px';
            }
        })
    })
}

function initTabs() {
    document.querySelectorAll('[data-tabs-block]').forEach(tabsBlock => {
        const panes = tabsBlock.querySelectorAll('[data-panes] [data-pane]');
        const containers = tabsBlock.querySelectorAll('[data-container]');
        panes.forEach((pane, index) => {
            pane.addEventListener('click', () => {
                panes.forEach(item => item.classList.remove('active'));
                containers.forEach(container => container.classList.remove('active'));
                pane.classList.add('active');
                containers[index].classList.add('active');
            });

            if (panes.length > 0 && containers.length > 0) {
                panes[0].classList.add('active');
                containers[0].classList.add('active');
            }
        });
    });
}

function closeALlOpened() {
    const overlays = document.querySelectorAll('[data-overlay]');
    const popups = document.querySelectorAll('[data-popup]');
    const menu = document.getElementById('header_menu');
    overlays.forEach(overlay => {
        overlay.classList.remove('active')
    })
    popups.forEach(popup => {
        popup.classList.remove('active')
    })
    console.log('barev')
    menu.classList.remove('active');
    resetScrollBody()
}

function closeByESC() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeALlOpened()
        }
    });
}

function initMobileMenu() {
    const menuBtn = document.querySelector('[data-mobile-menu-btn]');
    const menu = document.getElementById('header_menu');
    const overlay = document.getElementById('menu_overlay');

    if (!menuBtn || !menu || !overlay) return;
    const toggleMenu = () => {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
}

function mobileAnchorClick() {
    const headerNavList = document.querySelector('[data-header-nav-list]');
    const anchors = headerNavList.querySelectorAll('li');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', () => {
            closeALlOpened()
        })
    })
}

function stopScrollBody() {
    document.body.classList.add('popup-open');
}

function resetScrollBody() {
    document.body.classList.remove('popup-open');
}

function openPopUp() {
    const openPopupButtons = document.querySelectorAll('[data-open-popup]');
    openPopupButtons.forEach(openBtn => {
        openBtn.addEventListener('click', () => {
            closeALlOpened()
            const popupOverlay = document.getElementById('popup_overlay');
            const popupType = openBtn.dataset.openPopup;
            const currentPopUp = document.getElementById(`${popupType}`)
            currentPopUp.classList.add('active');
            popupOverlay.classList.add('active');
            popupOverlay.focus();

            stopScrollBody()
        });
    })

    const closePopupBtn = document.querySelectorAll('[data-close-popup]');
    closePopupBtn.forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const popup = e.target.closest('[data-popup]');
            popup.classList.remove('active');
            closeALlOpened()
        })
    })
}

function closeByOverlay() {
    const popupOverlay = document.getElementById('popup_overlay');
    popupOverlay?.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closeALlOpened()
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    openCloseBlock()
    initTabs()
    initMobileMenu()
    closeByESC()
    mobileAnchorClick()
    openPopUp()
    closeByOverlay()

})

function initSliders() {
    const sliders = document.querySelectorAll('[data-slider-group-item]');
    if (!sliders.length) return;

    sliders.forEach(slider => {
        const d = slider.dataset;
        const sliderId = d.sliderGroupItem;

        const paginationEl = `#swiper-pagination__${sliderId}`;

        const swiper = new Swiper(`#${sliderId}`, {
            loop: d.slidesLoop === 'true',
            grabCursor: d.grabCursor === 'true',
            speed: parseInt(d.slidesSpeed, 10) || 1000,

            autoplay: d.autoPlay === 'true' ? {
                delay: parseInt(d.slidesDelay, 10) || 3000,
            } : false,

            navigation: {
                nextEl: `#toRight_${sliderId}`,
                prevEl: `#toLeft_${sliderId}`,
            },

            breakpoints: {
                0: {
                    slidesPerView: parseFloat(d.slidesViewMobile) || 1,
                    spaceBetween: parseFloat(d.spaceBetweenMobile) || 0,
                    pagination: d.paginationMobile ? {
                        el: paginationEl,
                        type: d.paginationMobile,
                        clickable: d.paginationClickable === 'true',
                    } : false,
                },

                768: {
                    slidesPerView: parseFloat(d.slidesViewTablet) || 1,
                    spaceBetween: parseFloat(d.spaceBetweenTablet) || 0,
                    pagination: false,
                },

                1220: {
                    slidesPerView: parseFloat(d.slidesView) || 1,
                    spaceBetween: parseFloat(d.spaceBetween) || 0,
                    pagination: false,
                },
            },
        });
    });
}

initSliders();

document.addEventListener('focus', function (e) {
    if (e.target.matches('input[data-phone-mask]') && typeof Inputmask !== 'undefined') {
        if (!e.target.inputmask) {
            Inputmask({
                mask: "+7 (999) 999-99-99",
                placeholder: "_",
                showMaskOnHover: false,
                clearIncomplete: true
            }).mask(e.target);
        }
    }
}, true);


