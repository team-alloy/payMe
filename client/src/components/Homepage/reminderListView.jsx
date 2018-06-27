import React from 'react';

export default class reminderListView extends React.Component {
  constructor(props) {
    super(props);
  }

  reminderListDisplay() {
    return (
      <div>
        <div className="reminder-display">
          <li>Don't forget to buy milk!</li>
        </div>

        <div className="reminder-display">
          <li>Interview with Google in 3 hours.</li>
        </div>

        <div className="reminder-display">
          <li>Interview with LinkedIn in 4 days.</li>
        </div>

        <div className="reminder-display">
          <li>Follow-up with Netflix's interview in 3 days.</li>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.reminderListDisplay()}
      </div>
    )
  }
}