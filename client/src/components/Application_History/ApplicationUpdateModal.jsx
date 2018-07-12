import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

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
              Update Appplication
            </Button>
            )}
        >
        <Modal.Header>
          Update Your Application!
        </Modal.Header>
          <Form raised="true" className="ui teal segment">
            <Modal.Content>
              <b>
                {'Company\'s Name'}
              </b>
              <input
                onChange={this.handleChange} 
                name="company" 
                value={company} 
                style={{ maxHeight: 35 }} />
              <br />
              <b>
                {'Position Title'}
              </b>
              <input
                onChange={this.handleChange} 
                name="role" value={role} 
                style={{ maxHeight: 35 }} />
              <br />
              <b>
                {'Position\'s City'}
              </b>
              <input
                onChange={this.handleChange}
                name="city"
                value={city}
                style={{ maxHeight: 35 }}
              />
              <br />
              <b>
                {'Position\'s State'}
              </b>
              <input
                onChange={this.handleChange}
                name="state"
                value={state}
                style={{ maxHeight: 35 }}
              />
              <br />
              <b>
                {'Salary'}
              </b>
              <input
                onChange={this.handleChange}
                name="salary"
                value={salary}
                style={{ maxHeight: 35 }}
              />
              <br />
              <Modal.Actions>
                <div className="ui two bottom attached buttons">
                  <Button
                    className="ui approve button"
                    color="teal"
                    size="medium"
                    type="submit"
                    onClick={() => {
                      this.props.updateApp(this.props.app.id, this.state);
                    }}
                  >
                    Submit
                  </Button>
                  <Button color="red" onClick={() => {this.props.delete(this.props.app.id)}}>
                    Delete
                  </Button>
                </div>
              </Modal.Actions>
            </Modal.Content>
          </Form>
        </Modal>
      </div>
    );
  }
}
