import React from 'react';
import BesugoComponent from 'Besugo';

import { SrcSetBg } from 'SrcSet';
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
        <SrcSetBg
          src="media/home/intro.jpg"
          sizes="100vw"
        />

        <div className="intro-section__inner">
          <div className="intro-section__title">
            <div className="logo-cowork__wrapper">
              <img src="media/home/logo/logo_cowork_baloon.svg" className="logo_baloon" />
              <img src="media/home/logo/logo_cowork_c.svg" className="logo_letter_c" />
              <img src="media/home/logo/logo_cowork_o.svg" className="logo_letter_o" />
              <img src="media/home/logo/logo_cowork_w.svg" className="logo_letter_w" />
              <img src="media/home/logo/logo_cowork_o_2.svg" className="logo_letter_o2" />
              <img src="media/home/logo/logo_cowork_r.svg" className="logo_letter_r" />
              <img src="media/home/logo/logo_cowork_k.svg" className="logo_letter_k" />
              <img src="media/home/logo/logo_cowork_line.svg" className="logo_line_separator" />
              <img src="media/home/logo/logo_cowork_b.svg" className="logo_letter_b" />
              <img src="media/home/logo/logo_cowork_u.svg" className="logo_letter_u" />
              <img src="media/home/logo/logo_cowork_z.svg" className="logo_letter_z" />
              <img src="media/home/logo/logo_cowork_z_2.svg" className="logo_letter_z2" />
              <img src="media/home/logo/logo_cowork_line2.svg" className="logo_top-line1" />
              <img src="media/home/logo/logo_cowork_line3.svg" className="logo_top-line2" />
              <img src="media/home/logo/logo_cowork_line4.svg" className="logo_top-line3" />
            </div>

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
