import React, { Component } from 'react'
import { Dropdown } from  'semantic-ui-react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStateRedux } from '../../store/actions/selectionActions';

export class StateDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'Select state'
    }
  }
  render() {
    const set = this.setState.bind(this);
    const setState = this.props.setStateRedux.bind(this);
    return (
      <Dropdown text={this.state.selection} icon='user circle' floatng="true" labeled button className='icon selected-state' >
      <Dropdown.Menu onClick={(e) => { setState(e.target.innerText); set({selection: e.target.innerText})}}>
        <Dropdown.Item>Select state</Dropdown.Item>
        {this.props.states ? this.props.states.map((state) => {
           return ( < Dropdown.Item key={'state'+state.id} className="item">{state.state}</Dropdown.Item>);
         }) : undefined}
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}

const mapStateToProps = (state) => {
  return { selection: state.selection.state };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setStateRedux
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StateDropDown);