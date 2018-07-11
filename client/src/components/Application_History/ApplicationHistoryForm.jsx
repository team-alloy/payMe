import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class ApplicationHistoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      role: '',
      city: '',
      state: '',
      salary: '',
      application_date: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    let params = {};
    for( let key in this.state) {
      params[key] = this.state[key].trim();
    }
    this.props.makeApp(params, () => {
      this.setState({
        company: '',
        role: '',
        city: '',
        state: '',
        salary: '',
        application_date: '',
      });
    });
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  clearFields() {
    this.setState({
      company: '',
      role: '',
      city: '',
      state: '',
      salary: '',
      application_date: '',
    });
  }

  render() {
    return (
      <Form raised="true" className="ui teal segment" >
        <h4 className="ui center aligned segment">
          <i className="chart pie icon" />
          Previously Applied Position
        </h4>
        <label htmlFor="name">
          <b>
            {'Company\'s Name'}
          </b>
          <br />
        </label>
        <div className="app-field">
          <input
            type="text"
            value={this.state.company}
            name="company"
            onChange={this.handleChange}
            className="company-name"
            placeholder="Company's Name"
          />
        </div>
        <label htmlFor="position">
          <b>
            {'Position Title: '}
          </b>
          <br />
        </label>
        <div className="app-field">
          <input
            type="text"
            value={this.state.role}
            name="role"
            onChange={this.handleChange}
            className="position-name"
            placeholder="Position's Title"
          />
        </div>
        <label htmlFor="location">
          <b>
            {'Position Location: '}
          </b>
          <br />
        </label>
        <div className="app-field">
          <input
            type="text"
            value={ this.state.city }
            name="city"
            onChange={this.handleChange}
            className="location-name"
            placeholder="city ex. Masscotte"
          />
          <br/>
          <input
            type="text"
            value={this.state.state}
            maxLength="2"
            name="state"
            onChange={this.handleChange}
            className="location-name"
            placeholder="state ex. Fl"
          />
        </div>
        <label htmlFor="salary">
          Salary
        </label>
        <div className="app-field">
          <input
            type="text"
            value={this.state.salary}
            name="salary"
            onChange={this.handleChange}
            className="salary"
            placeholder="Salary"
          />
        </div>
        <label htmlFor="date">
          <b>
            {'Application Date: '}
          </b>
          <br />
        </label>
        <div className="app-field">
          <input
            className="date-name"
            name="application_date"
            type="date"
            onChange={this.handleChange}
          />
        </div>
        <div className="ui two bottom attached buttons">
          <Button className="ui-button-cancel" onClick={this.clearFields}>
            Cancel
          </Button>
          <Button className="ui-button-confirm" onClick={this.handleClick} color="teal" type="submit" size="medium">
            Confirm
          </Button>
        </div>
      </Form>
    );
  }
}
