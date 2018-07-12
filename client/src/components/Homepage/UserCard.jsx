import React from 'react';
import UserCardForm from './UserCardForm';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // Iterate through all the available roles
  // and display the current role + company onto the user's profile
  handleDisplayRoles() {
    let temp = '';

    for (let i = 0; i < this.props.roles.length; i++) {
      if (this.props.roles[i].id === this.props.user.active_role) {
        temp = `${this.props.roles[i].name} at ${this.props.roles[i].company.name}`;
      }
    }
    return temp;
  }

  render() {
    const { user } = this.props;
    if (!user) {
      return (
        <div />
      );
    }
    return (
      <div className="ui teal card">
        <div className="image">
          <img src={user.profile_pic} alt="" />
        </div>
        <div className="content">
          <a>
            {`${user.first_name} ${user.last_name}`}
          </a>
          <div className="meta">
            <span className="description">
              {this.props.roles ? this.handleDisplayRoles() : undefined}
            </span>
          </div>
        </div>
        <div className="extra content">
          <a>
            <div data-tooltip="Email">
              <i className="envelope icon" />
              {user.email}
            </div>
          </a>
          <a>
            <div data-tooltip="Current Salary">
              <i className="dollar sign icon" />
              {user.current_salary}
            </div>
          </a>
          <a>
            <div>
              <UserCardForm
                update={this.props.update} user={this.props.user} roles={this.props.roles}
              />
            </div>
          </a>
        </div>
      </div>
    );
  }
}
