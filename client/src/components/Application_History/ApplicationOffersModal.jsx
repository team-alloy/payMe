import React from 'react';
import jquery from 'jquery';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

export default class ApplicationOffersModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: 0
    }
    this.saveOffer = this.saveOffer.bind(this);
    this.handleSalary = this.handleSalary.bind(this);
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
      console.log(res,'offer');
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
    return (
      <div>
        <Modal trigger={(<Button>Offers</Button>)} size="sm">
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
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
/*
update modal???
*/
