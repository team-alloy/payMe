import React from 'react';

import Header from './Header.jsx';
import Main from './Main.jsx';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <center>
          <img src="/images/opening.png" style={{width: 400, height: 150}}/>
        </center>  
        <div className="ui segment"> 
          <div>
            <Main />
          </div>
        </div>
      </div>
    )
  }
};
