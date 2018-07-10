const db = require('../../database/index.js');

module.exports = {
  findAllMilestones: (query) => {
    if (query) {
      return db.knex.select().from('milestones')
        .where(query)
        .orderBy('created_at', 'desc');
    }
    return db.knex.select().from('milestones');
  },
  insertMilestone: milestone => db.knex('milestones').insert(milestone),
  updateMilestone: (id, update) => db.knex('milestones')
    .where('id', id)
    .update(update),
  deleteMilestone: (query) => {
    return db.knex('milestones').where('id', query.id).del();
  }
};
