import React from 'react';
import NegotiationPracticeVideo from './negotiationPracticeVideo.jsx';
import NegotiationPracticeTopic from './negotiationPracticeTopic.jsx';

export default class NegotiationPracticePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NegotiationPracticeVideo/>
        <NegotiationPracticeTopic/>
      </div>
    )
  }
};
