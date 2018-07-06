import React from 'react';
import axios from 'axios';

export default class ApplicationHistoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      role: '',
      city: '',
      state: '',
      salary: 0,
      application_date: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.makeApp(this.state, ()=>{
      this.setState({
        company: '',
        role: '',
        city: '',
        state: '',
        salary: 0,
        application_date: '',
      });
    });
  }

  handleChange(e) {
    e.preventDefault();
    var name = e.target.name;
    var value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  clearFields() {
    this.setState({
      company: '',
      role: '',
      city: '',
      state: '',
      salary: 0,
      application_date: '',
    });
  }

  render() {
    console.log(this.state, this.props);

    return (
      <div>
        <h4>
          Application Information:
        </h4>
        <form className="ui-form">
          <label htmlFor="name">
            <b>
              {'Company\'s Name'}
            </b>
            <br />
          </label>
          <div className="app-field">
            <input type="text" value={this.state.company} name="company" onChange={this.handleChange} className="company-name" placeholder="Company's Name" />
          </div>
          <label htmlFor="position">
            <b>
              {'Position Title: '}
            </b>
            <br />
          </label>
          <div className="app-field">
            <input type="text" value={this.state.role} name="role" onChange={this.handleChange} className="position-name" placeholder="Position's Title" />
          </div>
          <label htmlFor="location">
            <b>
              {'Position Location: '}
            </b>
            <br />
          </label>
          <div className="app-field">
            <input type="text" value={ this.state.city } name="city" onChange={this.handleChange} className="location-name" placeholder="city ex. Masscotte" />
            <br/>
            <input type="text" value={this.state.state} maxLength="2" name="state" onChange={this.handleChange} className="location-name" placeholder="state ex. Fl" />
          </div>
          <label htmlFor="salary">
            Salary
          </label>
          <div className="app-field">
            <input type="text" value={this.state.salary} name="salary" onChange={this.handleChange}className="salary" placeholder="Salary" />
          </div>
          <label htmlFor="date">
            <b>
              {'Application Date: '}
            </b>
            <br />
          </label>
          <div className="app-field">
            <input className="date-name" name="application_date" type="date" onChange={this.handleChange} />
          </div>
        </form>
        <div className="button-container">
          <button onClick={this.clearFields} className="ui-button-cancel" type="reset">
            Cancel
          </button>
          <button onClick={this.handleClick} className="ui-button-confirm" type="submit">
            Confirm
          </button>
        </div>
      </div>
    );
  }
}
