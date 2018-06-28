import React from 'react';
import ApplicationHistoryFeedListView from './ApplicationHistoryFeedListView.jsx';

export default class ApplicationHistoryFeed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ApplicationHistoryFeedListView />
      </div>
    )
  }
}