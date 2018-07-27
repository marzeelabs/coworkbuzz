import $ from 'jquery';

$(() => {
  const triggerHashChange = () => {
    $(window).trigger('hashchange');
  };

  const scrollToSection = () => {
    const $sectionElement = $(`section${window.location.hash}-section`);

    if ($sectionElement.length) {
      // We can't use $(".navigation").outerHeight() because
      // we'd need to wait for the CSS animation to finish.
      // That's why we do 60px hardcoded.
      const scrollTop = $sectionElement.scrollTop() + $sectionElement.offset().top - 59 + 1;

      $('html, body').stop().animate({ scrollTop }, 500);
    }
  };

  const setNavigationItemActive = () => {
    const currentCategory = `/${window.location.pathname.substr(1).split('/')[0]}`;
    const scrollPosition = $(document).scrollTop() + $('.navigation').outerHeight();
    const activeClass = 'is-active';
    const $navLinks = $('.navigation__menu__item a');

    $navLinks.each(function eachNavLink() {
      const linkHash = $(this).prop('hash');
      const linkHref = $(this).attr('href');
      const $section = $(`${linkHash}-section`);
      const sectionTop = $section.length ? $section.position().top : null;
      const sectionBottom = $section.length ? $section.position().top + $section.height() : null;

      if (linkHash) {
        if (sectionTop <= scrollPosition && sectionBottom > scrollPosition) {
          $(this).parent().addClass(activeClass);
        }
        else {
          $(this).parent().removeClass(activeClass);
        }
      }
      else if (linkHref === currentCategory) {
        $(this).parent().addClass(activeClass);
      }
    });
  };

  $(window).on('hashchange', scrollToSection).trigger('hashchange');
  $(window).on('resize scroll', setNavigationItemActive);
  $("a[href^='/#']").click(triggerHashChange);
});
