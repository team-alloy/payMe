import React from 'react';
import ApplicationHistoryFeed from './ApplicationHistoryFeed.jsx';
import ApplicationHistoryForm from './ApplicationHistoryForm.jsx';
import {connect} from 'react-redux';
import jquery from 'jquery';
import axios from 'axios';

class ApplicationHistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications:[]
    };
  }

  componentDidMount() {
    if(this.props.session.user) {
      this.getApplicationByUserID((data) => {
        this.setState({
          applications: data
        });
      });
    }
  }
   getApplicationByUserID(callback) {
    var userID = this.props.session.user.id;
      axios.get('/api/applications?user_id='+userID)
      .then((res) => {
        callback(res.data);
        return res;
      });
  }

  makeApplication(query, callback) {
    let appInfo = Object.assign({}, query, {user_id: this.props.session.user.id});
    axios.post('/api/applications', appInfo)
    .then((res) => {
      callback();
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
              <ApplicationHistoryForm makeApp={this.makeApplication.bind(this)}/>
            </div>
            <div className="column">
              <ApplicationHistoryFeed apps={this.state.applications}/>
            </div>
            <div className="column">
              <ApplicationHistoryFeed />
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
export default connect(mapStateToProps)(ApplicationHistoryPage);

