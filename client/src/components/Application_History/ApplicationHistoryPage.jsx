import React from 'react';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setApplications } from '../../store/actions/userActions';

import ApplicationHistoryFeed from './ApplicationHistoryFeed';
import ApplicationHistoryForm from './ApplicationHistoryForm';

class ApplicationHistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: this.props.session.applications,
    };
    this.handleUpdateApp = this.handleUpdateApp.bind(this);
    this.handleGetApplicationByUserId = this.handleGetApplicationByUserId.bind(this);
    this.handleMakeApplication = this.handleMakeApplication.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
// on state change rerender feed with updated applications
  componentDidMount() {
    const set = this.setState.bind(this);
    if (this.props.session.user) {
      this.handleGetApplicationByUserId((data) => {
        this.props.setApplications(data);
        set({ applications: data });
      });
    }
  }

  // Get the user's application
  handleGetApplicationByUserId(callback) {
    const { id } = this.props.session.user;
    axios.get(`/api/applications?user_id=${id}`)
      .then((res) => {
        callback(res.data);
      });
  }

  handleMakeApplication(query, callback) {
    const { id } = this.props.session.user;
    const appInfo = Object.assign({}, query, { user_id: id });
    axios.post('/api/applications', appInfo)
      .then((res) => {
        this.handleGetApplicationByUserId((data) => {
          this.setState({ applications: data });
        });
        callback();
      });
  }

  handleUpdateApp(query, modalState) {
    axios.patch(`/api/applications/?id=${query}`, modalState)
      .then((res) => {
        this.handleGetApplicationByUserId((data) => {
          this.setState({ applications: data });
        });
      });
  }
// delete selected application and updates feed accordingly
  handleDelete(id) {
    axios.delete('/api/applications?id='+id + '&user_id=' + this.props.session.user.id)
    .then((res) => {
      this.handleGetApplicationByUserId((data) => {
        this.setState({ applications: data });
      });
    })
  }


  render() {
    // if user is not logged in redirect to homepage
    if (!this.props.session.user) {
      this.props.history.push('/login');
      return (
        <div>
         Redirecting
        </div>
      );
    }
    return (
      <div className="ui equal width three column grid">
        <div className="one wide column" />
        <div className="column">
          <div className="ui equal width grid">
            <div className="equal width row">
              <div className="column">
                <ApplicationHistoryForm
                  getApps={this.handleGetApplicationByUserId}
                  makeApp={this.handleMakeApplication}
                />
              </div>
              <div className="column">
                <ApplicationHistoryFeed
                  updateApp={this.handleUpdateApp}
                  apps={this.state.applications}
                  delete={this.handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="one wide column>" />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { session: state.user }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setApplications
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationHistoryPage);
