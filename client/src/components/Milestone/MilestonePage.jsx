import React from 'react';
import MilestoneListView from './MilestoneListView.jsx';
import MilestoneForm from './MilestoneForm.jsx';

export default class MilestonePage extends React.Component {
  constructor(props){
    super(props);
  }

  milestonePageDisplay() {
    return (
        <div className="ui three column grid">
          <div className="column">
            <MilestoneForm />
          </div>
          <div className="column">
            <MilestoneListView />
          </div>
          <div className="column">
            <MilestoneListView />
          </div>
        </div>
    )
  }

  render() {
    return (
      <div>
        {this.milestonePageDisplay()}
      </div>
    )
  }
}
