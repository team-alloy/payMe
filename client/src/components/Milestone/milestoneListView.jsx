import React from 'react';

export default class MilestoneListView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  // this function will render our read-only form
    //previous projects
      //project's name
        //project description
      //tech stack
        //tech stack list
      //repository link
        //repositorylink
      //date
        //date

  projectDisplayView() {
    return (
      <div>
        <div className="name-header">
          <h5>Project's Name</h5>
        </div>
        <div className="project-display-description-container">
          <div className="project-display-description">
            This application helps user negotiate their salary!
          </div>
        </div>
      </div>
    )
  }

  techStackDisplayView() {
    return (
      <div>
        <div className="name-header">
          <h5>Tech Stack</h5>
        </div>
        <div className="stack-display-description-container">
          <div className="stack-display-description">
            JavaScript, ReactJS, mySQL, SemanticUI, Google.
          </div>
        </div>
      </div>
    )
  }

  repositoryLinkDisplay() {
    return (
      <div>
        <div className="name-header">
          <h5>Repository</h5>
        </div>
        <div className="respository-display-description-container">
          <div className="repository-display-description">
            www.github.com/SirGitchardHubbard
          </div>
        </div>
      </div>
    )
  }

  dateDisplay() {
    return (
      <div>
        <div className="name-header">
          <h5>Completed On: </h5>
        </div>
        <div className="date-display-container">
          <span className="date-display">
            1/1/2018
          </span>
        </div>
      </div>
    )
  }

  milestoneDisplayView() {
    return (
      <div>
        <div className="title-header">
          <h4>Milestones and Achievements</h4>
        </div>
        {this.projectDisplayView()}
        {this.techStackDisplayView()}
        {this.repositoryLinkDisplay()}
        {this.dateDisplay()}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.milestoneDisplayView()}
      </div>
    )
  }
}