const db = require('../../database/index.js');

module.exports = {
  findAllMilestones: (query) => {
    if (query) {
      // returns a list of milestones based off a query
      // usually the query is {user_id: ?} and then the query orders it by
      // descending created at dates
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
