import React, { Fragment } from 'react';
import { Segment } from 'semantic-ui-react';

const tips = [
  'Don\'t be apologetic, you don\'t need to be sorry for asking for what you deserve.',
  'When asking for that raise, make sure you tell your supervisor what you have already done for the company and why you deserve to be paid more. You can jot down your accomplishments in our PayMe',
  'If they start you off at a low salary, negotiate a bi-yearly review. PayMe can help you keep track of the achivements you\'ve made over time.',
  'Keep your PayMe account up to date. Add new milestones for projects where you contributed a good portion of work.',
  'You are your own product, sell yourself.',
  'Do your research on the company before you go into the interview.',
  'Think about the whole package, salary is not the only thing you can negotiate.',
  'Are you working for a startup that\'s booming? Ask about stock options! If the company grows more the worth of those stocks would increase as well.',
  'Getting a good night sleep is a key to a good interview!',
  'Studies show that practice makes perfect, rehearse with some random person in our negotiation practice tab!',
  'Be confident in your abilities, fostering positivity in yourself and what you can do can help you sound more experienced.'

];

export default class TipOfTheDay extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
  Renders a random tip from the array above.
  */
  render() {
    return (
      <Segment raised className="segment ui teal segment">
        <Fragment>
          <table className="ui celled padded table center">
            <thead>
              <tr>
                <th className="ui center aligned">
                  {'Tip of the Day'}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="wrap line">
                  {tips[Math.floor(Math.random() * tips.length)]}
                </td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      </Segment>
    );
  }
}
