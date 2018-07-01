import React from 'react';
import NegotiationPracticeTopic from './NegotiationPracticeTopic';
import NegotiationPracticeVideo from './NegotiationPracticeVideo';

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
