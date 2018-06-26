import React from 'react';
import TipsStatistic from './tipsStatistic.jsx';
import TipsListContainer from './tipsListContainer.jsx';

export default class TipsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Tips Page displays all things tips-related
        <TipsStatistic/>
        <TipsListContainer/>
      </div>
    )
  }
};
