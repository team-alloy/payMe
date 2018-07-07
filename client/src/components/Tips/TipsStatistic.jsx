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
    this.renderMessage = this.renderMessage.bind(this);
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

  renderMessage() {
    if(this.state.results) {
      console.log('ho');
      const numOfApps = this.state.results.numberOfApplications;
      if ( numOfApps <= 1) {
        console.log('hey');

        return ( `You have some wiggle room, if salary isn't negotiable. See if your manager will budge on number of vacation days. Or learn a new tech, here is a list of the 10 most common ones used according to our database.`)
      } else if () {}
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
    return Number(salary).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
            <br />
            {this.renderMessage()}
            <ul>
            {this.state.results ? Object.keys(this.state.results.tech).map((tech, index) => {
                return <li key={index}>{tech}</li>
              }) : undefined}
            </ul>
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