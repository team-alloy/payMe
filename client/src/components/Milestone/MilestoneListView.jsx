import React from 'react';
import MilestoneList from './MilestoneList';
import { Card, Icon } from 'semantic-ui-react';

export default class MilestoneListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props)
    const name = this.props.name;
    const description = this.props.description;
    const stack = this.props.stack;
    const repo= this.props.repo;

    return (
      <Card raised className="ui teal segment">
        <Card.Content header={name} />
        <Card.Content description={description} />
        <Card.Content extra>
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
            1/1/2018
            <br />
          </div>
        </Card.Content>
      </Card>
    );
  };
}
