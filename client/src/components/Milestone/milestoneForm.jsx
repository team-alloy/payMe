import React from 'react';
import MilestonePage from './milestonePage.jsx';

export default class MilestoneForm extends React.Component {
  constructor(props){
    super(props);
  }

  companyDisplay() {
    return (
      <div className="previous-company-fill-in">
        <label>Previous Experience</label>
          <div className="employment-history-fill-in">
            <label>Company</label>
              <div className="field">
            <input 
              type="text" 
              name="milestone[employment-history]" 
              placeholder="Company" 
            />
              </div>
            <label>Position's Title</label>
              <div className="field">
            <input 
              type="text" 
              name="milstone[position-history]" 
              placeholder="Position's Title" 
            />
              </div>
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
              rows="4" 
              placeholder="Please provide a brief description regarding your responsibilities."
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
                placeholder="Please enter the tech stack used at your previous company, separated by commas."
            ></textarea>    
          </div>  
      </div>
    )
  }

  keyAccomplishmentsDisplay() {
    return (
      <div className="achievements-fill-in">
        <label>Key Accomplishments</label>
          <div className="inline-fields">
            <label>Job Accomplishment: </label>
            <div className="field">
              <textarea 
                rows="4"
                placeholder="Please enter your key achievements here i.e. Implemented algorithm that improved company's efficiency by 50%!" 
              ></textarea>
            </div>
            <label>Accomplishment's Result: </label>
            <div className="field">
              <textarea 
                rows="4"
                placeholder="Please enter the quantifiable result of your achievements here i.e. Saved the company over $100 million USD and was promoted to Chief Technology Officer." 
              ></textarea>
            </div>
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
              placeholder="Please enter your repository link here."
            ></textarea>
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
            {this.companyDisplay()}
            {this.jobDescriptionDisplay()}
            {this.techStackDisplay()}
            {this.keyAccomplishmentsDisplay()}
            {this.repositoryDisplay()}
            <div className="button-container">
              <button className="ui-button-confirm" tabIndex="0">Confirm</button>
              <button className="ui-button-cancel" tabIndex="1">Cancel</button>
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