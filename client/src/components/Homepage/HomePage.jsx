import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import UserCard from './UserCard';
import UserCardForm from './UserCardForm';
import TipOfTheDay from './TipOfTheDay';
import Reminder from './Reminder';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'view',
    };
  }

  render() {
<<<<<<< HEAD
    // console.log(this.props)
=======
>>>>>>> render current offers in modal
    if (!this.props.session.user) {
      this.props.history.push('/login');
      return (
        <div>
         Redirecting
        </div>);
    }
    return (
      <div>
        <div className="ui three column grid">
          <div className="three column row">
            <div className="four wide column">
              <Segment raised className="ui teal segment">
                <UserCard {...this.props} />
              </Segment>
              <Segment raised className="ui teal segment">
                <UserCardForm {...this.props} />
              </Segment>
            </div>
            <div className="eight wide column centered">
              <Reminder />
            </div>
            <div className="four wide column centered">
              <TipOfTheDay />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { session: state.user, searchWords: state.searchWords };
};

export default connect(mapStateToProps)(HomePage);
