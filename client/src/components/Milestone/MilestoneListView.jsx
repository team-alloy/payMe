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
    const { date, description, name, repo, stack} = this.props;

    return (
      <Form raised className="ui teal segment">
        <h3 className="ui header">
          {name}
        </h3>
        <Card.Content description={description} />
        <div className="ui divider" />
        <div data-tooltip="Tech Stack">
          <Icon name="sitemap" />
          {stack}
          <br />
        </div>
        <div data-tooltip="Repository Link">
          <Icon name="github" />
          {repo}
          <br />
        </div>
        <div data-tooltip="Date Completed">
          <Icon name="check square outline" />
          {date}
          <br />
        </div>
      </Form>
    );
  }
}
