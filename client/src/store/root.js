import { combineReducers } from 'redux';

import user from './reducers/userReducer';
import searchWords from './reducers/searchReducer';

export default combineReducers({
  user: user,
  searchWords: searchWords
});