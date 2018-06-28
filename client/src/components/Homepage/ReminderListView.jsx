import React from 'react';

export default class ReminderListView extends React.Component {
  constructor(props) {
    super(props);
  }

  reminderListDisplay() {
    return (
      <table class="ui celled striped table">
        <tbody>
          <tr>
            <div className="reminder-display">
              <td className="single line">Don't forget to buy milk!</td>
            </div>
          </tr>
          <tr>
            <div className="reminder-display">
              <td>Interview with Google in 3 hours.</td>
            </div>
          </tr>
          <tr>
            <div className="reminder-display">
              <td>Interview with LinkedIn in 4 days.</td>
            </div>
          </tr>
          <tr>
            <div className="reminder-display">
              <td>Follow-up with Netflix's interview in 3 days.</td>
            </div>
          </tr>
        </tbody>
      </table>
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