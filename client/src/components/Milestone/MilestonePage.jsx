import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MilestoneForm from './MilestoneForm';
import MilestoneList from './MilestoneList';

export class MilestonePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleGetMilestone = this.handleGetMilestone.bind(this);
    this.handleMilestoneUpdate = this.handleMilestoneUpdate.bind(this);
  }

  handleGetMilestone(callback) {
    let {id} = this.props.session.user;
    if (id) {
      axios.get(`api/milestones?user_id=${this.props.session.user.id}`)
        .then((response) => {
          callback(response.data)
        });
    } else {
      this.props.history.push('/login')
    }
  }

  handleMilestoneUpdate(query, callback) {
    let milestoneInfo = Object.assign({}, query, {user_id: this.props.session.user.id})
    axios.post((`/api/milestones?userId=${this.props.session.user.id}`), milestoneInfo)
      .then((response) => {
        this.handleGetMilestone((data) => { 
          this.setState({ currentMilestones: response });
        });
        callback();
      });
  }

  render() {
    console.log('THIS IS MY SESSION', this.props.session)
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
                  <MilestoneList {...this.props} />
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