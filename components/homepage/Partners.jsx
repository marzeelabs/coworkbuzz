import React from 'react';
import BesugoComponent from 'Besugo';
import ReactHtmlParser from 'react-html-parser';

import SVGElements from 'partials/SVGElements';
import TopHeader from 'partials/TopHeader';
import EndFooter from 'partials/EndFooter';

export default class Partners extends BesugoComponent {
  static config = {
    tag: 'Partners',
    categories: [ 'partners' ],
  }

  static extraProps(props, xplaceholder) {
    const content = xplaceholder.getChildren('Content');
    props.content = JSON.parse(content[0].text());

    props.partners = xplaceholder.getChildren('Partner').map(partner => ({
      label: partner.getAttribute('label'),
      link: partner.getAttribute('link'),
      image: partner.getAttribute('image'),
    }));
  }

  getData() {
    if (this.isPreview()) {
      const { entry } = this.props;
      const data = entry.getIn([ 'data' ]);

      return {
        content: this.props.widgetFor('body'),
        partners: (data.getIn([ 'partners' ]) || []).map(partner => ({
          label: partner.getIn([ 'label' ]),
          link: partner.getIn([ 'link' ]),
          image: partner.getIn([ 'image' ]) ? this.props.getAsset(partner.getIn([ 'image' ])).toString() : '',
        })),
      };
    }

    const data = Object.assign({}, this.props);

    // "Content" comes pre-built with HTML markup already.
    // We need to parse it so that it doesn't show up as simple text
    data.content = ReactHtmlParser(data.content);

    return data;
  }

  renderPartners(data) {
    return (!data.partners.size && !data.partners.length) ? null : (
      <div className="partners-wrapper">
        { data.content }
        <div className="partners">
          { data.partners.map(partner => (
            <div className="partners__support" key={ `partner-${partner.name} `}>
              <a href={ partner.link } target="_blank" rel="noopener noreferrer">
                <img src={ partner.image } />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  renderBlock() {
    const data = this.getData();

    return (
      <section className="partners-section">
        <h4 className="section-titles">
          Partners
        </h4>
        <div className="section-titles__underlines" />

        <div className="partners-wrapper partners-main">
          <p>
            { 'Our main partner '}
            <a href="https://marzeelabs.org/" target="_blank" rel="noopener noreferrer">
              Marzee Labs
            </a>
            { ' made this website possible.' }
            <br />
            If you also need an outstanding web experience you can count on them - cowboy style!
          </p>
          <div className="partners">
            <div className="partners__support">
              <a href="http://marzeelabs.org/" target="_blank" rel="noopener noreferrer">
                <img src="/media/home/logo_marzeelabs.jpg" />
              </a>
            </div>
          </div>
        </div>

        { this.renderPartners(data) }
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
