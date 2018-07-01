import { SET_SESSION } from '../actions/userActions';

export default (state = {}, action) => {
  switch(action.type) {
    case SET_SESSION : {
      return Object.assign({}, state, action.payload);
    }
    default: return state;
  }
}
