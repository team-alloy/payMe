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
    console.log(this.props.user)
    const currentUser = this.props;
    return (
      <div className="ui teal card">
        <div className="image">
          <img src="/images/gitchardhubbard.png" alt=""/>
        </div>
        <div className="content">
          <a>
            {`${currentUser.user.first_name} ${currentUser.user.last_name}`}
          </a>
          <div className="meta">
            <span className="description">
              {`${currentUser.user.active_role}` + ' at Google'}
            </span>
          </div>
        </div>
        <div className="extra content">
          <a>
            <i className="envelope icon"></i>
            {currentUser.user.email}
            <br />
          </a>
          <a>
            <i className="dollar sign icon"></i>
            {currentUser.user.current_salary}
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
