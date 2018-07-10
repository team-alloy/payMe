import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setApplications } from '../../store/actions/userActions';

import ApplicationHistoryFeedListView from './ApplicationHistoryFeedListView';

export class ApplicationHistoryFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: this.props.session.applications || [],
    };
  }

  render() {
    if (this.props.apps) {
      return (
        <div>
          {this.props.apps.map((app) => {
            return <ApplicationHistoryFeedListView updateApp={this.props.updateApp} apps={app}/>
          })}
        </div>
      );
    }
    return null;
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

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationHistoryFeed);