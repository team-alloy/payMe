import React, { Component } from 'react';
import $ from 'jquery';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleQueryChange(e) {
    this.setState({query: e.target.value})
  }

  searchDatabase(e) {
    e.preventDefault();
    console.log(this.state.query, $('.search-term'));
  }

  render() {
    return (
      <div className="ui one column centered grid container">
        <div className="column centered aligned">
          <div className="ui icon input" style={{ 'marginTop': '15px', 'marginBottom': '15px', 'width': '300px' }}>
            <input
              className="search-term"
              value={this.state.query}
              type="text" placeholder="Search..."
              onChange={this.handleQueryChange.bind(this)} />
            <button
              onClick={this.searchDatabase.bind(this)}
              className="ui teal button" >
              <i className="search icon"/>
            </button>
          </div>
        </div>
        <div className="column centered aligned">
          test
        </div>
      </div>
    )
  }
}
