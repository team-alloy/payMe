const db = require('../../database/index.js');

module.exports = {
  findAllMilestones : () => {
    return db.knex.select().from('milestones');
  },
  insertMilestone : (milestone) => {
    return db.knex('milestones').insert(milestone);
  },
  updateMilestone : (id, update) => {
    return db.knex('milestones')
    .where('id', id)
    .update(update);
  }
}