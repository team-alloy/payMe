import React from 'react';
import UserCardForm from './UserCardForm';
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'default',
    };
  }

  render() {
    const currentUser = this.props.session.user;
    return (
      <div className="ui teal card">
        <div className="image">
          <img src="/images/gitchardhubbard.png" alt=""/>
        </div>
        <div className="content">
          <a>
            {`${currentUser.first_name} ${currentUser.last_name}`}
          </a>
          <div className="meta">
            <span className="description">
              {currentUser.active_role[0] ? `${currentUser.active_role[0].name} at ${currentUser.active_role[0].company.name}` : undefined}
            </span>
          </div>
        </div>
        <div className="extra content">
          <a>
            <div data-tooltip="Email">
              <i className="envelope icon"></i>
              {currentUser.email}
            </div>
            <br />
          </a>
          <a>
            <div data-tooltip="Current Salary">
              <i className="dollar sign icon"></i>
              {currentUser.current_salary}
            </div>
          </a>
          <span className="right floated">
            <div data-tooltip="Edit">
              <Link to="/UserCardForm">
                <i className="edit icon" />
              </Link>
            </div>
          </span>
        </div>
      </div>
    )
  }
}
