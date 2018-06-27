import React from 'react';
import UserCardForm from './userCardForm.jsx';

export default class HomePage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <UserCardForm />
      </div>
    )
  }
}
