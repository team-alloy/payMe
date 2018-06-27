import React from 'react';

export default class ApplicationHistoryFeedListView extends React.Component {
  constructor(props) {
    super(props);
  }

  // applications
    //application id
    //role id
    //location
    //applied date

  applicationsDisplay() {
    return (
      <div>
        <div className="application-history-container">
          <label><b>Company's Name</b></label>
            <div className="role-display">
              <label><b>Position: </b></label>Senior Software Engineer
            </div>
            <div className="location-display">
              <label><b>Location: </b></label>San Francisco, CA
            </div>
            <div className="applied-date-display">
              <label><b>Application Date: </b></label>1/1/2018
            </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.applicationsDisplay()}
      </div>
    )
  }
}