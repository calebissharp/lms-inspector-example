import { fromJS } from 'immutable';
import * as fileActions from '../actions/file';

const initialState = fromJS({
  file: '',
  filename: '',
});

const file = (state = initialState, action) => {
  switch(action.type) {
    case fileActions.SET_FILE:
      return state
        .set('filename', action.filename)
        .set('file', action.file);
    default:
      return state;
  }
};

export default file;