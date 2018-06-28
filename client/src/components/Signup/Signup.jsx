import React from 'react';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="ui column stackable center page grid">
        <h2>
           Register
        </h2>
        <h5>
          ...to get that raise you deserve
        </h5>
        <br />
        <form className="ui form">

          <div className="fields">
            <div className="field">
              <label>
                First Name
              </label>
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <label>
                Last Name
              </label>
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
          </div>

          <div className="fields">
            <div className="field">
              <label>
                Email Address
              </label>
              <input type="text" name="email" placeholder="Email Address" />
            </div>
            <div className="field">
              <label>
                Username
              </label>
              <input type="text" name="username" placeholder="Username" />
            </div>
          </div>

          <div className="fields">
            <div className="field">
              <label>
                Password
              </label>
              <input type="text" name="password" placeholder="Password" />
            </div>
            <div className="field">
              <label>
                Re-enter Password
              </label>
              <input type="text" name="re-enter-pw" placeholder="Re-enter Password" />
            </div>
          </div>

          <br />

          <button className="small teal basic ui button" tabIndex="0" type="submit">
            <a href="/login">
              Login With Your New Account
            </a>
          </button>
        </form>
      </div>
    );
  }
}
