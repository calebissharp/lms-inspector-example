import { fromJS, Map } from 'immutable';

import reducer from '../metadata';
import * as metadataActions from '../../actions/metadata';

it('returns a default state', () => {
  expect(reducer(undefined, {})).toEqual(fromJS({
    course: {
      type: '',
      author: '',
    },
  }));
});

it('handles SET_COURSE_TYPE', () => {
  const courseType = 'moodle';

  expect(reducer(Map(), {
    type: metadataActions.SET_COURSE_TYPE,
    courseType,
  })).toEqual(fromJS({
    course: {
      type: courseType,
    },
  }));
});

it('handles SET_COURSE_AUTHOR', () => {
  const courseAuthor = 'me';

  expect(reducer(Map(), {
    type: metadataActions.SET_COURSE_AUTHOR,
    courseAuthor,
  })).toEqual(fromJS({
    course: {
      author: courseAuthor,
    }
  }));
});