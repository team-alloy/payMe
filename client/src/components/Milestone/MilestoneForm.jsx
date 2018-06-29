import React from 'react';
import MilestonePage from './MilestonePage.jsx';
import MilestoneListView from './MilestoneListView.jsx';
import $ from 'jquery';

export default class MilestoneForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <form className="ui-form">
          <h4 className="ui-title-header">
            Career Milestones and Achievements
          </h4>
          <div className="employment-history-fill-in">
            <label htmlFor="name">
              <b>
                {'Project\'s Name'}
              </b>
            </label>
            <textarea
              rows="1"
              cols="32"
              type="text"
              name="milestone[project-history]"
              placeholder="Enter Your Project's Name Here!"
            />
          </div>
          <div className="job-description-fill-in">
            <label htmlFor="description">
              <b>
                {'Job Description'}
              </b>
            </label>
            <textarea
              rows="3"
              cols="32"
              placeholder="Please provide a brief description regarding your project."
            />
          </div>
          <div className="tech-stack-fill-in">
            <label htmlFor="tech-stack">
              <b>
                {'Tech Stack(s)'}
              </b>
            </label>
            <textarea
              rows="4"
              cols="32"
              placeholder="Please enter the tech stack used at your previous company, separated by commas."
            />
          </div>
          <div className="repository-fill-in">
            <label htmlFor="respository">
              <b>
                {'Repository Link'}
              </b>
            </label>
            <textarea
              rows="1"
              cols="32"
              placeholder="Please enter your repository link here."
            />
          </div>
          <div className="date-fill-in">
            <label htmlFor="date">
              <b>
                {'Date Completed'}
              </b>
              <br />
            </label>
            <input
              type="date"
              rows="1"
              cols="32"
              placeholder="Please enter the date for this project."
            />
          </div>
          <div className="button-container">
            <button className="ui-button-cancel" type="reset">
              Cancel
            </button>
            <button className="ui-button-confirm" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
    );
  }
}
