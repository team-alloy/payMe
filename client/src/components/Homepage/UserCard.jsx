import React from 'react';
import UserCardForm from './UserCardForm';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'default',
    };
  }

  // this function will change the state to form display
  handleFormViewSwitch() {
    const { display } = this.state;
    this.setState({ display });
  }

  handleViewChecker() {
    const { display } = this.state;
    if (display === true) {
      return (
        <div>
          <UserCardForm {...this.props} />
        </div>
      );
    }
    return null;
  }

  render() {
    const { user } = this.props.session;
    return (
      <div className="ui teal card">
        <div className="image">
          <img src={user.profile_pic} alt=""/>
        </div>
        <div className="content">
          <a>
            {`${user.first_name} ${user.last_name}`}
          </a>
          <div className="meta">
            <span className="description">
              {user.active_role !== null ? `${user.active_role[0].name} at ${user.active_role[0].company.name}` : undefined}
            </span>
          </div>
        </div>
        <div className="extra content">
          <a>
            <div data-tooltip="Email">
              <i className="envelope icon" />
              {user.email}
            </div>
            <br />
          </a>
          <a>
            <div data-tooltip="Current Salary">
              <i className="dollar sign icon" />
              {user.current_salary}
            </div>
          </a>
          <a>
            <span className="right floated">
              <i className="edit icon" onClick={() => { this.handleFormViewSwitch() }} />
            </span>
          </a>
          { this.handleViewChecker() }
        </div>
      </div>
    );
  }
}
