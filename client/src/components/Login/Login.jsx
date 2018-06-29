import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleClick(e) {
    e.preventDefault();
    axios({
      method:'post',
      url: '/api/login',
      data: this.state
    });
    this.setState({
      email: '',
      password: ''
    })
  }

  render() {
    return (
      <div>
        <div className="login-form">
          <style>
            {`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
            `}
          </style>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                Please log in!
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Input onChange={this.handleChange} name="email" fluid icon="user" iconPosition="left" placeholder="E-mail address" />
                  <Form.Input
                    onChange={this.handleChange}
                    name="password"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />
                  <Button onClick={this.handleClick} color="teal" fluid size="large">
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New User?
                {' '}
                <a href="/signup">
                  Sign Up to Get That Bonus!
                </a>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}
