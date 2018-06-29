import React from 'react';
import MilestoneForm from './MilestoneForm.jsx';
import MilestoneListView from './MilestoneListView';

export default class MilestoneList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // this function will invoke our state change
  formUpdate() {
    return (
      <div className="edit-button-container">
        <button className="ui-button-edit" type="submit" onClick={() => { this.displayChanger(); }}>
          Update
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <table className="ui single line table">
          <thead>
            <tr>
              <td>
                Milestones and Achievements
              </td>
            </tr>
          </thead>
        </table>
        <MilestoneListView />
      </div>
    );
  }
}
