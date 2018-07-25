import React from 'react';
import BesugoComponent from 'Besugo';

export default class SocialIcons extends BesugoComponent {
  static config = {
    tag: 'SocialIcons',
  }

  static extraProps(props, xplaceholder) {
    const icons = xplaceholder.getChildren('SocialIcon');
    props.social = icons.map(icon => ({
      name: icon.getAttribute('name'),
      link: icon.getAttribute('link'),
    }));
  }

  getData() {
    // Set some default props
    return {
      section: this.props.section || 'footer',
      social: this.props.social || [
        { name: 'facebook', link: '#' },
      ],
    };
  }

  buildIcons(data) {
    return data.social.map(icon => this.buildIcon(data.section, icon));
  }

  buildIcon(section, icon) {
    // If an empty url was set, don't show the corresponding icon
    if (!icon || !icon.link) {
      return null;
    }

    return (
      <li
        key={`social-li-${icon.name}`}
        className={`${section}__social-icons__item`}
      >
        <a href={icon.link} target="_blank" rel="noopener noreferrer">
          <svg>
            <use href={`#${icon.name}-icon`} />
          </svg>
        </a>
      </li>
    );
  }

  render() {
    const data = this.getData();

    return (
      <div className="social__wrapper">
        <ul className={`${data.section}__social-icons social`}>
          { this.buildIcons(data) }
        </ul>
      </div>
    );
  }
}
