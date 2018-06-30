import React from 'react';

export default class ApplicationHistoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h4>
          Application Information:
        </h4>
        <form className="ui-form">
          <label htmlFor="name">
            <b>
              {'Company\'s Name'}
            </b>
            <br />
          </label>
          <div className="app-field">
            <textarea className="company-name" placeholder="Company's Name" />
          </div>
          <label htmlFor="position">
            <b>
              {'Position Title: '}
            </b>
            <br />
          </label>
          <div className="app-field">
            <textarea className="position-name" placeholder="Position's Title" />
          </div>
          <label htmlFor="location">
            <b>
              {'Position Location: '}
            </b>
            <br />
          </label>
          <div className="app-field">
            <textarea className="location-name" placeholder="Company's Location" />
          </div>
          <label htmlFor="date">
            <b>
              {'Application Date: '}
            </b>
            <br />
          </label>
          <div className="app-field">
            <input className="date-name" type="date" />
          </div>
        </form>
        <div className="button-container">
          <button className="ui-button-cancel" type="reset">
            Cancel
          </button>
          <button className="ui-button-confirm" type="submit">
            Confirm
          </button>
        </div>
      </div>
    );
  }
}
