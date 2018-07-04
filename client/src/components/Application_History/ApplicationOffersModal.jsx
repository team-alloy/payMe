import React from 'react';
import jquery from 'jquery';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
import ApplicationOffersFeed from './ApplicationOffersFeed.jsx';

export default class ApplicationOffersModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: 0,
      offers:[]
    }
    this.saveOffer = this.saveOffer.bind(this);
    this.handleSalary = this.handleSalary.bind(this);
  }

  componentDidMount() {
    axios.get('/api/offers?application_id='+this.props.appID)
    .then((res) => {
      console.log(res.data,'before iF');
      if(res.data.length > 0) {
        this.setState({
          offers: this.state.offers.concat(res.data)
        });
      }
    })
  }

  saveOffer(e) {
    e.preventDefault();
    var offerInfo = {
      application_id: this.props.appID,
      base_salary: this.state.salary,
      hasHealthBenefits: $("#hasHealth").prop("checked"),
      hasPTO: $("#hasPTO").prop("checked"),
      hasRetirement: $("#hasRetirement").prop("checked"),
      coversRelocation: $("#coversRelocation").prop("checked")
    }
    axios.post('/api/offers', offerInfo)
    .then((res) => {
      console.log(res);
    });
  }

  handleSalary(e) {
    e.preventDefault();
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log(this.state.offers,'statesssss');
    // const style = {
    //   color: 'blue',
    //   marginBottom:"100%"
    // }
    return (
      <div>
        <Modal size={"tiny"} trigger={(<Button>Offers</Button>)}>
        <Modal.Header>Offers</Modal.Header>
          <Modal.Content>
            {"Offers"}
            <br/>
            <input id="hasHealth" type="checkbox" />{" Has Health Benefits"}
            <br/>
            <input id="hasPTO" type="checkbox" />{" Has PTO"}
            <br/>
            <input id="hasRetirement" type="checkbox" />{" Has Retirement"}
            <br/>
            <input id="coversRelocation" type="checkbox" />{" Covers Relocation"}
            <br/>
            <input type="text" placeholder="Salary" onChange={this.handleSalary} name="salary" value={this.state.salary}/>
            <Button onClick={this.saveOffer}>Submit</Button>
            <div>{this.state.offers.map((offer) => {
              console.log(offer,'mapps');
              return <ApplicationOffersFeed offer={offer}/>
            })}</div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
/*
update modal???
update offers modal so that offers render on it and when a user sends an offer it gets sent to the database and renders on the current modal
// label tag for checkboxes? might make it look nicer?
// notes
  // changed error in offers.controller get
  // offers response will respond once with full array
    // then the rest empty arrays
*/
