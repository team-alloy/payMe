import React from 'react';
import ApplicationHistoryFeed from './ApplicationHistoryFeed.jsx';
import ApplicationHistoryForm from './ApplicationHistoryForm.jsx';

export default class ApplicationHistoryPage extends React.Component{
  constructor(props){
    super(props);
  }

  applicationHistoryDisplay() {
    return (
      <div>
        <div className="ui four column centered grid">
            <div className="column">
            </div>
            <div className="column">
              <ApplicationHistoryFeed />
            </div>
            <div className="column">
              <ApplicationHistoryFeed />
            </div>
            <div className="column">
            </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.applicationHistoryDisplay()}
        {/* <ApplicationHistoryForm /> */}
      </div>
    )
  }
}