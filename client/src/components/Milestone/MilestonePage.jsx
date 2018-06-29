import React from 'react';
import MilestoneListView from './MilestoneListView';
import MilestoneForm from './MilestoneForm';

export default class MilestonePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}
