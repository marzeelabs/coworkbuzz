$(function() {

  var breakMobile = 730, // viewport px breakpoint

      waitForScroll = false,

      triggerHashChange = function() {
        $( window ).trigger('hashchange');
      },

      scrollToSection = function() {
        var $sectionElement = $("section" + location.hash + '-section');

        if ($sectionElement.length) {
          waitForScroll = true;

          // We can't use $(".navigation").outerHeight() because
          // we'd need to wait for the CSS animation to finish.
          // That's why we do 60px hardcoded.
          $("html, body").stop().animate({
            scrollTop: $sectionElement.scrollTop() + $sectionElement.offset().top - 59 + 1,
          }, 500, function() {
            waitForScroll = false;
          });
        }
      },

      setNavigationItemActive = function() {

        var currentCategory = '/' + window.location.pathname.substr(1).split('/')[0],
            scrollPosition = $( document ).scrollTop() + $(".navigation").outerHeight(),
            activeClass = 'is-active',
            $navLinks = $(".navigation__menu__item a");

            $navLinks.each(function() {
              var linkHash = $(this).prop('hash'),
                  linkHref = $(this).attr('href'),
                  $section = $(linkHash + "-section"),
                  sectionTop = $section.length ? $section.position().top : null;
                  sectionBottom = $section.length ? $section.position().top + $section.height() : null;

              if (linkHash) {
                if (sectionTop <= scrollPosition && sectionBottom > scrollPosition) {
                  $(this).parent().addClass(activeClass);
                } else {
                  $(this).parent().removeClass(activeClass);
                }
              } else if (linkHref === currentCategory) {
                $(this).parent().addClass(activeClass);
              }

            });
      },

      fixedHeader = function() {

        var viewportWidth = $( window ).width(),
            fixedClass = 'navigation--fixed-top',
            $navElement = $(".navigation");

        if ($(window).scrollTop() > '1' && viewportWidth >= breakMobile) {
          $navElement.addClass(fixedClass);
        } else {
          $navElement.removeClass(fixedClass);
        }
      };

  // Toggle mobile navigation
  $(".navigation__mobile-menu__toggle").click(function() {
    $(this).parent().toggleClass('is-open');
  });

  // Force close mobile navigation when clicking anywhere (except the toggle button itself)
  $( document ).on('mousedown touchstart', function(event) {

    var selectorElement = '.navigation li a',
        targetElement = '.navigation__menu__item';

    $(selectorElement).on('click touch', function(){
      $(".navigation.is-open").removeClass('is-open');
    });

    // Force close mobile navigation when clicking anywhere (except the toggle button itself)
    if (!$(event.target).closest(".navigation").length) {
      $(".navigation.is-open").removeClass('is-open');
    }
  });

  //- function for countdown
  function countdown() {

    var endDate = "September 17, 2016 09:30:00";

    $('.apply-countdown').countdown({
      date: endDate,
      render: function(data) {
      $(this.el).html("<div class='apply-countdown__numbers'>" + this.leadingZeros(data.days, 2) + " <span>Dias</span></div><div class='apply-countdown__numbers'>" + this.leadingZeros(data.hours, 2) + " <span>Horas</span></div><div class='apply-countdown__numbers'>" + this.leadingZeros(data.min, 2) + " <span>Minutos</span></div><div class='apply-countdown__numbers'>" + this.leadingZeros(data.sec, 2) + " <span>Segundos</span></div>");
      }
    });
  };

  //- function for g maps
  function gmaps() {
    $('.map-section__gmap').click(function () {
        $('.map-section__gmap iframe').css("pointer-events", "auto");
    });

    $( ".map-section__gmap" ).mouseleave(function() {
      $('.map-section__gmap iframe').css("pointer-events", "none");
    });
  };

  $(window).on('resize scroll', fixedHeader);
  $( window ).on('hashchange', scrollToSection).trigger('hashchange');
  $( window ).on('resize scroll', setNavigationItemActive);
  $("a[href^='/#']").click(triggerHashChange);
  countdown();
  gmaps();

});
