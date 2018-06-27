import React from 'react';
import MilestoneListView from './milestoneListView.jsx';
import MilestoneForm from './milestoneForm.jsx';

export default class MilestonePage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        {/* <MilestoneListView /> */}
        <MilestoneForm />
      </div>
    )
  }
}
