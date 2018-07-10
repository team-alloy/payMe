import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import {
  Card,
  Button,
  Modal,
  TextArea,
  Checkbox,
} from 'semantic-ui-react';

import ApplicationOffersFeed from './ApplicationOffersFeed';

export default class ApplicationOffersModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: 0,
      offers: [],
    };

    this.saveOffer = this.saveOffer.bind(this);
    this.handleSalary = this.handleSalary.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

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

  saveOffer(e) {
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
            Offer
          </Modal.Header>
          <Modal.Content scrolling>
            <Checkbox id="hasHealth" label="Has Health Benefits" />
            <br />
            <Checkbox id="hasPTO" label="Has PTO" />
            <br />
            <Checkbox id="hasRetirement" label="Has Retirement" />
            <br />
            <Checkbox id="coversRelocation" label="Covers Relocation" />
            <br />
            <TextArea
              placeholder="Salary"
              onChange={this.handleSalary}
              name="salary"
              value={salary}
            />
            <Modal.Actions>
              <Button
                basic="true"
                color="green"
                labelPosition="left"
                onClick={this.saveOffer}
              >
              Submit
              </Button>
            </Modal.Actions>
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
        </Modal>
      </div>
    );
  }
}
