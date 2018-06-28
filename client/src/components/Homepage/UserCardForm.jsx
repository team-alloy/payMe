import React from 'react';
import UserCard from './UserCard.jsx';

export default class UserCardForm extends React.Component {
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

  currentDisplay() {
    const {display} = this.state;
    if (display === 'default') {
      return (
        <UserCard />
      )
    }
  }

  userFormDisplay() {
    return (
      <div>
        <label style={{fontWeight: 'bold'}}>User Information</label>
        <form className="ui-form">

          <div className="inline-field">
            <label style={{fontWeight: 'bold'}}>Full Name</label>
            <div className="field">
              <input type="text" placeholder="First Name"></input>
            </div>
            <div className="field">
              <input type="text" placeholder="Last Name"></input>
            </div>
          </div>

          <div className="inline-field">
            <div className="position-field">
              <label style={{fontWeight: 'bold'}}>Position's Title: </label>
              <div className="field">
                <input type="text"></input>
              </div>
            </div>
          </div>

          <div className="inline-field">
            <div className="employer-field">
              <label style={{fontWeight: 'bold'}}>Employer: </label>
              <div className="field">
                <input type="text"></input>
              </div>
            </div>
          </div>

          <div className="inline-field">
            <div className="salary-field">
              <label style={{fontWeight: 'bold'}}>Salary: </label>
              <div className="field">
                <input type="text"></input>
              </div>
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

  render() {
    return (
      <div>
        {/* {this.userFormDisplay()} */}
        {this.currentDisplay()}
      </div>
    )
  }
}
