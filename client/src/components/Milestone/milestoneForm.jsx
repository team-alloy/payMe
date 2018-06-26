import React from 'react';
import MilestonePage from './milestonePage.jsx';

export default class MilestoneForm extends React.Component {
  constructor(props){
    super(props);
  }

  milestoneDisplayForm() {
    return (
      <div>
        <form className="ui-form">
          <h4 className="ui-title-header">Career Milestones and Achievements</h4>
          <div className="employment-history-field">
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

            <div className="job-description-fill-in">
              <label>Job Description</label>
                <div className="field">
                  <textarea 
                    rows="4" 
                    placeholder="Please provide a brief description regarding your previous's work responsibilities."
                  ></textarea>
                </div>
            </div>

            <div className="tech-stack-fill-in">
              <label>Tech Stack</label>
                <div className="field">
                  <textarea 
                      rows="4" 
                      placeholder="Please enter the tech stack used at your previous company, separated by commas."
                    ></textarea>
                </div>
            </div>

            <div className="achievements-fill-in">
              <label>Key Accomplishments</label>
              <div className="inline-fields">
                <label>Job Accomplishment: </label>
                <div className="field">
                  <input 
                    type="text" 
                    placeholder="Please enter your key achievements here i.e. Implemented algorithm that improved company's efficiency by 50%!" 
                  />
                </div>
                <label>Accomplishment's Result: </label>
                <div className="field">
                  <input 
                    type="text" 
                    placeholder="Please enter the quantifiable result of your achievements here i.e. Saved the company over $100 million USD and was promoted to Chief Technology Officer." 
                  />
                </div>
              </div>
            </div>

            <div className="repository-fill-in">
              <label>Repository Link</label>
                <div className="field">
                  <textarea 
                    rows="1" 
                    placeholder="Please enter your repository link here."
                  ></textarea>
                </div>
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