import React from 'react';
import MilestonePage from './MilestonePage.jsx';
import MilestoneListView from './MilestoneListView.jsx';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

export class MilestoneForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      stack: '',
      repository: '',
      completedDate: '',
    };
    this.milestoneNameChange = this.milestoneNameChange.bind(this);
    this.descriptionNameChange = this.descriptionNameChange.bind(this);
    this.stackNameChange = this.stackNameChange.bind(this);
    this.repositoryNameChange = this.repositoryNameChange.bind(this);
    this.completedDate = this.completedDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  milestoneNameChange(event) {
    this.setState({ name: event.target.value });
  }

  descriptionNameChange(event) {
    this.setState({ description: event.target.value });
  }

  stackNameChange(event) {
    this.setState({ stack: event.target.value });
  }

  repositoryNameChange(event) {
    this.setState({ repository: event.target.value });
  }

  completedDate(event) {
    this.setState({ completedDate: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)

    // axios.post(url[, data[, config]])
    // POST request to create a new milestone
    axios.post((`/api/milestones?userId=${this.props.session.user.id}`), {
      user_id: this.props.session.user.id, 
      name: this.state.name, 
      description: this.state.description, 
      repo_link: this.state.repository, 
      tech_used: this.state.stack, 
    });
  }
 
  render() {
    console.log(this.props)
    return (
      <Card raised className="ui teal segment">
        <form className="ui-form" onSubmit={this.handleSubmit}>
          <h4 className="ui-title-header">
            Career Milestones and Achievements
          </h4>
          <div className="employment-history-fill-in">
            <label htmlFor="name">
              <b>
                {'Project\'s Name'}
              </b>
              <br />
            </label>
            <textarea
              rows="1"
              cols="32"
              type="text"
              name="milestone[project-history]"
              placeholder="Enter Your Project's Name Here!"
              value={this.state.name}
              onChange={this.milestoneNameChange}
            />
          </div>
          <div className="job-description-fill-in">
            <label htmlFor="description">
              <b>
                {'Job Description'}
              </b>
              <br />
            </label>
            <textarea
              rows="3"
              cols="32"
              placeholder="Please provide a brief description regarding your project."
              value={this.state.description}
              onChange={this.descriptionNameChange}
            />
          </div>
          <div className="tech-stack-fill-in">
            <label htmlFor="tech-stack">
              <b>
                {'Tech Stack(s)'}
              </b>
              <br />
            </label>
            <textarea
              rows="4"
              cols="32"
              placeholder="Please enter the tech stack used at your previous company, separated by commas."
              value={this.state.stack}
              onChange={this.stackNameChange}
            />
          </div>
          <div className="repository-fill-in">
            <label htmlFor="respository">
              <b>
                {'Repository Link'}
              </b>
              <br />
            </label>
            <textarea
              rows="1"
              cols="32"
              placeholder="Please enter your repository link here."
              value={this.state.repositoryNameChange}
              onChange={this.repositoryNameChange}
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
              value={this.state.completedDate}
              onChange={this.completedDate}
            />
          </div>
          <div className="button-container">
            <button className="ui-button-cancel">
              Cancel
            </button>
            <button className="ui-button-confirm" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return ({ session: state.user });
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  });
};

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneForm);