import React from 'react';
import { Card, Icon, Form } from 'semantic-ui-react';
import MilestoneUpdate from './MilestoneUpdate';

export default class MilestoneListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { description, name, milestone_date, tech_used, repo_link} = this.props.milestone;
    const { update } = this.props;
    return (
      <Form raised className="ui teal segment">
        <h3 className="ui header">
          {name}
        </h3>
        <Card.Content description={description} />
        <div className="ui divider" />
        <div data-tooltip="Tech Stack">
          <Icon name="sitemap" />
          {tech_used}
          <br />
        </div>
        <div data-tooltip="Repository Link">
          <Icon name="github" />
          {repo_link}
          <br />
        </div>
        <div data-tooltip="Date Completed">
          <Icon name="check square outline" />
          {milestone_date}
          <br />
        </div>
        <div>
          <MilestoneUpdate update={update}/>
        </div>
      </Form>
    );
  }
}
