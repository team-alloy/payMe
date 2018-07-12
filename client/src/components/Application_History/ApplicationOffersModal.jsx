import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import {
  Card, Button, Modal, TextArea, Checkbox, Form,
} from 'semantic-ui-react';

import ApplicationOffersFeed from './ApplicationOffersFeed';

export default class ApplicationOffersModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: 0,
      offers: [],
    };

    this.handleSaveOffer = this.handleSaveOffer.bind(this);
    this.handleSalary = this.handleSalary.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
// get new offers based off of application id
  componentDidMount() {
    const { appID } = this.props;
    axios.get(`/api/offers?application_id=${appID}`)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            offers: res.data,
          });
        } else {
          this.setState({
            offers: [],
          });
        }
      });
  }

  // Save the user's offer for later retrieval
  handleSaveOffer(e) {
    e.preventDefault();
    const { appID } = this.props;
    const { salary } = this.state;
    const offerInfo = {
      application_id: appID,
      base_salary: salary,
      hasHealthBenefits: $('#hasHealth').prop('checked'),
      hasPTO: $('#hasPTO').prop('checked'),
      hasRetirement: $('#hasRetirement').prop('checked'),
      coversRelocation: $('#coversRelocation').prop('checked'),
    };
    axios.post('/api/offers', offerInfo)
      .then((res) => {
        this.componentDidMount();
      });
  }

  handleSalary(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { offers } = this.state;
    const { salary } = this.state;
    const style = {
      top: '10%',
    };
    return (
      <div>
        <Modal
          style={style}
          trigger={(
            <Button onClick={this.componentDidMount} color="teal">
              Offers
            </Button>
          )}
        >
          <Modal.Header>
            {'Input Your Offer '}
            <i className="money bill alternate icon" />
          </Modal.Header>
          <Form raised="true" className="ui teal segment">
            <Modal.Content>
              <Checkbox
                id="hasHealth"
                label="Has Health Benefits"
              />
              <br />
              <Checkbox
                id="hasPTO"
                label="Has PTO"
              />
              <br />
              <Checkbox
                id="hasRetirement"
                label="Has Retirement"
              />
              <br />
              <Checkbox
                id="coversRelocation"
                label="Covers Relocation"
              />
              <br/>
              <b>
                {'Salary'}
              </b>
              <input
                row="0"
                placeholder="Salary"
                onChange={this.handleSalary}
                name="salary"
                value={salary}
              />
              <br />
              <Modal.Actions>
                <div className="ui one bottom attached buttons">
                  <Button
                    className="ui approve button"
                    color="teal"
                    size="medium"
                    type="submit"
                    onClick={this.handleSaveOffer}
                  >
                    Submit
                  </Button>
                </div>
              </Modal.Actions>
              <br />
              <Card.Group>
                {offers.map((offer, index) => {
                  return (
                    <ApplicationOffersFeed
                      offer={offer}
                      key={index}
                    />
                  );
                })}
              </Card.Group>
            </Modal.Content>
          </Form>
        </Modal>
      </div>
    );
  }
}
