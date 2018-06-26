import React from 'react';

export default class TipsListView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Tips List View receives props from Tips parent:
        <ul>
          <li>Tip # 1</li>
          <li>Tip # 2</li>
          <li>Tip # 3</li>
        </ul>
      </div>
    )
  }
};
