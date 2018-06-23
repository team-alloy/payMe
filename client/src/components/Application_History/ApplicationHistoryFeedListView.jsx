import React from 'react';
import applicationHistoryFeed from './ApplicationHistoryFeed.jsx';

export default class ApplicationHistoryFeedListView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        This class will inherit the application feed and render the individual feeds.
      </div>
    )
  }
}