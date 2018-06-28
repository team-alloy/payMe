import React from 'react';
import TipsStatistic from './tipsStatistic.jsx';
import TipsListContainer from './tipsListContainer.jsx';

export default class TipsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui column stackable center page grid">
        <div class="two column row">
          <div class="column">
            <img src="/images/statistic_example.jpg" style={{width: 450, height: 300}}/>
            <TipsStatistic/>
          </div>
          <div class="column"><TipsListContainer/></div>
        </div>
      </div>
    )
  }
};
