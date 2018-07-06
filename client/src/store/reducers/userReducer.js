import { SET_APPLICATIONS, SET_APPLIED_ROLES, SET_MILESTONES, SET_SESSION, REMOVE_SESSION } from '../actions/userActions';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_APPLICATIONS: {
      return Object.assign({}, state, {applications: action.payload});
    }
    case SET_APPLIED_ROLES : {
      return Object.assign({}, state, {roles: action.payload});
    }
    case SET_MILESTONES: {
      return Object.assign({}, state, action.payload);
    }
    case SET_SESSION : {
      return Object.assign({}, state, action.payload);
    }
    case REMOVE_SESSION : {
      return Object.assign({}, action.payload);
    }
    default: return state;
  }
}
