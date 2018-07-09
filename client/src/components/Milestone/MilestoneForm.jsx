import React from 'react';
import { Button, Form } from 'semantic-ui-react';
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
      currentMilestones: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClearFields = this.handleClearFields.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
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
    })
      .then((response) => {
        console.log(response);
        this.setState({ currentMilestones: response });
      });
  }

  handleClearFields() {
    this.setState({
      name: '',
      description: '',
      stack: '',
      repository: '',
      completedDate: '',
      currentMilestones: '',
    });
  }

  render() {
    console.log('this is the props ', this.props)
    return (
      <Form raised className="ui teal segment" onSubmit={this.handleSubmit}>
        <h4 className="ui center aligned segment">
          <i className="trophy icon" />
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
            type="text"
            placeholder="Enter Your Project's Name Here!"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
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
            rows="2"
            placeholder="Please provide a brief description regarding your project."
            value={this.state.description}
            name="description"
            onChange={this.handleChange}
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
            rows="3"
            placeholder="Please enter the tech stack used at your previous company, separated by commas."
            value={this.state.stack}
            name="stack"
            onChange={this.handleChange}
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
            rows="2"
            placeholder="Please enter your repository link here."
            value={this.state.repository}
            name="repository"
            onChange={this.handleChange}
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
            placeholder="Please enter the date for this project."
            value={this.state.completedDate}
            value="completedDate"
            onChange={this.handleChange}
          />
        </div>
        <div className="ui two bottom attached buttons">
          <Button className="ui-button-cancel" onClick={this.handleClearFields}>
            Cancel
          </Button>
          <Button className="ui-button-confirm" color="teal" type="submit" size="medium">
            Confirm
          </Button>
        </div>
      </Form>
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
