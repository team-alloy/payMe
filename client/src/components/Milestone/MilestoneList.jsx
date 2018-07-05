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
      milestones: [],
    };
  }

  componentDidMount() {
    const set = this.setState.bind(this);
    this.fetchMilestone((data) => {
      set({milestones: data})
    });
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

  fetchMilestone(callback) {
    if(this.props.session.user) {
      axios.get(`api/milestones?user_id=${this.props.session.user.id}`)
        .then((response) => {
          callback(response.data)
        });
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    const data = this.state.milestones;
    if (!data) {
      return (
        <div />
      );
    }
    return (
      <div>
        {data.map((milestone, key) => (
          <MilestoneListView
            key={key}
            name={milestone.name}
            description={milestone.description}
            stack={milestone.tech_used}
            repo={milestone.repo_link}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({ session: state.user })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  });
};

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneList);