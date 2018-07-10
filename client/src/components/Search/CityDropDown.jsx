import React, { Component } from 'react'
import { Dropdown } from  'semantic-ui-react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCity } from '../../store/actions/selectionActions';
export class CityDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'Select city'
    }
  }
  render() {
    const set = this.setState.bind(this);
    const setCity = this.props.setCity.bind(this);
    return (
      <Dropdown text={this.state.selection} icon='user circle' floatng="true" labeled button className='icon selected-city' >
      <Dropdown.Menu  onClick={(e) => { setCity(e.target.innerText);set({selection: e.target.innerText});}}>
        <Dropdown.Item>Select city</Dropdown.Item>
        {this.props.cities ? this.props.cities.map((city) => {
           return ( < Dropdown.Item key={'city'+city.id} className="item">{city.city}</Dropdown.Item>);
         }) : undefined}
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}

const mapStateToProps = (state) => {
  return { selection: state.selection.city }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setCity
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CityDropDown);