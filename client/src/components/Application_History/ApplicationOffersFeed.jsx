import React from 'react';

const ApplicationOffersFeed = (props) => (
  <div>
    <label>{'Has Health Benefits: '}</label>
      {props.offer.hasHealthBenefits}
    <br/>
    <label>{'Has PTO: '}</label>
      {props.offer.hasPTO}
    <br/>
    <label>{'Has Retirement: '}</label>
      {props.offer.hasRetirement}
    <br/>
    <label>{'Covers Relocation: '}</label>
      {props.offer.coversRelocation}
    <br/>
    <label>{'Salary: '}</label>
      {props.offer.base_salary}
  </div>
);

export default ApplicationOffersFeed;