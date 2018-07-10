import { combineReducers } from 'redux';

import user from './reducers/userReducer';
import searchWords from './reducers/searchReducer';
import selection from './reducers/selectionReducer';

export default combineReducers({
  user: user,
  searchWords: searchWords,
  selection: selection
});