import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import UserCard from './UserCard';
import UserCardForm from './UserCardForm';
import TipOfTheDay from './TipOfTheDay';
import Reminder from './Reminder';
<<<<<<< 60578c03d342223179d05f4bb74d437403fabd43
import { Route, Switch } from 'react-router-dom';
=======
import { bindActionCreators } from 'redux';
import { setSession } from '../../store/actions/userActions';
>>>>>>> Make the applications render dynamically and update when

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    console.log(this.props)
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
<<<<<<< 60578c03d342223179d05f4bb74d437403fabd43
=======
              {/* <Segment raised className="ui teal segment">
                <UserCardForm {...this.props} />
              </Segment> */}
>>>>>>> Make the applications render dynamically and update when
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setSession
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
