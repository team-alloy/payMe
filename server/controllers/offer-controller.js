const db = require('../../database/index.js');

module.exports = {
  updateOffer: () => {

  },
  addOffer: (obj) => { // req.body.offer
    console.log(obj,'yo!');
    return db.knex('offers')
    .insert(obj);
  },
  deleteOffer: () => {

  }
}

// if user gives application with no offer property don't create offer but create application

// make sure required not nullable fields are present
// if user gives offer in application through post, with no offer id, then create new offer
// if user give offer id in post application throw error

// if user is in patch and give offer object, make sure required fields are there and not null, aka base salary and application ID if not throw error
// if user gives offer with required fields update offer