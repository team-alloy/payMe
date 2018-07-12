import React from 'react';
import { Button, Form } from 'semantic-ui-react';

import ApplicationOffersModal from './ApplicationOffersModal';
import ApplicationUpdateModal from './ApplicationUpdateModal';


export default class ApplicationHistoryFeedListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const style = {
      top: '10%',
    };
    return (
      <Form raised="true" className="ui teal segment" onSubmit={this.handleSubmit}>
        <div className="application-history-container">
          <label className="company-name" htmlFor="name" style={{ fontWeight: 'bold' }}>
            {'Company: '}
          </label>
          {this.props.apps.role.company.name}
          <div className="role-display">
            <label htmlFor="position" style={{ fontWeight: 'bold' }}>
              {'Position Title: '}
            </label>
              {this.props.apps.role.name}
          </div>
          <div className="location-display">
            <label htmlFor="location" style={{ fontWeight: 'bold' }}>
              {'Position Location: '}
            </label>
              {`${this.props.apps.city}, ${this.props.apps.state}`}
          </div>
          <div className="applied-date-display">
            <label htmlFor="date" style={{ fontWeight: 'bold' }}>
              {'Application Date: '}
            </label>
            {new Date(this.props.apps.application_date).toLocaleDateString()}
          </div>
        </div>
        <br />
        <div className="ui three bottom attached buttons">
          <ApplicationUpdateModal updateApp={this.props.updateApp} app={this.props.apps}/>
          <ApplicationOffersModal appID={this.props.apps.id}/>
          <Button
            style={style}
            className="ui-button-confirm"
            color="red"
            size="tiny"
            onClick={() => {
              this.props.delete(this.props.apps.id);
            }
          }
          >
            Delete
          </Button>
        </div>
      </Form>
    );
  }
}
