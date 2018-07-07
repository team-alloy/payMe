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
        <div className="ui equal width three column grid">
          <div className="one wide column" />
          <div className="column">
            <div className="ui equal width grid">
              <div className="equal width row">
                <div className="column">
                  <MilestoneForm />
                </div>
                <div className="column">
                  <MilestoneList {...this.props} />
                </div>
              </div>
            </div>
          </div>
          <div className="one wide column>" />
        </div>
      </div>
    );
  }
}
