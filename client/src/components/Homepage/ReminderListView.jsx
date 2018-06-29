import React from 'react';

export default class ReminderListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <table className="ui celled striped table">
        <tbody>
          <tr>
            <div className="reminder-display">
              <td className="single line">
                Have you made any interesting updates on the Hello Fresh project?
              </td>
            </div>
          </tr>
          <tr>
            <div className="reminder-display">
              <td>
                Have you heard back from Google? It may be time to update your application.
              </td>
            </div>
          </tr>
          <tr>
            <div className="reminder-display">
              <td>
                Did you do anything interesting recently for a project? Record it in Milestones!
              </td>
            </div>
          </tr>
        </tbody>
      </table>
    );
  }
}
