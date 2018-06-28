import React from 'react';

export default class TipOfTheDay extends React.Component {
  constructor(props) {
    super(props);
  }

  TipOfTheDayDisplay() {
    return (
      <div>
        <div className="tip-header">
          <h4>Tip of the Day</h4>
        </div>
        <div className="tip-container">
          Getting a good night sleep is a key to a good interview!
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.TipOfTheDayDisplay()}
      </div>
    )
  }
}