(function ($) {

    // /* Select placeholder */
    // function selectPlaceholder($element) {
    //     if ($element.val() === 'placeholder') {
    //         $element.parent('.input').addClass('input--placeholder-is-chosen');
    //     } else {
    //         $element.parent('.input').removeClass('input--placeholder-is-chosen');
    //     }
    // }
    //
    // $('select.input__widget').each(function () {
    //     selectPlaceholder($(this));
    // }).on('change', function () {
    //     selectPlaceholder($(this));
    // });
    //
    // /* Expanding textarea */
    // function expandTextarea($element) {
    //     $element.css('height', 'auto');
    //     $element.css('height', ($element[0].scrollHeight + 2 * parseInt($element.css('border-width'), 10)) + 'px');
    // }
    //
    // $('.input--expandable .input__widget').each(function () {
    //     expandTextarea($(this));
    // }).on('input', function () {
    //     expandTextarea($(this));
    // });
    //
    // /* Error field */
    // $('.input__widget').on('focus', function () {
    //     $(this).parents('.input').removeClass('input--error');
    //     $(this).parents('.input').nextUntil(':not(.helper--error)').remove();
    // });
    //
    //
    // /* Init mask */
    // $('[type="tel"]').inputmask({
    //     alias: 'phoneru',
    // });

    const $html = document.querySelector('html');



    /* Расхлопывание меню (актуально на смартфонах) */

    const $menu = document.querySelector('.menu');
    const $burger = document.querySelector('.burger');

    document.querySelector('.burger').addEventListener('click', function(event) {
        $html.classList.toggle('burger-expanded');
    });

    document.querySelector('.menu__close').addEventListener('click', function(event) {
        $html.classList.remove('burger-expanded');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            $html.classList.remove('burger-expanded');
        }
    });

    document.addEventListener('click', (event) => {
        if (!$menu.contains(event.target) && !$burger.contains(event.target)) {
            $html.classList.remove('burger-expanded');
        }
    });


    /* Расхлопывание поиска (актуально на смартфонах) */

    const $findField = document.querySelector('.find__field');

    document.querySelector('.find__handler').addEventListener('click', function(event) {
        $html.classList.toggle('search-expanded');
        if ($html.classList.contains('search-expanded')) {
            $findField.focus();
        }
    });


    /* Расхлопывание подменюшек (актуально на смартфонах) */

    function resize(clipped) {
        const viewport = clipped.querySelector('.clipped__viewport');
        if (!clipped.classList.contains('clipped--open')) {
            viewport.style.height = clipped.getAttribute('data-canonical-height') + 'px';
        } else {
            viewport.style.height = clipped.getAttribute('data-actual-height') + 'px';
        }
    }

    function init() {
        document.querySelectorAll('.clipped').forEach(clipped => {
            let height = 0;
            const canonicalHeight = parseInt(clipped.getAttribute('data-canonical-height'));

            // Reset heights to their defaults before measuring
            clipped.classList.add('clipped--measurement');

            // Measure
            const content = clipped.querySelector('.clipped__content');
            height = content.offsetHeight;
            clipped.setAttribute('data-actual-height', height);

            // Revert to original state
            clipped.classList.remove('clipped--measurement');

            // Check if expandable
            if (height > canonicalHeight) {
                clipped.classList.add('clipped--expandable');
                resize(clipped);
            } else {
                clipped.classList.remove('clipped--expandable');
                clipped.querySelector('.clipped__viewport').style.height = '';
            }
        });
    }

    window.addEventListener('resize', init);
    window.addEventListener('load', init);

    document.querySelectorAll('.clipped__handler').forEach(handler => {
        handler.addEventListener('click', function () {
            const clipped = handler.closest('.clipped');
            clipped.classList.toggle('clipped--open');
            resize(clipped);
        });
    });



    /* Аккордеон */

    const accordionItems = document.querySelectorAll(".accordion__item");

    accordionItems.forEach(item => {
        const $handler = item.querySelector(".accordion__handler");

        $handler.addEventListener("click", () => {
            const isOpen = item.classList.contains("accordion__item--current");

            accordionItems.forEach(otherItem => {
                otherItem.classList.remove("accordion__item--current");
            });

            if (!isOpen) {
                item.classList.add("accordion__item--current");
            }
        });
    });



    /* Фильтры */

    const $filter = document.querySelectorAll('.filter');

    $filter.forEach($filterContainer => {
        const $filterHandler = $filterContainer.querySelector('.filter__handler');
        const $filterItem = $filterContainer.querySelectorAll('.filter__item');

        $filterHandler.addEventListener('click', function () {
            $filterContainer.classList.toggle('filter--expanded');
        });

        $filterItem.forEach(item => {
            item.addEventListener('click', () => {
                $filterItem.forEach(i => i.classList.remove('filter__item--current'));
                item.classList.add('filter__item--current');
                $filterHandler.textContent = item.textContent;
                $filterContainer.classList.remove('filter--expanded');
            });
        });
    });


    /* Свичт */

    const $switch = document.querySelectorAll('.switch');

    $switch.forEach($switchContainer => {
        const $switchItem = $switchContainer.querySelectorAll('.switch__item');

        $switchItem.forEach(item => {
            item.addEventListener('click', () => {
                $switchItem.forEach(i => i.classList.remove('switch__item--current'));
                item.classList.add('switch__item--current');
            });
        });
    });


    /* Карусели */

    document.querySelectorAll('.carousel').forEach(($carousel) => {

        if( $carousel.classList.contains('carousel--js-init-day') ) {
            new Swiper($carousel.querySelector('.swiper'), {
                slidesPerView: 1,
                slidesPerGroup: 1,
                autoHeight: true,
                spaceBetween: 24,
                navigation: {
                    prevEl: $carousel.querySelector('.carousel__button--prev'),
                    nextEl: $carousel.querySelector('.carousel__button--next'),
                    disabledClass: 'carousel__button--disabled',
                },
                pagination: {
                    el: $carousel.querySelector('.carousel__pagination'),
                    type: "bullets", /* можно переделать на fraction, если будет много слайдов */
                    bulletClass: 'carousel__bullet',
                    bulletActiveClass: 'carousel__bullet--current',
                    clickable: true
                },
                breakpoints: {
                    740: {
                        pagination: false
                    }
                },
                // on: {
                //     init: function () {
                //         toggleNavigationAndPagination(this);
                //     },
                //     resize: function () {
                //         toggleNavigationAndPagination(this);
                //     },
                // },
            });
        }
    });

})(jQuery);
