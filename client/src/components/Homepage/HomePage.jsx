import React from 'react';
import UserCardForm from './UserCardForm';
import TipOfTheDay from './TipOfTheDay';
import Reminder from './Reminder';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div className="ui two column grid">
          <div className="two column row">
            <div className="three wide column">
              <img src="/images/gitchardhubbard.png" alt="sirGitchardHubbard" />
              <UserCardForm />
            </div>
            <div className="ten wide column">
              <Reminder />
            </div>
          </div>
          <div className="row">
            <div className="three wide column" />
            <div className="ten wide column">
              <TipOfTheDay />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
