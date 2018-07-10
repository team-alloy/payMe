import React, { Component } from 'react'
import { Dropdown } from  'semantic-ui-react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCompany } from '../../store/actions/selectionActions';

export class CompanyDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'Select company'
    }
  }
  render() {
    const set = this.setState.bind(this);
    const setCo = this.props.setCompany.bind(this);
    return (
      <Dropdown text={this.state.selection} icon='user circle' floatng="true" labeled button className='icon selected-company' >
      <Dropdown.Menu onClick={(e) => { setCo(e.target.innerText); set({selection: e.target.innerText})}}>
        <Dropdown.Item>Select company</Dropdown.Item>
        {this.props.companies ? this.props.companies.map((co) => {
           return ( < Dropdown.Item key={'company'+co.id} className="item" >{co.name}</Dropdown.Item>);
         }) : undefined}
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}

const mapStateToProps = (state) => {
  return {selection: state.selection.company}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setCompany
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDropDown);