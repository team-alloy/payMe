import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CompanyDropDown from './CompanyDropDown';
import CityDropDown from './CityDropDown';
import StateDropDown from './StateDropDown';
import RoleDropDown from './RoleDropDown';

import { saveCompanies, saveRoles, saveCities, saveStates } from '../../store/actions/searchActions';
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  componentDidMount() {
    const set = this.setState.bind(this);
    this.getCompanies((data) => {
      this.props.saveCompanies(data);
    });

    this.getCities((data) => {
      this.props.saveCities(data);
    });

    this.getStates((data) => {
      this.props.saveStates(data);
    });

    this.getRoles((data) => {
      this.props.saveRoles(data);
    });
  }

  getCompanies(callback) {
    axios.get('/api/companies')
    .then(response => callback(response.data))
    .catch(err => console.error(err));
  }

  getCities(callback) {
    axios.get('/api/search?cities=true')
    .then(response => callback(response.data))
      .catch(err => console.error(err));
  }

  getStates(callback) {
    axios.get('/api/search?states=true')
    .then(response => callback(response.data))
      .catch(err => console.error(err));
  }

  getRoles(callback) {
    axios.get('/api/search?roles=true')
    .then(response => callback(response.data))
      .catch(err => console.error(err));
  }
  handleQueryChange(e) {
    this.setState({query: e.target.value})
  }

  searchDatabase(e) {
    e.preventDefault();
    console.log($('#selected-state > .selected').text())
  }

  render() {
    console.log(this.state, this.props);

    return (
      <div className="ui grid">
        <div className="four column row centered">
          <p> We gather information from applications submitted to give you back userful data, provided by the users of our app. Help us find out more about your company by making an application if you do not see your company here. Don't worry your personal information is safe.</p>
        </div>
        <div className="three column row centered ">
          <RoleDropDown roles={this.state.roles} />
          <span className="hide-company" hidden>
            CompanyDropDown companies={this.state.companies} />
          </span>
          <span className="hide-city" hidden>
            <CityDropDown cities={this.state.cities} />
          </span>
          <span className="hide-state" hidden>
            <StateDropDown states={this.state.states} />
          </span>

          <button className="ui teal basic button" onClick={this.searchDatabase.bind(this)}>
            <i className="search icon"> </i>
           </button>
        </div>
        <div className="one column row centered ">
          <div>test</div>
          <div>test</div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {searchWords: state.searchWords};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveCompanies,
    saveCities,
    saveRoles,
    saveStates
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);