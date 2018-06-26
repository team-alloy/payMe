import React from 'react';

export default class HomePage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        This page will render the entire homepage!
      </div>
    )
  }
}
