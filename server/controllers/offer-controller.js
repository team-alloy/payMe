const db = require('../../database/index.js');

module.exports = {
  getOffers: (query) => {
    if(query.id || query.application_id) {
      return db.knex('offers')
      .where(query)
      .then((offer) => offer);
    } else {
      return db.knex('offers');
    }
  },
  updateOffer: (req) => {
    // var offer = JSON.parse(body.offer);
    console.log(req.body, 'hello');
    console.log(req.query, 'hello again');
    let {application_id, base_salary, hasHealthBenefits, hasPTO, hasRetirement, coversRelocation} = req.body;
    let {id} = req.query;

    if(req.body && !application_id || !base_salary) {
      throw 'need application_id and base_salary';
    }
    return db.knex('offers').where({'id': id})
    .then((offer) => {
      hasHealthBenefits = hasHealthBenefits ? hasHealthBenefits : offer[0].hasHealthBenefits;
      hasPTO = hasPTO ? hasPTO : offer[0].hasPTO;
      hasRetirement = hasRetirement ? hasRetirement : offer[0].hasRetirement;
      coversRelocation = coversRelocation ? coversRelocation : offer[0].coversRelocation;
      return db.knex('offers').where({'id': id})
      .update({application_id, base_salary, hasHealthBenefits, hasPTO, hasRetirement, coversRelocation})
      .then(() => db.knex('offers').where({'id': offer[0].id}));
    })
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