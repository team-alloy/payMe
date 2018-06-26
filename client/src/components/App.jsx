import React from 'react';
import NavBar from './navbar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
      </div>
    )
  }
};
