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

  // this function will change the state to form display
  formViewSwitch() {
    this.setState({ display: !this.state.display});
  }

  viewChecker() {
    const { display } = this.state;
    if (display === true) {
      return (
        <div>
          <UserCardForm {...this.props}/>
        </div>
      );
    }
  }

  render() {
    console.log(this.props, '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

    const currentUser = this.props.session.user;
    return (
      <div className="ui teal card">
        <div className="image">
          <img src={currentUser.profile_pic} alt=""/>
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
<<<<<<< 60578c03d342223179d05f4bb74d437403fabd43
          <span className="right floated">
            <div data-tooltip="Edit">
              <Link to="/edit-user">
                <i className="edit icon" />
              </Link>
            </div>
          </span>
=======
          <a>
            <span className="right floated">
              <i className="edit icon" onClick={() => { this.formViewSwitch() }} />
            </span>
          </a>
          { this.viewChecker() }
>>>>>>> Make the applications render dynamically and update when
        </div>
      </div>
    )
  }
}
