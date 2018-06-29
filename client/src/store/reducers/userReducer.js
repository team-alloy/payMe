import { LOGIN } from '../actions/userActions';

export default (state ={}, action) => {
  console.log(state)
  console.log(action)
  switch(action.type) {
    case LOGIN : {
      return Object.apply({}, state, {test: 100})
    };
    default: return state;
  }
}
