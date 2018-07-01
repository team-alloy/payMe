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
    });
  }

  render() {
    console.log(this.props.apps,'histFeedView');
    return (
      <div>
        <div className="application-history-container">
          <label className="company-name" htmlFor="name" style={{ fontWeight: 'bold' }}>
            {this.props.apps.role.company.name}
          </label>
          <div className="role-display">
            <label htmlFor="position" style={{ fontWeight: 'bold' }}>
              {'Position Title: '}
            </label>
              {this.props.apps.role.name}
          </div>
          <div className="location-display">
            <label htmlFor="location" style={{ fontWeight: 'bold' }}>
              {'Position Location: '}
            </label>
              {this.props.apps.location}
          </div>
          <div className="applied-date-display">
            <label htmlFor="date" style={{ fontWeight: 'bold' }}>
              {'Application Date: '}
            </label>
              1/1/2018
          </div>
        </div>
        <div className="edit-button-container">
          <button className="ui-button-edit" type="submit" onClick={() => { this.displayChanger(); }}>
            Update
          </button>
        </div>
      </div>
    );
  }
}
