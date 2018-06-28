import React from 'react';
import UserCardForm from './UserCardForm';
import TipOfTheDay from './TipOfTheDay';
import Reminder from './Reminder';

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
