import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import {
  Button, Form, Grid, Header, Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const verifyEmailFormat = (email) => {
  return email.match(/\w+(@)\w+.+(com|net|org|edu|co)/gi);
};
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      pass: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    let {first_name, last_name, email, pass} = this.state;
    if (verifyEmailFormat(email) === null) {
      $('.error-message').text('Not a valid email').css('color', 'red').show();
      return;
    }

    if (this.state.pass !== this.state.reEnterPW) {
      $('.error-message').text('Passwords do not match').css('color', 'red').show();
    } else if(email === '' || pass === '') {
      $('.error-message').text('Not allowed to leave email or password empty').css('color', 'red').show();
    } else {
      axios.post('/api/signup', { first_name, last_name, email, pass })
        .then((res) => {
          this.props.history.push('/login');
        })
        .catch((err) => {
          $('.error-message').text('Email is in use').css('color', 'red').show();
          this.props.history.push('/signup');
        });
      this.setState({
        first_name: '',
        last_name: '',
        email: '',
        pass: '',
        reEnterPW: '',
      });
    }
  }

  render() {
    return (
      <div>
        <div className="sign-up-form">
          <style>
            {`
            body > div,
            body > div > div,
            body > div > div > div.sign-up-form {
              height: 100%;
            }
            `}
          </style>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" id="message" color="teal" textAlign="center">
                Register
              </Header>
              <h5>
                Get the Raise You Deserve!
              </h5>
              <div className="error-message" />
              <Form size="large">
                <Segment raised>
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.first_name}
                    name="first_name"
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="First Name"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.last_name}
                    fluid
                    icon="user"
                    iconPosition="left"
                    name="last_name"
                    placeholder="Last Name"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.email}
                    fluid
                    icon="envelope outline"
                    iconPosition="left"
                    name="email"
                    placeholder="Email Address"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.pass ? this.state.pass : ''}
                    fluid
                    icon="eye"
                    iconPosition="left"
                    name="pass"
                    placeholder="Password"
                    type="password"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={this.state.reEnterPW ? this.state.reEnterPW : ''}
                    fluid
                    icon="eye"
                    iconPosition="left"
                    name="reEnterPW"
                    placeholder="Re-enter Password"
                    type="password"
                  />
                  <Button type="submit" onClick={this.handleClick} color="teal" fluid size="large">
                    <Link to="/login">
                      Confirm Registration
                    </Link>
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}
