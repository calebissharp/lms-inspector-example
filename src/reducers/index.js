import { combineReducers } from 'redux-immutable';

import file from './file';
import metadata from './metadata';

export default combineReducers({
  file,
  metadata,
});