import React from 'react';

export default class TipOfTheDay extends React.Component {
  constructor(props) {
    super(props);
  }

  TipOfTheDayDisplay() {
    return (
      <table class="ui celled padded table">
        <thead>
          <th>Tip of the Day</th>
        </thead>
        <tbody>
          <div className="tip-container">
            <td>Getting a good night sleep is a key to a good interview!</td>
          </div>
        </tbody>
      </table>
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