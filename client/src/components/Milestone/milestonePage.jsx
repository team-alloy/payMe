import React from 'react';
import MilestoneListView from './MilestoneListView';
import MilestoneForm from './MilestoneForm';

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
