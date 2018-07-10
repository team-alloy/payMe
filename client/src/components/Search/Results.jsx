import React from 'react'
import { Segment } from 'semantic-ui-react';

export default (props) => {
  if(typeof props.results === 'object') {
    return (
      <div>
        <Segment raised className="ui teal segment">
          <h2>{`Average salary for ${props.results.company} ${props.results.role}'s`}</h2>
          <h4>{`in ${props.results.city}, ${props.results.state}`}</h4>
          <h4>{`$ ${props.results.avgSalary}`}</h4>
          <div>{`This information was deduced from ${props.results.numberOfApplications} applications in our database. `}</div>
        </Segment>
      </div>
    )
  } else if(typeof props.results === 'string') {
    return(
      <div>
        <Segment raised className="ui teal segment">
          <h3>{props.results}</h3>

        </Segment>
      </div>
    );
  }
}
