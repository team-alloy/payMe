import React from 'react'

export default (props) => {
  return (
    <div className="ui floating dropdown labeled search icon button">
      <i className="building icon"></i>
      <span className="text company">Select state</span>
      <div className="menu">
        {props.states ? props.states.map((state, index) => {
          return (<div key={index} className="item">{state.state}</div>);
        }) : undefined}
      </div>
    </div>
  )
}
