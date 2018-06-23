import React from 'react';
import TipsStatistic from './tipsStatistic';
import Tips from './tips';

export default class TipsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Tips Page displays all things tips-related
        <TipsStatistic/> 
        <Tips/>
      </div>
    )
  }
};
