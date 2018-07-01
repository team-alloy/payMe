const db = require('../../database/index.js');

module.exports = {
  getOffers: (query) => {
    if (query.id || query.application_id) {
      return db.knex('offers')
        .where(query)
        .then(offer => {
          if(!offer[0]) {
            throw ({message: 'No offers found'});
          }
          return offer;
        })
        .catch(err => err);;
    }
    return db.knex('offers');
  },
  updateOffer: (req) => {
    let {
      application_id, base_salary, hasHealthBenefits, hasPTO, hasRetirement, coversRelocation, acceptedOffer
    } = req.body;
    const { id } = req.query;

    if (req.body && (!application_id || !base_salary)) {
      throw new Error('need application_id and base_salary');
    }
    return db.knex('offers').where({ id })
      .then((offer) => {
        hasHealthBenefits = hasHealthBenefits || offer[0].hasHealthBenefits;
        hasPTO = hasPTO || offer[0].hasPTO;
        hasRetirement = hasRetirement || offer[0].hasRetirement;
        coversRelocation = coversRelocation || offer[0].coversRelocation;
        acceptedOffer = acceptedOffer || offer[0].acceptedOffer;
        return db.knex('offers').where({ id })
          .update({
            application_id, base_salary, hasHealthBenefits, hasPTO, hasRetirement, coversRelocation, acceptedOffer,
          })
          .then(() => db.knex('offers').where({ id: offer[0].id }));
      });
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
