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
    this.updateApp = this.updateApp.bind(this);
    this.getApplicationByUserID = this.getApplicationByUserID.bind(this);
    this.makeApplication = this.makeApplication.bind(this);
  }

  componentDidMount() {
    const set = this.setState.bind(this);
    if (this.props.session.user) {
      this.getApplicationByUserID((data) => {
        this.props.setApplications(data);
        set({ applications: data });
      });
    }
  }

  getApplicationByUserID(callback) {
    const { id } = this.props.session.user;
    axios.get(`/api/applications?user_id=${id}`)
      .then((res) => {
        callback(res.data);
      });
  }

  makeApplication(query, callback) {
    const { id } = this.props.session.user;
    const appInfo = Object.assign({}, query, { user_id: id });
    axios.post('/api/applications', appInfo)
      .then((res) => {
        this.getApplicationByUserID((data) => {
          this.setState({ applications: data });
        });
        callback();
      });
  }

  updateApp(query, modalState) {
    axios.patch(`/api/applications/?id=${query}`, modalState)
      .then((res) => {
        this.getApplicationByUserID((data) => {
          this.setState({ applications: data });
        });
      });
  }

  render() {
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
                  getApps={this.getApplicationByUserID}
                  makeApp={this.makeApplication}
                />
              </div>
              <div className="column">
                <ApplicationHistoryFeed updateApp={this.updateApp} apps={this.state.applications}/>
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
