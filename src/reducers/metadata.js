import { fromJS } from 'immutable';

import * as metadataActions from '../actions/metadata';

const initialState = fromJS({
  course: {
    type: '',
    author: '',
  },
});

const metadata = (state = initialState, action) => {
  switch(action.type) {
    case metadataActions.SET_COURSE_TYPE:
      return state
        .setIn(['course', 'type'], action.courseType);
    case metadataActions.SET_COURSE_AUTHOR:
      return state
        .setIn(['course', 'author'], action.courseAuthor);
    default:
      return state;
  }
}

export default metadata;