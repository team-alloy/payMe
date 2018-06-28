import React from 'react';
import MilestoneListView from './MilestoneListView.jsx';
import MilestoneForm from './MilestoneForm.jsx';

export default class MilestonePage extends React.Component {
  constructor(props){
    super(props);
  }

  milestonePageDisplay() {
    return (
      <div>
        <div className="ui four column grid">
          <div className="column"></div>
          <div className="column"></div>
          <div className="column">
            <MilestoneListView />
          </div>
          <div className="column"></div>
          <div className="row">
          <div className="column"></div>
            <div className="column">
              <MilestoneListView />
            </div>
          <div className="column"></div>
          <div className="column"></div>
          </div>
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
