import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import HomePage from './Homepage/homePage.jsx';
import MilestonePage from './Milestone/milestonePage.jsx';
import TipsPage from './Tips/tipsPage.jsx';
import ApplicationHistoryPage from './Application_History/ApplicationHistoryPage.jsx';
import Login from './Login/login.jsx';

// const Header = () => (
//   <header>
//     <nav>
//       <ul>
//         <li><Link to='/'>Home</Link></li>
//         <li><Link to='/api/milestones'>Milestones</Link></li>
//         <li><Link to='/api/tips'>Negotiation Tips</Link></li>
//         <li><Link to='/api/applications'>Job Application History</Link></li>
//         <li><Link to='/api/login'>Logout</Link></li>
//       </ul>
//     </nav>
//   </header>
// )

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/milestones' component={MilestonePage} />
      <Route path='/tips' component={TipsPage} />
      <Route path='/applications' component={ApplicationHistoryPage} />
      <Route path='/login' component={Login}/>
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
        <div className="ui secondary pointing menu">
          <a className="active item">
            <Link to='/'>Home</Link>
          </a>
          <a className="item">
            <Link to='/api/milestones'>Milestones</Link>
          </a>
          <a className="item">
            <Link to='/api/tips'>Negotiation Tips</Link>
          </a>
          <a className="item">
            <Link to='/api/applications'>Job Application History</Link>
          </a>
          <div className="right menu">
            <a className="ui item">
              <Link to='/api/login'>Logout</Link>
            </a>
          </div>
        </div>

        <div className="ui segment">
          <p>Display stuff underneath the navbar here</p>
          <Main />
        </div>
      </div>
    )
  }
};
