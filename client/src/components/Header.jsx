import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    constructor(props) {
      super(props);
    }
  
  render() {
    return (
      <div className="ui top grey inverted seven item menu">
        <div className="item">
            <img src="/images/logo.png" style={{width: 75, height: 75}}/>
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
  }
};
    

