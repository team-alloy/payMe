const db = require('../../database/index.js');

module.exports = {
  findAllMilestones: () => db.knex.select().from('milestones'),
  insertMilestone: milestone => db.knex('milestones').insert(milestone),
  updateMilestone: (id, update) => db.knex('milestones')
    .where('id', id)
    .update(update),
};
