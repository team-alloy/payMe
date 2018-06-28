import React from 'react';
import ReminderListView from './ReminderListView.jsx';

export default class Reminder extends React.Component {
  constructor(props) {
    super(props);
  }

  reminderContainer() {
    return (
      <table class="ui celled padded table">
        <thead>
          <th>Reminders <i className="calendar outline icon"></i></th>
        </thead>
      </table>
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