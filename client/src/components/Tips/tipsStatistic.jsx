import React from 'react';

export default class TipsStatistic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        According to Glassdoor, the average Software Engineer salary in the U.S. makes an average salary of $92,790.
        <br></br>
        Your job as a <b>Software Engineer</b> in <b>San Francisco, CA</b> has an average market value of:
        <b>$111,885.</b>
        <br></br>
        Based on this data, here is what we suggest:
      </div>
    )
  }
};
