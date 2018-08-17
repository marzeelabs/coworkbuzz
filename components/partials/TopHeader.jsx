import React from 'react';
import BesugoComponent from 'Besugo';

export default class TopHeader extends BesugoComponent {
  static config = {
    tag: 'TopHeader',
  }

  renderGetTicket(data) {
    return data.ticketurl
      ? (
        <a href={ data.ticketurl } target="_blank" rel="noopener noreferrer">
          Get Ticket
        </a>
      )
      : (
        <a href="/#register">
          Get Ticket
        </a>
      );
  }

  render() {
    const data = this.props;

    return (
      <section id="pagetop-section">
        <header>
          <div className="navigation" id="navigation" ref={(div) => { this.domNavigation = div; }}>
            <div className="navigation__mobile-menu__toggle" ref={(div) => { this.domMenuToggle = div; }}>
              <span className="navigation__mobile-menu__icon" />
            </div>
            <ul className="navigation__menu">
              <li className="navigation__menu__item">
                <a href="/#pagetop">
                  Home
                </a>
              </li>
              <li className="navigation__menu__item">
                <a href="/#about">
                  About
                </a>
              </li>
              <li className="navigation__menu__item">
                <a href="/#register">
                  Registration
                </a>
              </li>
              <li className="navigation__menu__item">
                <a href="/#schedule">
                  Programme
                </a>
              </li>
              <li className="navigation__menu__item">
                <a href="/#sponsors">
                  Sponsors
                </a>
              </li>
              <li className="navigation__menu__item">
                <a href="/#contacts">
                  Contact
                </a>
              </li>
              <li className="navigation__menu__item navigation__menu__item--highlight navigation__menu__item--right">
                { this.renderGetTicket(data) }
              </li>
            </ul>
          </div>
        </header>
      </section>
    );
  }

  componentWillUnmount() {
    // We need to remove the listeners on unmount because while the components' DOM tree is rebuilt,
    // the document itself stays, otherwise we'd end up with multiple listeners, which would be
    // useless (and eventually resource-consuming).
    this.setListeners(false);
  }

  componentDidMount() {
    this.setListeners(true);
  }

  setListeners(mounted) {
    const method = (mounted) ? 'addEventListener' : 'removeEventListener';
    this.view().then((win) => {
      win[method]('resize', this);

      // We can only catch these in the capture phase in the iframe from the CMS preview.
      win[method]('scroll', this, (typeof CMS !== 'undefined'));

      // Toggle mobile navigation
      if (this.domMenuToggle) {
        this.domMenuToggle[method]('click', this);
      }

      // Force close mobile navigation when clicking anywhere (except the toggle button itself)
      win.document[method]('mousedown', this);
      win.document[method]('touchstart', this);
    });
  }

  handleEvent(e) {
    const $ = require('jquery');

    switch (e.type) {
      case 'scroll':
      case 'resize': {
        this.view().then((win) => {
          const scrollTop = $(win).scrollTop();

          // fixed header color change
          this.toggleClass(this.domNavigation, 'navigation--fixed-top', scrollTop > 1);

          // show logo
          this.toggleClass(this.domLogo, 'visible-logo', scrollTop > 150);
        });
        break;
      }

      case 'click':
        $(this.domNavigation).toggleClass('is-open');
        break;

      case 'mousedown':
      case 'touchstart':
        if (!$(e.target).closest('.navigation').length) {
          $(this.domNavigation).removeClass('is-open');
        }
        break;

      default: break;
    }
  }

  toggleClass(node, name, toggle) {
    if (node) {
      if (toggle) {
        node.classList.add(name);
      }
      else {
        node.classList.remove(name);
      }
    }
  }
}
