import React from 'react';
import { Button, Modal, TextArea } from 'semantic-ui-react';

export default class ApplicationUpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: this.props.app.role.company.name,
      city: this.props.app.city,
      state: this.props.app.state,
      role: this.props.app.role.name,
      salary: this.props.app.role.salary
    };
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.setState({
      company: this.props.app.role.company.name,
      city: this.props.app.city,
      state: this.props.app.state,
      role: this.props.app.role.name,
      salary: this.props.app.role.salary,
    });
  }

  handleChange(e) {
    e.preventDefault();

    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      city, company, role, state, salary,
    } = this.state;
    const style = {
      top: '10%',
    };

    return (
      <div>
        <Modal
          style={style} 
          trigger={(
            <Button onClick={this.componentDidMount}>
              UpdateApp
            </Button>
            )}
        >
          <Modal.Header>
            UpdateApp
          </Modal.Header>
          <Modal.Content scrolling>
            <TextArea onChange={this.handleChange} name="company" value={company} style={{ maxHeight: 35 }} />
            <br />
            <TextArea onChange={this.handleChange} name="role" value={role} style={{ maxHeight: 35 }} />
            <br />
            <TextArea onChange={this.handleChange} name="city" value={city} style={{ maxHeight: 35 }} />
            <br />
            <TextArea onChange={this.handleChange} name="state" value={state} style={{ maxHeight: 35 }} />
            <br />
            <TextArea onChange={this.handleChange} name="salary" value={salary} style={{ maxHeight: 35 }} />
            <Modal.Actions>
              <Button
                basic="true"
                color="green"
                labelPosition="left"
                onClick={() => {
                  this.props.updateApp(this.props.app.id, this.state);
                }}
              >
                Submit
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
