$(document).ready(() => {
    //Инициализация анимации при скролле
    AOS.init();

    //Прокручиваемая строка с картиками
    $('.clients__inner').marquee({
        duration: 15000,
        startVisible: true,
    })

    //Мобильное меню
    $('.header__buttonMenu').on('click', function(){
        $(this).toggleClass('active');
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
            $(this).html('Все пакеты');
        }
    })

    //Открытие\закрытие всех примеров на мобилке
    $('.portfolio__all').on('click', function(e){
        e.preventDefault();

        $('.portfolio__block:last-of-type').slideToggle();
        $('.portfolio__block:last-of-type').toggleClass('active');
        $('.portfolio__block:nth-of-type(5)').slideToggle();

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

    //Отправка формы
    $('.form__form').on('submit', function(e){
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/email.php",
            data: $(this).serialize(),
            success: function (response) {
                console.log(response.data);
            }
        });
    })
});


function setLikes(line){
    line.children().next().html(line.data('likes'));
}