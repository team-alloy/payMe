import React from 'react';
import UserCardForm from './userCardForm.jsx';
import TipOfTheDay from './tipOfTheDay.jsx';

export default class HomePage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <UserCardForm />
        <TipOfTheDay />
      </div>
    )
  }
}
