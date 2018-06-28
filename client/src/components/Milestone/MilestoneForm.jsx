import React from 'react';
import MilestonePage from './MilestonePage.jsx';
import MilestoneListView from './MilestoneListView.jsx';
import $ from 'jquery';

export default class MilestoneForm extends React.Component {
  constructor(props){
    super(props);
  }

  projectDisplay() {
    return (
      <div className="employment-history-fill-in">
        <label>Project's Name</label>
          <div className="field">
            <textarea
              rows="1"
              cols="32"
              type="text"
              name="milestone[project-history]"
              placeholder="Enter Your Project's Name Here!"
            ></textarea>
          </div>
      </div>
    )
  }

  jobDescriptionDisplay() {
    return (
      <div className="job-description-fill-in">
        <label>Job Description</label>
          <div className="field">
            <textarea
              rows="3"
              cols="32"
              placeholder="Please provide a brief description regarding your project."
            ></textarea>
          </div>
      </div>
    )
  }

  techStackDisplay() {
    return (
      <div className="tech-stack-fill-in">
        <label>Tech Stack</label>
          <div className="field">
            <textarea
                rows="4"
                cols="32"
                placeholder="Please enter the tech stack used at your previous company, separated by commas."
            ></textarea>
          </div>
      </div>
    )
  }

  repositoryDisplay() {
    return (
      <div className="repository-fill-in">
        <label>Repository Link</label>
          <div className="field">
            <textarea
              rows="1"
              cols="32"
              placeholder="Please enter your repository link here."
            ></textarea>
          </div>
      </div>
    )
  }

  dateDisplay() {
    return (
      <div className="date-fill-in">
        <label>Date Completed</label>
        <div className="field">
            <input type="date"
              rows="1"
              cols="32"
              placeholder="Please enter the date for this project."
            ></input>
        </div>
      </div>
    )
  }

  milestoneDisplayForm() {
    return (
      <div>
        <form className="ui-form">
          <h4 className="ui-title-header">Career Milestones and Achievements</h4>
          <div className="employment-history-field">
            {this.projectDisplay()}
            {this.jobDescriptionDisplay()}
            {this.techStackDisplay()}
            {this.repositoryDisplay()}
            {this.dateDisplay()}
          <div className="button-container">
            <button className="ui-button-cancel" tabIndex="0">Cancel</button>
            <button className="ui-button-confirm" tabIndex="1">Confirm</button>
          </div>
          </div>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.milestoneDisplayForm()}
      </div>
    )
  }

}