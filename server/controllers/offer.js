const db = require('../../database/index.js');

module.exports = {
  getOffers: (query) => {
    if (query.id || query.application_id) {
      return db.knex('offers')
        .where(query)
        .then((offer) => {
          if (!offer[0]) {
            throw ({ message: 'No offers found' });
          }
          return offer;
        })
        .catch(err => err);
    }
    return db.knex('offers');
  },
  updateOffer: (req) => {
    let {
      application_id, base_salary, hasHealthBenefits, hasPTO, hasRetirement, coversRelocation, acceptedOffer,
    } = req.body;
    const { id } = req.query;

    // an application id is required for offers, so is base
    if (req.body && !req.body.application_id) {
      throw new Error('need application_id');
    }

    return db.knex('offers').where({ id })
      .then((offer) => {
        // checks offer to see if any parmeters were not changed
        if (isNaN(base_salary) || base_salary === offer[0].base_salary) {
          base_salary = offer[0].base_salary;
        }
        hasHealthBenefits = Number(hasHealthBenefits) || offer[0].hasHealthBenefits;
        hasPTO = Number(hasPTO) || offer[0].hasPTO;
        hasRetirement = Number(hasRetirement) || offer[0].hasRetirement;
        coversRelocation = Number(coversRelocation) || offer[0].coversRelocation;
        acceptedOffer = Number(acceptedOffer) || offer[0].acceptedOffer;
      })
      .then(() => db.knex('offers').where({ id })
        .update({
          application_id,
          base_salary,
          hasHealthBenefits,
          hasPTO,
          hasRetirement,
          coversRelocation,
          acceptedOffer,
        }))
      .then(() => db.knex('offers').where({ id }));
  },
  addOffer: (offer) => {
    if (!offer.id) {
      return db.knex('offers')
        .insert(offer);
    }
    throw new Error('no offer id was provided');
  },
  deleteOffer: (offer) => {

  },
};
