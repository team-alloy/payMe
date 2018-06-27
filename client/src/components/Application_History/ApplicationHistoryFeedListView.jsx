import React from 'react';
import ApplicationHistoryForm from 'react';

export default class ApplicationHistoryFeedListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'default',
    }
  }

  displayChanger() {
    this.setState({
      display: 'form',
    })
  }

  applicationsDisplay() {
    return (
      <div>
        <div className="application-history-container">
          <label className="company-name" style={{fontWeight: 'bold'}}>Company's Name</label>
            <div className="role-display">
              <label style={{fontWeight: 'bold'}}>Position: </label>Senior Software Engineer
            </div>
            <div className="location-display">
              <label style={{fontWeight: 'bold'}}>Location: </label>San Francisco, CA
            </div>
            <div className="applied-date-display">
              <label style={{fontWeight: 'bold'}}>Application Date: </label>1/1/2018
            </div>
        </div>
        <div className="edit-button-container">
          <button className="ui-button-edit" tabIndex="0" onClick={() => {this.displayChanger()}}>Update</button>
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