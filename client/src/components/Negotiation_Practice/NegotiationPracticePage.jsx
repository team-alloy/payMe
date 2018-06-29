import React from 'react';
import NegotiationPracticeVideo from './NegotiationPracticeVideo';
import NegotiationPracticeTopic from './NegotiationPracticeTopic';

export default class NegotiationPracticePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="ui column stackable center page grid">
        <NegotiationPracticeVideo />
        <NegotiationPracticeTopic />
      </div>
    );
  }
}
