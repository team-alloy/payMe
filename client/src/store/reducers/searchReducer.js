import { SAVE_COMPANIES, SAVE_ROLES, SAVE_STATES, SAVE_CITIES } from '../actions/searchActions';

export default (state = {}, action) => {
  switch(action.type){
    case SAVE_COMPANIES: {
      return Object.assign({}, state, {companies: action.payload});
    }
    case SAVE_ROLES: {
      return Object.assign({}, state, { roles: action.payload });
    }
    case SAVE_STATES: {
      return Object.assign({}, state, { states: action.payload });
    }
    case SAVE_CITIES: {
      return Object.assign({}, state, { cities: action.payload });
    }
    default: return state;
  }
}