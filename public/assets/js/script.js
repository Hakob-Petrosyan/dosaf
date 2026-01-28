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

function checkForm() {
    const forms = document.querySelectorAll('[data-form]');

    forms.forEach(form => {
        const agreement = form.querySelector('[data-agreement]');
        const agreementFocus = form.querySelector('[data-agreement-focus]');

        let focusTimeout;

        form.addEventListener('submit', (e) => {
            // стандартная HTML5-валидация
            if (!form.checkValidity()) {
                return;
            }

            if (!agreement.checked) {
                e.preventDefault();

                clearTimeout(focusTimeout);

                agreementFocus.classList.add('focus-agreement');

                focusTimeout = setTimeout(() => {
                    agreementFocus.classList.remove('focus-agreement');
                }, 5000);
            }
        });
    });
}

function initCustomSelect() {
    document.querySelectorAll('[data-custom-select]').forEach(select => {
        const valueInput = select.querySelector('[data-custom-select-value]');
        const valueText  = select.querySelector('[data-custom-select-value-text]');
        const items      = select.querySelectorAll('[data-custom-select-list] li');

        items.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.textContent.trim();

                valueInput.value = value;
                valueText.textContent = value;

                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                select.classList.remove('open');
                select.querySelector('[data-open-block]')?.removeAttribute('style');
            });
        });
    });
}

function initMobileMenu() {
    const menuBtn = document.querySelector('[data-mobile-menu-btn]');
    const menu = document.getElementById('header_menu');
    menuBtn.addEventListener('click', () => {
        menu.classList.add('active');
        stopScrollBody()
    });
}

function headerDropdown() {
    const btn = document.querySelector('[data-catalog-btn]');
    const catalog = document.querySelector('[data-catalog]');

    if (!btn || !catalog) return;

    function onMouseEnter() {
        catalog.classList.add('active');
        btn.classList.add('hover-type');
    }

    function onMouseLeave() {
        catalog.classList.remove('active');
        btn.classList.remove('hover-type');
    }

    function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        catalog.classList.toggle('active');
    }

    function desktopInit() {
        btn.addEventListener('mouseenter', onMouseEnter);
        btn.addEventListener('mouseleave', onMouseLeave);
        catalog.addEventListener('mouseenter', onMouseEnter);
        catalog.addEventListener('mouseleave', onMouseLeave);
    }

    function desktopDestroy() {
        btn.removeEventListener('mouseenter', onMouseEnter);
        btn.removeEventListener('mouseleave', onMouseLeave);
        catalog.removeEventListener('mouseenter', onMouseEnter);
        catalog.removeEventListener('mouseleave', onMouseLeave);
    }

    function mobileInit() {
        btn.addEventListener('click', onClick);
    }

    function mobileDestroy() {
        btn.removeEventListener('click', onClick);
    }

    const mediaQuery = window.matchMedia('(max-width: 991px)');
    let currentMode = null;

    function handleChange(e) {
        if (e.matches && currentMode !== 'mobile') {
            desktopDestroy();
            mobileInit();
            currentMode = 'mobile';
        }

        if (!e.matches && currentMode !== 'desktop') {
            mobileDestroy();
            desktopInit();
            currentMode = 'desktop';
        }
    }

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
}

function mobileInnerMenus() {
    const mediaSize = window.matchMedia('(max-width: 991px)');
    const mobileInnerMenuButtons = document.querySelectorAll('[data-mobile-inner-menu-btn]');
    if (!mobileInnerMenuButtons.length) return;

    let active = false;

    function openInnerMenu(e)  {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget
            .closest('[data-mobile-inner-menu-item]')
            ?.querySelector('[data-mobile-inner-menu-list]')
            ?.classList.add('active');
    }

    const update = e => {
        if (e.matches && !active) {
            mobileInnerMenuButtons.forEach(btn => btn.addEventListener('click', openInnerMenu));
            active = true;
        }

        if (!e.matches && active) {
            mobileInnerMenuButtons.forEach(btn => btn.removeEventListener('click', openInnerMenu));
            document.querySelectorAll('[data-mobile-inner-menu-list]')
                .forEach(list => list.classList.remove('active'));
            active = false;
        }
    };

    update(mediaSize);
    mediaSize.addEventListener('change', update);
}

function closeCurrentMenu(){
    const closeCurrentMenuButtons = document.querySelectorAll('[data-close-current-menu]');
    closeCurrentMenuButtons.forEach(closeCurent => {
        closeCurent.addEventListener('click', (e) => {
           const currentMenu = closeCurent.closest('[data-mobile-inner-menu-list]');
                 currentMenu.classList.remove('active');
        })
    })
}

function masonryGrid() {
    const masonryElems = document.querySelectorAll('[data-masonry-grid]');
    masonryElems.forEach(masonryElem => {
        new Masonry(masonryElem, {
            itemSelector: '[data-masonry-grid-item]',
            percentPosition: true,
            gutter: 24,
        });
    });
}


document.addEventListener('DOMContentLoaded', function () {
    openCloseBlock()
    initTabs()
    initMobileMenu()
    closeByESC()
    openPopUp()
    closeByOverlay()
    checkForm()
    initCustomSelect()
    headerDropdown()
    mobileInnerMenus()
    closeCurrentMenu()
    masonryGrid()
})


document.addEventListener('click', (e) => {
    const openedSelects = document.querySelectorAll('[data-custom-select]');
    openedSelects.forEach(wrapper => {
        if (wrapper.contains(e.target)) return;
        const openingBlock = wrapper.querySelector('[data-open-block]');
        wrapper.classList.remove('open');
        openingBlock.removeAttribute('style');
    });
});

document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-calculator-plus], [data-calculator-minus]');

    if (!btn) return;

    const step = Number(
        btn.dataset.calculatorPlus || btn.dataset.calculatorMinus
    );

    const wrapper = btn.closest('[data-calculator-price]');
    const input = wrapper.querySelector('[data-calculator-price-value]');

    const value = Number(input.value) || 0;

    if (btn.hasAttribute('data-calculator-plus')) {
        const step = Number(btn.dataset.calculatorPlus);
        input.value = value + step;
    }

    if (btn.hasAttribute('data-calculator-minus')) {
        const step = Number(btn.dataset.calculatorMinus);
        input.value = Math.max(0, value - step);
    }

});


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




/*
function mobileAnchorClick() {
    const headerNavList = document.querySelector('[data-header-nav-list]');
    const anchors = headerNavList.querySelectorAll('li');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', () => {
            closeALlOpened()
        })
    })
}
mobileAnchorClick()*/
