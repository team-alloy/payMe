import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { setSession } from '../../store/actions/userActions';

import Reminder from './Reminder';
import TipOfTheDay from './TipOfTheDay';
import UserCard from './UserCard';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentRoles: this.props.session.user.active_role,
      currentUser: this.props.session.user,
    };
    this.handleUserCardUpdate = this.handleUserCardUpdate.bind(this);
    this.handleGetAppliedRoles = this.handleGetAppliedRoles.bind(this);
    this.handleGetUserInformation = this.handleGetUserInformation.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { user } = this.props.session;
    if (user) {
      this.handleGetUserInformation((res) => {
        this.setState({ currentUser: res });
      })
    }
  }

  handleGetAppliedRoles(callback) {
    axios.get(`/api/roles?user_id=${this.props.session.user.id}`).then((res) => {
      callback(res.data);
    })
      .catch(err => console.error(err));
  }

  handleGetUserInformation(callback) {
    if (!this.props.session.user) {
      this.props.history.push('/login');
    }
    axios.get(`api/user?id=${this.props.session.user.id}`)
      .then((res) => {
        this.handleGetAppliedRoles((data) => {
          this.setState({ currentRoles : data})
        });
        callback(res.data);
      });
  }

  handleUserCardUpdate(id, query) {
    axios.patch((`/api/user?id=${id}`), query)
      .then((res) => {
        this.handleGetUserInformation((data) => {
          this.setState({ currentUser: data });
        });
      });
  }

  render() {
    if (!this.props.session.user) {
      this.props.history.push('/login');
      return (
        <div>
         Redirecting
        </div>);
    }
    if (this.state.currentUser.length === 0) {
      return (
        <div />
      );
    }
    console.log('THIS IS PROPS ', this.props)
    console.log('THIS IS STATE', this.state)
    return (
      <div>
        <div className="ui three column grid">
          <div className="three column row">
            <div className="four wide column">
              <Segment raised className="ui teal segment">
                <UserCard {...this.props} 
                  key={this.state.currentUser.id}
                  user={this.state.currentUser[0]}
                  update={this.handleUserCardUpdate}
                  roles={this.state.currentRoles}
                />
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setSession,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
