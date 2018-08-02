import React from 'react';
import BesugoComponent from 'Besugo';
import ReactHtmlParser from 'react-html-parser';

export default class About extends BesugoComponent {
  static config = {
    tag: 'About',
    categories: [ 'about' ],
  }

  static extraProps(props, xplaceholder) {
    const content = xplaceholder.getChildren('Content');
    props.content = JSON.parse(content[0].text());
  }

  getData() {
    if (this.isPreview()) {
      const { entry } = this.props;
      const data = entry.getIn([ 'data' ]);

      return {
        header: data.getIn([ 'header' ]),
        content: this.props.widgetFor('body'),
      };
    }

    const data = Object.assign({}, this.props);

    // "Content" comes pre-built with HTML markup already.
    // We need to parse it so that it doesn't show up as simple text
    data.content = ReactHtmlParser(data.content);

    return data;
  }

  render() {
    const data = this.getData();

    return (
      <section id="about-section" className="about-section">
        <h4 className="section-titles">
          { data.header }
        </h4>

        <div className="section-titles__underlines" />

        { data.content }
      </section>
    );
  }
}
