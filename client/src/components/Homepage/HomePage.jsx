import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
<<<<<<< HEAD
import UserCard from './UserCard';
=======
import UserCard from './UserCardForm';
>>>>>>> Implementing userCardForm switch
import TipOfTheDay from './TipOfTheDay';
import Reminder from './Reminder';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    // console.log(this.props)
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
<<<<<<< HEAD
                <Segment raised className="ui teal segment">
                  <UserCardForm {...this.props} />
                </Segment>
=======
              <table className="ui celled striped table">
                <tbody>
                  <tr>
                    <Segment raised className="ui teal segment">
                      <UserCard {...this.props} />
                    </Segment>
                  </tr>
                </tbody>
              </table>
>>>>>>> Implementing userCardForm switch
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