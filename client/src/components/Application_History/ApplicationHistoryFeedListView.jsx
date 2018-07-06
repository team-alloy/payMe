import React from 'react';
import ApplicationHistoryForm from 'react';
import ApplicationOffersModal from './ApplicationOffersModal.jsx';
import ApplicationUpdateModal from './ApplicationUpdateModal.jsx';

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
    return (
      <div>
        <div className="application-history-container">
          <label className="company-name" htmlFor="name" style={{ fontWeight: 'bold' }}>
            {'Company: '}
          </label>
          {this.props.apps.role.company.name}
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
              {`${this.props.apps.city}, ${this.props.apps.state}`}
          </div>
          <div className="applied-date-display">
            <label htmlFor="date" style={{ fontWeight: 'bold' }}>
              {'Application Date: '}
            </label>
            {new Date(this.props.apps.application_date).toLocaleDateString()}
          </div>
        </div>
        <div className="edit-button-container">
          <ApplicationUpdateModal />
          <ApplicationOffersModal appID={this.props.apps.id}/>
        </div>
      </div>
    );
  }
          //   <button className="ui-button-edit" type="submit" onClick={() => { this.displayChanger(); }}>
          //   Update
          // </button>
}

