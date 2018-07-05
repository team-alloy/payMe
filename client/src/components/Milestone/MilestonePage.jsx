import React from 'react';
import MilestoneForm from './MilestoneForm';
import MilestoneList from './MilestoneList';
import MilestoneListView from './MilestoneListView'

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
            <MilestoneList {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
