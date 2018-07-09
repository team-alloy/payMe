import React from 'react';
import MilestoneForm from './MilestoneForm';
import MilestoneList from './MilestoneList';

export default class MilestonePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleGetMilestone(callback) {
    if (this.props.session.user) {
      axios.get(`api/milestones?user_id=${this.props.session.user.id}`)
        .then((response) => {
          callback(response.data)
        });
    } else {
      this.props.history.push('/login')
    }
  }

  handlePostMilestone(query, callback) {
    axios.post((`/api/milestones?userId=${this.props.session.user.id}`), {
      user_id: this.props.session.user.id, 
      name: this.state.name, 
      description: this.state.description, 
      repo_link: this.state.repository, 
      tech_used: this.state.stack, 
    })
      .then((response) => {
        console.log(response);
        this.setState({ currentMilestones: response });
      });
  }

  render() {
    return (
      <div>
        <div className="ui equal width three column grid">
          <div className="one wide column" />
          <div className="column">
            <div className="ui equal width grid">
              <div className="equal width row">
                <div className="column">
                  <MilestoneForm
                    milestonePost={this.handlePostMilestone.bind(this)} 
                    milestoneGet={this.handleGetMilestone.bind(this)}
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
