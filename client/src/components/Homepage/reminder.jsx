import React from 'react';
import ReminderListView from './reminderListView.jsx';

export default class Reminder extends React.Component {
  constructor(props) {
    super(props);
  }

  reminderContainer() {
    return (
      <div className="reminder-container">
        <h4>Reminders</h4>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.reminderContainer()}
        <ReminderListView />
      </div>
    )
  }
}