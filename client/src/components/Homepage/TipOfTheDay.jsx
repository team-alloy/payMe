import React, { Fragment } from 'react';

export default class TipOfTheDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Fragment>
        <table className="ui celled padded table">
          <thead>
            <tr>
              <th className="single line">
                Tip of the Day
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="single line">
                Getting a good night sleep is a key to a good interview!
              </td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}