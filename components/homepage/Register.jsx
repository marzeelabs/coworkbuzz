import React from 'react';
import BesugoComponent from 'Besugo';
import ReactHtmlParser from 'react-html-parser';

import SVGElements from 'partials/SVGElements';
import TopHeader from 'partials/TopHeader';
import EndFooter from 'partials/EndFooter';

export default class Register extends BesugoComponent {
  static config = {
    tag: 'Register',
    categories: [ 'register' ],
  }

  static extraProps(props, xplaceholder) {
    const content = xplaceholder.getChildren('Content');
    props.content = JSON.parse(content[0].text());

    props.tickets = xplaceholder.getChildren('Ticket').map(ticket => ({
      name: ticket.getAttribute('name'),
      price: ticket.getAttribute('price'),
      option: ticket.getAttribute('option'),
    }));
  }

  getData() {
    if (this.isPreview()) {
      const { entry } = this.props;
      const data = entry.getIn([ 'data' ]);

      return {
        ticketurl: '#',
        header: data.getIn([ 'header' ]),
        content: this.props.widgetFor('body'),
        tickets: (data.getIn([ 'tickets' ]) || []).map(ticket => ({
          name: ticket.getIn([ 'name' ]),
          price: ticket.getIn([ 'price' ]),
          option: ticket.getIn([ 'option' ]),
        })),
      };
    }

    const data = Object.assign({}, this.props);

    // "Content" comes pre-built with HTML markup already.
    // We need to parse it so that it doesn't show up as simple text
    data.content = ReactHtmlParser(data.content);

    return data;
  }

  renderTickets(data) {
    return data.tickets.map(ticket => (
      <div className="register-option" key={ ticket.name }>
        <h4 className="register-option__title">
          { ticket.name }
        </h4>
        <div className="register-option__price">
          { ticket.price }
        </div>
        <div className="register-option__note">
          { ticket.option }
        </div>
        <a className="register-option__action" href={ data.ticketurl } target="_blank" rel="noopener noreferrer">
          Get ticket!
        </a>
      </div>
    ));
  }

  renderBlock() {
    const data = this.getData();

    return (
      <section className="register-section" id="register-section">
        <h4 className="section-titles">
          { data.header }
        </h4>
        <div className="section-titles__underlines" />
        <div className="section-titles__subtitle">
          { data.content }
        </div>
        <div className="register-options__wrapper">
          { this.renderTickets(data) }
        </div>
      </section>
    );
  }

  renderPreview() {
    return (
      <div id="cmsPreview">
        <SVGElements />
        <TopHeader />
        { this.renderBlock() }
        <EndFooter />
      </div>
    );
  }
}
