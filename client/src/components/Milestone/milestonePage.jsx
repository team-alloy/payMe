import React from 'react';
import MilestoneListView from './MilestoneListView.jsx';
import MilestoneForm from './MilestoneForm.jsx';

export default class MilestonePage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <MilestoneListView />
      </div>
    )
  }
}
