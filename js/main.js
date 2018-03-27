
jQuery(function(){
    // jQuery for page scrolling feature
    jQuery('a.smooth[href^=#]').on('click', function(){
			var $_this = jQuery(this);
			var $speed = 500;
			var $href= jQuery(this).attr("href");
            var $target = jQuery($href == "#" || $href == "" ? 'html' : $href);
			var position = $target.offset().top - 75;
			jQuery("html, body").animate({scrollTop:position}, $speed, "swing");
			return false;
    });

    //Sticky navigation bar
    var fixedNav = $('.fixed-nav');
    var scrollHeight = $('header').height();

    $(window).scroll(function() {
        if($(this).scrollTop() > scrollHeight) {
            fixedNav.addClass('sticky');
        } else {
            fixedNav.removeClass('sticky');
        }
    });

    //Clicking hamburger on mobile
    var body = $('#pagetop');
    var burger = $('.nav-burger');
    var navList = $('.fixed-nav-items');
    var navLink = $('.fixed-nav-item .smooth');

    burger.on('click', function(){
        burger.toggleClass('clicked');
        if (burger.hasClass('clicked')){
            navList.addClass('opened');
            body.addClass('overflow-hidden');
            //Clicking on nav link on mobile closes mobile navigation
            navLink.on('click', function(){
                burger.removeClass('clicked');
                navList.removeClass('opened');
                body.removeClass('overflow-hidden');
            });
        } else{
            navList.removeClass('opened');
            body.removeClass('overflow-hidden');
        }
    });

    //video modal
    var videoObject = $('.modal-content');

    $('.video-trigger').on('click', function(){
        videoObject.attr('src', $(this).data('video'));
        $('.iframe-pop').addClass('iframe-visible');
    });

    $('.modal-close').on('click', function(){
        videoObject.attr('src', '');
        $('.iframe-pop').removeClass('iframe-visible');
    });

    $('.iframe-pop').on('click', function(){
        videoObject.attr('src', '');
        $('.iframe-pop').removeClass('iframe-visible');
    });

    //Scrollspy
    var $_sections = $('.scrollspy')

    $(window).scroll(function(){
        var $_scrollPosition = $(this).scrollTop();

        $_sections.each(function() {
            var $_top = $(this).offset().top - $_navHeight - 1,
                $_bottom = $_top + $(this).outerHeight();

            if ($_scrollPosition >= $_top && $_scrollPosition <= $_bottom) {
                $_globalNav.find('a').removeClass('active');
                $_sections.removeClass('active');
                
                $(this).addClass('active');
                $_globalNav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
            }
        });
    });
});

$(window).on('load', function(){
    TweenMax.to('.loading', 0.5, {opacity: 0, onComplete: function () {
        setTimeout(function(){
            $('.loading').remove();
        }, 300)
    }});
});