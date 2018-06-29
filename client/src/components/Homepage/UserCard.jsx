import React from 'react';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    console.log(this.props, 'freaking A')
    return (
      <div>
        <div className="name-display">
          <label htmlFor="name" style={{ fontWeight: 'bold' }}>
            Gitchard Hubbard
          </label>
        </div>

        <div className="email-display">
          <label htmlFor="email" style={{ fontWeight: 'bold' }}>
            Email:
          </label>
          SirGitchardHubbard@gmail.com
        </div>

        <div className="position-display">
          <label htmlFor="position" style={{ fontWeight: 'bold' }}>
            Position:
          </label>
          Software Engineer
        </div>

        <div className="employer-display">
          <label htmlFor="employer" style={{ fontWeight: 'bold' }}>
            Employer:
          </label>
          Google
        </div>

        <div className="salary-display">
          <label htmlFor="salary" style={{ fontWeight: 'bold' }}>
            Current Salary:
          </label>
          $105,000
        </div>
      </div>
    );
  }
}
