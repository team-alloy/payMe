import React, { Fragment } from 'react';
import ReminderListView from './ReminderListView';

export default class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Fragment>
        <ReminderListView />
      </Fragment>
    );
  }
}
