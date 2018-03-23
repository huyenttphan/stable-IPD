jQuery(function(){
    // jQuery for page scrolling feature
    jQuery('a.smooth[href^=#]').on('click', function(){
			var $_this = jQuery(this);
			var $speed = 500;
			var $href= jQuery(this).attr("href");
            var $target = jQuery($href == "#" || $href == "" ? 'html' : $href);
			var position = $target.offset().top;
			jQuery("html, body").animate({scrollTop:position}, $speed, "swing");
			return false;
    });

    //Sticky navigation bar
    var $_globalNav = $('.global-nav');
    var $_scrollHeight = $('.js-hero').height() - 100;

    $(window).scroll(function() {
        if($(this).scrollTop() > $_scrollHeight) {
            $_globalNav.addClass('sticky');
        } else {
            $_globalNav.removeClass('sticky');
        }
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

function noscroll() {
    window.scrollTo( 0, 0 );
}

$(window).on('load', function(){
    TweenMax.to('.loading', 0.5, {opacity: 0, onComplete: function () {
        noscroll();
        setTimeout(function(){
            $('.loading').remove();
        }, 300)
    }});
});