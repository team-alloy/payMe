import React from 'react';
import MilestoneForm from './MilestoneForm';
import MilestoneList from './MilestoneList';

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
            <MilestoneList />
          </div>
          <div className="column">
            <MilestoneList />
          </div>
        </div>
      </div>
    );
  }
}
