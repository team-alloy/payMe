import React from 'react';
import MilestoneForm from './MilestoneForm.jsx';
import MilestoneListView from './MilestoneListView';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMilestones } from '../../store/actions/userActions';
import axios from 'axios';

export class MilestoneList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const set = this.setState.bind(this);
    this.fetchMilestone((data) => { console.log(data); });
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

  fetchMilestone() {
    axios.get(`api/milestones?userId=${this.props.session.user.id}`)
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <MilestoneListView />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({session: state.user})
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  });
};

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneList);