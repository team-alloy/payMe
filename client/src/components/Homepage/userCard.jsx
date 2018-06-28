import React from 'react';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
  }

  userCardDisplay() {
    return (
      <div>
        <div className="user-card-container">
          <div className="name-display">
            <label style={{fontWeight: 'bold'}}>Richard Hubbard</label>
          </div>

          <div className="email-display">
            <label style={{fontWeight: 'bold'}}>Email: </label>SirRichardHubbard@gmail.com
          </div>

          <div className="position-display">
            <label style={{fontWeight: 'bold'}}>Position: </label>Software Engineer
          </div>

          <div className="employer-display">
            <label style={{fontWeight: 'bold'}}>Employer: </label>Google
          </div>

          <div className="salary-display">
            <label style={{fontWeight: 'bold'}}>Current Salary: </label>$105,000
          </div>

        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.userCardDisplay()}
      </div>
    )
  }
}