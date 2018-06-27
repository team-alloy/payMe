import React from 'react';

export default class ApplicationHistoryForm extends React.Component {
  constructor(props) {
    super(props);
  }

  historyFormDisplay() {
    return (
      <div>
        <label style={{fontWeight: 'bold'}}>Application Information:</label>
        <form className="ui-form">
          <div className="app-field">
            <input className="company-name" placeholder="Company's Name"></input>
          </div>
          <div className="app-field">
            <input className="position-name" placeholder="Position's Title"></input>
          </div>
          <div className="app-field">
            <input className="location-name" placeholder="Company's Location"></input>
          </div>
          <div className="app-field">
            <input className="date-name" placeholder="Date Applied"></input>
          </div>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.historyFormDisplay()}
      </div>
    )
  }
}