import { LOGIN } from '../actions/userActions';

export default (state ={}, action) => {
  switch(action.type) {
    case LOGIN : {
      console.log(action.payload)
      return action.payload.data;
    };
    default: return state;
  }
}
