import * as fileActions from '../file';

it('creates an action to set the file', () => {
  const file = {};
  const filename = 'filename';
  const expectedAction = {
    type: fileActions.SET_FILE,
    file,
    filename,
  };
  expect(fileActions.setFile(filename, file)).toEqual(expectedAction);
});