import React from 'react';
import TipsListView from './tipsListView';

export default class Tips extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Handle all tips, pass down to tipsListView
        <TipsListView/>
      </div>
    )
  }
};
