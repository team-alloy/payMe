import React from 'react';
import ApplicationHistoryFeed from './ApplicationHistoryFeed.jsx';
import ApplicationHistoryForm from './ApplicationHistoryForm.jsx';
import {connect} from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { setApplications } from '../../store/actions/userActions'

class ApplicationHistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: this.props.session.applications
    };
    this.updateApp = this.updateApp.bind(this);
  }

  componentDidMount() {
    const set = this.setState.bind(this);
    if(this.props.session.user) {
      this.getApplicationByUserID((data) => {
        this.props.setApplications(data);
        set({applications: data})
      });
    }
  }
   getApplicationByUserID(callback) {
    let {id} = this.props.session.user;
      axios.get('/api/applications?user_id='+id)
      .then((res) => {
        callback(res.data);
        // return res;
      });
  }

  makeApplication(query, callback) {
    let appInfo = Object.assign({}, query, {user_id: this.props.session.user.id});
    axios.post('/api/applications', appInfo)
    .then((res) => {
      this.getApplicationByUserID((data) => {
        this.setState({applications: data});
      });
      callback();
    })
  }

  updateApp(query, modalState) {
    axios.patch('/api/applications/?id='+query, modalState)
    .then((data) => {
      console.log(data,'DATA');
      this.getApplicationByUserID((data) => {
      this.setState({applications: data});
      });
    })
  }

  render() {
    if(!this.props.session.user) {
      this.props.history.push('/login');
      return (<div>Redirecting</div>);
    } else {
        return (
        <div>
          <div className="ui three column grid">
            <div className="column">
              <ApplicationHistoryForm getApps={this.getApplicationByUserID.bind(this)} makeApp={this.makeApplication.bind(this)}/>
            </div>
            <div className="column">
              <ApplicationHistoryFeed updateApp={this.updateApp} apps={this.state.applications}/>
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {session: state.user}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setApplications
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationHistoryPage);

