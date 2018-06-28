import React from 'react';
import NegotiationPracticeVideo from './NegotiationPracticeVideo.jsx';
import NegotiationPracticeTopic from './NegotiationPracticeTopic.jsx';

export default class NegotiationPracticePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui column stackable center page grid">
        <NegotiationPracticeVideo/>
        <NegotiationPracticeTopic/>
      </div>
    )
  }
};
