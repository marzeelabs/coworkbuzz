import React from 'react';
import BesugoComponent from 'Besugo';
import ReactHtmlParser from 'react-html-parser';

export default class ScheduleDay extends BesugoComponent {
  static config = {
    tag: 'ScheduleDay',
    categories: [ 'schedule' ],
  }

  static extraProps(props, xplaceholder) {
    const content = xplaceholder.getChildren('Content');
    props.content = JSON.parse(content[0].text());

    props.plan = xplaceholder.getChildren('Slot').map(slot => ({
      slot: slot.getAttribute('slot'),
      name: slot.getAttribute('name'),
      break: slot.getAttribute('break') === 'true',
      subs: JSON.parse(slot.getChildren('Subs')[0].text()) || [],
    }));
  }

  getData() {
    if (this.isPreview()) {
      const { entry } = this.props;
      const data = entry.getIn([ 'data' ]);

      return {
        name: data.getIn([ 'name' ]),
        day: data.getIn([ 'day' ]),
        content: this.props.widgetFor('body'),
        plan: (data.getIn([ 'plan' ]) || []).map(slot => ({
          slot: slot.getIn([ 'slot' ]),
          name: slot.getIn([ 'name' ]),
          break: slot.getIn([ 'break' ]),
          subs: (slot.getIn([ 'subs' ]) || []).map(sub => ({
            label: sub.getIn([ 'label' ]),
          })),
        })),
      };
    }

    const data = Object.assign({}, this.props);

    // "Content" comes pre-built with HTML markup already.
    // We need to parse it so that it doesn't show up as simple text
    data.content = ReactHtmlParser(data.content);

    return data;
  }

  renderDescription(data) {
    return (!data.content) ? null : (
      <div className="schedule__subtitle">
        { data.content }
      </div>
    );
  }

  renderPlan(data) {
    return data.plan.map((slot) => {
      let className = 'schedule__line';
      if (slot.break) {
        className += ' schedule__line--break';
      }

      const subs = (!slot.subs.length) ? null : (
        <ul>
          { slot.subs.map(sub => (
            <li key={ `schedule-line-sub-${sub.label}` }>
              { sub.label }
            </li>
          )) }
        </ul>
      );

      return (
        <div className={ className } key={ `schedule-line-${slot.name}` }>
          <div className="schedule__line__inner">
            <div className="schedule__line-hour">
              { slot.slot }
            </div>
            <div className="schedule__line-speaker">
              { slot.name }
              { subs }
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const data = this.getData();

    return (
      <div className="schedule">
        <div className="schedule__title">
          { data.name }
        </div>
        <div className="schedule__subtitle">
          { data.day }
        </div>
        { this.renderDescription(data) }
        <div className="schedule__times">
          { this.renderPlan(data) }
        </div>
      </div>
    );
  }
}
