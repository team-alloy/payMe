import React from 'react';

import Header from './Header';
import Main from './Main';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Header />
        <center>
          <img src="/images/opening.png" style={{ width: 400, height: 150 }} />
        </center>
        <div className="ui segment">
          <div>
            <Main />
          </div>
        </div>
      </div>
    );
  }
}
