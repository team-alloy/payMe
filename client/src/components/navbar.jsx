import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import HomePage from './Homepage/homePage.jsx';
import MilestonePage from './Milestone/milestonePage.jsx';
import TipsPage from './Tips/tipsPage.jsx';
import ApplicationHistoryPage from './Application_History/ApplicationHistoryPage.jsx';
import Login from './Login/login.jsx';
import SignUp from './Signup/signup.jsx';
import NegotiationPracticePage from './Negotiation_Practice/negotiationPracticePage.jsx';

const Header = () => (
  <div className="ui top seven item menu">
    <div className="item">
      <img src="/images/logo.png" style={{width: 60, height: 60}}/>
    </div>
    <div className="item">
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
    <div className="item">
      <Link to="/practice">Negotiation Practice</Link>
    </div>
    <div className="item">
      <Link to="/login">Logout</Link>
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
        <Route path='/practice' component={NegotiationPracticePage} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
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
        <center><img src="/images/opening.png" style={{width: 400, height: 100}}/></center>
        <div className="ui segment"> 
          <div>
            <Main />
          </div>
        </div>
      </div>
    )
  }
};
