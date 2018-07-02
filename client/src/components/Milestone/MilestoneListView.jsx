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
    return (
      <Card raised className="ui teal segment">
        <Card.Content header="Achievement's Name" />
        <Card.Content description={'This Application helps user negotiate their salary!'} />
        <Card.Content extra>
          <div data-tooltip="Tech Stack">
            <Icon name="sitemap" />
            JavaScript, ReactJS, mySQL, SemanticUI, Google.
            <br />
          </div>
          <div data-tooltip="Repository Link">
            <Icon name="github" />
            www.github.com/SirGitchardHubbard
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
