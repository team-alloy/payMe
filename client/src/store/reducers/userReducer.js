import { LOGIN } from '../actions/userActions';

const user = (state ={}, action) => {
  switch(action.type) {
    case LOGIN : {
      return Object.apply({}, state, {test: 100})
    };
    default: return state;
  }
}

export default user;