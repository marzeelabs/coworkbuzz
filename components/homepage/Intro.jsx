import React from 'react';
import BesugoComponent from 'Besugo';

import SVGElements from 'partials/SVGElements';
import TopHeader from 'partials/TopHeader';
import EndFooter from 'partials/EndFooter';

export default class Intro extends BesugoComponent {
  static config = {
    tag: 'Intro',
    categories: [ 'intro' ],
  }

  getData() {
    if (this.isPreview()) {
      const { entry } = this.props;
      const data = entry.getIn([ 'data' ]);

      return {
        ticketurl: '#',
        when: data.getIn([ 'when' ]),
        where: data.getIn([ 'where' ]),
      };
    }

    return this.props;
  }

  renderBlock() {
    const data = this.getData();

    return (
      <section className="intro-section" id="intro-section">
        <div className="intro-section__inner">
          <div className="intro-section__title">
            <img src="/media/home/coworkbuzz_logo.png" />

            <a className="intro-section__action" href={ data.ticketurl } target="_blank" rel="noopener noreferrer">
              Get ticket
            </a>

            <span className="intro-section__subtitle">
              { data.when }
              <br />
              { `in ${data.where}` }
            </span>
          </div>
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
