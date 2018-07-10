import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AboutUs from './AboutUs/AboutUs';
import ApplicationHistoryPage from './Application_History/ApplicationHistoryPage';
import HomePage from './Homepage/HomePage';
import Login from './Login/Login';
import MilestonePage from './Milestone/MilestonePage';
import NegotiationPracticePage from './Negotiation_Practice/NegotiationPracticePage';
import SearchPage from './Search/SearchPage';
import SignUp from './Signup/Signup';
import TipsPage from './Tips/TipsPage';
import UserCardForm from './Homepage/UserCardForm';
import { SearchCategory } from 'semantic-ui-react';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <HomePage {...props} />}
          />
          <Route path="/milestones" render={props => <MilestonePage {...props} />} />
          <Route path="/tips" component={TipsPage} />
          <Route path="/applications" component={ApplicationHistoryPage} />
          <Route path="/practice" component={NegotiationPracticePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/login" component={Login} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/signup" render={props => <SignUp {...props} />} />
          <Route
            exact
            path="/edit-user"
            component={UserCardForm}
          />
        </Switch>
      </main>
    );
  }
}
