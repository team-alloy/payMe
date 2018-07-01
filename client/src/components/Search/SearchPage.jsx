import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';

import CompanyDropDown from './CompanyDropDown';
import CityDropDown from './CityDropDown';
import StateDropDown from './StateDropDown';
export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  componentDidMount() {
    const set = this.setState.bind(this);

    this.getCompanies((data) => {
      set({companies: data})
    });

    this.getCities((data) => {
      set({cities: data});
    });

    this.getStates((data) => {
      set({states: data});
    });
  }

  getCompanies(callback) {
    axios.get('/api/companies').then(response => callback(response.data))
    .catch(err => console.error(err));
  }

  getCities(callback) {
    axios.get('/api/search?cities=true').then(response => callback(response.data))
      .catch(err => console.error(err));
  }

  getStates(callback) {
    axios.get('/api/search?states=true').then(response => callback(response.data))
      .catch(err => console.error(err));
  }


  handleQueryChange(e) {
    this.setState({query: e.target.value})
  }

  searchDatabase(e) {
    e.preventDefault();
  }

  render() {
    console.log(this.state);

    return (
      <div className="ui grid">
        <div className="three column row centered ">
          <CompanyDropDown companies={this.state.companies} />
          <CityDropDown cities={this.state.cities} />
          <StateDropDown states={this.state.states} />
        </div>
        <div className="one column row centered ">
          <div>test</div>
          <div>test</div>
        </div>

      </div>
    )
  }
}
