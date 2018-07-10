import { SET_COMPANY, SET_ROLE, SET_CITY, SET_STATE } from '../actions/selectionActions';

export default (state ={}, action) => {
  switch(action.type) {
    case SET_COMPANY: {
      return Object.assign({}, state, {company: action.payload});
    }
    case SET_ROLE: {
      return Object.assign({}, state, { role: action.payload });
    }
    case SET_ROLE: {
      return Object.assign({}, state, { role: action.payload });
    }
    case SET_CITY: {
      return Object.assign({}, state, { city: action.payload });
    }
    case SET_STATE: {
      return Object.assign({}, state, { state: action.payload });
    }
    default: return state;
  }

}