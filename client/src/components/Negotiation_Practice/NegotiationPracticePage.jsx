import React from 'react';
import NegotiationPracticeTopic from './NegotiationPracticeTopic';
import NegotiationPracticeVideo from './NegotiationPracticeVideo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class NegotiationPracticePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="ui column stackable center page grid">
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <NegotiationPracticeVideo />
        </MuiThemeProvider>
        <NegotiationPracticeTopic />
      </div>
    );
  }
}
