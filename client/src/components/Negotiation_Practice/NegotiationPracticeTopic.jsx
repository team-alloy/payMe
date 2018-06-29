import React from 'react';

export default class NegotiationPracticeTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        This is your negotiation topic of the day:
        <ul>
          <li>
            Paid Time Off
          </li>
        </ul>
        Your partner who will interview you is:
        Kenny Le,
        Software Engineer at Google
      </div>
    );
  }
}
