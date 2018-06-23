import React from 'react';
import NegotiationPracticeVideo from './negotiationPracticeVideo';
import NegotiationPracticeTopic from './negotiationPracticeTopic';

export default class NegotiationPracticePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        This is the page for all things negotiation practice
      </div>
      <NegotiationPracticeVideo/>
      <NegotiationPracticeTopic/>
    )
  }
};
