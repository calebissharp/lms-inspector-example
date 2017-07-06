import { fromJS, Map } from 'immutable';

import reducer from '../file';
import * as fileActions from '../../actions/file';

it('returns a default state', () => {
  expect(reducer(undefined, {})).toEqual(fromJS({
    file: '',
    filename: '',
  }));
});

it('handles SET_FILE', () => {
  const file = 'file';
  const filename = 'filename';

  expect(reducer(Map(), {
    type: fileActions.SET_FILE,
    file,
    filename,
  })).toEqual(fromJS({
    filename,
    file,
  }));
});