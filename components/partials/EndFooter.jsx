import React from 'react';
import BesugoComponent from 'Besugo';
import SocialIcons from 'partials/SocialIcons';

export default class EndFooter extends BesugoComponent {
  static config = {
    tag: 'EndFooter',
  }

  static extraProps(props, xplaceholder) {
    const icons = xplaceholder.getChildren('SocialIcon');
    props.social = icons.map(icon => ({
      name: icon.getAttribute('name'),
      link: icon.getAttribute('link'),
    }));
  }

  render() {
    const data = this.props;

    return (
      <footer className="footer">
        <div className="footer__copyright">
          <p>
            Cowork Buzz brought to you by your friends at
            {' '}
            <a href="http://porto.io" target="_blank" rel="noopener noreferrer">
              Porto i/o
            </a>
            {' '}
            since 2016.
          </p>
        </div>
        <div className="footer__social">
          <p>
            Follow us and spread the word
            {' '}
            <strong>
              #CoworkBuzz
            </strong>
          </p>
          <SocialIcons section="footer" { ...data } />
        </div>
      </footer>
    );
  }
}
