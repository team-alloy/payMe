import React from 'react';
import NavBar from './Navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}
