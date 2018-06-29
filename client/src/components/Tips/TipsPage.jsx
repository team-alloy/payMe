import React from 'react';
import TipsListContainer from './TipsListContainer';
import TipsStatistic from './TipsStatistic';

export default class TipsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="ui column stackable center page grid">
        <div className="two column row">
          <div className="column">
            <img src="/images/statistic_example.jpg" style={{ width: 450, height: 300 }} />
            <TipsStatistic />
          </div>
          <div className="column">
            <TipsListContainer />
          </div>
        </div>
      </div>
    );
  }
}
