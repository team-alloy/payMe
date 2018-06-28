const db = require('../../database/index.js');

module.exports = {
  updateOffer: (body) => {
    var offer = JSON.parse(body.offer);
    if(!offer.id || !offer.application_id || !offer.base_salary) {
      throw 'need to complete nonNullable fields';
    } else {
      console.log('in here');
      return db.knex('offers')
      .where('id', offer.id)
      .update(offer);
    }
  },
  addOffer: (body) => {
    var offer = JSON.parse(body.offer);
    if(!offer.id) {
      return db.knex('offers')
      .insert(offer);
    } else {
      throw 'error';
    }
  },
  deleteOffer: (body) => {

  }
}

// if user gives application with no offer property don't create offer but create application

// make sure required not nullable fields are present
// if user gives offer in application through post, with no offer id, then create new offer
// if user give offer id in post application throw error

// if user is in patch and give offer object, make sure required fields are there and not null, aka base salary and application ID if not throw error
// if user gives offer with required fields update offer