import React, { Component } from 'react'
import { Dropdown } from  'semantic-ui-react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setRole } from '../../store/actions/selectionActions';

export class RoleDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'Select role'
    }
  }
  render() {
    const set = this.setState.bind(this);
    const setRole = this.props.setRole.bind(this);
    return (
      <Dropdown text={this.state.selection} icon='user circle' floatng="true" labeled button className='icon selected-role' >
      <Dropdown.Menu  onClick={(e) => { setRole(e.target.innerText);set({selection: e.target.innerText});}}>
        <Dropdown.Item >Select role</Dropdown.Item>
        {this.props.roles ? this.props.roles.map((role) => {
           return ( < Dropdown.Item key={'role'+role.id} className="item" >{role.name}</Dropdown.Item>);
         }) : undefined}
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}

const mapStateToProps = (state) => {
  return { selection: state.selection.role}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setRole
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleDropDown)