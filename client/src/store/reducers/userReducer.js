import { SET_APPLIED_ROLES, SET_MILESTONES, SET_SESSION } from '../actions/userActions';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_APPLIED_ROLES : {
      console.log(action.payload);

      return Object.assign({}, state, {roles: action.payload});
    }
    case SET_MILESTONES: {
      return Object.assign({}, state, action.payload);
    }
    case SET_SESSION : {
      return Object.assign({}, state, action.payload);
    }
    default: return state;
  }
}
