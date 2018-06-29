import React from 'react';
import ReminderListView from './ReminderListView';

export default class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <table className="ui celled padded table">
          <thead>
            <th>
              Reminders
              <i className="calendar outline icon" />
            </th>
          </thead>
        </table>
        <ReminderListView />
      </div>
    );
  }
}
