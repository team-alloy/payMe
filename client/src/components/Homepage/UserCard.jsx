import React from 'react';
import UserCardForm from './UserCardForm';
import { Segment } from 'semantic-ui-react';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'default',
    };
  }

  // this function will change the state to form display
  formViewSwitch() {
    this.setState({ display: 'form' });
  }

  // this function will change the state to form display
  formViewSwitch() {
    this.setState({ display: 'form' });
  }

  viewChecker() {
    const { display } = this.state;
    if (display === 'form') {
      return (
        <div>
          <UserCardForm />
        </div>
      );
    }
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
            <i className="envelope icon"></i>
            {currentUser.email}
            <br />
          </a>
          <a>
            <i className="dollar sign icon"></i>
            {currentUser.current_salary}
          </a>
          {/* <a>
            <span className="right floated">
              <i className="edit icon" onClick={() => { this.formViewSwitch() }} />
            </span>
          </a> */}
          {/* { this.viewChecker() } */}
        </div>
      </div>
    )
  }
}
