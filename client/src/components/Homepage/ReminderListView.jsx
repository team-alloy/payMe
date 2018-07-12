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
        let rand = Math.floor(Math.random() * data.length);
        set({applications: data[rand]});
      });

      this.getMilestones((data) => {
        let rand = Math.floor(Math.random() * data.length);
        set({milestones: data[rand]});
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
            {/* This will help with not rendering an empty table row if the user does not have any milestones */}
            {
              this.state.milestones ?
              <tr>
                <td className="wrap line">Have you made any interesting updates on the {this.state.milestones.name} project ?
                </td>
              </tr> : undefined
            }

            {
              this.state.applications ?
              <tr>
                <td className="wrap line">
                Have you heard back from {this.state.applications.role.company.name}? It may be time to update your application.
                </td>
              </tr>
              : undefined
            }
            <tr>
              <td className="wrap line">
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