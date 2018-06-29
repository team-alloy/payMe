import React from 'react';
import MilestoneList from './MilestoneList';

export default class MilestoneListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div className="name-header">
          <h5>
            {'Project\'s Name'}
          </h5>
        </div>
        <div className="project-display-description-container">
          <div className="project-display-description">
            This application helps user negotiate their salary!
          </div>
        </div>
        <div className="name-header">
          <h5>
            Tech Stack
          </h5>
        </div>
        <div className="stack-display-description-container">
          <div className="stack-display-description">
            JavaScript, ReactJS, mySQL, SemanticUI, Google.
          </div>
        </div>
        <div className="name-header">
          <h5>
            Repository
          </h5>
        </div>
        <div className="respository-display-description-container">
          <div className="repository-display-description">
            www.github.com/SirGitchardHubbard
          </div>
        </div>
        <div className="name-header">
          <h5>
            {'Completed on: '}
          </h5>
        </div>
        <div className="date-display-container">
          <span className="date-display">
            1/1/2018
          </span>
        </div>
      </div>
    );
  }
}
