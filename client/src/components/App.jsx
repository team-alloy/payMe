import React from 'react';
import NavBar from './navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavBar/>
      <div>
        This the main parent, always displaying nav bar
      </div>
    )
  }
};
