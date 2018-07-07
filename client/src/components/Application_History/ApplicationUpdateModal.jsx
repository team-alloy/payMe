import React from 'react';
import jquery from 'jquery';
import { Card, Button, Modal, Header, Image, Input, TextArea, Checkbox } from 'semantic-ui-react';
import axios from 'axios';

export default class ApplicationUpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company:this.props.app.role.company.name,
      city:this.props.app.city,
      state:this.props.app.state,
      role:this.props.app.role.name,
      salary:this.props.app.role.salary
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      company:this.props.app.role.company.name,
      city:this.props.app.city,
      state:this.props.app.state,
      role:this.props.app.role.name,
      salary:this.props.app.role.salary
    });
  }
  handleChange(e) {
    e.preventDefault();
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      [name]: value
    });
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
            <TextArea onChange={this.handleChange} name="company" value={this.state.company} style={{maxHeight: 35}} />
            <br/>
            <TextArea onChange={this.handleChange} name="role" value={this.state.role} style={{maxHeight: 35}} />
            <br/>
            <TextArea onChange={this.handleChange} name="city" value={this.state.city} style={{maxHeight: 35}} />
            <br/>
            <TextArea onChange={this.handleChange} name="state" value={this.state.state} style={{maxHeight: 35}} />
            <br/>
            <TextArea onChange={this.handleChange} name="salary" value={this.state.salary} style={{maxHeight: 35}} />
            <Modal.Actions>
              <Button basic color='green' labelPosition='left'
              onClick={() => {
                this.props.updateApp(this.props.app.id, this.state)
                this.componentDidMount();
              }}>Submit
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}