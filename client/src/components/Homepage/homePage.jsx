import React from 'react';
import UserCardForm from './UserCardForm.jsx';
import TipOfTheDay from './TipOfTheDay.jsx';
import Reminder from './Reminder.jsx';

export default class HomePage extends React.Component {
  constructor(props){
    super(props);
  }

  // homePageDisplay() {
  //   return (
  //     <div>
  //       <div className="ui internally celled grid">
  //         <div className="row">
  //           <div className="three wide column">
  //             <UserCardForm />
  //           </div>
  //           <div className="ten wide column">
  //             <Reminder />
  //           </div>
  //         </div>
  //         <div className="row">
  //           <div className="three wide column">
  //           </div>
  //           <div className="ten wide column">
  //             <TipOfTheDay />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  homePageDisplay() {
    return (
      <div>
        <div className="ui two column grid">
          <div className="two column row">
            <div className="three wide column">
              <UserCardForm />
            </div>
            <div className="ten wide column">
              <Reminder />
            </div>
          </div>
          <div className="row">
            <div className="three wide column">
            </div>
            <div className="ten wide column">
              <TipOfTheDay />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.homePageDisplay()}
      </div>
    )
  }
}
