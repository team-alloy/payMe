import React from 'react';
import ApplicationHistoryFeed from './ApplicationHistoryFeed.jsx';
// import ApplicationHistoryForm from './ApplicationHistoryForm';

export default class ApplicationHistoryPage extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <ApplicationHistoryFeed />
        {/* <ApplicationHistoryForm /> */}
      </div>
    )
  }
}