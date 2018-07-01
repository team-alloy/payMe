import React from 'react';
import UserCard from './UserCard';
import { connect } from 'react-redux';

export default class UserCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      position: '',
      employer: '',
      salary: '',
    };

    this.positionChange = this.positionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  positionChange(event) {
    this.setState({ position: event.target.value })
  }

  handleSubmit(event) {
    console.log('submitted! ' + this.state.position);
    event.preventDefault();
  }

  render() {
    return (
      <div className="ui teal card">
        <h4 className="ui dividing header left aligned segment">Edit User's Profile</h4>
        <form className="ui-form" onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="left aligned segment" style={{ fontWeight: 'bold' }}>
              Full Name
            </div>
            <div className="inline fields">
              <div className="field">
                <input type="text" placeholder="First Name"></input>
              </div>
              <div className="field">
                <input type="text" placeholder="Last Name"></input>
              </div>
            </div>
          </div>

          <div className="field">
            <label style={{fontWeight: 'bold'}}>
              {'Position\'s Title: '} 
            </label>
            <div className="field">
              <input type="text" value={this.state.position} onChange={this.positionChange}></input>
            </div>
          </div>

          <div className="field">
            <label style={{fontWeight: 'bold'}}>
              {'Employer: '}
            </label>
            <div className="field">
              <input type="text" />
            </div>
          </div>

          <div className="field">
            <label style={{fontWeight: 'bold'}}>
              {'Current Salary: '}
            </label>
            <div className="field">
              <input type="text" />
            </div>
          </div>

        <div className="button-container">
          <button className="ui-button-cancel" tabIndex="0">Cancel</button>
          <button className="ui-button-confirm" tabIndex="1">Confirm</button>
        </div>

        </form>
      </div>
    )
  }
}

