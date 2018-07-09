import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MilestoneForm from './MilestoneForm';
import MilestoneListView from './MilestoneListView';
import axios from 'axios';

export class MilestonePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMilestones: [],
    };
    this.handleGetMilestone = this.handleGetMilestone.bind(this);
    this.handleMilestoneUpdate = this.handleMilestoneUpdate.bind(this);
  }

  componentDidMount() {
    this.handleGetMilestone((response) => {
      this.setState({currentMilestones: response})
    });
  }

  handleGetMilestone(callback) {
    let {id} = this.props.session.user;
    if (id) {
      axios.get(`api/milestones?user_id=${id}`)
        .then((response) => {
          callback(response.data)
        });
    } else {
      this.props.history.push('/login')
    }
  }

  handleMilestoneUpdate(query, callback) {
    let milestoneInfo = Object.assign({}, query, {user_id: this.props.session.user.id})
    console.log(milestoneInfo);
    axios.post((`/api/milestones?user_id=${this.props.session.user.id}`), milestoneInfo)
      .then((response) => {
        this.handleGetMilestone((data) => {
          this.setState({ currentMilestones: data });
        });
        callback();
      });
  }

  render() {
    if (this.state.currentMilestones === 0) {
      return (
        <div />
      );
    }
    return (
      <div>
        <div className="ui equal width three column grid">
          <div className="one wide column" />
          <div className="column">
            <div className="ui equal width grid">
              <div className="equal width row">
                <div className="column">
                  <MilestoneForm
                    milestoneUpdate={this.handleMilestoneUpdate}
                    milestoneGet={this.handleGetMilestone}
                  />
                </div>
                <div className="column">
                  <Fragment>
                    {this.state.currentMilestones.map((milestone, key) => (
                      <MilestoneListView
                        key={key}
                        name={milestone.name}
                        description={milestone.description}
                        stack={milestone.tech_used}
                        repo={milestone.repo_link}
                        date={milestone.milestone_date}
                      />
                    ))}
                  </Fragment>
                </div>
              </div>
            </div>
          </div>
          <div className="one wide column>" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({ session: state.user });
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  });
};

export default connect(mapStateToProps, mapDispatchToProps)(MilestonePage)