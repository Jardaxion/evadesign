let lastScrollTop = 0;

$(document).ready(() => {
    //Инициализация анимации при скролле
    AOS.init();

    //Прокручиваемая строка с картиками
    let marquee = $('.clients__inner').marquee({
        duration: 10000,
        startVisible: true,
        duplicated: true
    })

    $('.clients__client').on('mouseover', () => {
        marquee.marquee('pause');
    });
    $('.clients__client').on('mouseout', () => {
        marquee.marquee('resume');
    });

    //Мобильное меню
    $('.header__buttonMenu').on('click', function(){
        $(this).toggleClass('active');
        $('.header__menu').toggleClass('active');
        $('body').toggleClass('noScroll');
    })

    if($(window).scrollTop() > 100){
        $('header').addClass('bg');
    } else {
        $('header').removeClass('bg');
    }

    $(window).scroll(() => {
        let st = $(window).scrollTop();

        if(st > 100){
            $('header').addClass('bg');
        } else {
            $('header').removeClass('bg');
        }
        
        if (st > lastScrollTop){
            $('header').removeClass('dontShow');
        } else {
           $('header').addClass('dontShow');
        }

        if(st == 0){
            $('header').addClass('dontShow');
        }
        lastScrollTop = st;
    })

    $('.header__menu a').on('click', function(e){
        $('.header__buttonMenu').toggleClass('active');
        $('.header__menu').toggleClass('active');
        $('body').toggleClass('noScroll');
    })

    //Открытие\закрытие всех услуг на мобилке
    $('.cost__all').on('click', function(e){
        e.preventDefault();

        $('.cost__packet:last-of-type').slideToggle();
        $('.cost__packet:last-of-type').toggleClass('active');
        // $('.cost__packet:nth-of-type(3)').slideToggle();

        if($('.cost__packet:last-of-type').hasClass('active')){
            $(this).html('Скрыть');
        } else{
            $(this).html('Смотреть все');
        }
    })

    //Открытие\закрытие всех примеров на мобилке
    $('.portfolio__all').on('click', function(e){
        e.preventDefault();

        $('.portfolio__block:last-of-type').toggleClass('active');
        $('.portfolio__block:not(.first)').slideToggle();

        if($('.portfolio__block:last-of-type').hasClass('active')){
            $(this).html('Скрыть');
        } else{
            $(this).html('Смотреть больше');
        }
    })

    //Лайк
    $('.portfolio__block').each(function(index){
        let line = $(this).children().next().next().children().next();
        let oldLikes = line.data('likes')
        setLikes(line);

        line.on('click', function(){
            line.children().toggleClass('active');
            if(line.data('likes') != oldLikes){
                line.children().next().html(oldLikes);
                line.data('likes', Number(oldLikes));
            } else{
                line.children().next().html(Number(line.data('likes')) + 1);
                line.data('likes', Number(line.data('likes')) + 1);
            }
        })
    })
    
    //Маска на телефон в форме
    new IMask(document.getElementById('phone'), {
        mask: '+{7} (000) 000-00-00'
    })

    //Маска на телефон в форме модалки
    new IMask(document.getElementById('phoneModal'), {
        mask: '+{7} (000) 000-00-00'
    })

    //Отправка формы
    $('.form__form').on('submit', function(e){
        e.preventDefault();

        let ntf = new Notyf({
            duration: 5000
        });

        $.ajax({
            type: "POST",
            url: "/email.php",
            data: $(this).serialize(),
            success: function (response) {
                ntf.success("Форма была отправлена, ожидайте ответа в ближайшее время");
            }
        });
    })

    //Отправка формы
    $('.modal__form').on('submit', function(e){
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/email.php",
            data: $(this).serialize(),
            success: function (response) {
                reOpenModal("thanks");
            }
        });
    })

    let slider = new Swiper('.reviews__slider-wrapper', {
        slidesPerView: 1,
        spaceBetween: 31,
        navigation: {
            nextEl: '.reviews__rightArrow',
            prevEl: '.reviews__leftArrow'
        },
        pagination: {
            el: '.reviews__pagination',
            clickable: true
        },
        breakpoints: {
            960: {
                slidesPerView: 4
            }
        }
    })
    //Модальные окна
    //Открытие
    $('.js-open-modal').on('click', function(e){
        e.preventDefault();

        if($('.js-open-desktop-menu').hasClass('reverse')){
            openCloseMenu();
        }

        if($('.js-open-mobile-menu').hasClass('reverse')){
            openCloseMobMenu();
        }

        openModal($(this).data('modal'));
    })
    //Закрытие
    $('.js-close-modal').on('click', function(e){
        e.preventDefault();

        closeModal();
    })
    $('.modal').on('click', function(e){

        if(e.target === document.querySelector('.modal')){
            closeModal();
        }

    })
    //Переоткрытие
    $('.js-reOpen-modal').on('click', function(e){
        e.preventDefault();

        reOpenModal($(this).data('modal'));
    })
});


function setLikes(line){
    line.children().next().html(line.data('likes'));
}

//Модальные окна
//Открытие
function openModal(id){
    $('.modal#'+id).addClass('active');
    $('.modal__background').addClass('active');
    $('body').addClass('noScroll');
}

//Закрытие
function closeModal() {
    $('.modal.active').removeClass('active');
    $('.modal__background').removeClass('active');
    $('body').removeClass('noScroll');
}

//Закрытие одного модального окна и открытие другого
function reOpenModal(id) {
    $('.modal.active').removeClass('active');
    $('.modal#'+id).addClass('active');
}