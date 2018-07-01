import React from 'react'

export default (props) => {
  return (
    <div className="ui floating dropdown labeled search icon button">
      <i className="industry icon"></i>
      <span className="text company">Select Company</span>
      <div className="menu">
        {props.companies ? props.companies.map((company) => {
          return (<div key={company.id} className="item">{company.name}</div>);
        }) : undefined}
      </div>
    </div>
  )
}
