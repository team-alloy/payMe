import React from 'react';
import { Button, Modal, TextArea } from 'semantic-ui-react';

export default class MilestoneUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      tech_used: '',
      repo_link: '',
      milestone_date: '',
    };
  }

  componentDidMount() {
    this.setState({
      name: '',
      description: '',
      tech_used: '',
      repo_link: '',
      milestone_date: '',
    });
  }

  handleChange(e) {
    e.preventDefault();

    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { 
      description, milestone_date, name, repo_link, tech_used,
    } = this.state;
    const style = {
      top: '10%',
    };
    console.log('this is mah update', this.props);

    return (
      <div>
        <Modal
          style={style} 
          trigger={(
          <Button onClick={this.componentDidMount}>
            Update
          </Button>
          )}
        />
      </div>
    );
  }
}
