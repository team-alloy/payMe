import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
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
    } else {
      return (
        <div>
          <div className="ui two column grid">
            <div className="two column row">
              <div className="three wide column">
                <img src="/images/gitchardhubbard.png" alt="sirGitchardHubbard" />
                <UserCardForm {...this.props}/>
              </div>
              <div className="ten wide column">
                <Reminder />
              </div>
            </div>
            <div className="eight wide column centered">
              <Reminder />
            </div>
            <div className="four wide column centered">
              <TipOfTheDay />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { session: state.user };
};

export default connect(mapStateToProps)(HomePage);