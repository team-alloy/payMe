import React from 'react';
import UserCardForm from './UserCardForm.jsx';
import TipOfTheDay from './TipOfTheDay.jsx';
import Reminder from './Reminder.jsx';

export default class HomePage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <UserCardForm />
        <Reminder />
        <TipOfTheDay />
      </div>
    )
  }
}
