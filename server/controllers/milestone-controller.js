const db = require('../../database/index.js');
const user_controller = require('./user-controller.js');

module.exports = {
  findAllMilestones : (query) => {
    if(query) {
      return db.knex('milestones').where(query)
      .then((milestones) => {
        return fillUsersName(milestones);
      }).then((milestones) => {
        return milestones;
      })
    } else {
      return db.knex('milestones')
      .then((milestones) => {
        return fillUsersName(milestones);
      }).then((milestones) => {
        return milestones;
      })
    }
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

const fillUsersName = (milestones) => {
  return milestones.map(milestone => {
    return user_controller.getFullNameById({ id: milestone.user_id }).then(user => {
      milestone.user = user[0].first_name + ' ' + user[0].last_name;
      delete milestone.user_id;
      return milestone;
    });
  });
}