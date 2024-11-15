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

    document.querySelectorAll('.nav__handler').forEach(item => item.addEventListener('click', function(event) {
        event.preventDefault();
        item.closest('.nav__section').classList.toggle('footer__section--expanded');
    }));


    document.querySelector('.collapse__handler').addEventListener('click', function() {
        this.closest('.collapse').classList.toggle('collapse--expanded');
    });

})(jQuery);
