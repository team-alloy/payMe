import React from 'react';
import UserCard from './UserCard';
import { connect } from 'react-redux';
import { ENGINE_METHOD_CIPHERS } from 'constants';
// import { BADHINTS } from 'dns';
import axios from 'axios';


export default class UserCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      firstName: '',
      lastName: '',
      position: '',
      employer: '',
      salary: '',
    };

    this.nameChange = this.nameChange.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.positionChange = this.positionChange.bind(this);
    this.employerChange = this.employerChange.bind(this);
    this.salaryChange = this.salaryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nameChange() {
    const { firstName } = this.state;
    const { lastName } = this.state;
    this.setState({ name: `${firstName} ${lastName}` });
  }

  firstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  lastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  positionChange(event) {
    this.setState({ position: event.target.value });
  }

  employerChange(event) {
    this.setState({ employer: event.target.value });
  }

  salaryChange(event) {
    this.setState({ salary: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.nameChange();

    // axios#patch(url[, data[, config]])
    axios.patch((`/api/user?id=${this.props.user.id}`), {
      'first_name': this.state.firstName,
      'last_name': this.state.lastName,
      'email': this.state.email,
      'username': this.state.username,
      'current_salary': this.state.current_salary,
      'active_role': this.state.position,
    })
    .then((response) => {
      console.log(response)
    });

    //make a patch request to the server
   
      //update the user's name
      //update the user email
      //update the user's position
      //update the user's salary
  }

  render() {
    return (
      <div className="ui teal card">
        <h4 className="ui dividing header left aligned segment">Edit User's Profile</h4>
        <form className="ui-form" onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="left aligned segment" style={{ fontWeight: 'bold' }}>
              Full Name
            </div>
            <div className="inline fields">
              <div className="field">
                <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.firstNameChange}></input>
              </div>
              <div className="field">
                <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.lastNameChange}></input>
              </div>
            </div>
          </div>

          <div className="field">
            <label style={{fontWeight: 'bold'}}>
              {'Position\'s Title: '}
            </label>
            <div className="field">
              <input type="text" value={this.state.position} onChange={this.positionChange} />
            </div>
          </div>

          <div className="field">
            <label style={{fontWeight: 'bold'}}>
              {'Employer: '}
            </label>
            <div className="field">
              <input type="text" value={this.state.employer} onChange={this.employerChange} />
            </div>
          </div>

          <div className="field">
            <label style={{fontWeight: 'bold'}}>
              {'Current Salary: '}
            </label>
            <div className="field">
              <input type="text" value={this.state.salary} onChange={this.salaryChange} />
            </div>
          </div>

        <div className="button-container">
          <button className="ui-button-cancel">Cancel</button>
          <button className="ui-button-confirm">Confirm</button>
        </div>
        </form>
      </div>
    );
  }
}
