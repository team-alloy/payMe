import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
export class TipsStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
    this.getAverageSalary = this.getAverageSalary.bind(this);
  }

  componentDidMount () {
    const set = this.setState.bind(this);
    if(this.props.user) {
      this.getActiveRoleLocation((data) => {
        console.log(data, 'DATA GIVEN')
        set({location: data});
        this.getAverageSalary(data.split(',').map(l => l.trim()), (data) => {
          this.setState({ avgSalary: data })
        });
      });
    }
  }


  getActiveRoleLocation(callback) {
    if (this.props.user.active_role !== null) {
      axios.get(`/api/applications?role_id=${this.props.user.active_role[0].id}`).then(res => {
        console.log(res.data);
        callback(`${res.data[0].city}, ${res.data[0].state}`)
        return;
      });
    }
  }

  getAverageSalary(loc, data) {
    const user = this.props.user;
    axios.get(`/api/search?role=${user.active_role[0].name}&company=${user.active_role[0].company.name}&city=${loc[0]}&state=${loc[1]}`).then(res => {
      this.setState({results: res.data})
    })
  }

  placeCommasOnSalary(salary) {
    let results = '$';
    salary = salary.toString().split('.');
    while(salary[0].length) {
      results += salary[0].substring(0, 3);
      salary[0] = salary[0].substring(3);

      if(salary[0].length) {
        results += ',';
      }
    }
    results += '.00';
    return results;
  }
  render() {
    console.log('Damn girl, ', this.props, this.state);
    let user = this.props.user;

    if(user === undefined) {
      return(
        <div>
          <Link to="/login">
            Login
          </Link> to find out more!
        </div>
      );
    } else if(user && !user.active_role) {
      return (
        <div>
          Let us know where you currently 
        {' '}
          <Link to="/applications">
            work
          </Link> and we will give you your salary range!
        </div>
      );
    } else {
      return (
        <div>
          <br />
            Your job as a
          <b>
              {` ${user.active_role[0].name} `}
          </b>
            in
          <b>
              {` ${this.state.location} `}
          </b>
            has an average market value range of:
          <b>
            {this.state.results ? `${this.placeCommasOnSalary(Number(this.state.results.avgSalary * .93).toFixed(0))} - ${this.placeCommasOnSalary(Number(this.state.results.avgSalary * 1.07).toFixed(0))}`: undefined}
          </b>
            <br />
            Based on this data, here is what we suggest:
      </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {user: state.user.user}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(TipsStatistic);