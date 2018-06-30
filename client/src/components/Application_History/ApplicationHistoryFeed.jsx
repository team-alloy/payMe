import React from 'react';
import ApplicationHistoryFeedListView from './ApplicationHistoryFeedListView.jsx';
import {connect} from 'react-redux';

 class ApplicationHistoryFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <ApplicationHistoryFeedListView />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {session: state.user};
}
export default connect(mapStateToProps)(ApplicationHistoryFeed);