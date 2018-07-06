import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CompanyDropDown from './CompanyDropDown';
import CityDropDown from './CityDropDown';
import StateDropDown from './StateDropDown';
import RoleDropDown from './RoleDropDown';
import Results from './Results';

import { saveCompanies, saveRoles, saveCities, saveStates, saveResults } from '../../store/actions/searchActions';
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
  throwError(message) {
    $('.search-error').text(message).show()
  }
  searchDatabase(e) {
    e.preventDefault();
    let role = $('#selected-role > .selected').text() === 'Select role' ? '' : $('#selected-role > .selected').text();
    let company = $('#selected-company > .selected').text() === 'Select company' ? '' : $('#selected-company > .selected').text();
    let city = $('#selected-city > .selected').text() === 'Select city' ? '' : $('#selected-city > .selected').text();;
    let state = $('#selected-state > .selected').text() === 'Select state' ? '' : $('#selected-state > .selected').text();

    if(role && company && city && state) {
      $('.search-error').hide();
      axios.get(`/api/search?role=${role}&company=${company}&city=${city}&state=${state}`).then(res => {
        this.props.saveResults(res.data);
      })
    } else {
      this.throwError('You must choose something in each field to search');
    }
  }

  render() {
    console.log(this.state, this.props);

    return (
      <div className="ui grid">
        <div className="four column row centered">
          <p> We gather information from applications submitted to give you back userful data, provided by the users of our app. Help us find out more about your company by making an application if you do not see your company here. Don't worry your personal information is safe.</p>
        </div>
        <div className="three column row centered"  style={{'width': '100%'}}>
          <RoleDropDown roles={this.props.searchWords.roles}/>
          <CompanyDropDown companies={this.props.searchWords.companies} />
          <CityDropDown cities={this.props.searchWords.cities} />
          <StateDropDown states={this.props.searchWords.states} />
          <button className="ui teal basic button" onClick={this.searchDatabase.bind(this)}>
            <i className="search icon"> </i>
           </button>
        </div>
        <div className="one column row centered" sytle={{ 'width': '50%' }}>
          <div className="search-error" hidden></div>
          {this.props.searchWords.results ? <Results results={this.props.searchWords.results} /> : undefined}
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
    saveStates,
    saveResults
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);