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
    let {application_id, base_salary, hasHealthBenefits, hasPTO, hasRetirement, coversRelocation} = req.body;
    let {id} = req.query;

    if(req.body && !application_id || !base_salary) {
      throw 'need application_id and base_salary';
    }
    return db.knex('offers').where({'id': id})
    .then((offer) => {
      console.log(hasHealthBenefits);
      hasHealthBenefits = hasHealthBenefits ? hasHealthBenefits : offer[0].hasHealthBenefits;
      console.log(hasHealthBenefits);
      hasPTO = hasPTO ? hasPTO : offer[0].hasPTO;
      hasRetirement = hasRetirement ? hasRetirement : offer[0].hasRetirement;
      coversRelocation = coversRelocation ? coversRelocation : offer[0].coversRelocation;
      return db.knex('offers').where({'id': id})
      .update({application_id, base_salary, hasHealthBenefits, hasPTO, hasRetirement, coversRelocation})
      .then(() => db.knex('offers').where({'id': offer[0].id}));
    })
  },
  addOffer: (offer) => {

    if(!offer.id) {
      return db.knex('offers')
      .insert(offer);
    } else {
      throw 'error';
    }
  },
  deleteOffer: (offer) => {

  }
}