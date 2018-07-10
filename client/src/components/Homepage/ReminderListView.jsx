import React from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
export class ReminderListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount () {
    const set = this.setState.bind(this);
    if(this.props.session) {
      this.getApplications((data) => {
        set({applications: data[0]});
      });

      this.getMilestones((data) => {
        set({milestones: data[0]});
      });
    }
  }

  getApplications(callback) {
    const { id } = this.props.session.user;
    axios.get(`/api/applications?user_id=${id}`)
      .then((res) => {
        callback(res.data);
      });
  }

  getMilestones(callback) {
    let {id} = this.props.session.user;
    axios.get(`api/milestones?user_id=${id}`)
      .then((res) => {
        callback(res.data);
      });
  }
  render() {
    console.log(this.props, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', this.state.milestones)
    return (
      <Segment raised className="segment ui teal segment">
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th className="ui center aligned" text-align="center" >
                {'Reminders'}
                <i className="calendar outline icon" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="single line">
                Have you made any interesting updates on the {this.state.milestones? this.state.milestones.name : undefined} project?
              </td>
            </tr>
            <tr>
              <td className="single line">
                Have you heard back from {this.state.applications? this.state.applications.role.company.name: undefined}? It may be time to update your application.
              </td>
            </tr>
            <tr>
              <td className="single line">
                Did you do anything interesting recently for a project? Record it in Milestones!
              </td>
            </tr>
          </tbody>
        </table>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return { session: state.user}
}
export default connect(mapStateToProps)(ReminderListView);