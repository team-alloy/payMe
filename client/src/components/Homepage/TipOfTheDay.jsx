import React, { Fragment } from 'react';
import { Segment } from 'semantic-ui-react';

export default class TipOfTheDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

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
                  Getting a good night sleep is a key to a good interview!
                </td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      </Segment>
    );
  }
}