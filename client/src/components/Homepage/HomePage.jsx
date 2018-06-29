import React from 'react';
import { connect } from 'react-redux';
import UserCardForm from './UserCardForm';
import TipOfTheDay from './TipOfTheDay';
import Reminder from './Reminder';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if (!this.props.session.user) {
      this.props.history.push('/login');
      return (
        <div>
         Redirecting
        </div>);
    }
    return (
      <div>
        <div className="ui two column grid">
          <div className="two column row">
            <div className="three wide column">
              <img src="/images/gitchardhubbard.png" alt="sirGitchardHubbard" />
              <UserCardForm {...this.props} />
            </div>
            <div className="ten wide column">
              <Reminder />
            </div>
          </div>
          <div className="row">
            <div className="three wide column" />
            <div className="ten wide column">
              <TipOfTheDay />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { session: state.user };
};

export default connect(mapStateToProps)(HomePage);
