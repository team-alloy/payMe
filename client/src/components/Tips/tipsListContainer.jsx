import React from 'react';
import TipsListView from './TipsListView';

export default class TipsListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* Handle all tips, pass down to tipsListView */}
        <TipsListView />
      </div>
    )
  }
};
