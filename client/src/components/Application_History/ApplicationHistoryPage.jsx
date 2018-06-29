import React from 'react';
import ApplicationHistoryFeed from './ApplicationHistoryFeed.jsx';
import ApplicationHistoryForm from './ApplicationHistoryForm.jsx';

export default class ApplicationHistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div className="ui three column grid">
          <div className="column">
            <ApplicationHistoryForm />
          </div>
          <div className="column">
            <ApplicationHistoryFeed />
          </div>
          <div className="column">
            <ApplicationHistoryFeed />
          </div>
        </div>
        {/* <ApplicationHistoryForm /> */}
      </div>
    );
  }
}
