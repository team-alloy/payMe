import React from 'react';
import {Card} from 'semantic-ui-react';

const ApplicationOffersFeed = (props) => (
  <Card>
    <Card.Content>
      <Card.Header>{'Has Health Benefits: '}</Card.Header>
      <Card.Description>
      {props.offer.hasHealthBenefits}
      </Card.Description>
      <br/>
      <Card.Header>{'Has PTO: '}</Card.Header>
      <Card.Description>
      {props.offer.hasPTO}
      </Card.Description>
      <br/>
      <Card.Header>{'Has Retirement: '}</Card.Header>
      <Card.Description>
        {props.offer.hasRetirement}
      </Card.Description>
      <br/>
      <Card.Header>{'Covers Relocation: '}</Card.Header>
      <Card.Description>
        {props.offer.coversRelocation}
      </Card.Description>
      <br/>
      <Card.Header>{'Salary: '}</Card.Header>
      <Card.Description>
      {props.offer.base_salary}
      </Card.Description>
    </Card.Content>
  </Card>
);

export default ApplicationOffersFeed;