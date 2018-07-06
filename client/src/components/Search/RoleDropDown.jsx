import React from 'react'

export default (props) => {
  return (
    <div className="ui floating dropdown labeled search icon button">
      <i className="user circle icon"></i>
      <span className="text company">Select role</span>
      <div id="selected-role" key="role-defualt" className="menu" onClick={() => console.log('clicked')}>
        <div className="item">Select role</div>
        {props.roles ? props.roles.map((role) => {
          return (<div key={'role'+role.id} className="item">{role.name}</div>);
        }) : undefined}
      </div>
      <script>
        $('.ui.dropdown').dropdown();
        </script>
    </div>
  )
}
