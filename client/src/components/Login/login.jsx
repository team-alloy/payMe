import React from 'react';
import {BrowserRouter} from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  
  // this function will handle our login form
  // if successful, route the user to the home page
  // if unsuccessful, render an error message

  render() {
    return (
      <div>
        My Login Page
      </div>
    )
  };
}
