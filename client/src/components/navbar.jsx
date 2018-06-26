import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import HomePage from './Homepage/homePage.jsx';
import MilestonePage from './Milestone/milestonePage.jsx';
import TipsPage from './Tips/tipsPage.jsx';
import ApplicationHistoryPage from './Application_History/ApplicationHistoryPage.jsx';
import Login from './Login/login.jsx';

const Header = () => (
  <div>
    <div className="ui secondary pointing green menu">
      <div className="active item">
        <Link to="/">Home</Link>
      </div>
      <div className="item">
        <Link to="/milestones">Milestones</Link>
      </div>
      <div className="item">
        <Link to="/tips">Negotiation Tips</Link>
      </div>
      <div className="item">
        <Link to="/applications">Job Application History</Link>
      </div>
      <div className="ui item right menu">
        <Link to="/login">Logout</Link>
      </div>
    </div>
  </div>
)

const Main = () => (
  <main>
      <Switch>
        <Route exact path='/' render={(props) => {
          return <HomePage {...props} />
        }} />
        <Route path='/milestones' component={MilestonePage} />
        <Route path='/tips' component={TipsPage} />
        <Route path='/applications' component={ApplicationHistoryPage} />
        <Route path='/login' component={Login} />
      </Switch>
  </main>
)

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="ui segment">
          <div>
            Display stuff underneath the navbar here
            <Main />
          </div>
        </div>
      </div>
    )
  }
};
