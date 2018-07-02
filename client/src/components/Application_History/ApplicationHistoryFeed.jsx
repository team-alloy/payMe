import React from 'react';
import ApplicationHistoryFeedListView from './ApplicationHistoryFeedListView';

export default class ApplicationHistoryFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if(this.props.apps) {
      return (
        <div>
        {this.props.apps.map((app) => {
          return <ApplicationHistoryFeedListView apps={app}/>
        })}
        </div>
      );
    } else {
      return null;
    }

  }
}
