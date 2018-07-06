import React from 'react';
import jquery from 'jquery';
import { Card, Button, Modal, Header, Image, Input, TextArea, Checkbox } from 'semantic-ui-react';
import axios from 'axios';

export default class ApplicationUpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    var style = {
      top: '10%'
    }
    return (
      <div>
        <Modal style={style} trigger={(<Button>UpdateApp</Button>)}>
        <Modal.Header>UpdateApp</Modal.Header>
          <Modal.Content scrolling>
            <TextArea style={{maxHeight: 35}} />
            <br/>
            <TextArea style={{maxHeight: 35}} />
            <br/>
            <TextArea style={{maxHeight: 35}} />
            <br/>
            <TextArea style={{maxHeight: 35}} />
            <br/>
            <TextArea style={{maxHeight: 35}} />
            <Modal.Actions>
              <Button basic color='green' labelPosition='left'>Submit
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}