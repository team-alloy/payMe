import React from 'react';
import { Segment } from 'semantic-ui-react';

export default class ReminderListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Segment raised className="segment ui teal segment">
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th className="ui center aligned" text-align="center" >
                {'Reminders '}
                <i className="calendar outline icon" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="single line">
                Have you made any interesting updates on the Hello Fresh project?
              </td>
            </tr>
            <tr>
              <td className="single line">
                Have you heard back from Google? It may be time to update your application.
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


// <div>
// <table className="ui single line table">
//   <thead>
//     <tr>
//       <td>
//         Milestones and Achievements
//       </td>
//     </tr>
//   </thead>
// </table>
// <MilestoneListView />
// </div>
// );