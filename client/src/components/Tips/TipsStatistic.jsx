import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class TipsStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
    this.handleGetAverageSalary = this.handleGetAverageSalary.bind(this);
    this.handleRenderMessage = this.handleRenderMessage.bind(this);
  }

  componentDidMount() {
    const set = this.setState.bind(this);
    const { user } = this.props;
    if (user) {
      this.getActiveRoleLocation((data) => {
        set({location: data});
        this.handleGetAverageSalary(data.split(',').map(l => l.trim()), (data) => {
          set({ avgSalary: data })
        });
      });
    }
  }


  getActiveRoleLocation(callback) {
    if (this.props.user.active_role !== null) {
      axios.get(`/api/applications?role_id=${this.props.user.active_role[0].id}`).then((res) => {
        callback(`${res.data[0].city}, ${res.data[0].state}`);
      });
    }
  }

  handleRenderMessage() {
    if (this.state.results) {
      const numOfApps = this.state.results.numberOfApplications;
      if ( numOfApps <= 1) {
        return ( 'You have a good salary, if you want more and it isn\'t negotiable. See if your manager will budge on number of vacation days. Or learn a new tech, here is a list of the 10 most common ones used according to our database.')
      }
    }
  }

  handleGetAverageSalary(loc, data) {
    const { user } = this.props;
    axios.get(`/api/search?role=${user.active_role[0].name}&company=${user.active_role[0].company.name}&city=${loc[0]}&state=${loc[1]}`).then((res) => {
      this.setState({ results: res.data })
    });
  }

  placeCommasOnSalary(salary) {
    return Number(salary).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  render() {
    let { user } = this.props;

    if (user === undefined) {
      return (
        <div>
          <Link to="/login">
            {'Login '}
          </Link>
            to find out more!
        </div>
      );
    } if (user && !user.active_role) {
      return (
        <div>
          Let us know where you currently
        {' '}
          <Link to="/applications">
            work
          </Link>
            and we will give you your salary range!
        </div>
      );
    }
    console.warn(this.states)
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
        {'has an average market value range between '}
        <b>
          {this.state.results ? `${this.placeCommasOnSalary(Number(this.state.results.avgSalary * .93).toFixed(0))} and ${this.placeCommasOnSalary(Number(this.state.results.avgSalary * 1.07).toFixed(0))}`: undefined}
          .
        </b>
        <br />
          Based on this data, here is what we suggest:
        <br />
          {this.handleRenderMessage()}
       <br />
        <ul>
          {this.state.results ? Object.keys(this.state.results.tech).map((tech, index) => {
            return <li key={index}>{tech}</li>
          }) : undefined}
        </ul>
        <br />
          { this.state.results ?
            <b>
              Possible benefits:
            </b>
            : undefined}
        <ul>
          {this.state.results ? Object.keys(this.state.results.benefits).map((benefit , index) => {
                 if(benefit === 'base_salary' && (this.state.results.benefits[benefit] === undefined || this.state.results.benefits[benefit] === null)) {
                   return <li key={benefit}>No base salaries were given to us yet, keep negotiating even without this information. Usually whatever the salary you are thinking, unless its absurdly high, can have another $10,000 added onto it.</li>
                 } else if (benefit === 'base_salary') {
                   return <li key={benefit}>Base salary of ${this.placeCommasOnSalary(this.state.results.benefits[benefit]*.8)} - {this.placeCommasOnSalary(this.state.results.benefits[benefit]*1.1)}</li>
                 }
                 return <li key={benefit}>{this.state.results.benefits[benefit]}</li>
               }) : undefined}
        </ul>
        <br />
      </div>
    );
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